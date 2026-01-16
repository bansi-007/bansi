import Link from 'next/link';
import styles from './page.module.css';
import { blogPosts } from '@/data/posts';

interface BlogPost {
    slug: string;
    title: string;
    date: string;
    excerpt: string;
}

export default function BlogIndex() {
    return (
        <div className="container">
            <header className={styles.header}>
                <h1 className={styles.title}> Technical Logs </h1>
                <p>Thoughts on ML Engineering, Systems, and Code.</p>
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
