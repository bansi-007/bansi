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

<figure>
  <svg viewBox="0 0 720 210" role="img" aria-label="Three sine waves at decreasing frequencies across positions 0 to 48, with a vertical line at position 20 marking where each wave is read.">
    <defs></defs>
    <g font-family="ui-monospace, Menlo, monospace" font-size="12" fill="currentColor">
      <line x1="160" y1="45" x2="688" y2="45" stroke="var(--muted)" stroke-width="0.6" stroke-dasharray="2 3"/>
      <path d="M160.0 45.0 L162.8 40.5 L165.5 36.4 L168.2 32.7 L171.0 29.9 L173.8 27.9 L176.5 27.0 L179.2 27.3 L182.0 28.6 L184.8 31.0 L187.5 34.2 L190.2 38.1 L193.0 42.5 L195.8 46.9 L198.5 51.3 L201.2 55.3 L204.0 58.6 L206.8 61.1 L209.5 62.6 L212.2 63.0 L215.0 62.3 L217.8 60.5 L220.5 57.7 L223.2 54.1 L226.0 50.0 L228.8 45.6 L231.5 41.1 L234.2 36.9 L237.0 33.2 L239.8 30.2 L242.5 28.1 L245.2 27.1 L248.0 27.2 L250.8 28.4 L253.5 30.6 L256.2 33.8 L259.0 37.6 L261.8 41.9 L264.5 46.4 L267.2 50.8 L270.0 54.8 L272.8 58.2 L275.5 60.8 L278.2 62.5 L281.0 63.0 L283.8 62.4 L286.5 60.8 L289.2 58.1 L292.0 54.7 L294.8 50.6 L297.5 46.2 L300.2 41.7 L303.0 37.4 L305.8 33.6 L308.5 30.5 L311.2 28.3 L314.0 27.2 L316.8 27.1 L319.5 28.2 L322.2 30.3 L325.0 33.3 L327.8 37.0 L330.5 41.3 L333.2 45.8 L336.0 50.2 L338.8 54.3 L341.5 57.8 L344.2 60.5 L347.0 62.3 L349.8 63.0 L352.5 62.6 L355.2 61.0 L358.0 58.5 L360.8 55.2 L363.5 51.2 L366.2 46.8 L369.0 42.3 L371.8 38.0 L374.5 34.1 L377.2 30.9 L380.0 28.6 L382.8 27.3 L385.5 27.1 L388.2 28.0 L391.0 29.9 L393.8 32.8 L396.5 36.5 L399.2 40.7 L402.0 45.2 L404.8 49.6 L407.5 53.8 L410.2 57.4 L413.0 60.2 L415.8 62.1 L418.5 63.0 L421.2 62.7 L424.0 61.3 L426.8 58.9 L429.5 55.6 L432.2 51.7 L435.0 47.4 L437.8 42.9 L440.5 38.5 L443.2 34.6 L446.0 31.3 L448.8 28.8 L451.5 27.4 L454.2 27.0 L457.0 27.8 L459.8 29.6 L462.5 32.4 L465.2 36.0 L468.0 40.1 L470.8 44.6 L473.5 49.0 L476.2 53.2 L479.0 56.9 L481.8 59.9 L484.5 61.9 L487.2 62.9 L490.0 62.8 L492.8 61.5 L495.5 59.3 L498.2 56.1 L501.0 52.3 L503.8 48.0 L506.5 43.5 L509.2 39.1 L512.0 35.1 L514.8 31.7 L517.5 29.1 L520.2 27.5 L523.0 27.0 L525.8 27.6 L528.5 29.3 L531.2 32.0 L534.0 35.5 L536.8 39.6 L539.5 44.0 L542.2 48.4 L545.0 52.7 L547.8 56.5 L550.5 59.6 L553.2 61.7 L556.0 62.9 L558.8 62.9 L561.5 61.8 L564.2 59.6 L567.0 56.6 L569.8 52.8 L572.5 48.6 L575.2 44.1 L578.0 39.7 L580.8 35.6 L583.5 32.1 L586.2 29.4 L589.0 27.7 L591.8 27.0 L594.5 27.5 L597.2 29.0 L600.0 31.6 L602.8 35.0 L605.5 39.0 L608.2 43.4 L611.0 47.9 L613.8 52.2 L616.5 56.0 L619.2 59.2 L622.0 61.5 L624.8 62.8 L627.5 62.9 L630.2 62.0 L633.0 60.0 L635.8 57.0 L638.5 53.3 L641.2 49.1 L644.0 44.7 L646.8 40.2 L649.5 36.1 L652.2 32.5 L655.0 29.7 L657.8 27.8 L660.5 27.0 L663.2 27.3 L666.0 28.8 L668.8 31.2 L671.5 34.5 L674.2 38.4 L677.0 42.8 L679.8 47.3 L682.5 51.6 L685.2 55.5 L688.0 58.8" fill="none" stroke="currentColor" stroke-width="1.4"/>
      <text x="148" y="49" text-anchor="end" font-size="10.5" fill="var(--muted)">dims 0–1 · fast</text>
      <circle cx="380" cy="28.6" r="3.5" fill="var(--accent)"/>
      <line x1="160" y1="100" x2="688" y2="100" stroke="var(--muted)" stroke-width="0.6" stroke-dasharray="2 3"/>
      <path d="M160.0 100.0 L162.8 98.9 L165.5 97.8 L168.2 96.6 L171.0 95.5 L173.8 94.5 L176.5 93.4 L179.2 92.4 L182.0 91.4 L184.8 90.4 L187.5 89.5 L190.2 88.6 L193.0 87.7 L195.8 86.9 L198.5 86.2 L201.2 85.5 L204.0 84.9 L206.8 84.3 L209.5 83.8 L212.2 83.3 L215.0 82.9 L217.8 82.6 L220.5 82.3 L223.2 82.2 L226.0 82.0 L228.8 82.0 L231.5 82.0 L234.2 82.1 L237.0 82.3 L239.8 82.5 L242.5 82.8 L245.2 83.2 L248.0 83.6 L250.8 84.1 L253.5 84.7 L256.2 85.3 L259.0 86.0 L261.8 86.7 L264.5 87.5 L267.2 88.3 L270.0 89.2 L272.8 90.1 L275.5 91.1 L278.2 92.1 L281.0 93.1 L283.8 94.2 L286.5 95.3 L289.2 96.4 L292.0 97.5 L294.8 98.6 L297.5 99.7 L300.2 100.8 L303.0 101.9 L305.8 103.1 L308.5 104.2 L311.2 105.2 L314.0 106.3 L316.8 107.4 L319.5 108.4 L322.2 109.3 L325.0 110.3 L327.8 111.2 L330.5 112.0 L333.2 112.9 L336.0 113.6 L338.8 114.3 L341.5 115.0 L344.2 115.6 L347.0 116.1 L349.8 116.6 L352.5 117.0 L355.2 117.3 L358.0 117.6 L360.8 117.8 L363.5 117.9 L366.2 118.0 L369.0 118.0 L371.8 117.9 L374.5 117.8 L377.2 117.5 L380.0 117.3 L382.8 116.9 L385.5 116.5 L388.2 116.0 L391.0 115.5 L393.8 114.9 L396.5 114.2 L399.2 113.5 L402.0 112.7 L404.8 111.9 L407.5 111.0 L410.2 110.1 L413.0 109.1 L415.8 108.2 L418.5 107.1 L421.2 106.1 L424.0 105.0 L426.8 103.9 L429.5 102.8 L432.2 101.7 L435.0 100.6 L437.8 99.5 L440.5 98.3 L443.2 97.2 L446.0 96.1 L448.8 95.0 L451.5 94.0 L454.2 92.9 L457.0 91.9 L459.8 90.9 L462.5 90.0 L465.2 89.0 L468.0 88.2 L470.8 87.3 L473.5 86.6 L476.2 85.9 L479.0 85.2 L481.8 84.6 L484.5 84.0 L487.2 83.5 L490.0 83.1 L492.8 82.8 L495.5 82.5 L498.2 82.2 L501.0 82.1 L503.8 82.0 L506.5 82.0 L509.2 82.1 L512.0 82.2 L514.8 82.4 L517.5 82.7 L520.2 83.0 L523.0 83.4 L525.8 83.9 L528.5 84.4 L531.2 85.0 L534.0 85.6 L536.8 86.3 L539.5 87.1 L542.2 87.9 L545.0 88.8 L547.8 89.7 L550.5 90.6 L553.2 91.6 L556.0 92.6 L558.8 93.6 L561.5 94.7 L564.2 95.8 L567.0 96.9 L569.8 98.0 L572.5 99.1 L575.2 100.2 L578.0 101.4 L580.8 102.5 L583.5 103.6 L586.2 104.7 L589.0 105.8 L591.8 106.8 L594.5 107.8 L597.2 108.8 L600.0 109.8 L602.8 110.7 L605.5 111.6 L608.2 112.4 L611.0 113.2 L613.8 114.0 L616.5 114.6 L619.2 115.3 L622.0 115.8 L624.8 116.3 L627.5 116.8 L630.2 117.2 L633.0 117.5 L635.8 117.7 L638.5 117.9 L641.2 118.0 L644.0 118.0 L646.8 118.0 L649.5 117.8 L652.2 117.7 L655.0 117.4 L657.8 117.1 L660.5 116.7 L663.2 116.3 L666.0 115.8 L668.8 115.2 L671.5 114.6 L674.2 113.9 L677.0 113.1 L679.8 112.3 L682.5 111.5 L685.2 110.6 L688.0 109.7" fill="none" stroke="currentColor" stroke-width="1.4"/>
      <text x="148" y="104" text-anchor="end" font-size="10.5" fill="var(--muted)">dims 2–3</text>
      <circle cx="380" cy="117.3" r="3.5" fill="var(--accent)"/>
      <line x1="160" y1="155" x2="688" y2="155" stroke="var(--muted)" stroke-width="0.6" stroke-dasharray="2 3"/>
      <path d="M160.0 155.0 L162.8 154.7 L165.5 154.4 L168.2 154.2 L171.0 153.9 L173.8 153.6 L176.5 153.3 L179.2 153.0 L182.0 152.8 L184.8 152.5 L187.5 152.2 L190.2 151.9 L193.0 151.6 L195.8 151.4 L198.5 151.1 L201.2 150.8 L204.0 150.5 L206.8 150.3 L209.5 150.0 L212.2 149.7 L215.0 149.5 L217.8 149.2 L220.5 148.9 L223.2 148.7 L226.0 148.4 L228.8 148.1 L231.5 147.9 L234.2 147.6 L237.0 147.4 L239.8 147.1 L242.5 146.9 L245.2 146.6 L248.0 146.4 L250.8 146.1 L253.5 145.9 L256.2 145.6 L259.0 145.4 L261.8 145.2 L264.5 144.9 L267.2 144.7 L270.0 144.5 L272.8 144.2 L275.5 144.0 L278.2 143.8 L281.0 143.6 L283.8 143.4 L286.5 143.1 L289.2 142.9 L292.0 142.7 L294.8 142.5 L297.5 142.3 L300.2 142.1 L303.0 141.9 L305.8 141.7 L308.5 141.6 L311.2 141.4 L314.0 141.2 L316.8 141.0 L319.5 140.8 L322.2 140.7 L325.0 140.5 L327.8 140.3 L330.5 140.2 L333.2 140.0 L336.0 139.9 L338.8 139.7 L341.5 139.6 L344.2 139.4 L347.0 139.3 L349.8 139.1 L352.5 139.0 L355.2 138.9 L358.0 138.8 L360.8 138.6 L363.5 138.5 L366.2 138.4 L369.0 138.3 L371.8 138.2 L374.5 138.1 L377.2 138.0 L380.0 137.9 L382.8 137.8 L385.5 137.7 L388.2 137.7 L391.0 137.6 L393.8 137.5 L396.5 137.5 L399.2 137.4 L402.0 137.3 L404.8 137.3 L407.5 137.2 L410.2 137.2 L413.0 137.2 L415.8 137.1 L418.5 137.1 L421.2 137.1 L424.0 137.0 L426.8 137.0 L429.5 137.0 L432.2 137.0 L435.0 137.0 L437.8 137.0 L440.5 137.0 L443.2 137.0 L446.0 137.0 L448.8 137.0 L451.5 137.1 L454.2 137.1 L457.0 137.1 L459.8 137.2 L462.5 137.2 L465.2 137.2 L468.0 137.3 L470.8 137.3 L473.5 137.4 L476.2 137.5 L479.0 137.5 L481.8 137.6 L484.5 137.7 L487.2 137.7 L490.0 137.8 L492.8 137.9 L495.5 138.0 L498.2 138.1 L501.0 138.2 L503.8 138.3 L506.5 138.4 L509.2 138.5 L512.0 138.6 L514.8 138.8 L517.5 138.9 L520.2 139.0 L523.0 139.1 L525.8 139.3 L528.5 139.4 L531.2 139.5 L534.0 139.7 L536.8 139.8 L539.5 140.0 L542.2 140.2 L545.0 140.3 L547.8 140.5 L550.5 140.6 L553.2 140.8 L556.0 141.0 L558.8 141.2 L561.5 141.4 L564.2 141.5 L567.0 141.7 L569.8 141.9 L572.5 142.1 L575.2 142.3 L578.0 142.5 L580.8 142.7 L583.5 142.9 L586.2 143.1 L589.0 143.3 L591.8 143.6 L594.5 143.8 L597.2 144.0 L600.0 144.2 L602.8 144.5 L605.5 144.7 L608.2 144.9 L611.0 145.1 L613.8 145.4 L616.5 145.6 L619.2 145.9 L622.0 146.1 L624.8 146.4 L627.5 146.6 L630.2 146.9 L633.0 147.1 L635.8 147.4 L638.5 147.6 L641.2 147.9 L644.0 148.1 L646.8 148.4 L649.5 148.7 L652.2 148.9 L655.0 149.2 L657.8 149.4 L660.5 149.7 L663.2 150.0 L666.0 150.3 L668.8 150.5 L671.5 150.8 L674.2 151.1 L677.0 151.4 L679.8 151.6 L682.5 151.9 L685.2 152.2 L688.0 152.5" fill="none" stroke="currentColor" stroke-width="1.4"/>
      <text x="148" y="159" text-anchor="end" font-size="10.5" fill="var(--muted)">dims 4–5 · slow</text>
      <circle cx="380" cy="137.9" r="3.5" fill="var(--accent)"/>
      <line x1="380" y1="16" x2="380" y2="180" stroke="var(--accent)" stroke-width="1.2"/>
      <text x="380" y="198" text-anchor="middle" font-size="10.5" fill="var(--accent)">position 20: read every hand at once</text>
      <text x="688" y="198" text-anchor="end" font-size="10.5" fill="var(--muted)">position →</text>
    </g>
  </svg>
  <figcaption>Each pair of dimensions is a wave at its own speed. A position's encoding is the reading of every wave at that point, like reading every hand of a clock.</figcaption>
