import Link from 'next/link';
import styles from './page.module.css';

interface BlogPost {
    slug: string;
    title: string;
    date: string;
    excerpt: string;
}

const posts: BlogPost[] = [
    {
        slug: "dilated-conv-block",
        title: "DilatedConvBlock: When Convolutions Learn to Breathe",
        date: "January 2026",
        excerpt: "Exploring the mechanics of dilated convolutions and their impact on receptive fields in deep learning models."
    },
    {
        slug: "attention-is-all-you-need",
        title: "How 'Attention Is All You Need' Revolutionised AI",
        date: "June 2025",
        excerpt: "A deep dive into the Transformer architecture and its paradigm-shifting influence on NLP and Computer Vision."
    },
    {
        slug: "mb-conv-block",
        title: "Understanding MB Conv Block",
        date: "May 2025",
        excerpt: "Deconstructing the EfficientNet building block: Mobile Inverted Bottleneck Convolution."
    },
    {
        slug: "opc-ua-industrial-iot",
        title: "Understanding OPC UA and Industrial IoT",
        date: "March 2022",
        excerpt: "Connecting the dots in Industry 4.0 with OPC Unified Architecture."
    }
];

export default function BlogIndex() {
    return (
        <div className="container">
            <header className={styles.header}>
                <h1 className={styles.title}> Technical Logs </h1>
                <p>Thoughts on ML Engineering, Systems, and Code.</p>
            </header>

            <div className={styles.grid}>
                {posts.map((post) => (
                    <Link href={`/blog/${post.slug}`} key={post.slug} className={styles.card}>
                        <span className={styles.date}>{post.date}</span>
                        <h2 className={styles.cardTitle}>{post.title}</h2>
                        <p className={styles.excerpt}>{post.excerpt}</p>
                    </Link>
                ))}
            </div>
        </div>
    );
}
