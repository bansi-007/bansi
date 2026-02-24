import Link from 'next/link';
import Typewriter from '@/components/Typewriter';
import styles from './page.module.css';

export default function Home() {
  return (
    <div className="container">
      <div className={styles.heroContainer}>
        <section className={styles.hero}>
          <h1 className={styles.title}>
            <span className="terminal-cursor">
              <Typewriter text="Hello, I'm Bansi." delay={75} />
            </span>
          </h1>
          <p className={styles.subtitle}>
            Physics Enthusiast. Photographer.
          </p>
          <div className={styles.ctaContainer}>
            <Link href="/about" className={styles.cta}>
              About Me
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
