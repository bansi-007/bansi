---
title: 'Encoder, Decoder, and the One That Won'
description: 'How attention gets stacked into encoders and decoders, what BERT, T5 and GPT each kept, and why most modern LLMs dropped the encoder. Part 2 of the Transformer family.'
pubDate: 2026-09-24
tags: ['transformers']
draft: false
---

In [part one](/blog/attention-intuitively/) we built attention: each word sends out a query, compares it with every key, and gets back a weighted blend of the values. A model needs more than that one operation, though.

This post covers the rest of the structure: how attention is wrapped into a **block**, how blocks are stacked into an **encoder** and a **decoder**, and why most of today's LLMs use only the decoder half of the original design.

## A block: communicate, then compute

Every Transformer is a stack of identical blocks. Each block does two things, in this order:

1. **Attention**: tokens look at each other and pull in context. This is the only step where information moves between tokens.
2. **Feed-forward network (FFN)**: each token goes through a small two-layer MLP on its own. No token sees any other token here.

Each of the two steps is wrapped in a **residual connection** and a **LayerNorm**:

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

What each piece is for:

- **Residual connections** (`x + f(x)`) mean a block only has to learn a correction to its input, not reproduce the whole thing. They also give the gradient a direct path back to the early layers, which is a large part of why you can stack dozens of blocks and still train them.
- **LayerNorm** keeps each token's vector at a stable scale from layer to layer. The original paper applied it after each sub-layer; GPT-2 moved it to before (pre-norm, as drawn above), and almost every model since has done the same because it trains more reliably when the stack is deep.
- **The FFN** widens each token's vector to four times its size, applies a nonlinearity, and projects it back down. It holds most of the parameters, around two-thirds of each block, and we'll count them exactly at the end of this post.

It helps to keep the split in mind: attention is where tokens exchange information, and everything else happens to each token separately.

## The encoder: reading

The original Transformer (Vaswani et al., 2017) was built for translation, English to German, and had two stacks of six blocks each.

The **encoder** reads the source sentence. Its attention is **bidirectional**, meaning every word can attend to every other word, before or after it. When it processes *"bank"* in *"I sat on the river bank"*, it can use *"river"* to work out which meaning of bank is meant. Its output is one context-aware vector per input word. It doesn't generate anything.

## The decoder: writing

The **decoder** writes the translation one word at a time. It uses the same block with two changes:

1. **Its self-attention is causal.** A word can only attend to itself and the words before it. This is the mask from part one: positions in the future are set to −∞ before the softmax. At generation time those words haven't been written yet, so the model has to be trained without them too.
2. **It adds a cross-attention layer.** Here the queries come from the decoder, and the keys and values come from the encoder's output. This is how the German being written looks back at the English source. Self-attention looks at the output written so far; cross-attention looks at the input.

So one decoder block is causal self-attention, then cross-attention into the encoder, then the FFN, each with its own residual connection and norm.

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

Encoder and decoder self-attention differ only in which cells of the score grid are allowed. Here are the two patterns for a five-word sentence:

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

To see what the mask does to actual numbers, take three tokens with these raw scores (each row is the token doing the attending, each column the token being attended to):

| scores | the | cat | sat |
|---|---|---|---|
| **the** | 2.0 | 1.0 | 0.5 |
| **cat** | 1.0 | 3.0 | 0.0 |
| **sat** | 0.5 | 2.0 | 1.0 |

**Without a mask** (encoder), apply softmax to each row as it is:

| weights | the | cat | sat |
|---|---|---|---|
| **the** | 0.63 | 0.23 | 0.14 |
| **cat** | 0.11 | 0.84 | 0.04 |
| **sat** | 0.14 | 0.63 | 0.23 |

**With the causal mask** (decoder), every cell above the diagonal is set to −∞ first. Since e<sup>−∞</sup> = 0, those cells contribute nothing to the softmax:

| weights | the | cat | sat |
|---|---|---|---|
| **the** | 1.00 | 0 | 0 |
| **cat** | 0.12 | 0.88 | 0 |
| **sat** | 0.14 | 0.63 | 0.23 |

Comparing the two tables:

