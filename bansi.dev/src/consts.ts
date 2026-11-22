export const SITE = {
  title: 'Bansi Dath Maddali',
  domain: 'bansi.dev',
  description:
    'Notes on computer vision, MLOps, and applied GenAI — written by someone who ships models into production.',
  author: 'Bansi Dath Maddali',
  email: 'bansi.d.maddali@gmail.com',
} as const;

/** Homepage hero. */
export const INTRO = {
  headline: 'Notes on machine learning that runs in production.',
  body: 'Deep learning, computer vision, MLOps, and the occasional detour into GenAI. Mostly things I had to figure out the hard way, written down so you don’t have to figure them out.',
} as const;

export const NAV = [
  { href: '/', label: 'Writing' },
  { href: '/about', label: 'About' },
] as const;

export const SOCIALS = [
  { href: 'https://www.linkedin.com/in/iambansi', label: 'LinkedIn' },
  { href: 'https://www.instagram.com/bansiinthewild/', label: 'Instagram' },
] as const;

/**
 * Career as floors of a building, newest (top floor) first. Each role moved one
 * level up in scope. `end: null` means present. Wording condensed from LinkedIn.
 */
export const EXPERIENCE = [
  {
    scope: 'strategy',
    role: 'Staff AI Engineer',
    org: 'Micron Technology',
    logo: '/images/logos/micron.svg',
    location: 'Hyderabad, India',
    start: '2026-09',
    end: null,
    note: 'AI strategy and architecture for platforms, MLOps, LLMOps and agentic AI across manufacturing and enterprise workflows.',
  },
  {
    scope: 'integration',
    role: 'Staff Machine Learning Engineer',
    org: 'Micron Technology',
    logo: '/images/logos/micron.svg',
    location: 'Hyderabad, India',
    start: '2025-11',
    end: '2026-09',
    note: 'End-to-end ML system design, so the work of architects, data engineers, data scientists and platform teams fits together at scale.',
  },
  {
    scope: 'platform',
    role: 'Machine Learning Engineer III',
    org: 'Micron Technology',
    logo: '/images/logos/micron.svg',
    location: 'Hyderabad, India',
    start: '2022-11',
    end: '2025-10',
    note: 'MLOps pipelines on Google Cloud, research models turned into real-time edge inference, and computer vision and video analytics in production.',
  },
  {
    scope: 'system',
    role: 'Edge AI Developer',
    org: 'Tata Consultancy Services',
    logo: '/images/logos/tcs.svg',
    location: 'Hyderabad, India',
    start: '2021-04',
    end: '2022-11',
    note: 'IIoT edge inference for a chemical plant streaming gigabytes every hour, migrated to Azure without breaking its SLAs. Led a team of 8 at the Innovation Garage.',
  },
  {
    scope: 'service',
    role: 'Machine Learning Developer',
    org: 'Tata Consultancy Services',
    logo: '/images/logos/tcs.svg',
    location: 'Chennai, India',
    start: '2018-06',
    end: '2021-04',
    note: 'Models packaged as Docker images and served as REST APIs, with PySpark over large Hive datasets.',
  },
  {
    scope: 'device',
    role: 'Research and Development Intern',
    org: 'Innogeecks Technologies',
    logo: null,
    location: 'Krishna, India',
    start: '2017-12',
    end: '2018-03',
    note: 'A face recognition device on a Raspberry Pi, with OpenCV in Python.',
  },
] as const;

/** The ground floor. */
export const EDUCATION = [
  {
    scope: 'foundation',
    role: 'B.Tech, Information Technology',
    org: 'VR Siddhartha Engineering College',
    logo: null,
    location: 'Vijayawada, India',
    start: '2014',
    end: '2018',
    note: 'Favourite subjects: Physics, Complex Analysis and Numerical Methods, Automata Theory, and Machine Learning.',
  },
] as const;

/** What I work on now, as short cards. */
export const FOCUS = [
  { title: 'AI platforms', body: 'Shared foundations that let many teams ship models without rebuilding the plumbing each time.' },
  { title: 'MLOps and LLMOps', body: 'Pipelines, model governance, observability and the operational reliability that production AI needs.' },
  { title: 'Agentic AI', body: 'Agents that do real work inside enterprise systems, built with the same engineering rigour as any service.' },
  { title: 'Vision in manufacturing', body: 'Computer vision and video analytics that run on factory floors, where latency and uptime requirements are strict.' },
] as const;

