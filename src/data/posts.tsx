export interface BlogPost {
    slug: string;
    title: string;
    date: string;
    excerpt: string;
    content?: React.ReactNode;
    mediumLink?: string;
}

export const blogPosts: BlogPost[] = [
    {
        slug: "dilated-conv-block",
        title: "DilatedConvBlock: When Convolutions Learn to Breathe",
        date: "Jan 2026",
        excerpt: "Exploring the mechanics of dilated convolutions and their impact on receptive fields in deep learning models.",
        content: (
            <>
                <p>
                    Convolutional Neural Networks (CNNs) have been the backbone of Computer Vision for over a decade. However, standard convolutions struggle with one major limitation: <strong>Receptive Field</strong>.
                </p>
                <br />
                <h3>The Receptive Field Problem</h3>
                <p>
                    To increase the receptive field in a standard CNN, you typically need to:
                </p>
                <ul>
                    <li>Increase the kernel size (Computationally expensive)</li>
                    <li>Add pooling layers (Loss of spatial resolution)</li>
                    <li>Stack more layers (Vanishing gradient issues)</li>
                </ul>
                <br />
                <h3>Enter Dilated Convolutions</h3>
                <p>
                    Dilated convolutions (or atrous convolutions) introduce a "dilation rate" parameter to the kernel. This effectively expands the kernel by inserting holes (zeros) between the weights.
                </p>
                <div style={{ background: '#1a1a1a', padding: '1rem', borderRadius: '4px', margin: '1.5rem 0', fontFamily: 'monospace', borderLeft: '3px solid var(--primary)' }}>
                    Key Benefit: Exponential expansion of the receptive field without loss of resolution or coverage.
                </div>
                <p>
                    This technique is pivotal in semantic segmentation tasks (like DeepLab) and audio generation (WaveNet), where context is king.
                </p>
            </>
        )
    },
    {
        slug: "attention-is-all-you-need",
        title: "How 'Attention Is All You Need' Revolutionised AI",
        date: "Jun 2025",
        excerpt: "A deep dive into the Transformer architecture and its paradigm-shifting influence on NLP and Computer Vision.",
        mediumLink: "https://medium.com/@bansidath"
    },
    {
        slug: "mb-conv-block",
        title: "Understanding MB Conv Block",
        date: "May 2025",
        excerpt: "Deconstructing the EfficientNet building block: Mobile Inverted Bottleneck Convolution.",
        mediumLink: "https://medium.com/@bansidath"
    },
    {
        slug: "opc-ua-industrial-iot",
        title: "Understanding OPC UA and Industrial IoT",
        date: "March 2022",
        excerpt: "Connecting the dots in Industry 4.0 with OPC Unified Architecture.",
        mediumLink: "https://medium.com/@bansidath"
    }
];
