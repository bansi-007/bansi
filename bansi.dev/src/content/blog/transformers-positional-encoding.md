---
title: 'Where Is Each Word? Positional Encoding, From Sines to RoPE'
description: "Attention has no idea what order words come in. How Transformers get position back, from the original sine waves to RoPE, the rotation trick inside almost every modern LLM. Part 3 of the Transformer family."
pubDate: 2026-10-15
tags: ['transformers']
draft: false
---

*"Dog bites man"* and *"man bites dog"* are the same three words. One is a Tuesday; the other is the news. The only difference is order.

Here's the uncomfortable fact this post is about: **attention, on its own, cannot tell those two sentences apart.** Everything we built in [part one](/blog/attention-intuitively/) and [part two](/blog/transformers-encoder-decoder/) treats its input as a *set* of tokens, not a sequence. So every Transformer needs some way of putting order back in. How it does that turns out to decide how long a context the model can handle, and why "128K context" is harder than just changing a number.

## Attention can't count

Look at the attention formula again: `softmax(QKᵀ/√dₖ)·V`. Every token scores every other token by content alone. Nothing in it says *where* a token is. Shuffle the input and each token gets exactly the same answer it got before. The outputs just come out shuffled the same way.

You can check it in four lines:

```python
import torch, torch.nn.functional as F

x = torch.randn(1, 6, 32)                       # six tokens, no position information
perm = torch.randperm(6)                        # shuffle the sentence
out = F.scaled_dot_product_attention(x, x, x)
out_shuffled = F.scaled_dot_product_attention(x[:, perm], x[:, perm], x[:, perm])
print(torch.allclose(out[:, perm], out_shuffled, atol=1e-6))   # True: same answers, just reordered
```

The formal word is **permutation-equivariant**. The practical word is *blind*. So position has to be put in from outside.

## Fix one: add a position vector

The original Transformer's answer was direct: before the first block, **add** a vector to each token's embedding that encodes its position. Token at position 7 gets "position 7" mixed into it, and from then on the model can, in principle, work out order.

The vectors they chose were sine and cosine waves at different frequencies:

```
PE(pos, 2i)   = sin(pos / 10000^(2i/d))
PE(pos, 2i+1) = cos(pos / 10000^(2i/d))
```

The intuition is a clock with many hands. The first pair of dimensions is a second hand, spinning fast. Later pairs are minute hands, hour hands, day hands, each slower than the last. Read all the hands together and you know exactly what time it is, meaning which position you're at. And because it's built from sines and cosines, the shift from one position to another is a fixed linear transformation, which the authors hoped the model could learn to use.

The simpler alternative, used by BERT and GPT-2 (and our `TinyGPT` from part two), is a **learned** position embedding: a table with one trainable vector per position. It works well, with one hard limit. If the table has 1,024 rows, position 1,025 simply doesn't exist. The model has never seen it, and there's nothing to look up.

## What we actually want: distance

Both of those encode **absolute** position: "I am token 4,017." But think about what actually matters when reading. The verb wants its subject, which is usually a few words back. A closing bracket wants the matching opening bracket. A pronoun wants a recent noun.

**What matters is almost always relative: how far apart two words are, not where either one sits in the document.** *"The cat sat"* means the same thing at the start of a book and on page 300.

Adding absolute positions to the input forces the model to *learn* to subtract them, and to do that for every distance separately. The better idea is to build relative distance straight into the attention score.

## RoPE: rotate, don't add

**Rotary Position Embedding** (RoPE, Su et al., 2021) is the scheme inside Llama, Mistral, Qwen, and most open LLMs you can name. It has one elegant idea.

Don't add anything to the token. Instead, **rotate** the query and the key by an angle proportional to their position. Split each vector into pairs of dimensions, treat each pair as a point on a 2-D plane, and turn it by `position × θ`.

Now remember what attention does with a query and a key: a dot product. And the dot product of two rotated vectors depends only on the **angle between them**. Rotate the query by `5θ` and the key by `2θ`, and the score sees a `3θ` difference. Rotate them by `105θ` and `102θ` and the score sees... the same `3θ`.

<figure>
  <svg viewBox="0 0 720 225" role="img" aria-label="Two circles. On the left, a key at position 2 and a query at position 5 with a gap angle between them. On the right, the same pair at positions 102 and 105, rotated around the circle but with the same gap angle.">
    <defs>
      <marker id="rh" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="currentColor"/></marker>
      <marker id="rha" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="var(--accent)"/></marker>
    </defs>
    <g font-family="ui-monospace, Menlo, monospace" font-size="12" fill="currentColor">
      <circle cx="180" cy="110" r="80" fill="none" stroke="var(--muted)" stroke-width="1" stroke-dasharray="3 4"/>
      <circle cx="180" cy="110" r="2.5"/>
      <line x1="180" y1="110" x2="255.2" y2="82.6" stroke="currentColor" stroke-width="1.6" marker-end="url(#rh)"/>
      <line x1="180" y1="110" x2="207.4" y2="34.8" stroke="var(--accent)" stroke-width="1.8" marker-end="url(#rha)"/>
      <path d="M 211.9 98.4 A 34 34 0 0 0 191.6 78.0" fill="none" stroke="var(--accent)" stroke-width="1.2"/>
      <text x="262" y="80">k @ 2</text>
      <text x="212" y="26" fill="var(--accent)">q @ 5</text>
      <text x="222" y="70" font-size="10.5" fill="var(--accent)">3θ</text>
      <text x="180" y="214" text-anchor="middle" font-size="11" fill="var(--muted)">positions 5 and 2</text>

      <text x="360" y="106" text-anchor="middle" font-size="11" fill="var(--muted)">same gap</text>
      <text x="360" y="122" text-anchor="middle" font-size="11" fill="var(--muted)">= same score</text>

      <circle cx="540" cy="110" r="80" fill="none" stroke="var(--muted)" stroke-width="1" stroke-dasharray="3 4"/>
      <circle cx="540" cy="110" r="2.5"/>
      <line x1="540" y1="110" x2="470.7" y2="70" stroke="currentColor" stroke-width="1.6" marker-end="url(#rh)"/>
      <line x1="540" y1="110" x2="464.8" y2="137.4" stroke="var(--accent)" stroke-width="1.8" marker-end="url(#rha)"/>
      <path d="M 510.6 93 A 34 34 0 0 0 508.1 121.6" fill="none" stroke="var(--accent)" stroke-width="1.2"/>
      <text x="464" y="62" text-anchor="end">k @ 102</text>
      <text x="458" y="154" text-anchor="end" fill="var(--accent)">q @ 105</text>
      <text x="520" y="111" text-anchor="end" font-size="10.5" fill="var(--accent)">3θ</text>
      <text x="540" y="214" text-anchor="middle" font-size="11" fill="var(--muted)">positions 105 and 102</text>
    </g>
  </svg>
  <figcaption>RoPE turns position into an angle. Move both tokens along the sequence and the pair rotates together; the gap between them, and so the attention score, stays the same.</figcaption>