- **"the"** can only attend to itself, so it gets a weight of 1.00. The first token in a decoder always attends only to itself.
- **"cat"** can no longer see "sat". The 0.04 it gave to "sat" is spread over what remains, so 0.11 becomes 0.12 and 0.84 becomes 0.88. Softmax always renormalizes over the allowed cells.
- **"sat"** is unchanged. It's the last token, so there's nothing after it to hide.

## Three families

After the original paper, people started building models from one half or the other. Three families came out of that, named by which parts they kept:

| Family | Keeps | Attention | Classic examples | Good at |
|---|---|---|---|---|
| **Encoder-only** | the encoder | bidirectional | BERT, RoBERTa | understanding: classification, search embeddings, reranking |
| **Encoder-decoder** | both | bidirectional in, causal out, cross between | the original Transformer, T5, Whisper | turning one sequence into another: translation, speech to text |
| **Decoder-only** | the decoder, minus cross-attention | causal | GPT, Llama, Mistral, Qwen | generating text, and anything you can phrase as generating text |

A decoder-only model has no encoder, so it has nothing to cross-attend to. Its block is the simple one from the first diagram, with the causal mask applied.

## Why most LLMs dropped the encoder

For a few years it wasn't clear which family would come out ahead. BERT led most language-understanding benchmarks in 2018 and 2019, and T5 argued that every task should be framed as encoder-decoder. Today nearly every large general-purpose LLM is decoder-only. These are the main reasons, roughly in order of how much they mattered:

**Every token gives a training signal.** A decoder is trained to predict the next token at every position, and the causal mask lets it do all of those predictions in one forward pass. A 1,000-token document gives 1,000 predictions. BERT's masked-language objective hides about 15% of the tokens and learns only from those.

For example, with *"the cat sat on the mat"*, one forward pass of a decoder gives five training examples:

| the model sees | and must predict |
|---|---|
| the | cat |
| the cat | sat |
| the cat sat | on |
| the cat sat on | the |
| the cat sat on the | mat |

BERT, on the same sentence, might mask *"sat"* and learn from that one position. Over trillions of tokens, that difference adds up.

**One stack and one objective are easier to scale.** There's no split between source and target, no decision about how to divide parameters between two stacks, and no special input format. Once the main strategy became "train larger models on more data", the simplest architecture was the easiest one to grow.

**Generation works as a general interface.** Classification, translation, summarization, question answering and code can all be phrased as "here is some text, continue it". An encoder-only model needs a new output head trained for each task; a decoder-only model can often be given the task in the prompt. At large scale this became in-context learning, where the model picks up a task from a few examples in the prompt without any fine-tuning.

**Causal attention is cheaper to serve.** Because no token attends to later tokens, the keys and values of tokens already generated never change, so they can be computed once and cached. That cache is what makes generation fast, and it's where [part four](/blog/transformers-efficient-attention/) starts.

Encoders are still widely used, though. Many embedding models behind vector search are encoder-based, and so are most cross-encoder rerankers. When the input isn't text, as in speech recognition, encoder-decoder models like Whisper are still a natural fit. Decoder-only models took over general-purpose text generation, not every task.

## Now build it yourself

Here is a complete decoder-only model: pre-norm blocks, token and position embeddings, and an output layer that predicts the next token. [Part one](/blog/attention-intuitively/) already checked our hand-written attention against PyTorch's, so here we call `F.scaled_dot_product_attention` directly.

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

The first `True` is the causal property, tested directly. We changed the last four tokens, and the outputs for the first eight tokens stayed exactly the same. This is what allows training on every position in one pass, and the KV cache in part four depends on the same property.

### Where the parameters live

The last line prints 1,082,112. Here's where each of those parameters comes from, with `d = 128`, a vocabulary of 1,000 and a context length of 256. Each `nn.Linear(a, b)` has `a × b` weights plus `b` biases:

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

The FFN accounts for 131,712 of the 198,272 parameters in each block, about 66%, which is where the "two-thirds" figure above comes from.

If you increase `d`, `h`, `layers` and `vocab` by a couple of orders of magnitude and train on a few trillion tokens, you have the same structure as a GPT model. Current open models change a few components: RMSNorm instead of LayerNorm, a gated FFN called SwiGLU, grouped-query attention (part four), and a different way of handling position.

That last change is about this line: `self.pos = nn.Embedding(ctx, d)`. Why does the model need to be told where each token is, and why do most modern LLMs no longer do it this way? That's [part three](/blog/transformers-positional-encoding/).
