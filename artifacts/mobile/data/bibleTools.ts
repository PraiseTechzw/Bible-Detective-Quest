export type DailyVerse = { ref: string; book: string; chapter: number; verse: number; text: string; theme: string };
export type DictEntry = { word: string; definition: string; related: string[] };
export type CharacterProfile = {
  id: string; name: string; era: string; role: string; description: string;
  keyVerses: string[]; books: string[]; trait: string;
};
export type Topic = { id: string; name: string; icon: string; desc: string; verses: { ref: string; text: string }[] };
export type ReadingPlan = {
  id: string; name: string; desc: string; durationDays: number; icon: string;
  days: { day: number; title: string; readings: { bookId: string; bookName: string; chapter: number }[] }[];
};
export type QuizQuestion = {
  id: string; question: string; options: string[]; answerIndex: number;
  difficulty: "easy" | "medium" | "hard"; hint: string; reference: string;
};
export type MemoryVerse = { ref: string; text: string; category: string };
export type FeastDay = {
  name: string; hebrewName: string; desc: string; scripture: string; significance: string; season: string;
};
export type TimelineEvent = {
  id: string; year: string; event: string; desc: string; scripture: string; era: string; epochOrder: number;
};
export type CrossRef = { from: string; to: string[]; theme: string };

export const DAILY_VERSES: DailyVerse[] = [
  { ref: "John 3:16", book: "joh", chapter: 3, verse: 16, text: "For God so loved the world, that he gave his only begotten Son, that whosoever believeth in him should not perish, but have everlasting life.", theme: "Salvation" },
  { ref: "Psalm 23:1", book: "psa", chapter: 23, verse: 1, text: "The LORD is my shepherd; I shall not want.", theme: "Trust" },
  { ref: "Romans 8:28", book: "rom", chapter: 8, verse: 28, text: "And we know that all things work together for good to them that love God, to them who are the called according to his purpose.", theme: "Providence" },
  { ref: "Proverbs 3:5", book: "pro", chapter: 3, verse: 5, text: "Trust in the LORD with all thine heart; and lean not unto thine own understanding.", theme: "Wisdom" },
  { ref: "Philippians 4:13", book: "phi", chapter: 4, verse: 13, text: "I can do all things through Christ which strengtheneth me.", theme: "Strength" },
  { ref: "Isaiah 40:31", book: "isa", chapter: 40, verse: 31, text: "But they that wait upon the LORD shall renew their strength; they shall mount up with wings as eagles; they shall run, and not be weary; and they shall walk, and not faint.", theme: "Renewal" },
  { ref: "Jeremiah 29:11", book: "jer", chapter: 29, verse: 11, text: "For I know the thoughts that I think toward you, saith the LORD, thoughts of peace, and not of evil, to give you an expected end.", theme: "Hope" },
  { ref: "Joshua 1:9", book: "jos", chapter: 1, verse: 9, text: "Have not I commanded thee? Be strong and of a good courage; be not afraid, neither be thou dismayed: for the LORD thy God is with thee whithersoever thou goest.", theme: "Courage" },
  { ref: "Matthew 5:16", book: "mat", chapter: 5, verse: 16, text: "Let your light so shine before men, that they may see your good works, and glorify your Father which is in heaven.", theme: "Witness" },
  { ref: "Psalm 46:10", book: "psa", chapter: 46, verse: 10, text: "Be still, and know that I am God: I will be exalted among the heathen, I will be exalted in the earth.", theme: "Peace" },
  { ref: "Romans 12:2", book: "rom", chapter: 12, verse: 2, text: "And be not conformed to this world: but be ye transformed by the renewing of your mind, that ye may prove what is that good, and acceptable, and perfect, will of God.", theme: "Transformation" },
  { ref: "Psalm 119:105", book: "psa", chapter: 119, verse: 105, text: "Thy word is a lamp unto my feet, and a light unto my path.", theme: "Scripture" },
  { ref: "Ephesians 2:8", book: "eph", chapter: 2, verse: 8, text: "For by grace are ye saved through faith; and that not of yourselves: it is the gift of God.", theme: "Grace" },
  { ref: "2 Timothy 3:16", book: "2ti", chapter: 3, verse: 16, text: "All scripture is given by inspiration of God, and is profitable for doctrine, for reproof, for correction, for instruction in righteousness.", theme: "Scripture" },
  { ref: "Hebrews 11:1", book: "heb", chapter: 11, verse: 1, text: "Now faith is the substance of things hoped for, the evidence of things not seen.", theme: "Faith" },
  { ref: "1 John 4:8", book: "1jo", chapter: 4, verse: 8, text: "He that loveth not knoweth not God; for God is love.", theme: "Love" },
  { ref: "Matthew 6:33", book: "mat", chapter: 6, verse: 33, text: "But seek ye first the kingdom of God, and his righteousness; and all these things shall be added unto you.", theme: "Priority" },
  { ref: "Galatians 5:22", book: "gal", chapter: 5, verse: 22, text: "But the fruit of the Spirit is love, joy, peace, longsuffering, gentleness, goodness, faith.", theme: "Holy Spirit" },
  { ref: "Psalm 27:1", book: "psa", chapter: 27, verse: 1, text: "The LORD is my light and my salvation; whom shall I fear? the LORD is the strength of my life; of whom shall I be afraid?", theme: "Courage" },
  { ref: "Isaiah 53:5", book: "isa", chapter: 53, verse: 5, text: "But he was wounded for our transgressions, he was bruised for our iniquities: the chastisement of our peace was upon him; and with his stripes we are healed.", theme: "Atonement" },
  { ref: "John 14:6", book: "joh", chapter: 14, verse: 6, text: "Jesus saith unto him, I am the way, the truth, and the life: no man cometh unto the Father, but by me.", theme: "Jesus" },
  { ref: "Genesis 1:1", book: "gen", chapter: 1, verse: 1, text: "In the beginning God created the heaven and the earth.", theme: "Creation" },
  { ref: "Micah 6:8", book: "mic", chapter: 6, verse: 8, text: "He hath shewed thee, O man, what is good; and what doth the LORD require of thee, but to do justly, and to love mercy, and to walk humbly with thy God?", theme: "Justice" },
  { ref: "1 Corinthians 13:4", book: "1co", chapter: 13, verse: 4, text: "Charity suffereth long, and is kind; charity envieth not; charity vaunteth not itself, is not puffed up.", theme: "Love" },
  { ref: "Romans 3:23", book: "rom", chapter: 3, verse: 23, text: "For all have sinned, and come short of the glory of God.", theme: "Sin" },
  { ref: "John 11:35", book: "joh", chapter: 11, verse: 35, text: "Jesus wept.", theme: "Compassion" },
  { ref: "Proverbs 31:25", book: "pro", chapter: 31, verse: 25, text: "Strength and honour are her clothing; and she shall rejoice in time to come.", theme: "Character" },
  { ref: "Psalm 51:10", book: "psa", chapter: 51, verse: 10, text: "Create in me a clean heart, O God; and renew a right spirit within me.", theme: "Repentance" },
  { ref: "Matthew 28:19", book: "mat", chapter: 28, verse: 19, text: "Go ye therefore, and teach all nations, baptizing them in the name of the Father, and of the Son, and of the Holy Ghost.", theme: "Mission" },
  { ref: "Revelation 21:4", book: "rev", chapter: 21, verse: 4, text: "And God shall wipe away all tears from their eyes; and there shall be no more death, neither sorrow, nor crying, neither shall there be any more pain: for the former things are passed away.", theme: "Hope" },
  { ref: "Psalm 103:12", book: "psa", chapter: 103, verse: 12, text: "As far as the east is from the west, so far hath he removed our transgressions from us.", theme: "Forgiveness" },
];

export function getDailyVerse(): DailyVerse {
  const day = new Date().getDate();
  return DAILY_VERSES[(day - 1) % DAILY_VERSES.length];
}

