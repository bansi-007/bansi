---
title: 'Attention, Intuitively'
description: 'The one idea behind every large language model, built from scratch, with a widget you can drag. Part 1 of the Transformer family.'
pubDate: 2026-08-29
tags: ['transformers']
draft: false
---

Everyone can recite the formula: `softmax(QKᵀ / √dₖ)·V`. Far fewer can tell you *why* each piece is there, or what actually happens when a word "attends" to another. I've found the fastest way to fix that isn't more notation. It's to grab the thing and move it. So this post has a widget you can drag, and the math shows up only after you've already felt it.

This is part one of a series on the Transformer family. We start where the family starts: **attention**.

## A word is nothing on its own

Take one sentence:

> "The animal didn't cross the street because **it** was too tired."

What does *"it"* refer to? You know instantly: the **animal**, not the street. But a model sees *"it"* as a lone vector with no idea. To represent it correctly, the model has to reach back across the sentence and pull in meaning from the word that matters.

That reaching-back is attention. Not a lookup table someone wrote, but a mechanism the model **learns**, one that lets every word decide which other words to listen to.

## A soft dictionary lookup

Here's the mental model that makes everything else click. Every word emits three vectors:

- a **Query**: "what am I looking for?"
- a **Key**: "what do I advertise?"
- a **Value**: "what do I actually hand over?"

A normal dictionary needs an *exact* key match to return one value. Attention is a **soft** dictionary: it compares your query against *every* key, turns those matches into weights, and hands back a **blend of all the values**.

Below, four words sit in a 2-D space as their key vectors. The word *"it"* carries the draggable **query**. Drag it around. The closer it points toward a word, the more that word wins the blend. Then flip to the second panel and click any word in the real sentence to see the same thing over language.

<div class="embed">
  <iframe id="attn-frame" src="/interactives/attention.html" title="Interactive attention explorer" loading="lazy"></iframe>
</div>

<script>
  addEventListener('message', function (e) {
    if (e.origin === location.origin && e.data && e.data.attnH) {
      var f = document.getElementById('attn-frame');
      if (f) f.style.height = e.data.attnH + 'px';
    }
  });
</script>

Notice what happens when the query sits near the center, weak and pointing nowhere in particular: the weights stay roughly **uniform**: a vague query attends to everything a little. Push it out toward *animal* and the distribution collapses onto that one word. That's the whole game: **direction and strength of the query decide the blend.**

## The four steps

Everything you just did is four operations. That's the entire formula, unpacked:

<figure>
  <svg viewBox="0 0 720 128" role="img" aria-label="Score via Q dot K transpose, divide by root d-k, softmax to weights, multiply by values to get the output.">
    <defs>
      <marker id="ah" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="currentColor"/></marker>
      <marker id="ahq" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="var(--accent)"/></marker>
    </defs>
    <g font-family="ui-monospace, Menlo, monospace" font-size="12.5" text-anchor="middle" fill="currentColor">
      <rect x="6" y="34" width="120" height="56" rx="9" fill="none" stroke="currentColor" stroke-width="1.3"/>
      <text x="66" y="58">Q · Kᵀ</text><text x="66" y="77" font-size="10.5" fill="var(--muted)">raw scores</text>
      <line x1="126" y1="62" x2="184" y2="62" stroke="currentColor" stroke-width="1.3" marker-end="url(#ah)"/>
      <text x="155" y="53" font-size="10.5" fill="var(--muted)">÷√dₖ</text>
      <rect x="188" y="34" width="140" height="56" rx="9" fill="none" stroke="currentColor" stroke-width="1.3"/>
      <text x="258" y="58">softmax</text><text x="258" y="77" font-size="10.5" fill="var(--accent)">→ weights</text>
      <line x1="328" y1="62" x2="386" y2="62" stroke="var(--accent)" stroke-width="1.5" marker-end="url(#ahq)"/>
      <rect x="390" y="34" width="150" height="56" rx="9" fill="none" stroke="var(--accent)" stroke-width="1.5"/>
      <text x="465" y="58" fill="var(--accent)">weights · V</text><text x="465" y="77" font-size="10.5" fill="var(--muted)">blend the values</text>
      <line x1="540" y1="62" x2="598" y2="62" stroke="currentColor" stroke-width="1.3" marker-end="url(#ah)"/>
      <rect x="602" y="34" width="112" height="56" rx="9" fill="none" stroke="currentColor" stroke-width="1.3"/>
      <text x="658" y="58">output</text><text x="658" y="77" font-size="10.5" fill="var(--muted)">context</text>
    </g>
  </svg>
  <figcaption>Score → scale → softmax → blend. Four steps, one formula.</figcaption>
