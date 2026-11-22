---
title: 'Making Attention Affordable: KV Cache, GQA, and FlashAttention'
description: 'Attention is quadratic and generation is starved for memory. The tricks that make long-context LLMs practical, each one built from scratch. Part 4, and the finale, of the Transformer family.'
pubDate: 2026-11-05
tags: ['transformers']
draft: false
---

Back in [part one](/blog/attention-intuitively/) I flagged one line and promised to come back to it: `Q·Kᵀ` is an `n × n` matrix. Every token scores every other token. Double the context and you quadruple the work.

That single fact shapes almost every engineering decision in a modern LLM. This final part of the series is about the tricks that make attention affordable. None of them change what the model computes. They change *how*, and *how often*, and *where in memory*.

## Two different bottlenecks

People say "attention is slow" as if it's one problem. It's two, and they need different fixes.

**Prefill** is when the model reads your prompt. All the tokens are known, so it processes them in one big parallel pass. The cost here is the `n × n` score matrix itself: the compute to fill it in, and the memory to hold it. This is the quadratic problem.

To feel how fast it grows, count the numbers in one head's score matrix, stored at 16 bits (2 bytes) each:

| context | scores (n × n) | memory, one head, one layer |
|---|---|---|
| 4,096 | 16.8 million | 32 MiB |
| 32,768 | 1.07 billion | 2 GiB |
| 131,072 (128K) | 17.2 billion | **32 GiB** |

Thirty-two times more context, 1,024 times more memory. And a real model has dozens of heads in each of dozens of layers.

**Decode** is when the model writes its answer, one token at a time. Each new token is a tiny amount of arithmetic, but it has to attend to everything that came before. The GPU spends most of its time not computing but *waiting for data to arrive from memory*. Decode is **memory-bound**.

> Prefill is limited by how fast you can compute. Decode is limited by how fast you can move bytes. Most of the tricks below are about moving fewer bytes.

## The KV cache: never recompute the past

Say the model has written 500 tokens and is about to write the 501st. Naively, it would run all 501 tokens through every layer again. Wasteful, because of the property we tested in [part two](/blog/transformers-encoder-decoder/): with a causal mask, **the past never sees the future**. The keys and values for tokens 1 through 500 are exactly what they were one step ago.

So you compute them once and keep them. At every step, the new token computes only its own query, key and value, appends its K and V to the cache, and attends over the whole cache. The work per new token goes from re-processing everything to processing one token.

<figure>
  <svg viewBox="0 0 720 212" role="img" aria-label="Three rows. Prefill computes keys and values for The cat sat. Step 1 reads those three from the cache and computes only on. Step 2 reads four and computes only the.">
    <defs></defs>
    <g font-family="ui-monospace, Menlo, monospace" font-size="12" fill="currentColor">
      <text x="20" y="42" font-size="11" fill="var(--muted)">prefill</text>
      <rect x="100" y="22" width="58" height="30" rx="6" fill="none" stroke="var(--accent)" stroke-width="1.5"/>
      <text x="129" y="42" text-anchor="middle" fill="var(--accent)">The</text>
      <rect x="166" y="22" width="58" height="30" rx="6" fill="none" stroke="var(--accent)" stroke-width="1.5"/>
      <text x="195" y="42" text-anchor="middle" fill="var(--accent)">cat</text>
      <rect x="232" y="22" width="58" height="30" rx="6" fill="none" stroke="var(--accent)" stroke-width="1.5"/>
      <text x="261" y="42" text-anchor="middle" fill="var(--accent)">sat</text>
      <text x="450" y="42" font-size="10.5" fill="var(--muted)">compute K,V for 3 tokens, cache them</text>
      <text x="20" y="98" font-size="11" fill="var(--muted)">step 1</text>
      <rect x="100" y="78" width="58" height="30" rx="6" fill="var(--muted)" fill-opacity="0.15" stroke="var(--muted)" stroke-width="1"/>
      <text x="129" y="98" text-anchor="middle">The</text>
      <rect x="166" y="78" width="58" height="30" rx="6" fill="var(--muted)" fill-opacity="0.15" stroke="var(--muted)" stroke-width="1"/>
      <text x="195" y="98" text-anchor="middle">cat</text>
      <rect x="232" y="78" width="58" height="30" rx="6" fill="var(--muted)" fill-opacity="0.15" stroke="var(--muted)" stroke-width="1"/>
      <text x="261" y="98" text-anchor="middle">sat</text>
      <rect x="298" y="78" width="58" height="30" rx="6" fill="none" stroke="var(--accent)" stroke-width="1.5"/>
      <text x="327" y="98" text-anchor="middle" fill="var(--accent)">on</text>
      <text x="450" y="98" font-size="10.5" fill="var(--muted)">compute 1 new · read 3 from cache</text>
      <text x="20" y="154" font-size="11" fill="var(--muted)">step 2</text>
      <rect x="100" y="134" width="58" height="30" rx="6" fill="var(--muted)" fill-opacity="0.15" stroke="var(--muted)" stroke-width="1"/>
      <text x="129" y="154" text-anchor="middle">The</text>
      <rect x="166" y="134" width="58" height="30" rx="6" fill="var(--muted)" fill-opacity="0.15" stroke="var(--muted)" stroke-width="1"/>
      <text x="195" y="154" text-anchor="middle">cat</text>
      <rect x="232" y="134" width="58" height="30" rx="6" fill="var(--muted)" fill-opacity="0.15" stroke="var(--muted)" stroke-width="1"/>
      <text x="261" y="154" text-anchor="middle">sat</text>
      <rect x="298" y="134" width="58" height="30" rx="6" fill="var(--muted)" fill-opacity="0.15" stroke="var(--muted)" stroke-width="1"/>
      <text x="327" y="154" text-anchor="middle">on</text>
      <rect x="364" y="134" width="58" height="30" rx="6" fill="none" stroke="var(--accent)" stroke-width="1.5"/>
      <text x="393" y="154" text-anchor="middle" fill="var(--accent)">the</text>
      <text x="450" y="154" font-size="10.5" fill="var(--muted)">compute 1 new · read 4 from cache</text>
      <rect x="100" y="190" width="14" height="12" rx="2" fill="var(--muted)" fill-opacity="0.15" stroke="var(--muted)"/><text x="120" y="200" font-size="10.5" fill="var(--muted)">read from cache</text>
      <rect x="260" y="190" width="14" height="12" rx="2" fill="none" stroke="var(--accent)" stroke-width="1.5"/><text x="280" y="200" font-size="10.5" fill="var(--accent)">computed this step</text>
    </g>
  </svg>
  <figcaption>Each decode step does fresh work for one token. Everything before it comes out of the cache.</figcaption>
