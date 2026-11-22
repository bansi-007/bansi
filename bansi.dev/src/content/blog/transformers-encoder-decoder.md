---
title: 'Encoder, Decoder, and the One That Won'
description: 'How attention gets stacked into encoders and decoders, what BERT, T5 and GPT each kept, and why modern LLMs quietly threw the encoder away. Part 2 of the Transformer family.'
pubDate: 2026-09-24
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

<figure>
  <svg viewBox="0 0 720 262" role="img" aria-label="The original Transformer: an encoder stack reads the English sentence; a decoder stack with causal self-attention, cross-attention and feed-forward writes German. The encoder's keys and values feed the decoder's cross-attention.">
    <defs><marker id="eh" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="currentColor"/></marker><marker id="eha" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="var(--accent)"/></marker></defs>
    <g font-family="ui-monospace, Menlo, monospace" font-size="12" fill="currentColor">
      <rect x="30" y="50" width="270" height="150" rx="12" fill="none" stroke="currentColor" stroke-width="1" stroke-dasharray="4 4"/>
      <text x="165" y="68" text-anchor="middle" font-size="10.5" fill="var(--muted)">encoder × 6</text>
      <rect x="50" y="80" width="230" height="40" rx="8" fill="none" stroke="currentColor" stroke-width="1.3"/>
      <text x="165" y="105" text-anchor="middle">self-attention · sees all</text>
      <rect x="50" y="140" width="230" height="40" rx="8" fill="none" stroke="currentColor" stroke-width="1.3"/>
      <text x="165" y="165" text-anchor="middle">feed-forward</text>
      <text x="165" y="250" text-anchor="middle" font-size="11" fill="var(--muted)">"I sat on the river bank"</text>
      <line x1="165" y1="234" x2="165" y2="204" stroke="currentColor" stroke-width="1.3" marker-end="url(#eh)"/>
      <rect x="420" y="34" width="270" height="186" rx="12" fill="none" stroke="currentColor" stroke-width="1" stroke-dasharray="4 4"/>
      <text x="555" y="50" text-anchor="middle" font-size="10.5" fill="var(--muted)">decoder × 6</text>
      <rect x="440" y="60" width="230" height="40" rx="8" fill="none" stroke="currentColor" stroke-width="1.3"/>
      <text x="555" y="85" text-anchor="middle">causal self-attention</text>
      <rect x="440" y="115" width="230" height="40" rx="8" fill="none" stroke="var(--accent)" stroke-width="1.5"/>
      <text x="555" y="140" text-anchor="middle" fill="var(--accent)">cross-attention</text>
      <rect x="440" y="170" width="230" height="40" rx="8" fill="none" stroke="currentColor" stroke-width="1.3"/>
      <text x="555" y="195" text-anchor="middle">feed-forward</text>
      <text x="555" y="252" text-anchor="middle" font-size="11" fill="var(--muted)">German written so far</text>
      <line x1="555" y1="238" x2="555" y2="224" stroke="currentColor" stroke-width="1.3" marker-end="url(#eh)"/>
      <line x1="555" y1="34" x2="555" y2="8" stroke="currentColor" stroke-width="1.3" marker-end="url(#eh)"/>
      <text x="566" y="18" font-size="10.5" fill="var(--muted)">next German word</text>
      <path d="M 300 100 C 360 100, 380 135, 436 135" fill="none" stroke="var(--accent)" stroke-width="1.5" marker-end="url(#eha)"/>
      <text x="368" y="94" text-anchor="middle" font-size="11" fill="var(--accent)">keys, values</text>
      <text x="360" y="160" text-anchor="middle" font-size="10" fill="var(--muted)">queries come</text>
      <text x="360" y="174" text-anchor="middle" font-size="10" fill="var(--muted)">from the decoder</text>
    </g>
  </svg>
  <figcaption>The original design. The encoder reads the whole source; every decoder block reaches into it through cross-attention.</figcaption>
</figure>

### The mask, with numbers

The only difference between encoder and decoder self-attention is which cells of the score grid are allowed. Here are the two patterns over a five-word sentence:

