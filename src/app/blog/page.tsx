import Link from 'next/link';
import styles from './page.module.css';
import { blogPosts } from '@/data/posts';

export default function BlogIndex() {
    return (
        <div className="container">
            <header className={styles.header}>
                <p className={styles.eyebrow}>Long Exposure</p>
                <h1 className={styles.title}>A personal blog.</h1>
                <p className={styles.lede}>
                    New entries when something catches my attention long enough to write it down. Technical stuff still goes on{' '}
                    <a href="https://medium.com/@bansimaddali" target="_blank" rel="noopener noreferrer">Medium</a>.
                </p>
            </header>

            <div className={styles.grid}>
                {blogPosts.map((post) => (
                    <Link href={`/blog/${post.slug}`} key={post.slug} className={styles.card}>
                        <span className={styles.date}>{post.date}</span>
                        <h2 className={styles.cardTitle}>{post.title}</h2>
                        <p className={styles.excerpt}>{post.excerpt}</p>
                    </Link>
                ))}
            </div>
        </div>
    );
}
