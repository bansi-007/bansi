---
title: 'Making Attention Affordable: KV Cache, GQA, and FlashAttention'
description: 'Attention cost grows with the square of the context, and generating text is limited by memory bandwidth. The techniques that make long-context LLMs practical, each one worked through with numbers and code. Part 4, the last in the Transformer family.'
pubDate: 2026-11-05
tags: ['transformers']
draft: false
---

In [part one](/blog/attention-intuitively/) I pointed at one detail and said we'd come back to it: `Q·Kᵀ` is an `n × n` matrix, because every token scores every other token. Doubling the context quadruples that work.

A lot of the engineering in modern LLMs exists to deal with that. This last part of the series covers the main techniques. None of them change what the model computes; they change how often it's computed, and where in memory the data lives while it happens.

## Two different bottlenecks

"Attention is slow" is really two separate problems, and they need different fixes.

**Prefill** is when the model reads your prompt. All the tokens are known up front, so the model processes them in one parallel pass. The cost here is the `n × n` score matrix: the compute to fill it, and the memory to hold it. This is the quadratic part.

Here's how fast it grows. Count the entries in one head's score matrix, at 16 bits (2 bytes) each:

| context | scores (n × n) | memory, one head, one layer |
|---|---|---|
| 4,096 | 16.8 million | 32 MiB |
| 32,768 | 1.07 billion | 2 GiB |
| 131,072 (128K) | 17.2 billion | **32 GiB** |

Thirty-two times the context needs 1,024 times the memory, and a real model has dozens of heads in each of dozens of layers.

**Decode** is when the model writes its answer, one token at a time. Each new token needs very little arithmetic, but it has to attend to everything before it, which means reading a lot of stored data. The GPU spends most of the decode step waiting for that data to arrive from memory rather than computing. Decode is **memory-bound**.

In short, prefill is limited by compute and decode by memory bandwidth. Most of the techniques below reduce how much data has to be stored or moved.

## The KV cache: don't recompute the past

Say the model has generated 500 tokens and is about to generate the 501st. The naive approach runs all 501 tokens through every layer again. That's unnecessary because of the property we tested in [part two](/blog/transformers-encoder-decoder/): with a causal mask, earlier tokens never attend to later ones. So the keys and values for tokens 1 to 500 are exactly what they were at the previous step.

So they're computed once and stored. At each step, the new token computes only its own query, key and value, adds its key and value to the cache, and attends over the whole cache. The work per step drops from reprocessing the whole sequence to processing one token.

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

This is the **KV cache**, and every LLM serving system uses one. It saves compute at the cost of memory, and that memory grows quickly. For every token, every layer stores a key and a value for every key/value head:

```
cache bytes = 2 (K and V) × layers × kv_heads × head_dim × tokens × bytes per number
```

Take a model shaped like Llama 3 8B: 32 layers, 32 attention heads, a head dimension of 128, stored in 16-bit precision. At an 8,192-token context, if every head kept its own keys and values, the cache would be **4 GiB for a single conversation**:

```
2 × 32 layers × 32 heads × 128 dims × 2 bytes  =  524,288 bytes  =  512 KiB per token
512 KiB × 8,192 tokens                          =  4 GiB
```

That's half a megabyte per token, so even a 100-token paragraph takes 50 MiB. At 4 GiB per conversation, about four concurrent users would need as much memory for their caches as the model's weights take up (around 16 GB in 16-bit).

This is why long contexts are expensive to serve, not just to train, and it's the problem the next technique addresses.

## MQA and GQA: sharing keys and values between heads

In [part one](/blog/attention-intuitively/), each attention head had its own queries, keys and values, which is what lets different heads learn different patterns. But the cache only stores keys and values. Queries are used once and discarded.

**Multi-query attention** (MQA, Shazeer, 2019) keeps a separate query per head but has all the heads share a single set of keys and values. The cache shrinks by a factor equal to the number of heads, often 32 or more. The cost is some loss of quality, since the heads now have less room to specialize.

**Grouped-query attention** (GQA, Ainslie et al., 2023) sits between the two. The query heads are split into groups, and each group shares one key/value head. Llama 3 8B has 32 query heads and 8 key/value heads, so each key/value head serves 4 query heads.

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

GQA keeps most of MQA's memory savings while staying close to full multi-head quality. Llama 2 70B, all the Llama 3 models and Mistral 7B use it, and it's the most common choice in recent open models.

## FlashAttention: the same result with less memory traffic

The KV cache and GQA reduce how much is stored. FlashAttention (Dao et al., 2022) reduces how much data attention moves around, and it's a major reason long-context training became affordable.

Two kinds of GPU memory matter here. **HBM** is the main memory: tens of gigabytes, and relatively slow to read and write. **SRAM** is on the chip itself: much faster, but far smaller, on the order of tens of megabytes across the whole GPU. The straightforward way to compute attention writes the full `n × n` score matrix to HBM, reads it back to apply softmax, writes the result, and reads that back again to multiply by V. At long context lengths, most of the time goes into those reads and writes rather than the arithmetic.

FlashAttention never stores the full matrix. It takes a block of queries, streams the keys and values through in tiles small enough to fit in SRAM, and keeps a running result:

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

The difficulty is softmax. Each row's softmax needs the maximum score and the sum of exponentials over the whole row, and with tiling you only see part of the row at a time. FlashAttention uses an **online softmax**: it keeps a running maximum and a running sum, and whenever a new tile has a higher maximum, it rescales what it has accumulated so far. It divides by the sum once at the end.

### The online softmax, by hand

One query and four keys. The scores are `[1, 3, 2, 5]`, and to keep the arithmetic readable the values are single numbers, `[10, 20, 30, 40]`. We process them in two tiles of two.

