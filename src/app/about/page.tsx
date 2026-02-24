import styles from './page.module.css';

export default function About() {
    return (
        <div className="container">
            <section className={styles.profile}>
                <h1 className={styles.title}>About Me</h1>
                <div className={styles.introGrid}>
                    <div>
                        <p className={styles.text}>
                            I'm Bansi. I spend a lot of time thinking about how the universe works and why things are the way they are.
                        </p>
                        <p className={styles.text}>
                            Physics is the thing I keep coming back to — not just as a subject, but as a way of asking questions. Why does this happen? What's actually going on underneath? Is there a simpler way to see it? Those questions feel more interesting to me than the answers.
                        </p>
                        <p className={styles.text}>
                            I play cricket, photograph wildlife, and occasionally write when something is interesting enough that I want to think it through out loud.
                        </p>
                    </div>
                    <figure className={styles.introPhoto}>
                        <img
                            src="/bansi-trophy.jpg"
                            alt="Bansi holding a cricket tournament winner's trophy"
                            className={styles.photo}
                        />
                        <figcaption className={styles.photoCaption}>
                            Tournament winner — cricket
                        </figcaption>
                    </figure>
                </div>
                <p className={styles.text}>
                    For the wildlife side — mostly birds and big cats, anything that requires patience and the right light:
                </p>
                <figure className={styles.photoFigure}>
                    <img
                        src="/chota-matka-tadoba.jpg"
                        alt="Chota Matka, Bengal tiger at Tadoba Andhari Tiger Reserve"
                        className={styles.photo}
                    />
                    <figcaption className={styles.photoCaption}>
                        Chota Matka — Tadoba Andhari Tiger Reserve, Maharashtra
                    </figcaption>
                </figure>
                <p className={styles.text}>
                    Technical writing goes on <a href="https://medium.com/@bansimaddali" className="link">Medium</a>. Here I write whatever I feel like.
                </p>
            </section>

            <section className={styles.section}>
                <h2 className={styles.subHeader}>Find me</h2>
                <p className={styles.text}>
                    Technical writing on <a href="https://medium.com/@bansimaddali" className="link">Medium</a>.
                    Photos on <a href="https://www.instagram.com/bansi.wildography/" className="link">Instagram</a> and <a href="https://bansiwildography.com" className="link">bansiwildography.com</a>.
                    On <a href="https://www.linkedin.com/in/iambansi" className="link">LinkedIn</a> if you need the professional version.
                </p>
            </section>
        </div>
    );
}
