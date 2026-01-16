import Link from 'next/link';

// Helper to simulate data fetching (or just mapping slugs to Medium links if I had them)
// For now, generic fallback.

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

    return (
        <div className="container" style={{ maxWidth: '700px', marginTop: '4rem' }}>
            <Link href="/blog" style={{ color: 'var(--muted)', marginBottom: '2rem', display: 'inline-block' }}>
                &lt; Back to Logs
            </Link>

            <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: 'var(--primary)' }}>
                Entry: {slug}
            </h1>

            <div style={{ padding: '2rem', border: '1px dashed var(--border)', background: '#151515', borderRadius: '8px' }}>
                <p style={{ marginBottom: '1rem' }}>
                    This article content is being migrated from Medium.
                </p>
                <p>
                    You can read Bansi's articles on <a href="https://medium.com/@bansidath" target="_blank" style={{ textDecoration: 'underline', color: 'var(--primary)' }}>Medium</a>.
                </p>
            </div>

            <div style={{ marginTop: '4rem', color: 'var(--muted)', fontFamily: 'monospace' }}>
                <p>EOF</p>
            </div>
        </div>
    );
}
