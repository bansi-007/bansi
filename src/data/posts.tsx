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
        slug: "where-did-all-this-come-from",
        title: "Where Did All This Come From?",
        date: "Jun 2026",
        excerpt: "A bedtime question with a real answer. The hand you're reading with. The Moon. The dog. The Sun. All of it used to fit in a space smaller than a marble. Here's how that turned into everything — told slowly enough that a curious kid can follow.",
        content: (
            <>
                <p>
                    Hold up your hand. Look at it. It's made of stuff. The table is made of stuff. The window, the dog, the Moon, the Sun, every star in every galaxy — all of it, stuff. The universe is just stuff, arranged in interesting ways.
                </p>
                <p>
                    Here's a question that sounds like a kid's question, because it is one. Where did all this stuff come from?
                </p>
                <p>
                    I don't mean your hand specifically. I mean originally. The atoms in your hand are very, very old. Older than the dinosaurs. Older than the Earth. Where were they before they were you?
                </p>
                <p>
                    Here's the wild answer. About <strong>13.8 billion years ago</strong>, everything in the universe — every atom that would one day become a star, a moon, a fish, a flower, your eyelashes — all of it fit into a space smaller than a marble. Smaller than a grain of sand, actually. And it was very, very hot. Hotter than anything you've ever heard of.
                </p>
                <p>
                    Then it started getting bigger. It's still getting bigger. That's basically the whole story. But the details are amazing.
                </p>

                <figure style={{ margin: '2rem 0', textAlign: 'center' }}>
                    <img
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/History-of-the-Universe.jpg/1280px-History-of-the-Universe.jpg"
                        alt="NASA timeline of the universe — from inflation right after the Big Bang, through the formation of the cosmic microwave background, the first stars, and galaxies, to today"
                        style={{ width: '100%', maxWidth: '820px', borderRadius: '10px', border: '1px solid var(--border)' }}
                    />
                    <figcaption style={{ marginTop: '0.75rem', fontSize: '0.85rem', color: 'var(--muted)' }}>
                        13.8 billion years on one chart. Big Bang on the left, today on the right. Credit: NASA / WMAP Science Team (CC BY 4.0)
                    </figcaption>
                </figure>

                <h2>The first second</h2>
                <p>
                    In the first <em>second</em> after the universe started growing, more happened than in the next billion years combined.
                </p>
                <p>
                    In the first tiny fraction of a second, the universe doubled in size. Then doubled again. Then doubled again. Many, many times. Space itself was stretching — not the stuff inside it racing through space, but the space itself getting bigger, the way a balloon's surface stretches when you blow it up. We call that part inflation.
                </p>
                <p>
                    By the time one second had passed, the universe was already huge, but absolutely packed with the building blocks of matter — quarks and electrons and tiny packets of light called photons. No atoms yet. It was too hot for atoms. Atoms are delicate. They don't survive in furnaces.
                </p>
                <p>
                    To give you a sense: today, the inside of the Sun is about 15 million degrees. One second after the Big Bang, the entire universe was about <strong>10 billion degrees</strong>. Everywhere. All at once. The whole sky was a furnace.
                </p>

                <h2>The fog</h2>
                <p>
                    For the next <strong>380,000 years</strong>, the universe was a fog. Light couldn't travel. There were too many loose electrons bouncing around, and they kept bumping into photons and scattering them. Imagine a room so full of bouncing ping-pong balls you can't shine a flashlight through it. That was the universe.
                </p>
                <p>
                    Then, finally, things cooled down enough — to a few thousand degrees — that the electrons calmed down and started orbiting around protons, making the first hydrogen atoms. The fog cleared. Light could finally fly free.
                </p>
                <p>
                    That moment — when the universe first became see-through — is the oldest thing anybody can ever see. We see it as a faint glow coming from every direction, called the <em>Cosmic Microwave Background</em>. In the 2010s, a satellite called Planck spent years carefully measuring it. Here's the result:
                </p>

                <figure style={{ margin: '2rem 0', textAlign: 'center' }}>
                    <img
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/Cosmic_Microwave_Background_%28CMB%29.jpeg/1280px-Cosmic_Microwave_Background_%28CMB%29.jpeg"
                        alt="The Cosmic Microwave Background — a temperature map of the entire sky, showing tiny variations in the universe's first light"
                        style={{ width: '100%', maxWidth: '820px', borderRadius: '10px', border: '1px solid var(--border)' }}
                    />
                    <figcaption style={{ marginTop: '0.75rem', fontSize: '0.85rem', color: 'var(--muted)' }}>
                        The universe at 380,000 years old. A baby photo. Every speck is a tiny temperature wobble in the ancient fog. From those wobbles, eventually, came everything. Credit: ESA / Planck Collaboration (CC BY 4.0)
                    </figcaption>
                </figure>

                <p>
                    Take a second with that picture. It's the most important photo ever taken, and almost nobody has it on their wall.
                </p>

                <h2>The dark ages</h2>
                <p>
                    For about <strong>100 million years</strong> after the fog cleared, there was nothing to see. No stars yet. Just hydrogen and a little helium, drifting in cold dark space, slowly being pulled into clumps by gravity. Nothing was glowing. Nothing was burning. The entire universe was dark.
                </p>
                <p>
                    Scientists call this stretch the Dark Ages. I always thought that name was a bit dramatic. Then again — it really was dark.
                </p>

                <h2>The first stars</h2>
                <p>
                    In the densest clumps of hydrogen, gravity kept squeezing. And squeezing. And squeezing. Eventually the gas in the middle of a clump got so squeezed it became millions of degrees hot — hot enough that hydrogen atoms started crashing into each other so hard they stuck together and made helium. That crashing-together releases a huge amount of light and heat. We call it nuclear fusion. And a ball of gas that's doing it is called a star.
                </p>
                <p>
                    So a star is just a giant ball of gas that's been squeezed by its own gravity until it can't help but make light. Our Sun is one. You can see plenty more on a clear night.
                </p>
                <p>
                    The very first stars were enormous — hundreds of times bigger than our Sun. They were blue-white and brilliant. They lived fast and died young, burning through their fuel in just a few million years. And then they exploded.
                </p>
                <p>
                    The exploding part matters. When a really big star runs out of fuel, it collapses in on itself and then blows up. We call it a supernova. And in the heat of that explosion, the simple atoms inside the star get smashed together into heavier atoms. Carbon. Oxygen. Iron. Calcium. Gold. Everything heavier than helium gets made this way.
                </p>
                <p>
                    So the heavy stuff that makes up your body — the iron in your blood, the calcium in your bones, the carbon in everything you eat — all of it was cooked inside a giant star, billions of years ago, and then scattered across space when the star died.
                </p>
                <p>
                    You are made of star explosion. So is your dog.
                </p>

                <h2>Galaxies and the long settling</h2>
                <p>
                    Supernova by supernova, the universe seasoned itself with the heavier elements. New stars formed from the leftover gas and dust, made from the recycled bits of older stars. Gravity pulled stars together into great spinning groups. We call those groups galaxies. Each one has hundreds of billions of stars.
                </p>
                <p>
                    In one of those galaxies — a fairly average spiral one called the Milky Way — about <strong>4.6 billion years ago</strong>, a cloud of gas and dust started collapsing on itself. The middle got hot and dense enough to ignite a new star: our Sun. The leftover crumbs spinning around it cooled and stuck together into planets. One of those planets ended up just the right distance from the Sun for water to be liquid on its surface.
                </p>
                <p>
                    That planet is the floor under your feet.
                </p>

                <h2>Where the story leads</h2>
                <p>So when a kid asks <em>"where did everything come from?"</em>, the honest answer is something like this:</p>
                <p>
                    It started really small and really hot. It got huge, very fast. After 380,000 years, it became see-through. After 100 million years, the first stars started shining. They lived, died, and made the heavy stuff. From the heavy stuff, more stars formed, and planets, and eventually — on at least one of those planets — atoms got arranged into shapes that could ask questions.
                </p>
                <p>
                    Shapes like you.
                </p>
                <p>
                    That's not a story anyone made up. Every piece of it has been checked by telescopes and experiments. We even have the baby photo. It's the one a few paragraphs up.
                </p>

                <h2>The really strange part</h2>
                <p>
                    Here's something to think about before you sleep.
                </p>
                <p>
                    The universe is still getting bigger. Right now. Every distant galaxy is sliding away from us, and away from every other galaxy, faster and faster. The space between things is growing.
                </p>
                <p>
                    Nobody quite knows why. We have a name for whatever is causing it — <em>Dark Energy</em> — but the name is mostly a sticker we've put on a thing we don't understand yet. It's about 68% of everything in the universe, and we have no idea what it actually is.
                </p>
                <p>
                    Whoever figures out what Dark Energy is will probably win a Nobel Prize.
                </p>
                <p>
                    It might be you, eventually.
                </p>

                <h2>What to remember</h2>
                <p>If you only keep one idea from all of this:</p>
                <p>
                    Everything you can see — your room, the sky, the stars, the galaxies — was once in the same place. It got huge. It's still getting huger. The atoms in your hand are 13.8 billion years old. Most of them were made inside a star that died long before the Sun was born.
                </p>
                <p>
                    You're not separate from the universe. You're the universe, sitting up and reading about itself.
                </p>
                <p>How strange is that.</p>

                <p style={{ fontSize: '0.9rem', color: 'var(--muted)', borderTop: '1px solid var(--border)', paddingTop: '1.5rem', marginTop: '2rem' }}>
                    <em>If any of this caught you and you want more: look up the Hubble Ultra Deep Field, the COBE/WMAP/Planck CMB pictures, and a YouTube clip of the supernova that left behind the Crab Nebula. Each one is a real photograph of something in this story. None of it is made up.</em>
                </p>
            </>
        )
    },
    {
        slug: "ramayana-from-space",
        title: "The Ramayana, From Space",
        date: "May 2026",
        excerpt: "NASA's satellites can see a 48-kilometre chain of limestone shoals between India and Sri Lanka — sitting exactly where the Ramayana says Rama's army built a bridge. Meanwhile, planetary positions written into the same epic can be checked against modern astronomy software. Here's what holds up, and what doesn't.",
        content: (
            <>
                <p>
                    A friend told me once, with the WhatsApp-forward kind of confidence, that NASA had confirmed Rama's bridge was real and man-made. I went looking. The truth turned out to be more interesting than the rumour, and a lot less tidy.
                </p>
                <p>
                    The Ramayana is at least two and a half thousand years old as a written text, and probably much older as an oral tradition. It names places you can still walk to. It records planetary positions you can still check. And from orbit, it points at a chain of limestone shoals 48 kilometres long, sitting just below the Indian Ocean between Rameswaram and Mannar.
                </p>
                <p>
                    I want to walk through what's actually known. What the satellites see. What the sky says when you feed Valmiki's verses into planetarium software. And where the evidence runs out and belief takes over.
                </p>

                <h2>A bridge you can see from space</h2>
                <p>
                    In the strait between southeastern India and northwestern Sri Lanka, there's a chain of limestone shoals about 48 kilometres long. Most of it sits one to ten metres below sea level. The British named it Adam's Bridge. In India it's been called Setubandhanam, Rama Setu, or simply Rama's bridge for centuries.
                </p>
                <figure style={{ margin: '2rem 0', textAlign: 'center' }}>
                    <img
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/AdamsBridge02-NASA.jpg/1280px-AdamsBridge02-NASA.jpg"
                        alt="Adam's Bridge / Rama Setu photographed from Space Shuttle Endeavour, STS-59, 1994 — India at top, Sri Lanka at bottom, a continuous chain of shoals between them"
                        style={{ width: '100%', maxWidth: '760px', borderRadius: '8px', border: '1px solid var(--border)' }}
                    />
                    <figcaption style={{ marginTop: '0.75rem', fontSize: '0.85rem', color: 'var(--muted)' }}>
                        Adam's Bridge from Space Shuttle Endeavour, 1994. India at top, Sri Lanka at bottom, the chain of shoals running between them. Credit: NASA Johnson Space Center, STS-59 (public domain)
                    </figcaption>
                </figure>
                <p>
                    NASA's Terra satellite has photographed it. Gemini and Apollo astronauts saw it from orbit. In 2024, ISRO and NASA used ICESat-2 — a satellite that bounces laser pulses off the seafloor — to produce the first complete underwater map of the structure. The technique uses the green-laser photons that can punch through clear shallow water, hit the seabed, and bounce back. The team accumulated roughly 0.2 million geolocated returns to build a 10-metre-resolution bathymetric model. The result, published in <em>Scientific Reports</em> in 2024: 99.8 percent of the structure is submerged, but it is a single, continuous submarine ridge — a "submarine continuation of Dhanushkodi and Talaimannar Island," as the authors put it. Not a coincidence of separate sandbars. One feature, end to end.
                </p>
                <p>
                    The crest of the ridge is sharply undulating within a narrow 1.5-kilometre band on either side, and the scientists noted an asymmetry in the slopes flowing away from the crest — the Gulf of Mannar side deposits sediment differently than the Palk Strait side. That kind of detail matters: it tells you the structure has been shaped by currents over long stretches of time, in ways consistent with a natural shoal.
                </p>
                <p>
                    Until around 1480 CE, much of it was reportedly walkable above the waterline. Tamil temple records describe pilgrims crossing on foot. A cyclone that year is believed to have broken it down to roughly what we see now. Local Sri Lankan oral history records the same event — same century, same description of the sea swallowing the path.
                </p>

                <h2>What NASA actually said (and didn't)</h2>
                <p>
                    The pop version of this story is that NASA released images "proving" the bridge is man-made and 1.7 million years old. That isn't true, and NASA has explicitly said so. The substance of their statement: a satellite picture can show you the shape of something. It cannot tell you the age or whether humans were involved. Shape isn't intent.
                </p>
                <p>
                    What the imagery does confirm is that the structure exists, and that it's unusual — a continuous, narrow chain in shallow water, running between two land masses. That's it. Interpretation is left to whoever's reading.
                </p>
                <p>
                    The Geological Survey of India has done more patient work. Their "Project Rameswaram" study found that Rameswaram Island itself began forming around 125,000 years ago, and the land masses at both ends were exposed as a continuous connection somewhere between 7,000 and 18,000 years ago — within the window of modern humans being around to walk across it. Thermoluminescence dating of coral fragments on the bridge proper points to roughly 500 to 600 years for the surface material, with older substrate underneath.
                </p>
                <p>
                    The honest reading: this is a natural geological feature. Whether some of the shoals were modified or actively used by humans as a crossing in deep antiquity is an open question that satellites alone won't answer. The bridge is real. Its origin story is still being written.
                </p>

                <h2>The route, mapped</h2>
                <p>
                    The Ramayana is unusually specific about geography too. It names rivers, hills, forests, ashrams, and villages along Rama's journey south from Ayodhya. In the 1980s and 1990s, a researcher named Dr. Ram Avtar Sharma did something straightforward: he took Valmiki's text and tried to walk it. Starting from Ayodhya, following the order in which Valmiki names places, he travelled south through what is now Uttar Pradesh, Madhya Pradesh, Maharashtra, Karnataka, and Tamil Nadu — and ended at Rameswaram.
                </p>
                <p>
                    He documented around 195 sites along the way that still bear memorials, place names, or oral traditions tied to the exact events Valmiki describes. Some of the names you'd recognise immediately: Tamsa Tal at Mandah, where Rama first stopped after leaving Ayodhya. Shringverpur (modern Singraur) on the Ganga, where the boatman Guha ferried him across. The Bharadwaja Ashram near present-day Prayagraj. Chitrakoot. The Panchavati grove near Nashik. Shabari's Ashram. Kishkindha near Hampi. Dhanushkodi at the very tip of Rameswaram, named for the bow that, in the epic, marked the spot where the bridge was built.
                </p>
                <p>
                    This isn't proof that the epic is literal history. Place names can be assigned retroactively — a town can decide it was once Shringverpur even if there's no archaeological reason it was. But the consistency is striking. The route Valmiki describes corresponds to a real geography: south-southeast from the Gangetic plain, into the Vindhyas, down the Deccan, ending where the land actually does end. You can travel it. The order works. That tells you whoever wrote the Ramayana had walked, or at least carefully heard about, the country it describes.
                </p>

                <h2>Reading planets from a 2,500-year-old poem</h2>
                <p>
                    The other thing the Ramayana left us is astronomy. Valmiki was unusually specific. He didn't say "it was a clear night." He named planets, zodiac signs, and lunar mansions — over a hundred such references across the epic.
                </p>
                <p>
                    The most famous is the birth of Rama. Valmiki places it in the month of Chaitra, on the ninth day of the bright fortnight, with this configuration overhead:
                </p>
                <ul>
                    <li>Sun in Aries (Mesha)</li>
                    <li>Moon near the Punarvasu lunar mansion, in Cancer</li>
                    <li>Jupiter in Cancer (Karkata)</li>
                    <li>Saturn in Libra (Tula)</li>
                    <li>Venus in Pisces (Meena)</li>
                    <li>Mars in Capricorn (Makara)</li>
                </ul>
                <p>
                    That's not vague. It's a specific configuration of six bodies. In the early 2000s, an Indian Revenue Service officer named Pushkar Bhatnagar — not an astronomer, but a careful reader — fed those positions into Planetarium Gold, an off-the-shelf astronomy program normally used to back-calculate eclipses and orbits. His result: the matching date is around noon on the 10th of January, 5114 BCE.
                </p>
                <p>
                    He kept going. The Ramayana describes the start of the exile under a specific lunar configuration — Bhatnagar's software returned January 5, 5089 BCE, which would have made Rama 25 at the time, matching Valmiki's stated age. The Aranya Kanda describes a total solar eclipse during the battle with the demon Khara: a sudden darkening, animals confused, a halo around a black disc. Astronomical back-calculation places a total eclipse over central India on October 7, 5077 BCE — exactly when the timeline says Rama would have been in the Dandaka forest. The return to Ayodhya, marked by another full set of planetary references, calculates to January 2, 5075 BCE. Birth, exile, eclipse, return — four separate astronomical anchors, all from independent passages in the text, all landing on a self-consistent timeline spanning fifty years.
                </p>
                <p>
                    Take that seriously for a second. If you trust Valmiki on the sky, the sky points at a single sequence of mornings in deep history.
                </p>

                <h2>On the other coast</h2>
                <p>
                    Sri Lanka has its own parallel set of sites. Not borrowed from India recently — recorded in Sinhalese and Tamil tradition for centuries, in some cases millennia, and tied to Ravana's side of the story rather than Rama's. There are around 50 of them, grouped into what locals call the Ramayana Trail.
                </p>
                <p>
                    The Hakgala Botanical Garden near Nuwara Eliya, sitting at almost 1,700 metres in the central highlands, is identified in local tradition as Ashoka Vatika — the garden where Sita was held captive. A small Sita Amman temple is built beside a stream that runs through it, and large rock impressions nearby are pointed out as Hanuman's footprints. At Ella, on the eastern flank of the highlands, there's a cave system (Ravana Cave) and a tall waterfall (Ravana Falls) named in the same tradition. Divurumpola, in central Sri Lanka, takes its name from the Sinhalese for "place of oath" — and is identified as the spot where Sita's agni pariksha took place before the return to Ayodhya.
                </p>
                <p>
                    None of these are archaeologically dated to the time of the Ramayana. They are sites of long-standing oral tradition, layered with more recent temple-building. But the pattern is the same as on the Indian side: a geography that fits the story, named for the story, in places that match the story's logic. A captive queen taken south across the sea and held in highland gardens. A return that crosses water. Whatever the literal truth of any of it, the Ramayana isn't just an Indian narrative — it's a story two countries kept, in parallel, for thousands of years.
                </p>

                <h2>The catch</h2>
                <p>
                    But there are good reasons not to walk away yet.
                </p>
                <p>
                    First — precession. Earth wobbles on its axis once every ~26,000 years, slowly shifting how zodiac signs map onto the sky. A configuration that looks like "Jupiter in Cancer" today wouldn't have looked that way 7,000 years ago, unless you correct for it carefully. Different researchers correct differently, which is part of why Bhatnagar lands on 5114 BCE while another popular dating attempt by Nilesh Oak places Rama's birth around 12,000 BCE. Both can't be right. The fact that the answer depends so heavily on the assumption is a tell.
                </p>
                <p>
                    Second, even very specific planetary configurations recur. The full pattern isn't unique to one date — it's unique to a small set of dates across thousands of years. Picking between matches requires extra assumptions about what "Punarvasu" or "Mesha" meant in Valmiki's frame.
                </p>
                <p>
                    Third — and this is the mainstream Indology point — the Valmiki Ramayana as we have it was compiled over centuries. The written text most scholars work from probably took its current shape between 500 BCE and 100 CE, with older oral tradition behind it. Some astronomical references may have been added or polished by later editors, who could have written in the sky of their own time rather than the original moment.
                </p>
                <p>
                    Fourth, and this is the one I find hardest to wave away: 5114 BCE predates the Indus Valley civilisation by about 1,800 years. Mature urban Harappan culture begins around 2600 BCE, and even its formative phase only stretches back to around 3300 BCE. If Rama lived in 5114 BCE, his Ayodhya — described in the text as a great city with paved streets, gates, palaces, ramparts, and a literate court — exists 2,000 years before any comparable urban settlement we have dug up anywhere in South Asia. That's a heavy load for archaeology to carry. So far it hasn't. Either the date is wrong, or the urban descriptions in the text are anachronisms grafted on by later compilers, or there is a pre-Harappan layer of Indian urbanism we genuinely have not found yet. None of those options are easy.
                </p>
                <p>
                    None of this kills the project. The astronomical references are still there, they're still detailed, and the dating attempts are real intellectual work. But "Planetarium Gold returned 5114 BCE" isn't the same as "we have proven the date of a historical person's birth."
                </p>

                <h2>And the flying chariot?</h2>
                <p>
                    A word about the Pushpaka Vimana, because it's the part everyone wants to ask about. The Ramayana describes it as a self-moving aerial vehicle, originally belonging to Kubera, taken by Ravana, and finally used by Rama and Sita to fly home to Ayodhya. The Yuddha Kanda describes the view from inside it — looking down at the bridge, the ocean, the forests of central India unrolling beneath. It's a startling passage. It reads like aerial observation.
                </p>
                <p>
                    There is zero archaeological evidence for it. No remains, no schematics, no parts. The "Vaimanika Shastra" sometimes invoked as a technical manual was actually composed in the early 1900s by a man named Subbaraya Shastry, who attributed it to ancient revelation; it is not an old text. So when you see headlines claiming ancient Indians flew, the honest answer is that the Ramayana describes flight, vividly and repeatedly, and we don't know what to make of that. It could be metaphor for divine travel. It could be a literary device. It could be a memory of something we can't recover. We don't know. People who are very confident either way are not being honest about what the evidence supports.
                </p>
                <p>
                    What's interesting isn't that the text proves anything technological. It's that a poem from antiquity bothered to describe a perspective from above — what coastlines, rivers, and forests look like seen from height. Whatever its origin, the imagination was there.
                </p>

                <h2>What we can honestly say</h2>
                <p>Strip away the certainty on either side, and what's left is genuinely good:</p>
                <p>
                    There is a long, narrow chain of limestone shoals between two coasts that an old epic names by name. The structure is real, almost entirely submerged, continuous from end to end, mostly natural in origin, and its precise human history is unsettled. The Geological Survey has its coral dates; the 2024 ICESat-2 study has the bathymetry; the question of whether humans ever walked or worked on the shoals at the moment they were exposed is open in the way real questions are open.
                </p>
                <p>
                    There is an ancient text with over a hundred specific astronomical observations, detailed enough that you can run them through software and get a date. The date you get depends on assumptions about precession and zodiac frames, and competing researchers land thousands of years apart. But the fact that the observations are consistent within the text — birth, exile, an eclipse during the war, the return to Ayodhya — is itself a striking feature of the source material. Whoever composed those verses cared about getting the sky right.
                </p>
                <p>
                    There is an oral tradition that names places — Ayodhya, Chitrakoot, Panchavati, Kishkindha, Rameswaram, Lanka, Hakgala, Divurumpola — that still exist on both sides of a sea, and broadly match the geography in the poem. Dr. Ram Avtar Sharma walked the Indian half of that route and found 195 of those memory-sites still there. Sri Lankan oral tradition keeps another fifty.
                </p>
                <p>
                    None of that is theological proof. None of it tells you Rama was a historical person, and none of it tells you he wasn't. What it tells you is that the Ramayana was written by people who looked carefully — at the land, at the sky, at where things were. That carefulness is what makes it possible, three thousand years later, to walk to Rameswaram, open a satellite image, run a star chart, and check.
                </p>

                <h2>Closing</h2>
                <p>
                    You don't have to decide whether Rama was a historical person to find this interesting. There's a chain of limestone two ships wide running across an ocean, and a poem from antiquity that puts a bridge in exactly that spot. There are six planets sitting in the sky exactly where one verse says they are, on some specific morning that may or may not be seven thousand years ago. There are 245 places, between India and Sri Lanka, that have remembered being a part of the story for so long the memory itself is now part of the landscape.
                </p>
                <p>
                    The space between myth and evidence isn't always empty. Sometimes there's a chain of shoals in it, photographed from orbit. A poem on a palm leaf. A planetarium running quietly in the background. And a long, long memory, on both sides of a narrow strait, that survived three thousand years and a cyclone in 1480 to still have something to say.
                </p>

                <p style={{ fontSize: '0.9rem', color: 'var(--muted)', borderTop: '1px solid var(--border)', paddingTop: '1.5rem', marginTop: '2rem' }}>
                    <em>Sources worth your time: NASA/JPL imagery of Adam's Bridge (public); the Geological Survey of India's "Project Rameswaram" coral dating notes; Pushkar Bhatnagar's "Dating the Era of Lord Rama" for the 5114 BCE argument; and the Nature paper by Sengupta et al. (2024) on ICESat-2 bathymetry of the structure. Read all of them. Decide for yourself.</em>
                </p>
            </>
        )
    },
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
