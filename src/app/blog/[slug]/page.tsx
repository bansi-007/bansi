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
                {/* corner stitch: records bundled with twine sewn diagonally through two punched holes */}
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
                        {/* stamped seal with the signature scrawled across it */}
                        <div style={{ position: 'relative', width: '150px', height: '150px' }}>
                            <svg
                                aria-hidden
                                width="150"
                                height="150"
                                viewBox="0 0 100 100"
                                style={{ position: 'absolute', inset: 0, transform: 'rotate(-10deg)', opacity: 0.75 }}
                            >
                                <defs>
                                    <path id="sealTop" d="M 17,55 A 33,33 0 0 1 83,55" fill="none" />
                                </defs>
                                <circle cx="50" cy="50" r="46" fill="none" stroke="#9a2f21" strokeWidth="2.2" />
                                <circle cx="50" cy="50" r="40" fill="none" stroke="#9a2f21" strokeWidth="0.8" />
                                <text fontSize="7.8" fill="#9a2f21" fontFamily="var(--font-telugu-stack)" letterSpacing="0.5">
                                    <textPath href="#sealTop" startOffset="50%" textAnchor="middle">కరణం కార్యాలయం</textPath>
                                </text>
                                <text x="50" y="49" fontSize="8" fill="#9a2f21" fontFamily="var(--font-telugu-stack)" textAnchor="middle">ధృవీకరించ</text>
                                <text x="50" y="59" fontSize="8" fill="#9a2f21" fontFamily="var(--font-telugu-stack)" textAnchor="middle">బడినది</text>
                                <text x="50" y="72" fontSize="7" fill="#9a2f21" textAnchor="middle">{post.date}</text>
                                <text x="24" y="53" fontSize="7" fill="#9a2f21" textAnchor="middle">✦</text>
                                <text x="76" y="53" fontSize="7" fill="#9a2f21" textAnchor="middle">✦</text>
                            </svg>
                            <div style={{
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%) rotate(-8deg)',
                                fontFamily: 'var(--font-signature), cursive',
                                fontSize: '2.5rem',
                                color: '#241d18',
                                whiteSpace: 'nowrap',
                                zIndex: 1,
                            }}>
                                Kona Rama Dutt
                            </div>
                        </div>

                        {/* the సిరా పెన్ను set down after signing, dark ink drops at the nib */}
                        <svg aria-hidden width="280" height="86" viewBox="0 0 170 52" style={{ display: 'block', marginTop: '1rem' }}>
                            <g transform="rotate(-5 85 26)">
                                <circle cx="132" cy="24.5" r="4.5" fill="#241d18" />
                                <path d="M 66 17.5 L 124 20 A 4.5 4.5 0 0 1 124 29 L 66 31.5 Z" fill="#241d18" />
                                <line x1="70" y1="19.4" x2="122" y2="21.4" stroke="#4d4038" strokeWidth="0.9" strokeLinecap="round" />
                                <rect x="62" y="17.5" width="4" height="14" fill="#c08a1d" />
                                <path d="M 62 19 L 52 20.8 L 52 28.2 L 62 30 Z" fill="#3a2a1e" />
                                <path d="M 52 20.8 C 42 20.2 32 22 24 24.5 C 32 27 42 28.8 52 28.2 Z" fill="#c08a1d" stroke="#8a6712" strokeWidth="0.5" />
                                <line x1="25" y1="24.5" x2="38" y2="24.5" stroke="#7a5a12" strokeWidth="0.8" />
                                <circle cx="38" cy="24.5" r="1.3" fill="none" stroke="#7a5a12" strokeWidth="0.7" />
                                <path d="M 24 24.5 L 21 24.5" stroke="#241d18" strokeWidth="1.6" strokeLinecap="round" />
                            </g>
                            <path d="M 12 34 c -2.2 3.2 -3.3 5 -3.3 6.5 a 3.3 3.3 0 0 0 6.6 0 c 0 -1.5 -1.1 -3.3 -3.3 -6.5 Z" fill="#241d18" />
                            <circle cx="21" cy="44" r="1.8" fill="#241d18" opacity="0.85" />
                            <circle cx="6" cy="45.5" r="1.2" fill="#241d18" opacity="0.7" />
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
