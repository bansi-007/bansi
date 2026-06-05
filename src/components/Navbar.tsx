import Link from 'next/link';
import styles from './Navbar.module.css';

const Navbar = () => {
    return (
        <nav className={styles.nav}>
            <div className="container">
                <div className={styles.content}>
                    <div className={styles.left}>
                        <Link href="/" className={styles.logo}>
                            <span className={styles.star}>✦</span> Bansi Maddali
                        </Link>
                        <div className={styles.links}>
                            <Link href="/" className={styles.link}>Home</Link>
                            <Link href="/about" className={styles.link}>About</Link>
                            <Link href="/blog" className={styles.link}>Writing</Link>
                        </div>
                    </div>
                    <div className={styles.socials}>
                        <a href="https://github.com/bansi-007" target="_blank" rel="noopener noreferrer" className={styles.social}>GitHub</a>
                        <a href="https://medium.com/@bansimaddali" target="_blank" rel="noopener noreferrer" className={styles.social}>Medium</a>
                        <a href="https://www.instagram.com/bansiinthewild/" target="_blank" rel="noopener noreferrer" className={styles.social}>Instagram</a>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
