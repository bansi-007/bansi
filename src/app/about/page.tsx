import styles from './page.module.css';

export default function About() {
    return (
        <div className={styles.wrap}>
            <article className={styles.panel}>
                <h1 className={styles.title}>About</h1>

                <p className={styles.text}>
                    I&apos;m Bansi. This site is a place to put things down, work, walks, books, the night sky, anything that holds my attention long enough.
                </p>
                <p className={styles.text}>
                    Physics is the thing I keep coming back to, not just as a subject, but as a way of asking questions. <em>Why does this happen? What&apos;s actually going on underneath? Is there a simpler way to see it?</em> Those questions feel more interesting to me than the answers.
                </p>
                <p className={styles.text}>
                    I also play cricket and photograph wildlife, mostly birds and big cats, anything that requires patience and the right light.
                </p>

                <figure className={styles.photoFigure}>
                    <img
                        src="/chota-matka-tadoba.jpg"
                        alt="Chota Matka, Bengal tiger at Tadoba Andhari Tiger Reserve"
                        className={styles.photo}
                    />
                    <figcaption className={styles.photoCaption}>
                        Chota Matka, Tadoba Andhari Tiger Reserve, Maharashtra
                    </figcaption>
                </figure>

                <p className={styles.text}>
                    Technical writing lives on <a href="https://medium.com/@bansimaddali" className="link">Medium</a>. Photos live on <a href="https://www.instagram.com/bansiinthewild/" className="link">Instagram</a>. This page is for everything that doesn&apos;t fit either.
                </p>
            </article>
        </div>
    );
}