<figure>
  <svg viewBox="0 0 720 230" role="img" aria-label="Two 5 by 5 attention grids over the words the cat sat on mat. The encoder grid is fully shaded. The decoder grid is shaded only on and below the diagonal; cells above are minus infinity.">
    <defs></defs>
    <g font-family="ui-monospace, Menlo, monospace" font-size="12" fill="currentColor">
      <rect x="110" y="40" width="30" height="30" fill="var(--accent)" fill-opacity="0.35"/>
      <rect x="140" y="40" width="30" height="30" fill="var(--accent)" fill-opacity="0.35"/>
      <rect x="170" y="40" width="30" height="30" fill="var(--accent)" fill-opacity="0.35"/>
      <rect x="200" y="40" width="30" height="30" fill="var(--accent)" fill-opacity="0.35"/>
      <rect x="230" y="40" width="30" height="30" fill="var(--accent)" fill-opacity="0.35"/>
      <rect x="110" y="70" width="30" height="30" fill="var(--accent)" fill-opacity="0.35"/>
      <rect x="140" y="70" width="30" height="30" fill="var(--accent)" fill-opacity="0.35"/>
      <rect x="170" y="70" width="30" height="30" fill="var(--accent)" fill-opacity="0.35"/>
      <rect x="200" y="70" width="30" height="30" fill="var(--accent)" fill-opacity="0.35"/>
      <rect x="230" y="70" width="30" height="30" fill="var(--accent)" fill-opacity="0.35"/>
      <rect x="110" y="100" width="30" height="30" fill="var(--accent)" fill-opacity="0.35"/>
      <rect x="140" y="100" width="30" height="30" fill="var(--accent)" fill-opacity="0.35"/>
      <rect x="170" y="100" width="30" height="30" fill="var(--accent)" fill-opacity="0.35"/>
      <rect x="200" y="100" width="30" height="30" fill="var(--accent)" fill-opacity="0.35"/>
      <rect x="230" y="100" width="30" height="30" fill="var(--accent)" fill-opacity="0.35"/>
      <rect x="110" y="130" width="30" height="30" fill="var(--accent)" fill-opacity="0.35"/>
      <rect x="140" y="130" width="30" height="30" fill="var(--accent)" fill-opacity="0.35"/>
      <rect x="170" y="130" width="30" height="30" fill="var(--accent)" fill-opacity="0.35"/>
      <rect x="200" y="130" width="30" height="30" fill="var(--accent)" fill-opacity="0.35"/>
      <rect x="230" y="130" width="30" height="30" fill="var(--accent)" fill-opacity="0.35"/>
      <rect x="110" y="160" width="30" height="30" fill="var(--accent)" fill-opacity="0.35"/>
      <rect x="140" y="160" width="30" height="30" fill="var(--accent)" fill-opacity="0.35"/>
      <rect x="170" y="160" width="30" height="30" fill="var(--accent)" fill-opacity="0.35"/>
      <rect x="200" y="160" width="30" height="30" fill="var(--accent)" fill-opacity="0.35"/>
      <rect x="230" y="160" width="30" height="30" fill="var(--accent)" fill-opacity="0.35"/>
      <path d="M110 40 V190 M140 40 V190 M170 40 V190 M200 40 V190 M230 40 V190 M260 40 V190 M110 40 H260 M110 70 H260 M110 100 H260 M110 130 H260 M110 160 H260 M110 190 H260" fill="none" stroke="var(--muted)" stroke-width="0.8"/>
      <text x="102" y="59.0" text-anchor="end" font-size="10.5">the</text>
      <text x="125.0" y="32" text-anchor="middle" font-size="10.5">the</text>
      <text x="102" y="89.0" text-anchor="end" font-size="10.5">cat</text>
      <text x="155.0" y="32" text-anchor="middle" font-size="10.5">cat</text>
      <text x="102" y="119.0" text-anchor="end" font-size="10.5">sat</text>
      <text x="185.0" y="32" text-anchor="middle" font-size="10.5">sat</text>
      <text x="102" y="149.0" text-anchor="end" font-size="10.5">on</text>
      <text x="215.0" y="32" text-anchor="middle" font-size="10.5">on</text>
      <text x="102" y="179.0" text-anchor="end" font-size="10.5">mat</text>
      <text x="245.0" y="32" text-anchor="middle" font-size="10.5">mat</text>
      <rect x="470" y="40" width="30" height="30" fill="var(--accent)" fill-opacity="0.35"/>
      <text x="515.0" y="59.0" text-anchor="middle" font-size="10.5" fill="var(--muted)">−∞</text>
      <text x="545.0" y="59.0" text-anchor="middle" font-size="10.5" fill="var(--muted)">−∞</text>
      <text x="575.0" y="59.0" text-anchor="middle" font-size="10.5" fill="var(--muted)">−∞</text>
      <text x="605.0" y="59.0" text-anchor="middle" font-size="10.5" fill="var(--muted)">−∞</text>
      <rect x="470" y="70" width="30" height="30" fill="var(--accent)" fill-opacity="0.35"/>
      <rect x="500" y="70" width="30" height="30" fill="var(--accent)" fill-opacity="0.35"/>
      <text x="545.0" y="89.0" text-anchor="middle" font-size="10.5" fill="var(--muted)">−∞</text>
      <text x="575.0" y="89.0" text-anchor="middle" font-size="10.5" fill="var(--muted)">−∞</text>
      <text x="605.0" y="89.0" text-anchor="middle" font-size="10.5" fill="var(--muted)">−∞</text>
      <rect x="470" y="100" width="30" height="30" fill="var(--accent)" fill-opacity="0.35"/>
      <rect x="500" y="100" width="30" height="30" fill="var(--accent)" fill-opacity="0.35"/>
      <rect x="530" y="100" width="30" height="30" fill="var(--accent)" fill-opacity="0.35"/>
      <text x="575.0" y="119.0" text-anchor="middle" font-size="10.5" fill="var(--muted)">−∞</text>
      <text x="605.0" y="119.0" text-anchor="middle" font-size="10.5" fill="var(--muted)">−∞</text>
      <rect x="470" y="130" width="30" height="30" fill="var(--accent)" fill-opacity="0.35"/>
      <rect x="500" y="130" width="30" height="30" fill="var(--accent)" fill-opacity="0.35"/>
      <rect x="530" y="130" width="30" height="30" fill="var(--accent)" fill-opacity="0.35"/>
      <rect x="560" y="130" width="30" height="30" fill="var(--accent)" fill-opacity="0.35"/>
      <text x="605.0" y="149.0" text-anchor="middle" font-size="10.5" fill="var(--muted)">−∞</text>
      <rect x="470" y="160" width="30" height="30" fill="var(--accent)" fill-opacity="0.35"/>
      <rect x="500" y="160" width="30" height="30" fill="var(--accent)" fill-opacity="0.35"/>
      <rect x="530" y="160" width="30" height="30" fill="var(--accent)" fill-opacity="0.35"/>
      <rect x="560" y="160" width="30" height="30" fill="var(--accent)" fill-opacity="0.35"/>
      <rect x="590" y="160" width="30" height="30" fill="var(--accent)" fill-opacity="0.35"/>
      <path d="M470 40 V190 M500 40 V190 M530 40 V190 M560 40 V190 M590 40 V190 M620 40 V190 M470 40 H620 M470 70 H620 M470 100 H620 M470 130 H620 M470 160 H620 M470 190 H620" fill="none" stroke="var(--muted)" stroke-width="0.8"/>
      <text x="462" y="59.0" text-anchor="end" font-size="10.5">the</text>
      <text x="485.0" y="32" text-anchor="middle" font-size="10.5">the</text>
      <text x="462" y="89.0" text-anchor="end" font-size="10.5">cat</text>
      <text x="515.0" y="32" text-anchor="middle" font-size="10.5">cat</text>
      <text x="462" y="119.0" text-anchor="end" font-size="10.5">sat</text>
      <text x="545.0" y="32" text-anchor="middle" font-size="10.5">sat</text>
      <text x="462" y="149.0" text-anchor="end" font-size="10.5">on</text>
      <text x="575.0" y="32" text-anchor="middle" font-size="10.5">on</text>
      <text x="462" y="179.0" text-anchor="end" font-size="10.5">mat</text>
      <text x="605.0" y="32" text-anchor="middle" font-size="10.5">mat</text>
      <text x="185" y="215" text-anchor="middle" font-size="11.5">encoder: bidirectional</text>
      <text x="545" y="215" text-anchor="middle" font-size="11.5" fill="var(--accent)">decoder: causal</text>
      <text x="360" y="100" text-anchor="middle" font-size="10.5" fill="var(--muted)">row: who asks</text>
      <text x="360" y="116" text-anchor="middle" font-size="10.5" fill="var(--muted)">column: who is seen</text>
    </g>
  </svg>
  <figcaption>Shaded = allowed to look. The encoder lets every word see every word. The decoder's mask blanks out the future, so each row sees only itself and what came before.</figcaption>
