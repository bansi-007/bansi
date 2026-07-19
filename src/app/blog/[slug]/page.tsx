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
                className="sheet"
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
                {/* corner stitch: records bundled with twine sewn diagonally through two punched holes */}
                <div className="cup-ring" aria-hidden />
                <svg
                    aria-hidden
                    width="64"
                    height="64"
                    viewBox="0 0 64 64"
                    style={{ position: 'absolute', top: '-3px', left: '-3px' }}
                >
                    <line x1="46" y1="10" x2="10" y2="46" stroke="#8a3324" strokeWidth="2.4" strokeLinecap="round" />
                    <line x1="50" y1="16" x2="16" y2="50" stroke="#a54a38" strokeWidth="1.5" strokeLinecap="round" />
                    <circle cx="46" cy="10" r="3.2" fill="#fbf7ec" stroke="var(--border-strong)" strokeWidth="1.4" />
                    <circle cx="10" cy="46" r="3.2" fill="#fbf7ec" stroke="var(--border-strong)" strokeWidth="1.4" />
                    <path d="M 46 10 c 3 -3, 6 -4.5, 10 -5.5" fill="none" stroke="#8a3324" strokeWidth="1.6" strokeLinecap="round" />
                    <path d="M 10 46 c -3 3, -4.5 6, -5.5 10" fill="none" stroke="#8a3324" strokeWidth="1.6" strokeLinecap="round" />
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
