import Link from 'next/link';
import { blogPosts } from '@/data/posts';

export async function generateStaticParams() {
    return blogPosts.map((post) => ({
        slug: post.slug,
    }));
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const post = blogPosts.find(p => p.slug === slug);

    return (
        <div className="container" style={{ maxWidth: '100%', marginTop: '4rem' }}>
            <Link href="/blog" style={{ color: 'var(--muted)', marginBottom: '2rem', display: 'inline-block' }}>
                &lt; Back to Logs
            </Link>

            <article>
                <header style={{ marginBottom: '3rem', borderBottom: '1px solid var(--border)', paddingBottom: '2rem' }}>
                    <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: 'var(--primary)', lineHeight: '1.2' }}>
                        {post ? post.title : `Entry: ${slug} `}
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
