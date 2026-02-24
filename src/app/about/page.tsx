import styles from './page.module.css';

export default function About() {
    return (
        <div className="container">
            <section className={styles.profile}>
                <h1 className={styles.title}>About Me</h1>
                <p className={styles.text}>
                    I'm Bansi. I spend a lot of time thinking about how the universe works and why things are the way they are.
                </p>
                <p className={styles.text}>
                    Physics is the thing I keep coming back to — not just as a subject, but as a way of asking questions. Why does this happen? What's actually going on underneath? Is there a simpler way to see it? Those questions feel more interesting to me than the answers.
                </p>
                <p className={styles.text}>
                    I also photograph wildlife. Mostly birds and landscapes — anything that requires patience and the right light. It's the slowest thing I do, and I think that's exactly why I like it.
                </p>
                <p className={styles.text}>
                    Here I write whatever I feel like — things I notice, questions I can't shake, stuff that seems worth saying. Technical writing goes on <a href="https://medium.com/@bansimaddali" className="link">Medium</a>.
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
