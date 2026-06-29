export type Difficulty = "Beginner" | "Intermediate" | "Advanced";
export type EvidenceStrength = "Low" | "Medium" | "High";

export interface Evidence {
  id: string;
  icon: string;
  title: string;
  description: string;
  lesson: string;
}

export interface Question {
  id: string;
  text: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface Witness {
  id: string;
  name: string;
  role: string;
  statement: string;
  questions: Question[];
}

export interface TimelineEvent {
  id: string;
  text: string;
  correctOrder: number;
}

export interface SuspectProfile {
  name: string;
  motive: string;
  evidenceStrength: EvidenceStrength;
  description: string;
}

export interface Lesson {
  type: string;
  text: string;
}

export interface Case {
  id: string;
  caseNumber: string;
  title: string;
  bibleReference: string;
  difficulty: Difficulty;
  victim: string;
  suspects: string[];
  introduction: string;
  evidence: Evidence[];
  witnesses: Witness[];
  timeline: TimelineEvent[];
  suspectProfiles: SuspectProfile[];
  correctSuspect: string;
  revealText: string;
  revealVerse: string;
  lessons: Lesson[];
  reflectionQuestions: string[];
  rewards: {
    xp: number;
    coins: number;
    badge: string;
    rankProgress: number;
  };
  nextCaseTitle?: string;
  closingText: string;
}

export const CASES: Case[] = [
  {
    id: "001",
    caseNumber: "CASE #001",
    title: "The First Murder",
    bibleReference: "Genesis 4",
    difficulty: "Beginner",
    victim: "Abel",
    suspects: ["Cain", "Adam", "Eve", "Unknown"],
    introduction:
      "In the earliest days of human history, when the world was still new and unscarred, two brothers stood before God with their offerings. One was a shepherd. The other, a farmer. The smoke of one rose high — accepted. The other drifted low — rejected.\n\nIn the days that followed, a silence grew between them. A silence thick with jealousy, burning like an unseen coal. Then came a walk into an open field... and Abel was never seen alive again.\n\nYou are the detective assigned to this ancient case. The evidence is scattered across sacred text. The witnesses have spoken. The clues are waiting.\n\nFind the truth. Bring justice to the first crime in human history.",
    evidence: [
      {
        id: "e1",
        icon: "fire",
        title: "The Rejected Offering",
        description:
          "Cain brought fruits of the ground as an offering, but God did not accept it, while Abel's offering of firstborn flock was received with favor.",
        lesson: "God values the heart and spirit behind our worship, not just the act itself.",
      },
      {
        id: "e2",
        icon: "alert-circle",
        title: "The Warning from God",
        description:
          "Before anything happened, God warned Cain directly: 'If you do not do what is right, sin is crouching at your door; it desires to have you, but you must rule over it.'",
        lesson: "God always gives us warning before we fall. We choose whether to listen.",
      },
      {
        id: "e3",
        icon: "frown",
        title: "The Fallen Countenance",
        description:
          "After his offering was rejected, Cain's face fell. He was visibly angry and deeply distressed — his emotions were observable to God himself.",
        lesson: "Unchecked anger and jealousy become dangerous when we refuse to examine them.",
      },
      {
        id: "e4",
        icon: "map-pin",
        title: "The Invitation to the Field",
        description:
          "Scripture records that Cain said to Abel 'Let us go out to the field' — a deliberate invitation to an isolated location with no witnesses.",
        lesson: "Premeditation and secrecy often accompany acts of jealousy-driven violence.",
      },
      {
        id: "e5",
        icon: "droplet",
        title: "The Voice of Blood",
        description:
          "After the act, God declared to Cain: 'Your brother's blood cries out to me from the ground.' No crime is hidden from God.",
        lesson: "Truth cannot be permanently buried. Justice seeks out every hidden thing.",
      },
      {
        id: "e6",
        icon: "shield-off",
        title: "The Deceptive Answer",
        description:
          "When God asked 'Where is your brother Abel?' Cain responded: 'I don't know. Am I my brother's keeper?' — a deflection that revealed guilt.",
        lesson: "Lies and deflection are the language of a guilty conscience.",
      },
    ],
    witnesses: [
      {
        id: "w1",
        name: "The LORD God",
        role: "Divine Witness",
        statement:
          "I saw Cain's heart before he acted. I warned him that sin was waiting at his door. I gave him the chance to choose rightly. I also heard what the ground itself cried out when it was stained.",
        questions: [
          {
            id: "q1",
            text: "What did God say to Cain before the incident?",
            options: [
              "Nothing — God was silent",
              "Sin is crouching at your door and desires to have you",
              "Your offering is acceptable to me",
              "You must ask Abel for forgiveness",
            ],
            correctIndex: 1,
            explanation:
              "God warned Cain directly in Genesis 4:7: 'If you do not do what is right, sin is crouching at your door; it desires to have you, but you must rule over it.'",
          },
          {
            id: "q2",
            text: "How did God discover what had happened to Abel?",
            options: [
              "Adam told God",
              "God saw it happen directly",
              "Abel's blood cried out from the ground",
              "Eve witnessed and reported it",
            ],
            correctIndex: 2,
            explanation:
              "Genesis 4:10 records God saying: 'Your brother's blood cries out to me from the ground.' The ground itself bore witness.",
          },
        ],
      },
      {
        id: "w2",
        name: "Cain",
        role: "Primary Suspect",
        statement:
          "I worked the soil — that was my life. My offering came from what I had. When it wasn't accepted, I felt something I had never felt before. Then God spoke to me. I should have listened. I asked Abel to walk with me to the field.",
        questions: [
          {
            id: "q3",
            text: "What was Cain's occupation according to Scripture?",
            options: [
              "A fisherman",
              "A shepherd like Abel",
              "A worker of the ground (farmer)",
              "A priest",
            ],
            correctIndex: 2,
            explanation:
              "Genesis 4:2 tells us: 'Cain worked the soil.' This is why his offering consisted of 'some of the fruits of the soil.'",
          },
          {
            id: "q4",
            text: "What mercy did God show Cain after his punishment?",
            options: [
              "God removed all punishment",
              "God placed a protective mark on Cain",
              "God allowed Cain to return home",
              "God restored Abel to life",
            ],
            correctIndex: 1,
            explanation:
              "Despite Cain's act, God showed mercy: 'The LORD put a mark on Cain so that no one who found him would kill him.' (Genesis 4:15) — a demonstration of grace even toward the guilty.",
          },
        ],
      },
      {
        id: "w3",
        name: "The Ground",
        role: "Silent Witness",
        statement:
          "I received what should never have fallen upon me. I was cursed to yield nothing for the one who stained me. Even the soil remembers what humans try to forget.",
        questions: [
          {
            id: "q5",
            text: "What consequence did the ground receive because of the crime?",
            options: [
              "Nothing — only Cain was punished",
              "The ground was made barren for Cain — it would no longer yield its strength",
              "The ground was destroyed",
              "The ground was turned to desert",
            ],
            correctIndex: 1,
            explanation:
              "God told Cain: 'When you work the ground, it will no longer yield its crops for you.' (Genesis 4:12) — the soil Cain had stained would now resist him.",
          },
        ],
      },
    ],
    timeline: [
      { id: "t1", text: "Cain and Abel each bring their offerings to God", correctOrder: 1 },
      { id: "t2", text: "God accepts Abel's offering but not Cain's", correctOrder: 2 },
      { id: "t3", text: "Cain's face falls and he becomes deeply angry", correctOrder: 3 },
      { id: "t4", text: "God warns Cain that sin is crouching at his door", correctOrder: 4 },
      { id: "t5", text: "Cain invites Abel to walk with him to the field", correctOrder: 5 },
      { id: "t6", text: "Abel is killed in the field", correctOrder: 6 },
      { id: "t7", text: "God confronts Cain: 'Where is your brother Abel?'", correctOrder: 7 },
      { id: "t8", text: "Cain is banished but marked for protection by God", correctOrder: 8 },
    ],
    suspectProfiles: [
      {
        name: "Cain",
        motive: "Jealousy over rejected offering; wounded pride; unresolved anger toward Abel",
        evidenceStrength: "High",
        description:
          "Was present. Had clear motive. Invited Abel to the field alone. Gave a deflecting answer when questioned. Was directly confronted by God.",
      },
      {
        name: "Adam",
        motive: "No clear motive recorded",
        evidenceStrength: "Low",
        description:
          "Scripture places no suspicion on Adam. He was not present in the account of the event and had no recorded conflict with Abel.",
      },
      {
        name: "Eve",
        motive: "No recorded motive",
        evidenceStrength: "Low",
        description:
          "Eve is not mentioned in connection with the event. There is no scriptural evidence linking her to any involvement.",
      },
      {
        name: "Unknown",
        motive: "No other humans existed at the time",
        evidenceStrength: "Low",
        description:
          "At this point in history, the only humans were Adam, Eve, Cain, and Abel. No unknown party is suggested by the text.",
      },
    ],
    correctSuspect: "Cain",
    revealText:
      "The answer is Cain — firstborn son of Adam and Eve, the world's first murderer.\n\nGenesis 4 is explicit: driven by jealousy over God's rejection of his offering, Cain allowed anger to take root and grow. God personally warned him — a divine intervention before the act — but Cain refused to rule over sin. Instead, he led his brother to an isolated field and took his life.\n\nWhen confronted, Cain denied it with the famous words: 'Am I my brother's keeper?' — a deflection that revealed his guilt.\n\nGod pronounced judgment: Cain would be a restless wanderer, the ground cursed for him. Yet even in judgment, God showed mercy — placing a mark on Cain so that no one would kill him.\n\nThe story of Cain and Abel is not just about murder. It is about the danger of jealousy, the grace of divine warning, and the consequence of choosing sin over righteousness.",
    revealVerse:
      "\"If you do what is right, will you not be accepted? But if you do not do what is right, sin is crouching at your door; it desires to have you, but you must rule over it.\" — Genesis 4:7",
    lessons: [
      { type: "Spiritual", text: "God evaluates the heart behind our worship, not just the outward action." },
      { type: "Emotional", text: "Jealousy, left unchecked, grows into something destructive. Name it before it names you." },
      { type: "Behavioral", text: "When confronted with wrongdoing, deflection only deepens the problem." },
      { type: "Relational", text: "We are called to be our brother's keeper — protectors, not rivals." },
      { type: "Spiritual", text: "God's mercy extends even to the guilty. Judgment is not the end of the story." },
      { type: "Life Application", text: "Bring your best — in worship, in work, in relationships — not just what's convenient." },
    ],
    reflectionQuestions: [
      "Have you ever felt jealousy toward someone who seemed more 'favored' than you? How did you handle it?",
      "God warned Cain before he acted. Can you recall a moment when something warned you before you made a wrong choice?",
      "What does it mean to you personally to be 'your brother's keeper'?",
    ],
    rewards: {
      xp: 150,
      coins: 50,
      badge: "First Case Solved",
      rankProgress: 5,
    },
    nextCaseTitle: "The Stolen Birthright",
    closingText:
      "Truth has been uncovered. But every answer opens a new mystery. The first crime has been solved — but the story of humanity is only beginning.",
  },
  {
    id: "002",
    caseNumber: "CASE #002",
    title: "The Stolen Birthright",
    bibleReference: "Genesis 25–27",
    difficulty: "Intermediate",
    victim: "Esau",
    suspects: ["Jacob", "Rebekah", "Isaac", "Unknown"],
    introduction:
      "Two sons. Born together, yet divided from the womb. One was a hunter — rugged, outdoor, beloved by his father. The other, a quiet man of tents — favored by his mother, sharp of mind.\n\nA birthright passed for a bowl of stew. A father's blessing stolen by disguise. And a family torn apart by deception that ran all the way to the top.\n\nThe case seems simple at first. But as you dig deeper, you'll find that this conspiracy runs through the whole household. Who really orchestrated the theft of Esau's inheritance?\n\nOpen the file. The evidence doesn't lie.",
    evidence: [
      {
        id: "e1",
        icon: "coffee",
        title: "The Bowl of Red Stew",
        description:
          "Esau returned famished from the field and traded his entire birthright to Jacob for a single meal of red stew and bread.",
        lesson: "Despising what is sacred for immediate gratification leads to lasting regret.",
      },
      {
        id: "e2",
        icon: "user",
        title: "The Goatskin Disguise",
        description:
          "Jacob wore his brother's clothes and covered his hands and neck with goatskin to mimic Esau's hairy appearance before their blind father.",
        lesson: "Deception may produce short-term gain but always brings long-term consequences.",
      },
      {
        id: "e3",
        icon: "heart",
        title: "The Divided Household",
        description:
          "Isaac favored Esau; Rebekah favored Jacob. This household division created an environment where conspiracy was possible.",
        lesson: "Favoritism in families plants seeds of conflict that grow across generations.",
      },
      {
        id: "e4",
        icon: "message-circle",
        title: "Rebekah's Strategic Plan",
        description:
          "Rebekah overheard Isaac's intention to bless Esau. She immediately devised the plan for Jacob to deceive Isaac, down to every detail.",
        lesson: "Our response to a perceived injustice reveals our character — we can choose righteousness even when others do not.",
      },
      {
        id: "e5",
        icon: "eye-off",
        title: "Isaac's Blindness",
        description:
          "Isaac was very old and his eyes had become so weak that he could no longer see. This physical condition was exploited in the plan.",
        lesson: "Vulnerability should never be weaponized. Taking advantage of weakness is never righteous.",
      },
    ],
    witnesses: [
      {
        id: "w1",
        name: "Rebekah",
        role: "Architect of the Plan",
        statement:
          "I heard Isaac tell Esau to prepare a meal so he could bless him. I knew what had to happen. I had been told before the boys were born that the elder would serve the younger. I acted on what I knew.",
        questions: [
          {
            id: "q1",
            text: "What did God prophesy about the twins before they were born?",
            options: [
              "The younger would serve the older",
              "The two would become one nation",
              "The older shall serve the younger",
              "Both would be equal in God's sight",
            ],
            correctIndex: 2,
            explanation:
              "Genesis 25:23: 'The LORD said to her: Two nations are in your womb... one people will be stronger than the other, and the older will serve the younger.'",
          },
          {
            id: "q2",
            text: "What did Rebekah tell Jacob when he feared Isaac's curse?",
            options: [
              "Trust in God and all will be well",
              "My son, let the curse fall on me",
              "Isaac will not find out",
              "Esau deserves to lose his blessing",
            ],
            correctIndex: 1,
            explanation:
              "Genesis 27:13: Rebekah said, 'My son, let the curse fall on me. Just do what I say.' — she was willing to bear the consequences herself.",
          },
        ],
      },
      {
        id: "w2",
        name: "Jacob",
        role: "Primary Executor of the Deception",
        statement:
          "My mother gave me the plan. I was afraid — what if my father cursed me instead of blessed me? But I followed what she said. I went in, I said what I was told to say, and I received the blessing.",
        questions: [
          {
            id: "q3",
            text: "What did Jacob say when Isaac asked 'Who are you?'",
            options: [
              "He admitted he was Jacob",
              "He said nothing and fled",
              "He said 'I am Esau your firstborn'",
              "He pretended to be Isaac's servant",
            ],
            correctIndex: 2,
            explanation:
              "Genesis 27:19: Jacob said to his father, 'I am Esau your firstborn. I have done as you told me. Please sit up and eat some of my game, so that you may give me your blessing.'",
          },
        ],
      },
      {
        id: "w3",
        name: "Esau",
        role: "Victim",
        statement:
          "I came in from hunting with a meal prepared for my father. I asked him to bless me. He told me someone had already come and received his blessing — and the blessing cannot be undone. I wept bitterly. I had already surrendered my birthright for stew. Now this.",
        questions: [
          {
            id: "q4",
            text: "What was Esau's response when he discovered the blessing had been taken?",
            options: [
              "He laughed and forgave Jacob immediately",
              "He burst into loud and bitter crying and begged for a blessing",
              "He went to God in prayer",
              "He was silent and accepted the outcome",
            ],
            correctIndex: 1,
            explanation:
              "Genesis 27:34: 'When Esau heard his father's words, he burst out with a loud and bitter cry and said to his father, Bless me — me too, my father!' The emotion in this moment is one of Scripture's most human scenes.",
          },
        ],
      },
    ],
    timeline: [
      { id: "t1", text: "Esau is born first; Jacob comes out holding his heel", correctOrder: 1 },
      { id: "t2", text: "God prophesies the older will serve the younger", correctOrder: 2 },
      { id: "t3", text: "Esau returns famished and trades his birthright to Jacob for stew", correctOrder: 3 },
      { id: "t4", text: "Isaac grows old and his eyes fail; he plans to bless Esau", correctOrder: 4 },
      { id: "t5", text: "Rebekah overhears Isaac's plan and devises the deception", correctOrder: 5 },
      { id: "t6", text: "Jacob disguises himself and receives Isaac's blessing", correctOrder: 6 },
      { id: "t7", text: "Esau arrives and discovers the blessing has been stolen", correctOrder: 7 },
      { id: "t8", text: "Jacob flees to Haran to escape Esau's wrath", correctOrder: 8 },
    ],
    suspectProfiles: [
      {
        name: "Jacob",
        motive: "To secure the firstborn's blessing and God's covenant promise",
        evidenceStrength: "High",
        description:
          "Jacob personally carried out the deception — wearing the disguise, speaking the lies, entering Isaac's tent. He was the one who received the blessing.",
      },
      {
        name: "Rebekah",
        motive: "To fulfill God's prophecy that the older would serve the younger",
        evidenceStrength: "High",
        description:
          "Rebekah was the mastermind. She devised every detail of the plan, prepared the food, provided the disguise, and coached Jacob on what to say.",
      },
      {
        name: "Isaac",
        motive: "No motive — he was deceived",
        evidenceStrength: "Low",
        description:
          "Isaac intended to bless Esau. He was the victim of the deception due to his blindness and old age. He is not a suspect but was an unwitting participant.",
      },
      {
        name: "Unknown",
        motive: "No other parties were involved",
        evidenceStrength: "Low",
        description:
          "The Scripture identifies only Jacob and Rebekah as parties to the deception. No unknown figures are suggested.",
      },
    ],
    correctSuspect: "Jacob",
    revealText:
      "The verdict points to Jacob — with Rebekah as the architect behind the act.\n\nThe deception was layered: it began when Jacob purchased Esau's birthright for stew (with Esau's own consent, showing his disregard for sacred things). But the theft of the paternal blessing was a coordinated conspiracy. Rebekah heard Isaac's plan, designed the entire operation, and sent Jacob in with full instructions.\n\nScripture is honest about Jacob's character — he was a deceiver (his name literally means 'one who grasps the heel' or 'supplanter'). Yet God, who had already chosen Jacob before birth, would use this imperfect man to continue the covenant line. Jacob would later be transformed — his name changed to Israel after wrestling with God.\n\nThe lesson is not that deception is acceptable. The lesson is that God's purposes are not derailed by human failure. Even in the mess of a dysfunctional family, truth and covenant persisted.",
    revealVerse:
      "\"The LORD said to her: Two nations are in your womb... one people will be stronger than the other, and the older will serve the younger.\" — Genesis 25:23",
    lessons: [
      { type: "Spiritual", text: "God's plans cannot be derailed by human schemes, good or bad." },
      { type: "Emotional", text: "Favoritism in families creates wounds that last decades — Esau's bitter cry echoes across Scripture." },
      { type: "Behavioral", text: "Despising sacred things (like a birthright) for immediate gratification leads to permanent regret." },
      { type: "Relational", text: "Deception within families poisons relationships and forces separations." },
      { type: "Life Application", text: "When we feel something rightfully belongs to us, how we pursue it reveals our character." },
    ],
    reflectionQuestions: [
      "Have you ever traded something of lasting value for something immediate? What did you learn?",
      "Esau wept bitterly when he lost what could not be recovered. Is there something in your life you've undervalued?",
      "Rebekah believed she was fulfilling God's will through deception. Can wrong methods ever serve right purposes?",
    ],
    rewards: {
      xp: 200,
      coins: 75,
      badge: "Family Secrets Uncovered",
      rankProgress: 8,
    },
    nextCaseTitle: "The Betrayal in Egypt",
    closingText:
      "Case closed. But the family line continues — and from this broken story, a nation is still being born.",
  },
  {
    id: "003",
    caseNumber: "CASE #003",
    title: "The Betrayal in Egypt",
    bibleReference: "Genesis 37",
    difficulty: "Advanced",
    victim: "Joseph",
    suspects: ["Judah", "Reuben", "The Ten Brothers", "Unknown"],
    introduction:
      "His father called him 'the son of his old age' — and gave him a coat that made the others burn with envy. He dreamed dreams that made them want to silence him forever.\n\nOne day, Joseph was sent to check on his brothers in the fields. He never made it home the same way he left.\n\nHe was stripped of his coat. He was thrown into a pit. And he was sold — sold as a slave to merchants heading to Egypt, while his brothers sat down to eat.\n\nA family. A conspiracy. A crime disguised as fate.\n\nDetective, the evidence is buried in the fields of Dothan. The suspects are many. The truth is waiting.",
    evidence: [
      {
        id: "e1",
        icon: "gift",
        title: "The Coat of Many Colors",
        description:
          "Jacob gave Joseph an ornate robe — a symbol of special favor. His brothers saw it and hated Joseph all the more.",
        lesson: "Parental favoritism is not neutral. It has real consequences for family unity.",
      },
      {
        id: "e2",
        icon: "moon",
        title: "The Dreams",
        description:
          "Joseph dreamed twice: once that his brothers' sheaves bowed to his, and once that the sun, moon, and eleven stars bowed to him. He told both dreams to his family.",
        lesson: "Divine visions may require wisdom about when and how to share them.",
      },
      {
        id: "e3",
        icon: "alert-triangle",
        title: "The Plot to Kill",
        description:
          "When Joseph arrived at Dothan, his brothers conspired to kill him. They said: 'Here comes that dreamer. Let's kill him and see what comes of his dreams.'",
        lesson: "When envy is left unaddressed, it can escalate from bitterness to violent intent.",
      },
      {
        id: "e4",
        icon: "shield",
        title: "Reuben's Intervention",
        description:
          "Reuben — the eldest — stepped in and persuaded the brothers not to kill Joseph, suggesting they throw him into a pit instead. He planned to rescue Joseph later.",
        lesson: "One voice of conscience can prevent the worst outcome, even when it cannot prevent all harm.",
      },
      {
        id: "e5",
        icon: "dollar-sign",
        title: "Sold for Twenty Pieces of Silver",
        description:
          "When Midianite merchants passed by, Judah proposed selling Joseph rather than killing him. The brothers sold Joseph for twenty pieces of silver.",
        lesson: "Placing a price on a person reflects how far envy can corrupt moral judgment.",
      },
    ],
    witnesses: [
      {
        id: "w1",
        name: "Reuben",
        role: "Eldest Brother / Would-be Rescuer",
        statement:
          "I told them not to shed blood. I said throw him in the pit. I was going to come back for him — to save him and restore him to our father. But when I returned, Joseph was gone. I tore my clothes. What was I to do?",
        questions: [
          {
            id: "q1",
            text: "What was Reuben's secret plan when he suggested the pit?",
            options: [
              "He wanted Joseph to suffer there",
              "He planned to rescue Joseph later and return him to Jacob",
              "He agreed with the plan to sell Joseph",
              "He intended to bring merchants to buy Joseph",
            ],
            correctIndex: 1,
            explanation:
              "Genesis 37:22 reveals Reuben's intention: 'Rescue him from their hands and take him back to his father.' His intervention was an attempt to save Joseph's life.",
          },
        ],
      },
      {
        id: "w2",
        name: "Judah",
        role: "Proposer of the Sale",
        statement:
          "I said: what do we gain if we kill him and conceal his blood? He is our brother, our own flesh. I thought selling him was the mercy option. He would live. We would be rid of the dreams.",
        questions: [
          {
            id: "q2",
            text: "How much silver was Joseph sold for?",
            options: ["Thirty pieces", "Twenty pieces", "Fifty pieces", "Ten pieces"],
            correctIndex: 1,
            explanation:
              "Genesis 37:28: 'His brothers pulled Joseph up out of the cistern and sold him for twenty pieces of silver to the Ishmaelites, who took him to Egypt.'",
          },
          {
            id: "q3",
            text: "What did the brothers do after selling Joseph?",
            options: [
              "They returned to their father to confess",
              "They sat down to eat a meal",
              "They followed the merchants to Egypt",
              "They wept for three days",
            ],
            correctIndex: 1,
            explanation:
              "Genesis 37:25: 'As they sat down to eat their meal, they looked up and saw a caravan of Ishmaelites...' — the brothers sat to eat immediately after throwing Joseph in the pit.",
          },
        ],
      },
      {
        id: "w3",
        name: "Jacob",
        role: "Grieving Father",
        statement:
          "They brought me Joseph's robe — soaked in goat's blood. They said: 'We found this. Examine it to see if it is your son's robe.' I recognized it. I mourned for many days and refused to be comforted.",
        questions: [
          {
            id: "q4",
            text: "How did the brothers cover up what happened to Joseph?",
            options: [
              "They told Jacob the truth and begged forgiveness",
              "They dipped Joseph's robe in goat blood and showed it to Jacob",
              "They told Jacob Joseph had run away",
              "They said nothing and stayed away from home",
            ],
            correctIndex: 1,
            explanation:
              "Genesis 37:31-32: They dipped the robe in goat's blood and brought it to their father saying, 'We found this. Examine it.' — a deliberate and cruel deception.",
          },
        ],
      },
    ],
    timeline: [
      { id: "t1", text: "Jacob gives Joseph a coat of many colors, fueling his brothers' hatred", correctOrder: 1 },
      { id: "t2", text: "Joseph shares his dreams — the sheaves and the stars bowing to him", correctOrder: 2 },
      { id: "t3", text: "Jacob sends Joseph to check on his brothers in Shechem, then Dothan", correctOrder: 3 },
      { id: "t4", text: "Brothers see Joseph coming and plot to kill him", correctOrder: 4 },
      { id: "t5", text: "Reuben intervenes — Joseph is thrown into a pit but not killed", correctOrder: 5 },
      { id: "t6", text: "Judah proposes selling Joseph; he is sold to Ishmaelite merchants for 20 silver", correctOrder: 6 },
      { id: "t7", text: "Brothers dip Joseph's coat in goat blood and present it to Jacob", correctOrder: 7 },
      { id: "t8", text: "Joseph arrives in Egypt and is sold to Potiphar, an officer of Pharaoh", correctOrder: 8 },
    ],
    suspectProfiles: [
      {
        name: "Judah",
        motive: "Elimination of Joseph's prophesied authority; end the dreamer's influence",
        evidenceStrength: "High",
        description:
          "Judah proposed the sale. He rationalized it as mercy but it was an act of betrayal. He led the final decisive action against Joseph.",
      },
      {
        name: "Reuben",
        motive: "Appeared to oppose harm — planned to rescue Joseph",
        evidenceStrength: "Low",
        description:
          "Reuben tried to prevent bloodshed. He was absent when the sale occurred. Though he failed to fully protect Joseph, he was not a conspirator.",
      },
      {
        name: "The Ten Brothers",
        motive: "Collective hatred from favoritism and the threatening dreams",
        evidenceStrength: "High",
        description:
          "All ten participated in the conspiracy — from plotting murder, to throwing Joseph in the pit, to the sale, to the blood-dipped robe deception.",
      },
      {
        name: "Unknown",
        motive: "No other suspects indicated",
        evidenceStrength: "Low",
        description:
          "Scripture is clear about who was involved. The Ishmaelite merchants were buyers, not conspirators. No unknown party orchestrated the betrayal.",
      },
    ],
    correctSuspect: "The Ten Brothers",
    revealText:
      "The truth points to the ten brothers as a collective — with Judah as the one who proposed the sale.\n\nJoseph's brothers had harbored jealousy for years: the coat, the dreams, their father's favoritism. When Joseph appeared in the fields of Dothan, the hatred overflowed. They planned to kill him. Only Reuben's intervention shifted the course.\n\nBut Reuben's mercy went only so far. When Midianite merchants appeared, Judah stepped in with a commercial solution: sell him. The brothers agreed. Joseph was pulled from the pit, sold for twenty pieces of silver, and the brothers sat down to eat.\n\nThey then soaked his coat in goat blood and presented it to Jacob — a cold, calculated deception that broke their father's heart for years.\n\nYet this is one of Scripture's greatest reversals. God did not abandon Joseph in the pit or in the slave market or in prison. The dreams the brothers tried to bury would eventually come to pass. Joseph would become ruler of Egypt — and the brothers who sold him would one day bow before him, just as the dreams foretold.",
    revealVerse:
      "\"You intended to harm me, but God intended it for good to accomplish what is now being done, the saving of many lives.\" — Genesis 50:20",
    lessons: [
      { type: "Spiritual", text: "God's purposes survive human betrayal. What others intend for harm, He can redirect for good." },
      { type: "Emotional", text: "Envy is corrosive. It drove ten men from jealousy to murderous conspiracy." },
      { type: "Behavioral", text: "Half-hearted intervention (like Reuben's) may reduce harm but does not prevent injustice." },
      { type: "Relational", text: "Favoritism in families creates wounds that can last decades — Jacob's preference for Joseph nearly destroyed his household." },
      { type: "Life Application", text: "Like Joseph, we may find ourselves in 'pits' we did not deserve. Our response in the pit shapes our character for the palace." },
      { type: "Life Application", text: "Forgiveness — as Joseph showed — is not the erasure of the past but the release of its power over our future." },
    ],
    reflectionQuestions: [
      "Have you ever been betrayed by someone you trusted? How did you respond, and how did it shape you?",
      "The brothers sat down and ate after throwing Joseph in the pit. How does sin desensitize our conscience over time?",
      "Joseph eventually forgave his brothers. Is there someone in your life toward whom you need to move in the direction of forgiveness?",
    ],
    rewards: {
      xp: 300,
      coins: 100,
      badge: "Depths of Betrayal",
      rankProgress: 12,
    },
    nextCaseTitle: "The Plagues of Egypt",
    closingText:
      "Joseph went down into a pit and came out a ruler. Every step of suffering was a step toward destiny. The case is solved — but the story of redemption has only begun.",
  },
];
