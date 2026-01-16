import styles from './page.module.css';

export default function About() {
    return (
        <div className="container">
            <section className={styles.profile}>
                <h1 className={styles.title}>About Me</h1>
                <p className={styles.text}>
                    Hello! I'm Bansi Maddali, a Staff Machine Learning Engineer at Micron Technology based in Hyderabad, India.
                    I specialize in building scalable ML systems and have a deep passion for understanding the fundamental physics behind the algorithms we use.
                </p>
                <p className={styles.text}>
                    Previously, I worked as a Machine Learning Engineer at Tata Consultancy Services (TCS), gaining extensive experience in industrial AI applications.
                </p>
            </section>

            <section className={styles.section}>
                <h2 className={styles.subHeader}>Skills & Certifications</h2>
                <ul className={styles.list}>
                    <li className={styles.listItem}>Machine Learning Engineering (MLOps, Model Deployment)</li>
                    <li className={styles.listItem}>Deep Learning (TensorFlow Developer Certified)</li>
                    <li className={styles.listItem}>Cloud Platforms (Azure, AWS)</li>
                    <li className={styles.listItem}>Languages: Python, C, C++</li>
                </ul>
            </section>

            <section className={styles.section}>
                <h2 className={styles.subHeader}>Interests</h2>
                <p className={styles.text}>
                    Beyond the terminal, I explore the world through my lens. As an avid wildlife photographer, I run <a href="https://bansiwildography.com" target="_blank" className="link">BansiWildography</a>.
                    I also write about Physics and its intersection with AI.
                </p>
            </section>

            <section className={styles.section}>
                <h2 className={styles.subHeader}>Connect</h2>
                <p className={styles.text}>
                    Find me on <a href="https://github.com/bansi-007">GitHub</a>, <a href="https://medium.com/@bansidath">Medium</a>, or <a href="https://stackoverflow.com/users/9133465/bansi-dath">StackOverflow</a>.
                </p>
            </section>
        </div>
    );
}
