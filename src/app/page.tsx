import Link from 'next/link';
import Typewriter from '@/components/Typewriter';
import styles from './page.module.css';
import { blogPosts } from '@/data/posts';

export default function Home() {
  const recentPosts = blogPosts.slice(0, 3);

  return (
    <div className="container">
      <div className={styles.homeContainer}>
        {/* Left Column: Hero */}
        <section className={styles.hero}>
          <h1 className={styles.title}>
            <span className="terminal-cursor">
              <Typewriter text="Hello, I'm Bansi." delay={75} />
            </span>
          </h1>
          <p className={styles.subtitle}>
            Staff Machine Learning Engineer @ Micron Technology. <br />
            Physics Enthusiast. Photographer.
          </p>
          <div className={styles.ctaContainer}>
            <Link href="/about" className={styles.cta}>
              Init(About_Me)
            </Link>
            <Link href="/blog" className={styles.cta}>
              Read(Blog)
            </Link>
          </div>
        </section>

        {/* Right Column: Latest Logs */}
        <section className={styles.logsSection}>
          <h2 className={styles.sectionTitle}>Latest Logs</h2>
          <ul className={styles.postList}>
            {recentPosts.map((post) => (
              <li key={post.slug} className={styles.postItem}>
                <Link href={`/blog/${post.slug}`}>
                  <span className={styles.postDate}>// {post.date}</span>
                  <span className={styles.postTitle}>{post.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
