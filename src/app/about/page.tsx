import styles from './page.module.css';

export default function About() {
    return (
        <div className="container">
            <section className={styles.profile}>
                <h1 className={styles.title}>About Me</h1>
                <p className={styles.text}>
                    I bridge the gap between research and production systems, building scalable ML solutions that solve real-world problems.
                </p>
                <p className={styles.text}>
                    With a deep passion for understanding the "why" behind the "how," I explore the intersection of Physics and Deep Learning. I believe that understanding the fundamental principles—like why a convolution works or how attention mechanisms mirror human cognition—is key to building robust AI systems.
                </p>
            </section>

            <section className={styles.section}>
                <h2 className={styles.subHeader}>Skills & Methodology</h2>
                <ul className={styles.list}>
                    <li className={styles.listItem}><strong>Languages:</strong> Python, C, C++, SQL</li>
                    <li className={styles.listItem}><strong>Frameworks:</strong> PyTorch, TensorFlow, Scikit-learn, FastAI</li>
                    <li className={styles.listItem}><strong>Cloud & MLOps:</strong> Azure, AWS, Docker, Kubernetes, CI/CD</li>
                    <li className={styles.listItem}><strong>Focus:</strong> Computer Vision, Deep Learning, Industrial IoT, System Design</li>
                </ul>
            </section>

            <section className={styles.section}>
                <h2 className={styles.subHeader}>Connect</h2>
                <p className={styles.text}>
                    I write about my learnings on <a href="https://medium.com/@bansimaddali" className="link">Medium</a>.
                    <br />
                    Find me on <a href="https://www.linkedin.com/in/iambansi" className="link">LinkedIn</a> or check my code on <a href="https://github.com/bansi-007" className="link">GitHub</a>.
                </p>
            </section>
        </div>
    );
}
