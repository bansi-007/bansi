import Link from 'next/link';
import styles from './page.module.css';
import { blogPosts } from '@/data/posts';

export default function Home() {
    return (
        <div className={styles.wrap}>
            <header className={styles.header}>
                <p className={styles.eyebrow}>✦ Diary</p>
                <p className={styles.lede}>
                    Whatever holds my attention long enough to write down.
                </p>
            </header>

            <div className={styles.grid}>
                {blogPosts.map((post) => (
                    <Link href={`/blog/${post.slug}`} key={post.slug} className={styles.card}>
                        <div className={styles.cardMeta}>
                            <span className={styles.date}>{post.date}</span>
                            {post.tag && <span className={styles.tag}>{post.tag}</span>}
                        </div>
                        <h2 className={styles.cardTitle}>{post.title}</h2>
                        <p className={styles.excerpt}>{post.excerpt}</p>
                    </Link>
                ))}
            </div>
        </div>
    );
}