</figure>

Now watch the mask act on real numbers. Take three tokens with these raw scores (row = the token asking, column = the token being looked at):

| scores | the | cat | sat |
|---|---|---|---|
| **the** | 2.0 | 1.0 | 0.5 |
| **cat** | 1.0 | 3.0 | 0.0 |
| **sat** | 0.5 | 2.0 | 1.0 |

**Without a mask** (encoder), softmax each row as it is:

| weights | the | cat | sat |
|---|---|---|---|
| **the** | 0.63 | 0.23 | 0.14 |
| **cat** | 0.11 | 0.84 | 0.04 |
| **sat** | 0.14 | 0.63 | 0.23 |

**With the causal mask** (decoder), every cell above the diagonal becomes −∞ first. Since e<sup>−∞</sup> = 0, those cells drop out of the softmax entirely:

| weights | the | cat | sat |
|---|---|---|---|
| **the** | 1.00 | 0 | 0 |
| **cat** | 0.12 | 0.88 | 0 |
| **sat** | 0.14 | 0.63 | 0.23 |

Three things to notice:

- **"the" can only see itself**, so it gets all the weight, 1.00. The first token in a decoder always attends only to itself.
- **"cat" loses its view of "sat"**, and the 0.04 it had there doesn't vanish. It's redistributed: 0.11 becomes 0.12, 0.84 becomes 0.88. Softmax always re-normalizes whatever is left.
- **"sat" doesn't change at all.** The last token has no future to hide, so its row is identical with or without the mask.

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