</figure>

That's the **KV cache**, and every serving system uses it. But it trades compute for memory, and the memory adds up fast. For every token, every layer stores a key and a value for every head:

```
cache bytes = 2 (K and V) × layers × kv_heads × head_dim × tokens × bytes per number
```

Take a model shaped like Llama 3 8B: 32 layers, 32 attention heads, a head dimension of 128, stored in 16-bit precision. At an 8,192-token context, if every head keeps its own keys and values, that's **4 GiB of cache, for one conversation**. Plugging into the formula:

```
2 × 32 layers × 32 heads × 128 dims × 2 bytes  =  524,288 bytes  =  512 KiB per token
512 KiB × 8,192 tokens                          =  4 GiB
```

Half a megabyte for every single token. A short paragraph of 100 tokens costs 50 MiB of cache. Serve 20 users at once and the cache needs more memory than the model's own weights.

This is why long context is expensive to *serve*, not just to train. And it's what the next trick is about.

## MQA and GQA: let heads share keys

In [part one](/blog/attention-intuitively/) we gave every attention head its own queries, keys and values. That's what lets heads specialize. But look at what the cache stores: only keys and values. Queries are used once and thrown away.

**Multi-query attention** (MQA, Shazeer, 2019) asked: what if all the heads keep their own queries, but share *one* set of keys and values? The cache shrinks by the number of heads, often 32× or more. The catch is that quality drops a little, because heads lose some of their ability to specialize.

**Grouped-query attention** (GQA, Ainslie et al., 2023) is the compromise everyone settled on. Split the query heads into groups, and give each group one shared key/value head. Llama 3 8B has 32 query heads and 8 key/value heads, so every 4 query heads share one K/V.

