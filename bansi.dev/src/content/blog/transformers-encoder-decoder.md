---
title: 'Encoder, Decoder, and the One That Won'
description: 'How attention gets stacked into encoders and decoders, what BERT, T5 and GPT each kept, and why modern LLMs quietly threw the encoder away. Part 2 of the Transformer family.'
pubDate: 2026-11-22T09:00:00Z
tags: ['transformers']
draft: false
---

In [part one](/blog/attention-intuitively/) we built attention: every word sends out a query, compares it against every key, and takes home a weighted blend of values. It's the core idea. But one attention layer is not a model, any more than one gear is a watch.

This post is about the watch. How attention gets wrapped into a **block**, how blocks get stacked into an **encoder** and a **decoder**, and why, after all that careful two-part design in the original paper, nearly every LLM you use today kept only one half.

## A block: communicate, then compute

Every Transformer, whatever the family, is a stack of identical blocks. Each block does exactly two things, in order:

1. **Attention**: tokens look at each other and pull in context. This is the *communication* step.
2. **Feed-forward network (FFN)**: each token, on its own, runs through a small two-layer MLP. This is the *computation* step.

Around each of those sits a **residual connection** and a **LayerNorm**:

<figure>
  <svg viewBox="0 0 760 150" role="img" aria-label="Input x goes through LayerNorm and attention, is added back to x, then through LayerNorm and a feed-forward network, and is added back again. Repeated N times.">
    <defs>
      <marker id="bh" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="currentColor"/></marker>
      <marker id="bha" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="var(--accent)"/></marker>
    </defs>
    <g font-family="ui-monospace, Menlo, monospace" font-size="12.5" text-anchor="middle" fill="currentColor">
      <text x="20" y="90">x</text>
      <line x1="32" y1="85" x2="60" y2="85" stroke="currentColor" stroke-width="1.3" marker-end="url(#bh)"/>
      <rect x="62" y="62" width="70" height="46" rx="8" fill="none" stroke="currentColor" stroke-width="1.3"/>
      <text x="97" y="90">LN</text>
      <line x1="132" y1="85" x2="160" y2="85" stroke="currentColor" stroke-width="1.3" marker-end="url(#bh)"/>
      <rect x="162" y="58" width="140" height="54" rx="9" fill="none" stroke="var(--accent)" stroke-width="1.5"/>
      <text x="232" y="82" fill="var(--accent)">attention</text><text x="232" y="100" font-size="10.5" fill="var(--muted)">tokens talk</text>
      <line x1="302" y1="85" x2="340" y2="85" stroke="currentColor" stroke-width="1.3" marker-end="url(#bh)"/>
      <circle cx="356" cy="85" r="14" fill="none" stroke="currentColor" stroke-width="1.3"/>
      <text x="356" y="90">+</text>
      <path d="M 46 85 L 46 30 L 356 30 L 356 69" fill="none" stroke="var(--accent)" stroke-width="1.3" marker-end="url(#bha)"/>
      <text x="200" y="22" font-size="10.5" fill="var(--accent)">residual</text>
      <line x1="370" y1="85" x2="400" y2="85" stroke="currentColor" stroke-width="1.3" marker-end="url(#bh)"/>
      <rect x="402" y="62" width="70" height="46" rx="8" fill="none" stroke="currentColor" stroke-width="1.3"/>
      <text x="437" y="90">LN</text>
      <line x1="472" y1="85" x2="500" y2="85" stroke="currentColor" stroke-width="1.3" marker-end="url(#bh)"/>
      <rect x="502" y="58" width="140" height="54" rx="9" fill="none" stroke="currentColor" stroke-width="1.3"/>
      <text x="572" y="82">feed-forward</text><text x="572" y="100" font-size="10.5" fill="var(--muted)">each token thinks</text>
      <line x1="642" y1="85" x2="680" y2="85" stroke="currentColor" stroke-width="1.3" marker-end="url(#bh)"/>
      <circle cx="696" cy="85" r="14" fill="none" stroke="currentColor" stroke-width="1.3"/>
      <text x="696" y="90">+</text>
      <path d="M 386 85 L 386 30 L 696 30 L 696 69" fill="none" stroke="var(--accent)" stroke-width="1.3" marker-end="url(#bha)"/>
      <text x="540" y="22" font-size="10.5" fill="var(--accent)">residual</text>
      <line x1="710" y1="85" x2="752" y2="85" stroke="currentColor" stroke-width="1.3" marker-end="url(#bh)"/>
      <text x="380" y="140" font-size="10.5" fill="var(--muted)">× N blocks, stacked</text>
    </g>
  </svg>
  <figcaption>One block. Attention lets tokens talk; the feed-forward network lets each one think. Stack N of them.</figcaption>
