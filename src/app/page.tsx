import styles from './page.module.css';
import { blogPosts } from '@/data/posts';

export default function Home() {
    return (
        <div className={styles.wrap}>
            <header className={styles.header}>
                <div className={styles.masthead}>
                    <h1 className={styles.eyebrow}>
                        రామదత్ గారి కైఫీయత్{' '}
                        <span className={styles.titleGloss}>కరణం గారి దృష్టికి నిలిచిన సంగతులు ఇందు యథావిధిగా నమోదు చేయబడును</span>
                    </h1>
                </div>
                <span className={`doc-stamp ${styles.headerStamp}`}>నమోదు పుస్తకం</span>
            </header>

            <div className="register">
                <span className="spine" aria-hidden />
                <div className="reg-head">
                    <span>క్ర.సం.</span>
                    <span>తేదీ</span>
                    <span>విషయము</span>
                </div>
                {blogPosts.map((post, idx) => (
                    <a href={`/blog/${post.slug}`} key={post.slug}>
                        <span className={styles.serial}>{String(blogPosts.length - idx).padStart(2, '0')}</span>
                        <span className={styles.date}>{post.date}</span>
                        <span className={styles.subjectCell}>
                            <span className={styles.cardTitle}>{post.title}</span>
                            <span className={styles.excerpt}>{post.excerpt}</span>
                            <span className={styles.tags}>
                                {post.tags?.map((t) => (
                                    <span key={t} className={styles.tag}>{t}</span>
                                ))}
                            </span>
                        </span>
                    </a>
                ))}
                {Array.from({ length: 7 }).map((_, i) => (
                    <div className="reg-empty" key={`e${i}`}>
                        <span /><span /><span />
                    </div>
                ))}
            </div>
            <div className="reg-foot">
                <span>మొత్తం నమోదులు: {String(blogPosts.length).padStart(2, '0')}</span>
                <span>పుట 01</span>
            </div>
        </div>
    );
}