</figure>

> RoPE gets relative position for free. Each token only ever encodes its own absolute position, as a rotation. But the moment a query meets a key in the dot product, the absolutes cancel and only the distance survives.

A few details make it work in practice:

- **Many frequencies, like the clock.** Each pair of dimensions rotates at its own speed, using the same `10000^(-2i/d)` schedule as the original sinusoids. Fast pairs resolve small distances precisely. Slow pairs tell "near" from "far" across thousands of tokens.
- **Only queries and keys get rotated.** Values are left alone. Position should affect *who you listen to*, not *what they say*.
- **It's applied in every layer**, not just once at the input, so position information never fades as the vectors pass through dozens of blocks.
- **Rotation never changes a vector's length.** Content and position stay separate: the length carries "how strongly," the angle carries "where."

## ALiBi: just penalize distance

There's an even blunter idea, **ALiBi** (Press et al., 2021): skip position vectors entirely, and subtract a penalty from each attention score proportional to the distance between the two tokens. Far-away tokens get pushed down; nearby ones are favored. Each head gets its own penalty slope, so some heads look locally and some look far.

ALiBi's selling point was its title: *train short, test long*. Because a penalty for distance 5,000 is just a bigger number, not an unseen embedding, the model degrades gracefully on inputs longer than it was trained on. RoPE ended up being the more widely adopted scheme, but ALiBi showed clearly that position doesn't have to be a vector at all.

## Stretching the context

Here's why this matters right now. Suppose a model was trained with RoPE on sequences of 4,096 tokens, and you want it to read 32,000.

At position 20,000, the slow-rotating dimensions reach angles they **never reached in training**. The model is in unfamiliar territory, and quality falls off a cliff.

The fixes all work by bringing those angles back into familiar range:

- **Position interpolation** squeezes the positions. Treat position 32,000 as if it were 4,096 by scaling every position down by 8×. All angles stay in the trained range, at the cost of packing nearby tokens closer together. A short fine-tune lets the model adjust.
- **NTK-aware scaling and YaRN** are smarter about it. They leave the fast, high-frequency dimensions alone, since those handle local detail and never ran out of range, and stretch only the slow ones.

This is a big part of why context windows jumped from 4K to 128K and beyond in a couple of years. Much of it didn't need new architectures. It was smarter arithmetic on the rotation angles, plus some fine-tuning on long documents.

## Now build it yourself

RoPE in fifteen lines, followed by the property that makes it work:

```python
import torch

def rope(x, pos, base=10000.0):
    # x: (..., d) with d even. Rotate each pair of dimensions by an angle proportional to pos.
    d = x.size(-1)
    freqs = base ** (-torch.arange(0, d, 2, dtype=torch.float32) / d)   # one speed per pair
    ang = torch.as_tensor(pos, dtype=torch.float32)[..., None] * freqs
    cos, sin = ang.cos(), ang.sin()
    x1, x2 = x[..., 0::2], x[..., 1::2]
    out = torch.empty_like(x)
    out[..., 0::2] = x1 * cos - x2 * sin
    out[..., 1::2] = x1 * sin + x2 * cos
    return out

q, k = torch.randn(64), torch.randn(64)
s1 = rope(q, 5) @ rope(k, 2)        # query at 5, key at 2: three apart
s2 = rope(q, 105) @ rope(k, 102)    # query at 105, key at 102: also three apart
s3 = rope(q, 9) @ rope(k, 2)        # seven apart
print(torch.allclose(s1, s2, atol=1e-4))   # True: only the distance matters
print(torch.allclose(s1, s3, atol=1e-4))   # False: a different distance, a different score
print(torch.allclose(rope(q, 7).norm(), q.norm()))  # True: rotation never changes length
```

The first `True` is the figure above, proved in code. Same query, same key, moved a hundred positions down the sequence, and the attention score doesn't change.

To use it in the `TinyGPT` from part two, delete the `self.pos` embedding and apply `rope` to `q` and `k` inside `attn`, right before the attention call, with `pos = torch.arange(T)`. That's the change Llama made to the GPT recipe.

We now have the whole architecture: attention, blocks, the decoder-only stack, and positions. What's left is the bill. Attention compares every token with every other token, and at 128K tokens that's a very big number. [Part four](/blog/transformers-efficient-attention/) is about how anyone affords to run these things.