</figure>

Each piece earns its place:

- **Residual connections** (`x + f(x)`) mean every block only has to learn a *correction* to what came in, not rebuild it from scratch. They also give gradients a straight highway back to the first layer, which is why you can stack dozens of these without training falling apart.
- **LayerNorm** keeps each token's vector at a sane scale as it passes through layer after layer. Modern models put it *before* each sub-layer (pre-norm, as drawn) rather than after, as the original paper did. GPT-2 made that switch, and it trains far more stably at depth.
- **The FFN** is where most of the parameters live, usually about two-thirds of them. It expands each token to four times its width, applies a nonlinearity, and shrinks it back. If attention decides *what to gather*, the FFN decides *what to do with it*.

> Attention is the only place tokens interact. Everything else in a Transformer happens to each token independently. Keep that in mind and the whole architecture gets simpler.

## The encoder: reading

The original Transformer (Vaswani et al., 2017) was built for translation: English in, German out. So it had two stacks, six blocks each.

The **encoder** reads the source sentence. Its attention is **bidirectional**: every word can attend to every other word, left and right. When the encoder processes *"bank"* in *"I sat on the river bank"*, it can see *"river"* before it and use it. The output is one context-rich vector per input word. Nothing is generated. The encoder's only job is to *understand*.

## The decoder: writing

The **decoder** produces the translation one word at a time. It's the same block with two changes:

1. **Its self-attention is causal.** A word can only attend to the words before it. This is the mask from part one: future positions get −∞ before the softmax. It has to be this way, because at generation time the future doesn't exist yet.
2. **It has an extra attention layer: cross-attention.** Here the decoder's queries look at the *encoder's* keys and values. This is how the German being written consults the English being translated. Self-attention reads your own output so far; cross-attention reads the source.

So a decoder block is: causal self-attention, then cross-attention into the encoder, then the FFN, each with its own residual and norm.

## Three families

Once the paper was out, people started taking it apart. Three families came out, and you can name each by which half it kept:

| Family | Keeps | Attention | Classic examples | Good at |
|---|---|---|---|---|
| **Encoder-only** | the encoder | bidirectional | BERT, RoBERTa | understanding: classification, search embeddings, reranking |
| **Encoder-decoder** | both | bidirectional in, causal out, cross between | the original Transformer, T5, Whisper | turning one sequence into another: translation, speech to text |
| **Decoder-only** | the decoder, minus cross-attention | causal | GPT, Llama, Mistral, Qwen | generating text, and anything you can phrase as generating text |

A decoder-only model has no encoder, so there's nothing to cross-attend to. Its block shrinks back to the simple picture above, with the causal mask on.

## Why the encoder got thrown away

For a few years, it wasn't obvious which family would win. BERT dominated benchmarks in 2018 and 2019. T5 made a strong case that everything should be encoder-decoder. Today, almost every frontier LLM is decoder-only. Four reasons, roughly in order of importance:

**Every token is a training signal.** A decoder learns by predicting the next token at *every* position, all at once, thanks to the causal mask. A 1,000-token document gives you 1,000 predictions. BERT's masked-language objective hides about 15% of tokens and learns only from those. Same data, a fraction of the signal.

**One stack, one objective, scales simply.** No split between source and target, no decision about how to divide parameters between two stacks, no special input format. Just text in, next token out. When the strategy became "make it bigger and feed it more," the simplest architecture was the easiest to make bigger.

**Generation is the universal interface.** Classification, translation, summarization, question answering, code: all of them can be written as "here is some text, continue it." An encoder-only model needs a new head for each task. A decoder-only model needs a new *prompt*. At scale, that flexibility turned into in-context learning: the model picks up the task from examples in the prompt, with no fine-tuning at all.

