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
        title: "అటువంటి మనిషి ఉన్నాడా?",
        date: "జూలై 2026",
        tags: ["ధర్మం", "సాహిత్యం", "చరిత్ర"],
        excerpt: "ఆదర్శ పురుషుడు అంటే ఎవరు అని మనం అడుగుతూనే ఉన్నాం, జవాబు మాత్రం అతని బంధాల్లోనే వెతుకుతున్నాం. రెండు వేల ఏళ్ళ క్రితం ఒక మహర్షి ఇదే ప్రశ్న అడిగారు. ముందు అత్యున్నత కొలబద్దను నిర్వచించి, తరువాత అలాంటివాడు అసలు ఉన్నాడా అని అడిగారు.",
        content: (
            <div className="te">
                <p>
                    ఒక ప్రశ్న నాకు తెలియకుండానే మళ్ళీ మళ్ళీ నా ముందుకు వస్తూ ఉంటుంది. నాయకత్వం గురించో, బంధాల గురించో, ఈ రోజుల్లో అందరూ మాట్లాడే &lsquo;పురుషత్వం&rsquo; గురించో మాట్లాడుతున్నప్పుడు, లోతుకు వెళ్తే అన్నింటి అడుగునా ఉన్నది ఒకే ప్రశ్న. <em>ఆదర్శ పురుషుడు అంటే ఎవరు?</em>
                </p>
                <p>
                    ఈ ప్రశ్న ఇప్పుడు అడిగితే జవాబులు వెంటనే వస్తాయి. మనసు విప్పి మాట్లాడాలి. స్త్రీలను గౌరవించాలి. దయ ఉండాలి, పట్టుదల ఉండాలి, డబ్బు విషయంలో బాధ్యత ఉండాలి, మంచి భర్తగా, మంచి తండ్రిగా ఉండాలి. ఇవేవీ తప్పు కాదు. ప్రతి ఒక్కటీ సాధించదగినదే. కానీ కాస్త గమనిస్తే ఒక విషయం కనబడుతుంది. ఈ జవాబులన్నీ ఒక మనిషిని అతని బంధాల ద్వారానే కొలుస్తున్నాయి. భాగస్వామితో ఎలా ఉంటాడో, ఇతరులతో ఎలా మాట్లాడతాడో, నలుగురిలో ఎంత పరిణతిగా ప్రవర్తిస్తాడో, అదే కొలమానం అయిపోయింది.
                </p>
                <p>
                    ఇవి నిజమైన కొలతలే. కానీ ఇవి మొత్తం విషయంలో ఒక చిన్న భాగం మాత్రమే. జీవితం ఒక మనిషిని మంచి తోడుగా ఉండమని మాత్రమే అడగదు. వాయిదా వేయలేని నిర్ణయాలు తీసుకోమంటుంది; దించుకోలేని బరువులు మోయమంటుంది. అందరూ కంగారు పడుతున్నప్పుడు నిలకడగా నిలబడమంటుంది. ఎవరూ చూడకపోయినా, సులభమైన తప్పుడు దారికి బదులు కష్టమైనా సరైన దారినే ఎంచుకోమంటుంది. ఒక బంధం మనిషి వ్యక్తిత్వాన్ని బయటపెడుతుంది; కానీ దాన్ని తయారు చేయదు. ఎవరైనా మెచ్చుకోక ముందే వ్యక్తిత్వం తయారైపోతుంది.
                </p>
                <p>
                    అంటే మనం అడుగుతున్న ప్రశ్నే తప్పేమో. &ldquo;మంచి భర్త అంటే ఎవరు&rdquo; కాదు, &ldquo;ఆకర్షణీయమైన మగవాడు అంటే ఎవరు&rdquo; అసలే కాదు. ఇంకా పాతది, ఇంకా లోతైనది. <em>అసలు ఒక మనిషి ఎలాంటి మనిషిగా ఎదగాలి?</em>
                </p>

                <h2>గుణసంపద</h2>
                <p>
                    రూపం, ఉద్యోగం, ఆస్తి, పేరు ప్రఖ్యాతులు, వీటి ప్రస్తావన లేకుండా ఆదర్శ పురుషుణ్ణి వర్ణించమంటే ఏం మిగులుతుంది? మిగిలేవి కొన్నే. అవి ఒకదాన్నొకటి పట్టుకుని జతలుగా నిలబడతాయి.
                </p>
                <p>
                    మొదట మిగిలేది <strong>శీలం</strong>. ఎందుకంటే చివరి వరకు నిలిచేది అదొక్కటే. యవ్వనం వెళ్ళిపోతుంది, అధికారం చేతులు మారుతుంది, డబ్బు వస్తూ పోతూ ఉంటుంది. శీలం మాత్రం చివరి శ్వాస వరకు తోడుగా ఉంటుంది. అది లేకపోతే తెలివి కుయుక్తి అవుతుంది, బలం క్రూరత్వం అవుతుంది, విజయం అహంకారం అవుతుంది. నిజమైన శీలం నిశ్శబ్దంగా ఉంటుంది. అరిచి చెప్పుకునే బలం కాదు, <strong>నిగ్రహమే</strong> అసలైన బలం. కత్తి ఎత్తడం ఎవరికైనా వస్తుంది. ఎప్పుడు ఎత్తకూడదో తెలిసినవాడే నమ్మదగినవాడు.
                </p>
                <p>
                    నిగ్రహానికి <strong>వివేకం</strong> తోడు లేకపోతే ప్రయోజనం లేదు. వివేకం అంటే జ్ఞానం కాదు. పుస్తకాల నిండా జ్ఞానం ఉంటుంది. అన్ని దారులూ సబబుగానే కనిపిస్తున్నప్పుడు ఏది చేయాలో తెలియడమే వివేకం. జీవితం మంచికీ చెడుకూ మధ్య తేలికైన ఎంపికను ఎప్పుడో గానీ ఇవ్వదు. సులభమైనదానికీ సరైనదానికీ మధ్యనే మనల్ని నిలబెడుతుంది. ఆ తేడా తెలిసినవాడే ఆదర్శ పురుషుడు. అతని మాటకు విలువ ఎందుకు ఉంటుందంటే, అతను మాటలు వృథా చేయడు కాబట్టి. <strong>సత్యం</strong> పలికే మనిషి నోరు విప్పితే అందరూ వింటారు. బాగా మాట్లాడతాడని కాదు; తన మాటను ఎన్నడూ సౌకర్యం కోసం అమ్ముకోలేదు కాబట్టి.
                </p>
                <p>
                    <strong>సామర్థ్యం</strong> బాధ్యతతో కలిసి నడుస్తుంది. మంచి ఉద్దేశాలు మంచివే, కానీ ఒక కుటుంబం నీ మీద ఆధారపడినప్పుడు ఉద్దేశాలు మాత్రమే సరిపోవు. సామర్థ్యం అహంకారం కాదు, అది ఒక సేవ. మనిషి ఎంత సమర్థుడైతే అంతమందికి సాయపడగలడు. కానీ సామర్థ్యానికి <strong>కృతజ్ఞత</strong> తోడు లేకపోతే అది త్వరగా చెడిపోతుంది. విజయానికి ఒక చెడ్డ అలవాటు ఉంది. &lsquo;నువ్వు ఒక్కడివే సాధించావు&rsquo; అని మనిషిని నమ్మించాలని చూస్తుంది. అది అబద్ధం. పైకి రావడానికి సాయపడిన ప్రతి చేతినీ గుర్తుంచుకున్నవాడి విజయం అహంకారంగా మారదు.
                </p>
                <p>
                    చివరివి అన్నిటికన్నా కష్టమైనవి. ఎందుకంటే ఆ యుద్ధం లోపల జరుగుతుంది. బద్ధకం, కోరిక, కోపం, అహం, నిరాశ, వీటిని అదుపులో ఉంచుకునే <strong>క్రమశిక్షణ</strong> ఎప్పటికీ ముగియని పోరాటం. రాజ్యాలు గెలిచినవాళ్ళను చరిత్ర గుర్తుపెట్టుకుంటుంది. కానీ ముందుగా తనను తాను గెలిచినవాడే అసలైన విజేత. దీనికి తోడుగా వచ్చేది <strong>వినయం</strong>. వినయం బలహీనత కాదు, ఆత్మవిశ్వాసం. తనతో తాను శాంతిగా ఉన్నవాణ్ణి ఇంకొకరి విజయం కలవరపెట్టదు. ఇక్కడే కోపం విషయంలో మన సంప్రదాయం ఈనాటి ఆలోచనతో విడిపోతుంది. అహం లోంచి, దురాశ లోంచి పుట్టిన కోపం నాశనం చేస్తుంది. కానీ అమాయకుల కోసం, సత్యం కోసం, ధర్మం కోసం లేచిన కోపం వేరు. అన్యాయం చూసి కోపం రాని మనిషి సౌమ్యుడు కాడు, అసంపూర్ణుడు. అతను తన బలాన్ని చంపడు. అదుపులో పెడతాడు.
                </p>

                <h2>రెండు వేల ఏళ్ళ నాటి కొలబద్ద</h2>
                <p>
                    ఇదంతా ఒక తాత్విక చర్చలా అనిపించవచ్చు. కాదు. రెండు వేల ఏళ్ళకు పూర్వమే ఒక మహర్షి సరిగ్గా ఇదే ప్రశ్న అడిగారు. అలాంటి సంపూర్ణ మానవుడు నిజంగా ఈ భూమి మీద నడిచాడా అని నిజాయితీగా తెలుసుకోవాలనే అడిగారు.
                </p>
                <p>
                    ఆయన ప్రశ్న మూడు శ్లోకాలుగా ఇప్పటికీ మిగిలి ఉంది:
                </p>
                <blockquote>
                    కో న్వస్మిన్ సాంప్రతం లోకే గుణవాన్ కశ్చ వీర్యవాన్ । ధర్మజ్ఞశ్చ కృతజ్ఞశ్చ సత్యవాక్యో దృఢవ్రతః ॥ చారిత్రేణ చ కో యుక్తః సర్వభూతేషు కో హితః । విద్వాన్ కః కః సమర్థశ్చ కశ్చైకప్రియదర్శనః ॥ ఆత్మవాన్ కో జితక్రోధో ద్యుతిమాన్ కోఽనసూయకః । కస్య బిభ్యతి దేవాశ్చ జాతరోషస్య సంయుగే ॥
                    <span style={{ color: 'var(--muted)', fontSize: '0.85rem', display: 'block', marginTop: '0.6rem' }}>
                        వాల్మీకి రామాయణం, బాలకాండ 1.1.2&ndash;4
                    </span>
                </blockquote>
                <p>
                    ధనవంతుడా, అందగాడా, ప్రసిద్ధుడా అని ఆయన అడగడం లేదు. పదహారు ప్రశ్నలు అడుగుతున్నారు. షోడశ గుణాలు. సంప్రదాయం వీటిని పున్నమి చంద్రుడి పదహారు కళలతో పోలుస్తుంది. వాల్మీకి తన నాయకుణ్ణి ఏ లోటూ లేని నిండు చంద్రుడిగా చూపిస్తున్నారు.
                </p>

                <p>
                    <strong>గుణవాన్</strong> (మంచితనం స్వభావంగా ఉన్నవాడు); <strong>వీర్యవాన్</strong> (పరాక్రమవంతుడు); <strong>ధర్మజ్ఞః</strong> (ధర్మం అంటే ఏమిటో తెలిసినవాడు); <strong>కృతజ్ఞః</strong> (చేసిన మేలు మరచిపోనివాడు); <strong>సత్యవాక్యః</strong> (మాట తప్పనివాడు); <strong>దృఢవ్రతః</strong> (పట్టిన పట్టు విడవనివాడు); <strong>చారిత్రవాన్</strong> (నడవడికలో మచ్చ లేనివాడు); <strong>సర్వభూతహితః</strong> (సకల ప్రాణుల మేలు కోరేవాడు); <strong>విద్వాన్</strong> (నిజమైన జ్ఞానం ఉన్నవాడు); <strong>సమర్థః</strong> (తలపెట్టినది చేయగలవాడు); <strong>ప్రియదర్శనః</strong> (చూసిన ప్రతి ఒక్కరికీ ఇష్టుడయ్యేవాడు); <strong>ఆత్మవాన్</strong> (తనను తాను జయించినవాడు); <strong>జితక్రోధః</strong> (కోపాన్ని గెలిచినవాడు); <strong>ద్యుతిమాన్</strong> (లోపలి నుంచి వెలిగే కాంతి ఉన్నవాడు); <strong>అనసూయకః</strong> (అసూయ లేనివాడు); చివరగా <strong>జాతరోషః</strong> (ధర్మం కోసం రోషం వస్తే దేవతలు సైతం భయపడేవాడు).
                </p>

                <p>
                    ఆ మహర్షి వాల్మీకి. నన్ను ప్రతిసారీ ఆపే విషయం ఇదే. ఆయన తన కావ్యాన్ని &ldquo;రాముడి గురించి చెప్పు&rdquo; అని మొదలు పెట్టలేదు. ముందు ఒక సంపూర్ణ మానవుడి నిర్వచనాన్ని పూర్తిగా నిర్మించి, తరువాత &ldquo;అలాంటివాడు అసలు ఉన్నాడా?&rdquo; అని అడిగారు. దానికి నారదుడి నోట వచ్చిన జవాబు ఒకే ఒక్క పేరు, చాలా సరళమైనది:
                </p>
                <blockquote>
                    ఇక్ష్వాకువంశప్రభవో రామో నామ జనైః శ్రుతః ॥
                    <span style={{ color: 'var(--muted-strong)', fontSize: '1rem', display: 'block', marginTop: '0.6rem' }}>
                        &ldquo;ఒకరు ఉన్నారు. ఇక్ష్వాకు వంశంలో జన్మించినవారు. జనం ఆయనను రాముడు అంటారు.&rdquo;
                    </span>
                    <span style={{ color: 'var(--muted)', fontSize: '0.85rem', display: 'block', marginTop: '0.6rem' }}>
                        బాలకాండ 1.1.8
                    </span>
                </blockquote>

                <h2>ఇది మనల్ని ఏం అడుగుతోంది</h2>
                <p>
                    నేను ఇది రామాయణం మళ్ళీ చెప్పడానికి రాయలేదు. కథ అందరికీ తెలుసు. దాని అడుగున దాగిన ప్రశ్నను, వాల్మీకి ఎవరి పేరూ చెప్పకముందే అడిగిన ఆ ప్రశ్నను, మనం మన గురించి అడగడమే మానేశాం. అందుకే రాశాను.
                </p>
                <p>
                    దాని స్థానంలో చిన్న చిన్న ప్రశ్నలు పెట్టుకున్నాం. విజయం సాధించు. అందరికీ నచ్చు. మంచి భాగస్వామిగా ఉండు. ఇవన్నీ నిజమే. కానీ ఒక్కో దిక్కు మాత్రమే. ఈ కాలపు అలవాటు ఏమిటంటే ఒక్క గుణాన్ని పట్టుకుని దాన్నే చివరి వరకు లాగడం. కానీ ఒంటరిగా సాగదీసిన ఏ గుణమైనా క్రమంగా అదే ఒక లోపంగా మారుతుంది. విజయమే పరమావధి అనుకున్నవాడు సమర్థుడై, లోపల ఖాళీ అయిపోతాడు. అందరూ మెచ్చాలనుకున్నవాడు వంగి వంగి వెన్నెముక లేనివాడవుతాడు. తోడు లేని బలం, జనం లోలోపల భయపడే బలం అవుతుంది. ఆ పదహారు గుణాల జాబితా చెప్పే అసలు పాఠం, మనం మర్చిపోయినదీ, ఇదే. మనిషి అంటే గట్టిగా పెంచిన ఒక్క గుణం కాదు. పాళ్ళు తప్పకుండా కలిసి ఉన్న ఎన్నో గుణాలు.
                </p>
                <p>
                    మరి ఎప్పటికీ పూర్తిగా అందుకోలేని ఇంత ఎత్తైన కొలబద్దతో ఏం చేయాలి? దాన్ని మార్కుల పట్టీలా కాదు, అద్దంలా చదవాలి. నేను ఈ పదహారు గుణాల జాబితా చదివితే, నాలో ఏవి తక్కువో నాకు వెంటనే తెలుస్తుంది. చాలామందికి అలానే తెలుస్తుంది. ఉపయోగం అదే. మనకున్న గుణాలు కాదు, ఆ జాబితా బయటపెట్టే లోటులు. కృతజ్ఞత మర్చిపోయిన సమర్థుడు. కోపం అదుపులో లేని నిజాయితీపరుడు. అన్యాయం చూసి కూడా కోపం రాని మంచివాడు. ఈ జాబితా &lsquo;రేపటికల్లా రాముడివి అయిపో&rsquo; అనదు. చంద్రుడి ఏ కళ నీకు తక్కువో చూసుకో, ఈ ఏడాది దాన్ని నింపుకో అంటుంది.
                </p>
                <p>
                    అంతే చాలు. ఏటా కాస్త ఎక్కువ నిజాయితీగా, కోపాన్ని అవసరమైన చోటే చూపిస్తూ, సామర్థ్యాన్ని అహంకారంగా మారనివ్వకుండా బతికే మనిషి ఎప్పటికీ పరిపూర్ణుడు కాడు. కానీ అతని ముఖం సరైన దిక్కుకు తిరిగి ఉంది. జీవితమంతా చూస్తే దూరం కన్నా దిక్కే ముఖ్యం. మనం ఎప్పటికీ నిండు చంద్రుడు కాలేకపోవచ్చు. నెల నెలా కొంచెం తక్కువ చీకటిగా ఉండగలం.
                </p>
                <p>
                    అందుకే ఇది రాసి పెట్టుకున్నాను. రాముణ్ణి ఎవరికో వివరించడానికి కాదు. అసలు ప్రశ్నను నా కళ్ళ ముందు ఉంచుకోవడానికి. <em>నేను బాగా చేస్తున్నానా</em> అని కాదు. <em>నేను ఏ దిక్కుకు నడుస్తున్నాను?</em>
                </p>
            </div>
        ),
        contentEn: (
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
                    Try to describe the ideal man without mentioning how he looks, what he does, what he owns, or whether people admire him. What is left? A few things, and they turn out to hold each other up in pairs.
                </p>

                <p>
                    The first thing left is <strong>character</strong>, because it is the only thing that stays. Youth fades, power changes hands, money comes and goes. Character stays with a man till his last breath. Without it, intelligence becomes cunning, power becomes cruelty, and success becomes arrogance. And real character is quiet. The strength that matters is not the loud kind that shows off and troubles the weak. It is <strong>restraint</strong>. Anyone can pick up a sword. The man worth trusting is the one who knows when not to.
                </p>
                <p>
                    But restraint is of no use without <strong>wisdom</strong>, and wisdom is not the same as knowledge. Books are full of knowledge. Wisdom is knowing what should be done when many choices all look reasonable. Life rarely gives a clean choice between right and wrong. It usually gives a choice between what is easy and what is right, and the ideal man can tell the difference. People trust his judgement because he does not waste words. When a <strong>truthful</strong> man finally speaks, others listen, not because he speaks well, but because he has never sold his word for convenience.
                </p>
                <p>
                    <strong>Capability</strong> goes hand in hand with responsibility. Good intentions are fine until a family depends on you, and then intentions alone are not enough. Being capable is not arrogance, it is a kind of service. The more capable a man is, the more people he can help. But capability without <strong>gratitude</strong> spoils quickly. Success likes to convince a man that he reached there alone. He did not. The ideal man remembers everyone who helped him rise, and that memory keeps his success from turning into pride.
                </p>
                <p>
                    The last group is the hardest, because it is fought in private. <strong>Discipline</strong> over yourself, over laziness, temptation, anger, ego and disappointment, is the one battle that never ends. History remembers those who won kingdoms, but the wiser man is the one who first won over himself. Along with it comes <strong>humility</strong>, which is not weakness but confidence. A man who is at peace with himself is never disturbed by another person&apos;s success. And here Indian tradition sees anger differently from the modern idea that anger is always bad. Anger from ego or greed destroys. But anger in defence of the innocent, of truth, of dharma, is a different thing altogether. A man who feels no anger before injustice is not gentle, he is incomplete. He does not kill his strength. He controls it.
                </p>
                <h2>The ancient benchmark</h2>
                <p>
                    This may sound like only a philosophical exercise. It is not. More than two thousand years ago, a sage asked this exact question, and he asked it plainly, because he genuinely wanted to know whether such a complete human being had ever really lived.
                </p>
                <p>
                    His question survives in three verses:
                </p>
                <blockquote>
                    కో న్వస్మిన్ సాంప్రతం లోకే గుణవాన్ కశ్చ వీర్యవాన్ । ధర్మజ్ఞశ్చ కృతజ్ఞశ్చ సత్యవాక్యో దృఢవ్రతః ॥ చారిత్రేణ చ కో యుక్తః సర్వభూతేషు కో హితః । విద్వాన్ కః కః సమర్థశ్చ కశ్చైకప్రియదర్శనః ॥ ఆత్మవాన్ కో జితక్రోధో ద్యుతిమాన్ కోఽనసూయకః । కస్య బిభ్యతి దేవాశ్చ జాతరోషస్య సంయుగే ॥
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

                <p>
                    <strong>guṇavān</strong> (virtuous, good at his core); <strong>vīryavān</strong> (valorous); <strong>dharmajña</strong> (knows dharma, what is right); <strong>kṛtajña</strong> (grateful, remembers every kindness); <strong>satyavākya</strong> (true to his word, always); <strong>dṛḍhavrata</strong> (steadfast in his vows); <strong>cāritravān</strong> (of spotless conduct); <strong>sarvabhūteṣu hita</strong> (wishes every living being well); <strong>vidvān</strong> (learned, truly wise); <strong>samartha</strong> (capable, able to act); <strong>priyadarśana</strong> (beloved by all who meet him); <strong>ātmavān</strong> (master of himself); <strong>jitakrodha</strong> (conqueror of his own anger); <strong>dyutimān</strong> (radiant, carries an inner light); <strong>anasūyaka</strong> (free of envy); and the sixteenth, <strong>jātaroṣa</strong> (so fierce in a just battle that even the gods fear him).
                </p>

                <p>
                    The sage was Valmiki, and notice the order he chose. He did not open his epic by saying <em>tell me about Rama.</em> He built the full description of a complete man first, and only then asked whether anyone had ever actually fit it. One name came back, and the answer is very simple:
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
                <h2>What this asks of us</h2>
                <p>
                    I did not write this to retell the Ramayana. Everyone already knows the story. I wrote it because the question hiding under it, the one Valmiki asked before he named anyone, is a question we have quietly stopped asking about ourselves.
                </p>
                <p>
                    We have swapped it for smaller ones. Be successful. Be likeable. Be productive. Be a good partner. Each of these is real, and each is only one direction, and the modern habit is to pick one and push it as far as it will go. But a single quality taken far enough on its own slowly turns into its own fault. The man who chases only success ends up capable and empty. The man who only wants to be liked ends up agreeable and spineless. Strength with nothing to balance it becomes something people quietly fear. This is what the sixteen understood and we forget: a man is not one quality turned up loud. He is many, kept in proportion.
                </p>
                <p>
                    So what do you do with a standard this high, knowing you will never fully meet it? You read it not as a scorecard but as a mirror. When I go through the sixteen, I can tell you at once which ones I am weak at, and most people can do the same for themselves. That is the useful part, not the qualities you already have, but the ones the list quietly exposes. The capable man who forgets to be grateful. The honest man with no control over his temper. The kind man who cannot find anger even when something truly deserves it. The list does not ask you to become Rama by morning. It asks you to see which phase of the moon you are missing, and to spend the year filling it in.
                </p>
                <p>
                    And that is enough. A man who becomes a little more truthful each year, who learns to spend his anger only on the things that deserve it, who stays capable without letting it harden into pride, will never be perfect. But he is facing the right way, and over a lifetime the direction matters more than the distance. We will never be the full moon. We can be a little less dark each month.
                </p>
                <p>
                    That is why I wrote this down. Not to explain Rama to anyone, but to keep the real question in front of myself. Not <em>am I doing well</em>, but <em>which way am I walking</em>.
                </p>
            </>
        )
    },
    {
        slug: "low-heat",
        title: "Low Heat",
        date: "జూలై 2026",
        tags: ["సినిమా"],
        draft: true,
        excerpt: "Breaking Bad and Better Call Saul never ask you to watch a man become a monster. They make you become one with him, slowly enough that you never feel it happen. On the characters, and the trick they play on you.",
        content: (
            <>

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
        date: "జూలై 2026",
        tags: ["తెలుగు", "సినిమా", "సాహిత్యం"],
        excerpt: "రావు బహదూర్ చిత్రంలోని \"ఓ సుందరి\" పాట, ఎన్నో సంవత్సరాల తర్వాత తెలుగు సినీ సాహిత్యంలోకి తిరిగి వచ్చిన అరుదైన పదసౌందర్యం గురించి.",
        content: (
            <div className="te">

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
        title: "మహేష్ బాబు ఎందుకు దేశంలోనే అత్యంత బహుముఖ నటుడు?",
        date: "జూన్ 2026",
        tags: ["సినిమా"],
        excerpt: "2003 వేసవి మ్యాట్నీలో ఒక్కడు సినిమాలోని ఒక్క డైలాగ్ ఒక ఎనిమిదేళ్ళ పిల్లాడి మీద పడింది. ఇరవై మూడేళ్ళ తర్వాతా ఆ అభిమానం చెక్కు చెదరలేదు. ఆయన ఎందుకు దేశంలోనే అత్యంత బహుముఖ నటుడో, వారణాసి ఎందుకు ఆయన కోసమే ఎదురుచూస్తున్న ఫ్రేమో.",
        content: (
            <div className="te">
                <p>
                    2003 ఏప్రిల్‌లో, వేసవి సెలవుల్లో, రాజమండ్రిలోని స్వామి సినిమా హాల్‌లోకి మా అన్నయ్యతో, బావతో కలిసి అడుగుపెట్టినప్పుడు నాకు ఎనిమిదేళ్ళు. సినిమా విడుదలై మూడు నెలలైనా హౌస్‌ఫుల్. ఆ సినిమా ఒక్కడు.
                </p>
                <p>
                    బహుముఖం అంటే ఏమిటో నాకు తెలియదు. నటనలో సంయమనం అంటే అసలు తెలియదు. తెర మీద ఒక పూర్తి స్థాయి యాక్షన్ ఘట్టం నడుస్తోందని మాత్రం తెలుసు. ఓబుల్ రెడ్డి మనుషులను చీల్చుకుంటూ అజయ్ స్వప్నను కాపాడటానికి వస్తున్నాడు. ఆ పోరాటం మధ్యలో, ఆమెను వెనక దాచి, ఆమెవైపు తిరిగి ఇలా అన్నాడు:
                </p>
                <blockquote>
                    నేను మీ ఊరు కబడ్డీ ఆడటానికి వచ్చాను. కానీ ఆడాల్సింది గ్రౌండ్‌లో కాదు, ఇక్కడ అని అర్థమైంది.
                </blockquote>
                <p>
                    ఆయన నవ్వలేదు. ఆ సీన్ చూడనివాళ్ళు పొరపడేది ఇక్కడే, అక్కడ ఒక చిరునవ్వు ఉందనుకుంటారు. లేదు. ఆ డైలాగ్ ఫ్లాట్‌గా, గట్టిగా, పూర్తి నిశ్చయంతో వస్తుంది. ఇంకో నటుడైతే సన్నని నవ్వుతో మెత్తబరిచేవాడు. ఆ తరువాత కట్. రౌడీలు ఇంకా అతని కోసం వెతుకుతూనే ఉన్నారు. వినిపించేది అతని ఊపిరి మాత్రమే. చేసేది చూపు మాత్రమే. మ్యూజిక్ లేదు. ఏమీ లేదు.
                </p>
                <p>
                    ఇరవై మూడేళ్ళ తర్వాత కూడా, ఆ డైలాగ్ నుంచి ఆ ఊపిరి దాకా ఉన్న ఆ కట్, తెలుగు సినిమాలో నేను చూసిన అత్యంత శుభ్రమైన నటన. అంతా మొదలైంది ఆ రోజే.
                </p>
                <p>
                    ఇది రివ్యూ కాదు. అప్పటి నుంచి ఆయనను చూస్తూ వచ్చిన ఒక అభిమాని రాసుకున్న దస్తావేజు. ఎవరితోనూ పోల్చడం లేదు. ఆయన ఈ దేశంలోనే అత్యంత బహుముఖ నటుడు అని నేను ఎందుకు నమ్ముతానో, వారణాసి గురించి నేను ఎందుకు నిద్రపోవడం లేదో, రాసి పెట్టుకోవాలనిపించింది. అంతే.
                </p>

                <h2>ఆయన అసలు ఏం చేశాడు</h2>
                <p>
                    2003 ఒక్క సంవత్సరం చాలు. ఒక్కడు విడుదలైన అదే ఏడాది, తేజ దర్శకత్వంలో నిజంలో సీతారాం. అగ్నిమాపక అధికారి అయిన తండ్రిని దేవుడు అనే రౌడీ కుట్రతో జైలుపాలు చేస్తే, ఆ తండ్రి కోసం ఊరి మీదకు ఒంటరిగా నడిచిన కుర్రాడి కథ. మొదటి నంది ఉత్తమ నటుడు దానికే. ఒకే ఏడాది రెండు పాత్రలు, రెండింటి మధ్య ఏ పోలికా లేదు. అది తనను తాను వెతుక్కుంటున్న నటుడు కాదు. తనకేం చేతనవుతుందో అప్పటికే తెలిసిన నటుడు.
                </p>
                <p>
                    మరుసటి ఏడాది నాని, ఎస్. జె. సూర్య దర్శకత్వం. కథే ఒక సవాలు. ఇంట్లో ఆదరణ లేని ఎనిమిదేళ్ళ పిల్లాడిని ఒక శాస్త్రవేత్త 28 ఏళ్ళ యువకుడిగా మారుస్తాడు. కానీ ఆ మార్పు సగమే. పగలు పిల్లాడు, రాత్రి పెద్దవాడు. మహేష్ రెండూ పోషించాడు, పిల్లాడి పాత్రను ముద్దుగా అమ్మే ప్రయత్నం ఎక్కడా చేయలేదు. సినిమా తెలుగులో ఆడలేదు. కానీ ఒక పాత్ర కోసం ఆయన ఎంత రిస్క్ చేయగలడో చెప్పే అతి శుభ్రమైన ఉదాహరణ ఇప్పటికీ అదే.
                </p>
                <p>
                    అతడు, 2005, త్రివిక్రమ్‌తో మొదటి సినిమా. నంద గోపాల్, నందు, ఒక కిరాయి హంతకుడు. ఒక నేరం మీదపడి పారిపోతూ, ఏళ్ళ క్రితం తప్పిపోయిన కొడుకు పార్థు అనుకుని ఒక పల్లె కుటుంబం అక్కున చేర్చుకుంటే అందులో ఒదిగిపోతాడు. సినిమా మొత్తం ఆ రెండు బతుకుల మధ్యే నడుస్తుంది. ద్వితీయార్ధం క్లైమాక్స్‌లో తాతయ్యతో ఒక సీన్. అర క్షణం పాటు ముఖం పగిలి, వెంటనే కూడదీసుకుంటుంది. ఆ అర క్షణమే రెండో నంది.
                </p>
                <p>
                    పోకిరి, 2006, ఆయన పోషించిన అత్యంత గట్టి పాత్ర. అందులోనూ అండర్‌ప్లే. అలీ భాయ్ ముఠాలో చిన్న రౌడీ పండు, చివరికి కృష్ణ మనోహర్ ఐపీఎస్ అని తేలుతుంది. చుట్టూ ఉన్న ప్రతివాడూ అరుస్తుంటే ఈయన వాల్యూమ్ తగ్గించాడు. ఆ తరువాతి పదేళ్ళు ఇండస్ట్రీ ఆ మూసనే కాపీ కొట్టింది. ఆయన లేకుండా అది ఎవరికీ వర్క్ అవ్వలేదు. అసలు పని చేస్తున్నది ఆ నిశ్శబ్దమే కాబట్టి.
                </p>
                <p>
                    ఖలేజా, 2010, మళ్ళీ త్రివిక్రమ్. హైదరాబాద్ ట్యాక్సీ డ్రైవర్ అల్లూరి సీతారామరాజు రాజస్థాన్ చేరి, వింత జబ్బుతో చస్తున్న పాలి గ్రామానికి దేవుడు పంపిన రక్షకుడని తేలే కథ. సినిమా ఒకేసారి పురాణం, కామెడీ, అసంబద్ధం, యాక్షన్. మహేష్ దేన్నీ ఎక్కువ వివరించలేదు, దేన్నీ తక్కువ చేయలేదు. విడుదలప్పుడు అయోమయపు రివ్యూలు. ఇవాళ కల్ట్ క్లాసిక్.
                </p>
                <p>
                    దూకుడు, 2011, శ్రీను వైట్ల. కామెడీ. కోమాలో ఉన్న రాజకీయ నాయకుడి కొడుకు, డీసీపీ అజయ్ కుమార్. చుట్టూ బ్రహ్మి, ఎమ్మెస్ నారాయణ, ప్రకాష్ రాజ్, సోనూ సూద్. ఫ్రేమ్‌లో అత్యంత ఫన్నీ మనిషి మహేష్ కాదు. కానీ ఫన్నీ విషయాలన్నీ పేలేది ఆయన వల్లే. టైమింగ్ ఇంజన్. సెటప్ మ్యాన్. ఆ పని గురించి ఎవరూ మాట్లాడరు, కానీ ఆయన చేస్తూనే ఉన్నాడు. ఫిల్మ్‌ఫేర్ ఉత్తమ నటుడు, మూడో నంది.
                </p>
                <p>
                    1: నేనొక్కడినే, 2014. సుకుమార్ రాసిన పాత్ర గౌతమ్. మెదడులో పావు వంతు గ్రే మ్యాటర్ లేని రాక్ మ్యుజీషియన్. చిన్నప్పుడు తల్లిదండ్రులను చంపిన ముగ్గురు కనిపిస్తూనే ఉంటారు, కానీ ఇంకెవరికీ కనిపించరు. తన నిజమే తనకు అనుమానమైన పాత్ర. మహేష్ ఒప్పుకున్నాడు. పైన చల్లదనం, లోపల పగులు. 2014లో ప్రేక్షకులకు ఏం చేయాలో అర్థం కాలేదు. కానీ ఆయన చేసిన అత్యుత్తమ నటన అదే, రెండో స్థానం దరిదాపుల్లో కూడా లేదు.
                </p>
                <p>
                    శ్రీమంతుడు, 2015, కొరటాల శివ. వేల కోట్ల వారసుడు హర్ష వర్ధన్ తన పూర్వీకుల ఊరు దేవరకోటను దత్తత తీసుకుంటాడు. వినడానికి ఒక ప్రభుత్వ ప్రకటనలా ఉంటుంది. కానీ ఆ ధనవంతుడి బతుకులోని వెలితిని మహేష్ ఎంత నిజాయితీగా చూపించాడంటే, ఆ మార్పు నమ్మశక్యమైంది. సినిమా రికార్డులు బద్దలు కొట్టింది. నిజమైన ఎన్నారైలు ఊళ్ళు దత్తత తీసుకున్నారు. ఐదో ఫిల్మ్‌ఫేర్.
                </p>
                <p>
                    భరత్ అనే నేను, 2018, మళ్ళీ కొరటాల. ఆక్స్‌ఫర్డ్‌లో ఐదో డిగ్రీ చదువుతున్న భరత్ రామ్, ముఖ్యమంత్రి అయిన తండ్రి మరణంతో తిరిగొచ్చి తనే సీఎం అవుతాడు. స్క్రిప్ట్ పెద్ద ఉపన్యాసాలు అడుగుతుంది. మహేష్ ఒక్కసారీ గొంతు పెంచలేదు. సినిమాలో అత్యంత బలమైన సీన్‌లో ఎమ్మెల్యేలతో, ఇంట్లో పెద్దదిక్కు పోయినప్పుడు బంధువులతో మాట్లాడినట్టు మాట్లాడతాడు. ఎవరూ ఆయన కళ్ళలోకి చూడలేరు.
                </p>
                <p>
                    మహర్షి, 2019, వంశీ పైడిపల్లి. అమెరికాలో ఆరిజిన్స్ కంపెనీ సీఈఓ రిషి కుమార్. హర్ష కన్నా పెద్దవాడు, అలసినవాడు, తక్కువ నిశ్చయం ఉన్నవాడు. చిన్ననాటి స్నేహితుడు ఒంటరిగా మోస్తున్న రైతుల కోసం అన్నీ వదిలేస్తాడు. వదిలేయాలన్న నిర్ణయం లోపల కూర్చున్న క్షణాన్ని గాజు ఆఫీసులో ఒంటరిగా కూర్చున్న ఒక్క షాట్‌లో చూపించాడు. సినిమా అక్కడితో ఆగిపోయినా సరిపోయేది.
                </p>
                <p>
                    ఇవి పది. ఆయన చేసినవి ఇరవై ఎనిమిది. వారణాసి ఇరవై తొమ్మిదోది, రాజమౌళి గారితో మొదటిది. ఐదు ఫిల్మ్‌ఫేర్ ఉత్తమ నటుడు అవార్డులు. తొమ్మిది నందులు, అందులో మూడు ఉత్తమ నటుడు. ఏ దశాబ్దం చూసినా అందులో ఒక సీరియస్ నటన ఉంది.
                </p>

                <h2>త్రివిక్రమ్ మాట</h2>
                <p>
                    అతడు, ఖలేజా, గుంటూరు కారం, మూడు సినిమాలు తీసిన త్రివిక్రమ్ శ్రీనివాస్ గారు ఆయన గురించి ఒకసారి ఇలా అన్నారు:
                </p>
                <blockquote>
                    సినిమా ఫెయిల్ అవ్వొచ్చు. మహేష్ ఫెయిల్ అవ్వడు.
                </blockquote>
                <p>
                    ఖలేజా, 1: నేనొక్కడినే, రెండూ విడుదలప్పుడు ఆడలేదు. కానీ ఆ సినిమాల గురించి ఇవాళ్టికీ మాట్లాడుకుంటున్నది అందులోని నటన వల్లే. త్రివిక్రమ్ గారు చూపించింది అదే. చుట్టూ ఉన్న సినిమా నిలబడినా కూలినా, ఈ నటుడు మాత్రం ప్రతిసారీ నిలబడతాడు.
                </p>

                <h2>ఆయన ఇక్కడే ఉండిపోయాడు</h2>
                <p>
                    పాన్ ఇండియా హీరోలంతా బొంబాయి వైపు చూస్తూ, హిందీ నేర్చుకుంటూ, పెద్ద మార్కెట్ వెంట పరుగెడుతున్న రోజుల్లో మహేష్ వెళ్ళలేదు. కెరీర్ మొత్తంలో ఒక్క హిందీ సినిమా చేయలేదు. తెలుగులోనే ఉండిపోయాడు. పని బాగుంటే అదే ప్రయాణిస్తుందని నమ్మాడు.
                </p>
                <p>
                    అదే జరిగింది. బాహుబలి తలుపు తీసింది. ఆర్ఆర్ఆర్ ఆ తలుపు గుండా నడిచింది. పుష్ప దాన్ని బార్లా తెరిచింది. భారత సినిమా గురుత్వ కేంద్రం తెలుగులోకి వచ్చింది, మహేష్ కదలకుండానే. వెళ్ళడం ఒక ధైర్యం. ఉండిపోవడం ఇంకో రకం ధైర్యం. దాని గురించి మనం తగినంత మాట్లాడుకోం.
                </p>

                <h2>వారణాసి</h2>
                <p>
                    ఇక వారణాసి. 2025 నవంబర్ 15. రామోజీ ఫిల్మ్ సిటీ. యాభై వేల మంది అభిమానులు. జియో హాట్‌స్టార్‌లో ప్రత్యక్ష ప్రసారం. గంటల తరబడి జై బాబు, జై జై బాబు నినాదాలు. చివరన రాజమౌళి గారు వేదిక మీదకు వచ్చి, ఏళ్ళ తరబడి సిద్ధం చేసుకుంటున్న సినిమా పేరు చెప్పారు. వారణాసి. తరువాత కాన్సెప్ట్ రీల్.
                </p>
                <p>
                    తెర మీద మహేష్, రుద్ర పాత్రలో. చేతిలో త్రిశూలం, పరుగెడుతున్న ఎద్దు మీద. ప్రియాంక చోప్రా జోనాస్ మందాకిని. ప్రతినాయకుడు కుంభగా పృథ్వీరాజ్ సుకుమారన్. కథ వేల సంవత్సరాల మీదుగా, ప్రాచీన భారతం నుంచి నేటి దాకా సాగుతుందని, అందులో ఒక ఘట్టం రామాయణంలోని ఒక అధ్యాయ స్ఫూర్తితో ఉంటుందని రాజమౌళి గారు చెప్పారు. కథ మలుపు, వారణాసి నగరం మీదకు దూసుకొస్తున్న ఒక గ్రహశకలం.
                </p>
                <p>
                    తరువాత ఫార్మాట్ గురించి చెప్పారు. 1.43:1 ఐమాక్స్. మొదటి భారతీయ సినిమా. ఆ ఫార్మాట్‌లో తీసిన మొదటి ఇంగ్లీషేతర సినిమా. నోలన్ ఓపెన్‌హైమర్, డన్కిర్క్ తీసిన ఫ్రేమ్. ఒక్క మనిషి ముఖం ఐమాక్స్ తెర మొత్తాన్ని నింపే ఫ్రేమ్.
                </p>
                <p>
                    ఒక్క క్షణం ఆగి ఆలోచించండి. 2003 నుంచి మహేష్ ముఖమే సీన్ మొత్తం. కబడ్డీ కోర్టు కట్. నందు అర క్షణపు పగులు. పండు నిశ్శబ్దం. గౌతమ్ అనుమానపు కళ్ళు. రిషి ఒంటరి గాజు గది. ఆ ముఖాన్ని రాజమౌళి గారు, రుద్రగా, రామాయణ ఛాయలో, ఐమాక్స్ 1.43:1లో తీయబోతున్నారు. మనవైపు వస్తున్న ఆ షాట్ భారత సినిమాలో ఇప్పటివరకూ లేదు.
                </p>
                <p>
                    సినిమా 2027 వేసవిలో. నా తలలో అప్పుడే ఒక గడియారం మొదలైంది.
                </p>

                <h2>ఒక కోరిక</h2>
                <p>
                    ఆ ఎనిమిదేళ్ళ పిల్లాడు ఇప్పుడు ఆ ఏప్రిల్ ఆట నుంచి చాలా దూరం వచ్చేశాడు. అన్నయ్య, బావ వేరే ఊళ్ళలో ఉన్నారు. కానీ ఆ సినిమా, ఆ డైలాగ్, ఆ ఊపిరి కట్, మా ముగ్గురిలో ఏదో రూపంలో అలాగే ఉన్నాయి.
                </p>
                <p>
                    ఆయన నటన ఎప్పుడూ చూడనివాళ్ళకు నా మాట ఇది. ముందు అతడు. తరువాత 1: నేనొక్కడినే, ఆపై ఖలేజా, నాని. మహర్షితో కాసేపు కూర్చోండి. ఒక్కడు చివర్లో చూడండి. ఎందుకంటే అంతా మొదలైంది అక్కడే.
                </p>
                <p>
                    ఆస్కార్ వస్తేనే ఆయన గొప్పతనం నాకు తెలియాల్సిన పని లేదు. ప్రపంచం ఆయన సీన్‌లో రెండు నిమిషాలు కూర్చుని తనంతట తానే తెలుసుకుంటే చాలు. అది జరిపించే సినిమా వారణాసి అయితే, అంతకన్నా ఏం కావాలి.
                </p>
                <p>
                    ఆయన కబడ్డీ ఆడటానికే వచ్చాడు. కానీ ఆట గ్రౌండ్‌లో లేదని ఆయనకు ముందే తెలుసు.
                </p>
                <p style={{ fontSize: '1.4rem', textAlign: 'center', margin: '2.5rem 0 1.5rem', color: 'var(--primary)' }}>
                    <span className="struck">వారణాసి</span> మహేష్ టు ది వరల్డ్.
                </p>
                <p>
                    మహేష్ సర్, ధన్యవాదాలు.
                </p>
                <p style={{ color: 'var(--muted)', marginTop: '1rem' }}>
                    2003 నుంచి ఒక అభిమాని
                </p>
            </div>
        ),
        contentEn: (
            <>
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


                <p>
                    And then there is Varanasi.
                </p>
                <p>
                    November 15, 2025. Ramoji Film City. Fifty thousand fans. Live on JioHotstar. The crowd chanting <em>Jai Babu, Jai Jai Babu</em> for hours. At the end of it Rajamouli walked on stage and revealed the film&apos;s title, the one he had been preparing for years. Varanasi.
                </p>
                <p>
                    Then he played the concept reel.
                </p>


                <p>
                    Mahesh was on the screen as <strong>Rudhra</strong>, a trishul in his hand, riding a charging bull. Priyanka Chopra Jonas as <strong>Mandakini</strong>. Prithviraj Sukumaran as the antagonist, <strong>Kumbha</strong>. The film, Rajamouli said, spans thousands of years, from ancient Bharat to the modern day, with one sequence inspired by a chapter from the Ramayana. The story turns on the city of Varanasi facing the impending arrival of an asteroid. Globetrotting adventure with Indian roots.
                </p>


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
        title: "నువ్వు మంగళవారం మీటింగ్ గురించి కంగారు పడుతున్నావ్",
        date: "మార్చి 2026",
        tags: ["విశ్వం"],
        excerpt: "ఇప్పుడు నీ తలపైన నాలుగు వందల కిలోమీటర్ల ఎత్తులో వ్యోమగాములు రోజుకు పదహారు సూర్యోదయాలు చూస్తున్నారు. గోడకు కట్టుకుని నిద్రపోతున్నారు. నువ్వు మాత్రం మంగళవారం మీటింగ్ గురించి కంగారు పడుతున్నావ్. కెమెరాను కాస్త వెనక్కి లాగుదాం. చాలా చాలా వెనక్కి.",
        content: (
            <div className="te">
                <p>
                    ఇప్పుడు, ఈ క్షణంలో, నీ తలపైన సుమారు నాలుగు వందల కిలోమీటర్ల ఎత్తులో, కొందరు వ్యోమగాములు ఒక లోహపు గొట్టంలో తేలుతూ రోజుకు పదహారు సూర్యోదయాలు చూస్తున్నారు. కింద పడని నీళ్ళతో పళ్ళు తోముకుంటున్నారు. గోడకు కట్టుకుని నిద్రపోతున్నారు.
                </p>
                <p>నువ్వు మాత్రం మంగళవారం మీటింగ్ గురించి కంగారు పడుతున్నావ్.</p>
                <p>
                    తక్కువ చేసి మాట్లాడటానికి కాదు. మీటింగ్ ముఖ్యమే. డెడ్‌లైన్ ముఖ్యమే. నిన్న జరిగిన గొడవ కూడా ముఖ్యమే. కాసేపు కెమెరాను వెనక్కి లాగుదాం అంటున్నాను. చాలా చాలా వెనక్కి.
                </p>

                <h2>ముందు బేసిక్స్</h2>
                <p>
                    భూమి ఒక రాయి. చాలా మంచి రాయి, సముద్రాలు, చెట్లు, కాఫీ, సంగీతం కనిపెట్టిన మనుషులు ఉన్నారు, అయినా రాయే. వెడల్పు సుమారు 12,700 కిలోమీటర్లు. మనందరినీ బతికిస్తున్న సూర్యుడిలో ఇలాంటి భూములు పదమూడు లక్షలు పడతాయి.
                </p>
                <p>
                    సూర్యుడు కూడా ప్రత్యేకమేమీ కాదు. కొన్ని నక్షత్రాలు ఎంత పెద్దవంటే, వాటిని సూర్యుడి స్థానంలో పెడితే బుధుడు, శుక్రుడు, భూమి, కుజుడు మింగేసి గురుడి దాకా విస్తరిస్తాయి. మన సూర్యుడు తన గెలాక్సీలోని ఒక మామూలు మూలలో ఉన్న చిన్న, నిశ్శబ్దమైన, సాధారణ నక్షత్రం.
                </p>

                <h2>మన వీధి</h2>
                <p>
                    మన సౌరకుటుంబం సూర్యుడి నుంచి సుమారు వంద ఖగోళ యూనిట్ల దాకా విస్తరించి ఉంది. ఒక ఖగోళ యూనిట్ అంటే భూమికి సూర్యుడికి మధ్య దూరం, సుమారు పదిహేను కోట్ల కిలోమీటర్లు. 1977లో బయలుదేరిన వాయేజర్ 1, అప్పటినుంచి సెకనుకు 17 కిలోమీటర్ల వేగంతో ఎగురుతూనే ఉంది. ఇప్పుడిప్పుడే సౌరకుటుంబం దాటుతోంది. యాభై ఏళ్ళ ప్రయాణం తరువాత కూడా మనం ఇంకా వాకిలి దాటలేదు.
                </p>
                <p>
                    1990లో, వాయేజర్ 1 బయటకు వెళ్తుండగా, కార్ల్ సేగన్ నాసాను ఒప్పించి దాని కెమెరాను ఒక్కసారి వెనక్కి తిప్పించాడు. ఆరు వందల కోట్ల కిలోమీటర్ల దూరం నుంచి భూమి ఒకే ఒక్క పిక్సెల్‌గా కనిపించింది. చెల్లాచెదురైన సూర్యకాంతి ధారలో ఒక లేత నీలి చుక్క. ఆ ఫోటో గురించి సేగన్ రాసిన ఒక్క వాక్యం నన్ను వదల్లేదు: అదే ఇక్కడ. అదే ఇల్లు. అదే మనం.
                </p>

                <h2>గెలాక్సీ</h2>
                <p>
                    మన సౌరకుటుంబం ఉన్న పాలపుంత గెలాక్సీ వెడల్పు సుమారు లక్ష కాంతి సంవత్సరాలు. కాంతి సంవత్సరం అంటే కాంతి ఒక ఏడాదిలో ప్రయాణించే దూరం. కాంతి వేగం సెకనుకు మూడు లక్షల కిలోమీటర్లు, ఒక్క సెకనులో భూమి చుట్టూ ఏడున్నర సార్లు తిరిగేంత. ఆ వేగంతో వెళ్ళినా మన గెలాక్సీని దాటడానికి లక్ష సంవత్సరాలు పడుతుంది.
                </p>
                <p>
                    మనం గెలాక్సీ కేంద్రం నుంచి సుమారు 26,000 కాంతి సంవత్సరాల దూరంలో, ఒక నిశ్శబ్దమైన శివారులో ఉన్నాం. ఆ కేంద్రం చుట్టూ ఒక్క ప్రదక్షిణకు 22.5 కోట్ల సంవత్సరాలు. మనం ఇప్పుడున్న ఈ చోటే గత ప్రదక్షిణలో ఉన్నప్పుడు, భూమి మీద డైనోసార్లు అప్పుడే మొదలవుతున్నాయి.
                </p>

                <h2>పాలపుంత ఆవల</h2>
                <p>
                    పాలపుంతలో పది వేల కోట్ల నుంచి నలభై వేల కోట్ల నక్షత్రాలు ఉన్నాయి. మనం చూడగలిగే విశ్వంలో సుమారు రెండు లక్షల కోట్ల గెలాక్సీలు. ఒక్కో దానిలో వేల కోట్ల నక్షత్రాలు.
                </p>
                <p>
                    1995లో ఖగోళ శాస్త్రవేత్తలు హబుల్ టెలిస్కోప్‌ను ఆకాశంలో పూర్తిగా ఖాళీగా కనిపించే ఒక చీకటి మచ్చవైపు తిప్పి, పది రోజులు షట్టర్ తెరిచి ఉంచారు. తిరిగొచ్చిన ఫోటోలో దాదాపు పదివేల గెలాక్సీలు. నక్షత్రాలు కాదు, గెలాక్సీలు. ఒక్కోదానిలో వేల కోట్ల సూర్యుళ్ళు. అదీ చేయి చాచి పట్టుకున్న ఇసుక రేణువంత ఆకాశం నుంచి.
                </p>
                <p>
                    ఒక దశ దాటాక ఈ సంఖ్యలకు అర్థం లేకుండా పోతుంది. మన మెదడు ఈ స్కేలు కోసం తయారవ్వలేదు. రెండు లక్షల కోట్ల గెలాక్సీలు, ఒక్కోదానిలో వేల కోట్ల నక్షత్రాలు, చాలా వాటికి గ్రహాలు. ఆ మొత్తానికి మన దగ్గర అసలు పదమే లేదు.
                </p>

                <h2>నన్ను పట్టుకునే విషయం</h2>
                <p>
                    ఈ రాత్రి నువ్వు కంటితో చూడగలిగే కొన్ని నక్షత్రాలు ఇప్పటికే చనిపోయాయి. వేల ఏళ్ళ క్రితమే ఆరిపోయాయి. నువ్వు చూస్తున్నవి వాటి నీడలను. నగరాలు పుట్టక ముందు బయలుదేరిన కాంతి, సరిగ్గా ఇప్పుడు, నువ్వు బయట నిలబడి ఉండగా, నీ కంట్లోకి వచ్చి వాలుతోంది.
                </p>
                <p>
                    మన పక్కింటి పెద్ద గెలాక్సీ ఆండ్రోమెడా కాంతి బయలుదేరినప్పుడు భూమి మీద మనుషులే లేరు. నగరాలు లేవు, వ్యవసాయం లేదు, భాష లేదు. మన పూర్వీకులు అప్పుడే నిప్పును అర్థం చేసుకుంటున్నారు. ఇరవై ఐదు లక్షల సంవత్సరాల ఆ ప్రయాణం, ఒక తేట రాత్రి, నీ కంట్లో ముగుస్తుంది. రాత్రి ఆకాశం వైపు చూసిన ప్రతిసారీ నువ్వు గతంలోకి చూస్తున్నావు.
                </p>

                <h2>మరి నీ మంగళవారానికి దీని అర్థం?</h2>
                <p>
                    మనం చిన్నవాళ్ళం కాబట్టి దేనికీ అర్థం లేదు అనుకోవడం సులభం. అది బద్ధకపు ముగింపు. విశ్వానికి నీ మంగళవారం మీటింగ్ పట్టదు, నిజమే. కానీ దానికి మిగతా ఏదీ పట్టదు. గెలాక్సీలు ఢీకొంటున్నా, నక్షత్రాలు పేలుతున్నా, విశ్వం స్థాయిలో వేటికీ అర్థం లేదు.
                </p>
                <p>
                    ఆశ్చర్యమూ, పట్టుకోదగినదీ ఇది: ఈ చిన్న రాయి మీద, రెండు లక్షల కోట్ల గెలాక్సీల్లో ఒక మామూలు మూలలో, కొంత పదార్థం తనను తానే ప్రశ్నించుకునే రూపంలోకి అమరింది. మనం టెలిస్కోపులు కట్టాం. లెక్కలు తేల్చాం. ఏమీ లేదనుకున్న ఖాళీ ఆకాశం వైపు పది రోజులు కెమెరా పెట్టి చూశాం.
                </p>
                <p>
                    నీ శరీరంలోని అణువులు భూమి పుట్టక ముందే చనిపోయిన నక్షత్రాల కొలిమిలో తయారయ్యాయి. నీ రక్తంలోని ఇనుము ఒక సూపర్‌నోవాలో పుట్టింది. నువ్వు అక్షరాలా నక్షత్ర ధూళివి. ప్రెజెంటేషన్ల గురించి కంగారు పడటం నేర్చుకున్న నక్షత్ర ధూళివి.
                </p>
                <p>ఆ సంగతి వెంట తీసుకుని మీటింగ్‌కు వెళ్ళు.</p>
            </div>
        ),
        contentEn: (
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

                <h2>The galaxy</h2>
                <p>
                    Our solar system is inside the Milky Way, which is about 100,000 light-years across. A light-year is how far light travels in a year. Light moves at 300,000 kilometres per second, in one second it goes around the Earth seven and a half times. At that speed, crossing just our galaxy takes a hundred thousand years.
                </p>
                <p>
                    We sit in a quiet suburb about 26,000 light-years from the center. We're not special in our placement either. Just somewhere in the middle, orbiting the galactic center once every 225 million years. The last time we were in this exact spot in our orbit, dinosaurs were just getting started.
                </p>

                <h2>Beyond the Milky Way</h2>
                <p>
                    The Milky Way has somewhere between 100 and 400 billion stars. The observable universe, the part we can see with our best telescopes, contains roughly two trillion galaxies. Each one with hundreds of billions of stars.
                </p>
                <p>
                    In 1995, astronomers pointed the Hubble telescope at a completely dark patch of sky, a region so empty it looked like nothing. They left the shutter open for ten days.
                </p>
                <p>
                    Almost every dot in the photograph that came back is a galaxy. Not a star, a galaxy. Billions of suns, each. And this is from a patch of sky so small you'd need to hold a grain of sand at arm's length to cover it.
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
        tags: ["విశ్వం"],
        title: "ఆకాశంలో ఆ మసక ఒక లక్ష కోట్ల నక్షత్రాలు. అది ఇటే వస్తోంది.",
        date: "ఫిబ్రవరి 2026",
        excerpt: "ఆకాశంలో సులభంగా మిస్ అయ్యే ఒక మసక మచ్చ ఉంది. చూస్తే పలుచని మేఘంలా ఉంటుంది. కానీ అది మేఘం కాదు. ఇరవై ఐదు లక్షల కాంతి సంవత్సరాల దూరంలో ఉన్న ఒక గెలాక్సీ. అది మనవైపే పడుతోంది.",
        content: (
            <div className="te">
                <p>
                    నగర దీపాలకు దూరంగా, బాగా తేటగా ఉన్న రాత్రి చేయగలిగిన ఒక పని ఉంది. ఆండ్రోమెడా నక్షత్రరాశిని వెతికి, ఒక నిర్దిష్టమైన చోట చూస్తే, ఒక మసక మచ్చ కనిపిస్తుంది. సులభంగా మిస్ అవుతుంది. పలుచని మేఘంలా, కళ్ళు మోసం చేస్తున్నాయా అన్నట్టు ఉంటుంది.
                </p>
                <p>అది మేఘం కాదు.</p>
                <p>
                    ఆ మసక ఒక పూర్తి గెలాక్సీ. ఇరవై ఐదు లక్షల కాంతి సంవత్సరాల దూరం. లక్ష కోట్ల నక్షత్రాలు. ఇప్పుడు నీ కంట్లో పడుతున్న ఆ కాంతి బయలుదేరినప్పుడు భూమి మీద మనుషులే లేరు. భాష రాక ముందు, నిప్పు రాక ముందు, ఆ చిన్న కాంతి కణాలు అప్పటికే శూన్యం గుండా నీవైపు వస్తున్నాయి.
                </p>

                <h2>మనం నిజంగా ఎంత చిన్నవాళ్ళం?</h2>
                <p>
                    సూర్యుడిని ఒక బాస్కెట్‌బాల్ సైజుకు కుదిస్తే, భూమి ఇరవై ఆరు మీటర్ల దూరంలో తిరుగుతున్న ఒక నువ్వు గింజ. మరి పక్క నక్షత్రం? అదే బాస్కెట్‌బాల్, కానీ ఏడు వేల కిలోమీటర్ల దూరంలో, ఇంకో నగరంలో. అదీ మన అతి దగ్గరి పొరుగింటికే.
                </p>
                <p>
                    1990లో వాయేజర్ 1 మన సౌరకుటుంబం విడిచి వెళ్తుండగా, కార్ల్ సేగన్ నాసాను ఒప్పించి దాని కెమెరాను చివరిసారిగా వెనక్కి తిప్పించాడు. ఆరు వందల కోట్ల కిలోమీటర్ల నుంచి భూమి ఒక పిక్సెల్ కన్నా చిన్నగా కనిపించింది. చెదిరిన సూర్యకాంతి ధారలో ఒక లేత నీలి చుక్క.
                </p>
                <p>
                    మన సూర్యుడు పాలపుంతలోని ముప్ఫై వేల కోట్ల నక్షత్రాల్లో ఒకడు. పాలపుంత మనం చూడగలిగే రెండు లక్షల కోట్ల గెలాక్సీల్లో ఒకటి. ఆ నక్షత్రాల్లో చాలా వాటికి గ్రహాలు ఉన్నాయని ఇప్పుడు మనకు తెలుసు. ఒక దశ దాటాక సంఖ్యలకు అర్థం ఉండదు. అన్నీ పట్టుకోవాలని ప్రయత్నించకుండా, ఆ మసకను చూడు.
                </p>

                <h2>ఆండ్రోమెడా అసలు ఏమిటి</h2>
                <p>
                    ఆండ్రోమెడా మన అతి దగ్గరి పెద్ద గెలాక్సీ. పాలపుంతలాగే సర్పిలాకారం, మధ్యలో ఒక భారీ కృష్ణబిలం, చుట్టూ తిరుగుతున్న చదునైన నక్షత్రాల పళ్ళెం. దానిలో సుమారు లక్ష కోట్ల నక్షత్రాలు. మనవి ముప్ఫై వేల కోట్లు. ఆండ్రోమెడా పెద్దది.
                </p>
                <p>
                    దాని కాంతి ఇంకాస్త బలంగా ఉండి ఉంటే, ఆకాశంలో ఆండ్రోమెడా నిండు చంద్రుడి కన్నా ఆరు రెట్లు వెడల్పుగా కనిపించేది. మసకగా కనిపించడానికి కారణం ఆ కాంతి అంత పెద్ద విస్తీర్ణం మీద పరుచుకోవడమే. హబుల్ టెలిస్కోప్ ఏళ్ళ తరబడి దాన్ని ముక్క ముక్కగా ఫోటో తీసి కుట్టింది. వంద కోట్లకు పైగా పిక్సెళ్ళు, పది కోట్లకు పైగా విడివిడిగా కనిపించే నక్షత్రాలు. ప్రతి కాంతి చుక్కా ఒక సూర్యుడు. చాలా వాటికి బహుశా గ్రహాలు. ఇక్కడి నుంచి కనిపించవు, అంతే.
                </p>

                <h2>అది మనవైపే వస్తోంది</h2>
                <p>
                    విశ్వం విస్తరిస్తున్న కొద్దీ చాలా గెలాక్సీలు మనకు దూరంగా జరుగుతున్నాయి. ఆండ్రోమెడా మాత్రం కాదు. అది గురుత్వాకర్షణ గెలిచేటంత దగ్గరగా ఉంది. సెకనుకు సుమారు 110 కిలోమీటర్ల వేగంతో మనవైపు పడుతోంది.
                </p>
                <p>
                    ఇది మనకు తెలిసింది డాప్లర్ ఎఫెక్ట్ వల్ల. కారు హారన్ మనవైపు వస్తున్నప్పుడు ఎక్కువ శ్రుతిలో వినిపించే కారణమే. కాంతికీ అదే జరుగుతుంది. కాంతి మూలం మనవైపు వస్తుంటే తరంగాలు కాస్త ఒత్తుకుంటాయి. ఆండ్రోమెడా కాంతి నీలం వైపు జరిగి ఉంది. అది ఇటే వస్తోంది.
                </p>
                <p>
                    సుమారు 450 కోట్ల సంవత్సరాల్లో రెండు గెలాక్సీలు ఢీకొంటాయి. ఢీకొనడం అనే మాట పెద్ద ప్రమాదంలా వినిపిస్తుంది కానీ, నక్షత్రాలకు అది కాదు. గెలాక్సీలు దాదాపు ఖాళీ స్థలమే. నక్షత్రాల మధ్య దూరాలు ఎంత పెద్దవంటే, రెండు గెలాక్సీలు కలిసినప్పుడు నక్షత్రాలు ఒకదానికొకటి తగలడం దాదాపు జరగదు. చీకట్లో రెండు మిణుగురుల గుంపులు ఒకదానిలో ఒకటి దూరినట్టు దాటుకుంటాయి. గురుత్వం రెండింటినీ కొత్త వింత ఆకారాల్లోకి మెలిపెడుతుంది, కొన్ని నక్షత్రాలు దూరంగా విసిరేయబడతాయి, వాయు మేఘాలు ఒత్తుకుని కొత్త నక్షత్రాలుగా పుడతాయి. ఢీకొనడం కన్నా అది ఒక నెమ్మదైన నాట్యం. కలిసిన ఆ గెలాక్సీకి పెట్టిన ముద్దుపేరు మిల్కోమెడా.
                </p>

                <h2>మనం అక్కడికి వెళ్ళగలమా?</h2>
                <p>
                    లేము. మన దగ్గర ఉన్న దేనితోనూ కాదు, మనకు అర్థమయ్యే ఏ కాల వ్యవధిలోనూ కాదు.
                </p>
                <p>
                    ఆండ్రోమెడా ఇరవై ఐదు లక్షల కాంతి సంవత్సరాల దూరంలో ఉంది. మన అత్యంత వేగవంతమైన వాహనం వాయేజర్ 1 సెకనుకు 17 కిలోమీటర్లు వెళ్తుంది. ఆ వేగంతో ఆండ్రోమెడా చేరడానికి సుమారు నాలుగున్నర వేల కోట్ల సంవత్సరాలు. విశ్వం వయసే 1,380 కోట్ల సంవత్సరాలు. ఉన్నదంతటి వయసు కన్నా మూడు రెట్లు ఎక్కువ కావాలి. భౌతికశాస్త్రం అనుమతించే గరిష్ఠ వేగం, కాంతి వేగంతో వెళ్ళినా, ఒకవైపు ప్రయాణమే ఇరవై ఐదు లక్షల సంవత్సరాలు.
                </p>
                <p>
                    మనం ఇంకా కనుక్కోని భౌతికశాస్త్రంతో ఏమో. స్థలాన్నే మడిచే ఏదో దారితో ఏమో. కానీ అది నిజాయితీ గల ఏమో మాత్రమే. మనకు తెలిసిన దారి కాదు.
                </p>

                <h2>మనకు దొరకగల తోడు</h2>
                <p>
                    పాలపుంతలోనే సుమారు పది వేల కోట్ల గ్రహాలు ఉన్నాయి. ఆండ్రోమెడాలో ఇంకా ఎక్కువ. మొత్తం రెండు లక్షల కోట్ల గెలాక్సీలు. వాటిలో పది లక్షలకు ఒక్క గ్రహం మీద జీవం పుట్టినా, అది భాషలో పట్టని సంఖ్య. లెక్కలేనన్ని లోకాలు, ఇప్పుడు, బతికి ఉండి. వాటిలో కొన్ని బహుశా తమ రాత్రి ఆకాశం వైపు చూస్తూ, మనమే అయిన ఒక మసకను గమనించి, ఇవే ప్రశ్నలు అడుగుతూ ఉండి ఉండొచ్చు.
                </p>
                <p>
                    మనం ఒక రాయి మీద ఉన్నాం. ఒక మామూలు నక్షత్రం చుట్టూ, రెండు లక్షల కోట్లలో ఒక మామూలు గెలాక్సీలో. అయినా ఒక తేట రాత్రి, ఉత్త కంటితో, ఆ రెండు లక్షల కోట్లలో ఒకదాన్ని చూడగలవు. లక్ష కోట్ల సూర్యుళ్ళ నుంచి వచ్చిన ఇరవై ఐదు లక్షల ఏళ్ళ కాంతి జాడ.
                </p>
                <p>వెళ్ళి వెతుకు.</p>
                <p style={{ fontSize: '0.9rem', color: 'var(--muted)', borderTop: '1px solid var(--border)', paddingTop: '1.5rem', marginTop: '2rem' }}>
                    ఆండ్రోమెడాను ఎలా వెతకాలి: చంద్రుడు లేని రాత్రి, నగర దీపాలకు దూరంగా, పెగసస్ మహా చతురస్రాన్ని పట్టుకుని, రెండు నక్షత్రాలు ఆండ్రోమెడా రాశి వైపు జరిగి, పొడవాటి మసక మచ్చ కోసం చూడు. కళ్ళకు చీకటి అలవాటవ్వడానికి కనీసం ఇరవై నిమిషాలు ఇవ్వు. ఆ శ్రమకు విలువ ఉంది.
                </p>
            </div>
        ),
        contentEn: (
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
                    If it were bright enough to see properly, Andromeda would appear six times wider in the sky than the full Moon. It only looks faint because its light is spread across that enormous area. Hubble spent years photographing it piece by piece and stitching the images together.
                </p>
                <p>
                    Every dot of light in that mosaic is a star. Most of them are suns. Many probably have planets. We just can't see them from here.
                </p>

                <h2>It's coming toward us</h2>
                <p>
                    Most galaxies are moving away from us as the universe expands. Andromeda isn't. It's close enough that gravity wins over expansion, and it's falling toward us at about 110 kilometres every second.
                </p>
                <p>
                    We know this because of the Doppler effect, the same reason a car horn sounds higher as it drives toward you. Light does the same thing. When a light source moves toward you, the wavelengths get slightly compressed. Andromeda's light is blue-shifted. It's heading our way.
                </p>
                <p>
                    In about 4.5 billion years, the two galaxies will collide. Scientists have simulated what it will look like.
                </p>
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