<figure>
  <svg viewBox="0 0 730 182" role="img" aria-label="Three panels with 8 query heads each. In multi-head attention each query head has its own key-value head. In grouped-query attention groups of four share one. In multi-query attention all eight share one.">
    <defs></defs>
    <g font-family="ui-monospace, Menlo, monospace" font-size="12" fill="currentColor">
      <text x="120" y="18" text-anchor="middle" font-size="11.5">multi-head (MHA)</text>
      <line x1="35" y1="56" x2="38.0" y2="126" stroke="var(--muted)" stroke-width="1"/>
      <line x1="59" y1="56" x2="62.0" y2="126" stroke="var(--muted)" stroke-width="1"/>
      <line x1="83" y1="56" x2="86.0" y2="126" stroke="var(--muted)" stroke-width="1"/>
      <line x1="107" y1="56" x2="110.0" y2="126" stroke="var(--muted)" stroke-width="1"/>
      <line x1="131" y1="56" x2="134.0" y2="126" stroke="var(--muted)" stroke-width="1"/>
      <line x1="155" y1="56" x2="158.0" y2="126" stroke="var(--muted)" stroke-width="1"/>
      <line x1="179" y1="56" x2="182.0" y2="126" stroke="var(--muted)" stroke-width="1"/>
      <line x1="203" y1="56" x2="206.0" y2="126" stroke="var(--muted)" stroke-width="1"/>
      <rect x="26" y="38" width="18" height="18" rx="3" fill="none" stroke="currentColor" stroke-width="1.2"/>
      <rect x="50" y="38" width="18" height="18" rx="3" fill="none" stroke="currentColor" stroke-width="1.2"/>
      <rect x="74" y="38" width="18" height="18" rx="3" fill="none" stroke="currentColor" stroke-width="1.2"/>
      <rect x="98" y="38" width="18" height="18" rx="3" fill="none" stroke="currentColor" stroke-width="1.2"/>
      <rect x="122" y="38" width="18" height="18" rx="3" fill="none" stroke="currentColor" stroke-width="1.2"/>
      <rect x="146" y="38" width="18" height="18" rx="3" fill="none" stroke="currentColor" stroke-width="1.2"/>
      <rect x="170" y="38" width="18" height="18" rx="3" fill="none" stroke="currentColor" stroke-width="1.2"/>
      <rect x="194" y="38" width="18" height="18" rx="3" fill="none" stroke="currentColor" stroke-width="1.2"/>
      <rect x="29.0" y="126" width="18" height="18" rx="3" fill="var(--accent)" fill-opacity="0.45" stroke="var(--accent)" stroke-width="1.2"/>
      <rect x="53.0" y="126" width="18" height="18" rx="3" fill="var(--accent)" fill-opacity="0.45" stroke="var(--accent)" stroke-width="1.2"/>
      <rect x="77.0" y="126" width="18" height="18" rx="3" fill="var(--accent)" fill-opacity="0.45" stroke="var(--accent)" stroke-width="1.2"/>
      <rect x="101.0" y="126" width="18" height="18" rx="3" fill="var(--accent)" fill-opacity="0.45" stroke="var(--accent)" stroke-width="1.2"/>
      <rect x="125.0" y="126" width="18" height="18" rx="3" fill="var(--accent)" fill-opacity="0.45" stroke="var(--accent)" stroke-width="1.2"/>
      <rect x="149.0" y="126" width="18" height="18" rx="3" fill="var(--accent)" fill-opacity="0.45" stroke="var(--accent)" stroke-width="1.2"/>
      <rect x="173.0" y="126" width="18" height="18" rx="3" fill="var(--accent)" fill-opacity="0.45" stroke="var(--accent)" stroke-width="1.2"/>
      <rect x="197.0" y="126" width="18" height="18" rx="3" fill="var(--accent)" fill-opacity="0.45" stroke="var(--accent)" stroke-width="1.2"/>
      <text x="120" y="168" text-anchor="middle" font-size="10.5" fill="var(--accent)">8 K/V heads cached</text>
      <text x="360" y="18" text-anchor="middle" font-size="11.5">grouped-query (GQA)</text>
      <line x1="275" y1="56" x2="314.0" y2="126" stroke="var(--muted)" stroke-width="1"/>
      <line x1="299" y1="56" x2="314.0" y2="126" stroke="var(--muted)" stroke-width="1"/>
      <line x1="323" y1="56" x2="314.0" y2="126" stroke="var(--muted)" stroke-width="1"/>
      <line x1="347" y1="56" x2="314.0" y2="126" stroke="var(--muted)" stroke-width="1"/>
      <line x1="371" y1="56" x2="410.0" y2="126" stroke="var(--muted)" stroke-width="1"/>
      <line x1="395" y1="56" x2="410.0" y2="126" stroke="var(--muted)" stroke-width="1"/>
      <line x1="419" y1="56" x2="410.0" y2="126" stroke="var(--muted)" stroke-width="1"/>
      <line x1="443" y1="56" x2="410.0" y2="126" stroke="var(--muted)" stroke-width="1"/>
      <rect x="266" y="38" width="18" height="18" rx="3" fill="none" stroke="currentColor" stroke-width="1.2"/>
      <rect x="290" y="38" width="18" height="18" rx="3" fill="none" stroke="currentColor" stroke-width="1.2"/>
      <rect x="314" y="38" width="18" height="18" rx="3" fill="none" stroke="currentColor" stroke-width="1.2"/>
      <rect x="338" y="38" width="18" height="18" rx="3" fill="none" stroke="currentColor" stroke-width="1.2"/>
      <rect x="362" y="38" width="18" height="18" rx="3" fill="none" stroke="currentColor" stroke-width="1.2"/>
      <rect x="386" y="38" width="18" height="18" rx="3" fill="none" stroke="currentColor" stroke-width="1.2"/>
      <rect x="410" y="38" width="18" height="18" rx="3" fill="none" stroke="currentColor" stroke-width="1.2"/>
      <rect x="434" y="38" width="18" height="18" rx="3" fill="none" stroke="currentColor" stroke-width="1.2"/>
      <rect x="305.0" y="126" width="18" height="18" rx="3" fill="var(--accent)" fill-opacity="0.45" stroke="var(--accent)" stroke-width="1.2"/>
      <rect x="401.0" y="126" width="18" height="18" rx="3" fill="var(--accent)" fill-opacity="0.45" stroke="var(--accent)" stroke-width="1.2"/>
      <text x="360" y="168" text-anchor="middle" font-size="10.5" fill="var(--accent)">2 K/V heads cached</text>
      <text x="600" y="18" text-anchor="middle" font-size="11.5">multi-query (MQA)</text>
      <line x1="515" y1="56" x2="602.0" y2="126" stroke="var(--muted)" stroke-width="1"/>
      <line x1="539" y1="56" x2="602.0" y2="126" stroke="var(--muted)" stroke-width="1"/>
      <line x1="563" y1="56" x2="602.0" y2="126" stroke="var(--muted)" stroke-width="1"/>
      <line x1="587" y1="56" x2="602.0" y2="126" stroke="var(--muted)" stroke-width="1"/>
      <line x1="611" y1="56" x2="602.0" y2="126" stroke="var(--muted)" stroke-width="1"/>
      <line x1="635" y1="56" x2="602.0" y2="126" stroke="var(--muted)" stroke-width="1"/>
      <line x1="659" y1="56" x2="602.0" y2="126" stroke="var(--muted)" stroke-width="1"/>
      <line x1="683" y1="56" x2="602.0" y2="126" stroke="var(--muted)" stroke-width="1"/>
      <rect x="506" y="38" width="18" height="18" rx="3" fill="none" stroke="currentColor" stroke-width="1.2"/>
      <rect x="530" y="38" width="18" height="18" rx="3" fill="none" stroke="currentColor" stroke-width="1.2"/>
      <rect x="554" y="38" width="18" height="18" rx="3" fill="none" stroke="currentColor" stroke-width="1.2"/>
      <rect x="578" y="38" width="18" height="18" rx="3" fill="none" stroke="currentColor" stroke-width="1.2"/>
      <rect x="602" y="38" width="18" height="18" rx="3" fill="none" stroke="currentColor" stroke-width="1.2"/>
      <rect x="626" y="38" width="18" height="18" rx="3" fill="none" stroke="currentColor" stroke-width="1.2"/>
      <rect x="650" y="38" width="18" height="18" rx="3" fill="none" stroke="currentColor" stroke-width="1.2"/>
      <rect x="674" y="38" width="18" height="18" rx="3" fill="none" stroke="currentColor" stroke-width="1.2"/>
      <rect x="593.0" y="126" width="18" height="18" rx="3" fill="var(--accent)" fill-opacity="0.45" stroke="var(--accent)" stroke-width="1.2"/>
      <text x="600" y="168" text-anchor="middle" font-size="10.5" fill="var(--accent)">1 K/V head cached</text>
      <text x="6" y="51" font-size="9.5" fill="var(--muted)">Q</text><text x="2" y="139" font-size="9.5" fill="var(--accent)">KV</text>
    </g>
  </svg>
  <figcaption>Eight query heads in every case. What changes is how many key/value heads they share, and so how much has to be cached.</figcaption>
