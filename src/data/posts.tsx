export interface BlogPost {
    slug: string;
    title: string;
    date: string;
    excerpt: string;
    content?: React.ReactNode;
    mediumLink?: string;
}

export const blogPosts: BlogPost[] = [
    {
        slug: "engram-conditional-memory",
        title: "A New Axis of Sparsity for Large Language Models",
        date: "Jan 2026",
        excerpt: "DeepSeek's Engram introduces conditional memory to LLMs - a revolutionary approach that separates knowledge retrieval from reasoning, achieving massive performance gains.",
        content: (
            <>
                <h2>Introduction: The Memory Problem in AI</h2>
                <p>
                    Imagine having to solve a complex math problem while simultaneously trying to remember basic facts like "2+2=4" or "Paris is the capital of France." That's essentially what current Large Language Models (LLMs) do every single time they process text. They waste precious computational power "recomputing" simple facts they've seen thousands of times before.
                </p>
                <p>
                    DeepSeek AI and Peking University have just published a groundbreaking paper titled <strong>"Conditional Memory via Scalable Lookup: A New Axis of Sparsity for Large Language Models"</strong> that introduces <strong>Engram</strong> – a revolutionary approach that gives AI models a dedicated "memory bank" for instant recall, freeing up their computational power for actual reasoning.
                </p>
                <br />

                <div style={{ background: '#1a1a1a', padding: '1.5rem', borderRadius: '8px', margin: '2rem 0', border: '1px solid var(--border)' }}>
                    <h3 style={{ marginTop: 0, marginBottom: '1rem', fontSize: '1.1rem' }}>📑 Table of Contents</h3>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontFamily: 'monospace', fontSize: '0.95rem' }}>
                        <li style={{ marginBottom: '0.5rem' }}>→ What is Engram?</li>
                        <li style={{ marginBottom: '0.5rem' }}>→ Why Do We Need This?</li>
                        <li style={{ marginBottom: '0.5rem' }}>→ How Does Engram Work?</li>
                        <li style={{ marginBottom: '0.5rem' }}>→ The U-Shaped Scaling Law</li>
                        <li style={{ marginBottom: '0.5rem' }}>→ Performance Results</li>
                        <li style={{ marginBottom: '0.5rem' }}>→ Why It Boosts Reasoning</li>
                        <li style={{ marginBottom: '0.5rem' }}>→ Infrastructure Efficiency</li>
                        <li style={{ marginBottom: '0.5rem' }}>→ Future Applications</li>
                    </ul>
                </div>

                <h2>What is Engram? The TL;DR</h2>
                <div style={{ background: '#1a1a1a', padding: '1.5rem', borderRadius: '8px', margin: '1.5rem 0', borderLeft: '4px solid var(--primary)' }}>
                    <strong>Engram is a smart memory module that lets AI models instantly "look up" common patterns and facts instead of wasting time recomputing them.</strong>
                </div>
                <p>Think of it like this:</p>
                <ul>
                    <li><strong>Before Engram:</strong> Your AI is like a student who has to re-derive every formula from scratch during an exam, even for basic equations they've seen a million times.</li>
                    <li><strong>With Engram:</strong> Your AI is like a student with a well-organized formula sheet – they can instantly reference known facts and spend their mental energy on solving the actual problem.</li>
                </ul>
                <div style={{ margin: '2rem 0', textAlign: 'center' }}>
                    <img src="/engram-before-after.png" alt="Before Engram vs After Engram comparison" style={{ width: '100%', maxWidth: '800px', borderRadius: '8px', border: '1px solid var(--border)' }} />
                </div>
                <br />

                <h2>Why Do We Need This?</h2>
                <h3>The Inefficiency of Traditional Transformers</h3>
                <p>
                    Current LLMs based on the Transformer architecture have a fundamental limitation: <strong>they lack a native way to efficiently store and retrieve static knowledge</strong>.
                </p>
                <p>When a model encounters common phrases like:</p>
                <ul>
                    <li>"The capital of France is..."</li>
                    <li>"E = mc²"</li>
                    <li>"Once upon a time..."</li>
                </ul>
                <p>It has to process these through multiple layers of neural networks, consuming:</p>
                <ul>
                    <li>✗ Valuable GPU compute power (FLOPs)</li>
                    <li>✗ Expensive high-bandwidth memory (HBM)</li>
                    <li>✗ Attention capacity that could be used for understanding context</li>
                </ul>
                <div style={{ background: '#1a1a1a', padding: '1rem', borderRadius: '4px', margin: '1.5rem 0', fontFamily: 'monospace', borderLeft: '3px solid #ff6b6b' }}>
                    This is like using a supercomputer to look up a phone number instead of just checking a phone book.
                </div>
                <br />

                <h3>The Sparsity Revolution</h3>
                <p>
                    The AI community has been exploring "sparsity" – the idea that you don't need to activate the entire model for every task. The most famous example is <strong>Mixture-of-Experts (MoE)</strong>, which routes different inputs to specialized "expert" sub-networks.
                </p>
                <p>
                    MoE gave us <strong>conditional computation</strong> (only use the parts of the brain you need).
                </p>
                <p>
                    <strong>Engram introduces conditional memory</strong> (only store and retrieve what you need, when you need it).
                </p>
                <p>
                    Together, they form a powerful duo: <strong>smart computation + smart memory</strong>.
                </p>
                <br />

                <h2>How Does Engram Work?</h2>
                <h3>1. The Memory Bank: Modernized N-gram Embeddings</h3>
                <p>
                    Engram creates a searchable database of word sequences (N-grams) – think of it as a massive lookup table for common patterns.
                </p>
                <div style={{ background: '#1a1a1a', padding: '1rem', borderRadius: '4px', margin: '1.5rem 0', fontFamily: 'monospace' }}>
                    <strong>Example:</strong><br />
                    • Input: "The capital of France"<br />
                    • Engram lookup: → "is Paris" (retrieved in O(1) constant time)<br />
                    • No need to "compute" this through 40+ transformer layers!
                </div>
                <br />
                <div style={{ margin: '2rem 0', textAlign: 'center' }}>
                    <img src="/engram-architecture.png" alt="How Engram Works - Architecture Diagram" style={{ width: '100%', maxWidth: '800px', borderRadius: '8px', border: '1px solid var(--border)' }} />
                </div>

                <h3>2. Three Key Innovations</h3>
                <h4>A. Tokenizer Compression: Reducing Redundancy</h4>
                <p>Before storing information, Engram "normalizes" tokens:</p>
                <ul>
                    <li>"Apple", "apple", "APPLE" → all treated as the same concept</li>
                    <li>This reduces the effective vocabulary by ~23%</li>
                    <li>Less storage, faster lookups</li>
                </ul>
                <br />

                <h4>B. Multi-Head Hashing: Collision-Free Storage</h4>
                <p>
                    Storing every possible word combination would require infinite memory. Engram uses multiple hash functions (like having several phone books):
                </p>
                <ul>
                    <li>If one hash gives the wrong result, others provide the correct one</li>
                    <li>Minimizes "collisions" where different patterns map to the same location</li>
                    <li>Enables massive memory tables stored efficiently in system RAM (DRAM) instead of expensive GPU memory</li>
                </ul>
                <br />

                <h4>C. Context-Aware Gating: Smart Retrieval</h4>
                <p>Not all retrieved memories are relevant. Engram includes a gating mechanism:</p>
                <ul>
                    <li>Evaluates: "Does this retrieved pattern fit the current context?"</li>
                    <li>If yes → use it</li>
                    <li>If no → ignore it</li>
                    <li>This prevents noise and ensures only helpful information is used</li>
                </ul>
                <br />

                <h3>3. Integration with the Transformer</h3>
                <p>Engram doesn't replace the Transformer – it <strong>augments</strong> it:</p>
                <ul>
                    <li>Injected early in the model's layers</li>
                    <li>Offloads static pattern reconstruction before the model wastes compute</li>
                    <li>Retrieved memory is lightly processed and added back into the model's state</li>
                    <li>The rest of the network focuses on complex reasoning</li>
                </ul>
                <br />

                <h2>The U-Shaped Scaling Law</h2>
                <p>
                    The researchers discovered something fascinating: <strong>the optimal balance between MoE (computation) and Engram (memory) follows a U-shaped curve</strong>.
                </p>
                <div style={{ background: '#1a1a1a', padding: '1.5rem', borderRadius: '8px', margin: '1.5rem 0', borderLeft: '4px solid var(--primary)' }}>
                    <strong>Key Finding:</strong><br />
                    Allocating <strong>20-25% of sparse parameters to Engram</strong> + the rest to MoE = <strong>optimal performance</strong>
                </div>
                <ul>
                    <li>Too little memory → model wastes compute on static patterns</li>
                    <li>Too much memory → not enough compute for reasoning</li>
                    <li>Just right → best of both worlds</li>
                </ul>
                <p>This is called the <strong>Sparsity Allocation Problem</strong>, and it's now solved.</p>
                <div style={{ margin: '2rem 0', textAlign: 'center' }}>
                    <img src="/engram-u-shaped.png" alt="U-Shaped Scaling Law for Engram" style={{ width: '100%', maxWidth: '700px', borderRadius: '8px', border: '1px solid var(--border)' }} />
                </div>
                <br />

                <h2>Performance: The Numbers Don't Lie</h2>
                <p>
                    The researchers scaled Engram to <strong>27 billion parameters</strong> and compared it against pure MoE models with the same parameter count and computational budget (FLOPs).
                </p>
                <div style={{ margin: '2rem 0', textAlign: 'center' }}>
                    <img src="/engram-performance.png" alt="Engram Performance Gains Across Benchmarks" style={{ width: '100%', maxWidth: '700px', borderRadius: '8px', border: '1px solid var(--border)' }} />
                </div>
                <div style={{ background: '#1a1a1a', padding: '1.5rem', borderRadius: '8px', margin: '1.5rem 0' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr style={{ borderBottom: '2px solid var(--border)' }}>
                                <th style={{ textAlign: 'left', padding: '0.75rem', color: 'var(--primary)' }}>Benchmark</th>
                                <th style={{ textAlign: 'right', padding: '0.75rem', color: 'var(--primary)' }}>Improvement</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr style={{ borderBottom: '1px solid var(--border)' }}>
                                <td style={{ padding: '0.75rem' }}><strong>MMLU</strong> (knowledge)</td>
                                <td style={{ textAlign: 'right', padding: '0.75rem', color: '#4ade80' }}>+3.4 points</td>
                            </tr>
                            <tr style={{ borderBottom: '1px solid var(--border)' }}>
                                <td style={{ padding: '0.75rem' }}><strong>CMMLU</strong> (Chinese knowledge)</td>
                                <td style={{ textAlign: 'right', padding: '0.75rem', color: '#4ade80' }}>+4.0 points</td>
                            </tr>
                            <tr style={{ borderBottom: '1px solid var(--border)' }}>
                                <td style={{ padding: '0.75rem' }}><strong>BBH</strong> (reasoning)</td>
                                <td style={{ textAlign: 'right', padding: '0.75rem', color: '#4ade80' }}>+5.0 points</td>
                            </tr>
                            <tr style={{ borderBottom: '1px solid var(--border)' }}>
                                <td style={{ padding: '0.75rem' }}><strong>ARC-Challenge</strong> (reasoning)</td>
                                <td style={{ textAlign: 'right', padding: '0.75rem', color: '#4ade80' }}>+3.7 points</td>
                            </tr>
                            <tr style={{ borderBottom: '1px solid var(--border)' }}>
                                <td style={{ padding: '0.75rem' }}><strong>HumanEval</strong> (coding)</td>
                                <td style={{ textAlign: 'right', padding: '0.75rem', color: '#4ade80' }}>+3.0 points</td>
                            </tr>
                            <tr style={{ borderBottom: '1px solid var(--border)' }}>
                                <td style={{ padding: '0.75rem' }}><strong>MATH</strong> (mathematics)</td>
                                <td style={{ textAlign: 'right', padding: '0.75rem', color: '#4ade80' }}>+2.4 points</td>
                            </tr>
                            <tr>
                                <td style={{ padding: '0.75rem' }}><strong>Multi-Query NIAH</strong> (long-context)</td>
                                <td style={{ textAlign: 'right', padding: '0.75rem', color: '#4ade80' }}>84.2 → 97.0</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div style={{ background: '#1a1a1a', padding: '1rem', borderRadius: '4px', margin: '1.5rem 0', fontFamily: 'monospace', borderLeft: '3px solid #fbbf24' }}>
                    <strong>Surprising Discovery:</strong> While Engram was expected to help with knowledge retrieval (MMLU, CMMLU), it showed <strong>even larger gains in reasoning, coding, and math</strong> – tasks that require complex thinking, not just memorization.
                </div>
                <br />

                <h2>Why Does Engram Boost Reasoning?</h2>
                <p>The researchers conducted "mechanistic analyses" to understand why Engram improves reasoning:</p>
                <h3>1. Deepening the Network</h3>
                <ul>
                    <li>By handling static patterns early, Engram frees up the model's later layers</li>
                    <li>These layers can now focus entirely on complex, multi-step reasoning</li>
                    <li><strong>Effect:</strong> The network becomes "effectively deeper" for reasoning tasks</li>
                </ul>
                <br />

                <h3>2. Freeing Attention for Global Context</h3>
                <ul>
                    <li>Attention mechanisms no longer waste capacity on local, repetitive patterns</li>
                    <li>They can focus on understanding global context and long-range dependencies</li>
                    <li><strong>Effect:</strong> Massive boost in long-context retrieval (84.2 → 97.0 on NIAH benchmark)</li>
                </ul>
                <div style={{ background: '#1a1a1a', padding: '1rem', borderRadius: '4px', margin: '1.5rem 0', fontFamily: 'monospace' }}>
                    <strong>Analogy:</strong> It's like a CEO who stops micromanaging daily tasks (delegated to assistants) and can now focus on strategic, high-level decisions.
                </div>
                <br />

                <h2>Infrastructure Efficiency: The Hidden Superpower</h2>
                <h3>Deterministic Addressing = Runtime Prefetching</h3>
                <ul>
                    <li>Engram's lookups are deterministic (predictable)</li>
                    <li>The system can <strong>prefetch data from host memory (DRAM)</strong> before it's needed</li>
                    <li>This happens in the background with <strong>negligible overhead</strong></li>
                </ul>
                <div style={{ background: '#1a1a1a', padding: '1.5rem', borderRadius: '8px', margin: '1.5rem 0', borderLeft: '4px solid var(--primary)' }}>
                    <strong>What This Means:</strong><br />
                    • You can store <strong>massive memory tables</strong> in cheap system RAM<br />
                    • Not limited by expensive GPU memory (HBM)<br />
                    • <strong>Decouples compute power from memory capacity</strong><br />
                    • Scale memory almost infinitely without buying more GPUs
                </div>
                <p><strong>Real-World Impact:</strong> This makes Engram incredibly cost-effective for deployment at scale.</p>
                <br />

                <h2>The Future: Conditional Memory as a Modeling Primitive</h2>
                <p>The researchers envision <strong>conditional memory as an indispensable component</strong> for next-generation AI models.</p>
                <p>Just as:</p>
                <ul>
                    <li>Attention mechanisms became standard in 2017 (Transformers)</li>
                    <li>Mixture-of-Experts became standard for scaling (GPT-4, Gemini)</li>
                </ul>
                <p><strong>Engram-style conditional memory could become the third pillar</strong> of modern LLM architecture.</p>
                <br />

                <h3>Potential Applications:</h3>
                <ul>
                    <li><strong>Retrieval-Augmented Generation (RAG):</strong> Built-in, no external database needed</li>
                    <li><strong>Domain-Specific Models:</strong> Pre-load specialized knowledge (medical, legal, scientific)</li>
                    <li><strong>Personalized AI:</strong> Store user-specific patterns and preferences</li>
                    <li><strong>Multimodal Models:</strong> Efficient storage of visual patterns, audio signatures, etc.</li>
                </ul>
                <br />

                <h2>Code and Reproducibility</h2>
                <p>The best part? <strong>The code is open-source!</strong></p>
                <div style={{ background: '#1a1a1a', padding: '1.5rem', borderRadius: '8px', margin: '1.5rem 0' }}>
                    <p style={{ marginBottom: '0.5rem' }}>🔗 <strong>GitHub Repository:</strong></p>
                    <a href="https://github.com/deepseek-ai/Engram" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary)', textDecoration: 'underline' }}>
                        github.com/deepseek-ai/Engram
                    </a>
                </div>
                <p>The research community can now:</p>
                <ul>
                    <li>Experiment with Engram</li>
                    <li>Integrate it into existing models</li>
                    <li>Extend the concept to new domains</li>
                </ul>
                <br />

                <h2>Key Takeaways</h2>
                <ol>
                    <li><strong>What:</strong> Engram is a conditional memory module that enables O(1) knowledge lookup in LLMs</li>
                    <li><strong>Why:</strong> Current Transformers waste compute recomputing static patterns; Engram separates memory from reasoning</li>
                    <li><strong>How:</strong> Uses modernized N-grams with tokenizer compression, multi-head hashing, and context-aware gating</li>
                    <li><strong>Impact:</strong> Significant gains in knowledge (+3-4 points), reasoning (+5 points), and long-context handling (84→97)</li>
                    <li><strong>Efficiency:</strong> Deterministic addressing enables prefetching from cheap DRAM, not expensive GPU memory</li>
                    <li><strong>Future:</strong> Conditional memory is poised to become a standard primitive in next-gen AI architectures</li>
                </ol>
                <br />

                <h2>Conclusion: A New Era of Efficient AI</h2>
                <p>
                    The Engram paper represents a fundamental shift in how we think about LLM architecture. By introducing <strong>conditional memory</strong> as a complement to <strong>conditional computation</strong>, DeepSeek has opened a new dimension for scaling AI models efficiently.
                </p>
                <div style={{ background: '#1a1a1a', padding: '1.5rem', borderRadius: '8px', margin: '1.5rem 0', borderLeft: '4px solid var(--primary)', fontSize: '1.1rem' }}>
                    The message is clear: <strong>The future of AI isn't just about bigger models – it's about smarter architectures that know when to remember and when to reason.</strong>
                </div>
                <p>
                    As we move toward increasingly capable AI systems, innovations like Engram will be crucial for making them not just more powerful, but also more efficient, cost-effective, and accessible.
                </p>
                <p style={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'var(--primary)', marginTop: '2rem' }}>
                    The age of conditional memory has begun.
                </p>
                <br />

                <h2>References</h2>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                    <li style={{ marginBottom: '0.5rem' }}>
                        <strong>Paper:</strong> "Conditional Memory via Scalable Lookup: A New Axis of Sparsity for Large Language Models"
                    </li>
                    <li style={{ marginBottom: '0.5rem' }}>
                        <strong>arXiv:</strong> <a href="https://arxiv.org/abs/2601.07372" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary)', textDecoration: 'underline' }}>arxiv.org/abs/2601.07372</a>
                    </li>
                    <li style={{ marginBottom: '0.5rem' }}>
                        <strong>Authors:</strong> DeepSeek AI & Peking University
                    </li>
                    <li style={{ marginBottom: '0.5rem' }}>
                        <strong>Published:</strong> January 12, 2026
                    </li>
                    <li>
                        <strong>Code:</strong> <a href="https://github.com/deepseek-ai/Engram" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary)', textDecoration: 'underline' }}>github.com/deepseek-ai/Engram</a>
                    </li>
                </ul>
            </>
        )
    },
    {
        slug: "dilated-conv-block",
        title: "DilatedConvBlock: When Convolutions Learn to Breathe",
        date: "Jan 2026",
        excerpt: "Exploring the mechanics of dilated convolutions and their impact on receptive fields in deep learning models.",
        content: (
            <>
                <p>
                    Convolutional Neural Networks (CNNs) have been the backbone of Computer Vision for over a decade. However, standard convolutions struggle with one major limitation: <strong>Receptive Field</strong>.
                </p>
                <br />
                <h3>The Receptive Field Problem</h3>
                <p>
                    To increase the receptive field in a standard CNN, you typically need to:
                </p>
                <ul>
                    <li>Increase the kernel size (Computationally expensive)</li>
                    <li>Add pooling layers (Loss of spatial resolution)</li>
                    <li>Stack more layers (Vanishing gradient issues)</li>
                </ul>
                <br />
                <h3>Enter Dilated Convolutions</h3>
                <p>
                    Dilated convolutions (or atrous convolutions) introduce a "dilation rate" parameter to the kernel. This effectively expands the kernel by inserting holes (zeros) between the weights.
                </p>
                <div style={{ background: '#1a1a1a', padding: '1rem', borderRadius: '4px', margin: '1.5rem 0', fontFamily: 'monospace', borderLeft: '3px solid var(--primary)' }}>
                    Key Benefit: Exponential expansion of the receptive field without loss of resolution or coverage.
                </div>
                <p>
                    This technique is pivotal in semantic segmentation tasks (like DeepLab) and audio generation (WaveNet), where context is king.
                </p>
            </>
        )
    }
];
