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
        <div style={{ maxWidth: '920px', margin: '3rem auto 4rem', padding: '0 clamp(1.25rem, 4vw, 2rem)' }}>
            <Link
                href="/blog"
                style={{
                    color: 'var(--muted)',
                    marginBottom: '1.5rem',
                    display: 'inline-block',
                    fontSize: '0.9rem',
                    letterSpacing: '0.01em',
                }}
            >
                ← Long Exposure
            </Link>

            <article
                style={{
                    background: 'rgba(7, 9, 26, 0.88)',
                    backdropFilter: 'blur(16px)',
                    WebkitBackdropFilter: 'blur(16px)',
                    border: '1px solid var(--border)',
                    borderRadius: '14px',
                    padding: 'clamp(2rem, 4.5vw, 3.25rem)',
                    boxShadow: '0 30px 80px -40px rgba(0, 0, 0, 0.6)',
                }}
            >
                <header style={{ marginBottom: '2.5rem', borderBottom: '1px solid var(--border)', paddingBottom: '1.75rem' }}>
                    <h1
                        style={{
                            fontSize: 'clamp(1.75rem, 4vw, 2.4rem)',
                            marginBottom: '0.75rem',
                            color: 'var(--foreground)',
                            lineHeight: '1.2',
                            letterSpacing: '-0.02em',
                        }}
                    >
                        {post ? post.title : slug}
                    </h1>
                    {post && (
                        <div style={{ color: 'var(--muted)', fontSize: '0.9rem', letterSpacing: '0.02em' }}>
                            {post.date} · ~5 min read
                        </div>
                    )}
                </header>

                <div style={{ fontSize: '1.05rem', lineHeight: '1.8', color: 'var(--foreground)' }}>
                    {post ? (
                        post.content
                    ) : (
                        <p>This piece isn&apos;t up yet. See <Link href="/blog" style={{ textDecoration: 'underline', color: 'var(--primary)' }}>the rest</Link>.</p>
                    )}
                </div>
            </article>

            <div style={{ marginTop: '3rem', textAlign: 'center', fontSize: '0.9rem' }}>
                <span style={{ color: 'var(--primary)' }}>✦</span>
            </div>
        </div>
    );
}