</figure>

| Scheme | K/V heads (of 32 query heads) | Cache at 8K tokens |
|---|---|---|
| Multi-head (MHA) | 32 | 4 GiB |
| Grouped-query (GQA) | 8 | 1 GiB |
| Multi-query (MQA) | 1 | 0.125 GiB |

GQA gets most of MQA's memory savings with nearly all of multi-head quality. It's used in Llama 2 70B, every Llama 3 model, and Mistral 7B, and it's now the default choice for new models.

## FlashAttention: same math, fewer trips to memory

KV caching and GQA shrink what you *store*. FlashAttention (Dao et al., 2022) attacks how attention *moves data*, and it's the reason long-context training is practical at all.

A GPU has two kinds of memory that matter here. **HBM** is the big main memory, tens of gigabytes and comparatively slow. **SRAM** is on the chip itself, only a few megabytes but much faster. The naive way to compute attention writes the full `n × n` score matrix out to HBM, reads it back to run softmax, writes the result, and reads *that* back to multiply by V. At long contexts, most of the time goes into that traffic, not the math.

FlashAttention never builds the full matrix. It takes a block of queries, streams the keys and values through in tiles small enough to fit in SRAM, and keeps a running result as it goes:

<figure>
  <svg viewBox="0 0 720 200" role="img" aria-label="An attention score grid of queries by keys. One band of query rows is highlighted, and a single tile in it is processed at a time, updating a running max, running sum and running output.">
    <defs>
      <marker id="fh" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="var(--accent)"/></marker>
    </defs>
    <g font-family="ui-monospace, Menlo, monospace" font-size="12" fill="currentColor">
      <rect x="200" y="60" width="160" height="20" fill="var(--accent)" fill-opacity="0.12"/>
      <path d="M200 20 V180 M220 20 V180 M240 20 V180 M260 20 V180 M280 20 V180 M300 20 V180 M320 20 V180 M340 20 V180 M360 20 V180 M200 20 H360 M200 40 H360 M200 60 H360 M200 80 H360 M200 100 H360 M200 120 H360 M200 140 H360 M200 160 H360 M200 180 H360" fill="none" stroke="var(--muted)" stroke-width="0.8"/>
      <rect x="260" y="60" width="20" height="20" fill="var(--accent)" fill-opacity="0.45" stroke="var(--accent)" stroke-width="1.8"/>
      <text x="280" y="12" text-anchor="middle" font-size="10.5" fill="var(--muted)">keys →  streamed in tiles</text>
      <text x="190" y="74" text-anchor="end" font-size="10.5" fill="var(--accent)">query block</text>
      <text x="190" y="140" text-anchor="end" font-size="10.5" fill="var(--muted)">never stored</text>
      <text x="190" y="154" text-anchor="end" font-size="10.5" fill="var(--muted)">all at once</text>
      <path d="M 282 70 C 360 70, 380 92, 438 92" fill="none" stroke="var(--accent)" stroke-width="1.4" marker-end="url(#fh)"/>
      <rect x="442" y="52" width="270" height="82" rx="9" fill="none" stroke="var(--accent)" stroke-width="1.5"/>
      <text x="456" y="76">running max      m</text>
      <text x="456" y="96">running sum      l</text>
      <text x="456" y="116">running output   acc</text>
      <text x="577" y="156" text-anchor="middle" font-size="10.5" fill="var(--muted)">kept in fast on-chip memory</text>
    </g>
  </svg>
  <figcaption>FlashAttention walks the score grid one tile at a time. Only three small running quantities per query survive between tiles.</figcaption>
