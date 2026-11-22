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

**Decode** is when the model writes its answer, one token at a time. Each new token is a tiny amount of arithmetic, but it has to attend to everything that came before. The GPU spends most of its time not computing but *waiting for data to arrive from memory*. Decode is **memory-bound**.

> Prefill is limited by how fast you can compute. Decode is limited by how fast you can move bytes. Most of the tricks below are about moving fewer bytes.

## The KV cache: never recompute the past

Say the model has written 500 tokens and is about to write the 501st. Naively, it would run all 501 tokens through every layer again. Wasteful, because of the property we tested in [part two](/blog/transformers-encoder-decoder/): with a causal mask, **the past never sees the future**. The keys and values for tokens 1 through 500 are exactly what they were one step ago.

So you compute them once and keep them. At every step, the new token computes only its own query, key and value, appends its K and V to the cache, and attends over the whole cache. The work per new token goes from re-processing everything to processing one token.

That's the **KV cache**, and every serving system uses it. But it trades compute for memory, and the memory adds up fast. For every token, every layer stores a key and a value for every head:

```
cache bytes = 2 (K and V) × layers × kv_heads × head_dim × tokens × bytes per number
```

Take a model shaped like Llama 3 8B: 32 layers, 32 attention heads, a head dimension of 128, stored in 16-bit precision. At an 8,192-token context, if every head keeps its own keys and values, that's **4 GiB of cache, for one conversation**. Serve 20 users at once and the cache needs more memory than the model's own weights.

This is why long context is expensive to *serve*, not just to train. And it's what the next trick is about.

## MQA and GQA: let heads share keys

In [part one](/blog/attention-intuitively/) we gave every attention head its own queries, keys and values. That's what lets heads specialize. But look at what the cache stores: only keys and values. Queries are used once and thrown away.

**Multi-query attention** (MQA, Shazeer, 2019) asked: what if all the heads keep their own queries, but share *one* set of keys and values? The cache shrinks by the number of heads, often 32× or more. The catch is that quality drops a little, because heads lose some of their ability to specialize.

**Grouped-query attention** (GQA, Ainslie et al., 2023) is the compromise everyone settled on. Split the query heads into groups, and give each group one shared key/value head. Llama 3 8B has 32 query heads and 8 key/value heads, so every 4 query heads share one K/V.

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

> FlashAttention is not an approximation. It computes exactly the same numbers as the naive version. It just never writes the big matrix down.

The result: memory for the scores goes from quadratic to linear in sequence length, and attention gets several times faster because it stops waiting on HBM. FlashAttention-2 and FlashAttention-3 pushed the same idea further on newer GPUs. And PyTorch's `F.scaled_dot_product_attention`, the function we've been calling since part one, will quietly use a FlashAttention kernel when your hardware and inputs allow.

## Sliding windows: don't look at everything

The last trick is the most direct: **don't attend to everything.** With sliding-window attention, each token only attends to the previous `w` tokens. Mistral 7B uses a 4,096-token window.

That sounds like it would cut off long-range information, but stacking layers rescues it. Layer 1 sees 4,096 tokens back. Layer 2 sees tokens that already looked 4,096 back, so information can travel about twice as far. After many layers, information can flow across far more than one window, while the cost of each layer stays fixed. Some models mix the two, alternating sliding-window layers with full-attention layers.

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
