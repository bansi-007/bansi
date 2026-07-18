import Link from 'next/link';
import styles from './page.module.css';
import { blogPosts } from '@/data/posts';

export default function Home() {
    return (
        <div className={styles.wrap}>
            <header className={styles.header}>
                <div className={styles.masthead}>
                    <p className={styles.sri}>శ్రీ</p>
                    <h1 className={styles.eyebrow}>రామదత్ కైఫీయత్</h1>
                    <p className={styles.lede}>
                        కరణం రామదత్ గారి మనవడు · దృష్టికి నిలిచిన సంగతులు ఇందు యథావిధిగా నమోదు చేయబడును
                    </p>
                </div>
                <span className={`doc-stamp ${styles.headerStamp}`}>నమోదు పుస్తకం</span>
            </header>

            <div className={styles.ledger}>
                {blogPosts.map((post, idx) => (
                    <Link href={`/blog/${post.slug}`} key={post.slug} className={styles.entry}>
                        <div className={styles.entryMeta}>
                            <span className={styles.serial}>క్ర.సం. {String(blogPosts.length - idx).padStart(2, '0')}</span>
                            <span className={styles.date}>{post.date}</span>
                            <span className={styles.tags}>
                                {post.tags?.map((t) => (
                                    <span key={t} className={styles.tag}>{t}</span>
                                ))}
                            </span>
                        </div>
                        <div className={styles.entryBody}>
                            <h2 className={styles.cardTitle}>{post.title}</h2>
                            <p className={styles.excerpt}>{post.excerpt}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