</figure>

The hard part is softmax. Softmax needs the maximum and the sum over *all* scores in a row, and you don't have all the scores at once. The fix is the **online softmax**: keep a running maximum and a running sum, and whenever a new tile raises the maximum, rescale everything you've accumulated so far to match. At the end, divide once.

### The online softmax, by hand

One query, four keys. The scores are `[1, 3, 2, 5]` and, to keep the arithmetic readable, the values are plain numbers `[10, 20, 30, 40]`. We process them in two tiles of two.

**Tile 1**, scores `[1, 3]`. The running max is `m = 3`. Exponentiate relative to it: e<sup>1−3</sup> = 0.135 and e<sup>3−3</sup> = 1. So the running sum is `l = 1.135` and the running output is `acc = 0.135 × 10 + 1 × 20 = 21.35`.

**Tile 2**, scores `[2, 5]`. The max jumps from 3 to 5, so everything from tile 1 was measured against the wrong max. The correction factor is `fix = e^(3−5) = 0.135`. Scale the old totals down by it, then add the new tile, measured against the new max:

| | from tile 1 | × fix | + tile 2 | running total |
|---|---|---|---|---|
| `l` | 1.135 | 0.154 | e<sup>2−5</sup> + e<sup>5−5</sup> = 0.050 + 1 | **1.203** |
| `acc` | 21.35 | 2.89 | 0.050 × 30 + 1 × 40 = 41.49 | **44.38** |

**Finish:** `acc / l = 44.38 / 1.203 = 36.88`.

**Check it the naive way:** softmax of all four scores is `[0.015, 0.113, 0.041, 0.831]`, and 0.015 × 10 + 0.113 × 20 + 0.041 × 30 + 0.831 × 40 = **36.88**. Same answer, and we never held all four scores at once.

> FlashAttention is not an approximation. It computes exactly the same numbers as the naive version. It just never writes the big matrix down.

The result: memory for the scores goes from quadratic to linear in sequence length, and attention gets several times faster because it stops waiting on HBM. FlashAttention-2 and FlashAttention-3 pushed the same idea further on newer GPUs. And PyTorch's `F.scaled_dot_product_attention`, the function we've been calling since part one, will quietly use a FlashAttention kernel when your hardware and inputs allow.

## Sliding windows: don't look at everything

The last trick is the most direct: **don't attend to everything.** With sliding-window attention, each token only attends to the previous `w` tokens. Mistral 7B uses a 4,096-token window.

That sounds like it would cut off long-range information, but stacking layers rescues it. Layer 1 sees 4,096 tokens back. Layer 2 sees tokens that already looked 4,096 back, so information can travel about twice as far. After many layers, information can flow across far more than one window, while the cost of each layer stays fixed.