</figure>

1. **Score.** `Q·Kᵀ`, the dot product of a query with each key, measures alignment. A high score means "this word is relevant to me."
2. **Scale.** divide by `√dₖ` (you just played with this on the slider).
3. **Softmax.** turn raw scores into weights that sum to 1.
4. **Blend.** the weighted sum of the **values** is the word's new, context-aware representation.

That's it. Attention is a similarity measure, normalized into a weighting, used to average.

## Why divide by √dₖ

This is the step everyone memorizes and nobody questions. Play with the slider in the widget and it stops being mysterious.

As vectors get wider (bigger `dₖ`), dot products grow larger on average. Feed large numbers into softmax and it turns **spiky**: one word grabs essentially all the weight, the rest get zero. And when softmax saturates like that, the gradient flowing back through it goes to zero too. Training stalls.

> Dividing by √dₖ rescales the scores back to a sane range, so softmax stays soft and gradients keep flowing. It's not a cosmetic constant. It's what keeps the layer trainable.

## One attention isn't enough: multi-head

A single attention pattern can only capture one kind of relationship. But language has many at once: a pronoun points back to its noun, a verb binds to its subject, an adjective leans on what it modifies. So real models run several attentions **in parallel**, each on a smaller slice of the vector. Each one is a **head**, and each learns to specialize.

Toggle between the two heads in the widget: **Head A** chases *meaning*: *"it"* reaches back to *animal*. **Head B** just watches *position*: every word peeks at the one before it. Same machinery, different jobs, stacked together. And splitting into `h` smaller heads costs the same compute as one big attention: specialization, essentially for free.

## Three things that carry forward

**Causal masking.** In a text-generating model, a word must not peek at the future. Right before softmax, future positions are set to −∞ so their weight becomes exactly zero. That single change is the *only* difference between the attention here and the attention a GPT-style model runs.

**Self vs cross.** When the queries, keys, and values all come from the same sequence, it's **self-attention**: a sentence reading itself. When the queries come from one place and the keys/values from another (a translation reading its source), it's **cross-attention**. Same operation, different wiring. We'll use both in part two.

**The quadratic.** `Q·Kᵀ` is an `n × n` matrix: every word scores every other word. That **O(n²)** in sequence length is precisely why long context is expensive, and why FlashAttention, grouped-query attention, and the rest of the efficiency toolkit exist. That's a whole post of its own, later in the series.

## Now build it yourself

You don't own attention until you've written it. Implement scaled dot-product attention in pure PyTorch, with no `nn.MultiheadAttention` and no `F.scaled_dot_product_attention` to lean on.

```python
import torch, torch.nn.functional as F

def scaled_dot_product_attention(q, k, v, causal=True):
    # q, k, v: (B, H, T, d)
    d = q.size(-1)
    scores = (q @ k.transpose(-2, -1)) / d**0.5      # 1. score + 2. scale
    if causal:
        T = q.size(-2)
        mask = torch.triu(torch.ones(T, T, device=q.device, dtype=torch.bool), 1)
        scores = scores.masked_fill(mask, float("-inf"))  # no peeking at the future
    weights = scores.softmax(dim=-1)                  # 3. softmax
    return weights @ v                                # 4. blend

# prove it against the real thing
B, H, T, d = 2, 4, 16, 32
q, k, v = (torch.randn(B, H, T, d) for _ in range(3))
mine = scaled_dot_product_attention(q, k, v, causal=True)
ref  = F.scaled_dot_product_attention(q, k, v, is_causal=True)
print(torch.allclose(mine, ref, atol=1e-5))          # True
```

When that prints `True`, you've built the exact operation running inside every LLM you've ever used. Everything else in the Transformer family (encoders, decoders, positional schemes, the efficiency tricks) is scaffolding around this one idea.

Next in the series: how the original Transformer wires two of these stacks together into an encoder and a decoder, and why modern LLMs quietly threw the encoder away.