</figure>

Here are the actual numbers for a tiny `d = 4`. There are two hands: the first pair has frequency 1, and the second has frequency 1/100, because 10000<sup>2/4</sup> = 100. So each position gets `[sin(pos), cos(pos), sin(pos/100), cos(pos/100)]`:

| position | sin(pos) | cos(pos) | sin(pos/100) | cos(pos/100) |
|---|---|---|---|---|
| 0 | 0.000 | 1.000 | 0.000 | 1.000 |
| 1 | 0.841 | 0.540 | 0.010 | 1.000 |
| 2 | 0.909 | −0.416 | 0.020 | 1.000 |
| 3 | 0.141 | −0.990 | 0.030 | 1.000 |

The fast pair swings wildly from one position to the next, so it tells neighbours apart. The slow pair has barely moved; it only becomes useful across hundreds of positions, where the fast pair has wrapped around many times and repeats itself. Together, no two positions get the same vector.

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

### RoPE with actual numbers

Take the smallest possible case: 2-D vectors, one rotation speed of θ = 20° per position, and a query and key that are both `(1, 0)`. With identical content, the only thing that can change the score is position.

Rotating a vector `(x, y)` by an angle `a` gives `(x·cos a − y·sin a, x·sin a + y·cos a)`. Since `(1, 0)` rotated by `a` is just `(cos a, sin a)`:

