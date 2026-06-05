import Link from 'next/link';
import styles from './Navbar.module.css';

const Navbar = () => {
  return (
    <nav className={styles.nav}>
      <div className="container">
        <div className={styles.content}>
          <Link href="/" className={styles.logo}>
            <span className={styles.star}>✦</span> Bansi Maddali
          </Link>
          <div className={styles.links}>
            <Link href="/" className={styles.link}>Home</Link>
            <Link href="/about" className={styles.link}>About</Link>
            <Link href="/blog" className={styles.link}>Writing</Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
