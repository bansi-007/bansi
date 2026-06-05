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
                ← Back to writing
            </Link>

            <article>
                <header style={{ marginBottom: '3rem', borderBottom: '1px solid var(--border)', paddingBottom: '2rem' }}>
                    <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: 'var(--foreground)', lineHeight: '1.2', letterSpacing: '-0.02em' }}>
                        {post ? post.title : slug}
                    </h1>
                    {post && (
                        <div style={{ color: 'var(--muted)', fontSize: '0.9rem', letterSpacing: '0.02em' }}>
                            {post.date} · ~5 min read
                        </div>
                    )}
                </header>

                <div style={{ fontSize: '1.1rem', lineHeight: '1.8', color: 'var(--foreground)' }}>
                    {post ? (
                        post.content
                    ) : (
                        <div style={{ padding: '2rem', border: '1px solid var(--border)', background: 'rgba(14, 18, 48, 0.35)', borderRadius: '10px' }}>
                            <p style={{ marginBottom: '1rem' }}>
                                This piece isn&apos;t up yet.
                            </p>
                            <p>
                                In the meantime, see <Link href="/blog" style={{ textDecoration: 'underline', color: 'var(--primary)' }}>the rest of the writing</Link>.
                            </p>
                        </div>
                    )}
                </div>
            </article>

            <div style={{ marginTop: '4rem', color: 'var(--muted)', textAlign: 'center', fontSize: '0.9rem' }}>
                <span style={{ color: 'var(--primary)' }}>✦</span>
            </div>
        </div>
    );
}