export const BIBLE_DICTIONARY: DictEntry[] = [
  { word: "Atonement", definition: "The reconciliation of God and humanity through Jesus Christ's sacrificial death. In the OT, achieved through animal sacrifice; in the NT, fulfilled by Christ (Romans 5:11).", related: ["Redemption", "Sacrifice", "Grace"] },
  { word: "Baptism", definition: "A Christian rite of initiation involving immersion in or application of water, symbolizing cleansing from sin, death to self, and resurrection to new life in Christ (Matthew 28:19).", related: ["Salvation", "Holy Spirit", "Covenant"] },
  { word: "Covenant", definition: "A binding agreement between God and His people. Major covenants include those with Noah, Abraham, Moses, David, and the New Covenant in Christ's blood (Jeremiah 31:31–34).", related: ["Atonement", "Torah", "Grace"] },
  { word: "Grace", definition: "God's unmerited favour toward sinners. Distinct from mercy (withholding punishment), grace actively bestows blessing. 'By grace are ye saved through faith' (Ephesians 2:8).", related: ["Mercy", "Salvation", "Atonement"] },
  { word: "Messiah", definition: "Hebrew for 'anointed one' (Greek: Christ). In Jewish tradition, the promised deliverer of Israel. Christians believe Jesus of Nazareth is the fulfillment of Messianic prophecy.", related: ["Christ", "Prophecy", "Salvation"] },
  { word: "Torah", definition: "Hebrew for 'instruction' or 'law'. Refers to the first five books of Moses (Genesis–Deuteronomy), also called the Pentateuch, foundational to both Judaism and Christianity.", related: ["Covenant", "Mosaic Law", "Scripture"] },
  { word: "Redemption", definition: "The act of buying back or freeing by payment. Theologically, Christ's death 'bought' humanity out of slavery to sin (1 Corinthians 6:20; Ephesians 1:7).", related: ["Atonement", "Grace", "Salvation"] },
  { word: "Sanctification", definition: "The ongoing process of being made holy, set apart for God. Distinct from justification (declared righteous at salvation), sanctification is lifelong growth in holiness.", related: ["Holy Spirit", "Grace", "Salvation"] },
  { word: "Justification", definition: "God's legal declaration that a sinner is righteous, based not on personal merit but on Christ's righteousness credited (imputed) through faith (Romans 5:1).", related: ["Grace", "Sanctification", "Faith"] },
  { word: "Prophecy", definition: "A divinely inspired message, often predictive of future events. Biblical prophets spoke God's word to Israel and the nations. Many OT prophecies are fulfilled in the NT.", related: ["Messiah", "Scripture", "Vision"] },
  { word: "Sabbath", definition: "The seventh day (Saturday in Judaism), set apart for rest and worship (Exodus 20:8–11). Christians commonly observe Sunday as the Lord's Day in commemoration of Christ's resurrection.", related: ["Torah", "Covenant", "Worship"] },
  { word: "Repentance", definition: "A genuine turning from sin toward God. The Greek word metanoia means 'change of mind'. True repentance involves sorrow for sin, confession, and changed behavior (Luke 13:3).", related: ["Salvation", "Forgiveness", "Grace"] },
  { word: "Righteousness", definition: "Right standing with God; moral perfection. In the NT, righteousness is both God's character and the gift He extends to believers through faith in Christ (Romans 1:17).", related: ["Justification", "Sanctification", "Law"] },
  { word: "Incarnation", definition: "The doctrine that God the Son took on human flesh in Jesus of Nazareth (John 1:14). Fully God and fully human — the hypostatic union — is foundational Christian belief.", related: ["Messiah", "Trinity", "Salvation"] },
  { word: "Resurrection", definition: "Rising from the dead. Central to Christian faith is the bodily resurrection of Jesus (1 Corinthians 15:14). Believers are promised future bodily resurrection at Christ's return.", related: ["Salvation", "Eternal Life", "Hope"] },
  { word: "Trinity", definition: "The Christian doctrine that God eternally exists as three co-equal, co-eternal persons: Father, Son, and Holy Spirit — one God in three persons. Not explicitly named in Scripture but derived from it.", related: ["Incarnation", "Holy Spirit", "God"] },
  { word: "Apocalypse", definition: "Greek for 'unveiling' or 'revelation'. Often refers to end-times events. The Book of Revelation (Apocalypse of John) is an apocalyptic text. Also a literary genre revealing heavenly realities.", related: ["Prophecy", "Eschatology", "Revelation"] },
  { word: "Eschatology", definition: "The study of last things: death, judgment, heaven, hell, and the return of Christ. Both OT and NT contain eschatological teaching, culminating in Revelation.", related: ["Apocalypse", "Resurrection", "Judgment"] },
  { word: "Epistle", definition: "A letter. The NT contains 21 epistles, written by apostles like Paul, Peter, John, James, and Jude to churches or individuals. They address doctrine, ethics, and church life.", related: ["Scripture", "Apostle", "Canon"] },
  { word: "Apostle", definition: "Greek for 'sent one'. Primarily the twelve disciples Jesus commissioned plus Paul. Apostles witnessed the risen Christ and were foundational to the church (Ephesians 2:20).", related: ["Disciple", "Church", "Mission"] },
  { word: "Parable", definition: "A short story using everyday life to illustrate spiritual truth. Jesus used ~40 parables in the Gospels (e.g., Prodigal Son, Good Samaritan) to reveal the Kingdom of God.", related: ["Kingdom of God", "Teaching", "Jesus"] },
  { word: "Canon", definition: "From Greek 'kanon' (measuring rod). The collection of books recognized as Scripture. The Protestant OT canon has 39 books; NT has 27. Catholic/Orthodox include additional deuterocanonical books.", related: ["Scripture", "Epistle", "Torah"] },
  { word: "Gehenna", definition: "Greek transliteration of Hebrew Ge-Hinnom, a valley near Jerusalem where trash burned continuously. Jesus used it as an image of eternal judgment/hell (Matthew 5:22, 29–30).", related: ["Judgment", "Eschatology", "Sin"] },
  { word: "Shalom", definition: "Hebrew for 'peace', encompassing wholeness, completeness, wellbeing, and right relationships. More than absence of conflict — active flourishing in all dimensions of life.", related: ["Covenant", "Kingdom of God", "Worship"] },
  { word: "Logos", definition: "Greek for 'word' or 'reason'. John 1:1 identifies Jesus as the Logos through whom all things were created, linking Jewish wisdom tradition with Greek philosophy.", related: ["Incarnation", "Trinity", "Creation"] },
];

export const CHARACTER_PROFILES: CharacterProfile[] = [
  { id: "adam", name: "Adam", era: "Creation", role: "First Man", trait: "First Human", description: "The first human, created from the dust of the ground and given breath by God. His disobedience in the Garden of Eden brought sin and death into the world, necessitating God's plan of redemption.", keyVerses: ["Genesis 1:27", "Genesis 3:19", "Romans 5:14"], books: ["gen", "rom", "1co"], },
  { id: "eve", name: "Eve", era: "Creation", role: "First Woman", trait: "Mother of All Living", description: "Created from Adam's rib as his companion. The first to be deceived by the serpent and partake of the forbidden fruit. Called 'mother of all living', she is the maternal ancestor of humanity.", keyVerses: ["Genesis 2:22", "Genesis 3:20", "1 Timothy 2:13"], books: ["gen", "1ti"], },
  { id: "noah", name: "Noah", era: "Pre-Patriarchal", role: "Builder of the Ark", trait: "Righteous & Blameless", description: "Found favour with God in a corrupt generation. Built the ark over 100 years at God's command, saving his family and animal kinds from the Great Flood. God established His covenant with Noah through the rainbow.", keyVerses: ["Genesis 6:9", "Genesis 9:13", "Hebrews 11:7"], books: ["gen", "heb", "1pe"], },
  { id: "abraham", name: "Abraham", era: "Patriarchs", role: "Father of Faith", trait: "Called from Ur", description: "Originally named Abram, called by God from Ur of the Chaldeans. Through him all nations would be blessed. His willingness to sacrifice Isaac proved his faith. Father of the Jewish, Christian, and Islamic traditions.", keyVerses: ["Genesis 12:1-3", "Genesis 22:8", "Romans 4:3"], books: ["gen", "rom", "gal", "heb"], },
  { id: "joseph", name: "Joseph", era: "Patriarchs", role: "Governor of Egypt", trait: "Dreamer & Forgiver", description: "Eleventh son of Jacob, sold into slavery by jealous brothers. Rose to power in Egypt through God's hand. His story of betrayal, suffering, and forgiveness prefigures the story of Christ.", keyVerses: ["Genesis 39:2", "Genesis 45:7-8", "Genesis 50:20"], books: ["gen"], },
  { id: "moses", name: "Moses", era: "Exodus", role: "Lawgiver & Deliverer", trait: "Meekest of Men", description: "Led the Israelites out of Egyptian slavery. Received the Ten Commandments on Sinai. Spoke face-to-face with God. Wrote the Pentateuch. The central human figure of the Old Testament.", keyVerses: ["Exodus 3:14", "Exodus 20:1-2", "Deuteronomy 34:10"], books: ["exo", "lev", "num", "deu", "psa", "heb"], },
  { id: "david", name: "David", era: "United Kingdom", role: "King of Israel", trait: "Man After God's Heart", description: "Shepherd boy who slew Goliath. Israel's greatest king. Wrote many Psalms. Despite serious sins (Bathsheba, Uriah), he repented deeply. The Messiah would come from his lineage.", keyVerses: ["1 Samuel 17:45", "Psalm 23:1", "Acts 13:22"], books: ["1sa", "2sa", "1ki", "psa", "mat", "act"], },
  { id: "solomon", name: "Solomon", era: "United Kingdom", role: "King of Israel", trait: "Wisest Man", description: "David's son. Built the first Temple in Jerusalem. Given extraordinary wisdom by God. Authored Proverbs, Ecclesiastes, and Song of Solomon. His wealth was legendary, but foreign wives led him into idolatry.", keyVerses: ["1 Kings 3:9", "Proverbs 1:7", "Ecclesiastes 12:13"], books: ["1ki", "pro", "ecc", "sng"], },
  { id: "elijah", name: "Elijah", era: "Divided Kingdom", role: "Prophet", trait: "Zealous for the LORD", description: "Fiery prophet who confronted King Ahab and the 450 prophets of Baal at Mount Carmel. Fed by ravens. Translated to heaven in a chariot of fire. Expected to return before the Day of the LORD (Malachi 4:5).", keyVerses: ["1 Kings 18:37", "1 Kings 19:12", "Malachi 4:5"], books: ["1ki", "2ki", "mal", "mat"], },
  { id: "isaiah", name: "Isaiah", era: "Divided Kingdom", role: "Major Prophet", trait: "Evangelist of OT", description: "Called the 'fifth evangelist' for his Messianic prophecies. Chapters 1–39 emphasise judgment; 40–66 give comfort. Isaiah 53's Suffering Servant passage is strikingly fulfilled in Jesus.", keyVerses: ["Isaiah 7:14", "Isaiah 40:31", "Isaiah 53:5"], books: ["isa"], },
  { id: "daniel", name: "Daniel", era: "Exile", role: "Prophet & Statesman", trait: "Steadfast in Exile", description: "Taken captive to Babylon as a youth. Refused to defile himself with the king's food. Interpreted dreams. Survived the lions' den. His visions in chapters 7–12 are foundational to NT apocalyptic.", keyVerses: ["Daniel 1:8", "Daniel 3:17", "Daniel 6:22"], books: ["dan", "mat", "rev"], },
  { id: "mary", name: "Mary", era: "New Testament", role: "Mother of Jesus", trait: "Highly Favoured", description: "Virgin of Nazareth chosen to bear the Son of God. Her Magnificat (Luke 1:46–55) is a masterpiece of praise. Present at the crucifixion and in the upper room at Pentecost.", keyVerses: ["Luke 1:28", "Luke 1:38", "John 19:25"], books: ["mat", "luk", "joh", "act"], },
  { id: "peter", name: "Peter", era: "New Testament", role: "Apostle", trait: "Rock of the Church", description: "Fisherman named Simon, renamed Cephas (Peter, 'rock') by Jesus. Often impetuous — walked on water, denied Jesus three times, but was restored and became the leading apostle. First significant preacher at Pentecost.", keyVerses: ["Matthew 16:18", "John 21:17", "Acts 2:38"], books: ["mat", "joh", "act", "1pe", "2pe"], },
  { id: "paul", name: "Paul", era: "New Testament", role: "Apostle to Gentiles", trait: "Chief of Sinners", description: "Born Saul of Tarsus, a zealous Pharisee who persecuted Christians. Dramatically converted on the road to Damascus. Became the most prolific NT author, writing 13 epistles and taking three missionary journeys.", keyVerses: ["Acts 9:3-5", "Philippians 3:8", "Galatians 2:20"], books: ["act", "rom", "1co", "2co", "gal", "eph", "phi", "col", "1th", "2th", "1ti", "2ti", "tit", "phm"], },
  { id: "john", name: "John the Apostle", era: "New Testament", role: "Apostle & Evangelist", trait: "Beloved Disciple", description: "Son of Zebedee, brother of James. Described as 'the disciple whom Jesus loved'. Wrote the Gospel of John, three epistles, and Revelation. Cared for Mary after Jesus' death. Exiled to Patmos.", keyVerses: ["John 1:1", "1 John 4:8", "Revelation 1:9"], books: ["joh", "1jo", "2jo", "3jo", "rev"], },
];

