import Link from 'next/link';
import styles from './Navbar.module.css';

const Navbar = () => {
  return (
    <nav className={styles.nav}>
      <div className="container">
        <div className={styles.content}>
          <Link href="/" className={styles.logo}>
            &gt; ~/bansi_maddali
          </Link>
          <div className={styles.links}>
            <Link href="/" className={styles.link}>_home</Link>
            <Link href="/about" className={styles.link}>_about</Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
