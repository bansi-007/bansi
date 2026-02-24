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
        slug: "andromeda",
        title: "That Smudge in the Sky is a Trillion Stars. And It's Heading Here.",
        date: "Feb 2026",
        excerpt: "There's a faint fuzzy patch in the night sky that's easy to miss. It looks like a wispy cloud. It isn't. It's a galaxy two and a half million light-years away — and it's falling toward us.",
        content: (
            <>
                <p>
                    There's this thing you can do on a really clear night, away from city lights. Find the constellation Andromeda, look at a specific spot, and you'll notice a faint fuzzy patch. Easy to miss. Looks like a wispy cloud, or your eyes playing tricks.
                </p>
                <p>It's not a cloud.</p>
                <p>
                    That smudge is an entire galaxy. Two and a half million light-years away. A trillion stars. The light hitting your eyes right now left that place before humans even existed. Before language, before fire, those tiny packets of light were already crossing the void toward you.
                </p>

                <h2>How small are we, really?</h2>
                <p>
                    If you shrunk the Sun down to the size of a basketball, Earth would be a sesame seed orbiting 26 metres away. The next nearest star? Same basketball — but sitting in a different city, about 7,000 kilometres away. That's just to our closest neighbor.
                </p>
                <p>
                    In 1990, as Voyager 1 was leaving our solar system, Carl Sagan convinced NASA to turn the spacecraft's camera around for one last photo. From 6 billion kilometres away, Earth showed up as less than a single pixel — a pale blue dot in a beam of scattered sunlight.
                </p>
                <figure style={{ margin: '2rem 0', textAlign: 'center' }}>
                    <img
                        src="https://upload.wikimedia.org/wikipedia/commons/7/71/PaleBlueDot.jpg"
                        alt="The Pale Blue Dot — Earth photographed by Voyager 1 from 6 billion kilometres away, 1990"
                        style={{ width: '100%', maxWidth: '600px', borderRadius: '8px', border: '1px solid var(--border)' }}
                    />
                    <figcaption style={{ marginTop: '0.75rem', fontSize: '0.85rem', color: 'var(--muted)' }}>
                        Earth from 6 billion kilometres away. Voyager 1, 1990. "That's here. That's home. That's us." — Carl Sagan. Credit: NASA/JPL-Caltech
                    </figcaption>
                </figure>
                <p>
                    Our Sun is one of 300 billion stars in the Milky Way. The Milky Way is one of over two trillion galaxies we can observe. Most of those galaxies have hundreds of billions of stars. Most of those stars, we now know, have planets going around them.
                </p>
                <p>
                    The numbers stop meaning anything at some point. Our brains just aren't built for that scale. So instead of trying to hold it all — look at that smudge.
                </p>

                <h2>What Andromeda actually is</h2>
                <p>
                    Andromeda is our nearest large galactic neighbor. It's a spiral galaxy, same as the Milky Way — a flat spinning disc of stars with a massive black hole at the center and arms curling outward. It has about a trillion stars. We have around 300 billion. Andromeda is bigger.
                </p>
                <p>
                    If it were bright enough to see properly, Andromeda would appear six times wider in the sky than the full Moon. It only looks faint because its light is spread across that enormous area. Hubble spent years photographing it piece by piece and stitching the images together:
                </p>
                <figure style={{ margin: '2rem 0', textAlign: 'center' }}>
                    <img
                        src="https://esahubble.org/static/archives/images/screen/heic1502a.jpg"
                        alt="Hubble mosaic of the Andromeda Galaxy (M31), released January 2015"
                        style={{ width: '100%', maxWidth: '800px', borderRadius: '8px', border: '1px solid var(--border)' }}
                    />
                    <figcaption style={{ marginTop: '0.75rem', fontSize: '0.85rem', color: 'var(--muted)' }}>
                        1.5 billion pixels. Over 100 million individual stars visible. And this is only a section of it. Credit: NASA/ESA, J. Dalcanton, B.F. Williams, L.C. Johnson (University of Washington)
                    </figcaption>
                </figure>
                <p>
                    Every dot of light in that image is a star. Most of them are suns. Many probably have planets. We just can't see them from here.
                </p>

                <h2>It's coming toward us</h2>
                <p>
                    Most galaxies are moving away from us as the universe expands. Andromeda isn't. It's close enough that gravity wins over expansion, and it's falling toward us at about 110 kilometres every second.
                </p>
                <p>
                    We know this because of the Doppler effect — the same reason a car horn sounds higher as it drives toward you. Light does the same thing. When a light source moves toward you, the wavelengths get slightly compressed. Andromeda's light is blue-shifted. It's heading our way.
                </p>
                <p>
                    In about 4.5 billion years, the two galaxies will collide. Scientists have simulated what it'll look like:
                </p>
                <figure style={{ margin: '2rem 0', textAlign: 'center' }}>
                    <iframe
                        width="800"
                        height="450"
                        loading="lazy"
                        allow="autoplay; fullscreen; picture-in-picture; clipboard-write; web-share"
                        allowFullScreen
                        src="https://commons.wikimedia.org/wiki/File:Andromeda_and_Milky_Way_collision.ogv?embedplayer=true"
                        style={{ width: '100%', maxWidth: '800px', borderRadius: '8px', border: '1px solid var(--border)' }}
                    />
                    <figcaption style={{ marginTop: '0.75rem', fontSize: '0.85rem', color: 'var(--muted)' }}>
                        Simulation of the Milky Way–Andromeda merger over the next ~4 billion years.<br />
                        Visualization: NASA, ESA, F. Summers (STScI) · Simulation: NASA, ESA, G. Besla (Columbia University), R. van der Marel (STScI) · Public domain, via Wikimedia Commons
                    </figcaption>
                </figure>
                <p>
                    The word "collision" makes it sound catastrophic, but it won't be — at least not for individual stars. Galaxies are mostly empty space. The distances between stars are so vast that when two galaxies merge, their stars almost never actually hit each other. They pass through like two swarms of fireflies overlapping in the dark. Gravity twists both into strange new shapes, some stars get flung far out, clouds of gas get squeezed and collapse into new stars — it's more like a slow dance than a crash.
                </p>
                <p>
                    The merged galaxy has been nicknamed Milkomeda. It'll be a smooth oval cloud of ancient stars — no more graceful spiral arms on either side.
                </p>

                <h2>Can we ever actually go there?</h2>
                <p>
                    No. Not with anything we have, and not within any timeframe that means something to us.
                </p>
                <p>
                    Andromeda is 2.5 million light-years away. Our fastest spacecraft — Voyager 1 — moves at about 17 km/s. At that speed, it would take roughly 45 billion years to reach Andromeda. The universe is only 13.8 billion years old. We'd need more than three times the age of everything that exists.
                </p>
                <p>
                    Even traveling at the speed of light — the absolute maximum allowed by physics, which no object with mass can actually reach — the trip one way takes 2.5 million years.
                </p>
                <p>
                    Maybe with physics we haven't discovered. Some way to fold space itself, to skip across the fabric of it rather than crawl along the surface. But that's an honest maybe — not something we know how to do.
                </p>

                <h2>The company we might have</h2>
                <p>
                    There are roughly 100 billion planets in the Milky Way alone. Andromeda has even more. And there are two trillion galaxies out there.
                </p>
                <p>
                    If just one in a million of those planets developed life — and we have no idea if that's too generous or too conservative — that's still a number so large it doesn't fit in language. Countless worlds, alive, right now. Some of them probably looking out at their own night sky. Maybe seeing a faint smudge that's us, and wondering the same things.
                </p>
                <p>
                    We are on a rock, orbiting one average star, in one average galaxy, among two trillion. And on a clear night, with your bare eyes, you can look out and see one of those two trillion. A two-and-a-half-million-year-old trail of light from a trillion suns.
                </p>
                <p>Go find it.</p>

                <p style={{ fontSize: '0.9rem', color: 'var(--muted)', borderTop: '1px solid var(--border)', paddingTop: '1.5rem', marginTop: '2rem' }}>
                    <em>How to find Andromeda: on a moonless night away from city lights, find the Great Square of Pegasus, trace two stars over into the Andromeda constellation, and look for a faint elongated smudge. Give your eyes at least 20 minutes to adjust to the dark. Worth it.</em>
                </p>
            </>
        )
    }
];