export const TOPICS: Topic[] = [
  { id: "faith", name: "Faith", icon: "✝️", desc: "Trust and belief in God and His promises", verses: [
    { ref: "Hebrews 11:1", text: "Now faith is the substance of things hoped for, the evidence of things not seen." },
    { ref: "Romans 10:17", text: "So then faith cometh by hearing, and hearing by the word of God." },
    { ref: "Galatians 2:20", text: "I am crucified with Christ: nevertheless I live; yet not I, but Christ liveth in me: and the life which I now live in the flesh I live by the faith of the Son of God." },
    { ref: "Matthew 17:20", text: "If ye have faith as a grain of mustard seed, ye shall say unto this mountain, Remove hence to yonder place; and it shall remove; and nothing shall be impossible unto you." },
  ]},
  { id: "prayer", name: "Prayer", icon: "🙏", desc: "Communicating with God", verses: [
    { ref: "Matthew 6:9", text: "After this manner therefore pray ye: Our Father which art in heaven, Hallowed be thy name." },
    { ref: "Philippians 4:6", text: "Be careful for nothing; but in every thing by prayer and supplication with thanksgiving let your requests be made known unto God." },
    { ref: "1 Thessalonians 5:17", text: "Pray without ceasing." },
    { ref: "James 5:16", text: "The effectual fervent prayer of a righteous man availeth much." },
  ]},
  { id: "love", name: "Love", icon: "❤️", desc: "God's love and loving others", verses: [
    { ref: "John 3:16", text: "For God so loved the world, that he gave his only begotten Son, that whosoever believeth in him should not perish, but have everlasting life." },
    { ref: "1 John 4:8", text: "He that loveth not knoweth not God; for God is love." },
    { ref: "1 Corinthians 13:4", text: "Charity suffereth long, and is kind; charity envieth not; charity vaunteth not itself, is not puffed up." },
    { ref: "Romans 5:8", text: "But God commendeth his love toward us, in that, while we were yet sinners, Christ died for us." },
  ]},
  { id: "salvation", name: "Salvation", icon: "🕊️", desc: "God's plan to save humanity from sin", verses: [
    { ref: "Romans 6:23", text: "For the wages of sin is death; but the gift of God is eternal life through Jesus Christ our Lord." },
    { ref: "Ephesians 2:8-9", text: "For by grace are ye saved through faith; and that not of yourselves: it is the gift of God: Not of works, lest any man should boast." },
    { ref: "John 14:6", text: "Jesus saith unto him, I am the way, the truth, and the life: no man cometh unto the Father, but by me." },
    { ref: "Acts 4:12", text: "Neither is there salvation in any other: for there is none other name under heaven given among men, whereby we must be saved." },
  ]},
  { id: "peace", name: "Peace", icon: "🕊️", desc: "God's peace that surpasses understanding", verses: [
    { ref: "John 14:27", text: "Peace I leave with you, my peace I give unto you: not as the world giveth, give I unto you. Let not your heart be troubled, neither let it be afraid." },
    { ref: "Philippians 4:7", text: "And the peace of God, which passeth all understanding, shall keep your hearts and minds through Christ Jesus." },
    { ref: "Isaiah 26:3", text: "Thou wilt keep him in perfect peace, whose mind is stayed on thee: because he trusteth in thee." },
  ]},
  { id: "wisdom", name: "Wisdom", icon: "📖", desc: "Godly wisdom for life's decisions", verses: [
    { ref: "Proverbs 3:5-6", text: "Trust in the LORD with all thine heart; and lean not unto thine own understanding. In all thy ways acknowledge him, and he shall direct thy paths." },
    { ref: "James 1:5", text: "If any of you lack wisdom, let him ask of God, that giveth to all men liberally, and upbraideth not; and it shall be given him." },
    { ref: "Proverbs 1:7", text: "The fear of the LORD is the beginning of wisdom: but fools despise wisdom and instruction." },
  ]},
  { id: "forgiveness", name: "Forgiveness", icon: "✝️", desc: "Receiving and extending forgiveness", verses: [
    { ref: "1 John 1:9", text: "If we confess our sins, he is faithful and just to forgive us our sins, and to cleanse us from all unrighteousness." },
    { ref: "Psalm 103:12", text: "As far as the east is from the west, so far hath he removed our transgressions from us." },
    { ref: "Matthew 6:14", text: "For if ye forgive men their trespasses, your heavenly Father will also forgive you." },
    { ref: "Colossians 3:13", text: "Forbearing one another, and forgiving one another, if any man have a quarrel against any: even as Christ forgave you, so also do ye." },
  ]},
  { id: "strength", name: "Strength", icon: "💪", desc: "Finding strength in God during trials", verses: [
    { ref: "Isaiah 40:31", text: "But they that wait upon the LORD shall renew their strength; they shall mount up with wings as eagles." },
    { ref: "Philippians 4:13", text: "I can do all things through Christ which strengtheneth me." },
    { ref: "Psalm 46:1", text: "God is our refuge and strength, a very present help in trouble." },
    { ref: "2 Corinthians 12:9", text: "And he said unto me, My grace is sufficient for thee: for my strength is made perfect in weakness." },
  ]},
  { id: "hope", name: "Hope", icon: "⭐", desc: "Hope in God's promises", verses: [
    { ref: "Jeremiah 29:11", text: "For I know the thoughts that I think toward you, saith the LORD, thoughts of peace, and not of evil, to give you an expected end." },
    { ref: "Romans 8:28", text: "And we know that all things work together for good to them that love God, to them who are the called according to his purpose." },
    { ref: "Revelation 21:4", text: "And God shall wipe away all tears from their eyes; and there shall be no more death, neither sorrow, nor crying, neither shall there be any more pain." },
  ]},
  { id: "holiness", name: "Holiness", icon: "✨", desc: "Living a life set apart for God", verses: [
    { ref: "1 Peter 1:16", text: "Because it is written, Be ye holy; for I am holy." },
    { ref: "Romans 12:1", text: "I beseech you therefore, brethren, by the mercies of God, that ye present your bodies a living sacrifice, holy, acceptable unto God, which is your reasonable service." },
    { ref: "Hebrews 12:14", text: "Follow peace with all men, and holiness, without which no man shall see the Lord." },
  ]},
];

