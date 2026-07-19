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
            <a
                href="/"
                style={{
                    color: 'var(--muted)',
                    marginBottom: '3.4rem',
                    display: 'inline-block',
                    fontSize: '0.9rem',
                    letterSpacing: '0.01em',
                }}
            >
                ← కైఫీయత్
            </a>

            <div className="folder">
            {post && (
                <div className="folder-tab">దస్తావేజు సం. {String(blogPosts.length - index).padStart(2, '0')}</div>
            )}
            <article
                className="sheet"
                style={{
                    position: 'relative',
                    zIndex: 2,
                    background: '#fbf7ec',
                    border: '1px solid var(--border-strong)',
                    outline: '1px solid var(--border)',
                    outlineOffset: '-8px',
                    borderRadius: '4px',
                    padding: 'clamp(1.75rem, 4vw, 3rem)',
                    boxShadow: '0 2px 14px rgba(33, 29, 25, 0.06)',
                }}
            >
                {/* the file నాడా: red-white twisted thread through two grommets, tail hanging with a knot */}
                <svg
                    aria-hidden
                    width="110"
                    height="150"
                    viewBox="0 0 110 150"
                    style={{ position: 'absolute', top: '-20px', left: '-40px', zIndex: 3, pointerEvents: 'none', transform: 'rotate(-6deg)' }}
                >
                    <circle cx="26" cy="26" r="7" fill="#fbf7ec" stroke="#8a7a55" strokeWidth="2.4" />
                    <circle cx="66" cy="20" r="7" fill="#fbf7ec" stroke="#8a7a55" strokeWidth="2.4" />
                    <path d="M 26 26 C 40 14, 54 12, 66 20" fill="none" stroke="#efe6d2" strokeWidth="5" strokeLinecap="round" />
                    <path d="M 26 26 C 40 14, 54 12, 66 20" fill="none" stroke="#b23a2a" strokeWidth="5" strokeLinecap="round" strokeDasharray="7 7" />
                    <path d="M 66 20 C 74 34, 66 52, 56 66 C 46 80, 40 96, 44 116" fill="none" stroke="#efe6d2" strokeWidth="5" strokeLinecap="round" />
                    <path d="M 66 20 C 74 34, 66 52, 56 66 C 46 80, 40 96, 44 116" fill="none" stroke="#b23a2a" strokeWidth="5" strokeLinecap="round" strokeDasharray="7 7" strokeDashoffset="3" />
                    <path d="M 26 26 C 20 40, 24 56, 32 68 C 40 80, 44 96, 40 112" fill="none" stroke="#efe6d2" strokeWidth="5" strokeLinecap="round" />
                    <path d="M 26 26 C 20 40, 24 56, 32 68 C 40 80, 44 96, 40 112" fill="none" stroke="#b23a2a" strokeWidth="5" strokeLinecap="round" strokeDasharray="7 7" strokeDashoffset="10" />
                    <circle cx="42" cy="120" r="6.5" fill="#b23a2a" />
                    <circle cx="40" cy="118" r="2" fill="#d9634f" />
                    <path d="M 42 126 c -1 6, 1 12, 4 16" fill="none" stroke="#b23a2a" strokeWidth="4" strokeLinecap="round" />
                    <path d="M 42 126 c -1 6, 1 12, 4 16" fill="none" stroke="#efe6d2" strokeWidth="4" strokeLinecap="round" strokeDasharray="6 6" strokeDashoffset="3" />
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
                        <p>ఈ పుట ఇంకా నమోదు కాలేదు. <a href="/" style={{ textDecoration: 'underline', color: 'var(--primary)' }}>మిగతా కైఫీయత్ చూడండి</a>.</p>
                    </div>
                )}
                {post && (
                    <div style={{ marginTop: '3.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <div style={{
                            fontFamily: 'var(--font-signature), cursive',
                            fontSize: '2.5rem',
                            color: '#241d18',
                            transform: 'rotate(-3deg)',
                            lineHeight: 1.2,
                            padding: '0 0.5rem',
                        }}>
                            Kona Rama Dutt
                        </div>
                        <div style={{ width: '250px', marginTop: '0.35rem' }}>
                            <div style={{ borderTop: '2px solid #241d18' }} />
                            <div style={{ borderTop: '1px solid #241d18', width: '62%', margin: '4px auto 0' }} />
                        </div>
                        <svg aria-hidden width="340" height="64" viewBox="0 0 200 38" style={{ display: 'block', marginTop: '0.75rem' }}>
                            {/* slender barrel, tapering slightly toward the grip */}
                            <path d="M 74 14.5 L 160 13.2 Q 168 13.2 168 19 Q 168 24.8 160 24.8 L 74 23.5 Z" fill="#241d18" />
                            <path d="M 168 15.5 Q 176 15.5 178 19 Q 176 22.5 168 22.5 Z" fill="#241d18" />
                            <line x1="80" y1="15.6" x2="156" y2="14.6" stroke="#4d4038" strokeWidth="0.8" strokeLinecap="round" />
                            {/* gold cap band */}
                            <rect x="146" y="13.4" width="4" height="11.4" fill="#c08a1d" />
                            {/* grip section */}
                            <path d="M 74 15 L 58 16.4 L 58 21.6 L 74 23 Z" fill="#3a2a1e" />
                            {/* long gold nib */}
                            <path d="M 58 16.4 C 44 15.6 30 17.2 18 19 C 30 20.8 44 22.4 58 21.6 Z" fill="#c08a1d" stroke="#8a6712" strokeWidth="0.5" />
                            <line x1="19.5" y1="19" x2="40" y2="19" stroke="#7a5a12" strokeWidth="0.7" />
                            <circle cx="40" cy="19" r="1.4" fill="none" stroke="#7a5a12" strokeWidth="0.6" />
                            <path d="M 18 19 L 14.5 19" stroke="#241d18" strokeWidth="1.4" strokeLinecap="round" />
                            {/* ink drops */}
                            <path d="M 8 24 c -1.8 2.6 -2.7 4.1 -2.7 5.4 a 2.7 2.7 0 0 0 5.4 0 c 0 -1.3 -0.9 -2.8 -2.7 -5.4 Z" fill="#241d18" />
                            <circle cx="17" cy="32" r="1.5" fill="#241d18" opacity="0.85" />
                            <circle cx="4" cy="33.5" r="1" fill="#241d18" opacity="0.7" />
                        </svg>
                    </div>
                )}
            </article>
            </div>

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
                        <a href={`/blog/${newer.slug}`} style={postNavStyle('left')}>
                            <span style={postNavLabel}>← కొత్తది</span>
                            <span style={postNavTitle}>{newer.title}</span>
                        </a>
                    ) : <span />}
                    {older ? (
                        <a href={`/blog/${older.slug}`} style={postNavStyle('right')}>
                            <span style={postNavLabel}>పాతది →</span>
                            <span style={postNavTitle}>{older.title}</span>
                        </a>
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
