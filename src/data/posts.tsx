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
        slug: "how-small-we-are",
        title: "You Are Worried About Your Tuesday Meeting",
        date: "Mar 2026",
        excerpt: "Right now, somewhere 400 kilometres above your head, astronauts are watching sixteen sunrises a day. They sleep strapped to a wall. Meanwhile, you're stressed about a Tuesday meeting. Let's pull the camera back. Way, way back.",
        content: (
            <>
                <p>
                    Right now, somewhere above your head — about 400 kilometres above it, to be precise — astronauts are floating in a metal tube, watching sixteen sunrises a day. They brush their teeth with water that doesn't fall. They sleep strapped to a wall.
                </p>
                <p>Meanwhile, you're stressed about a Tuesday meeting.</p>
                <p>
                    I don't say that to be dismissive. The meeting matters. The deadline matters. The fight you had yesterday matters. I just want to spend a few minutes pulling the camera back. Way, way back.
                </p>

                <h2>Start with the basics</h2>
                <p>
                    Earth is a rock. A very nice rock — it has oceans and trees and coffee and people who invented jazz — but a rock. It's about 12,700 kilometres wide. The Sun, the thing that keeps all of us alive, is so large that you could fit 1.3 million Earths inside it.
                </p>
                <p>
                    And the Sun is not special. There are stars so large that if you swapped one in for our Sun, it would swallow Mercury, Venus, Earth, Mars, and extend past Jupiter. Our Sun is a small, quiet, unremarkable star in a pretty average part of its galaxy.
                </p>
                <figure style={{ margin: '2rem 0', textAlign: 'center' }}>
                    <img
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Star-sizes.jpg/1280px-Star-sizes.jpg"
                        alt="Star size comparison — from Earth to the largest known stars"
                        style={{ width: '100%', maxWidth: '700px', borderRadius: '8px', border: '1px solid var(--border)' }}
                    />
                    <figcaption style={{ marginTop: '0.75rem', fontSize: '0.85rem', color: 'var(--muted)' }}>
                        Left to right: Earth, the Sun, some bigger stars, and then stars so large the Sun becomes invisible. This chart goes on further than what fits here. Credit: Dave Jarvis, Wikimedia Commons (CC BY-SA 3.0)
                    </figcaption>
                </figure>

                <h2>The neighborhood</h2>
                <p>
                    Our solar system stretches about 100 astronomical units from the Sun. One astronomical unit is the distance from Earth to the Sun — about 150 million kilometres. Voyager 1, launched in 1977, has been flying at 17 kilometres <em>per second</em> since then. It's only just now leaving the solar system.
                </p>
                <p>
                    That's our neighborhood. After nearly fifty years of travel, at 17 kilometres per second, we've barely left the driveway.
                </p>
                <p>
                    In 1990, as Voyager 1 was heading out, Carl Sagan convinced NASA to turn its camera around for one last photograph. From 6 billion kilometres away, Earth shows up as a single pixel — barely that — a pale blue dot in a beam of scattered sunlight. Sagan wrote about that image, and there's one line that's never left me: <em>"That's here. That's home. That's us."</em>
                </p>
                <figure style={{ margin: '2rem 0', textAlign: 'center' }}>
                    <img
                        src="https://upload.wikimedia.org/wikipedia/commons/7/71/PaleBlueDot.jpg"
                        alt="The Pale Blue Dot — Earth photographed by Voyager 1 from 6 billion kilometres away, 1990"
                        style={{ width: '100%', maxWidth: '500px', borderRadius: '8px', border: '1px solid var(--border)' }}
                    />
                    <figcaption style={{ marginTop: '0.75rem', fontSize: '0.85rem', color: 'var(--muted)' }}>
                        Earth. From 6 billion kilometres away. The tiny speck in the beam of light. Every human who ever lived, every war ever fought, every love story ever written — on that dot. Credit: NASA/JPL-Caltech
                    </figcaption>
                </figure>

                <h2>The galaxy</h2>
                <p>
                    Our solar system is inside the Milky Way, which is about 100,000 light-years across. A light-year is how far light travels in a year. Light moves at 300,000 kilometres per second — in one second it goes around the Earth seven and a half times. At that speed, crossing just our galaxy takes a hundred thousand years.
                </p>
                <p>
                    We sit in a quiet suburb about 26,000 light-years from the center. We're not special in our placement either. Just somewhere in the middle, orbiting the galactic center once every 225 million years. The last time we were in this exact spot in our orbit, dinosaurs were just getting started.
                </p>
                <figure style={{ margin: '2rem 0', textAlign: 'center' }}>
                    <img
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/ESO-VLT-Laser-phot-0a-99.jpg/1280px-ESO-VLT-Laser-phot-0a-99.jpg"
                        alt="The Milky Way as seen from the ESO Very Large Telescope site in Chile"
                        style={{ width: '100%', maxWidth: '760px', borderRadius: '8px', border: '1px solid var(--border)' }}
                    />
                    <figcaption style={{ marginTop: '0.75rem', fontSize: '0.85rem', color: 'var(--muted)' }}>
                        The Milky Way from the ESO telescope site in Chile. Every single dot is a star. We are somewhere inside this. Credit: ESO/Y. Beletsky (CC BY 4.0)
                    </figcaption>
                </figure>

                <h2>Beyond the Milky Way</h2>
                <p>
                    The Milky Way has somewhere between 100 and 400 billion stars. The observable universe — the part we can see with our best telescopes — contains roughly two trillion galaxies. Each one with hundreds of billions of stars.
                </p>
                <p>
                    In 1995, astronomers pointed the Hubble telescope at a completely dark patch of sky — a region so empty it looked like nothing. They left the shutter open for ten days. Here is what came back:
                </p>
                <figure style={{ margin: '2rem 0', textAlign: 'center' }}>
                    <img
                        src="https://upload.wikimedia.org/wikipedia/commons/6/69/NASA-HS201427a-HubbleUltraDeepField2014-20140603.jpg"
                        alt="Hubble Ultra Deep Field — nearly 10,000 galaxies visible in a tiny patch of sky"
                        style={{ width: '100%', maxWidth: '760px', borderRadius: '8px', border: '1px solid var(--border)' }}
                    />
                    <figcaption style={{ marginTop: '0.75rem', fontSize: '0.85rem', color: 'var(--muted)' }}>
                        Hubble Ultra Deep Field, 2014. Nearly 10,000 galaxies in one photograph. Each galaxy has billions of stars. This was a tiny patch of sky that looked completely empty. Credit: NASA, ESA, H. Teplitz and M. Rafelski (IPAC/Caltech), A. Koekemoer (STScI), R. Windhorst (ASU), Z. Levay (STScI)
                    </figcaption>
                </figure>
                <p>
                    Almost every dot in that image is a galaxy. Not a star — a galaxy. Billions of suns, each. And this is from a patch of sky so small you'd need to hold a grain of sand at arm's length to cover it.
                </p>
                <p>
                    The numbers stop meaning anything at some point. Our brains aren't built for this scale. Two trillion galaxies, each with hundreds of billions of stars, many with planets — we don't even have a word for what that adds up to.
                </p>

                <h2>The part that gets me</h2>
                <p>
                    Some of the stars you can see tonight with your bare eyes are already dead. They burned out thousands of years ago. You're looking at ghosts — light that left those stars before cities existed, arriving right now, into your eye, as you stand outside.
                </p>
                <p>
                    The light from the Andromeda galaxy, our nearest large neighbor, left before humans existed. When those photons began their journey, there were no cities, no agriculture, no language. Our ancestors were figuring out fire. And that light, two and a half million years in transit, lands in your eye on a clear night.
                </p>
                <p>
                    Every time you look at the night sky you are looking back in time.
                </p>

                <h2>So what does any of this mean for your Tuesday?</h2>
                <p>
                    Here's the thing — I don't think the point is that nothing matters because we're small. That's the lazy conclusion. The universe is indifferent to your Tuesday meeting, yes. But it's also indifferent to everything else. Entire galaxies colliding. Stars exploding. None of it means anything at a cosmic level.
                </p>
                <p>
                    What's strange and worth holding onto is this: on this one tiny rock, in this unremarkable corner of one of two trillion galaxies, some matter arranged itself into forms that became curious about all of it. We built telescopes. We figured out the math. We pointed a camera at empty sky for ten days just to see what was there.
                </p>
                <p>
                    You are made of atoms forged in stars that died before the Earth existed. The iron in your blood was made in a supernova. You are, quite literally, star stuff that learned to worry about presentations.
                </p>
                <p>Maybe carry that with you into the meeting.</p>

                <p style={{ fontSize: '0.9rem', color: 'var(--muted)', paddingTop: '1.5rem', marginTop: '2rem' }}>
                    <em>If you want your sense of scale completely destroyed in a good way — look up "Hubble Ultra Deep Field" and spend five minutes with it. Also worth reading: Carl Sagan's Pale Blue Dot, specifically the chapter about the photograph above. It's short. It'll stay with you.</em>
                </p>
            </>
        )
    },
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