/** Career start, for the build-time "years in production ML" figure. */
export const CAREER_START = '2018-06';

/** Legacy Medium archive — not actively writing there anymore. */
export const MEDIUM_URL = 'https://medium.com/@bansimaddali';

/** Articles from the Medium archive, newest first. */
export const MEDIUM_ARCHIVE = [
  {
    title: 'The Typing Got Cheap. The Knowing Didn’t.',
    date: '2026-06-15',
    href: 'https://medium.com/@bansimaddali/the-typing-got-cheap-the-knowing-didnt-b8143e62516b',
  },
  {
    title: 'Masked Auto Encoders: When a Model Learns to See by Looking Away',
    date: '2026-06-04',
    href: 'https://medium.com/@bansimaddali/masked-auto-encoders-when-a-model-learns-to-see-by-looking-away-eaea5cd98511',
  },
  {
    title: 'DataTrove: The Factory Floor Behind Every Good LLM',
    date: '2026-03-09',
    href: 'https://medium.com/@bansimaddali/datatrove-the-factory-floor-behind-every-good-llm-7063117edc37',
  },
  {
    title: 'DilatedConvBlock: When Convolutions Learn to Breathe',
    date: '2026-01-15',
    href: 'https://medium.com/@bansimaddali/dilatedconvblock-when-convolutions-learn-to-breathe-b60dc6aad2c3',
  },
  {
    title: 'From Basics to Breakthroughs: The Complete Guide to GhostConvBlock in Deep Learning',
    date: '2025-06-29',
    href: 'https://medium.com/@bansimaddali/from-basics-to-breakthroughs-the-complete-guide-to-ghostconvblock-in-deep-learning-ba77ad239130',
  },
  {
    title: 'How “Attention Is All You Need” Revolutionised AI (And Changed Everything)',
    date: '2025-06-27',
    href: 'https://medium.com/@bansimaddali/how-attention-is-all-you-need-revolutionised-ai-and-changed-everything-648aa60505b8',
  },
  {
    title: 'The Future of LLM Security, Encryption & Privacy: Breakthroughs and Challenges in 2025',
    date: '2025-06-06',
    href: 'https://medium.com/@bansimaddali/the-future-of-llm-security-encryption-privacy-breakthroughs-and-challenges-in-2025-d1302f2b67f2',
  },
  {
    title: 'Understanding MB Conv Block: The Building Block Behind Efficient Deep Learning',
    date: '2025-05-20',
    href: 'https://medium.com/@bansimaddali/understanding-mb-conv-block-the-building-block-behind-efficient-deep-learning-f1f8e1afe97f',
  },
  {
    title: 'Learning Google ML Engineering and Clearing the Certification',
    date: '2023-02-12',
    href: 'https://medium.com/@bansimaddali/learning-google-ml-engineering-and-clearing-the-certification-3783fac82d72',
  },
  {
    title: 'Understanding VQ-VAE — Noob Level',
    date: '2023-02-12',
    href: 'https://medium.com/@bansimaddali/understanding-vq-vae-noob-level-155fddec48fa',
  },
] as const;

/** Skills, as grouped on the resume. */
export const STACK = [
  {
    group: 'ML / Deep Learning',
    items: 'PyTorch · TensorFlow/Keras · YOLO · ResNeSt · EfficientNet · Scikit-learn · OpenCV · ONNX · Anomaly Detection · Image Classification · Object Detection · Model Compression',
  },
  {
    group: 'MLOps / Cloud',
    items: 'GCP (Vertex AI, GKE, Dataflow, BigQuery, Cloud Storage, Cloud Run) · Azure (ML, Stream Analytics, Cosmos DB, DevOps) · Docker · CI/CD · Model Registry · Monitoring/Alerting',
  },
  {
    group: 'GenAI',
    items: 'LLM Integration · RAG Pipelines · Conversational AI · Prompt Engineering · Agentic Workflows · Document Intelligence',
  },
  {
    group: 'Languages / Tools',
    items: 'Python · SQL · Java · PySpark · Git · REST APIs · Flask · Spring Boot · Linux',
  },
] as const;

/** Certifications, from the resume. */
export const CERTS = [
  'Google Cloud Professional Machine Learning Engineer',
  'Microsoft Certified: Azure IoT Developer Specialty',
  'TensorFlow Developer Certificate (Google)',
  'Deep Learning Specialization (DeepLearning.AI)',
  'AI Engineering Professional Certificate (IBM)',
] as const;