**Causal attention is cheap to serve.** Because no token ever looks forward, the keys and values for everything already generated never change. You can compute them once and cache them. That trick makes generation fast, and it's the start of [part four](/blog/transformers-efficient-attention/).

> The encoder didn't lose because it was worse at understanding. It lost because "predict the next token" turned out to be a task so general that understanding comes along for free.

To be fair to encoders: they never really went away. When you search a vector database, the embeddings almost certainly came from an encoder-style model. Rerankers are usually encoders. And when the input isn't text, like audio, encoder-decoder designs such as Whisper still make a lot of sense. Decoder-only won the *chatbot*, not the whole field.

## Now build it yourself

Here is a complete decoder-only model: a pre-norm block, stacked, with token and position embeddings and a head that predicts the next token. Since [part one](/blog/attention-intuitively/) already proved our hand-written attention matches PyTorch's, we'll use `F.scaled_dot_product_attention` directly.

```python
import torch, torch.nn as nn, torch.nn.functional as F

class Block(nn.Module):
    def __init__(self, d, h):
        super().__init__()
        self.h = h
        self.ln1, self.ln2 = nn.LayerNorm(d), nn.LayerNorm(d)
        self.qkv = nn.Linear(d, 3 * d)
        self.proj = nn.Linear(d, d)
        self.ffn = nn.Sequential(nn.Linear(d, 4 * d), nn.GELU(), nn.Linear(4 * d, d))

    def attn(self, x):
        B, T, D = x.shape
        q, k, v = self.qkv(x).split(D, dim=-1)
        q, k, v = (t.view(B, T, self.h, D // self.h).transpose(1, 2) for t in (q, k, v))
        y = F.scaled_dot_product_attention(q, k, v, is_causal=True)
        return self.proj(y.transpose(1, 2).reshape(B, T, D))

    def forward(self, x):
        x = x + self.attn(self.ln1(x))   # communicate: tokens read each other
        x = x + self.ffn(self.ln2(x))    # compute: each token thinks alone
        return x

class TinyGPT(nn.Module):
    def __init__(self, vocab=1000, d=128, h=4, layers=4, ctx=256):
        super().__init__()
        self.tok = nn.Embedding(vocab, d)
        self.pos = nn.Embedding(ctx, d)
        self.blocks = nn.Sequential(*[Block(d, h) for _ in range(layers)])
        self.ln = nn.LayerNorm(d)
        self.head = nn.Linear(d, vocab, bias=False)

    def forward(self, idx):
        T = idx.size(1)
        x = self.tok(idx) + self.pos(torch.arange(T, device=idx.device))
        return self.head(self.ln(self.blocks(x)))   # (B, T, vocab): a guess for every next token

model = TinyGPT().eval()
a = torch.randint(0, 1000, (1, 12))
b = a.clone()
b[0, 8:] = torch.randint(0, 1000, (4,))           # rewrite only the last four tokens

with torch.no_grad():
    la, lb = model(a), model(b)
print(torch.allclose(la[0, :8], lb[0, :8], atol=1e-5))   # True: the past never saw the future
print(torch.allclose(la[0, 8:], lb[0, 8:], atol=1e-5))   # False: the future did change
print(f"{sum(p.numel() for p in model.parameters()):,} parameters")   # 1,082,112
```

That first `True` is the whole decoder idea, tested. We changed the last four tokens, and the model's outputs for the first eight didn't move at all. That's the property that lets one forward pass train on every position at once, and it's the same property the KV cache will exploit later.

Scale `d`, `h`, `layers` and `vocab` up by a couple of orders of magnitude, train on a few trillion tokens, and this is structurally a GPT. The real models swap in a few upgrades (RMSNorm, a gated FFN called SwiGLU, and grouped-query attention), but the skeleton is exactly this.

Look again at one line, though: `self.pos = nn.Embedding(ctx, d)`. Why does the model need to be *told* where each token is? And why does almost no modern LLM do it this way anymore? That's [part three](/blog/transformers-positional-encoding/).