export const READING_PLANS: ReadingPlan[] = [
  {
    id: "nt_30", name: "New Testament in 30 Days", desc: "Read the entire New Testament in one month — about 9 chapters daily.", durationDays: 30, icon: "📖",
    days: [
      { day: 1, title: "The Gospel Begins", readings: [{ bookId: "mat", bookName: "Matthew", chapter: 1 }, { bookId: "mat", bookName: "Matthew", chapter: 2 }, { bookId: "mat", bookName: "Matthew", chapter: 3 }, { bookId: "mat", bookName: "Matthew", chapter: 4 }, { bookId: "mat", bookName: "Matthew", chapter: 5 }, { bookId: "mat", bookName: "Matthew", chapter: 6 }, { bookId: "mat", bookName: "Matthew", chapter: 7 }, { bookId: "mat", bookName: "Matthew", chapter: 8 }, { bookId: "mat", bookName: "Matthew", chapter: 9 }] },
      { day: 2, title: "Ministry of Jesus", readings: [{ bookId: "mat", bookName: "Matthew", chapter: 10 }, { bookId: "mat", bookName: "Matthew", chapter: 11 }, { bookId: "mat", bookName: "Matthew", chapter: 12 }, { bookId: "mat", bookName: "Matthew", chapter: 13 }, { bookId: "mat", bookName: "Matthew", chapter: 14 }, { bookId: "mat", bookName: "Matthew", chapter: 15 }, { bookId: "mat", bookName: "Matthew", chapter: 16 }, { bookId: "mat", bookName: "Matthew", chapter: 17 }, { bookId: "mat", bookName: "Matthew", chapter: 18 }] },
      { day: 3, title: "Teachings & Passion", readings: [{ bookId: "mat", bookName: "Matthew", chapter: 19 }, { bookId: "mat", bookName: "Matthew", chapter: 20 }, { bookId: "mat", bookName: "Matthew", chapter: 21 }, { bookId: "mat", bookName: "Matthew", chapter: 22 }, { bookId: "mat", bookName: "Matthew", chapter: 23 }, { bookId: "mat", bookName: "Matthew", chapter: 24 }, { bookId: "mat", bookName: "Matthew", chapter: 25 }, { bookId: "mat", bookName: "Matthew", chapter: 26 }, { bookId: "mat", bookName: "Matthew", chapter: 27 }] },
      { day: 4, title: "Resurrection & Mark", readings: [{ bookId: "mat", bookName: "Matthew", chapter: 28 }, { bookId: "mar", bookName: "Mark", chapter: 1 }, { bookId: "mar", bookName: "Mark", chapter: 2 }, { bookId: "mar", bookName: "Mark", chapter: 3 }, { bookId: "mar", bookName: "Mark", chapter: 4 }, { bookId: "mar", bookName: "Mark", chapter: 5 }, { bookId: "mar", bookName: "Mark", chapter: 6 }, { bookId: "mar", bookName: "Mark", chapter: 7 }, { bookId: "mar", bookName: "Mark", chapter: 8 }] },
      { day: 5, title: "Mark's Gospel", readings: [{ bookId: "mar", bookName: "Mark", chapter: 9 }, { bookId: "mar", bookName: "Mark", chapter: 10 }, { bookId: "mar", bookName: "Mark", chapter: 11 }, { bookId: "mar", bookName: "Mark", chapter: 12 }, { bookId: "mar", bookName: "Mark", chapter: 13 }, { bookId: "mar", bookName: "Mark", chapter: 14 }, { bookId: "mar", bookName: "Mark", chapter: 15 }, { bookId: "mar", bookName: "Mark", chapter: 16 }, { bookId: "luk", bookName: "Luke", chapter: 1 }] },
      { day: 6, title: "Luke's Gospel I", readings: [{ bookId: "luk", bookName: "Luke", chapter: 2 }, { bookId: "luk", bookName: "Luke", chapter: 3 }, { bookId: "luk", bookName: "Luke", chapter: 4 }, { bookId: "luk", bookName: "Luke", chapter: 5 }, { bookId: "luk", bookName: "Luke", chapter: 6 }, { bookId: "luk", bookName: "Luke", chapter: 7 }, { bookId: "luk", bookName: "Luke", chapter: 8 }, { bookId: "luk", bookName: "Luke", chapter: 9 }, { bookId: "luk", bookName: "Luke", chapter: 10 }] },
      { day: 7, title: "Parables & Teachings", readings: [{ bookId: "luk", bookName: "Luke", chapter: 11 }, { bookId: "luk", bookName: "Luke", chapter: 12 }, { bookId: "luk", bookName: "Luke", chapter: 13 }, { bookId: "luk", bookName: "Luke", chapter: 14 }, { bookId: "luk", bookName: "Luke", chapter: 15 }, { bookId: "luk", bookName: "Luke", chapter: 16 }, { bookId: "luk", bookName: "Luke", chapter: 17 }, { bookId: "luk", bookName: "Luke", chapter: 18 }, { bookId: "luk", bookName: "Luke", chapter: 19 }] },
      { day: 8, title: "Luke's Passion", readings: [{ bookId: "luk", bookName: "Luke", chapter: 20 }, { bookId: "luk", bookName: "Luke", chapter: 21 }, { bookId: "luk", bookName: "Luke", chapter: 22 }, { bookId: "luk", bookName: "Luke", chapter: 23 }, { bookId: "luk", bookName: "Luke", chapter: 24 }, { bookId: "joh", bookName: "John", chapter: 1 }, { bookId: "joh", bookName: "John", chapter: 2 }, { bookId: "joh", bookName: "John", chapter: 3 }, { bookId: "joh", bookName: "John", chapter: 4 }] },
      { day: 9, title: "John's Gospel I", readings: [{ bookId: "joh", bookName: "John", chapter: 5 }, { bookId: "joh", bookName: "John", chapter: 6 }, { bookId: "joh", bookName: "John", chapter: 7 }, { bookId: "joh", bookName: "John", chapter: 8 }, { bookId: "joh", bookName: "John", chapter: 9 }, { bookId: "joh", bookName: "John", chapter: 10 }, { bookId: "joh", bookName: "John", chapter: 11 }, { bookId: "joh", bookName: "John", chapter: 12 }, { bookId: "joh", bookName: "John", chapter: 13 }] },
      { day: 10, title: "Farewell Discourse", readings: [{ bookId: "joh", bookName: "John", chapter: 14 }, { bookId: "joh", bookName: "John", chapter: 15 }, { bookId: "joh", bookName: "John", chapter: 16 }, { bookId: "joh", bookName: "John", chapter: 17 }, { bookId: "joh", bookName: "John", chapter: 18 }, { bookId: "joh", bookName: "John", chapter: 19 }, { bookId: "joh", bookName: "John", chapter: 20 }, { bookId: "joh", bookName: "John", chapter: 21 }, { bookId: "act", bookName: "Acts", chapter: 1 }] },
      { day: 11, title: "Acts of the Apostles I", readings: [{ bookId: "act", bookName: "Acts", chapter: 2 }, { bookId: "act", bookName: "Acts", chapter: 3 }, { bookId: "act", bookName: "Acts", chapter: 4 }, { bookId: "act", bookName: "Acts", chapter: 5 }, { bookId: "act", bookName: "Acts", chapter: 6 }, { bookId: "act", bookName: "Acts", chapter: 7 }, { bookId: "act", bookName: "Acts", chapter: 8 }, { bookId: "act", bookName: "Acts", chapter: 9 }, { bookId: "act", bookName: "Acts", chapter: 10 }] },
      { day: 12, title: "Acts of the Apostles II", readings: [{ bookId: "act", bookName: "Acts", chapter: 11 }, { bookId: "act", bookName: "Acts", chapter: 12 }, { bookId: "act", bookName: "Acts", chapter: 13 }, { bookId: "act", bookName: "Acts", chapter: 14 }, { bookId: "act", bookName: "Acts", chapter: 15 }, { bookId: "act", bookName: "Acts", chapter: 16 }, { bookId: "act", bookName: "Acts", chapter: 17 }, { bookId: "act", bookName: "Acts", chapter: 18 }, { bookId: "act", bookName: "Acts", chapter: 19 }] },
      { day: 13, title: "Acts & Romans", readings: [{ bookId: "act", bookName: "Acts", chapter: 20 }, { bookId: "act", bookName: "Acts", chapter: 21 }, { bookId: "act", bookName: "Acts", chapter: 22 }, { bookId: "act", bookName: "Acts", chapter: 23 }, { bookId: "act", bookName: "Acts", chapter: 24 }, { bookId: "act", bookName: "Acts", chapter: 25 }, { bookId: "act", bookName: "Acts", chapter: 26 }, { bookId: "act", bookName: "Acts", chapter: 27 }, { bookId: "act", bookName: "Acts", chapter: 28 }] },
      { day: 14, title: "Romans", readings: [{ bookId: "rom", bookName: "Romans", chapter: 1 }, { bookId: "rom", bookName: "Romans", chapter: 2 }, { bookId: "rom", bookName: "Romans", chapter: 3 }, { bookId: "rom", bookName: "Romans", chapter: 4 }, { bookId: "rom", bookName: "Romans", chapter: 5 }, { bookId: "rom", bookName: "Romans", chapter: 6 }, { bookId: "rom", bookName: "Romans", chapter: 7 }, { bookId: "rom", bookName: "Romans", chapter: 8 }, { bookId: "rom", bookName: "Romans", chapter: 9 }] },
      { day: 15, title: "Romans to Corinthians", readings: [{ bookId: "rom", bookName: "Romans", chapter: 10 }, { bookId: "rom", bookName: "Romans", chapter: 11 }, { bookId: "rom", bookName: "Romans", chapter: 12 }, { bookId: "rom", bookName: "Romans", chapter: 13 }, { bookId: "rom", bookName: "Romans", chapter: 14 }, { bookId: "rom", bookName: "Romans", chapter: 15 }, { bookId: "rom", bookName: "Romans", chapter: 16 }, { bookId: "1co", bookName: "1 Corinthians", chapter: 1 }, { bookId: "1co", bookName: "1 Corinthians", chapter: 2 }] },
      { day: 16, title: "1 Corinthians", readings: [{ bookId: "1co", bookName: "1 Corinthians", chapter: 3 }, { bookId: "1co", bookName: "1 Corinthians", chapter: 4 }, { bookId: "1co", bookName: "1 Corinthians", chapter: 5 }, { bookId: "1co", bookName: "1 Corinthians", chapter: 6 }, { bookId: "1co", bookName: "1 Corinthians", chapter: 7 }, { bookId: "1co", bookName: "1 Corinthians", chapter: 8 }, { bookId: "1co", bookName: "1 Corinthians", chapter: 9 }, { bookId: "1co", bookName: "1 Corinthians", chapter: 10 }, { bookId: "1co", bookName: "1 Corinthians", chapter: 11 }] },
      { day: 17, title: "Love & Resurrection", readings: [{ bookId: "1co", bookName: "1 Corinthians", chapter: 12 }, { bookId: "1co", bookName: "1 Corinthians", chapter: 13 }, { bookId: "1co", bookName: "1 Corinthians", chapter: 14 }, { bookId: "1co", bookName: "1 Corinthians", chapter: 15 }, { bookId: "1co", bookName: "1 Corinthians", chapter: 16 }, { bookId: "2co", bookName: "2 Corinthians", chapter: 1 }, { bookId: "2co", bookName: "2 Corinthians", chapter: 2 }, { bookId: "2co", bookName: "2 Corinthians", chapter: 3 }, { bookId: "2co", bookName: "2 Corinthians", chapter: 4 }] },
      { day: 18, title: "Epistles", readings: [{ bookId: "2co", bookName: "2 Corinthians", chapter: 5 }, { bookId: "2co", bookName: "2 Corinthians", chapter: 6 }, { bookId: "2co", bookName: "2 Corinthians", chapter: 7 }, { bookId: "2co", bookName: "2 Corinthians", chapter: 8 }, { bookId: "2co", bookName: "2 Corinthians", chapter: 9 }, { bookId: "2co", bookName: "2 Corinthians", chapter: 10 }, { bookId: "2co", bookName: "2 Corinthians", chapter: 11 }, { bookId: "2co", bookName: "2 Corinthians", chapter: 12 }, { bookId: "2co", bookName: "2 Corinthians", chapter: 13 }] },
      { day: 19, title: "Galatians & Ephesians", readings: [{ bookId: "gal", bookName: "Galatians", chapter: 1 }, { bookId: "gal", bookName: "Galatians", chapter: 2 }, { bookId: "gal", bookName: "Galatians", chapter: 3 }, { bookId: "gal", bookName: "Galatians", chapter: 4 }, { bookId: "gal", bookName: "Galatians", chapter: 5 }, { bookId: "gal", bookName: "Galatians", chapter: 6 }, { bookId: "eph", bookName: "Ephesians", chapter: 1 }, { bookId: "eph", bookName: "Ephesians", chapter: 2 }, { bookId: "eph", bookName: "Ephesians", chapter: 3 }] },
      { day: 20, title: "Prison Epistles", readings: [{ bookId: "eph", bookName: "Ephesians", chapter: 4 }, { bookId: "eph", bookName: "Ephesians", chapter: 5 }, { bookId: "eph", bookName: "Ephesians", chapter: 6 }, { bookId: "phi", bookName: "Philippians", chapter: 1 }, { bookId: "phi", bookName: "Philippians", chapter: 2 }, { bookId: "phi", bookName: "Philippians", chapter: 3 }, { bookId: "phi", bookName: "Philippians", chapter: 4 }, { bookId: "col", bookName: "Colossians", chapter: 1 }, { bookId: "col", bookName: "Colossians", chapter: 2 }] },
      { day: 21, title: "Colossians to Philemon", readings: [{ bookId: "col", bookName: "Colossians", chapter: 3 }, { bookId: "col", bookName: "Colossians", chapter: 4 }, { bookId: "1th", bookName: "1 Thessalonians", chapter: 1 }, { bookId: "1th", bookName: "1 Thessalonians", chapter: 2 }, { bookId: "1th", bookName: "1 Thessalonians", chapter: 3 }, { bookId: "1th", bookName: "1 Thessalonians", chapter: 4 }, { bookId: "1th", bookName: "1 Thessalonians", chapter: 5 }, { bookId: "2th", bookName: "2 Thessalonians", chapter: 1 }, { bookId: "2th", bookName: "2 Thessalonians", chapter: 2 }] },
      { day: 22, title: "Pastoral Epistles", readings: [{ bookId: "2th", bookName: "2 Thessalonians", chapter: 3 }, { bookId: "1ti", bookName: "1 Timothy", chapter: 1 }, { bookId: "1ti", bookName: "1 Timothy", chapter: 2 }, { bookId: "1ti", bookName: "1 Timothy", chapter: 3 }, { bookId: "1ti", bookName: "1 Timothy", chapter: 4 }, { bookId: "1ti", bookName: "1 Timothy", chapter: 5 }, { bookId: "1ti", bookName: "1 Timothy", chapter: 6 }, { bookId: "2ti", bookName: "2 Timothy", chapter: 1 }, { bookId: "2ti", bookName: "2 Timothy", chapter: 2 }] },
      { day: 23, title: "2 Timothy to Hebrews", readings: [{ bookId: "2ti", bookName: "2 Timothy", chapter: 3 }, { bookId: "2ti", bookName: "2 Timothy", chapter: 4 }, { bookId: "tit", bookName: "Titus", chapter: 1 }, { bookId: "tit", bookName: "Titus", chapter: 2 }, { bookId: "tit", bookName: "Titus", chapter: 3 }, { bookId: "phm", bookName: "Philemon", chapter: 1 }, { bookId: "heb", bookName: "Hebrews", chapter: 1 }, { bookId: "heb", bookName: "Hebrews", chapter: 2 }, { bookId: "heb", bookName: "Hebrews", chapter: 3 }] },
      { day: 24, title: "Hebrews", readings: [{ bookId: "heb", bookName: "Hebrews", chapter: 4 }, { bookId: "heb", bookName: "Hebrews", chapter: 5 }, { bookId: "heb", bookName: "Hebrews", chapter: 6 }, { bookId: "heb", bookName: "Hebrews", chapter: 7 }, { bookId: "heb", bookName: "Hebrews", chapter: 8 }, { bookId: "heb", bookName: "Hebrews", chapter: 9 }, { bookId: "heb", bookName: "Hebrews", chapter: 10 }, { bookId: "heb", bookName: "Hebrews", chapter: 11 }, { bookId: "heb", bookName: "Hebrews", chapter: 12 }] },
      { day: 25, title: "Hebrews to Peter", readings: [{ bookId: "heb", bookName: "Hebrews", chapter: 13 }, { bookId: "jam", bookName: "James", chapter: 1 }, { bookId: "jam", bookName: "James", chapter: 2 }, { bookId: "jam", bookName: "James", chapter: 3 }, { bookId: "jam", bookName: "James", chapter: 4 }, { bookId: "jam", bookName: "James", chapter: 5 }, { bookId: "1pe", bookName: "1 Peter", chapter: 1 }, { bookId: "1pe", bookName: "1 Peter", chapter: 2 }, { bookId: "1pe", bookName: "1 Peter", chapter: 3 }] },
      { day: 26, title: "Peter & John", readings: [{ bookId: "1pe", bookName: "1 Peter", chapter: 4 }, { bookId: "1pe", bookName: "1 Peter", chapter: 5 }, { bookId: "2pe", bookName: "2 Peter", chapter: 1 }, { bookId: "2pe", bookName: "2 Peter", chapter: 2 }, { bookId: "2pe", bookName: "2 Peter", chapter: 3 }, { bookId: "1jo", bookName: "1 John", chapter: 1 }, { bookId: "1jo", bookName: "1 John", chapter: 2 }, { bookId: "1jo", bookName: "1 John", chapter: 3 }, { bookId: "1jo", bookName: "1 John", chapter: 4 }] },
      { day: 27, title: "General Epistles", readings: [{ bookId: "1jo", bookName: "1 John", chapter: 5 }, { bookId: "2jo", bookName: "2 John", chapter: 1 }, { bookId: "3jo", bookName: "3 John", chapter: 1 }, { bookId: "jud", bookName: "Jude", chapter: 1 }, { bookId: "rev", bookName: "Revelation", chapter: 1 }, { bookId: "rev", bookName: "Revelation", chapter: 2 }, { bookId: "rev", bookName: "Revelation", chapter: 3 }, { bookId: "rev", bookName: "Revelation", chapter: 4 }, { bookId: "rev", bookName: "Revelation", chapter: 5 }] },
      { day: 28, title: "Revelation I", readings: [{ bookId: "rev", bookName: "Revelation", chapter: 6 }, { bookId: "rev", bookName: "Revelation", chapter: 7 }, { bookId: "rev", bookName: "Revelation", chapter: 8 }, { bookId: "rev", bookName: "Revelation", chapter: 9 }, { bookId: "rev", bookName: "Revelation", chapter: 10 }, { bookId: "rev", bookName: "Revelation", chapter: 11 }, { bookId: "rev", bookName: "Revelation", chapter: 12 }, { bookId: "rev", bookName: "Revelation", chapter: 13 }, { bookId: "rev", bookName: "Revelation", chapter: 14 }] },
      { day: 29, title: "Revelation II", readings: [{ bookId: "rev", bookName: "Revelation", chapter: 15 }, { bookId: "rev", bookName: "Revelation", chapter: 16 }, { bookId: "rev", bookName: "Revelation", chapter: 17 }, { bookId: "rev", bookName: "Revelation", chapter: 18 }, { bookId: "rev", bookName: "Revelation", chapter: 19 }, { bookId: "rev", bookName: "Revelation", chapter: 20 }, { bookId: "rev", bookName: "Revelation", chapter: 21 }, { bookId: "rev", bookName: "Revelation", chapter: 22 }, { bookId: "psa", bookName: "Psalms", chapter: 1 }] },
      { day: 30, title: "Review & Praise", readings: [{ bookId: "psa", bookName: "Psalms", chapter: 23 }, { bookId: "psa", bookName: "Psalms", chapter: 100 }, { bookId: "psa", bookName: "Psalms", chapter: 119 }, { bookId: "psa", bookName: "Psalms", chapter: 121 }, { bookId: "psa", bookName: "Psalms", chapter: 139 }, { bookId: "psa", bookName: "Psalms", chapter: 150 }, { bookId: "pro", bookName: "Proverbs", chapter: 1 }, { bookId: "pro", bookName: "Proverbs", chapter: 3 }, { bookId: "pro", bookName: "Proverbs", chapter: 31 }] },
    ],
  },
  {
    id: "psalms_proverbs", name: "Psalms & Proverbs", desc: "Wisdom and worship — read through Psalms and Proverbs in 60 days.", durationDays: 60, icon: "🎵",
    days: Array.from({ length: 60 }, (_, i) => ({
      day: i + 1,
      title: i < 30 ? `Psalms ${i * 5 + 1}–${Math.min((i + 1) * 5, 150)}` : `Proverbs ${i - 29}`,
      readings: i < 30
        ? Array.from({ length: 5 }, (__, j) => ({ bookId: "psa", bookName: "Psalms", chapter: i * 5 + j + 1 })).filter(r => r.chapter <= 150)
        : [{ bookId: "pro", bookName: "Proverbs", chapter: i - 29 }],
    })),
  },
  {
    id: "genesis_exploration", name: "Genesis: Foundations of Faith", desc: "A deep 14-day journey through the book of Genesis.", durationDays: 14, icon: "🌍",
    days: Array.from({ length: 14 }, (_, i) => ({
      day: i + 1,
      title: ["Creation & Fall", "Cain & Abel", "Noah's Ark", "The Flood", "Tower of Babel", "Abraham's Call", "Abraham & Lot", "God's Covenant", "Sodom & Gomorrah", "Isaac & Rebekah", "Jacob & Esau", "Jacob's Journey", "Joseph's Trials", "Joseph's Triumph"][i],
      readings: [{ bookId: "gen", bookName: "Genesis", chapter: i * 3 + 1 }, { bookId: "gen", bookName: "Genesis", chapter: i * 3 + 2 }, { bookId: "gen", bookName: "Genesis", chapter: i * 3 + 3 }].filter(r => r.chapter <= 50),
    })),
  },
  {
    id: "sermon_on_mount", name: "Sermon on the Mount", desc: "7 days meditating on Matthew 5–7, the heart of Jesus' teaching.", durationDays: 7, icon: "⛰️",
    days: [
      { day: 1, title: "Beatitudes", readings: [{ bookId: "mat", bookName: "Matthew", chapter: 5 }] },
      { day: 2, title: "Salt, Light & Law", readings: [{ bookId: "mat", bookName: "Matthew", chapter: 5 }, { bookId: "mat", bookName: "Matthew", chapter: 6 }] },
      { day: 3, title: "The Lord's Prayer", readings: [{ bookId: "mat", bookName: "Matthew", chapter: 6 }] },
      { day: 4, title: "Anxiety & Seeking", readings: [{ bookId: "mat", bookName: "Matthew", chapter: 6 }, { bookId: "mat", bookName: "Matthew", chapter: 7 }] },
      { day: 5, title: "Ask, Seek, Knock", readings: [{ bookId: "mat", bookName: "Matthew", chapter: 7 }] },
      { day: 6, title: "Two Roads", readings: [{ bookId: "mat", bookName: "Matthew", chapter: 7 }, { bookId: "luk", bookName: "Luke", chapter: 6 }] },
      { day: 7, title: "Reflection & Application", readings: [{ bookId: "mat", bookName: "Matthew", chapter: 5 }, { bookId: "mat", bookName: "Matthew", chapter: 6 }, { bookId: "mat", bookName: "Matthew", chapter: 7 }] },
    ],
  },
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  { id: "q1", question: "Who built the ark to survive the great flood?", options: ["Abraham", "Moses", "Noah", "Jonah"], answerIndex: 2, difficulty: "easy", hint: "God told him to build it from gopher wood.", reference: "Genesis 6:14" },
  { id: "q2", question: "How many days did Jesus fast in the wilderness?", options: ["3", "7", "30", "40"], answerIndex: 3, difficulty: "easy", hint: "The same number Moses spent on Mount Sinai.", reference: "Matthew 4:2" },
  { id: "q3", question: "Which psalm begins 'The LORD is my shepherd'?", options: ["Psalm 1", "Psalm 23", "Psalm 91", "Psalm 119"], answerIndex: 1, difficulty: "easy", hint: "Written by King David, the former shepherd.", reference: "Psalm 23:1" },
  { id: "q4", question: "Who was swallowed by a great fish?", options: ["Elijah", "Jonah", "Amos", "Nahum"], answerIndex: 1, difficulty: "easy", hint: "He was fleeing God's call to Nineveh.", reference: "Jonah 1:17" },
  { id: "q5", question: "In the beginning, what did God create first?", options: ["The stars", "Light", "Animals", "The sea"], answerIndex: 1, difficulty: "easy", hint: "God said 'Let there be...'", reference: "Genesis 1:3" },
  { id: "q6", question: "Who was the first king of Israel?", options: ["David", "Solomon", "Saul", "Samson"], answerIndex: 2, difficulty: "medium", hint: "He was from the tribe of Benjamin.", reference: "1 Samuel 10:1" },
  { id: "q7", question: "How many books are in the New Testament?", options: ["21", "27", "39", "66"], answerIndex: 1, difficulty: "easy", hint: "From Matthew to Revelation.", reference: "Biblical Canon" },
  { id: "q8", question: "Who betrayed Jesus for 30 pieces of silver?", options: ["Peter", "Thomas", "Judas Iscariot", "Barabbas"], answerIndex: 2, difficulty: "easy", hint: "He was one of the twelve disciples.", reference: "Matthew 26:15" },
  { id: "q9", question: "Which apostle was a tax collector before following Jesus?", options: ["Peter", "Matthew", "John", "Andrew"], answerIndex: 1, difficulty: "medium", hint: "His other name was Levi.", reference: "Matthew 9:9" },
  { id: "q10", question: "What was the name of the garden where Jesus prayed before his arrest?", options: ["Eden", "Gethsemane", "Gethsheba", "Galilee"], answerIndex: 1, difficulty: "medium", hint: "It means 'oil press' in Hebrew.", reference: "Matthew 26:36" },
  { id: "q11", question: "Who wrote most of the New Testament letters (epistles)?", options: ["John", "Peter", "James", "Paul"], answerIndex: 3, difficulty: "easy", hint: "He was formerly known as Saul of Tarsus.", reference: "Acts 9:1" },
  { id: "q12", question: "How many disciples did Jesus choose?", options: ["7", "10", "12", "70"], answerIndex: 2, difficulty: "easy", hint: "Matching the number of tribes of Israel.", reference: "Matthew 10:1-4" },
  { id: "q13", question: "What did Samson's strength come from?", options: ["A special ring", "His hair", "Prayer", "A golden sword"], answerIndex: 1, difficulty: "medium", hint: "Delilah discovered his secret.", reference: "Judges 16:17" },
  { id: "q14", question: "On what mountain did Moses receive the Ten Commandments?", options: ["Mount Zion", "Mount Ararat", "Mount Sinai", "Mount Carmel"], answerIndex: 2, difficulty: "easy", hint: "Also called Horeb in Deuteronomy.", reference: "Exodus 19:20" },
  { id: "q15", question: "Who was the mother of Jesus?", options: ["Elizabeth", "Mary", "Martha", "Miriam"], answerIndex: 1, difficulty: "easy", hint: "She was betrothed to Joseph.", reference: "Luke 1:27" },
  { id: "q16", question: "Which Old Testament book contains the story of Ruth?", options: ["Judges", "Ruth", "1 Samuel", "Esther"], answerIndex: 1, difficulty: "easy", hint: "It's a short book, just 4 chapters.", reference: "Ruth 1:1" },
  { id: "q17", question: "What weapon did David use to defeat Goliath?", options: ["Sword", "Spear", "Sling & stone", "Arrow"], answerIndex: 2, difficulty: "easy", hint: "He chose five smooth stones from a brook.", reference: "1 Samuel 17:49" },
  { id: "q18", question: "Who was thrown into the den of lions and survived?", options: ["Shadrach", "Daniel", "Elijah", "Joseph"], answerIndex: 1, difficulty: "easy", hint: "He prayed three times daily facing Jerusalem.", reference: "Daniel 6:16" },
  { id: "q19", question: "What is the shortest verse in the Bible?", options: ["John 11:35", "Job 3:2", "Acts 7:14", "1 Kings 1:1"], answerIndex: 0, difficulty: "medium", hint: "Just two words about Jesus at a tomb.", reference: "John 11:35" },
  { id: "q20", question: "Which city's walls fell after the Israelites marched around it?", options: ["Jerusalem", "Jericho", "Nineveh", "Babylon"], answerIndex: 1, difficulty: "easy", hint: "They marched for 7 days.", reference: "Joshua 6:20" },
  { id: "q21", question: "Who was the first person to see Jesus after his resurrection?", options: ["Peter", "Mary Magdalene", "John", "Mary, the mother of Jesus"], answerIndex: 1, difficulty: "medium", hint: "She thought he was the gardener.", reference: "John 20:14-16" },
  { id: "q22", question: "In which city was Jesus born?", options: ["Nazareth", "Jerusalem", "Bethlehem", "Capernaum"], answerIndex: 2, difficulty: "easy", hint: "Micah 5:2 prophesied it.", reference: "Luke 2:4-7" },
  { id: "q23", question: "How many Psalms are in the Bible?", options: ["100", "120", "150", "175"], answerIndex: 2, difficulty: "medium", hint: "It's the longest book in the Bible.", reference: "Psalms" },
  { id: "q24", question: "Who received a coat of many colours from his father?", options: ["Benjamin", "Judah", "Reuben", "Joseph"], answerIndex: 3, difficulty: "easy", hint: "His jealous brothers sold him into slavery.", reference: "Genesis 37:3" },
  { id: "q25", question: "What happened to Lot's wife when she looked back at Sodom?", options: ["She went blind", "She turned into a pillar of salt", "She was struck by lightning", "She turned to stone"], answerIndex: 1, difficulty: "medium", hint: "Genesis 19 records the event.", reference: "Genesis 19:26" },
  { id: "q26", question: "Which prophet was taken to heaven in a chariot of fire?", options: ["Elisha", "Isaiah", "Elijah", "Ezekiel"], answerIndex: 2, difficulty: "medium", hint: "His successor received a double portion of his spirit.", reference: "2 Kings 2:11" },
  { id: "q27", question: "What are the first four books of the New Testament called?", options: ["The Law", "The Gospels", "The Epistles", "The Prophets"], answerIndex: 1, difficulty: "easy", hint: "Matthew, Mark, Luke, John.", reference: "Matthew–John" },
  { id: "q28", question: "Which woman in the OT saved her people by speaking to a king?", options: ["Deborah", "Ruth", "Esther", "Hannah"], answerIndex: 2, difficulty: "medium", hint: "Her Hebrew name was Hadassah.", reference: "Esther 4:14" },
  { id: "q29", question: "What is the last book of the Bible?", options: ["Jude", "3 John", "Hebrews", "Revelation"], answerIndex: 3, difficulty: "easy", hint: "It contains visions given to the apostle John.", reference: "Revelation 1:1" },
  { id: "q30", question: "How many times did Peter deny Jesus?", options: ["Once", "Twice", "Three times", "Seven times"], answerIndex: 2, difficulty: "easy", hint: "Jesus predicted it before the rooster crowed.", reference: "Matthew 26:75" },
];