| query at | key at | query angle | key angle | rotated q | rotated k | score q·k |
|---|---|---|---|---|---|---|
| 5 | 2 | 100° | 40° | (−0.174, 0.985) | (0.766, 0.643) | **0.500** |
| 105 | 102 | 300° | 240° | (0.500, −0.866) | (−0.500, −0.866) | **0.500** |
| 9 | 2 | 180° | 40° | (−1.000, 0.000) | (0.766, 0.643) | **−0.766** |

(Angles wrap around: 105 × 20° = 2,100°, which is 300° after five full turns.)

The first two rows have completely different vectors and exactly the same score. Both pairs are 60° apart, and cos 60° = 0.5. The third pair is 140° apart, and cos 140° = −0.766. A real model does exactly this, just with 32 or 64 pairs of dimensions, each rotating at its own speed.

A few details make it work in practice:

- **Many frequencies, like the clock.** Each pair of dimensions rotates at its own speed, using the same `10000^(-2i/d)` schedule as the original sinusoids. Fast pairs resolve small distances precisely. Slow pairs tell "near" from "far" across thousands of tokens.
- **Only queries and keys get rotated.** Values are left alone. Position should affect *who you listen to*, not *what they say*.
- **It's applied in every layer**, not just once at the input, so position information never fades as the vectors pass through dozens of blocks.
- **Rotation never changes a vector's length.** Content and position stay separate: the length carries "how strongly," the angle carries "where."

