import Link from 'next/link';
import { blogPosts } from '@/data/posts';
import PostBody from '@/components/PostBody';

export async function generateStaticParams() {
    return blogPosts.map((post) => ({
        slug: post.slug,
    }));
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const index = blogPosts.findIndex(p => p.slug === slug);
    const post = index >= 0 ? blogPosts[index] : undefined;
    const newer = index > 0 ? blogPosts[index - 1] : undefined;
    const older = index >= 0 && index < blogPosts.length - 1 ? blogPosts[index + 1] : undefined;

    return (
        <div style={{ margin: '3rem auto 4rem', maxWidth: '92rem', padding: '0 clamp(1rem, 2vw, 1.5rem)' }}>
            <Link
                href="/"
                style={{
                    color: 'var(--muted)',
                    marginBottom: '1.5rem',
                    display: 'inline-block',
                    fontSize: '0.9rem',
                    letterSpacing: '0.01em',
                }}
            >
                ← Diary
            </Link>

            <article
                style={{
                    background: 'rgba(3, 4, 10, 0.88)',
                    backdropFilter: 'blur(16px)',
                    WebkitBackdropFilter: 'blur(16px)',
                    border: '1px solid var(--border)',
                    borderRadius: '14px',
                    padding: 'clamp(1.5rem, 3vw, 2.5rem)',
                    boxShadow: '0 30px 80px -40px rgba(0, 0, 0, 0.6)',
                }}
            >
                <header style={{ marginBottom: '2.5rem', borderBottom: '1px solid var(--border)', paddingBottom: '1.75rem' }}>
                    <h1
                        style={{
                            fontSize: 'clamp(1.75rem, 4vw, 2.4rem)',
                            marginBottom: '0.85rem',
                            color: 'var(--foreground)',
                            lineHeight: '1.2',
                            letterSpacing: '-0.02em',
                        }}
                    >
                        {post ? post.title : slug}
                    </h1>
                    {post && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', color: 'var(--muted)', fontSize: '0.85rem', letterSpacing: '0.02em' }}>
                            <span style={{ letterSpacing: '0.1em', textTransform: 'uppercase' }}>{post.date}</span>
                            {post.tag && (
                                <span style={{
                                    fontSize: '0.68rem',
                                    letterSpacing: '0.1em',
                                    textTransform: 'uppercase',
                                    color: 'var(--primary)',
                                    padding: '0.2rem 0.6rem',
                                    border: '1px solid var(--border-strong)',
                                    borderRadius: '999px',
                                    background: 'rgba(125, 211, 252, 0.07)',
                                }}>
                                    {post.tag}
                                </span>
                            )}
                        </div>
                    )}
                </header>

                {post ? (
                    <PostBody original={post.content} english={post.contentEn} />
                ) : (
                    <div className="prose">
                        <p>This piece isn&apos;t up yet. See <Link href="/" style={{ textDecoration: 'underline', color: 'var(--primary)' }}>the rest</Link>.</p>
                    </div>
                )}
            </article>

            {post && (newer || older) && (
                <nav
                    style={{
                        marginTop: '2.5rem',
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr',
                        gap: '1rem',
                    }}
                >
                    {newer ? (
                        <Link href={`/blog/${newer.slug}`} style={postNavStyle('left')}>
                            <span style={postNavLabel}>← Newer</span>
                            <span style={postNavTitle}>{newer.title}</span>
                        </Link>
                    ) : <span />}
                    {older ? (
                        <Link href={`/blog/${older.slug}`} style={postNavStyle('right')}>
                            <span style={postNavLabel}>Older →</span>
                            <span style={postNavTitle}>{older.title}</span>
                        </Link>
                    ) : <span />}
                </nav>
            )}

            <div style={{ marginTop: '3rem', textAlign: 'center', fontSize: '0.9rem' }}>
                <span style={{ color: 'var(--primary)' }}>✦</span>
            </div>
        </div>
    );
}

const postNavStyle = (align: 'left' | 'right'): React.CSSProperties => ({
    display: 'flex',
    flexDirection: 'column',
    gap: '0.35rem',
    padding: '1.1rem 1.35rem',
    border: '1px solid var(--border)',
    borderRadius: '12px',
    background: 'rgba(3, 4, 10, 0.7)',
    backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(10px)',
    textAlign: align === 'right' ? 'right' : 'left',
});

const postNavLabel: React.CSSProperties = {
    fontSize: '0.72rem',
    letterSpacing: '0.12em',
    textTransform: 'uppercase',
    color: 'var(--primary)',
};

const postNavTitle: React.CSSProperties = {
    fontFamily: 'var(--font-display-stack)',
    fontSize: '1rem',
    color: 'var(--foreground)',
    lineHeight: 1.3,
};