export const MEMORY_VERSES: MemoryVerse[] = [
  { ref: "John 3:16", text: "For God so loved the world, that he gave his only begotten Son, that whosoever believeth in him should not perish, but have everlasting life.", category: "Salvation" },
  { ref: "Romans 8:28", text: "And we know that all things work together for good to them that love God, to them who are the called according to his purpose.", category: "Providence" },
  { ref: "Philippians 4:13", text: "I can do all things through Christ which strengtheneth me.", category: "Strength" },
  { ref: "Psalm 23:1", text: "The LORD is my shepherd; I shall not want.", category: "Trust" },
  { ref: "Proverbs 3:5-6", text: "Trust in the LORD with all thine heart; and lean not unto thine own understanding. In all thy ways acknowledge him, and he shall direct thy paths.", category: "Wisdom" },
  { ref: "Isaiah 40:31", text: "But they that wait upon the LORD shall renew their strength; they shall mount up with wings as eagles; they shall run, and not be weary; and they shall walk, and not faint.", category: "Strength" },
  { ref: "Jeremiah 29:11", text: "For I know the thoughts that I think toward you, saith the LORD, thoughts of peace, and not of evil, to give you an expected end.", category: "Hope" },
  { ref: "Matthew 6:33", text: "But seek ye first the kingdom of God, and his righteousness; and all these things shall be added unto you.", category: "Priority" },
  { ref: "2 Timothy 3:16-17", text: "All scripture is given by inspiration of God, and is profitable for doctrine, for reproof, for correction, for instruction in righteousness: That the man of God may be perfect, throughly furnished unto all good works.", category: "Scripture" },
  { ref: "Hebrews 11:1", text: "Now faith is the substance of things hoped for, the evidence of things not seen.", category: "Faith" },
  { ref: "1 John 1:9", text: "If we confess our sins, he is faithful and just to forgive us our sins, and to cleanse us from all unrighteousness.", category: "Forgiveness" },
  { ref: "Galatians 5:22-23", text: "But the fruit of the Spirit is love, joy, peace, longsuffering, gentleness, goodness, faith, meekness, temperance: against such there is no law.", category: "Holy Spirit" },
  { ref: "Ephesians 2:8-9", text: "For by grace are ye saved through faith; and that not of yourselves: it is the gift of God: Not of works, lest any man should boast.", category: "Salvation" },
  { ref: "Romans 12:2", text: "And be not conformed to this world: but be ye transformed by the renewing of your mind, that ye may prove what is that good, and acceptable, and perfect, will of God.", category: "Transformation" },
  { ref: "John 14:6", text: "Jesus saith unto him, I am the way, the truth, and the life: no man cometh unto the Father, but by me.", category: "Jesus" },
  { ref: "Romans 6:23", text: "For the wages of sin is death; but the gift of God is eternal life through Jesus Christ our Lord.", category: "Salvation" },
  { ref: "Psalm 119:105", text: "Thy word is a lamp unto my feet, and a light unto my path.", category: "Scripture" },
  { ref: "Joshua 1:9", text: "Have not I commanded thee? Be strong and of a good courage; be not afraid, neither be thou dismayed: for the LORD thy God is with thee whithersoever thou goest.", category: "Courage" },
  { ref: "Philippians 4:6-7", text: "Be careful for nothing; but in every thing by prayer and supplication with thanksgiving let your requests be made known unto God. And the peace of God, which passeth all understanding, shall keep your hearts and minds through Christ Jesus.", category: "Prayer" },
  { ref: "Romans 3:23", text: "For all have sinned, and come short of the glory of God.", category: "Sin" },
];

