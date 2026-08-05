---
title: "Understanding VQ-VAE — Noob Level"
description: "Vector-Quantized Variational Auto Encoders! , looks like the name is very scary. Let’s understand it brick by brick."
pubDate: 2023-02-12
tags: ['deep-learning']
---

Vector-Quantized Variational Auto Encoders! , looks like the name is very scary. Let’s understand it brick by brick.

**Something about AE (Auto Encoders)**

**Basic Idea**  
Autoencoders are kind of deep learning models that are more of like a ‘one-minute Summary’ posts which you see in social media. The idea behind these models is to learn useful information and discard useless information from given dump of information. For example , portrait mode on your iPhone is a classic example of Auto Encoders, although there are people a few meters away, it always focus on the subject in a very smooth way.  
**Diving little bit deeper**  
They basically have 2 operations in training phase i.e. Encoder Network and a Decoder Network. Below is the small example of your “Image should be less than 50 MB” annoying rejections of pictures.

![](/images/medium/understanding-vq-vae-noob-level/01-0_2Qne8cPIlEZpUFKx.png)

After iterative training with a loss function , I am confident that my encoder is strong enough to compress images properly **without loosing essential information face,eyes and all recognizable features** , so I don’t need a decoder to verify every time. I only deploy my encoder model to perform compression.

**Wait but that’s what PCA(Principal Component Analysis) does?**  
Yeah but auto encoders use non-linear activation functions compared to linear PCA.  
That’s all !

![](/images/medium/understanding-vq-vae-noob-level/02-0_09nMUSL47aAu-p-2.png)

**Now which dude tweaked this and created “Variational” Autoencoders?**  
In classic Auto Encoders , the output space is very large. For example ,It’s like searching for cricket ball outside of stadium even though it is most likely will land in crowd. I see it, so I know the boundary of search area, but how does my model knows. So I **Define a Boundary for my encoder model while compressing using a probability distribution** so that it will not waste time here and there and will learn along the distribution. It is usually the Normal Distribution.

![](/images/medium/understanding-vq-vae-noob-level/03-0_fMygbZmJSiS26SoM.png)

**Again some dude tweaked this and created “Vector Quantized” VAE ? Seriously ?**

The key difference between VQVAE and VAE is change in the space for which it looks. VAE’s look in continuous space , for example any **value** from -1 to +1 , whereas VQVAE’s look in discrete space, lets say fixed set of values. These fixed set of values are similar to Embedding Vector in our NLP. Here we call it as codebook.

![](/images/medium/understanding-vq-vae-noob-level/04-0_7Kd0Qc49E7nh7uhT.png)

The idea here is instead of relying on vast space of latent distribution(continuous) we rely on discrete representations.

That’s it !

For more advanced reading : [https://jaan.io/what-is-variational-autoencoder-vae-tutorial/](https://jaan.io/what-is-variational-autoencoder-vae-tutorial/)

*Originally published at* [*http://bansidath.com*](https://bansidath.com/2023/02/12/understanding-vq-vae-noob-level/) *on February 12, 2023.*

---

*Originally published on [Medium](https://medium.com/@bansimaddali/understanding-vq-vae-noob-level-155fddec48fa).*