## ALiBi: just penalize distance

There's an even blunter idea, **ALiBi** (Press et al., 2021): skip position vectors entirely, and subtract a penalty from each attention score proportional to the distance between the two tokens. Far-away tokens get pushed down; nearby ones are favored. Each head gets its own penalty slope, so some heads look locally and some look far.

<figure>
  <svg viewBox="0 0 720 222" role="img" aria-label="A 5 by 5 causal grid of ALiBi biases: zero on the diagonal, minus 0.5 one step back, down to minus 2.0 four steps back.">
    <defs></defs>
    <g font-family="ui-monospace, Menlo, monospace" font-size="12" fill="currentColor">
      <rect x="170" y="34" width="36" height="36" fill="var(--accent)" fill-opacity="0.5700000000000001"/>
      <text x="188.0" y="56.0" text-anchor="middle" font-size="10.5" fill="currentColor">0</text>
      <rect x="170" y="70" width="36" height="36" fill="var(--accent)" fill-opacity="0.4575"/>
      <text x="188.0" y="92.0" text-anchor="middle" font-size="10.5" fill="currentColor">−0.5</text>
      <rect x="206" y="70" width="36" height="36" fill="var(--accent)" fill-opacity="0.5700000000000001"/>
      <text x="224.0" y="92.0" text-anchor="middle" font-size="10.5" fill="currentColor">0</text>
      <rect x="170" y="106" width="36" height="36" fill="var(--accent)" fill-opacity="0.345"/>
      <text x="188.0" y="128.0" text-anchor="middle" font-size="10.5" fill="currentColor">−1.0</text>
      <rect x="206" y="106" width="36" height="36" fill="var(--accent)" fill-opacity="0.4575"/>
      <text x="224.0" y="128.0" text-anchor="middle" font-size="10.5" fill="currentColor">−0.5</text>
      <rect x="242" y="106" width="36" height="36" fill="var(--accent)" fill-opacity="0.5700000000000001"/>
      <text x="260.0" y="128.0" text-anchor="middle" font-size="10.5" fill="currentColor">0</text>
      <rect x="170" y="142" width="36" height="36" fill="var(--accent)" fill-opacity="0.23249999999999998"/>
      <text x="188.0" y="164.0" text-anchor="middle" font-size="10.5" fill="currentColor">−1.5</text>
      <rect x="206" y="142" width="36" height="36" fill="var(--accent)" fill-opacity="0.345"/>
      <text x="224.0" y="164.0" text-anchor="middle" font-size="10.5" fill="currentColor">−1.0</text>
      <rect x="242" y="142" width="36" height="36" fill="var(--accent)" fill-opacity="0.4575"/>
      <text x="260.0" y="164.0" text-anchor="middle" font-size="10.5" fill="currentColor">−0.5</text>
      <rect x="278" y="142" width="36" height="36" fill="var(--accent)" fill-opacity="0.5700000000000001"/>
      <text x="296.0" y="164.0" text-anchor="middle" font-size="10.5" fill="currentColor">0</text>
      <rect x="170" y="178" width="36" height="36" fill="var(--accent)" fill-opacity="0.12"/>
      <text x="188.0" y="200.0" text-anchor="middle" font-size="10.5" fill="currentColor">−2.0</text>
      <rect x="206" y="178" width="36" height="36" fill="var(--accent)" fill-opacity="0.23249999999999998"/>
      <text x="224.0" y="200.0" text-anchor="middle" font-size="10.5" fill="currentColor">−1.5</text>
      <rect x="242" y="178" width="36" height="36" fill="var(--accent)" fill-opacity="0.345"/>
      <text x="260.0" y="200.0" text-anchor="middle" font-size="10.5" fill="currentColor">−1.0</text>
      <rect x="278" y="178" width="36" height="36" fill="var(--accent)" fill-opacity="0.4575"/>
      <text x="296.0" y="200.0" text-anchor="middle" font-size="10.5" fill="currentColor">−0.5</text>
      <rect x="314" y="178" width="36" height="36" fill="var(--accent)" fill-opacity="0.5700000000000001"/>
      <text x="332.0" y="200.0" text-anchor="middle" font-size="10.5" fill="currentColor">0</text>
      <path d="M170 34 V214 M206 34 V214 M242 34 V214 M278 34 V214 M314 34 V214 M350 34 V214 M170 34 H350 M170 70 H350 M170 106 H350 M170 142 H350 M170 178 H350 M170 214 H350" fill="none" stroke="var(--muted)" stroke-width="0.8"/>
      <text x="162" y="56.0" text-anchor="end" font-size="10.5">the</text>
      <text x="188.0" y="26" text-anchor="middle" font-size="10.5">the</text>
      <text x="162" y="92.0" text-anchor="end" font-size="10.5">cat</text>
      <text x="224.0" y="26" text-anchor="middle" font-size="10.5">cat</text>
      <text x="162" y="128.0" text-anchor="end" font-size="10.5">sat</text>
      <text x="260.0" y="26" text-anchor="middle" font-size="10.5">sat</text>
      <text x="162" y="164.0" text-anchor="end" font-size="10.5">on</text>
      <text x="296.0" y="26" text-anchor="middle" font-size="10.5">on</text>
      <text x="162" y="200.0" text-anchor="end" font-size="10.5">mat</text>
      <text x="332.0" y="26" text-anchor="middle" font-size="10.5">mat</text>
      <text x="420" y="70" font-size="11.5">score + bias</text>
      <text x="420" y="92" font-size="10.5" fill="var(--muted)">bias = −m × distance</text>
      <text x="420" y="110" font-size="10.5" fill="var(--muted)">this head: m = 0.5</text>
      <text x="420" y="140" font-size="10.5" fill="var(--accent)">darker = closer = less penalty</text>
      <text x="420" y="158" font-size="10.5" fill="var(--muted)">other heads use other slopes</text>
    </g>
  </svg>
  <figcaption>ALiBi in one picture. No position vectors at all: each score just gets a penalty that grows with distance.</figcaption>