export const FEAST_DAYS: FeastDay[] = [
  { name: "Passover", hebrewName: "Pesach", desc: "Commemorates God's deliverance of Israel from Egyptian slavery. The angel of death 'passed over' homes marked with lamb's blood. Fulfilled in Christ, the Lamb of God.", scripture: "Exodus 12:1-14; 1 Corinthians 5:7", significance: "Redemption from bondage; foreshadows Christ's atoning death", season: "Spring (Nisan 14)" },
  { name: "Unleavened Bread", hebrewName: "Chag HaMatzot", desc: "Seven days of eating bread without yeast, symbolising the haste of the Exodus and the removal of sin. Leaven represents sin and corruption throughout Scripture.", scripture: "Exodus 12:15-20; 1 Corinthians 5:6-8", significance: "Holiness; separation from sin; new beginning", season: "Spring (Nisan 15–21)" },
  { name: "Firstfruits", hebrewName: "Bikkurim", desc: "Offering the first portion of the harvest to God in gratitude. Paul calls Christ 'the firstfruits of them that slept' — risen on this very day.", scripture: "Leviticus 23:9-14; 1 Corinthians 15:20-23", significance: "Resurrection; Christ risen as the first of the great harvest", season: "Spring (Day after Sabbath during Unleavened Bread)" },
  { name: "Pentecost / Weeks", hebrewName: "Shavuot", desc: "Fifty days after Firstfruits. Celebrates the wheat harvest and the giving of the Torah. In the NT, the Holy Spirit was poured out at Pentecost (Acts 2), birthing the church.", scripture: "Leviticus 23:15-22; Acts 2:1-4", significance: "Giving of the Law; outpouring of the Holy Spirit; birth of the Church", season: "Late Spring (50 days after Firstfruits)" },
  { name: "Trumpets", hebrewName: "Rosh Hashanah", desc: "Jewish New Year. Marked by 100 blasts of the shofar (ram's horn). Associated in NT prophecy with the return of Christ and the resurrection of the dead.", scripture: "Leviticus 23:23-25; 1 Thessalonians 4:16", significance: "Awakening; calling God's people; foreshadows Christ's return", season: "Autumn (Tishri 1)" },
  { name: "Day of Atonement", hebrewName: "Yom Kippur", desc: "The holiest day of the Jewish year. High priest made atonement for all Israel's sins. A scapegoat bore the sins of the people into the wilderness — a powerful picture of Christ.", scripture: "Leviticus 16; Hebrews 9:11-28", significance: "National atonement; Christ as our High Priest and sacrifice", season: "Autumn (Tishri 10)" },
  { name: "Tabernacles", hebrewName: "Sukkot", desc: "Seven days dwelling in temporary shelters, remembering the wilderness wandering. Many scholars believe Jesus was born during Sukkot — God 'tabernacling' (dwelling) among us.", scripture: "Leviticus 23:33-43; John 1:14; John 7:2", significance: "God dwelling with His people; final rest; Messianic Kingdom", season: "Autumn (Tishri 15–21)" },
];

