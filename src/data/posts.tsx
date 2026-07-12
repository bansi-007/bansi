export interface BlogPost {
    slug: string;
    title: string;
    date: string;
    excerpt: string;
    tags?: string[];
    draft?: boolean;
    content?: React.ReactNode;
    contentEn?: React.ReactNode;
    mediumLink?: string;
}

const allPosts: BlogPost[] = [
    {
        slug: "does-such-a-man-exist",
        title: "Does Such a Man Exist?",
        date: "Jul 2026",
        tags: ["Dharma", "Literature", "History"],
        excerpt: "We keep asking what makes an ideal man, and we keep answering through his relationships. Two thousand years ago a sage asked the same question, defined the highest standard first, and only then asked whether anyone had ever reached it.",
        content: (
            <>
                <p>
                    I keep coming back to one question, often without realising it. It hides inside other topics, leadership, relationships, what people today call masculinity, but if you go deep enough, it is always the same question. <em>What makes an ideal man?</em>
                </p>
                <p>
                    Ask this today and the answers come quickly. He should be emotionally available. He should communicate well. He should respect women, be kind, be ambitious, be responsible with money, be a good husband and a caring father. None of this is wrong. Every one of these is worth having. But look closely and you will notice something. Almost all of these describe a man through his relationships. We judge him by how he treats his partner, how he talks to others, how mature he is around people.
                </p>
                <p>
                    These are real qualities. But they are only one part of a much bigger picture. Life asks a man to do more than be good company. It asks him to take decisions that cannot wait, to carry responsibilities he cannot put down, to stay calm when others panic, and to choose the harder right thing over the easier wrong one even when nobody is watching. A relationship can show a man&apos;s character. It does not create it. Character is built long before anyone is there to admire it.
                </p>
                <p>
                    So maybe we are asking the wrong question. Not &ldquo;what makes a good husband&rdquo; or &ldquo;what makes an attractive man&rdquo;, but an older and deeper one: <em>what kind of human being should a man become in the first place?</em>
                </p>

                <h2>The architecture of character</h2>
                <p>
                    Try to describe the ideal man without mentioning how he looks, what he does, what he owns, or whether people admire him. What is left?
                </p>
                <p>
                    The first thing left is character, because it is the only thing that stays. Youth fades, power changes hands, money comes and goes. Character stays with a man till his last breath. Without it, intelligence becomes cunning, power becomes cruelty, and success becomes arrogance. And real character is quiet. The strength that matters is not the loud kind that shows off and troubles the weak. It is restraint. Anyone can pick up a sword. The man worth trusting is the one who knows when not to.
                </p>
                <p>
                    But restraint is of no use without wisdom, and wisdom is not the same as knowledge. Books are full of knowledge. Wisdom is knowing what should be done when many choices all look reasonable. Life rarely gives a clean choice between right and wrong. It usually gives a choice between what is easy and what is right, and the ideal man can tell the difference. People trust his judgement because he does not waste words. When a truthful man finally speaks, others listen, not because he speaks well, but because he has never sold his word for convenience.
                </p>
                <p>
                    Capability goes hand in hand with responsibility. Good intentions are fine until a family depends on you, and then intentions alone are not enough. Being capable is not arrogance, it is a kind of service. The more capable a man is, the more people he can help. But capability without gratitude spoils quickly. Success likes to convince a man that he reached there alone. He did not. The ideal man remembers everyone who helped him rise, and that memory keeps his success from turning into pride.
                </p>
                <p>
                    The last pair is the hardest, because it is fought in private. Discipline over yourself, over laziness, temptation, anger, ego and disappointment, is the one battle that never ends. History remembers those who won kingdoms, but the wiser man is the one who first won over himself. Along with it comes humility, which is not weakness but confidence. A man who is at peace with himself is never disturbed by another person&apos;s success. And here Indian tradition sees anger differently from the modern idea that anger is always bad. Anger from ego or greed destroys. But anger in defence of the innocent, of truth, of dharma, is a different thing altogether. A man who feels no anger before injustice is not gentle, he is incomplete. He does not kill his strength. He controls it.
                </p>
                <p>
                    Step back and you see the real point: every quality is balanced by another. Strength is softened by compassion. Wisdom is guided by truth. Capability is held by responsibility. Discipline controls power, humility controls success. Character is what holds all of them together.
                </p>

                <h2>The ancient benchmark</h2>
                <p>
                    This may sound like only a philosophical exercise. It is not. More than two thousand years ago, a sage asked this exact question, and he asked it plainly, because he genuinely wanted to know whether such a complete human being had ever really lived.
                </p>
                <p>
                    His question survives in three verses:
                </p>
                <blockquote>
                    కో న్వస్మిన్ సాంప్రతం లోకే గుణవాన్ కశ్చ వీర్యవాన్ ।<br />
                    ధర్మజ్ఞశ్చ కృతజ్ఞశ్చ సత్యవాక్యో దృఢవ్రతః ॥<br />
                    చారిత్రేణ చ కో యుక్తః సర్వభూతేషు కో హితః ।<br />
                    విద్వాన్ కః కః సమర్థశ్చ కశ్చైకప్రియదర్శనః ॥<br />
                    ఆత్మవాన్ కో జితక్రోధో ద్యుతిమాన్ కోఽనసూయకః ।<br />
                    కస్య బిభ్యతి దేవాశ్చ జాతరోషస్య సంయుగే ॥
                    <br />
                    <span style={{ fontStyle: 'normal', color: 'var(--muted)', fontSize: '0.9rem', display: 'block', marginTop: '0.85rem', lineHeight: 1.7 }}>
                        ko nu asmin sāmprataṃ loke guṇavān kaśca vīryavān / dharmajñaśca kṛtajñaśca satyavākyo dṛḍhavrataḥ // cāritreṇa ca ko yuktaḥ sarvabhūteṣu ko hitaḥ / vidvān kaḥ kaḥ samarthaśca kaścaikapriyadarśanaḥ // ātmavān ko jitakrodho dyutimān ko&apos;nasūyakaḥ / kasya bibhyati devāśca jātaroṣasya saṃyuge //
                    </span>
                    <span style={{ fontStyle: 'normal', color: 'var(--muted)', fontSize: '0.85rem', display: 'block', marginTop: '0.6rem' }}>
                        Valmiki Ramayana, Bala Kanda 1.1.2&ndash;4
                    </span>
                </blockquote>
                <p>
                    He does not ask whether the man is rich, or handsome, or famous. He asks sixteen questions, the <em>shodasha guna</em>, sixteen marks of a complete human being. Tradition connects them to the sixteen <em>kalas</em>, the phases of the full moon. Valmiki is quietly showing his hero as the complete moon, with nothing missing.
                </p>

                <div className="guna-list">
                    <div className="guna-row"><span className="guna-term">గుణవాన్ · guṇavān</span><span className="guna-meaning">Virtuous, good at his core</span></div>
                    <div className="guna-row"><span className="guna-term">వీర్యవాన్ · vīryavān</span><span className="guna-meaning">Valorous, capable of great power</span></div>
                    <div className="guna-row"><span className="guna-term">ధర్మజ్ఞః · dharmajña</span><span className="guna-meaning">Knows dharma, what is right</span></div>
                    <div className="guna-row"><span className="guna-term">కృతజ్ఞః · kṛtajña</span><span className="guna-meaning">Grateful, remembers every kindness</span></div>
                    <div className="guna-row"><span className="guna-term">సత్యవాక్యః · satyavākya</span><span className="guna-meaning">True to his word, always</span></div>
                    <div className="guna-row"><span className="guna-term">దృఢవ్రతః · dṛḍhavrata</span><span className="guna-meaning">Steadfast, firm in his vows</span></div>
                    <div className="guna-row"><span className="guna-term">చారిత్రవాన్ · cāritravān</span><span className="guna-meaning">Of spotless conduct</span></div>
                    <div className="guna-row"><span className="guna-term">సర్వభూతహితః · sarvabhūteṣu hita</span><span className="guna-meaning">Wishes every living being well</span></div>
                    <div className="guna-row"><span className="guna-term">విద్వాన్ · vidvān</span><span className="guna-meaning">Learned, truly wise</span></div>
                    <div className="guna-row"><span className="guna-term">సమర్థః · samartha</span><span className="guna-meaning">Capable, able to act</span></div>
                    <div className="guna-row"><span className="guna-term">ప్రియదర్శనః · priyadarśana</span><span className="guna-meaning">Beloved by all who meet him</span></div>
                    <div className="guna-row"><span className="guna-term">ఆత్మవాన్ · ātmavān</span><span className="guna-meaning">Master of himself</span></div>
                    <div className="guna-row"><span className="guna-term">జితక్రోధః · jitakrodha</span><span className="guna-meaning">Conqueror of his own anger</span></div>
                    <div className="guna-row"><span className="guna-term">ద్యుతిమాన్ · dyutimān</span><span className="guna-meaning">Radiant, carries an inner light</span></div>
                    <div className="guna-row"><span className="guna-term">అనసూయకః · anasūyaka</span><span className="guna-meaning">Free of envy</span></div>
                    <div className="guna-row"><span className="guna-term">జాతరోషే · roused in a just cause</span><span className="guna-meaning">So fierce in battle for what is right that even the gods fear him</span></div>
                </div>

                <p>
                    The sage was Maharshi Valmiki. And this is the part that always stops me. He did not begin his epic by saying <em>tell me about Rama.</em> He began by asking whether such a man could even exist. He first defined the highest standard of a human being, fully, and only then asked if anyone had ever reached it.
                </p>
                <p>
                    The answer came from Narada, and it is very simple:
                </p>
                <blockquote>
                    ఇక్ష్వాకువంశప్రభవో రామో నామ జనైః శ్రుతః ॥
                    <br />
                    <span style={{ fontStyle: 'normal', color: 'var(--muted)', fontSize: '0.9rem', display: 'block', marginTop: '0.6rem' }}>
                        ikṣvāku vaṃśa prabhavo rāmo nāma janaiḥ śrutaḥ
                    </span>
                    <span style={{ fontStyle: 'normal', color: 'var(--muted-strong)', fontSize: '1rem', display: 'block', marginTop: '0.6rem' }}>
                        &ldquo;There is one. Born of the Ikshvaku line. People know him as Rama.&rdquo;
                    </span>
                    <span style={{ fontStyle: 'normal', color: 'var(--muted)', fontSize: '0.85rem', display: 'block', marginTop: '0.6rem' }}>
                        Bala Kanda 1.1.8
                    </span>
                </blockquote>
                <p>
                    Only then, after the question was asked and the standard was set, does the Ramayana actually begin.
                </p>
                <p>
                    We usually introduce Rama as an avatar of Vishnu, as the prince of Ayodhya, as the one who defeated Ravana. Valmiki introduces him as none of these. He introduces him as the answer to a question, the living form of the highest ideal a human being can aim for.
                </p>
                <p>
                    Maybe that is why the Ramayana has lasted so long. It was never only the story of a demon king&apos;s defeat. It was held up as a mirror, and the question it begins with is the same one we are still asking today, only in poorer words. It simply had the courage to ask it directly, and to define the answer before telling us the man&apos;s name.
                </p>
            </>
        )
    },
    {
        slug: "low-heat",
        title: "Low Heat",
        date: "Jul 2026",
        tags: ["Cinema"],
        draft: true,
        excerpt: "Breaking Bad and Better Call Saul never ask you to watch a man become a monster. They make you become one with him, slowly enough that you never feel it happen. On the characters, and the trick they play on you.",
        content: (
            <>
                <figure style={{ margin: '0 0 2.5rem', textAlign: 'center' }}>
                    <img
                        src="https://upload.wikimedia.org/wikipedia/commons/9/95/BryanCranston-byPhilipRomano_%28cropped%29.jpg"
                        alt="Bryan Cranston, who played Walter White"
                        style={{ width: '100%', maxWidth: '520px', borderRadius: '10px', border: '1px solid var(--border)' }}
                    />
                    <figcaption style={{ marginTop: '0.75rem', fontSize: '0.85rem', color: 'var(--muted)' }}>
                        Bryan Cranston, who played Walter White. Credit: PhilipRomano, via Wikimedia Commons (CC BY-SA 4.0)
                    </figcaption>
                </figure>

                <p>
                    There is a shot at the start of every Better Call Saul season that most people fast-forward past. Black and white. A man named Gene manages a Cinnabon in a mall in Omaha. He is alone. He is afraid of being recognised. And when a stranger so much as glances at him too long, you watch the old instinct twitch back to life behind his eyes, the con man, still in there, still running, with no one left to run on.
                </p>
                <p>
                    That is Saul Goodman now. That is what is left of Jimmy McGill. And the reason it wrecks you is that you knew Jimmy before he was this. You liked Jimmy. You would have vouched for him. Which means the sadness in that Cinnabon is not happening to a stranger on a screen. It is happening to someone you signed off on.
                </p>
                <p>
                    That is the whole trick of these two shows, and almost nobody names it. They are not about men who become bad. They are about getting <em>you</em> to care about a man, completely, before you are allowed to see what he does. The bond gets set first. The darkness comes after. And by then it is too late to pretend you are just watching.
                </p>

                <h2>The bond comes first</h2>
                <p>
                    Think about how you met Walter White. Not the drug lord. The other one. A high-school chemistry teacher working a second job at a car wash, wiping down the hubcaps of a student who smirks at him. Fifty years old, brilliant, invisible. A wife who has stopped seeing him. A body that has just been handed a death sentence. Before Walt cooks a single gram, the show spends an hour making sure you feel the specific humiliation of being a smart man the world decided not to need.
                </p>
                <p>
                    You do not bond with Heisenberg. Nobody bonds with Heisenberg. You bond with the man in the pilot, and that is the hook the show buries under everything that follows. Because a hundred hours later, when Walt is poisoning a child and watching a woman choke to death and doing nothing, some stubborn part of you still remembers rooting for him when all he wanted was to matter before he died. The show never lets you fully cut that cord. It made you like him first, on purpose, so that his guilt would have somewhere to land: on you.
                </p>
                <p>
                    Every major character in both shows is built on this same order of operations. Attach, then reveal. You are always given the person before you are given the evidence.
                </p>

                <h2>Two men, two directions</h2>

                <figure style={{ margin: '2rem 0', textAlign: 'center' }}>
                    <img
                        src="https://upload.wikimedia.org/wikipedia/commons/8/84/Bob_Odenkirk_at_53rd_Saturn_Awards_2026-02.jpg"
                        alt="Bob Odenkirk, who played Jimmy McGill and Saul Goodman"
                        style={{ width: '100%', maxWidth: '520px', borderRadius: '10px', border: '1px solid var(--border)' }}
                    />
                    <figcaption style={{ marginTop: '0.75rem', fontSize: '0.85rem', color: 'var(--muted)' }}>
                        Bob Odenkirk, who played Jimmy McGill and Saul Goodman. Credit: Kevin Paul, via Wikimedia Commons (CC BY 4.0)
                    </figcaption>
                </figure>

                <p>
                    Walt and Jimmy are the same story run in opposite directions, and watching them side by side is the closest thing television has to a controlled experiment.
                </p>
                <p>
                    Walt breaks bad by choosing. Every escalation is a door he walks through, and the show&apos;s cruellest, cleverest move is making each door look reasonable from the inside. Killing Krazy-8 is self-defence. Letting Jane die is just, not intervening. The poisoning is chess. Each step is small enough to justify, so you justify it with him, and you never catch the exact moment your sympathy curdled into complicity. That is the design. Walt did not notice becoming a monster, and neither did you, because you were cooking at the same low heat.
                </p>
                <p>
                    And then, in the final hour, after five years of <em>everything I did, I did for this family</em>, he finally says the true thing to Skyler: <em>I did it for me. I liked it. I was good at it. I was really, I was alive.</em> It lands like a confession because it is one, and it is yours too. You believed the family story a little. He needed you to. The Gray Matter wound underneath all of it, the company he built and sold for a few thousand dollars while his old partners got billions, was never really about money. It was about being, one time, in one room, the smartest man there and having it count. Meth just let him feel it.
                </p>
                <p>
                    Jimmy McGill breaks bad the opposite way: he does not choose it, he gets convinced of it. Here is a warm, funny, quick man who wants exactly one thing, for his brilliant older brother to be proud of him, and who keeps reaching for the honest, legitimate life and finding the door quietly locked from the other side. Chuck, the brother, is the tragedy engine. He is completely right that Jimmy cannot be trusted, and completely monstrous in how he wields that truth, and the show refuses to tell you which of those facts damns Jimmy more. In their last real conversation Chuck tells him the truth: you never mattered all that much to me. You can hear the exact thing break. Saul Goodman is what rushes in to fill the hole where a brother&apos;s approval was supposed to be.
                </p>
                <p>
                    Walt&apos;s fall is thrilling because he is climbing. Jimmy&apos;s is unbearable because he is being pushed. One is a man discovering he was always this. The other is a good man being talked out of himself, degree by degree, until he decides fine, if this is who you all insist I am, I will be it, and I will be better at it than you can stand.
                </p>

                <h2>The ones who make it hurt</h2>

                <figure style={{ margin: '2rem 0', textAlign: 'center' }}>
                    <img
                        src="https://upload.wikimedia.org/wikipedia/commons/6/60/Giancarlo_Esposito_at_Comic_Con_Oakland_2026_-_2_%28cropped%29.jpg"
                        alt="Giancarlo Esposito, who played Gustavo Fring"
                        style={{ width: '100%', maxWidth: '520px', borderRadius: '10px', border: '1px solid var(--border)' }}
                    />
                    <figcaption style={{ marginTop: '0.75rem', fontSize: '0.85rem', color: 'var(--muted)' }}>
                        Giancarlo Esposito, who played Gustavo Fring. Credit: Aditya Ramachandran, via Wikimedia Commons (CC BY-SA 4.0)
                    </figcaption>
                </figure>

                <p>
                    Around those two are the characters who exist to make you feel the cost, and each one bonds you a different way.
                </p>
                <p>
                    <strong>Jesse Pinkman</strong> is your conscience, outsourced. He is the screw-up with the one thing Walt lacks, a heart that will not switch off, and the show uses him as a gauge. When something terrible happens, the camera does not linger on the body, it holds on Jesse&apos;s face, and you read the horror off him because he is feeling it for you. That is why hurting Jesse hurts us: he is carrying our capacity to still be appalled. Every time Walt uses him, the show is spending our own attachment against us.
                </p>
                <p>
                    <strong>Kim Wexler</strong> is the character you are most afraid for, and the fear is the bond. She is the disciplined one, the principled one, the self-made one, and the slow horror of Better Call Saul is realising she is also the one with a secret taste for the con, and that she is not being dragged down by Jimmy so much as running alongside him, sometimes ahead. She is the proof he could have been fine, which is exactly what makes her the saddest thing in either show. When she finally leaves, it is not weakness. It is the one clear-eyed moral act left: she sees that she is an accelerant, and she removes herself from the reaction. You spend six seasons braced for something to happen to Kim. The dread is the attachment.
                </p>
                <p>
                    <strong>Gustavo Fring</strong> does not bond you with warmth. He bonds you with a locked door you cannot stop trying to see behind. For episodes he gives you nothing, soft voice, pressed shirt, a manager&apos;s smile, five percent of a face, and the effort of reading him is the intimacy. Then Better Call Saul finally shows you the wound: a partner named Max, shot dead beside a pool while a young Gustavo was made to watch, and twenty years of immaculate patience built on top of that grief like a coffin lid. After you have seen it, you can never read his composure as calm again. You read it as a man holding something down. You do not love Gus. You come to understand exactly what his stillness is costing, and that understanding is its own kind of loyalty.
                </p>
                <p>
                    <strong>Mike Ehrmantraut</strong> is the one who seems like the adult in the room, and the bond is trust, the same trust Jesse puts in him. Steady, competent, tired, working a private code: I did it right, I did it clean. Then the show detonates the whole granite exterior in a single unbroken take, when Mike talks about his son, the good cop he pushed to take dirty money to fit in, who got killed for it. I broke my boy. Suddenly the most together man in the story is just a father who cannot forgive himself, laundering his guilt through his granddaughter&apos;s future. You trusted Mike because he looked like he had it handled. The show waits, and then shows you precisely what handled costs.
                </p>

                <h2>Why you cannot shake them</h2>
                <p>
                    Here is what I think it actually is.
                </p>
                <p>
                    We do not change the way flashy characters change, in a lightning strike, a montage, one decisive scene. We change the way these people change. Slowly. Through small permissions we do not call decisions. Through the widening gap between the story we tell about ourselves and the life we are actually living. Walt&apos;s <em>I did it for my family</em> is not a meth cook&apos;s lie. It is the most ordinary lie there is, scaled up. Jimmy&apos;s certainty that the next win will finally make his brother see him, that is not a con man&apos;s delusion. It is yours, and mine, wearing a cheap suit.
                </p>
                <p>
                    So when these characters finally confess, or crack, or twitch behind the eyes in a black-and-white Cinnabon, it does not land as plot. It lands as recognition. You are not watching them. You are being shown yourself at a slightly worse temperature.
                </p>
                <p>
                    That is the art both shows share, and it is the reason they do not leave. They never asked you to watch a man break bad. They cooked you at low heat, the same as him, until you looked down and realised you had been on his side the whole time, and could no longer quite explain why you thought you were not.
                </p>
            </>
        )
    },
    {
        slug: "oh-sundari",
        title: "ఓ సుందరి..",
        date: "Jul 2026",
        tags: ["తెలుగు", "Cinema", "Literature"],
        excerpt: "రావు బహదూర్ చిత్రంలోని \"ఓ సుందరి\" పాట, ఎన్నో సంవత్సరాల తర్వాత తెలుగు సినీ సాహిత్యంలోకి తిరిగి వచ్చిన అరుదైన పదసౌందర్యం గురించి.",
        content: (
            <div className="te">
                <figure style={{ margin: '0 0 2.5rem', textAlign: 'center' }}>
                    <img
                        src="/rao-bahadur-song.png"
                        alt="రావు బహదూర్"
                        style={{ width: '100%', maxWidth: '780px', borderRadius: '10px', border: '1px solid var(--border)' }}
                    />
                    <figcaption style={{ marginTop: '0.75rem', fontSize: '0.85rem', color: 'var(--muted)' }}>
                        రావు బహదూర్
                    </figcaption>
                </figure>

                <p><em>ఎన్నో సంవత్సరాల తర్వాత… ఒక మంచి తెలుగు ప్రేమగీతం.</em></p>

                <p>
                    కొన్ని పాటలు వినడానికి బాగుంటాయి. కొన్ని పాటలు గుర్తుండిపోతాయి. కానీ చాలా అరుదుగా కొన్ని పాటలు వస్తాయి, తెలుగు భాష ఎంత అందంగా ఉంటుందో మళ్లీ గుర్తు చేస్తాయి.
                </p>
                <p>
                    అలాంటి పాటను చివరిసారిగా నేను &ldquo;శ్యామ్ సింగరాయ్&rdquo; సినిమాలో సిరివెన్నెల సీతారామశాస్త్రి గారు రాసిన &ldquo;సిరివెన్నెల&rdquo; పాటలో విన్నాను. ఆ తర్వాత మళ్లీ అంతటి పదసౌందర్యం, అంతటి భావగాంభీర్యం ఉన్న ప్రేమగీతం వినలేదు.
                </p>
                <p>
                    ఆ వెలితిని భర్తీ చేస్తూ ఇప్పుడు &ldquo;రావు బహదూర్&rdquo; చిత్రంలోని &ldquo;ఓ సుందరి&rdquo; వచ్చింది.
                </p>
                <p>
                    సినిమా చూస్తున్నంతసేపూ కథ తన గమనంలో నెమ్మదిగా సాగుతుంది. ప్రేక్షకుడిగా &ldquo;ఇంకా ఏదో కావాలి&rdquo; అనిపించే క్షణంలో ఈ పాట మొదలవుతుంది. ఆ తర్వాత మాత్రం తెర మీద కనిపించేది కేవలం పాట కాదు, ప్రేమకు ఒక దృశ్యకావ్యం.
                </p>
                <p>
                    దర్శకుడు కథానాయకుడి ప్రేమను ఎక్కడా అతిశయోక్తిగా చూపించలేదు. అలాగే మొక్కుబడిగా కూడా చూపించలేదు. ప్రేమలో పడిన ఒక మనిషి మనసులో జరిగే మార్పును ఎంతో హృద్యంగా చిత్రించాడు. దానికి తోడు విజయ్ యేసుదాస్ గారి గానం, మృదువైన సంగీతం, సున్నితమైన చిత్రీకరణ, ఈ మూడూ కలిసి పాటను ఒక చిన్న చిత్రంలా నిలబెట్టాయి.
                </p>
                <p>
                    ముఖ్యంగా థియేటర్‌లో ఒక ఆసక్తికరమైన విషయం గమనించాను. అప్పటివరకు మాట్లాడుకుంటూ, కదులుతూ ఉన్న ప్రేక్షకులు ఈ పాట మొదలయ్యాక ఒక్కసారిగా నిశ్శబ్దంగా మారిపోయారు. ఎవరూ ఊహించని విధంగా ఆ పాట అందరినీ తనలో లీనమయ్యేలా చేసింది. ఒక మంచి పాటకు అంతకంటే పెద్ద ప్రశంస ఇంకేముంటుంది?
                </p>
                <p>
                    కానీ ఈ పాట అసలు బలం సంగీతం కాదు. సాహిత్యం.
                </p>

                <figure style={{ margin: '2rem 0' }}>
                    <div style={{ position: 'relative', width: '100%', paddingBottom: '56.25%', borderRadius: '12px', overflow: 'hidden', border: '1px solid var(--border)' }}>
                        <iframe
                            src="https://www.youtube-nocookie.com/embed/EU8ct98ZvCg"
                            title="ఓ సుందరి, రావు బహదూర్"
                            loading="lazy"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }}
                        />
                    </div>
                    <figcaption style={{ marginTop: '0.75rem', fontSize: '0.85rem', color: 'var(--muted)', textAlign: 'center' }}>
                        పాట వింటూ కింది సాహిత్యం చదవండి.
                    </figcaption>
                </figure>

                <hr />

                <div className="verse-pair">
                    <blockquote>&ldquo;పసిడి వన్నె పూల తీగలా… అల్లుకుంది నన్నిలా…&rdquo;</blockquote>
                    <p>బంగారు వర్ణంతో మెరిసే పూలతీగ ఎలా చెట్టును చుట్టుకుని పెరుగుతుందో, అలా ఆమె నా జీవితాన్నీ, నా మనసునీ పెనవేసుకుందని కవి చెబుతున్నాడు.</p>
                </div>

                <div className="verse-pair">
                    <blockquote>&ldquo;తరానికే తరుణీమణి, తరించనీ నయనాలనీ…&rdquo;</blockquote>
                    <p>ఈ తరం మొత్తానికే ఆదర్శంగా నిలిచే యువతి. ఆమె కళ్ల అందం నుంచి చూపును తిప్పుకోవడం అసాధ్యం.</p>
                </div>

                <div className="verse-pair">
                    <blockquote>&ldquo;వినువీధిలో నితారా, ఇల చేరే కాంతిధారా…&rdquo;</blockquote>
                    <p>ఆకాశంలో మెరిసే నక్షత్రమే భూమిపైకి దిగివచ్చి, వెలుగుల ప్రవాహంలా నా జీవితంలోకి అడుగుపెట్టినట్లుంది.</p>
                </div>

                <div className="verse-pair">
                    <blockquote>&ldquo;చూస్తే చాలు వదనం… లోలో ఏదో మధనం…&rdquo;</blockquote>
                    <p>ఆమె ముఖాన్ని ఒక్కసారి చూసినా చాలు. మనసులో చెప్పలేని ఒక మధురమైన కలవరం మొదలవుతుంది. అదే ప్రేమకు మొదటి నిర్వచనం.</p>
                </div>

                <div className="verse-pair">
                    <blockquote>&ldquo;సంచారినై ఎటో ఎటో తిరిగే నన్నే అధికారంగా…&rdquo;</blockquote>
                    <p>దిశా నిర్దేశం లేకుండా జీవితంలో అటూ ఇటూ తిరిగిన నన్ను…</p>
                </div>

                <div className="verse-pair">
                    <blockquote>&ldquo;నీ కళ్ల సంకెళ్లతో బంధించిన సఖీ…&rdquo;</blockquote>
                    <p>నీ కళ్లే సంకెళ్లుగా మారి నన్ను బంధించాయి. కానీ అది బానిసత్వం కాదు. ప్రేమ అనే మధుర బంధం.</p>
                </div>

                <div className="verse-pair">
                    <blockquote>&ldquo;పో పొమ్మన్న పోలేనులే నిను దాటి ఎన్నటికి…&rdquo;</blockquote>
                    <p>నువ్వు వెళ్లిపో అన్నా కూడా, నిన్ను దాటి నేను ఎప్పటికీ వెళ్లలేను.</p>
                </div>

                <div className="verse-pair">
                    <blockquote>&ldquo;ఏదో ఏదో వెతికి ఏం కావాలో తెలిసింది ఇపుడే…&rdquo;</blockquote>
                    <p>ఇన్నాళ్లు ఏదో వెతికాను. కానీ నిజంగా వెతుకుతున్నది నువ్వేనని ఇప్పుడు అర్థమైంది.</p>
                </div>

                <div className="verse-pair">
                    <blockquote>&ldquo;ఏకాంతంలో నలిగే ఆ తపనేంటో తెలిసింది ఇపుడే…&rdquo;</blockquote>
                    <p>ఒంటరితనంలో మనసును వేధించే ఆ వెలితి ఏమిటో ఇప్పుడు తెలిసింది. అది నీ కోసం ఎదురుచూస్తున్న హృదయమే.</p>
                </div>

                <div className="verse-pair">
                    <blockquote>&ldquo;నీ చెంతనే నిలిచే క్షణం మగజన్మకు మరుజన్మే…&rdquo;</blockquote>
                    <p>నీ పక్కన గడిపే ఒక్క క్షణమే ఇంకో జన్మ దొరికినంత విలువైనది.</p>
                </div>

                <div className="verse-pair">
                    <blockquote>&ldquo;నీవాసనే తగిలే క్షణం తలొంచింది నాలోని గర్వం…&rdquo;</blockquote>
                    <p>నీ పరిమళం తాకిన క్షణంలోనే నా అహంకారం కరిగిపోయింది. ప్రేమ ముందు గర్వం నిలవలేకపోయింది.</p>
                </div>

                <div className="verse-pair">
                    <blockquote>&ldquo;ఏ వీరుడైనా గానీ దాసోహమైపోడా…&rdquo;</blockquote>
                    <p>ఎంత ధైర్యవంతుడైనా, ఎంత గర్విష్ఠుడైనా, ఇలాంటి ప్రేమ ముందు తలవంచక తప్పదు.</p>
                </div>

                <div className="verse-pair">
                    <blockquote>&ldquo;ఓ సుందరి మనోహరి మనసే నిన్నే తిలకించగా…&rdquo;</blockquote>
                    <p>నా మనసు ఇప్పుడు నిన్నే చూస్తోంది. నిన్నే ధ్యానిస్తోంది.</p>
                </div>

                <div className="verse-pair">
                    <blockquote>&ldquo;ప్రశాంతమో ప్రవాహమై వస్తుంది నా దరికి…&rdquo;</blockquote>
                    <p>నిన్ను తలచుకున్న ప్రతిసారీ, ఒక ప్రశాంతమైన నది నా మనసులో ప్రవహించినట్లుంటుంది.</p>
                </div>

                <h2>చివరిగా…</h2>
                <p>
                    మన తెలుగు సినీ సంగీతంలో ఒకప్పుడు వేటూరి, ఆత్రేయ, సిరివెన్నెల వంటి మహాకవులు ప్రతి పాటను ఒక కవితగా మలిచేవారు. ఇటీవలి కాలంలో అలాంటి పదసౌందర్యం చాలా అరుదుగా కనిపిస్తోంది.
                </p>
                <p>
                    &ldquo;ఓ సుందరి&rdquo; ఆ సంప్రదాయాన్ని మళ్లీ గుర్తు చేసింది.
                </p>
                <p>
                    ప్రేమను వర్ణించడం కొత్త విషయం కాదు. కానీ ప్రేమను తెలుగు భాష సౌందర్యంతో వర్ణించడం మాత్రం చాలా అరుదు. ఈ పాట ఆ అరుదైన జాబితాలో చేరిపోతుంది.
                </p>
                <p>
                    ఇలాంటి పాటలు ఎక్కువ కావాలి. వినడానికి మాత్రమే కాదు… మన తెలుగు భాష ఇంకా ఎంత అందంగా రాయవచ్చో గుర్తు చేయడానికి.
                </p>
                <p>
                    ఈ వ్యాసం కేవలం ఒక పాటను ప్రశంసించడం కాదు; మంచి తెలుగు సాహిత్యం మళ్లీ ప్రధాన ప్రవాహంలోకి రావాలనే ఆకాంక్షను కూడా వ్యక్తం చేస్తుంది.
                </p>
            </div>
        ),
        contentEn: (
            <>
                <figure style={{ margin: '0 0 2.5rem', textAlign: 'center' }}>
                    <img
                        src="/rao-bahadur-song.png"
                        alt="Rao Bahadur"
                        style={{ width: '100%', maxWidth: '780px', borderRadius: '10px', border: '1px solid var(--border)' }}
                    />
                    <figcaption style={{ marginTop: '0.75rem', fontSize: '0.85rem', color: 'var(--muted)' }}>
                        Rao Bahadur
                    </figcaption>
                </figure>

                <p><em>After many years, a genuinely good Telugu love song.</em></p>

                <p>
                    Some songs are pleasant to listen to. Some songs stay with you. But very rarely, a song comes along that reminds you all over again how beautiful the Telugu language can be.
                </p>
                <p>
                    The last time I heard a song like that was &ldquo;Sirivennela&rdquo; from Shyam Singha Roy, written by Sirivennela Seetharama Sastry. After that, I hadn&apos;t heard a love song with that richness of words, that depth of feeling.
                </p>
                <p>
                    Filling that emptiness, &ldquo;Oh Sundari&rdquo; from Rao Bahadur has now arrived.
                </p>
                <p>
                    For much of the film the story moves gently at its own pace. In the exact moment you begin to feel, as a viewer, that something more is needed, this song begins. And what appears on screen after that is not merely a song, it is a visual poem of love.
                </p>
                <p>
                    The director never portrays the hero&apos;s love as exaggeration, nor does he treat it as a formality. He captures the change taking place inside a person who has fallen in love with real tenderness. Add to that Vijay Yesudas&apos;s voice, the soft music, and the delicate cinematography, and these three together hold the song up like a small film.
                </p>
                <p>
                    I noticed something interesting in the theatre. The audience, until then talking and shifting in their seats, fell silent the moment this song began. Unexpectedly, the song drew everyone into itself. For a good song, what greater praise could there be?
                </p>
                <p>
                    But the real strength of this song is not the music. It is the writing.
                </p>

                <figure style={{ margin: '2rem 0' }}>
                    <div style={{ position: 'relative', width: '100%', paddingBottom: '56.25%', borderRadius: '12px', overflow: 'hidden', border: '1px solid var(--border)' }}>
                        <iframe
                            src="https://www.youtube-nocookie.com/embed/EU8ct98ZvCg"
                            title="Oh Sundari, Rao Bahadur"
                            loading="lazy"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }}
                        />
                    </div>
                    <figcaption style={{ marginTop: '0.75rem', fontSize: '0.85rem', color: 'var(--muted)', textAlign: 'center' }}>
                        Play the song while you read the lyrics below.
                    </figcaption>
                </figure>

                <hr />

                <div className="verse-pair">
                    <blockquote>&ldquo;పసిడి వన్నె పూల తీగలా… అల్లుకుంది నన్నిలా…&rdquo;</blockquote>
                    <p>Just as a golden flowering vine winds itself around a tree and grows, she has wound herself around my life and my heart, the poet says.</p>
                </div>

                <div className="verse-pair">
                    <blockquote>&ldquo;తరానికే తరుణీమణి, తరించనీ నయనాలనీ…&rdquo;</blockquote>
                    <p>A young woman who stands as an ideal for an entire generation. It is impossible to turn your eyes away from the beauty of hers.</p>
                </div>

                <div className="verse-pair">
                    <blockquote>&ldquo;వినువీధిలో నితారా, ఇల చేరే కాంతిధారా…&rdquo;</blockquote>
                    <p>As if a star shining in the sky came down to earth and stepped into my life like a stream of light.</p>
                </div>

                <div className="verse-pair">
                    <blockquote>&ldquo;చూస్తే చాలు వదనం… లోలో ఏదో మధనం…&rdquo;</blockquote>
                    <p>One look at her face is enough. An indescribable, sweet turmoil begins in the heart. That itself is the first definition of love.</p>
                </div>

                <div className="verse-pair">
                    <blockquote>&ldquo;సంచారినై ఎటో ఎటో తిరిగే నన్నే అధికారంగా…&rdquo;</blockquote>
                    <p>Me, who had wandered aimlessly here and there through life…</p>
                </div>

                <div className="verse-pair">
                    <blockquote>&ldquo;నీ కళ్ల సంకెళ్లతో బంధించిన సఖీ…&rdquo;</blockquote>
                    <p>Your eyes themselves became chains and bound me. But it is not bondage. It is the sweet bond called love.</p>
                </div>

                <div className="verse-pair">
                    <blockquote>&ldquo;పో పొమ్మన్న పోలేనులే నిను దాటి ఎన్నటికి…&rdquo;</blockquote>
                    <p>Even if you tell me to leave, I can never go past you, not ever.</p>
                </div>

                <div className="verse-pair">
                    <blockquote>&ldquo;ఏదో ఏదో వెతికి ఏం కావాలో తెలిసింది ఇపుడే…&rdquo;</blockquote>
                    <p>All this time I searched for something. But now I understand that what I was truly searching for was you.</p>
                </div>

                <div className="verse-pair">
                    <blockquote>&ldquo;ఏకాంతంలో నలిగే ఆ తపనేంటో తెలిసింది ఇపుడే…&rdquo;</blockquote>
                    <p>The longing that troubled the heart in solitude, I now understand what it was. It was a heart waiting for you.</p>
                </div>

                <div className="verse-pair">
                    <blockquote>&ldquo;నీ చెంతనే నిలిచే క్షణం మగజన్మకు మరుజన్మే…&rdquo;</blockquote>
                    <p>A single moment spent beside you is as precious as being granted another lifetime.</p>
                </div>

                <div className="verse-pair">
                    <blockquote>&ldquo;నీవాసనే తగిలే క్షణం తలొంచింది నాలోని గర్వం…&rdquo;</blockquote>
                    <p>The very moment your fragrance touched me, my pride bowed its head. Pride cannot stand before love.</p>
                </div>

                <div className="verse-pair">
                    <blockquote>&ldquo;ఏ వీరుడైనా గానీ దాసోహమైపోడా…&rdquo;</blockquote>
                    <p>However brave, however proud a man may be, before a love like this he has no choice but to surrender.</p>
                </div>

                <div className="verse-pair">
                    <blockquote>&ldquo;ఓ సుందరి మనోహరి మనసే నిన్నే తిలకించగా…&rdquo;</blockquote>
                    <p>My heart now looks only at you. It contemplates only you.</p>
                </div>

                <div className="verse-pair">
                    <blockquote>&ldquo;ప్రశాంతమో ప్రవాహమై వస్తుంది నా దరికి…&rdquo;</blockquote>
                    <p>Every time I think of you, a calm river seems to flow toward me, through my heart.</p>
                </div>

                <h2>In the end</h2>
                <p>
                    There was a time in our Telugu film music when poets like Veturi, Aatreya, and Sirivennela shaped every song into a poem. In recent years, that kind of beauty of words has become rare.
                </p>
                <p>
                    &ldquo;Oh Sundari&rdquo; reminded us of that tradition again.
                </p>
                <p>
                    Describing love is nothing new. But describing love with the beauty of the Telugu language is very rare. This song joins that rare list.
                </p>
                <p>
                    We need more songs like this. Not only to listen to, but to remind us how beautifully the Telugu language can still be written.
                </p>
                <p>
                    This piece is not merely praise for one song; it is also a wish that good Telugu writing find its way back into the mainstream.
                </p>
            </>
        )
    },
    {
        slug: "for-mahesh-babu",
        title: "Why Mahesh Babu Is the Most Versatile Actor in the Country",
        date: "Jun 2026",
        tags: ["Cinema"],
        excerpt: "A fan letter, twenty-three years after a kabaddi line in Okkadu landed on an eight-year-old in a summer matinee. On why he is the most versatile actor in the country, and why Varanasi is the frame he has been waiting for.",
        content: (
            <>
                <figure style={{ margin: '0 0 2.5rem', textAlign: 'center' }}>
                    <img
                        src="/mahesh_babu.jpeg"
                        alt="Mahesh Babu"
                        style={{ width: '100%', maxWidth: '520px', borderRadius: '10px', border: '1px solid var(--border)' }}
                    />
                    <figcaption style={{ marginTop: '0.75rem', fontSize: '0.85rem', color: 'var(--muted)' }}>
                        Mahesh Babu.
                    </figcaption>
                </figure>

                <p>
                    I was eight years old in April 2003 when I walked into Swamy Cinema Hall in Rajahmundry with my brother and my cousin brother. The film had released in January. We were watching it in April, in summer holidays, and the show was still housefull. The film was Okkadu.
                </p>
                <p>
                    I didn&apos;t know what versatile meant. I didn&apos;t know what restraint in acting was. I just knew a full-scale heroic action block was on the screen, Ajay was cutting through Obul Reddy&apos;s goons to save Swapna, and somewhere in the middle of that fight, protecting her behind him, he turned and said this:
                </p>
                <blockquote style={{ borderLeft: '2px solid var(--primary)', paddingLeft: '1.25rem', margin: '1.5rem 0', fontStyle: 'italic', color: 'var(--foreground)' }}>
                    Nenu mee ooru kabaddi aadataniki vachanu. Kaani aadalsindi ground lo kaadu, ikkada ani ardham ayindi.
                </blockquote>
                <p>
                    He didn&apos;t smile. That is what people who haven&apos;t watched the scene always get wrong, they assume there is a smile. There isn&apos;t. The line is delivered flat, hard, all resolve, everything a lesser actor would have softened with a held-back grin. And then the cut. The goons still searching for him. All you can hear is his breath. All he does is look. No score. Nothing.
                </p>
                <p>
                    Twenty-three years later that cut, from the line to the breath, is still the cleanest piece of acting I have seen in a Telugu film. That was the day.
                </p>

                <figure style={{ margin: '2rem 0', textAlign: 'center' }}>
                    <img
                        src="/okkadu.jpg"
                        alt="Mahesh Babu in Okkadu (2003)"
                        style={{ width: '100%', maxWidth: '720px', borderRadius: '10px', border: '1px solid var(--border)' }}
                    />
                    <figcaption style={{ marginTop: '0.75rem', fontSize: '0.85rem', color: 'var(--muted)' }}>
                        Okkadu (2003). Where, for a lot of us, it started.
                    </figcaption>
                </figure>
                <p>
                    This isn&apos;t a review. It&apos;s a fan&apos;s log of what I have watched him do since. I&apos;m not comparing him to anyone. I just want to write down why I think he is the most versatile actor working in this country, and why I am quietly losing my mind about Varanasi.
                </p>

                <h2>What he has actually done</h2>
                <p>
                    Take 2003 alone. The same year Okkadu released, he played Seetaram in <strong>Nijam</strong> for Teja, a young man whose father, a fire officer, has been framed and imprisoned by a local goon named Devudu. The whole film is Seetaram working his way through the town to get his father back. It won him his first Best Actor Nandi. Two lead roles, same year, no shared DNA between them. That isn&apos;t someone figuring himself out. That&apos;s someone who already knew what he could do.
                </p>
                <p>
                    Then <strong>Naani (2004)</strong>, S. J. Suryah. The premise is a dare. An eight-year-old kid, mistreated at home, is taken in by a scientist who converts him into a 28-year-old adult. But the change isn&apos;t clean: he is a child by day and a grown man by night. Mahesh plays both, and refuses to sell the child version as cute. It didn&apos;t land commercially in Telugu. The performance is still the cleanest example of what he is willing to risk for a part.
                </p>
                <p>
                    <strong>Athadu (2005)</strong>, first collaboration with Trivikram. Nanda Gopal, Nandu, a hired assassin, gets framed, goes on the run, and ends up in the village of a family who mistakes him for Pardhu, the son they lost years earlier. The whole film lives inside his double life. In the second-half climax there is a scene with the grandfather where, for half a second, his face breaks and he pulls it back. That half-second is the second Nandi.
                </p>
                <p>
                    <strong>Pokiri (2006)</strong> is the loudest part he has ever played, and even here he underplays. Pandu, a small-time goon in the Ali Bhai gang, turns out to be Krishna Manohar IPS, undercover. Everyone around him screams. He keeps the volume down. The industry spent the next decade copying the template. Nobody made it work without him because the stillness was doing the work.
                </p>
                <p>
                    <strong>Khaleja (2010)</strong>, Trivikram again. Alluri Sitarama Raju, a Hyderabad cab driver, ends up in Rajasthan, where a tantric priest and his pupil identify him as the saviour of the village of Pali, dying from a mysterious plague. The film is mythological, comic, absurd, action-loaded, sometimes at the same time. Mahesh refuses to over-explain any of it, and refuses to under-play any of it. Released to confused reviews. Cult favourite now.
                </p>
                <p>
                    <strong>Dookudu (2011)</strong>, Srinu Vaitla. Comedy. He is DCP Ajay Kumar, IPS, whose father is a politician in coma. The film is packed with Brahmi, MS Narayana, Prakash Raj, Sonu Sood. Mahesh isn&apos;t the funniest thing in the frame. He&apos;s the reason the funny things land. Timing engine. Setup man. Nobody in Telugu cinema talks about him doing that job, but he does it. Filmfare Best Actor. Third Best Actor Nandi.
                </p>
                <p>
                    <strong>1: Nenokkadine (2014)</strong>. Sukumar wrote Gautham, a rock musician with schizophrenia, missing a quarter of his brain&apos;s grey matter, chasing three men he saw murder his parents as a child, except nobody else can see them. The role needs the actor to be uncertain about his own reality, and the audience to be uncertain about him. Mahesh took the part. He gave it a coolness on the surface and a visible crack underneath. Audiences didn&apos;t know what to do with it in 2014. It is the best acting he has done, and it&apos;s not close.
                </p>
                <p>
                    <strong>Srimanthudu (2015)</strong>, Koratala Siva. Harsha Vardhan, silver-spoon billionaire&apos;s son, adopts the ancestral village of Devarakota. The premise is public-service material. He plays the character&apos;s boredom so honestly that the pivot to farming and reform feels like an actual man remembering something. Real NRIs adopted villages after the film released. Fifth Filmfare Best Actor.
                </p>
                <p>
                    <strong>Bharat Ane Nenu (2018)</strong>, Koratala again. Bharat Ram, an Oxford student on his fifth degree, returns to India after his father, the Chief Minister of AP, dies, and finds himself sworn in as CM. The script wants big speeches. Mahesh doesn&apos;t raise his voice once. In the film&apos;s most powerful scene he talks to a room of MLAs the way you talk to family at a funeral, and none of them can look at him.
                </p>
                <p>
                    <strong>Maharshi (2019)</strong>, Vamshi Paidipally. K. Rishi Kumar, US-based CEO of a company called Origins. Older than Harsha, more tired, less sure. Walks away from all of it to save the farming community his childhood friend has been holding together alone. He plays the moment where the decision to leave finally lands, sitting alone in his glass office, and the film could have ended in that shot.
                </p>
                <p>
                    That is ten. He has done twenty-eight. Varanasi will be his twenty-ninth and his first with Rajamouli. Five Filmfare Best Actor wins. Nine Nandis, three of them Best Actor. Four SIIMA Best Actor. There is not a decade in there without a serious performance.
                </p>

                <h2>Trivikram was right</h2>
                <p>
                    Trivikram Srinivas has directed him three times, Athadu, Khaleja, and Guntur Kaaram, and has watched him build each of those characters up close. He said this about him once:
                </p>
                <blockquote style={{ borderLeft: '2px solid var(--primary)', paddingLeft: '1.25rem', margin: '1.5rem 0', fontStyle: 'italic' }}>
                    Cinema fail avochu, Mahesh fail avadu.
                    <br />
                    <span style={{ fontStyle: 'normal', color: 'var(--muted)', fontSize: '0.95rem' }}>Cinema may fail. Mahesh will not.</span>
                </blockquote>
                <p>
                    Both Khaleja and 1: Nenokkadine were commercial disappointments on release. The performance in each is the reason we still talk about the film today. That is what Trivikram was pointing at. The actor is not tied to whether the film around him works. He shows up either way.
                </p>
                <p>
                    If you have watched enough of him, you know what that means.
                </p>

                <h2>He stayed</h2>
                <p>
                    Every other pan-India lead was moving to Bombay, learning Hindi, chasing the bigger market. Mahesh didn&apos;t. He has never done a Hindi film in his career. He stayed with Telugu, and trusted the work would travel.
                </p>
                <p>
                    It did. Baahubali cracked the door. RRR walked through it. Pushpa broke it wide open in the masala lanes. The centre of gravity of Indian cinema moved to Telugu without Mahesh having to leave. Staying is a different kind of courage than going, and I don&apos;t think we talk about it enough.
                </p>

                <h2>Varanasi</h2>

                <figure style={{ margin: '2rem 0', textAlign: 'center' }}>
                    <img
                        src="/varanasi-title.png"
                        alt="Varanasi (Rajamouli x Mahesh Babu) title card"
                        style={{ width: '100%', maxWidth: '820px', borderRadius: '10px', border: '1px solid var(--border)' }}
                    />
                </figure>

                <p>
                    And then there is Varanasi.
                </p>
                <p>
                    November 15, 2025. Ramoji Film City. Fifty thousand fans. Live on JioHotstar. The crowd chanting <em>Jai Babu, Jai Jai Babu</em> for hours. At the end of it Rajamouli walked on stage and revealed the film&apos;s title, the one he had been preparing for years. Varanasi.
                </p>
                <p>
                    Then he played the concept reel.
                </p>

                <figure style={{ margin: '2rem 0', textAlign: 'center' }}>
                    <img
                        src="/varanasi-globetrotter.jpg"
                        alt="The Globetrotter Event at Ramoji Film City, November 15, 2025"
                        style={{ width: '100%', maxWidth: '760px', borderRadius: '10px', border: '1px solid var(--border)' }}
                    />
                    <figcaption style={{ marginTop: '0.75rem', fontSize: '0.85rem', color: 'var(--muted)' }}>
                        Mahesh on the screen as Rudhra at the Globetrotter Event, Ramoji Film City, November 15, 2025.
                    </figcaption>
                </figure>

                <p>
                    Mahesh was on the screen as <strong>Rudhra</strong>, a trishul in his hand, riding a charging bull. Priyanka Chopra Jonas as <strong>Mandakini</strong>. Prithviraj Sukumaran as the antagonist, <strong>Kumbha</strong>. The film, Rajamouli said, spans thousands of years, from ancient Bharat to the modern day, with one sequence inspired by a chapter from the Ramayana. The story turns on the city of Varanasi facing the impending arrival of an asteroid. Globetrotting adventure with Indian roots.
                </p>

                <figure style={{ margin: '2rem 0', textAlign: 'center' }}>
                    <img
                        src="/varanasi-rama.jpg"
                        alt="A warrior at sunset, bow in hand"
                        style={{ width: '100%', maxWidth: '560px', borderRadius: '10px', border: '1px solid var(--border)' }}
                    />
                    <figcaption style={{ marginTop: '0.75rem', fontSize: '0.85rem', color: 'var(--muted)' }}>
                        One sequence of Varanasi is inspired by a chapter of the Ramayana.
                    </figcaption>
                </figure>

                <p>
                    Then Rajamouli mentioned the format. 1.43:1 IMAX. First Indian film. First non-English film in cinema history in that ratio. The frame Nolan uses for Oppenheimer and Dunkirk. The frame that makes a single human face fill an entire IMAX screen.
                </p>
                <p>
                    Sit with that for a second.
                </p>
                <p>
                    Mahesh&apos;s face has been the whole scene since 2003. The kabaddi-court cut. Nandu&apos;s half-second face-break. Pandu&apos;s stillness. Gautam&apos;s uncertain eyes. Rishi&apos;s decision-to-leave sit. Rajamouli, of all directors, is now going to shoot that face at IMAX 1.43:1 as Rudhra, in a sequence coded off the Ramayana, across millennia. The shot that is coming for us has not existed in Indian cinema before.
                </p>
                <p>
                    Not because Mahesh hasn&apos;t been an actor before. He has been an actor for as long as I have been watching him. The next dimension is because he is finally going to be inside a frame large enough for what he has been doing all along.
                </p>
                <p>
                    The film is out in summer 2027. There is a clock inside my head already.
                </p>

                <h2>A wish</h2>
                <p>
                    That eight-year-old is a long way from that April 2003 show now. My brother and my cousin brother are in different cities. We watched Okkadu together because that&apos;s what you did with brothers and cousins in the summer, with the show still housefull three months after release. The film and the line and the cut to the breath are still in all of us in some form.
                </p>
                <p>
                    If you have never watched him work, here&apos;s what I&apos;d do. Start with Athadu. Then 1: Nenokkadine, then Khaleja, then Nani. Sit with Maharshi. Watch Okkadu last, because that&apos;s where it starts, and you&apos;ll want to be armed for the kabaddi-court cut.
                </p>
                <p>
                    Then watch Varanasi with us. We are DHFM. We have been waiting twenty-three years for the rest of the world to catch up.
                </p>
                <p>
                    I don&apos;t need him to win an Oscar to know what he is. I would just like the rest of the world to sit inside one of his scenes for two minutes and figure it out on their own. If Varanasi is the film that gets them there, so be it.
                </p>
                <p>
                    He came to play kabaddi. He always knew the game wasn&apos;t on the ground.
                </p>
                <p style={{ fontSize: '1.5rem', textAlign: 'center', margin: '2.5rem 0 1.5rem', color: 'var(--primary)', letterSpacing: '0.01em' }}>
                    Varanasi to the world.
                </p>
                <p>
                    Mahesh, sir, thank you.
                </p>
                <p style={{ color: 'var(--muted)', fontStyle: 'italic', marginTop: '1rem' }}>
                    a fan since 2003
                </p>
            </>
        )
    },
    {
        slug: "how-small-we-are",
        title: "You Are Worried About Your Tuesday Meeting",
        date: "Mar 2026",
        tags: ["Cosmos"],
        excerpt: "Right now, somewhere 400 kilometres above your head, astronauts are watching sixteen sunrises a day. They sleep strapped to a wall. Meanwhile, you're stressed about a Tuesday meeting. Let's pull the camera back. Way, way back.",
        content: (
            <>
                <p>
                    Right now, somewhere above your head, about 400 kilometres above it, to be precise, astronauts are floating in a metal tube, watching sixteen sunrises a day. They brush their teeth with water that doesn't fall. They sleep strapped to a wall.
                </p>
                <p>Meanwhile, you're stressed about a Tuesday meeting.</p>
                <p>
                    I don't say that to be dismissive. The meeting matters. The deadline matters. The fight you had yesterday matters. I just want to spend a few minutes pulling the camera back. Way, way back.
                </p>

                <h2>Start with the basics</h2>
                <p>
                    Earth is a rock. A very nice rock, it has oceans and trees and coffee and people who invented jazz, but a rock. It's about 12,700 kilometres wide. The Sun, the thing that keeps all of us alive, is so large that you could fit 1.3 million Earths inside it.
                </p>
                <p>
                    And the Sun is not special. There are stars so large that if you swapped one in for our Sun, it would swallow Mercury, Venus, Earth, Mars, and extend past Jupiter. Our Sun is a small, quiet, unremarkable star in a pretty average part of its galaxy.
                </p>
                <figure style={{ margin: '2rem 0', textAlign: 'center' }}>
                    <img
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Star-sizes.jpg/1280px-Star-sizes.jpg"
                        alt="Star size comparison, from Earth to the largest known stars"
                        style={{ width: '100%', maxWidth: '700px', borderRadius: '8px', border: '1px solid var(--border)' }}
                    />
                    <figcaption style={{ marginTop: '0.75rem', fontSize: '0.85rem', color: 'var(--muted)' }}>
                        Left to right: Earth, the Sun, some bigger stars, and then stars so large the Sun becomes invisible. This chart goes on further than what fits here. Credit: Dave Jarvis, Wikimedia Commons (CC BY-SA 3.0)
                    </figcaption>
                </figure>

                <h2>The neighborhood</h2>
                <p>
                    Our solar system stretches about 100 astronomical units from the Sun. One astronomical unit is the distance from Earth to the Sun, about 150 million kilometres. Voyager 1, launched in 1977, has been flying at 17 kilometres <em>per second</em> since then. It's only just now leaving the solar system.
                </p>
                <p>
                    That's our neighborhood. After nearly fifty years of travel, at 17 kilometres per second, we've barely left the driveway.
                </p>
                <p>
                    In 1990, as Voyager 1 was heading out, Carl Sagan convinced NASA to turn its camera around for one last photograph. From 6 billion kilometres away, Earth shows up as a single pixel, barely that, a pale blue dot in a beam of scattered sunlight. Sagan wrote about that image, and there's one line that's never left me: <em>"That's here. That's home. That's us."</em>
                </p>
                <figure style={{ margin: '2rem 0', textAlign: 'center' }}>
                    <img
                        src="https://upload.wikimedia.org/wikipedia/commons/7/71/PaleBlueDot.jpg"
                        alt="The Pale Blue Dot, Earth photographed by Voyager 1 from 6 billion kilometres away, 1990"
                        style={{ width: '100%', maxWidth: '500px', borderRadius: '8px', border: '1px solid var(--border)' }}
                    />
                    <figcaption style={{ marginTop: '0.75rem', fontSize: '0.85rem', color: 'var(--muted)' }}>
                        Earth. From 6 billion kilometres away. The tiny speck in the beam of light. Every human who ever lived, every war ever fought, every love story ever written, on that dot. Credit: NASA/JPL-Caltech
                    </figcaption>
                </figure>

                <h2>The galaxy</h2>
                <p>
                    Our solar system is inside the Milky Way, which is about 100,000 light-years across. A light-year is how far light travels in a year. Light moves at 300,000 kilometres per second, in one second it goes around the Earth seven and a half times. At that speed, crossing just our galaxy takes a hundred thousand years.
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
                    The Milky Way has somewhere between 100 and 400 billion stars. The observable universe, the part we can see with our best telescopes, contains roughly two trillion galaxies. Each one with hundreds of billions of stars.
                </p>
                <p>
                    In 1995, astronomers pointed the Hubble telescope at a completely dark patch of sky, a region so empty it looked like nothing. They left the shutter open for ten days. Here is what came back:
                </p>
                <figure style={{ margin: '2rem 0', textAlign: 'center' }}>
                    <img
                        src="https://upload.wikimedia.org/wikipedia/commons/6/69/NASA-HS201427a-HubbleUltraDeepField2014-20140603.jpg"
                        alt="Hubble Ultra Deep Field, nearly 10,000 galaxies visible in a tiny patch of sky"
                        style={{ width: '100%', maxWidth: '760px', borderRadius: '8px', border: '1px solid var(--border)' }}
                    />
                    <figcaption style={{ marginTop: '0.75rem', fontSize: '0.85rem', color: 'var(--muted)' }}>
                        Hubble Ultra Deep Field, 2014. Nearly 10,000 galaxies in one photograph. Each galaxy has billions of stars. This was a tiny patch of sky that looked completely empty. Credit: NASA, ESA, H. Teplitz and M. Rafelski (IPAC/Caltech), A. Koekemoer (STScI), R. Windhorst (ASU), Z. Levay (STScI)
                    </figcaption>
                </figure>
                <p>
                    Almost every dot in that image is a galaxy. Not a star, a galaxy. Billions of suns, each. And this is from a patch of sky so small you'd need to hold a grain of sand at arm's length to cover it.
                </p>
                <p>
                    The numbers stop meaning anything at some point. Our brains aren't built for this scale. Two trillion galaxies, each with hundreds of billions of stars, many with planets, we don't even have a word for what that adds up to.
                </p>

                <h2>The part that gets me</h2>
                <p>
                    Some of the stars you can see tonight with your bare eyes are already dead. They burned out thousands of years ago. You're looking at ghosts, light that left those stars before cities existed, arriving right now, into your eye, as you stand outside.
                </p>
                <p>
                    The light from the Andromeda galaxy, our nearest large neighbor, left before humans existed. When those photons began their journey, there were no cities, no agriculture, no language. Our ancestors were figuring out fire. And that light, two and a half million years in transit, lands in your eye on a clear night.
                </p>
                <p>
                    Every time you look at the night sky you are looking back in time.
                </p>

                <h2>So what does any of this mean for your Tuesday?</h2>
                <p>
                    Here's the thing, I don't think the point is that nothing matters because we're small. That's the lazy conclusion. The universe is indifferent to your Tuesday meeting, yes. But it's also indifferent to everything else. Entire galaxies colliding. Stars exploding. None of it means anything at a cosmic level.
                </p>
                <p>
                    What's strange and worth holding onto is this: on this one tiny rock, in this unremarkable corner of one of two trillion galaxies, some matter arranged itself into forms that became curious about all of it. We built telescopes. We figured out the math. We pointed a camera at empty sky for ten days just to see what was there.
                </p>
                <p>
                    You are made of atoms forged in stars that died before the Earth existed. The iron in your blood was made in a supernova. You are, quite literally, star stuff that learned to worry about presentations.
                </p>
                <p>Maybe carry that with you into the meeting.</p>

                <p style={{ fontSize: '0.9rem', color: 'var(--muted)', paddingTop: '1.5rem', marginTop: '2rem' }}>
                    <em>If you want your sense of scale completely destroyed in a good way, look up "Hubble Ultra Deep Field" and spend five minutes with it. Also worth reading: Carl Sagan's Pale Blue Dot, specifically the chapter about the photograph above. It's short. It'll stay with you.</em>
                </p>
            </>
        )
    },
    {
        slug: "andromeda",
        tags: ["Cosmos"],
        title: "That Smudge in the Sky is a Trillion Stars. And It's Heading Here.",
        date: "Feb 2026",
        excerpt: "There's a faint fuzzy patch in the night sky that's easy to miss. It looks like a wispy cloud. It isn't. It's a galaxy two and a half million light-years away, and it's falling toward us.",
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
                    If you shrunk the Sun down to the size of a basketball, Earth would be a sesame seed orbiting 26 metres away. The next nearest star? Same basketball, but sitting in a different city, about 7,000 kilometres away. That's just to our closest neighbor.
                </p>
                <p>
                    In 1990, as Voyager 1 was leaving our solar system, Carl Sagan convinced NASA to turn the spacecraft's camera around for one last photo. From 6 billion kilometres away, Earth showed up as less than a single pixel, a pale blue dot in a beam of scattered sunlight.
                </p>
                <figure style={{ margin: '2rem 0', textAlign: 'center' }}>
                    <img
                        src="https://upload.wikimedia.org/wikipedia/commons/7/71/PaleBlueDot.jpg"
                        alt="The Pale Blue Dot, Earth photographed by Voyager 1 from 6 billion kilometres away, 1990"
                        style={{ width: '100%', maxWidth: '600px', borderRadius: '8px', border: '1px solid var(--border)' }}
                    />
                    <figcaption style={{ marginTop: '0.75rem', fontSize: '0.85rem', color: 'var(--muted)' }}>
                        Earth from 6 billion kilometres away. Voyager 1, 1990. "That's here. That's home. That's us.", Carl Sagan. Credit: NASA/JPL-Caltech
                    </figcaption>
                </figure>
                <p>
                    Our Sun is one of 300 billion stars in the Milky Way. The Milky Way is one of over two trillion galaxies we can observe. Most of those galaxies have hundreds of billions of stars. Most of those stars, we now know, have planets going around them.
                </p>
                <p>
                    The numbers stop meaning anything at some point. Our brains just aren't built for that scale. So instead of trying to hold it all, look at that smudge.
                </p>

                <h2>What Andromeda actually is</h2>
                <p>
                    Andromeda is our nearest large galactic neighbor. It's a spiral galaxy, same as the Milky Way, a flat spinning disc of stars with a massive black hole at the center and arms curling outward. It has about a trillion stars. We have around 300 billion. Andromeda is bigger.
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
                    We know this because of the Doppler effect, the same reason a car horn sounds higher as it drives toward you. Light does the same thing. When a light source moves toward you, the wavelengths get slightly compressed. Andromeda's light is blue-shifted. It's heading our way.
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
                    The word "collision" makes it sound catastrophic, but it won't be, at least not for individual stars. Galaxies are mostly empty space. The distances between stars are so vast that when two galaxies merge, their stars almost never actually hit each other. They pass through like two swarms of fireflies overlapping in the dark. Gravity twists both into strange new shapes, some stars get flung far out, clouds of gas get squeezed and collapse into new stars, it's more like a slow dance than a crash.
                </p>
                <p>
                    The merged galaxy has been nicknamed Milkomeda. It'll be a smooth oval cloud of ancient stars, no more graceful spiral arms on either side.
                </p>

                <h2>Can we ever actually go there?</h2>
                <p>
                    No. Not with anything we have, and not within any timeframe that means something to us.
                </p>
                <p>
                    Andromeda is 2.5 million light-years away. Our fastest spacecraft, Voyager 1, moves at about 17 km/s. At that speed, it would take roughly 45 billion years to reach Andromeda. The universe is only 13.8 billion years old. We'd need more than three times the age of everything that exists.
                </p>
                <p>
                    Even traveling at the speed of light, the absolute maximum allowed by physics, which no object with mass can actually reach, the trip one way takes 2.5 million years.
                </p>
                <p>
                    Maybe with physics we haven't discovered. Some way to fold space itself, to skip across the fabric of it rather than crawl along the surface. But that's an honest maybe, not something we know how to do.
                </p>

                <h2>The company we might have</h2>
                <p>
                    There are roughly 100 billion planets in the Milky Way alone. Andromeda has even more. And there are two trillion galaxies out there.
                </p>
                <p>
                    If just one in a million of those planets developed life, and we have no idea if that's too generous or too conservative, that's still a number so large it doesn't fit in language. Countless worlds, alive, right now. Some of them probably looking out at their own night sky. Maybe seeing a faint smudge that's us, and wondering the same things.
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

export const blogPosts: BlogPost[] = allPosts.filter((p) => !p.draft);