Take *"the cat sat on the mat"*. One forward pass of a decoder, thanks to the mask above, is five training examples at once:

| the model sees | and must predict |
|---|---|
| the | cat |
| the cat | sat |
| the cat sat | on |
| the cat sat on | the |
| the cat sat on the | mat |

BERT, on the same sentence, might hide *"sat"* and learn from that one blank. Five lessons against one, on every sentence, across trillions of tokens.

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

### Where the parameters live

That last print says 1,082,112. Here's where every one of them comes from, with `d = 128`, a vocabulary of 1,000, and a context of 256. Each `nn.Linear(a, b)` holds `a × b` weights plus `b` biases:

| inside one block | arithmetic | parameters |
|---|---|---|
| `qkv` projection | 128 × 384 + 384 | 49,536 |
| output `proj` | 128 × 128 + 128 | 16,512 |
| FFN, both layers | (128 × 512 + 512) + (512 × 128 + 128) | **131,712** |
| two LayerNorms | 2 × (128 + 128) | 512 |
| **one block** | | **198,272** |

| whole model | arithmetic | parameters |
|---|---|---|
| 4 blocks | 4 × 198,272 | 793,088 |
| token embedding | 1,000 × 128 | 128,000 |
| position embedding | 256 × 128 | 32,768 |
| final LayerNorm | 128 + 128 | 256 |
| output head | 128 × 1,000 | 128,000 |
| **total** | | **1,082,112** |

Look at the FFN line: 131,712 of the block's 198,272 parameters, about 66%. That's the "two-thirds" claim from earlier, now in real numbers. Attention decides who talks to whom, but most of the model's memory is in the feed-forward layers.

Scale `d`, `h`, `layers` and `vocab` up by a couple of orders of magnitude, train on a few trillion tokens, and this is structurally a GPT. The real models swap in a few upgrades (RMSNorm, a gated FFN called SwiGLU, and grouped-query attention), but the skeleton is exactly this.

Look again at one line, though: `self.pos = nn.Embedding(ctx, d)`. Why does the model need to be *told* where each token is? And why does almost no modern LLM do it this way anymore? That's [part three](/blog/transformers-positional-encoding/).