export const TIMELINE_EVENTS: TimelineEvent[] = [
  { id: "t1", year: "c. 4000 BC", event: "Creation", desc: "God creates the heavens and the earth, culminating in the creation of mankind in His image.", scripture: "Genesis 1–2", era: "Primeval", epochOrder: 1 },
  { id: "t2", year: "c. 4000 BC", event: "The Fall", desc: "Adam and Eve disobey God and eat from the tree of knowledge. Sin and death enter creation.", scripture: "Genesis 3", era: "Primeval", epochOrder: 2 },
  { id: "t3", year: "c. 3000 BC", event: "Noah's Flood", desc: "God sends a flood to judge humanity's wickedness. Noah, his family, and animals are saved in the ark.", scripture: "Genesis 6–9", era: "Primeval", epochOrder: 3 },
  { id: "t4", year: "c. 2500 BC", event: "Tower of Babel", desc: "God confuses the languages of humanity and scatters them across the earth.", scripture: "Genesis 11", era: "Primeval", epochOrder: 4 },
  { id: "t5", year: "c. 2100 BC", event: "Abraham's Call", desc: "God calls Abram out of Ur, promising to make him a great nation and bless all peoples through him.", scripture: "Genesis 12", era: "Patriarchs", epochOrder: 5 },
  { id: "t6", year: "c. 2000 BC", event: "Abraham's Covenant", desc: "God establishes His covenant with Abraham, promising the land of Canaan and innumerable descendants.", scripture: "Genesis 15, 17", era: "Patriarchs", epochOrder: 6 },
  { id: "t7", year: "c. 1950 BC", event: "Birth of Isaac", desc: "The miracle child of promise born to Abraham and Sarah in their old age, continuing the covenant line.", scripture: "Genesis 21", era: "Patriarchs", epochOrder: 7 },
  { id: "t8", year: "c. 1900 BC", event: "Joseph in Egypt", desc: "Joseph is sold into slavery by his brothers, rises to power in Egypt, and saves his family from famine.", scripture: "Genesis 37–50", era: "Patriarchs", epochOrder: 8 },
  { id: "t9", year: "c. 1526 BC", event: "Birth of Moses", desc: "Moses is born in Egypt during Hebrew slavery and miraculously saved from Pharaoh's decree.", scripture: "Exodus 2", era: "Exodus", epochOrder: 9 },
  { id: "t10", year: "c. 1446 BC", event: "The Exodus", desc: "God delivers Israel from Egyptian slavery through ten plagues. The nation crosses the Red Sea on dry ground.", scripture: "Exodus 1–15", era: "Exodus", epochOrder: 10 },
  { id: "t11", year: "c. 1446 BC", event: "Ten Commandments", desc: "God gives Moses the law on Mount Sinai, establishing His covenant with the nation of Israel.", scripture: "Exodus 20", era: "Exodus", epochOrder: 11 },
  { id: "t12", year: "c. 1406 BC", event: "Entering Canaan", desc: "Under Joshua's leadership, Israel crosses the Jordan River and enters the Promised Land.", scripture: "Joshua 1–4", era: "Conquest", epochOrder: 12 },
  { id: "t13", year: "c. 1400–1050 BC", event: "Period of Judges", desc: "A cycle of apostasy, oppression, repentance, and deliverance led by figures like Deborah, Gideon, and Samson.", scripture: "Judges 1–21", era: "Judges", epochOrder: 13 },
  { id: "t14", year: "c. 1050 BC", event: "Saul Becomes King", desc: "Israel demands a king. Saul of Benjamin is anointed as the first king of Israel.", scripture: "1 Samuel 10", era: "United Kingdom", epochOrder: 14 },
  { id: "t15", year: "c. 1010 BC", event: "David Becomes King", desc: "After Saul's death, David is crowned king. He captures Jerusalem and brings the Ark of the Covenant there.", scripture: "2 Samuel 2–6", era: "United Kingdom", epochOrder: 15 },
  { id: "t16", year: "c. 967 BC", event: "Solomon's Temple Built", desc: "Solomon constructs the first Temple in Jerusalem — a magnificent house for God's presence.", scripture: "1 Kings 6–8", era: "United Kingdom", epochOrder: 16 },
  { id: "t17", year: "c. 930 BC", event: "Kingdom Divided", desc: "After Solomon's death, Israel splits into the northern kingdom (Israel) and the southern kingdom (Judah).", scripture: "1 Kings 12", era: "Divided Kingdom", epochOrder: 17 },
  { id: "t18", year: "c. 870–845 BC", event: "Elijah's Ministry", desc: "The prophet Elijah confronts King Ahab and the prophets of Baal at Mount Carmel.", scripture: "1 Kings 17–21", era: "Divided Kingdom", epochOrder: 18 },
  { id: "t19", year: "c. 740–700 BC", event: "Isaiah's Prophecies", desc: "Isaiah prophesies Messiah's coming, the virgin birth, and the Suffering Servant.", scripture: "Isaiah 7, 53", era: "Prophets", epochOrder: 19 },
  { id: "t20", year: "c. 722 BC", event: "Fall of Northern Kingdom", desc: "Assyria conquers the northern kingdom of Israel, taking the ten tribes into captivity.", scripture: "2 Kings 17", era: "Exile", epochOrder: 20 },
  { id: "t21", year: "c. 605–586 BC", event: "Babylonian Exile", desc: "Nebuchadnezzar conquers Jerusalem in stages. The Temple is destroyed and Judah goes into exile.", scripture: "2 Kings 25; Daniel 1", era: "Exile", epochOrder: 21 },
  { id: "t22", year: "c. 538 BC", event: "Return from Exile", desc: "Cyrus the Great of Persia decrees that Jews may return to their land and rebuild the Temple.", scripture: "Ezra 1; Isaiah 44:28", era: "Restoration", epochOrder: 22 },
  { id: "t23", year: "c. 516 BC", event: "Second Temple Built", desc: "Under Zerubbabel and Joshua the high priest, the second Temple is completed and dedicated.", scripture: "Ezra 6", era: "Restoration", epochOrder: 23 },
  { id: "t24", year: "c. 450 BC", event: "Malachi — Last OT Prophet", desc: "Malachi prophesies the coming of Elijah before the great Day of the LORD, closing the OT era.", scripture: "Malachi 4:5-6", era: "Restoration", epochOrder: 24 },
  { id: "t25", year: "c. 6/5 BC", event: "Birth of Jesus", desc: "Jesus is born in Bethlehem to the virgin Mary, fulfilling centuries of Messianic prophecy.", scripture: "Matthew 1–2; Luke 2", era: "New Testament", epochOrder: 25 },
  { id: "t26", year: "c. AD 26–29", event: "Jesus' Ministry", desc: "Jesus is baptised, calls disciples, performs miracles, teaches the Sermon on the Mount, and travels through Israel.", scripture: "Matthew–John", era: "New Testament", epochOrder: 26 },
  { id: "t27", year: "c. AD 30/33", event: "Crucifixion & Resurrection", desc: "Jesus is crucified, buried, and rises bodily from the dead on the third day — the cornerstone of Christian faith.", scripture: "Matthew 27–28; 1 Corinthians 15", era: "New Testament", epochOrder: 27 },
  { id: "t28", year: "c. AD 30/33", event: "Pentecost & Church Born", desc: "The Holy Spirit is poured out at Pentecost. 3,000 are saved. The church of Jesus Christ begins.", scripture: "Acts 2", era: "New Testament", epochOrder: 28 },
  { id: "t29", year: "c. AD 45–65", event: "Paul's Missionary Journeys", desc: "Paul travels throughout the Roman Empire planting churches and writing letters that become the NT epistles.", scripture: "Acts 13–28; Romans–Philemon", era: "New Testament", epochOrder: 29 },
  { id: "t30", year: "c. AD 95", event: "Revelation Written", desc: "The apostle John, exiled on Patmos, receives visions of the end times and writes the Book of Revelation.", scripture: "Revelation 1:9", era: "New Testament", epochOrder: 30 },
];

