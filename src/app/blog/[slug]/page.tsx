import Link from 'next/link';

// Mock Content Data
const blogContent: Record<string, { title: string; content: React.ReactNode }> = {
    "dilated-conv-block": {
        title: "DilatedConvBlock: When Convolutions Learn to Breathe",
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
    }
};

export async function generateStaticParams() {
    const posts = [
        { slug: "dilated-conv-block" },
        { slug: "attention-is-all-you-need" },
        { slug: "mb-conv-block" },
        { slug: "opc-ua-industrial-iot" }
    ];
    return posts;
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const post = blogContent[slug];

    return (
        <div className="container" style={{ maxWidth: '800px', marginTop: '4rem' }}>
            <Link href="/blog" style={{ color: 'var(--muted)', marginBottom: '2rem', display: 'inline-block' }}>
                &lt; Back to Logs
            </Link>

            <article>
                <header style={{ marginBottom: '3rem', borderBottom: '1px solid var(--border)', paddingBottom: '2rem' }}>
                    <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: 'var(--primary)', lineHeight: '1.2' }}>
                        {post ? post.title : `Entry: ${slug}`}
                    </h1>
                    <div style={{ color: 'var(--muted)', fontSize: '0.9rem', fontFamily: 'monospace' }}>
            // Reading time: {post ? '5 min read' : 'Undefined'}
                    </div>
                </header>

                <div style={{ fontSize: '1.1rem', lineHeight: '1.8', color: '#d0d0d0' }}>
                    {post ? (
                        post.content
                    ) : (
                        <div style={{ padding: '2rem', border: '1px dashed var(--border)', background: '#151515', borderRadius: '8px' }}>
                            <p style={{ marginBottom: '1rem' }}>
                                This specific entry is being restored from the archives.
                            </p>
                            <p>
                                Read proper formatted articles at <a href="https://bansidath.in" target="_blank" style={{ textDecoration: 'underline', color: 'var(--primary)' }}>bansidath.in</a>.
                            </p>
                        </div>
                    )}
                </div>
            </article>

            {post && (
                <div style={{ marginTop: '4rem', padding: '2rem', background: '#111', border: '1px solid var(--border)', borderRadius: '8px' }}>
                    <p style={{ color: 'var(--muted)', marginBottom: '0.5rem' }}>Want to read the full technical deep dive?</p>
                    <a href="https://bansidath.in" target="_blank" style={{ color: 'var(--primary)', fontWeight: 'bold' }}>
                        Read original on bansidath.in &rarr;
                    </a>
                </div>
            )}

            <div style={{ marginTop: '4rem', color: 'var(--muted)', fontFamily: 'monospace' }}>
                <p>EOF</p>
            </div>
        </div>
    );
}
