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
        <div style={{ margin: '1.25rem auto 4rem', maxWidth: '92rem', padding: '0 clamp(1rem, 2vw, 1.5rem)' }}>
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
                ← కైఫీయత్
            </Link>

            <article
                style={{
                    position: 'relative',
                    background: '#fbf7ec',
                    border: '1px solid var(--border-strong)',
                    outline: '1px solid var(--border)',
                    outlineOffset: '-8px',
                    borderRadius: '4px',
                    padding: 'clamp(1.75rem, 4vw, 3rem)',
                    boxShadow: '0 2px 14px rgba(33, 29, 25, 0.06)',
                }}
            >
                {/* the twine stitch that bundles the record: two punched holes, thread through them */}
                <svg
                    aria-hidden
                    width="72"
                    height="26"
                    viewBox="0 0 72 26"
                    style={{ position: 'absolute', top: '-9px', left: '28px', transform: 'rotate(-2deg)' }}
                >
                    <circle cx="16" cy="14" r="3.5" fill="var(--background)" stroke="var(--border-strong)" strokeWidth="1.4" />
                    <circle cx="52" cy="14" r="3.5" fill="var(--background)" stroke="var(--border-strong)" strokeWidth="1.4" />
                    <path d="M 16 14 C 24 2, 44 2, 52 14" fill="none" stroke="#8a3324" strokeWidth="2" strokeLinecap="round" />
                    <path d="M 16 14 C 26 6, 42 6, 52 14" fill="none" stroke="#a54a38" strokeWidth="1.2" strokeLinecap="round" />
                    <path d="M 16 14 c -4 4, -7 6, -11 7" fill="none" stroke="#8a3324" strokeWidth="1.6" strokeLinecap="round" />
                    <path d="M 52 14 c 4 4, 7 6, 11 7" fill="none" stroke="#8a3324" strokeWidth="1.6" strokeLinecap="round" />
                </svg>
                <header style={{ marginBottom: '2.5rem', borderBottom: '1px solid var(--border-strong)', paddingBottom: '1.75rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1.5rem', flexWrap: 'wrap' }}>
                    <div style={{ minWidth: '16rem', flex: '1 1 24rem' }}>
                        <h1
                            style={{
                                fontSize: 'clamp(1.85rem, 4vw, 2.6rem)',
                                marginBottom: '0.85rem',
                                color: 'var(--foreground-strong)',
                                lineHeight: '1.2',
                                letterSpacing: '-0.01em',
                                fontFamily: 'var(--font-telugu-display-stack)',
                            }}
                        >
                            {post ? post.title : slug}
                        </h1>
                        {post && (
                            <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '0.7rem', color: 'var(--muted)', fontSize: '0.85rem' }}>
                                {post.tags?.map((t) => (
                                    <span key={t} style={{
                                        fontSize: '0.72rem',
                                        letterSpacing: '0.05em',
                                        color: 'var(--primary-strong)',
                                        padding: '0.18rem 0.6rem',
                                        border: '1px solid var(--border-strong)',
                                        borderRadius: '999px',
                                        fontFamily: 'var(--font-telugu-stack)',
                                    }}>
                                        {t}
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>
                    {post && (
                        <span className="doc-stamp">నమోదు · {post.date}</span>
                    )}
                </header>

                {post ? (
                    <PostBody original={post.content} english={post.contentEn} />
                ) : (
                    <div className="prose">
                        <p>ఈ పుట ఇంకా నమోదు కాలేదు. <Link href="/" style={{ textDecoration: 'underline', color: 'var(--primary)' }}>మిగతా కైఫీయత్ చూడండి</Link>.</p>
                    </div>
                )}
                <div className="nib-signoff" aria-hidden>✒&#xFE0E;</div>
            </article>

            {post && (newer || older) && (
                <nav
                    style={{
                        marginTop: '3rem',
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr',
                        gap: '1rem',
                        borderTop: '1px solid var(--border-strong)',
                        paddingTop: '1.5rem',
                    }}
                >
                    {newer ? (
                        <Link href={`/blog/${newer.slug}`} style={postNavStyle('left')}>
                            <span style={postNavLabel}>← కొత్తది</span>
                            <span style={postNavTitle}>{newer.title}</span>
                        </Link>
                    ) : <span />}
                    {older ? (
                        <Link href={`/blog/${older.slug}`} style={postNavStyle('right')}>
                            <span style={postNavLabel}>పాతది →</span>
                            <span style={postNavTitle}>{older.title}</span>
                        </Link>
                    ) : <span />}
                </nav>
            )}
        </div>
    );
}

const postNavStyle = (align: 'left' | 'right'): React.CSSProperties => ({
    display: 'flex',
    flexDirection: 'column',
    gap: '0.35rem',
    padding: '0.5rem 0.25rem',
    textAlign: align === 'right' ? 'right' : 'left',
});

const postNavLabel: React.CSSProperties = {
    fontSize: '0.72rem',
    letterSpacing: '0.12em',
    textTransform: 'uppercase',
    color: 'var(--primary-strong)',
};

const postNavTitle: React.CSSProperties = {
    fontFamily: 'var(--font-telugu-display-stack)',
    fontSize: '1rem',
    color: 'var(--foreground)',
    lineHeight: 1.3,
};