export const CROSS_REFERENCES: CrossRef[] = [
  { from: "Genesis 3:15", to: ["Isaiah 7:14", "Matthew 1:23", "Revelation 12:17"], theme: "Messianic Seed Promise" },
  { from: "Genesis 12:3", to: ["Galatians 3:8", "Matthew 1:1", "Acts 3:25"], theme: "Abraham's Universal Blessing" },
  { from: "Psalm 22:1", to: ["Matthew 27:46", "Mark 15:34"], theme: "Cry of Desolation — Fulfilled" },
  { from: "Psalm 22:16-18", to: ["John 19:23-24", "Luke 23:33"], theme: "Crucifixion Details Prophesied" },
  { from: "Isaiah 7:14", to: ["Matthew 1:22-23", "Luke 1:26-35"], theme: "Virgin Birth Prophecy" },
  { from: "Isaiah 53:5", to: ["1 Peter 2:24", "Romans 5:8", "Hebrews 9:28"], theme: "Suffering Servant — Atonement" },
  { from: "Micah 5:2", to: ["Matthew 2:6", "Luke 2:4"], theme: "Birthplace of Messiah" },
  { from: "Malachi 4:5", to: ["Matthew 11:14", "Luke 1:17", "Mark 9:12-13"], theme: "Elijah to Come — John the Baptist" },
  { from: "John 3:16", to: ["Romans 5:8", "1 John 4:9-10", "Ephesians 2:4-5"], theme: "God's Love in Christ" },
  { from: "Romans 3:23", to: ["Romans 6:23", "Galatians 3:22", "1 John 1:8"], theme: "Universal Sinfulness" },
  { from: "Romans 8:28", to: ["Genesis 50:20", "Jeremiah 29:11", "Ephesians 1:11"], theme: "God Works All Things for Good" },
  { from: "Hebrews 11:1", to: ["2 Corinthians 5:7", "Romans 8:24-25", "Galatians 3:11"], theme: "Definition of Faith" },
  { from: "Revelation 21:4", to: ["Isaiah 25:8", "Revelation 7:17", "Isaiah 65:17-19"], theme: "No More Death or Tears" },
];