</figure>

With numbers: two earlier tokens both have a raw score of 2.0 against the current one, so their content matches equally well. One is 1 step back, the other 4 steps back. With a slope of 0.5, they become 2.0 − 0.5 = **1.5** and 2.0 − 2.0 = **0.0**. After softmax, the near token gets e<sup>1.5</sup> ≈ 4.5 times the weight of the far one. Same content, different distance, very different attention.

ALiBi's selling point was its title: *train short, test long*. Because a penalty for distance 5,000 is just a bigger number, not an unseen embedding, the model degrades gracefully on inputs longer than it was trained on. RoPE ended up being the more widely adopted scheme, but ALiBi showed clearly that position doesn't have to be a vector at all.

## Stretching the context

Here's why this matters right now. Suppose a model was trained with RoPE on sequences of 4,096 tokens, and you want it to read 32,000.

At position 20,000, the slow-rotating dimensions reach angles they **never reached in training**. The model is in unfamiliar territory, and quality falls off a cliff.

The fixes all work by bringing those angles back into familiar range:

- **Position interpolation** squeezes the positions. Treat position 32,000 as if it were 4,096 by scaling every position down by 8×. All angles stay in the trained range, at the cost of packing nearby tokens closer together. A short fine-tune lets the model adjust.
<figure>
  <svg viewBox="0 0 720 160" role="img" aria-label="Two bars. The top bar shows positions up to 32,768 with only the first eighth trained. The bottom bar shows that after dividing positions by 8, all of them fall in the trained range; position 20,000 becomes 2,500.">
    <defs></defs>
    <g font-family="ui-monospace, Menlo, monospace" font-size="12" fill="currentColor">
      <text x="80" y="24" font-size="11">without interpolation: real positions 0 … 32,768</text>
      <rect x="80" y="36" width="70.0" height="16" fill="var(--accent)" fill-opacity="0.45"/>
      <rect x="150.0" y="36" width="490.0" height="16" fill="none" stroke="var(--muted)" stroke-dasharray="3 3"/>
      <text x="115.0" y="68" text-anchor="middle" font-size="10.5" fill="var(--accent)">trained</text>
      <text x="534.9" y="48" text-anchor="middle" font-size="10.5" fill="var(--muted)">angles never seen in training</text>
      <text x="80" y="104" font-size="11">with interpolation: position ÷ 8</text>
      <rect x="80" y="116" width="560" height="16" fill="var(--accent)" fill-opacity="0.45"/>
      <text x="360.0" y="148" text-anchor="middle" font-size="10.5" fill="var(--accent)">every position lands inside the trained range 0 … 4,096</text>
      <line x1="421.8" y1="30" x2="421.8" y2="138" stroke="currentColor" stroke-width="1.2" stroke-dasharray="2 3"/>
      <text x="427.8" y="62" font-size="10.5">20,000</text>
      <text x="427.8" y="128" font-size="10.5">→ 2,500</text>
    </g>
  </svg>
  <figcaption>Position interpolation: squeeze a long sequence into the angle range the model was trained on.</figcaption>
</figure>

  In numbers: trained on 4,096, extending to 32,768, so the scale is 32,768 ÷ 4,096 = 8. Position 20,000 is treated as 2,500, a position the model knows well. The cost shows up between neighbours: 20,000 and 20,001 become 2,500 and 2,500.125, one-eighth of a step apart, which is why a short fine-tune helps the model get used to the tighter spacing.

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
