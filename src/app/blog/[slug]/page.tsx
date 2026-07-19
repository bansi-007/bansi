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
    const serial = post ? String(blogPosts.length - index).padStart(2, '0') : '00';

    return (
        <div style={{ margin: '1rem auto 3rem', maxWidth: '86rem', padding: '0 clamp(0.5rem, 2vw, 1.5rem)' }}>
            <a
                href="/"
                style={{
                    color: 'var(--muted)',
                    marginBottom: '0.9rem',
                    display: 'inline-block',
                    fontSize: '0.85rem',
                }}
            >
                ← కైఫీయత్
            </a>

            <div className="filepage">
                {/* the నాడా through the corner of the sheet */}
                <svg
                    aria-hidden
                    width="96"
                    height="140"
                    viewBox="0 0 110 150"
                    style={{ position: 'absolute', top: '-16px', left: '-30px', zIndex: 3, pointerEvents: 'none', transform: 'rotate(-6deg)' }}
                >
                    <circle cx="26" cy="26" r="7" fill="#fbf7ec" stroke="#8a7a55" strokeWidth="2.4" />
                    <circle cx="66" cy="20" r="7" fill="#fbf7ec" stroke="#8a7a55" strokeWidth="2.4" />
                    <path d="M 26 26 C 40 14, 54 12, 66 20" fill="none" stroke="#efe6d2" strokeWidth="5" strokeLinecap="round" />
                    <path d="M 26 26 C 40 14, 54 12, 66 20" fill="none" stroke="#b23a2a" strokeWidth="5" strokeLinecap="round" strokeDasharray="7 7" />
                    <path d="M 66 20 C 74 34, 66 52, 56 66 C 46 80, 40 96, 44 116" fill="none" stroke="#efe6d2" strokeWidth="5" strokeLinecap="round" />
                    <path d="M 66 20 C 74 34, 66 52, 56 66 C 46 80, 40 96, 44 116" fill="none" stroke="#b23a2a" strokeWidth="5" strokeLinecap="round" strokeDasharray="7 7" strokeDashoffset="3" />
                    <path d="M 26 26 C 20 40, 24 56, 32 68 C 40 80, 44 96, 40 112" fill="none" stroke="#efe6d2" strokeWidth="5" strokeLinecap="round" />
                    <path d="M 26 26 C 20 40, 24 56, 32 68 C 40 80, 44 96, 40 112" fill="none" stroke="#b23a2a" strokeWidth="5" strokeLinecap="round" strokeDasharray="7 7" strokeDashoffset="10" />
                    <circle cx="42" cy="118" r="6" fill="#b23a2a" />
                </svg>

                {/* hand notes out in the margin */}
                <span className="margin-note small" style={{ top: '9.2rem' }}>పుట {serial}</span>
                <span className="margin-note tick" style={{ top: '14.5rem' }}>✓</span>
                <span className="margin-note small" style={{ top: '19.5rem', fontSize: '0.92rem' }}>సరిచూడబడినది</span>
                <span className="margin-note small" style={{ top: '29rem', fontSize: '1.25rem' }}>క.రా.ద.</span>

                {/* the noting-sheet head */}
                <div className="file-head">
                    <div className="fh-row">
                        <span className="fh-label">సం.</span>
                        <span className="fh-val">{serial}</span>
                        <span className="fh-label" style={{ borderLeft: '1px solid var(--border)' }}>తేదీ</span>
                        <span className="fh-val">{post ? post.date : '—'}</span>
                    </div>
                    <div className="fh-row">
                        <span className="fh-label">విషయము</span>
                        <span className="fh-val subject"><h1>{post ? post.title : slug}</h1></span>
                    </div>
                    {post?.tags && (
                        <div className="fh-row">
                            <span className="fh-label">విభాగము</span>
                            <span className="fh-val">{post.tags.join(' · ')}</span>
                        </div>
                    )}
                </div>

                {post ? (
                    <PostBody original={post.content} english={post.contentEn} />
                ) : (
                    <div className="prose">
                        <p>ఈ పుట ఇంకా నమోదు కాలేదు. <a href="/" style={{ textDecoration: 'underline', color: 'var(--primary)' }}>మిగతా కైఫీయత్ చూడండి</a>.</p>
                    </div>
                )}

                {post && (
                    <div style={{ marginTop: '2.6rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <div style={{ fontSize: '1.9rem', color: '#241d18', transform: 'rotate(-2deg)', lineHeight: 1.2 }}>
                            కోన రామదత్
                        </div>
                        <div style={{ width: '220px', marginTop: '0.3rem' }}>
                            <div style={{ borderTop: '2px solid #241d18' }} />
                            <div style={{ borderTop: '1px solid #241d18', width: '62%', margin: '3px auto 0' }} />
                        </div>
                        <svg aria-hidden width="300" height="56" viewBox="0 0 200 38" style={{ display: 'block', marginTop: '0.6rem' }}>
                            <path d="M 74 14.5 L 160 13.2 Q 168 13.2 168 19 Q 168 24.8 160 24.8 L 74 23.5 Z" fill="#241d18" />
                            <path d="M 168 15.5 Q 176 15.5 178 19 Q 176 22.5 168 22.5 Z" fill="#241d18" />
                            <line x1="80" y1="15.6" x2="156" y2="14.6" stroke="#4d4038" strokeWidth="0.8" strokeLinecap="round" />
                            <rect x="146" y="13.4" width="4" height="11.4" fill="#c08a1d" />
                            <path d="M 74 15 L 58 16.4 L 58 21.6 L 74 23 Z" fill="#3a2a1e" />
                            <path d="M 58 16.4 C 44 15.6 30 17.2 18 19 C 30 20.8 44 22.4 58 21.6 Z" fill="#c08a1d" stroke="#8a6712" strokeWidth="0.5" />
                            <line x1="19.5" y1="19" x2="40" y2="19" stroke="#7a5a12" strokeWidth="0.7" />
                            <circle cx="40" cy="19" r="1.4" fill="none" stroke="#7a5a12" strokeWidth="0.6" />
                            <path d="M 18 19 L 14.5 19" stroke="#241d18" strokeWidth="1.4" strokeLinecap="round" />
                            <path d="M 8 24 c -1.8 2.6 -2.7 4.1 -2.7 5.4 a 2.7 2.7 0 0 0 5.4 0 c 0 -1.3 -0.9 -2.8 -2.7 -5.4 Z" fill="#241d18" />
                            <circle cx="17" cy="32" r="1.5" fill="#241d18" opacity="0.85" />
                        </svg>
                    </div>
                )}

                <div className="file-foot">
                    <span>కైఫీయత్ · నమోదు సం. {serial}</span>
                    <span>పుట {serial}</span>
                </div>
            </div>

            {post && (newer || older) && (
                <nav style={{ marginTop: '1.6rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    {newer ? (
                        <a href={`/blog/${newer.slug}`} style={navStyle('left')}>
                            <span style={navLabel}>← కొత్తది</span>
                            <span style={navTitle}>{newer.title}</span>
                        </a>
                    ) : <span />}
                    {older ? (
                        <a href={`/blog/${older.slug}`} style={navStyle('right')}>
                            <span style={navLabel}>పాతది →</span>
                            <span style={navTitle}>{older.title}</span>
                        </a>
                    ) : <span />}
                </nav>
            )}
        </div>
    );
}

const navStyle = (align: 'left' | 'right'): React.CSSProperties => ({
    display: 'flex',
    flexDirection: 'column',
    gap: '0.2rem',
    padding: '0.4rem 0.25rem',
    textAlign: align === 'right' ? 'right' : 'left',
});

const navLabel: React.CSSProperties = {
    fontSize: '0.7rem',
    letterSpacing: '0.08em',
    color: 'var(--primary-strong)',
};

const navTitle: React.CSSProperties = {
    fontSize: '0.95rem',
    color: 'var(--foreground)',
    lineHeight: 1.3,
};
