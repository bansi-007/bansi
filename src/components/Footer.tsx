import styles from './Footer.module.css';

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className="container">
                <p className={styles.text}>
                    &copy; {new Date().getFullYear()} Bansi Maddali. Built with Next.js & Code.
                </p>
                <div className={styles.socials}>
                    <a href="https://github.com/bansi-007" target="_blank" rel="noopener noreferrer">GitHub</a>
                    <a href="https://www.linkedin.com/in/iambansi" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                    <a href="https://bansidath.in" target="_blank" rel="noopener noreferrer">Blog/Medium</a>
                    <a href="https://www.instagram.com/bansi.wildography/" target="_blank" rel="noopener noreferrer">Instagram</a>
                    <a href="https://bansiwildography.com" target="_blank" rel="noopener noreferrer">Photography</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