**Tile 1**, scores `[1, 3]`. The running maximum is `m = 3`. Taking exponentials relative to it gives e<sup>1−3</sup> = 0.135 and e<sup>3−3</sup> = 1. So the running sum is `l = 1.135`, and the running output is `acc = 0.135 × 10 + 1 × 20 = 21.35`.

**Tile 2**, scores `[2, 5]`. The maximum rises from 3 to 5, so the tile 1 numbers were computed relative to the wrong maximum. The correction factor is `fix = e^(3−5) = 0.135`. Multiply the old totals by it, then add the new tile, computed relative to the new maximum:

| | from tile 1 | × fix | + tile 2 | running total |
|---|---|---|---|---|
| `l` | 1.135 | 0.154 | e<sup>2−5</sup> + e<sup>5−5</sup> = 0.050 + 1 | **1.203** |
| `acc` | 21.35 | 2.89 | 0.050 × 30 + 1 × 40 = 41.49 | **44.38** |

**Result:** `acc / l = 44.38 / 1.203 = 36.88`.

**Checked directly:** the softmax of all four scores is `[0.015, 0.113, 0.041, 0.831]`, and 0.015 × 10 + 0.113 × 20 + 0.041 × 30 + 0.831 × 40 = **36.88**. It's the same answer, computed without ever holding all four scores at once.

FlashAttention is exact, not an approximation: it produces the same numbers as the straightforward method, without ever writing the full score matrix to memory. The memory needed for attention becomes linear in sequence length instead of quadratic, and the computation gets considerably faster because it isn't waiting on HBM. FlashAttention-2 and FlashAttention-3 improved the implementation further for newer GPUs. PyTorch's `F.scaled_dot_product_attention`, which we've used since part one, picks a FlashAttention kernel automatically when the hardware and inputs support it.

## Sliding-window attention

The last technique is to limit how far back each token looks. With sliding-window attention, each token attends only to the most recent `w` tokens, itself included. Mistral 7B uses a window of 4,096.

That looks like it would lose long-range information, but stacking layers recovers much of it. In layer 1, a token sees 4,096 tokens back. In layer 2, it sees tokens that each saw 4,096 back in layer 1, so information can come from roughly twice as far. Over many layers the reach grows well past one window, while each layer's cost stays fixed.

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

Each layer extends the reach by `w − 1` tokens, so after `L` layers a token can draw on about `L × (w − 1) + 1` tokens. With the window of 3 in the diagram, 3 layers reach 7 tokens. With Mistral's window of 4,096 and its 32 layers, the theoretical reach is about 131,000 tokens, although each layer only scores 4,096 positions per token. Some models alternate sliding-window layers with full-attention layers.

## Now build it yourself

Three pieces. First, the cache formula as a function, so you can check the table above:

```python
def kv_cache_gib(layers, kv_heads, head_dim, tokens, batch=1, bytes_per=2):
    # 2 = one K and one V; bytes_per=2 for fp16/bf16
    return 2 * layers * kv_heads * head_dim * tokens * batch * bytes_per / 2**30

print(kv_cache_gib(32, 32, 128, 8192))   # 4.0    every head keeps its own K/V (MHA)
print(kv_cache_gib(32, 8, 128, 8192))    # 1.0    8 shared K/V heads (GQA)
print(kv_cache_gib(32, 1, 128, 8192))    # 0.125  one shared K/V head (MQA)
```

Second, the core of FlashAttention: tiled attention with an online softmax, compared against the straightforward version.

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

The important line is `fix = torch.exp(m - m_new)`. When a tile contains a score larger than any seen so far, everything accumulated up to that point was computed against the old maximum, and this factor corrects it. That's what allows the tiles to be processed one after another without ever seeing the whole row. The real kernel does the same arithmetic in fused GPU code with the tiles held in SRAM.

Third, grouped-query attention, which takes only a few lines:

```python
import torch.nn.functional as F

def gqa(q, k, v):
    # q: (B, Hq, T, d); k, v: (B, Hkv, T, d) with Hq a multiple of Hkv
    group = q.size(1) // k.size(1)
    k = k.repeat_interleave(group, dim=1)     # each K/V head serves `group` query heads
    v = v.repeat_interleave(group, dim=1)
    return F.scaled_dot_product_attention(q, k, v, is_causal=True)
```

Only the 8 key/value heads are stored in the cache. They're repeated to match the 32 query heads at the moment attention is computed.

## The whole series in one place

Put the four parts together and you can follow the architecture of a typical modern open LLM layer by layer:

1. **[Attention](/blog/attention-intuitively/)**: a soft dictionary lookup. Queries are compared against keys, scaled, passed through softmax, and used to blend the values. Several heads run in parallel and learn different patterns.
2. **[The block and the decoder](/blog/transformers-encoder-decoder/)**: attention to share information between tokens, a feed-forward network to process each token, residual connections and pre-norm around both, stacked many times. Most large LLMs are causal and decoder-only, largely because next-token prediction turned out to train well and to cover a very wide range of tasks.
3. **[Position](/blog/transformers-positional-encoding/)**: RoPE rotates queries and keys so that the attention score depends only on the distance between tokens. Rescaling the rotation angles is one of the main ways context windows are extended.
4. **Efficiency**: a KV cache so earlier tokens aren't recomputed, GQA to keep that cache small, FlashAttention so the score matrix never goes to slow memory, and in some models a sliding window to limit how much is scored.

Across the four posts you've implemented attention, a full decoder-only model, RoPE, tiled attention and GQA, and checked each one against PyTorch or against the expected property. So when a model card lists *"decoder-only, RoPE, GQA with 8 KV heads, 128K context"*, you should be able to say what each of those choices does and why it was made.