<figure>
  <svg viewBox="0 0 720 222" role="img" aria-label="Left: an 8 by 8 causal grid where each row attends only to itself and the two previous tokens. Right: four rows of dots showing that after three layers, the last token can draw on seven input tokens.">
    <defs></defs>
    <g font-family="ui-monospace, Menlo, monospace" font-size="12" fill="currentColor">
      <rect x="120" y="30" width="20" height="20" fill="var(--accent)" fill-opacity="0.4"/>
      <rect x="120" y="50" width="20" height="20" fill="var(--accent)" fill-opacity="0.4"/>
      <rect x="140" y="50" width="20" height="20" fill="var(--accent)" fill-opacity="0.4"/>
      <rect x="120" y="70" width="20" height="20" fill="var(--accent)" fill-opacity="0.4"/>
      <rect x="140" y="70" width="20" height="20" fill="var(--accent)" fill-opacity="0.4"/>
      <rect x="160" y="70" width="20" height="20" fill="var(--accent)" fill-opacity="0.4"/>
      <rect x="140" y="90" width="20" height="20" fill="var(--accent)" fill-opacity="0.4"/>
      <rect x="160" y="90" width="20" height="20" fill="var(--accent)" fill-opacity="0.4"/>
      <rect x="180" y="90" width="20" height="20" fill="var(--accent)" fill-opacity="0.4"/>
      <rect x="160" y="110" width="20" height="20" fill="var(--accent)" fill-opacity="0.4"/>
      <rect x="180" y="110" width="20" height="20" fill="var(--accent)" fill-opacity="0.4"/>
      <rect x="200" y="110" width="20" height="20" fill="var(--accent)" fill-opacity="0.4"/>
      <rect x="180" y="130" width="20" height="20" fill="var(--accent)" fill-opacity="0.4"/>
      <rect x="200" y="130" width="20" height="20" fill="var(--accent)" fill-opacity="0.4"/>
      <rect x="220" y="130" width="20" height="20" fill="var(--accent)" fill-opacity="0.4"/>
      <rect x="200" y="150" width="20" height="20" fill="var(--accent)" fill-opacity="0.4"/>
      <rect x="220" y="150" width="20" height="20" fill="var(--accent)" fill-opacity="0.4"/>
      <rect x="240" y="150" width="20" height="20" fill="var(--accent)" fill-opacity="0.4"/>
      <rect x="220" y="170" width="20" height="20" fill="var(--accent)" fill-opacity="0.4"/>
      <rect x="240" y="170" width="20" height="20" fill="var(--accent)" fill-opacity="0.4"/>
      <rect x="260" y="170" width="20" height="20" fill="var(--accent)" fill-opacity="0.4"/>
      <path d="M120 30 V190 M140 30 V190 M160 30 V190 M180 30 V190 M200 30 V190 M220 30 V190 M240 30 V190 M260 30 V190 M280 30 V190 M120 30 H280 M120 50 H280 M120 70 H280 M120 90 H280 M120 110 H280 M120 130 H280 M120 150 H280 M120 170 H280 M120 190 H280" fill="none" stroke="var(--muted)" stroke-width="0.8"/>
      <text x="200" y="210" text-anchor="middle" font-size="11">window w = 3</text>
      <text x="382" y="44" text-anchor="end" font-size="10.5" fill="var(--muted)">layer 3</text>
      <text x="382" y="86" text-anchor="end" font-size="10.5" fill="var(--muted)">layer 2</text>
      <text x="382" y="128" text-anchor="end" font-size="10.5" fill="var(--muted)">layer 1</text>
      <text x="382" y="170" text-anchor="end" font-size="10.5" fill="var(--muted)">input</text>
      <path d="M 686 40 L 530 166 L 686 166 Z" fill="var(--accent)" fill-opacity="0.08" stroke="var(--accent)" stroke-width="1" stroke-dasharray="3 3"/>
      <circle cx="400" cy="40" r="5" fill="none" stroke="var(--muted)" stroke-width="1.1"/>
      <circle cx="426" cy="40" r="5" fill="none" stroke="var(--muted)" stroke-width="1.1"/>
      <circle cx="452" cy="40" r="5" fill="none" stroke="var(--muted)" stroke-width="1.1"/>
      <circle cx="478" cy="40" r="5" fill="none" stroke="var(--muted)" stroke-width="1.1"/>
      <circle cx="504" cy="40" r="5" fill="none" stroke="var(--muted)" stroke-width="1.1"/>
      <circle cx="530" cy="40" r="5" fill="none" stroke="var(--muted)" stroke-width="1.1"/>
      <circle cx="556" cy="40" r="5" fill="none" stroke="var(--muted)" stroke-width="1.1"/>
      <circle cx="582" cy="40" r="5" fill="none" stroke="var(--muted)" stroke-width="1.1"/>
      <circle cx="608" cy="40" r="5" fill="none" stroke="var(--muted)" stroke-width="1.1"/>
      <circle cx="634" cy="40" r="5" fill="none" stroke="var(--muted)" stroke-width="1.1"/>
      <circle cx="660" cy="40" r="5" fill="none" stroke="var(--muted)" stroke-width="1.1"/>
      <circle cx="686" cy="40" r="5" fill="var(--accent)" stroke="var(--accent)" stroke-width="1.1"/>
      <circle cx="400" cy="82" r="5" fill="none" stroke="var(--muted)" stroke-width="1.1"/>
      <circle cx="426" cy="82" r="5" fill="none" stroke="var(--muted)" stroke-width="1.1"/>
      <circle cx="452" cy="82" r="5" fill="none" stroke="var(--muted)" stroke-width="1.1"/>
      <circle cx="478" cy="82" r="5" fill="none" stroke="var(--muted)" stroke-width="1.1"/>
      <circle cx="504" cy="82" r="5" fill="none" stroke="var(--muted)" stroke-width="1.1"/>
      <circle cx="530" cy="82" r="5" fill="none" stroke="var(--muted)" stroke-width="1.1"/>
      <circle cx="556" cy="82" r="5" fill="none" stroke="var(--muted)" stroke-width="1.1"/>
      <circle cx="582" cy="82" r="5" fill="none" stroke="var(--muted)" stroke-width="1.1"/>
      <circle cx="608" cy="82" r="5" fill="none" stroke="var(--muted)" stroke-width="1.1"/>
      <circle cx="634" cy="82" r="5" fill="var(--accent)" stroke="var(--accent)" stroke-width="1.1"/>
      <circle cx="660" cy="82" r="5" fill="var(--accent)" stroke="var(--accent)" stroke-width="1.1"/>
      <circle cx="686" cy="82" r="5" fill="var(--accent)" stroke="var(--accent)" stroke-width="1.1"/>
      <circle cx="400" cy="124" r="5" fill="none" stroke="var(--muted)" stroke-width="1.1"/>
      <circle cx="426" cy="124" r="5" fill="none" stroke="var(--muted)" stroke-width="1.1"/>
      <circle cx="452" cy="124" r="5" fill="none" stroke="var(--muted)" stroke-width="1.1"/>
      <circle cx="478" cy="124" r="5" fill="none" stroke="var(--muted)" stroke-width="1.1"/>
      <circle cx="504" cy="124" r="5" fill="none" stroke="var(--muted)" stroke-width="1.1"/>
      <circle cx="530" cy="124" r="5" fill="none" stroke="var(--muted)" stroke-width="1.1"/>
      <circle cx="556" cy="124" r="5" fill="none" stroke="var(--muted)" stroke-width="1.1"/>
      <circle cx="582" cy="124" r="5" fill="var(--accent)" stroke="var(--accent)" stroke-width="1.1"/>
      <circle cx="608" cy="124" r="5" fill="var(--accent)" stroke="var(--accent)" stroke-width="1.1"/>
      <circle cx="634" cy="124" r="5" fill="var(--accent)" stroke="var(--accent)" stroke-width="1.1"/>
      <circle cx="660" cy="124" r="5" fill="var(--accent)" stroke="var(--accent)" stroke-width="1.1"/>
      <circle cx="686" cy="124" r="5" fill="var(--accent)" stroke="var(--accent)" stroke-width="1.1"/>
      <circle cx="400" cy="166" r="5" fill="none" stroke="var(--muted)" stroke-width="1.1"/>
      <circle cx="426" cy="166" r="5" fill="none" stroke="var(--muted)" stroke-width="1.1"/>
      <circle cx="452" cy="166" r="5" fill="none" stroke="var(--muted)" stroke-width="1.1"/>
      <circle cx="478" cy="166" r="5" fill="none" stroke="var(--muted)" stroke-width="1.1"/>
      <circle cx="504" cy="166" r="5" fill="none" stroke="var(--muted)" stroke-width="1.1"/>
      <circle cx="530" cy="166" r="5" fill="var(--accent)" stroke="var(--accent)" stroke-width="1.1"/>
      <circle cx="556" cy="166" r="5" fill="var(--accent)" stroke="var(--accent)" stroke-width="1.1"/>
      <circle cx="582" cy="166" r="5" fill="var(--accent)" stroke="var(--accent)" stroke-width="1.1"/>
      <circle cx="608" cy="166" r="5" fill="var(--accent)" stroke="var(--accent)" stroke-width="1.1"/>
      <circle cx="634" cy="166" r="5" fill="var(--accent)" stroke="var(--accent)" stroke-width="1.1"/>
      <circle cx="660" cy="166" r="5" fill="var(--accent)" stroke="var(--accent)" stroke-width="1.1"/>
      <circle cx="686" cy="166" r="5" fill="var(--accent)" stroke="var(--accent)" stroke-width="1.1"/>
      <text x="543.0" y="210" text-anchor="middle" font-size="11">3 layers × window 3 → reaches 7 tokens</text>
    </g>
  </svg>
  <figcaption>Left: each token looks at only the last 3. Right: stacking layers widens the cone, so information still travels far.</figcaption>
