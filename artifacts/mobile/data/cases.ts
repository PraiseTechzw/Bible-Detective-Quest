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
  reference?: string;
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
    nextCaseTitle: "The Samson Betrayal",
    closingText:
      "Joseph went down into a pit and came out a ruler. Every step of suffering was a step toward destiny. The case is solved — but the story of redemption has only begun.",
  },

  // ─── CASE #004 ────────────────────────────────────────────────────
  {
    id: "004",
    caseNumber: "CASE #004",
    title: "The Samson Betrayal",
    bibleReference: "Judges 13–16",
    difficulty: "Intermediate",
    victim: "Samson",
    suspects: ["Delilah", "The Philistine Lords", "Samson Himself"],
    introduction:
      "The mightiest judge of Israel has fallen. Samson — a Nazarite consecrated from birth, empowered by the Spirit of God to deliver his people — lies blind and chained in a Philistine prison. His supernatural strength is gone. The secret of his power has been revealed. Someone is responsible. Was it the woman he loved? The enemies who hated him? Or the man himself who could not guard his own heart?",
    evidence: [
      {
        id: "e001",
        icon: "scissors",
        title: "The Shaved Head",
        description:
          "Samson's seven locks of hair were shaved while he slept on Delilah's knees. The Nazarite vow — the source of the covenant with God that sustained his strength — was broken through this single act. 'He did not know that the LORD had left him.' (Judges 16:20)",
        lesson:
          "Spiritual power comes from covenant obedience. When we allow others to slowly erode our consecration, we lose the divine anointing we depend on.",
      },
      {
        id: "e002",
        icon: "dollar-sign",
        title: "Eleven Hundred Pieces of Silver",
        description:
          "Each of the five Philistine lords promised Delilah 1,100 pieces of silver to discover the secret of Samson's strength. This enormous sum — 5,500 pieces total — reveals a calculated, financially motivated conspiracy, not merely a romantic betrayal.",
        lesson:
          "Greed can corrupt even intimate relationships. Delilah's repeated questioning was not curiosity but a paid mission. Money can motivate profound betrayal.",
      },
      {
        id: "e003",
        icon: "alert-triangle",
        title: "Three Failed Attempts",
        description:
          "Delilah asked Samson his secret four times. Three times he lied. Three times she used the false answer against him. Three times he saw the pattern — and stayed anyway. His persistence in the relationship after clear warning signs reveals a fatal character flaw.",
        lesson:
          "God often warns us through repeated patterns before a final fall. Ignoring clear evidence of danger is not love — it is self-destruction.",
      },
      {
        id: "e004",
        icon: "eye-off",
        title: "His Blinded Eyes",
        description:
          "The Philistines gouged out Samson's eyes — the very organs with which he had repeatedly 'seen' foreign women and followed his passions. The physical blindness mirrors the spiritual blindness that led him to this moment.",
        lesson:
          "What we fix our eyes upon shapes our destiny. Samson's physical blindness was the consequence of long-practiced spiritual blindness to God's purposes.",
      },
      {
        id: "e005",
        icon: "anchor",
        title: "Bronze Chains at the Mill",
        description:
          "Samson was bound with bronze chains and forced to grind grain like an animal. Yet in prison, his hair began to grow again — and with it, the possibility of restoration. 'However, the hair of his head began to grow back.' (Judges 16:22)",
        lesson:
          "God's grace does not abandon us even in the consequences of our failures. New growth is possible even after catastrophic loss.",
      },
      {
        id: "e006",
        icon: "heart",
        title: "A Pattern of Foreign Loves",
        description:
          "Delilah was not Samson's first Philistine weakness. He had previously married a Philistine woman from Timnah and visited a prostitute in Gaza. His attraction to the enemies of Israel was a recurring vulnerability that his opponents understood and exploited.",
        lesson:
          "Unaddressed patterns of compromise do not stay small. Each yielding makes the next betrayal easier to engineer.",
      },
    ],
    witnesses: [
      {
        id: "w001",
        name: "Manoah",
        role: "Samson's Father",
        statement:
          "My son was set apart before he was born. The angel of the LORD told us: no razor shall come upon his head, for he shall be a Nazirite to God from the womb. I do not understand how he could have shared this with anyone. We told him it was sacred.",
        questions: [
          {
            id: "q001",
            text: "What was the sign of Samson's Nazirite consecration?",
            options: [
              "A special garment he wore",
              "His uncut hair from birth",
              "A mark on his hand",
              "A golden ring in his ear",
            ],
            correctIndex: 1,
            explanation:
              "The Nazirite vow included abstaining from wine, avoiding the dead, and never cutting one's hair. The uncut hair was the visible, external sign of Samson's covenant dedication to God (Numbers 6:1-21).",
          },
          {
            id: "q002",
            text: "Who told Manoah's wife that Samson would be a Nazirite?",
            options: ["A prophet of Israel", "An angel of the LORD", "The high priest", "Manoah himself"],
            correctIndex: 1,
            explanation:
              "An angel of the LORD appeared to Manoah's wife — and later to Manoah himself — announcing that she would conceive a son who would be a Nazirite and begin to deliver Israel from the Philistines (Judges 13:3-5).",
          },
        ],
      },
      {
        id: "w002",
        name: "A Philistine Lord",
        role: "One of the Five City Rulers",
        statement:
          "We had tried everything. He killed thirty of our men at Ashkelon for a riddle. He set fire to our fields with foxes. He slaughtered thousands with a jawbone. When we found his weakness was women — specifically that woman — we moved quickly. It was a business transaction.",
        questions: [
          {
            id: "q003",
            text: "How many Philistine lords commissioned Delilah?",
            options: ["Three", "Seven", "Five", "Twelve"],
            correctIndex: 2,
            explanation:
              "The five lords of the Philistines each offered Delilah 1,100 pieces of silver — a total of 5,500 pieces — to find the source of Samson's strength (Judges 16:5). These five lords ruled the five Philistine city-states.",
          },
        ],
      },
    ],
    timeline: [
      { id: "t001", text: "Angel announces Samson's birth and Nazirite calling to his mother", correctOrder: 1 },
      { id: "t002", text: "Samson kills a lion barehanded on the way to Timnah", correctOrder: 2 },
      { id: "t003", text: "Samson marries a Philistine woman and poses a riddle at the feast", correctOrder: 3 },
      { id: "t004", text: "Samson catches 300 foxes and burns the Philistine fields", correctOrder: 4 },
      { id: "t005", text: "Samson falls in love with Delilah in the Valley of Sorek", correctOrder: 5 },
      { id: "t006", text: "Delilah asks three times; Samson lies each time but stays", correctOrder: 6 },
      { id: "t007", text: "Samson reveals the secret of his strength; his head is shaved", correctOrder: 7 },
      { id: "t008", text: "Samson is captured, blinded, and forced to grind grain in prison", correctOrder: 8 },
      { id: "t009", text: "Samson pulls down the temple of Dagon, killing more in death than in life", correctOrder: 9 },
    ],
    suspectProfiles: [
      {
        name: "Delilah",
        motive: "5,500 pieces of silver from the five Philistine lords",
        evidenceStrength: "High",
        description:
          "Delilah was directly commissioned and paid by the Philistine lords. She persistently nagged Samson until he could bear it no longer. She had the means, motive, and opportunity. The text leaves no ambiguity about her role: she caused his downfall for money.",
      },
      {
        name: "The Philistine Lords",
        motive: "To neutralise the greatest military threat to Philistine dominance",
        evidenceStrength: "High",
        description:
          "The five lords were the architects of the conspiracy. They identified Samson's weakness, funded the operation, and were present for the capture. Delilah was their instrument. The ultimate responsibility in the external world rests with them.",
      },
      {
        name: "Samson Himself",
        motive: "No external motive — internal failure of discipline and discernment",
        evidenceStrength: "Medium",
        description:
          "Samson was warned three times by Delilah's own actions. He saw the pattern and remained. His repeated vulnerability to his passions, his willingness to trade sacred secrets for momentary comfort — these were the open door through which his enemies entered. In a spiritual sense, he was complicit in his own fall.",
      },
    ],
    correctSuspect: "Delilah",
    revealText:
      "Delilah, motivated by an enormous sum of silver, persistently wore down Samson's resistance through emotional manipulation. After three failed attempts, Samson finally told her everything: 'A razor has never come upon my head, for I have been a Nazirite to God from my mother's womb. If my head is shaved, then my strength will leave me.' (Judges 16:17). She had his head shaved while he slept. The LORD left him. He was captured, blinded, and enslaved. Yet in his final act — calling on God one last time in the temple of Dagon — Samson killed more Philistines in his death than in his life, fulfilling his calling even through his failures.",
    revealVerse:
      '"Then Samson called to the LORD and said, \'O Lord GOD, please remember me and please strengthen me only this once, O God, that I may be avenged on the Philistines for my two eyes.\'" — Judges 16:28',
    lessons: [
      { type: "Warning", text: "When someone repeatedly tries to find the source of your anointing, they are not your ally — they are after your consecration." },
      { type: "Grace", text: "Even after catastrophic failure through his own choices, Samson's hair grew back. God's grace makes room for a final act of faithfulness." },
      { type: "Pattern", text: "Three ignored warnings preceded the fatal fourth. Pay attention to patterns of compromise before the fourth comes." },
    ],
    reflectionQuestions: [
      "Samson stayed in the relationship even after three clear betrayals. When has comfort or desire caused you to ignore obvious warning signs?",
      "His physical blindness mirrored long-practiced spiritual blindness. In what area of your life might you be spiritually blind right now?",
      "Samson's hair began to grow in prison. Where in your life is God growing something new even in a season of consequence?",
    ],
    rewards: { xp: 250, coins: 80, badge: "Broken Chains", rankProgress: 9 },
    nextCaseTitle: "The Judgment of Solomon",
    closingText:
      "The strongest man who ever lived was undone not by armies but by a whisper. Yet God redeemed even his final moment. Strength without self-mastery is the most dangerous gift.",
  },

  // ─── CASE #005 ────────────────────────────────────────────────────
  {
    id: "005",
    caseNumber: "CASE #005",
    title: "The Judgment of Solomon",
    bibleReference: "1 Kings 3:16–28",
    difficulty: "Beginner",
    victim: "A Newborn Child",
    suspects: ["The First Woman", "The Second Woman"],
    introduction:
      "Two women stand before the throne of King Solomon, each claiming to be the true mother of a living infant. The other child — born just three days after the first — is dead. One woman says the other rolled onto her baby in the night and then switched the infants while she slept. The other denies it entirely. There are no witnesses. No physical evidence. Only two women, one baby, and the wisdom of a king who asked God for an understanding heart.",
    evidence: [
      {
        id: "e001",
        icon: "moon",
        title: "The Night Substitution",
        description:
          "The first woman claims she woke at midnight to nurse her son, discovered he was dead, and then realised by morning light that the dead child was not hers. 'When I rose in the morning to nurse my child, behold, he was dead. But when I looked at him closely in the morning, behold, he was not the child that I had borne.' (1 Kings 3:21)",
        lesson:
          "Deception often happens in darkness and is only revealed by morning light. Truth, like dawn, cannot be suppressed forever.",
      },
      {
        id: "e002",
        icon: "home",
        title: "The Shared Living Space",
        description:
          "Both women lived together in the same house. There were no other witnesses present. This is the central challenge of the case: with no third-party testimony and no forensic evidence, the truth could only be exposed through the heart's response to an extreme circumstance.",
        lesson:
          "Some truths cannot be proven with evidence — they are revealed by how a person responds under pressure.",
      },
      {
        id: "e003",
        icon: "heart",
        title: "The Mother's Instinct",
        description:
          "When Solomon proposed cutting the child in two, the true mother immediately cried out: 'Oh, my lord, give her the living child, and by no means put him to death!' The false claimant said: 'He shall be neither mine nor yours; divide him.' The contrast was immediate and absolute.",
        lesson:
          "True love prefers the other's life over its own claim. False love is willing to destroy what it cannot possess.",
      },
      {
        id: "e004",
        icon: "user",
        title: "Solomon's Unusual Verdict",
        description:
          "Solomon did not call witnesses or conduct an investigation in any conventional sense. He called for a sword. The verdict was a test: only the response to an impossible choice could cut through the impossible deception.",
        lesson:
          "Wisdom sometimes creates a revealing situation rather than following conventional procedure. God gives understanding that goes beyond normal human methods.",
      },
      {
        id: "e005",
        icon: "shield",
        title: "The Reaction of All Israel",
        description:
          "When news of the verdict spread, 'all Israel heard of the judgment that the king had rendered, and they stood in awe of the king, because they perceived that the wisdom of God was in him to do justice.' (1 Kings 3:28)",
        lesson:
          "True justice builds trust in leadership. When wisdom is seen to be at work, it produces reverence — not just satisfaction.",
      },
    ],
    witnesses: [
      {
        id: "w001",
        name: "The First Woman",
        role: "Claimant — asserts the living child is hers",
        statement:
          "We both gave birth within three days of each other in that house. In the night she lay on her child and he died. She arose and took my son from beside me while I slept and laid her dead child in my arms. When the morning came, I saw it was not my son.",
        questions: [
          {
            id: "q001",
            text: "What did the first woman claim happened in the night?",
            options: [
              "The second woman deliberately harmed her child",
              "The second woman accidentally smothered her baby and swapped them",
              "The baby was taken by a stranger",
              "She fell asleep and confused the children herself",
            ],
            correctIndex: 1,
            explanation:
              "The first woman's account is that the second woman accidentally lay on her own child, causing his death, and then — to conceal it — swapped the dead child for the living one while the first woman slept (1 Kings 3:19-20).",
          },
          {
            id: "q002",
            text: "How did the first woman know the dead child was not hers?",
            options: [
              "She had marked her child with a cloth",
              "The dead child was a different gender",
              "She examined the child carefully in the morning light",
              "A neighbour confirmed it",
            ],
            correctIndex: 2,
            explanation:
              "'When I looked at him closely in the morning, behold, he was not the child that I had borne.' (1 Kings 3:21). The morning light gave her the clarity to perceive what darkness had concealed.",
          },
        ],
      },
      {
        id: "w002",
        name: "King Solomon",
        role: "Judge — possessor of God-given wisdom",
        statement:
          "I asked God for an understanding heart to govern this people, to discern between good and evil. When these two women came before me, I saw that no evidence could resolve the matter. Only the heart, pressed to an extreme, would reveal its true nature.",
        questions: [
          {
            id: "q003",
            text: "What did Solomon ask God for at Gibeon?",
            options: [
              "Long life and wealth",
              "Victory over his enemies",
              "An understanding heart to judge the people",
              "The power to perform miracles",
            ],
            correctIndex: 2,
            explanation:
              "When God offered Solomon anything he wished, he asked for 'an understanding heart to govern your people, that I may discern between good and evil.' (1 Kings 3:9). God was so pleased with this request that He granted him wisdom surpassing all others.",
          },
          {
            id: "q004",
            text: "Why did the true mother's response reveal her identity?",
            options: [
              "She knew a secret about the child's birth",
              "She wept louder than the other woman",
              "Her love could not bear the child's death even if it meant losing her claim",
              "Solomon recognised her from a previous case",
            ],
            correctIndex: 2,
            explanation:
              "True maternal love prioritises the child's life above all personal claims. The false claimant agreed to division, revealing she had no genuine love for the child — only a desire to win the dispute.",
          },
        ],
      },
    ],
    timeline: [
      { id: "t001", text: "God appears to Solomon in a dream and offers him anything he wishes", correctOrder: 1 },
      { id: "t002", text: "Solomon asks for wisdom; God grants wisdom, wealth, and long life", correctOrder: 2 },
      { id: "t003", text: "Two women in the same house each give birth three days apart", correctOrder: 3 },
      { id: "t004", text: "One child dies in the night; the mother swaps the infants before dawn", correctOrder: 4 },
      { id: "t005", text: "The first woman discovers the swap in the morning light", correctOrder: 5 },
      { id: "t006", text: "Both women come before Solomon with their competing claims", correctOrder: 6 },
      { id: "t007", text: "Solomon calls for a sword to divide the living child in two", correctOrder: 7 },
      { id: "t008", text: "The true mother surrenders her claim to save the child's life", correctOrder: 8 },
      { id: "t009", text: "Solomon awards the living child to the compassionate woman; all Israel marvels", correctOrder: 9 },
    ],
    suspectProfiles: [
      {
        name: "The First Woman",
        motive: "Claims the living child is her son stolen in the night",
        evidenceStrength: "Low",
        description:
          "Her reaction to Solomon's sword test — immediately choosing the child's life over her claim — demonstrates genuine maternal love. She is almost certainly the true mother. Her testimony is internally consistent and her response under pressure reveals selfless love rather than possessiveness.",
      },
      {
        name: "The Second Woman",
        motive: "To conceal her child's accidental death by claiming the surviving baby",
        evidenceStrength: "High",
        description:
          "Her agreement to divide the child was the decisive evidence against her. No true mother would consent to her child's death rather than allow him to live with another. Her willingness to destroy what she could not possess revealed that her claim was false.",
      },
    ],
    correctSuspect: "The Second Woman",
    revealText:
      "The Second Woman was the deceiver. After accidentally smothering her own baby, she swapped the children in the night to conceal her loss. When Solomon's sword test created an impossible choice, her response exposed her: she agreed to kill the living child rather than see it go to its true mother. The First Woman — the true mother — surrendered her claim to save her son's life. Solomon recognised that only love acts this way. He awarded her the child, and all Israel saw that the wisdom of God was at work in their king.",
    revealVerse:
      '"Then the king answered and said, \'Give the living child to the first woman, and by no means put him to death; she is his mother.\' And all Israel heard of the judgment that the king had rendered, and they stood in awe of the king." — 1 Kings 3:27-28',
    lessons: [
      { type: "Wisdom", text: "God-given wisdom sees what evidence cannot show. Solomon created a situation that bypassed deception and revealed the heart directly." },
      { type: "Love", text: "True love is defined by what it is willing to surrender. The true mother's willingness to lose her claim to save the child was the proof of her love." },
      { type: "Justice", text: "When justice is genuinely wise, it produces awe — not merely satisfaction. People recognise the difference between clever judgement and divine understanding." },
    ],
    reflectionQuestions: [
      "Solomon chose wisdom over wealth, power, or long life. If God asked you the same question tonight, what would your answer reveal about your priorities?",
      "The true mother was willing to lose everything — her legal claim, her child — to ensure the child lived. Where in your life is God asking you to surrender a legitimate claim for a greater love?",
      "The false claimant agreed to destroy what she could not own. Where do you see this pattern in the world around you today?",
    ],
    rewards: { xp: 200, coins: 70, badge: "Wisdom's Crown", rankProgress: 8 },
    nextCaseTitle: "The Betrayal in the Garden",
    closingText:
      "The wisest king who ever lived solved the unsolvable with a sword he never intended to use. Wisdom does not always need more evidence — sometimes it needs a more revealing question.",
  },

  // ─── CASE #006 ────────────────────────────────────────────────────
  {
    id: "006",
    caseNumber: "CASE #006",
    title: "The Betrayal in the Garden",
    bibleReference: "Matthew 26 / Luke 22 / John 13",
    difficulty: "Advanced",
    victim: "Jesus of Nazareth",
    suspects: ["Judas Iscariot", "The Chief Priests", "The Disciples' Collective Failure"],
    introduction:
      "In the Garden of Gethsemane, the Son of God was arrested. The instrument of his capture was a man who had walked with him for three years — one of the Twelve. Judas Iscariot identified Jesus to the temple guards with a kiss. But this case asks a harder question than 'who gave the signal?' The money, the motive, the moment, and the movement behind it all demand a deeper investigation. Was this merely a crime of greed? Or something far more ancient and complex?",
    evidence: [
      {
        id: "e001",
        icon: "dollar-sign",
        title: "Thirty Pieces of Silver",
        description:
          "Judas agreed to betray Jesus to the chief priests for thirty pieces of silver — the price of a slave under Mosaic law (Exodus 21:32), and the exact figure prophesied by Zechariah 500 years earlier (Zechariah 11:12-13). He later threw the money back and hanged himself.",
        lesson:
          "The price of betraying the Son of God was the valuation of a slave. What we consider 'small' amounts can cost us everything. Judas gained thirty coins and lost his soul.",
      },
      {
        id: "e002",
        icon: "moon",
        title: "The Garden of Gethsemane",
        description:
          "Jesus withdrew to pray while his disciples slept. He prayed three times that 'this cup might pass' — yet submitted to the Father's will. When Judas arrived with a crowd carrying swords and clubs, Jesus did not flee. He stepped forward: 'Whom do you seek?' His cooperation was not defeat — it was sovereign intention.",
        lesson:
          "Jesus was not a victim of circumstances. He walked willingly into the arrest. True courage is choosing the path of obedience when escape is possible.",
      },
      {
        id: "e003",
        icon: "coffee",
        title: "The Last Supper — The Warning Given",
        description:
          "At the final Passover meal, Jesus told his disciples: 'One of you will betray me.' He identified Judas by saying the betrayer would be 'the one who has dipped his hand in the dish with me.' He gave Judas the bread — an act of final grace and an unmistakable, personal call to turn back.",
        lesson:
          "God warns before he judges. Even to Judas, Jesus extended a final invitation. The offer was not withdrawn — it was refused.",
      },
      {
        id: "e004",
        icon: "alert-circle",
        title: "Satan Entered Judas",
        description:
          "The Gospel of Luke records: 'Then Satan entered into Judas called Iscariot.' (Luke 22:3) The Gospel of John adds that after Judas took the bread at the Last Supper, 'Satan entered into him.' (John 13:27). There is a spiritual dimension to this betrayal that no human court can fully adjudicate.",
        lesson:
          "Behind human betrayal there are often spiritual forces at work. This does not remove personal responsibility — Judas still chose. But it reminds us that spiritual vulnerability opens doors to deeper corruption.",
      },
      {
        id: "e005",
        icon: "heart",
        title: "The Kiss — A Signal of Intimacy Used as a Weapon",
        description:
          "The pre-arranged signal was a kiss — the Middle Eastern greeting between a student and his rabbi, a sign of honour and affection. Judas used the most intimate gesture of the relationship as the mechanism of betrayal. Jesus responded: 'Friend, do what you came to do.' (Matthew 26:50)",
        lesson:
          "The deepest betrayals use the vocabulary of love. That Jesus called Judas 'Friend' in that moment is one of the most arresting words in Scripture — grace extended at the point of maximum treachery.",
      },
      {
        id: "e006",
        icon: "alert-triangle",
        title: "The Chief Priests' Conspiracy",
        description:
          "The religious authorities had been seeking to kill Jesus for some time. They feared his popularity with the crowds, felt their authority threatened, and viewed him as a blasphemer. When Judas approached them, they were already assembled and already planning — he simply provided the opportunity they had been waiting for.",
        lesson:
          "Personal sin and institutional corruption often converge to produce the worst outcomes. Neither the crowd nor the individual is ever purely innocent in a conspiracy.",
      },
    ],
    witnesses: [
      {
        id: "w001",
        name: "Peter",
        role: "Apostle — present in the garden",
        statement:
          "I cut off the servant's ear — I was ready to fight. But the Lord told me to put my sword away. He said he could call twelve legions of angels if he chose. And yet he did not. He healed the man's ear. I followed at a distance after they took him. Then I denied I knew him. Three times. I am not proud of any of it.",
        questions: [
          {
            id: "q001",
            text: "What did Jesus do when Peter cut off the servant's ear?",
            options: [
              "Commended Peter for defending him",
              "Called twelve legions of angels to intervene",
              "Rebuked Peter and healed the servant's ear",
              "Fled into the darkness",
            ],
            correctIndex: 2,
            explanation:
              "Jesus rebuked Peter, saying 'Put your sword back into its place.' He then healed the servant (Luke 22:51, John 18:11). This showed his deliberate choice to submit to arrest rather than resist — the kingdom of God does not advance through violence.",
          },
          {
            id: "q002",
            text: "How many times did Peter deny knowing Jesus that night?",
            options: ["Once", "Twice", "Three times", "He did not deny him"],
            correctIndex: 2,
            explanation:
              "Peter denied knowing Jesus three times before the rooster crowed, exactly as Jesus had prophesied at the Last Supper (Matthew 26:34, 69-75). The three denials mirror and contrast with Judas's single act — failure comes in many forms.",
          },
        ],
      },
      {
        id: "w002",
        name: "Caiaphas",
        role: "High Priest — orchestrator of the trial",
        statement:
          "He was a danger to the nation. If we did nothing, the Romans would come and take away both our place and our people. One man must die for the people. It is better that one man dies than the whole nation perish. I do not repent of the decision.",
        questions: [
          {
            id: "q003",
            text: "What was the chief priests' primary stated fear about Jesus?",
            options: [
              "That he would lead an armed rebellion",
              "That the Romans would destroy the nation if they did not act",
              "That he was using dark powers",
              "That he would replace the temple with a new one",
            ],
            correctIndex: 1,
            explanation:
              "'If we let him go on like this, everyone will believe in him, and the Romans will come and take away both our place and our nation.' (John 11:48). Ironically, the very outcome they feared happened 40 years later in AD 70 — despite their actions.",
          },
          {
            id: "q004",
            text: "What charge did the Sanhedrin ultimately use to condemn Jesus?",
            options: [
              "Sedition against Rome",
              "Association with tax collectors",
              "Blasphemy — claiming to be the Son of God",
              "Breaking the Sabbath",
            ],
            correctIndex: 2,
            explanation:
              "When Jesus answered Caiaphas' direct question — 'Are you the Christ, the Son of the Blessed?' — with 'I am,' the high priest tore his robes and declared it blasphemy (Mark 14:61-64). This was the formal charge that brought the death sentence in the Jewish court.",
          },
        ],
      },
    ],
    timeline: [
      { id: "t001", text: "Judas approaches the chief priests and agrees to betray Jesus for thirty silver coins", correctOrder: 1 },
      { id: "t002", text: "Jesus shares the Last Supper with his disciples and identifies his betrayer", correctOrder: 2 },
      { id: "t003", text: "Jesus washes the disciples' feet — including Judas's — and gives him the bread", correctOrder: 3 },
      { id: "t004", text: "Jesus prays in Gethsemane three times while the disciples sleep", correctOrder: 4 },
      { id: "t005", text: "Judas arrives with guards and betrays Jesus with a kiss", correctOrder: 5 },
      { id: "t006", text: "Peter cuts off Malchus's ear; Jesus heals it and surrenders himself", correctOrder: 6 },
      { id: "t007", text: "Jesus is taken to Caiaphas and the Sanhedrin for an overnight trial", correctOrder: 7 },
      { id: "t008", text: "Peter denies Jesus three times before the rooster crows", correctOrder: 8 },
      { id: "t009", text: "Judas repents, throws down the silver, and takes his own life", correctOrder: 9 },
    ],
    suspectProfiles: [
      {
        name: "Judas Iscariot",
        motive: "Thirty pieces of silver — and possibly disillusioned messianic expectations",
        evidenceStrength: "High",
        description:
          "Judas initiated contact with the authorities, agreed to a price, provided the signal, and executed the plan. His guilt in the act of betrayal is undeniable. Yet Scripture also records that he repented, returned the money, and declared 'I have sinned by betraying innocent blood.' He was the instrument of betrayal — but not the only architect.",
      },
      {
        name: "The Chief Priests",
        motive: "Elimination of a perceived political and religious threat to their authority",
        evidenceStrength: "High",
        description:
          "The chief priests and Sanhedrin had already decided Jesus must die before Judas came to them. They funded the operation, conducted the illegal night trial, and pressured Pilate into the crucifixion. Their institutional power gave Judas's betrayal its lethal consequence.",
      },
      {
        name: "The Disciples' Collective Failure",
        motive: "Fear, confusion, and self-preservation",
        evidenceStrength: "Medium",
        description:
          "All the disciples fled. Peter denied. Thomas doubted. None stood with Jesus during his trial. While this does not constitute conspiracy, it represents a universal human failure: when the cost becomes real, even those who walked closest can abandon. This 'suspect' forces the detective to examine themselves.",
      },
    ],
    correctSuspect: "Judas Iscariot",
    revealText:
      "Judas Iscariot was the proximate cause of the arrest — the one who made the agreement, gave the signal, and identified Jesus to the guards. The chief priests were the institutional architects who made the execution possible. Satan was the spiritual force who entered Judas and accelerated his choice. And all the disciples — all of us — represent the universal human pattern of abandoning what is right under pressure.\n\nYet the deepest truth of this case is that none of this was beyond God's foreknowledge or outside his sovereign plan. 'This Jesus, delivered up according to the definite plan and foreknowledge of God, you crucified and killed by the hands of lawless men.' (Acts 2:23). The greatest crime in history became the foundation of the greatest redemption in history.",
    revealVerse:
      '"For I delivered to you as of first importance what I also received: that Christ died for our sins in accordance with the Scriptures." — 1 Corinthians 15:3',
    lessons: [
      { type: "Sovereignty", text: "The greatest betrayal in history was within God's plan. This does not excuse sin — it reveals that God is not defeated by human treachery but works through it." },
      { type: "Warning", text: "Judas sat at the table, heard every sermon, saw every miracle — and still chose thirty coins. Proximity to Jesus is not the same as surrender to him." },
      { type: "Grace", text: "Jesus washed Judas's feet the same night Judas was about to betray him. He called him 'Friend' at the moment of betrayal. Grace pursues even to the final moment." },
    ],
    reflectionQuestions: [
      "Jesus called Judas 'Friend' at the moment of betrayal. What does this reveal about the character of Christ — and about how God views those who wrong us?",
      "All the disciples fled. In what area of your life do you most relate to their failure — the moment when the cost of faithfulness became real?",
      "Judas repented but went to despair rather than to grace. Peter repented and was restored. What is the difference — and what does it mean for you?",
    ],
    rewards: { xp: 400, coins: 130, badge: "Gethsemane Witness", rankProgress: 15 },
    nextCaseTitle: undefined,
    closingText:
      "The most important case in all of human history was never really a mystery. The question was never who did it — it was what it would accomplish. And what it accomplished changed everything.",
  },
];
