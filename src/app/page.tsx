import Link from 'next/link';
import styles from './page.module.css';
import { blogPosts } from '@/data/posts';

export default function Home() {
    return (
        <div className={styles.wrap}>
            <header className={styles.header}>
                <p className={styles.sri}>శ్రీ</p>
                <h1 className={styles.eyebrow}>Diary</h1>
                <p className={styles.lede}>
                    a diary of whatever holds my attention long enough to write down
                </p>
            </header>

            <div className={styles.ledger}>
                {blogPosts.map((post) => (
                    <Link href={`/blog/${post.slug}`} key={post.slug} className={styles.entry}>
                        <div className={styles.entryMeta}>
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