</figure>

The arithmetic is simple: each layer adds `w − 1` tokens of reach, so after `L` layers a token can draw on about `L × (w − 1) + 1` tokens. With the tiny window of 3 in the picture, 3 layers reach 7 tokens. With Mistral's window of 4,096 and its 32 layers, that's roughly 131,000 tokens of theoretical reach, while each layer only ever scores 4,096 positions per token. Some models mix the two, alternating sliding-window layers with full-attention layers.

## Now build it yourself

Three pieces. First, the cache arithmetic, so the table above stops being a claim:

```python
def kv_cache_gib(layers, kv_heads, head_dim, tokens, batch=1, bytes_per=2):
    # 2 = one K and one V; bytes_per=2 for fp16/bf16
    return 2 * layers * kv_heads * head_dim * tokens * batch * bytes_per / 2**30

print(kv_cache_gib(32, 32, 128, 8192))   # 4.0    every head keeps its own K/V (MHA)
print(kv_cache_gib(32, 8, 128, 8192))    # 1.0    8 shared K/V heads (GQA)
print(kv_cache_gib(32, 1, 128, 8192))    # 0.125  one shared K/V head (MQA)
```

Second, the core of FlashAttention: tiled attention with an online softmax, checked against the naive version.

```python
import torch

def tiled_attention(q, k, v, block=64):
    # q: (T, d); k, v: (N, d). Never materialises the full T x N score matrix.
    scale = q.size(-1) ** -0.5
    m = torch.full((q.size(0), 1), float("-inf"))   # running max score, per query
    l = torch.zeros(q.size(0), 1)                    # running softmax denominator
    acc = torch.zeros(q.size(0), v.size(-1))         # running weighted sum of values
    for j in range(0, k.size(0), block):
        s = (q @ k[j:j + block].T) * scale           # scores for one tile of keys
        m_new = torch.maximum(m, s.max(dim=-1, keepdim=True).values)
        p = torch.exp(s - m_new)
        fix = torch.exp(m - m_new)                   # rescale everything seen so far
        l = l * fix + p.sum(dim=-1, keepdim=True)
        acc = acc * fix + p @ v[j:j + block]
        m = m_new
    return acc / l

q, k, v = torch.randn(128, 64), torch.randn(1024, 64), torch.randn(1024, 64)
ref = torch.softmax(q @ k.T / 64**0.5, dim=-1) @ v
print(torch.allclose(tiled_attention(q, k, v), ref, atol=1e-5))   # True: exact, not approximate
```

The line to stare at is `fix = torch.exp(m - m_new)`. When a new tile contains a bigger score than anything seen so far, everything accumulated was computed against the old maximum, and this factor corrects it. That one line is why the tiles can be processed in sequence without ever seeing the whole row. The real kernel does this in fused GPU code with the tiles held in SRAM, but the math is exactly this.

Third, grouped-query attention, which is shorter than it sounds:

```python
import torch.nn.functional as F

def gqa(q, k, v):
    # q: (B, Hq, T, d); k, v: (B, Hkv, T, d) with Hq a multiple of Hkv
    group = q.size(1) // k.size(1)
    k = k.repeat_interleave(group, dim=1)     # each K/V head serves `group` query heads
    v = v.repeat_interleave(group, dim=1)
    return F.scaled_dot_product_attention(q, k, v, is_causal=True)
```

Only the 8 K/V heads ever go into the cache. The repeat happens on the fly, at attention time.

## The family, assembled

That's the series. Put the four parts together and you can read the architecture of a modern open LLM layer by layer:

1. **[Attention](/blog/attention-intuitively/)**: a soft dictionary lookup. Queries against keys, scaled, softmaxed, used to blend values. Several heads in parallel, each specializing.
2. **[The block and the decoder](/blog/transformers-encoder-decoder/)**: attention to communicate, a feed-forward network to compute, residuals and pre-norm around both, stacked deep. Causal, decoder-only, because "predict the next token" turned out to be the most general task there is.
3. **[Position](/blog/transformers-positional-encoding/)**: RoPE rotates queries and keys so the attention score sees only the distance between tokens. Stretch the rotation angles carefully and the context grows.
4. **Efficiency**: a KV cache so the past is never recomputed, GQA so that cache stays small, FlashAttention so the score matrix never touches slow memory, and sometimes a sliding window so not everything needs scoring.

Every one of these pieces you have now written yourself and checked against the real thing. That's the point of the series. When you next read a model card that says *"decoder-only, RoPE, GQA with 8 KV heads, 128K context,"* it shouldn't read like jargon. It should read like a list of design decisions, each with a reason you can explain.
