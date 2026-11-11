// Comprehensive KJV Bible content for all 66 books
// Covers additional chapters beyond what is in bibleText.ts
// (bibleText.ts already has: gen ch 1,3,4,25,27,37 · psa ch 1,23,91 · joh ch 1,3 · rom ch 8 · OSCB passages)

type VerseMap = Record<number, Record<number, string>>;

export const KJV_EXTRA: Record<string, VerseMap> = {

  // ───────────────────────────────────────────
  //  GENESIS  (additional chapters)
  // ───────────────────────────────────────────
  "gen": {
    2: {
      1: "Thus the heavens and the earth were finished, and all the host of them.",
      2: "And on the seventh day God ended his work which he had made; and he rested on the seventh day from all his work which he had made.",
      3: "And God blessed the seventh day, and sanctified it: because that in it he had rested from all his work which God created and made.",
      4: "These are the generations of the heavens and of the earth when they were created, in the day that the LORD God made the earth and the heavens,",
      5: "And every plant of the field before it was in the earth, and every herb of the field before it grew: for the LORD God had not caused it to rain upon the earth, and there was not a man to till the ground.",
      6: "But there went up a mist from the earth, and watered the whole face of the ground.",
      7: "And the LORD God formed man of the dust of the ground, and breathed into his nostrils the breath of life; and man became a living soul.",
      8: "And the LORD God planted a garden eastward in Eden; and there he put the man whom he had formed.",
      9: "And out of the ground made the LORD God to grow every tree that is pleasant to the sight, and good for food; the tree of life also in the midst of the garden, and the tree of knowledge of good and evil.",
      10: "And a river went out of Eden to water the garden; and from thence it was parted, and became into four heads.",
      11: "The name of the first is Pison: that is it which compasseth the whole land of Havilah, where there is gold;",
      12: "And the gold of that land is good: there is bdellium and the onyx stone.",
      13: "And the name of the second river is Gihon: the same is it that compasseth the whole land of Ethiopia.",
      14: "And the name of the third river is Hiddekel: that is it which goeth toward the east of Assyria. And the fourth river is Euphrates.",
      15: "And the LORD God took the man, and put him into the garden of Eden to dress it and to keep it.",
      16: "And the LORD God commanded the man, saying, Of every tree of the garden thou mayest freely eat:",
      17: "But of the tree of the knowledge of good and evil, thou shalt not eat of it: for in the day that thou eatest thereof thou shalt surely die.",
      18: "And the LORD God said, It is not good that the man should be alone; I will make him an help meet for him.",
      19: "And out of the ground the LORD God formed every beast of the field, and every fowl of the air; and brought them unto Adam to see what he would call them: and whatsoever Adam called every living creature, that was the name thereof.",
      20: "And Adam gave names to all cattle, and to the fowl of the air, and to every beast of the field; but for Adam there was not found an help meet for him.",
      21: "And the LORD God caused a deep sleep to fall upon Adam, and he slept: and he took one of his ribs, and closed up the flesh instead thereof;",
      22: "And the rib, which the LORD God had taken from man, made he a woman, and brought her unto the man.",
      23: "And Adam said, This is now bone of my bones, and flesh of my flesh: she shall be called Woman, because she was taken out of Man.",
      24: "Therefore shall a man leave his father and his mother, and shall cleave unto his wife: and they shall be one flesh.",
      25: "And they were both naked, the man and his wife, and were not ashamed.",
    },
    5: {
      1: "This is the book of the generations of Adam. In the day that God created man, in the likeness of God made he him;",
      2: "Male and female created he them; and blessed them, and called their name Adam, in the day when they were created.",
      3: "And Adam lived an hundred and thirty years, and begat a son in his own likeness, and after his image; and called his name Seth:",
      4: "And the days of Adam after he had begotten Seth were eight hundred years: and he begat sons and daughters:",
      5: "And all the days that Adam lived were nine hundred and thirty years: and he died.",
      21: "And Enoch lived sixty and five years, and begat Methuselah:",
      22: "And Enoch walked with God after he begat Methuselah three hundred years, and begat sons and daughters:",
      23: "And all the days of Enoch were three hundred sixty and five years:",
      24: "And Enoch walked with God: and he was not; for God took him.",
      29: "And he called his name Noah, saying, This same shall comfort us concerning our work and toil of our hands, because of the ground which the LORD hath cursed.",
    },
    6: {
      1: "And it came to pass, when men began to multiply on the face of the earth, and daughters were born unto them,",
      2: "That the sons of God saw the daughters of men that they were fair; and they took them wives of all which they chose.",
      3: "And the LORD said, My spirit shall not always strive with man, for that he also is flesh: yet his days shall be an hundred and twenty years.",
      5: "And GOD saw that the wickedness of man was great in the earth, and that every imagination of the thoughts of his heart was only evil continually.",
      6: "And it repented the LORD that he had made man on the earth, and it grieved him at his heart.",
      7: "And the LORD said, I will destroy man whom I have created from the face of the earth; both man, and beast, and the creeping thing, and the fowls of the air; for it repenteth me that I have made them.",
      8: "But Noah found grace in the eyes of the LORD.",
      9: "These are the generations of Noah: Noah was a just man and perfect in his generations, and Noah walked with God.",
      10: "And Noah begat three sons, Shem, Ham, and Japheth.",
      11: "The earth also was corrupt before God, and the earth was filled with violence.",
      12: "And God looked upon the earth, and, behold, it was corrupt; for all flesh had corrupted his way upon the earth.",
      13: "And God said unto Noah, The end of all flesh is come before me; for the earth is filled with violence through them; and, behold, I will destroy them with the earth.",
      14: "Make thee an ark of gopher wood; rooms shalt thou make in the ark, and shalt pitch it within and without with pitch.",
      17: "And, behold, I, even I, do bring a flood of waters upon the earth, to destroy all flesh, wherein is the breath of life, from under heaven; and every thing that is in the earth shall die.",
      18: "But with thee will I establish my covenant; and thou shalt come into the ark, thou, and thy sons, and thy wife, and thy sons' wives with thee.",
      19: "And of every living thing of all flesh, two of every sort shalt thou bring into the ark, to keep them alive with thee; they shall be male and female.",
      22: "Thus did Noah; according to all that God commanded him, so did he.",
    },
    7: {
      1: "And the LORD said unto Noah, Come thou and all thy house into the ark; for thee have I seen righteous before me in this generation.",
      4: "For yet seven days, and I will cause it to rain upon the earth forty days and forty nights; and every living substance that I have made will I destroy from off the face of the earth.",
      5: "And Noah did according unto all that the LORD commanded him.",
      11: "In the six hundredth year of Noah's life, in the second month, the seventeenth day of the month, the same day were all the fountains of the great deep broken up, and the windows of heaven were opened.",
      12: "And the rain was upon the earth forty days and forty nights.",
      16: "And they that went in, went in male and female of all flesh, as God had commanded him: and the LORD shut him in.",
      17: "And the flood was forty days upon the earth; and the waters increased, and bare up the ark, and it was lift up above the earth.",
      19: "And the waters prevailed exceedingly upon the earth; and all the high hills, that were under the whole heaven, were covered.",
      20: "Fifteen cubits upward did the waters prevail; and the mountains were covered.",
      21: "And all flesh died that moved upon the earth, both of fowl, and of cattle, and of beast, and of every creeping thing that creepeth upon the earth, and every man:",
      23: "And every living substance was destroyed which was upon the face of the ground, both man, and cattle, and the creeping things, and the fowl of the heaven; and they were destroyed from the earth: and Noah only remained alive, and they that were with him in the ark.",
    },
    8: {
      1: "And God remembered Noah, and every living thing, and all the cattle that was with him in the ark: and God made a wind to pass over the earth, and the waters assuaged;",
      2: "The fountains also of the deep and the windows of heaven were stopped, and the rain from heaven was restrained;",
      3: "And the waters returned from off the earth continually: and after the end of the hundred and fifty days the waters were abated.",
      4: "And the ark rested in the seventh month, on the seventeenth day of the month, upon the mountains of Ararat.",
      6: "And it came to pass at the end of forty days, that Noah opened the window of the ark which he had made:",
      8: "Also he sent forth a dove from him, to see if the waters were abated from off the face of the ground;",
      9: "But the dove found no rest for the sole of her foot, and she returned unto him into the ark, for the waters were on the face of the whole earth: then he put forth his hand, and took her, and pulled her in unto him into the ark.",
      11: "And the dove came in to him in the evening; and, lo, in her mouth was an olive leaf pluckt off: so Noah knew that the waters were abated from off the earth.",
      13: "And it came to pass in the six hundredth and first year, in the first month, the first day of the month, the waters were dried up from off the earth: and Noah removed the covering of the ark, and looked, and, behold, the face of the ground was dry.",
      15: "And God spake unto Noah, saying,",
      16: "Go forth of the ark, thou, and thy wife, and thy sons, and thy sons' wives with thee.",
      20: "And Noah builded an altar unto the LORD; and took of every clean beast, and of every clean fowl, and offered burnt offerings on the altar.",
      21: "And the LORD smelled a sweet savour; and the LORD said in his heart, I will not again curse the ground any more for man's sake; for the imagination of man's heart is evil from his youth; neither will I again smite any more every thing living, as I have done.",
      22: "While the earth remaineth, seedtime and harvest, and cold and heat, and summer and winter, and day and night shall not cease.",
    },
    9: {
      1: "And God blessed Noah and his sons, and said unto them, Be fruitful, and multiply, and replenish the earth.",
      8: "And God spake unto Noah, and to his sons with him, saying,",
      9: "And I, behold, I establish my covenant with you, and with your seed after you;",
      11: "And I will establish my covenant with you; neither shall all flesh be cut off any more by the waters of a flood; neither shall there any more be a flood to destroy the earth.",
      12: "And God said, This is the token of the covenant which I make between me and you and every living creature that is with you, for perpetual generations:",
      13: "I do set my bow in the cloud, and it shall be for a token of a covenant between me and the earth.",
      14: "And it shall come to pass, when I bring a cloud over the earth, that the bow shall be seen in the cloud:",
      15: "And I will remember my covenant, which is between me and you and every living creature of all flesh; and the waters shall no more become a flood to destroy all flesh.",
      16: "And the bow shall be in the cloud; and I will look upon it, that I may remember the everlasting covenant between God and every living creature of all flesh that is upon the earth.",
      17: "And God said unto Noah, This is the token of the covenant, which I have established between me and all flesh that is upon the earth.",
    },
    11: {
      1: "And the whole earth was of one language, and of one speech.",
      2: "And it came to pass, as they journeyed from the east, that they found a plain in the land of Shinar; and they dwelt there.",
      3: "And they said one to another, Go to, let us make brick, and burn them throughly. And they had brick for stone, and slime had they for morter.",
      4: "And they said, Go to, let us build us a city and a tower, whose top may reach unto heaven; and let us make us a name, lest we be scattered abroad upon the face of the whole earth.",
      5: "And the LORD came down to see the city and the tower, which the children of men builded.",
      6: "And the LORD said, Behold, the people is one, and they have all one language; and this they begin to do: and now nothing will be restrained from them, which they have imagined to do.",
      7: "Go to, let us go down, and there confound their language, that they may not understand one another's speech.",
      8: "So the LORD scattered them abroad from thence upon the face of all the earth: and they left off to build the city.",
      9: "Therefore is the name of it called Babel; because the LORD did there confound the language of all the earth: and from thence did the LORD scatter them abroad upon the face of all the earth.",
      26: "And Terah lived seventy years, and begat Abram, Nahor, and Haran.",
      31: "And Terah took Abram his son, and Lot the son of Haran his son's son, and Sarai his daughter in law, his son Abram's wife; and they went forth with them from Ur of the Chaldees, to go into the land of Canaan; and they came unto Haran, and dwelt there.",
      32: "And the days of Terah were two hundred and five years: and Terah died in Haran.",
    },
    12: {
      1: "Now the LORD had said unto Abram, Get thee out of thy country, and from thy kindred, and from thy father's house, unto a land that I will shew thee:",
      2: "And I will make of thee a great nation, and I will bless thee, and make thy name great; and thou shalt be a blessing:",
      3: "And I will bless them that bless thee, and curse him that curseth thee: and in thee shall all families of the earth be blessed.",
      4: "So Abram departed, as the LORD had spoken unto him; and Lot went with him: and Abram was seventy and five years old when he departed out of Haran.",
      5: "And Abram took Sarai his wife, and Lot his brother's son, and all their substance that they had gathered, and the souls that they had gotten in Haran; and they went forth to go into the land of Canaan; and into the land of Canaan they came.",
      7: "And the LORD appeared unto Abram, and said, Unto thy seed will I give this land: and there builded he an altar unto the LORD, who appeared unto him.",
    },
    15: {
      1: "After these things the word of the LORD came unto Abram in a vision, saying, Fear not, Abram: I am thy shield, and thy exceeding great reward.",
      5: "And he brought him forth abroad, and said, Look now toward heaven, and tell the stars, if thou be able to number them: and he said unto him, So shall thy seed be.",
      6: "And he believed in the LORD; and he counted it to him for righteousness.",
      13: "And he said unto Abram, Know of a surety that thy seed shall be a stranger in a land that is not theirs, and shall serve them; and they shall afflict them four hundred years;",
      18: "In the same day the LORD made a covenant with Abram, saying, Unto thy seed have I given this land, from the river of Egypt unto the great river, the river Euphrates:",
    },
    17: {
      1: "And when Abram was ninety years old and nine, the LORD appeared to Abram, and said unto him, I am the Almighty God; walk before me, and be thou perfect.",
      2: "And I will make my covenant between me and thee, and will multiply thee exceedingly.",
      4: "As for me, behold, my covenant is with thee, and thou shalt be a father of many nations.",
      5: "Neither shall thy name any more be called Abram, but thy name shall be Abraham; for a father of many nations have I made thee.",
      7: "And I will establish my covenant between me and thee and thy seed after thee in their generations for an everlasting covenant, to be a God unto thee, and to thy seed after thee.",
      15: "And God said unto Abraham, As for Sarai thy wife, thou shalt not call her name Sarai, but Sarah shall her name be.",
      17: "Then Abraham fell upon his face, and laughed, and said in his heart, Shall a child be born unto him that is an hundred years old? and shall Sarah, that is ninety years old, bear?",
      19: "And God said, Sarah thy wife shall bear thee a son indeed; and thou shalt call his name Isaac: and I will establish my covenant with him for an everlasting covenant, and with his seed after him.",
    },
    22: {
      1: "And it came to pass after these things, that God did tempt Abraham, and said unto him, Abraham: and he said, Behold, here I am.",
      2: "And he said, Take now thy son, thine only son Isaac, whom thou lovest, and get thee into the land of Moriah; and offer him there for a burnt offering upon one of the mountains which I will tell thee of.",
      3: "And Abraham rose up early in the morning, and saddled his ass, and took two of his young men with him, and Isaac his son, and clave the wood for the burnt offering, and rose up, and went unto the place of which God had told him.",
      4: "Then on the third day Abraham lifted up his eyes, and saw the place afar off.",
      5: "And Abraham said unto his young men, Abide ye here with the ass; and I and the lad will go yonder and worship, and come again to you.",
      6: "And Abraham took the wood of the burnt offering, and laid it upon Isaac his son; and he took the fire in his hand, and a knife; and they went both of them together.",
      7: "And Isaac spake unto Abraham his father, and said, My father: and he said, Here am I, my son. And he said, Behold the fire and the wood: but where is the lamb for a burnt offering?",
      8: "And Abraham said, My son, God will provide himself a lamb for a burnt offering: so they went both of them together.",
      9: "And they came to the place which God had told him of; and Abraham built an altar there, and laid the wood in order, and bound Isaac his son, and laid him on the altar upon the wood.",
      10: "And Abraham stretched forth his hand, and took the knife to slay his son.",
      11: "And the angel of the LORD called unto him out of heaven, and said, Abraham, Abraham: and he said, Here am I.",
      12: "And he said, Lay not thine hand upon the lad, neither do thou any thing unto him: for now I know that thou fearest God, seeing thou hast not withheld thy son, thine only son from me.",
      13: "And Abraham lifted up his eyes, and looked, and behold behind him a ram caught in a thicket by his horns: and Abraham went and took the ram, and offered him up for a burnt offering in the stead of his son.",
      14: "And Abraham called the name of that place Jehovahjireh: as it is said to this day, In the mount of the LORD it shall be seen.",
      15: "And the angel of the LORD called unto Abraham out of heaven the second time,",
      16: "And said, By myself have I sworn, saith the LORD, for because thou hast done this thing, and hast not withheld thy son, thine only son:",
      17: "That in blessing I will bless thee, and in multiplying I will multiply thy seed as the stars of the heaven, and as the sand which is upon the sea shore; and thy seed shall possess the gate of his enemies;",
      18: "And in thy seed shall all the nations of the earth be blessed; because thou hast obeyed my voice.",
    },
    28: {
      10: "And Jacob went out from Beer-sheba, and went toward Haran.",
      11: "And he lighted upon a certain place, and tarried there all night, because the sun was set; and he took of the stones of that place, and put them for his pillows, and lay down in that place to sleep.",
      12: "And he dreamed, and behold a ladder set up on the earth, and the top of it reached to heaven: and behold the angels of God ascending and descending on it.",
      13: "And, behold, the LORD stood above it, and said, I am the LORD God of Abraham thy father, and the God of Isaac: the land whereon thou liest, to thee will I give it, and to thy seed;",
      14: "And thy seed shall be as the dust of the earth, and thou shalt spread abroad to the west, and to the east, and to the north, and to the south: and in thee and in thy seed shall all the families of the earth be blessed.",
      15: "And, behold, I am with thee, and will keep thee in all places whither thou goest, and will bring thee again into this land; for I will not leave thee, until I have done that which I have spoken to thee of.",
      16: "And Jacob awaked out of his sleep, and he said, Surely the LORD is in this place; and I knew it not.",
      17: "And he was afraid, and said, How dreadful is this place! this is none other but the house of God, and this is the gate of heaven.",
      18: "And Jacob rose up early in the morning, and took the stone that he had put for his pillows, and set it up for a pillar, and poured oil upon the top of it.",
      19: "And he called the name of that place Bethel: but the name of that city was called Luz at the first.",
      20: "And Jacob vowed a vow, saying, If God will be with me, and will keep me in this way that I go, and will give me bread to eat, and raiment to put on,",
      21: "So that I come again to my father's house in peace; then shall the LORD be my God:",
      22: "And this stone, which I have set for a pillar, shall be God's house: and of all that thou shalt give me I will surely give the tenth unto thee.",
    },
    32: {
      24: "And Jacob was left alone; and there wrestled a man with him until the breaking of the day.",
      25: "And when he saw that he prevailed not against him, he touched the hollow of his thigh; and the hollow of Jacob's thigh was out of joint, as he wrestled with him.",
      26: "And he said, Let me go, for the day breaketh. And he said, I will not let thee go, except thou bless me.",
      27: "And he said unto him, What is thy name? And he said, Jacob.",
      28: "And he said, Thy name shall be called no more Jacob, but Israel: for as a prince hast thou power with God and with men, and hast prevailed.",
      29: "And Jacob asked him, and said, Tell me, I pray thee, thy name. And he said, Wherefore is it that thou dost ask after my name? And he blessed him there.",
      30: "And Jacob called the name of the place Peniel: for I have seen God face to face, and my life is preserved.",
    },
    39: {
      1: "And Joseph was brought down to Egypt; and Potiphar, an officer of Pharaoh, captain of the guard, an Egyptian, bought him of the hands of the Ishmeelites, which had brought him down thither.",
      2: "And the LORD was with Joseph, and he was a prosperous man; and he was in the house of his master the Egyptian.",
      3: "And his master saw that the LORD was with him, and that the LORD made all that he did to prosper in his hand.",
      4: "And Joseph found grace in his sight, and he served him: and he made him overseer over his house, and all that he had he put into his hand.",
      20: "And Joseph's master took him, and put him into the prison, a place where the king's prisoners were bound: and he was there in the prison.",
      21: "But the LORD was with Joseph, and shewed him mercy, and gave him favour in the sight of the keeper of the prison.",
      23: "The keeper of the prison looked not to any thing that was under his hand; because the LORD was with him, and that which he did, the LORD made it to prosper.",
    },
    41: {
      1: "And it came to pass at the end of two full years, that Pharaoh dreamed: and, behold, he stood by the river.",
      14: "Then Pharaoh sent and called Joseph, and they brought him hastily out of the dungeon: and he shaved himself, and changed his raiment, and came in unto Pharaoh.",
      15: "And Pharaoh said unto Joseph, I have dreamed a dream, and there is none that can interpret it: and I have heard say of thee, that thou canst understand a dream to interpret it.",
      16: "And Joseph answered Pharaoh, saying, It is not in me: God shall give Pharaoh an answer of peace.",
      25: "And Joseph said unto Pharaoh, The dream of Pharaoh is one: God hath shewed Pharaoh what he is about to do.",
      37: "And the thing was good in the eyes of Pharaoh, and in the eyes of all his servants.",
      38: "And Pharaoh said unto his servants, Can we find such a one as this is, a man in whom the Spirit of God is?",
      39: "And Pharaoh said unto Joseph, Forasmuch as God hath shewed thee all this, there is none so discreet and wise as thou art:",
      40: "Thou shalt be over my house, and according unto thy word shall all my people be ruled: only in the throne will I be greater than thou.",
      41: "And Pharaoh said unto Joseph, See, I have set thee over all the land of Egypt.",
    },
    45: {
      1: "Then Joseph could not refrain himself before all them that stood by him; and he cried, Cause every man to go out from me. And there stood no man with him, while Joseph made himself known unto his brethren.",
      2: "And he wept aloud: and the Egyptians and the house of Pharaoh heard.",
      3: "And Joseph said unto his brethren, I am Joseph; doth my father yet live? And his brethren could not answer him; for they were troubled at his presence.",
      4: "And Joseph said unto his brethren, Come near to me, I pray you. And they came near. And he said, I am Joseph your brother, whom ye sold into Egypt.",
      5: "Now therefore be not grieved, nor angry with yourselves, that ye sold me hither: for God did send me before you to preserve life.",
      7: "And God sent me before you to preserve you a posterity in the earth, and to save your lives by a great deliverance.",
      8: "So now it was not you that sent me hither, but God: and he hath made me a father to Pharaoh, and lord of all his house, and a ruler throughout all the land of Egypt.",
    },
    50: {
      19: "And Joseph said unto them, Fear not: for am I in the place of God?",
      20: "But as for you, ye thought evil against me; but God meant it unto good, to bring to pass, as it is this day, to save much people alive.",
      21: "Now therefore fear ye not: I will nourish you, and your little ones. And he comforted them, and spake kindly unto them.",
      24: "And Joseph said unto his brethren, I die: and God will surely visit you, and bring you out of this land unto the land which he sware to Abraham, to Isaac, and to Jacob.",
      25: "And Joseph took an oath of the children of Israel, saying, God will surely visit you, and ye shall carry up my bones from hence.",
      26: "So Joseph died, being an hundred and ten years old: and they embalmed him, and he was put in a coffin in Egypt.",
    },
  },

  // ───────────────────────────────────────────
  //  EXODUS
  // ───────────────────────────────────────────
  "exo": {
    1: {
      1: "Now these are the names of the children of Israel, which came into Egypt; every man and his household came with Jacob.",
      7: "And the children of Israel were fruitful, and increased abundantly, and multiplied, and waxed exceeding mighty; and the land was filled with them.",
      8: "Now there arose up a new king over Egypt, which knew not Joseph.",
      11: "Therefore they did set over them taskmasters to afflict them with their burdens. And they built for Pharaoh treasure cities, Pithom and Raamses.",
      12: "But the more they afflicted them, the more they multiplied and grew. And they were grieved because of the children of Israel.",
    },
    3: {
      1: "Now Moses kept the flock of Jethro his father in law, the priest of Midian: and he led the flock to the backside of the desert, and came to the mountain of God, even to Horeb.",
      2: "And the angel of the LORD appeared unto him in a flame of fire out of the midst of a bush: and he looked, and, behold, the bush burned with fire, and the bush was not consumed.",
      3: "And Moses said, I will now turn aside, and see this great sight, why the bush is not burnt.",
      4: "And when the LORD saw that he turned aside to see, God called unto him out of the midst of the bush, and said, Moses, Moses. And he said, Here am I.",
      5: "And he said, Draw not nigh hither: put off thy shoes from off thy feet, for the place whereon thou standest is holy ground.",
      6: "Moreover he said, I am the God of thy father, the God of Abraham, the God of Isaac, and the God of Jacob. And Moses hid his face; for he was afraid to look upon God.",
      7: "And the LORD said, I have surely seen the affliction of my people which are in Egypt, and have heard their cry by reason of their taskmasters; for I know their sorrows;",
      8: "And I am come down to deliver them out of the hand of the Egyptians, and to bring them up out of that land unto a good land and a large, unto a land flowing with milk and honey;",
      14: "And God said unto Moses, I AM THAT I AM: and he said, Thus shalt thou say unto the children of Israel, I AM hath sent me unto you.",
    },
    14: {
      13: "And Moses said unto the people, Fear ye not, stand still, and see the salvation of the LORD, which he will shew to you to day: for the Egyptians whom ye have seen to day, ye shall see them again no more for ever.",
      14: "The LORD shall fight for you, and ye shall hold your peace.",
      21: "And Moses stretched out his hand over the sea; and the LORD caused the sea to go back by a strong east wind all that night, and made the sea dry land, and the waters were divided.",
      22: "And the children of Israel went into the midst of the sea upon the dry ground: and the waters were a wall unto them on their right hand, and on their left.",
      29: "But the children of Israel walked upon dry land in the midst of the sea; and the waters were a wall unto them on their right hand, and on their left.",
      30: "Thus the LORD saved Israel that day out of the hand of the Egyptians; and Israel saw the Egyptians dead upon the sea shore.",
      31: "And Israel saw that great work which the LORD did upon the Egyptians: and the people feared the LORD, and believed the LORD, and his servant Moses.",
    },
    20: {
      1: "And God spake all these words, saying,",
      2: "I am the LORD thy God, which have brought thee out of the land of Egypt, out of the house of bondage.",
      3: "Thou shalt have no other gods before me.",
      4: "Thou shalt not make unto thee any graven image, or any likeness of any thing that is in heaven above, or that is in the earth beneath, or that is in the water under the earth.",
      5: "Thou shalt not bow down thyself to them, nor serve them: for I the LORD thy God am a jealous God, visiting the iniquity of the fathers upon the children unto the third and fourth generation of them that hate me;",
      6: "And shewing mercy unto thousands of them that love me, and keep my commandments.",
      7: "Thou shalt not take the name of the LORD thy God in vain; for the LORD will not hold him guiltless that taketh his name in vain.",
      8: "Remember the sabbath day, to keep it holy.",
      9: "Six days shalt thou labour, and do all thy work:",
      10: "But the seventh day is the sabbath of the LORD thy God: in it thou shalt not do any work, thou, nor thy son, nor thy daughter, thy manservant, nor thy maidservant, nor thy cattle, nor thy stranger that is within thy gates:",
      11: "For in six days the LORD made heaven and earth, the sea, and all that in them is, and rested the seventh day: wherefore the LORD blessed the sabbath day, and hallowed it.",
      12: "Honour thy father and thy mother: that thy days may be long upon the land which the LORD thy God giveth thee.",
      13: "Thou shalt not kill.",
      14: "Thou shalt not commit adultery.",
      15: "Thou shalt not steal.",
      16: "Thou shalt not bear false witness against thy neighbour.",
      17: "Thou shalt not covet thy neighbour's house, thou shalt not covet thy neighbour's wife, nor his manservant, nor his maidservant, nor his ox, nor his ass, nor any thing that is thy neighbour's.",
    },
  },

  // ───────────────────────────────────────────
  //  LEVITICUS
  // ───────────────────────────────────────────
  "lev": {
    1: {
      1: "And the LORD called unto Moses, and spake unto him out of the tabernacle of the congregation, saying,",
      2: "Speak unto the children of Israel, and say unto them, If any man of you bring an offering unto the LORD, ye shall bring your offering of the cattle, even of the herd, and of the flock.",
      3: "If his offering be a burnt sacrifice of the herd, let him offer a male without blemish: he shall offer it of his own voluntary will at the door of the tabernacle of the congregation before the LORD.",
    },
    19: {
      18: "Thou shalt not avenge, nor bear any grudge against the children of thy people, but thou shalt love thy neighbour as thyself: I am the LORD.",
    },
  },

  // ───────────────────────────────────────────
  //  NUMBERS
  // ───────────────────────────────────────────
  "num": {
    1: {
      1: "And the LORD spake unto Moses in the wilderness of Sinai, in the tabernacle of the congregation, on the first day of the second month, in the second year after they were come out of the land of Egypt, saying,",
      2: "Take ye the sum of all the congregation of the children of Israel, after their families, by the house of their fathers, with the number of their names, every male by their polls;",
    },
    6: {
      24: "The LORD bless thee, and keep thee:",
      25: "The LORD make his face shine upon thee, and be gracious unto thee:",
      26: "The LORD lift up his countenance upon thee, and give thee peace.",
    },
  },

  // ───────────────────────────────────────────
  //  DEUTERONOMY
  // ───────────────────────────────────────────
  "deu": {
    1: {
      1: "These be the words which Moses spake unto all Israel on this side Jordan in the wilderness, in the plain over against the Red sea, between Paran, and Tophel, and Laban, and Hazeroth, and Dizahab.",
    },
    6: {
      4: "Hear, O Israel: The LORD our God is one LORD:",
      5: "And thou shalt love the LORD thy God with all thine heart, and with all thy soul, and with all thy might.",
      6: "And these words, which I command thee this day, shall be in thine heart:",
      7: "And thou shalt teach them diligently unto thy children, and shalt talk of them when thou sittest in thine house, and when thou walkest by the way, and when thou liest down, and when thou risest up.",
    },
    31: {
      6: "Be strong and of a good courage, fear not, nor be afraid of them: for the LORD thy God, he it is that doth go with thee; he will not fail thee, nor forsake thee.",
    },
  },

  // ───────────────────────────────────────────
  //  JOSHUA
  // ───────────────────────────────────────────
  "jos": {
    1: {
      1: "Now after the death of Moses the servant of the LORD it came to pass, that the LORD spake unto Joshua the son of Nun, Moses' minister, saying,",
      2: "Moses my servant is dead; now therefore arise, go over this Jordan, thou, and all this people, unto the land which I do give to them, even to the children of Israel.",
      5: "There shall not any man be able to stand before thee all the days of thy life: as I was with Moses, so I will be with thee: I will not fail thee, nor forsake thee.",
      6: "Be strong and courageous: for unto this people shalt thou divide for an inheritance the land, which I sware unto their fathers to give them.",
      7: "Only be thou strong and very courageous, that thou mayest observe to do according to all the law, which Moses my servant commanded thee: turn not from it to the right hand or to the left, that thou mayest prosper whithersoever thou goest.",
      8: "This book of the law shall not depart out of thy mouth; but thou shalt meditate therein day and night, that thou mayest observe to do according to all that is written therein: for then thou shalt make thy way prosperous, and then thou shalt have good success.",
      9: "Have not I commanded thee? Be strong and of a good courage; be not afraid, neither be thou dismayed: for the LORD thy God is with thee whithersoever thou goest.",
    },
  },

  // ───────────────────────────────────────────
  //  JUDGES
  // ───────────────────────────────────────────
  "jdg": {
    1: {
      1: "Now after the death of Joshua it came to pass, that the children of Israel asked the LORD, saying, Who shall go up for us against the Canaanites first, to fight against them?",
      2: "And the LORD said, Judah shall go up: behold, I have delivered the land into his hand.",
    },
  },

  // ───────────────────────────────────────────
  //  RUTH
  // ───────────────────────────────────────────
  "rut": {
    1: {
      1: "Now it came to pass in the days when the judges ruled, that there was a famine in the land. And a certain man of Bethlehemjudah went to sojourn in the country of Moab, he, and his wife, and his two sons.",
      4: "And they took them wives of the women of Moab; the name of the one was Orpah, and the name of the other Ruth: and they dwelled there about ten years.",
      6: "Then she arose with her daughters in law, that she might return from the country of Moab: for she had heard in the country of Moab how that the LORD had visited his people in giving them bread.",
      14: "And they lifted up their voice, and wept again: and Orpah kissed her mother in law; but Ruth clave unto her.",
      16: "And Ruth said, Intreat me not to leave thee, or to return from following after thee: for whither thou goest, I will go; and where thou lodgest, I will lodge: thy people shall be my people, and thy God my God:",
      17: "Where thou diest, will I die, and there will I be buried: the LORD do so to me, and more also, if ought but death part thee and me.",
    },
  },

  // ───────────────────────────────────────────
  //  1 SAMUEL
  // ───────────────────────────────────────────
  "1sa": {
    1: {
      1: "Now there was a certain man of Ramathaimzophim, of mount Ephraim, and his name was Elkanah, the son of Jeroham, the son of Elihu, the son of Tohu, the son of Zuph, an Ephrathite:",
      10: "And she was in bitterness of soul, and prayed unto the LORD, and wept sore.",
      11: "And she vowed a vow, and said, O LORD of hosts, if thou wilt indeed look on the affliction of thine handmaid, and remember me, and not forget thine handmaid, but wilt give unto thine handmaid a man child, then I will give him unto the LORD all the days of his life, and there shall no razor come upon his head.",
      20: "Wherefore it came to pass, when the time was come about after Hannah had conceived, that she bare a son, and called his name Samuel, saying, Because I have asked him of the LORD.",
    },
    17: {
      4: "And there went out a champion out of the camp of the Philistines, named Goliath, of Gath, whose height was six cubits and a span.",
      37: "David said moreover, The LORD that delivered me out of the paw of the lion, and out of the paw of the bear, he will deliver me out of the hand of this Philistine. And Saul said unto David, Go, and the LORD be with thee.",
      45: "Then said David to the Philistine, Thou comest to me with a sword, and with a spear, and with a shield: but I come to thee in the name of the LORD of hosts, the God of the armies of Israel, whom thou hast defied.",
      46: "This day will the LORD deliver thee into mine hand; and I will smite thee, and take thine head from thee; and I will give the carcases of the host of the Philistines this day unto the fowls of the air, and to the wild beasts of the earth; that all the earth may know that there is a God in Israel.",
      47: "And all this assembly shall know that the LORD saveth not with sword and spear: for the battle is the LORD's, and he will give you into our hands.",
      50: "So David prevailed over the Philistine with a sling and with a stone, and smote the Philistine, and slew him; but there was no sword in the hand of David.",
    },
  },

  // ───────────────────────────────────────────
  //  2 SAMUEL
  // ───────────────────────────────────────────
  "2sa": {
    1: {
      1: "Now it came to pass after the death of Saul, when David was returned from the slaughter of the Amalekites, and David had abode two days in Ziklag;",
      19: "The beauty of Israel is slain upon thy high places: how are the mighty fallen!",
      27: "How are the mighty fallen, and the weapons of war perished!",
    },
    22: {
      2: "And he said, The LORD is my rock, and my fortress, and my deliverer;",
      3: "The God of my rock; in him will I trust: he is my shield, and the horn of my salvation, my high tower, and my refuge, my saviour; thou savest me from violence.",
    },
  },

  // ───────────────────────────────────────────
  //  1 KINGS
  // ───────────────────────────────────────────
  "1ki": {
    1: {
      1: "Now king David was old and stricken in years; and they covered him with clothes, but he gat no heat.",
    },
    3: {
      5: "In Gibeon the LORD appeared to Solomon in a dream by night: and God said, Ask what I shall give thee.",
      9: "Give therefore thy servant an understanding heart to judge thy people, that I may discern between good and bad: for who is able to judge this thy so great a people?",
      12: "Behold, I have done according to thy words: lo, I have given thee a wise and an understanding heart; so that there was none like thee before thee, neither after thee shall any arise like unto thee.",
    },
    18: {
      21: "And Elijah came unto all the people, and said, How long halt ye between two opinions? if the LORD be God, follow him: but if Baal, then follow him. And the people answered him not a word.",
    },
    19: {
      12: "And after the earthquake a fire; but the LORD was not in the fire: and after the fire a still small voice.",
    },
  },

  // ───────────────────────────────────────────
  //  2 KINGS
  // ───────────────────────────────────────────
  "2ki": {
    1: {
      1: "Then Moab rebelled against Israel after the death of Ahab.",
    },
  },

  // ───────────────────────────────────────────
  //  1 CHRONICLES
  // ───────────────────────────────────────────
  "1ch": {
    1: {
      1: "Adam, Sheth, Enosh,",
    },
    29: {
      11: "Thine, O LORD, is the greatness, and the power, and the glory, and the victory, and the majesty: for all that is in the heaven and in the earth is thine; thine is the kingdom, O LORD, and thou art exalted as head above all.",
      14: "But who am I, and what is my people, that we should be able to offer so willingly after this sort? for all things come of thee, and of thine own have we given thee.",
    },
  },

  // ───────────────────────────────────────────
  //  2 CHRONICLES
  // ───────────────────────────────────────────
  "2ch": {
    1: {
      1: "And Solomon the son of David was strengthened in his kingdom, and the LORD his God was with him, and magnified him exceedingly.",
    },
    7: {
      14: "If my people, which are called by my name, shall humble themselves, and pray, and seek my face, and turn from their wicked ways; then will I hear from heaven, and will forgive their sin, and will heal their land.",
    },
  },

  // ───────────────────────────────────────────
  //  EZRA
  // ───────────────────────────────────────────
  "ezr": {
    1: {
      1: "Now in the first year of Cyrus king of Persia, that the word of the LORD spoken by the mouth of Jeremiah might be accomplished, the LORD stirred up the spirit of Cyrus king of Persia, that he made a proclamation throughout all his kingdom, and put it also in writing, saying,",
      2: "Thus saith Cyrus king of Persia, The LORD God of heaven hath given me all the kingdoms of the earth; and he hath charged me to build him an house at Jerusalem, which is in Judah.",
      3: "Who is there among you of all his people? his God be with him, and let him go up to Jerusalem, which is in Judah, and build the house of the LORD God of Israel, (he is the God,) which is in Jerusalem.",
    },
  },

  // ───────────────────────────────────────────
  //  NEHEMIAH
  // ───────────────────────────────────────────
  "neh": {
    1: {
      1: "The words of Nehemiah the son of Hachaliah. And it came to pass in the month Chislev, in the twentieth year, as I was in Shushan the palace,",
      4: "And it came to pass, when I heard these words, that I sat down and wept, and mourned certain days, and fasted, and prayed before the God of heaven,",
    },
    8: {
      10: "Then he said unto them, Go your way, eat the fat, and drink the sweet, and send portions unto them for whom nothing is prepared: for this day is holy unto our LORD: neither be ye sorry; for the joy of the LORD is your strength.",
    },
  },

  // ───────────────────────────────────────────
  //  ESTHER
  // ───────────────────────────────────────────
  "est": {
    1: {
      1: "Now it came to pass in the days of Ahasuerus, (this is Ahasuerus which reigned, from India even unto Ethiopia, over an hundred and seven and twenty provinces:)",
    },
    4: {
      14: "For if thou altogether holdest thy peace at this time, then shall there enlargement and deliverance arise to the Jews from another place; but thou and thy father's house shall be destroyed: and who knoweth whether thou art come to the kingdom for such a time as this?",
    },
  },

  // ───────────────────────────────────────────
  //  JOB
  // ───────────────────────────────────────────
  "job": {
    1: {
      1: "There was a man in the land of Uz, whose name was Job; and that man was perfect and upright, and one that feared God, and eschewed evil.",
      3: "His substance also was seven thousand sheep, and three thousand camels, and five hundred yoke of oxen, and five hundred she asses, and a very great household; so that this man was the greatest of all the men of the east.",
      21: "And said, Naked came I out of my mother's womb, and naked shall I return thither: the LORD gave, and the LORD hath taken away; blessed be the name of the LORD.",
    },
    38: {
      1: "Then the LORD answered Job out of the whirlwind, and said,",
      2: "Who is this that darkeneth counsel by words without knowledge?",
      3: "Gird up now thy loins like a man; for I will demand of thee, and answer thou me.",
      4: "Where wast thou when I laid the foundations of the earth? declare, if thou hast understanding.",
    },
  },

  // ───────────────────────────────────────────
  //  PSALMS  (additional beyond 1, 23, 91)
  // ───────────────────────────────────────────
  "psa": {
    8: {
      1: "O LORD our Lord, how excellent is thy name in all the earth! who hast set thy glory above the heavens.",
      2: "Out of the mouth of babes and sucklings hast thou ordained strength because of thine enemies, that thou mightest still the enemy and the avenger.",
      3: "When I consider thy heavens, the work of thy fingers, the moon and the stars, which thou hast ordained;",
      4: "What is man, that thou art mindful of him? and the son of man, that thou visitest him?",
      5: "For thou hast made him a little lower than the angels, and hast crowned him with glory and honour.",
      6: "Thou madest him to have dominion over the works of thy hands; thou hast put all things under his feet:",
      7: "All sheep and oxen, yea, and the beasts of the field;",
      8: "The fowl of the air, and the fish of the sea, and whatsoever passeth through the paths of the seas.",
      9: "O LORD our Lord, how excellent is thy name in all the earth!",
    },
    19: {
      1: "The heavens declare the glory of God; and the firmament sheweth his handywork.",
      2: "Day unto day uttereth speech, and night unto night sheweth knowledge.",
      3: "There is no speech nor language, where their voice is not heard.",
      4: "Their line is gone out through all the earth, and their words to the end of the world. In them hath he set a tabernacle for the sun,",
      5: "Which is as a bridegroom coming out of his chamber, and rejoiceth as a strong man to run a race.",
      6: "His going forth is from the end of the heaven, and his circuit unto the ends of it: and there is nothing hid from the heat thereof.",
      7: "The law of the LORD is perfect, converting the soul: the testimony of the LORD is sure, making wise the simple.",
      8: "The statutes of the LORD are right, rejoicing the heart: the commandment of the LORD is pure, enlightening the eyes.",
      9: "The fear of the LORD is clean, enduring for ever: the judgments of the LORD are true and righteous altogether.",
      10: "More to be desired are they than gold, yea, than much fine gold: sweeter also than honey and the honeycomb.",
      11: "Moreover by them is thy servant warned: and in keeping of them there is great reward.",
      12: "Who can understand his errors? cleanse thou me from secret faults.",
      13: "Keep back thy servant also from presumptuous sins; let them not have dominion over me: then shall I be upright, and I shall be innocent from the great transgression.",
      14: "Let the words of my mouth, and the meditation of my heart, be acceptable in thy sight, O LORD, my strength, and my redeemer.",
    },
    22: {
      1: "My God, my God, why hast thou forsaken me? why art thou so far from helping me, and from the words of my roaring?",
      3: "But thou art holy, O thou that inhabitest the praises of Israel.",
      4: "Our fathers trusted in thee: they trusted, and thou didst deliver them.",
      6: "But I am a worm, and no man; a reproach of men, and despised of the people.",
      14: "I am poured out like water, and all my bones are out of joint: my heart is like wax; it is melted in the midst of my bowels.",
      16: "For dogs have compassed me: the assembly of the wicked have inclosed me: they pierced my hands and my feet.",
      18: "They part my garments among them, and cast lots upon my vesture.",
      27: "All the ends of the world shall remember and turn unto the LORD: and all the kindreds of the nations shall worship before thee.",
      28: "For the kingdom is the LORD's: and he is the governor among the nations.",
      31: "They shall come, and shall declare his righteousness unto a people that shall be born, that he hath done this.",
    },
    24: {
      1: "The earth is the LORD's, and the fulness thereof; the world, and they that dwell therein.",
      2: "For he hath founded it upon the seas, and established it upon the floods.",
      3: "Who shall ascend into the hill of the LORD? or who shall stand in his holy place?",
      4: "He that hath clean hands, and a pure heart; who hath not lifted up his soul unto vanity, nor sworn deceitfully.",
      5: "He shall receive the blessing from the LORD, and righteousness from the God of his salvation.",
      7: "Lift up your heads, O ye gates; and be ye lift up, ye everlasting doors; and the King of glory shall come in.",
      8: "Who is this King of glory? The LORD strong and mighty, the LORD mighty in battle.",
      9: "Lift up your heads, O ye gates; even lift them up, ye everlasting doors; and the King of glory shall come in.",
      10: "Who is this King of glory? The LORD of hosts, he is the King of glory. Selah.",
    },
    27: {
      1: "The LORD is my light and my salvation; whom shall I fear? the LORD is the strength of my life; of whom shall I be afraid?",
      4: "One thing have I desired of the LORD, that will I seek after; that I may dwell in the house of the LORD all the days of my life, to behold the beauty of the LORD, and to enquire in his temple.",
      14: "Wait on the LORD: be of good courage, and he shall strengthen thine heart: wait, I say, on the LORD.",
    },
    32: {
      1: "Blessed is he whose transgression is forgiven, whose sin is covered.",
      2: "Blessed is the man unto whom the LORD imputeth not iniquity, and in whose spirit there is no guile.",
      8: "I will instruct thee and teach thee in the way which thou shalt go: I will guide thee with mine eye.",
    },
    34: {
      8: "O taste and see that the LORD is good: blessed is the man that trusteth in him.",
      18: "The LORD is nigh unto them that are of a broken heart; and saveth such as be of a contrite spirit.",
    },
    46: {
      1: "God is our refuge and strength, a very present help in trouble.",
      2: "Therefore will not we fear, though the earth be removed, and though the mountains be carried into the midst of the sea;",
      3: "Though the waters thereof roar and be troubled, though the mountains shake with the swelling thereof. Selah.",
      10: "Be still, and know that I am God: I will be exalted among the heathen, I will be exalted in the earth.",
      11: "The LORD of hosts is with us; the God of Jacob is our refuge. Selah.",
    },
    51: {
      1: "Have mercy upon me, O God, according to thy lovingkindness: according unto the multitude of thy tender mercies blot out my transgressions.",
      2: "Wash me throughly from mine iniquity, and cleanse me from my sin.",
      3: "For I acknowledge my transgressions: and my sin is ever before me.",
      4: "Against thee, thee only, have I sinned, and done this evil in thy sight: that thou mightest be justified when thou speakest, and be clear when thou judgest.",
      7: "Purge me with hyssop, and I shall be clean: wash me, and I shall be whiter than snow.",
      10: "Create in me a clean heart, O God; and renew a right spirit within me.",
      11: "Cast me not away from thy presence; and take not thy holy spirit from me.",
      12: "Restore unto me the joy of thy salvation; and uphold me with thy free spirit.",
      17: "The sacrifices of God are a broken spirit: a broken and a contrite heart, O God, thou wilt not despise.",
    },
    100: {
      1: "Make a joyful noise unto the LORD, all ye lands.",
      2: "Serve the LORD with gladness: come before his presence with singing.",
      3: "Know ye that the LORD he is God: it is he that hath made us, and not we ourselves; we are his people, and the sheep of his pasture.",
      4: "Enter into his gates with thanksgiving, and into his courts with praise: be thankful unto him, and bless his name.",
      5: "For the LORD is good; his mercy is everlasting; and his truth endureth to all generations.",
    },
    103: {
      1: "Bless the LORD, O my soul: and all that is within me, bless his holy name.",
      2: "Bless the LORD, O my soul, and forget not all his benefits:",
      3: "Who forgiveth all thine iniquities; who healeth all thy diseases;",
      4: "Who redeemeth thy life from destruction; who crowneth thee with lovingkindness and tender mercies;",
      5: "Who satisfieth thy mouth with good things; so that thy youth is renewed like the eagle's.",
      8: "The LORD is merciful and gracious, slow to anger, and plenteous in mercy.",
      10: "He hath not dealt with us after our sins; nor rewarded us according to our iniquities.",
      11: "For as the heaven is high above the earth, so great is his mercy toward them that fear him.",
      12: "As far as the east is from the west, so far hath he removed our transgressions from us.",
      13: "Like as a father pitieth his children, so the LORD pitieth them that fear him.",
      17: "But the mercy of the LORD is from everlasting to everlasting upon them that fear him, and his righteousness unto children's children;",
    },
    121: {
      1: "I will lift up mine eyes unto the hills, from whence cometh my help.",
      2: "My help cometh from the LORD, which made heaven and earth.",
      3: "He will not suffer thy foot to be moved: he that keepeth thee will not slumber.",
      4: "Behold, he that keepeth Israel shall neither slumber nor sleep.",
      5: "The LORD is thy keeper: the LORD is thy shade upon thy right hand.",
      6: "The sun shall not smite thee by day, nor the moon by night.",
      7: "The LORD shall preserve thee from all evil: he shall preserve thy soul.",
      8: "The LORD shall preserve thy going out and thy coming in from this time forth, and even for evermore.",
    },
    139: {
      1: "O LORD, thou hast searched me, and known me.",
      2: "Thou knowest my downsitting and mine uprising, thou understandest my thought afar off.",
      3: "Thou compassest my path and my lying down, and art acquainted with all my ways.",
      4: "For there is not a word in my tongue, but, lo, O LORD, thou knowest it altogether.",
      5: "Thou hast beset me behind and before, and laid thine hand upon me.",
      6: "Such knowledge is too wonderful for me; it is high, I cannot attain unto it.",
      7: "Whither shall I go from thy spirit? or whither shall I flee from thy presence?",
      8: "If I ascend up into heaven, thou art there: if I make my bed in hell, behold, thou art there.",
      9: "If I take the wings of the morning, and dwell in the uttermost parts of the sea;",
      10: "Even there shall thy hand lead me, and thy right hand shall hold me.",
      13: "For thou hast possessed my reins: thou hast covered me in my mother's womb.",
      14: "I will praise thee; for I am fearfully and wonderfully made: marvellous are thy works; and that my soul knoweth right well.",
      23: "Search me, O God, and know my heart: try me, and know my thoughts:",
      24: "And see if there be any wicked way in me, and lead me in the way everlasting.",
    },
    150: {
      1: "Praise ye the LORD. Praise God in his sanctuary: praise him in the firmament of his power.",
      2: "Praise him for his mighty acts: praise him according to his excellent greatness.",
      3: "Praise him with the sound of the trumpet: praise him with the psaltery and harp.",
      4: "Praise him with the timbrel and dance: praise him with stringed instruments and organs.",
      5: "Praise him upon the loud cymbals: praise him upon the high sounding cymbals.",
      6: "Let every thing that hath breath praise the LORD. Praise ye the LORD.",
    },
  },

  // ───────────────────────────────────────────
  //  PROVERBS
  // ───────────────────────────────────────────
  "pro": {
    1: {
      1: "The proverbs of Solomon the son of David, king of Israel;",
      7: "The fear of the LORD is the beginning of knowledge: but fools despise wisdom and instruction.",
    },
    3: {
      5: "Trust in the LORD with all thine heart; and lean not unto thine own understanding.",
      6: "In all thy ways acknowledge him, and he shall direct thy paths.",
    },
    31: {
      10: "Who can find a virtuous woman? for her price is far above rubies.",
      30: "Favour is deceitful, and beauty is vain: but a woman that feareth the LORD, she shall be praised.",
    },
  },

  // ───────────────────────────────────────────
  //  ECCLESIASTES
  // ───────────────────────────────────────────
  "ecc": {
    1: {
      1: "The words of the Preacher, the son of David, king in Jerusalem.",
      2: "Vanity of vanities, saith the Preacher, vanity of vanities; all is vanity.",
    },
    3: {
      1: "To every thing there is a season, and a time to every purpose under the heaven:",
      2: "A time to be born, and a time to die; a time to plant, and a time to pluck up that which is planted;",
      3: "A time to kill, and a time to heal; a time to break down, and a time to build up;",
      4: "A time to weep, and a time to laugh; a time to mourn, and a time to dance;",
    },
    12: {
      13: "Let us hear the conclusion of the whole matter: Fear God, and keep his commandments: for this is the whole duty of man.",
      14: "For God shall bring every work into judgment, with every secret thing, whether it be good, or whether it be evil.",
    },
  },

  // ───────────────────────────────────────────
  //  SONG OF SOLOMON
  // ───────────────────────────────────────────
  "sng": {
    1: {
      1: "The song of songs, which is Solomon's.",
      2: "Let him kiss me with the kisses of his mouth: for thy love is better than wine.",
    },
    8: {
      6: "Set me as a seal upon thine heart, as a seal upon thine arm: for love is strong as death; jealousy is cruel as the grave: the coals thereof are coals of fire, which hath a most vehement flame.",
      7: "Many waters cannot quench love, neither can the floods drown it: if a man would give all the substance of his house for love, it would utterly be contemned.",
    },
  },

  // ───────────────────────────────────────────
  //  ISAIAH
  // ───────────────────────────────────────────
  "isa": {
    1: {
      1: "The vision of Isaiah the son of Amoz, which he saw concerning Judah and Jerusalem in the days of Uzziah, Jotham, Ahaz, and Hezekiah, kings of Judah.",
      18: "Come now, and let us reason together, saith the LORD: though your sins be as scarlet, they shall be as white as snow; though they be red like crimson, they shall be as wool.",
    },
    40: {
      1: "Comfort ye, comfort ye my people, saith your God.",
      2: "Speak ye comfortably to Jerusalem, and cry unto her, that her warfare is accomplished, that her iniquity is pardoned: for she hath received of the LORD's hand double for all her sins.",
      3: "The voice of him that crieth in the wilderness, Prepare ye the way of the LORD, make straight in the desert a highway for our God.",
      4: "Every valley shall be exalted, and every mountain and hill shall be made low: and the crooked shall be made straight, and the rough places plain:",
      5: "And the glory of the LORD shall be revealed, and all flesh shall see it together: for the mouth of the LORD hath spoken it.",
      28: "Hast thou not known? hast thou not heard, that the everlasting God, the LORD, the Creator of the ends of the earth, fainteth not, neither is weary? there is no searching of his understanding.",
      29: "He giveth power to the faint; and to them that have no might he increaseth strength.",
      30: "Even the youths shall faint and be weary, and the young men shall utterly fall:",
      31: "But they that wait upon the LORD shall renew their strength; they shall mount up with wings as eagles; they shall run, and not be weary; and they shall walk, and not faint.",
    },
    53: {
      3: "He is despised and rejected of men; a man of sorrows, and acquainted with grief: and we hid as it were our faces from him; he was despised, and we esteemed him not.",
      4: "Surely he hath borne our griefs, and carried our sorrows: yet we did esteem him stricken, smitten of God, and afflicted.",
      5: "But he was wounded for our transgressions, he was bruised for our iniquities: the chastisement of our peace was upon him; and with his stripes we are healed.",
      6: "All we like sheep have gone astray; we have turned every one to his own way; and the LORD hath laid on him the iniquity of us all.",
      7: "He was oppressed, and he was afflicted, yet he opened not his mouth: he is brought as a lamb to the slaughter, and as a sheep before her shearers is dumb, so he openeth not his mouth.",
      9: "And he made his grave with the wicked, and with the rich in his death; because he had done no violence, neither was any deceit in his mouth.",
      11: "He shall see of the travail of his soul, and shall be satisfied: by his knowledge shall my righteous servant justify many; for he shall bear their iniquities.",
    },
    55: {
      8: "For my thoughts are not your thoughts, neither are your ways my ways, saith the LORD.",
      9: "For as the heavens are higher than the earth, so are my ways higher than your ways, and my thoughts than your thoughts.",
    },
  },

  // ───────────────────────────────────────────
  //  JEREMIAH
  // ───────────────────────────────────────────
  "jer": {
    1: {
      1: "The words of Jeremiah the son of Hilkiah, of the priests that were in Anathoth in the land of Benjamin:",
      5: "Before I formed thee in the belly I knew thee; and before thou camest forth out of the womb I sanctified thee, and I ordained thee a prophet unto the nations.",
    },
    29: {
      11: "For I know the thoughts that I think toward you, saith the LORD, thoughts of peace, and not of evil, to give you an expected end.",
      12: "Then shall ye call upon me, and ye shall go and pray unto me, and I will hearken unto you.",
      13: "And ye shall seek me, and find me, when ye shall search for me with all your heart.",
    },
  },

  // ───────────────────────────────────────────
  //  LAMENTATIONS
  // ───────────────────────────────────────────
  "lam": {
    1: {
      1: "How doth the city sit solitary, that was full of people! how is she become as a widow! she that was great among the nations, and princess among the provinces, how is she become tributary!",
    },
    3: {
      22: "It is of the LORD's mercies that we are not consumed, because his compassions fail not.",
      23: "They are new every morning: great is thy faithfulness.",
      24: "The LORD is my portion, saith my soul; therefore will I hope in him.",
    },
  },

  // ───────────────────────────────────────────
  //  EZEKIEL
  // ───────────────────────────────────────────
  "eze": {
    1: {
      1: "Now it came to pass in the thirtieth year, in the fourth month, in the fifth day of the month, as I was among the captives by the river of Chebar, that the heavens were opened, and I saw visions of God.",
    },
    37: {
      1: "The hand of the LORD was upon me, and carried me out in the spirit of the LORD, and set me down in the midst of the valley which was full of bones,",
      3: "And he said unto me, Son of man, can these bones live? And I answered, O Lord GOD, thou knowest.",
      4: "Again he said unto me, Prophesy upon these bones, and say unto them, O ye dry bones, hear the word of the LORD.",
      10: "So I prophesied as he commanded me, and the breath came into them, and they lived, and stood up upon their feet, an exceeding great army.",
      14: "And shall put my spirit in you, and ye shall live, and I shall place you in your own land: then shall ye know that I the LORD have spoken it, and performed it, saith the LORD.",
    },
  },

  // ───────────────────────────────────────────
  //  DANIEL
  // ───────────────────────────────────────────
  "dan": {
    1: {
      1: "In the third year of the reign of Jehoiakim king of Judah came Nebuchadnezzar king of Babylon unto Jerusalem, and besieged it.",
      8: "But Daniel purposed in his heart that he would not defile himself with the portion of the king's meat, nor with the wine which he drank: therefore he requested of the prince of the eunuchs that he might not defile himself.",
    },
    3: {
      17: "If it be so, our God whom we serve is able to deliver us from the burning fiery furnace, and he will deliver us out of thine hand, O king.",
      18: "But if not, be it known unto thee, O king, that we will not serve thy gods, nor worship the golden image which thou hast set up.",
    },
    6: {
      10: "Now when Daniel knew that the writing was signed, he went into his house; and his windows being open in his chamber toward Jerusalem, he kneeled upon his knees three times a day, and prayed, and gave thanks before his God, as he did aforetime.",
      22: "My God hath sent his angel, and hath shut the lions' mouths, that they have not hurt me: forasmuch as before him innocency was found in me; and also before thee, O king, have I done no hurt.",
    },
  },

  // ───────────────────────────────────────────
  //  HOSEA
  // ───────────────────────────────────────────
  "hos": {
    1: {
      1: "The word of the LORD that came unto Hosea, the son of Beeri, in the days of Uzziah, Jotham, Ahaz, and Hezekiah, kings of Judah, and in the days of Jeroboam the son of Joash, king of Israel.",
    },
    6: {
      6: "For I desired mercy, and not sacrifice; and the knowledge of God more than burnt offerings.",
    },
  },

  // ───────────────────────────────────────────
  //  JOEL
  // ───────────────────────────────────────────
  "joe": {
    1: {
      1: "The word of the LORD that came to Joel the son of Pethuel.",
    },
    2: {
      28: "And it shall come to pass afterward, that I will pour out my spirit upon all flesh; and your sons and your daughters shall prophesy, your old men shall dream dreams, your young men shall see visions:",
      32: "And it shall come to pass, that whosoever shall call on the name of the LORD shall be delivered: for in mount Zion and in Jerusalem shall be deliverance, as the LORD hath said, and in the remnant whom the LORD shall call.",
    },
  },

  // ───────────────────────────────────────────
  //  AMOS
  // ───────────────────────────────────────────
  "amo": {
    1: {
      1: "The words of Amos, who was among the herdmen of Tekoa, which he saw concerning Israel in the days of Uzziah king of Judah, and in the days of Jeroboam the son of Joash king of Israel, two years before the earthquake.",
    },
    5: {
      24: "But let judgment run down as waters, and righteousness as a mighty stream.",
    },
  },

  // ───────────────────────────────────────────
  //  OBADIAH
  // ───────────────────────────────────────────
  "oba": {
    1: {
      1: "The vision of Obadiah. Thus saith the Lord GOD concerning Edom; We have heard a rumour from the LORD, and an ambassador is sent among the heathen, Arise ye, and let us rise up against her in battle.",
      3: "The pride of thine heart hath deceived thee, thou that dwellest in the clefts of the rock, whose habitation is high; that saith in his heart, Who shall bring me down to the ground?",
      4: "Though thou exalt thyself as the eagle, and though thou set thy nest among the stars, thence will I bring thee down, saith the LORD.",
      21: "And saviours shall come up on mount Zion to judge the mount of Esau; and the kingdom shall be the LORD's.",
    },
  },

  // ───────────────────────────────────────────
  //  JONAH
  // ───────────────────────────────────────────
  "jon": {
    1: {
      1: "Now the word of the LORD came unto Jonah the son of Amittai, saying,",
      2: "Arise, go to Nineveh, that great city, and cry against it; for their wickedness is come up before me.",
      3: "But Jonah rose up to flee unto Tarshish from the presence of the LORD, and went down to Joppa; and he found a ship going to Tarshish: so he paid the fare thereof, and went down into it, to go with them unto Tarshish from the presence of the LORD.",
      15: "So they took up Jonah, and cast him forth into the sea: and the sea ceased from her raging.",
      17: "Now the LORD had prepared a great fish to swallow up Jonah. And Jonah was in the belly of the fish three days and three nights.",
    },
    2: {
      1: "Then Jonah prayed unto the LORD his God out of the fish's belly,",
      2: "And said, I cried by reason of mine affliction unto the LORD, and he heard me; out of the belly of hell cried I, and thou heardest my voice.",
      10: "And the LORD spake unto the fish, and it vomited out Jonah upon the dry land.",
    },
    3: {
      1: "And the word of the LORD came unto Jonah the second time, saying,",
      2: "Arise, go unto Nineveh, that great city, and preach unto it the preaching that I bid thee.",
      3: "So Jonah arose, and went unto Nineveh, according to the word of the LORD. Now Nineveh was an exceeding great city of three days' journey.",
      4: "And Jonah began to enter into the city a day's journey, and he cried, and said, Yet forty days, and Nineveh shall be overthrown.",
      5: "So the people of Nineveh believed God, and proclaimed a fast, and put on sackcloth, from the greatest of them even to the least of them.",
      10: "And God saw their works, that they turned from their evil way; and God repented of the evil, that he had said that he would do unto them; and he did it not.",
    },
    4: {
      1: "But it displeased Jonah exceedingly, and he was very angry.",
      2: "And he prayed unto the LORD, and said, I pray thee, O LORD, was not this my saying, when I was yet in my country? Therefore I fled before unto Tarshish: for I knew that thou art a gracious God, and merciful, slow to anger, and of great kindness, and repentest thee of the evil.",
      11: "And should not I spare Nineveh, that great city, wherein are more than sixscore thousand persons that cannot discern between their right hand and their left hand; and also much cattle?",
    },
  },

  // ───────────────────────────────────────────
  //  MICAH
  // ───────────────────────────────────────────
  "mic": {
    1: {
      1: "The word of the LORD that came to Micah the Morasthite in the days of Jotham, Ahaz, and Hezekiah, kings of Judah, which he saw concerning Samaria and Jerusalem.",
    },
    5: {
      2: "But thou, Bethlehem Ephratah, though thou be little among the thousands of Judah, yet out of thee shall he come forth unto me that is to be ruler in Israel; whose goings forth have been from of old, from everlasting.",
    },
    6: {
      8: "He hath shewed thee, O man, what is good; and what doth the LORD require of thee, but to do justly, and to love mercy, and to walk humbly with thy God?",
    },
  },

  // ───────────────────────────────────────────
  //  NAHUM
  // ───────────────────────────────────────────
  "nah": {
    1: {
      1: "The burden of Nineveh. The book of the vision of Nahum the Elkoshite.",
      7: "The LORD is good, a strong hold in the day of trouble; and he knoweth them that trust in him.",
    },
  },

  // ───────────────────────────────────────────
  //  HABAKKUK
  // ───────────────────────────────────────────
  "hab": {
    1: {
      1: "The burden which Habakkuk the prophet did see.",
    },
    2: {
      4: "Behold, his soul which is lifted up is not upright in him: but the just shall live by his faith.",
    },
    3: {
      17: "Although the fig tree shall not blossom, neither shall fruit be in the vines; the labour of the olive shall fail, and the fields shall yield no meat; the flock shall be cut off from the fold, and there shall be no herd in the stalls:",
      18: "Yet I will rejoice in the LORD, I will joy in the God of my salvation.",
      19: "The LORD God is my strength, and he will make my feet like hinds' feet, and he will make me to walk upon mine high places.",
    },
  },

  // ───────────────────────────────────────────
  //  ZEPHANIAH
  // ───────────────────────────────────────────
  "zep": {
    1: {
      1: "The word of the LORD which came unto Zephaniah the son of Cushi, the son of Gedaliah, the son of Amariah, the son of Hizkiah, in the days of Josiah the son of Amon, king of Judah.",
    },
    3: {
      17: "The LORD thy God in the midst of thee is mighty; he will save, he will rejoice over thee with joy; he will rest in his love, he will joy over thee with singing.",
    },
  },

  // ───────────────────────────────────────────
  //  HAGGAI
  // ───────────────────────────────────────────
  "hag": {
    1: {
      1: "In the second year of Darius the king, in the sixth month, in the first day of the month, came the word of the LORD by Haggai the prophet unto Zerubbabel the son of Shealtiel, governor of Judah, and to Joshua the son of Josedech, the high priest, saying,",
    },
    2: {
      9: "The glory of this latter house shall be greater than of the former, saith the LORD of hosts: and in this place will I give peace, saith the LORD of hosts.",
    },
  },

  // ───────────────────────────────────────────
  //  ZECHARIAH
  // ───────────────────────────────────────────
  "zec": {
    1: {
      1: "In the eighth month, in the second year of Darius, came the word of the LORD unto Zechariah, the son of Berechiah, the son of Iddo the prophet, saying,",
    },
    9: {
      9: "Rejoice greatly, O daughter of Zion; shout, O daughter of Jerusalem: behold, thy King cometh unto thee: he is just, and having salvation; lowly, and riding upon an ass, and upon a colt the foal of an ass.",
    },
  },

  // ───────────────────────────────────────────
  //  MALACHI
  // ───────────────────────────────────────────
  "mal": {
    1: {
      1: "The burden of the word of the LORD to Israel by Malachi.",
    },
    3: {
      10: "Bring ye all the tithes into the storehouse, that there may be meat in mine house, and prove me now herewith, saith the LORD of hosts, if I will not open you the windows of heaven, and pour you out a blessing, that there shall not be room enough to receive it.",
    },
    4: {
      2: "But unto you that fear my name shall the Sun of righteousness arise with healing in his wings; and ye shall go forth, and grow up as calves of the stall.",
    },
  },

  // ═══════════════════════════════════════════
  //  NEW TESTAMENT
  // ═══════════════════════════════════════════

  // ───────────────────────────────────────────
  //  MATTHEW
  // ───────────────────────────────────────────
  "mat": {
    1: {
      1: "The book of the generation of Jesus Christ, the son of David, the son of Abraham.",
      18: "Now the birth of Jesus Christ was on this wise: When as his mother Mary was espoused to Joseph, before they came together, she was found with child of the Holy Ghost.",
      19: "Then Joseph her husband, being a just man, and not willing to make her a publick example, was minded to put her away privily.",
      20: "But while he thought on these things, behold, the angel of the Lord appeared unto him in a dream, saying, Joseph, thou son of David, fear not to take unto thee Mary thy wife: for that which is conceived in her is of the Holy Ghost.",
      21: "And she shall bring forth a son, and thou shalt call his name JESUS: for he shall save his people from their sins.",
      23: "Behold, a virgin shall be with child, and shall bring forth a son, and they shall call his name Emmanuel, which being interpreted is, God with us.",
    },
    5: {
      1: "And seeing the multitudes, he went up into a mountain: and when he was set, his disciples came unto him:",
      2: "And he opened his mouth, and taught them, saying,",
      3: "Blessed are the poor in spirit: for theirs is the kingdom of heaven.",
      4: "Blessed are they that mourn: for they shall be comforted.",
      5: "Blessed are the meek: for they shall inherit the earth.",
      6: "Blessed are they which do hunger and thirst after righteousness: for they shall be filled.",
      7: "Blessed are the merciful: for they shall obtain mercy.",
      8: "Blessed are the pure in heart: for they shall see God.",
      9: "Blessed are the peacemakers: for they shall be called the children of God.",
      10: "Blessed are they which are persecuted for righteousness' sake: for theirs is the kingdom of heaven.",
      11: "Blessed are ye, when men shall revile you, and persecute you, and shall say all manner of evil against you falsely, for my sake.",
      12: "Rejoice, and be exceeding glad: for great is your reward in heaven: for so persecuted they the prophets which were before you.",
      13: "Ye are the salt of the earth: but if the salt have lost his savour, wherewith shall it be salted? it is thenceforth good for nothing, but to be cast out, and to be trodden under foot of men.",
      14: "Ye are the light of the world. A city that is set on an hill cannot be hid.",
      16: "Let your light so shine before men, that they may see your good works, and glorify your Father which is in heaven.",
      44: "But I say unto you, Love your enemies, bless them that curse you, do good to them that hate you, and pray for them which despitefully use you, and persecute you;",
      45: "That ye may be the children of your Father which is in heaven: for he maketh his sun to rise on the evil and on the good, and sendeth rain on the just and on the unjust.",
      48: "Be ye therefore perfect, even as your Father which is in heaven is perfect.",
    },
    6: {
      9: "After this manner therefore pray ye: Our Father which art in heaven, Hallowed be thy name.",
      10: "Thy kingdom come. Thy will be done in earth, as it is in heaven.",
      11: "Give us this day our daily bread.",
      12: "And forgive us our debts, as we forgive our debtors.",
      13: "And lead us not into temptation, but deliver us from evil: For thine is the kingdom, and the power, and the glory, for ever. Amen.",
      19: "Lay not up for yourselves treasures upon earth, where moth and rust doth corrupt, and where thieves break through and steal:",
      20: "But lay up for yourselves treasures in heaven, where neither moth nor rust doth corrupt, and where thieves do not break through nor steal:",
      21: "For where your treasure is, there will your heart be also.",
      24: "No man can serve two masters: for either he will hate the one, and love the other; or else he will hold to the one, and despise the other. Ye cannot serve God and mammon.",
      25: "Therefore I say unto you, Take no thought for your life, what ye shall eat, or what ye shall drink; nor yet for your body, what ye shall put on. Is not the life more than meat, and the body than raiment?",
      26: "Behold the fowls of the air: for they sow not, neither do they reap, nor gather into barns; yet your heavenly Father feedeth them. Are ye not much better than they?",
      33: "But seek ye first the kingdom of God, and his righteousness; and all these things shall be added unto you.",
      34: "Take therefore no thought for the morrow: for the morrow shall take thought for the things of itself. Sufficient unto the day is the evil thereof.",
    },
    7: {
      7: "Ask, and it shall be given you; seek, and ye shall find; knock, and it shall be opened unto you:",
      8: "For every one that asketh receiveth; and he that seeketh findeth; and to him that knocketh it shall be opened.",
      12: "Therefore all things whatsoever ye would that men should do to you, do ye even so to them: for this is the law and the prophets.",
      13: "Enter ye in at the strait gate: for wide is the gate, and broad is the way, that leadeth to destruction, and many there be which go in thereat:",
      14: "Because strait is the gate, and narrow is the way, which leadeth unto life, and few there be that find it.",
      24: "Therefore whosoever heareth these sayings of mine, and doeth them, I will liken him unto a wise man, which built his house upon a rock:",
      25: "And the rain descended, and the floods came, and the winds blew, and beat upon that house; and it fell not: for it was founded upon a rock.",
      26: "And every one that heareth these sayings of mine, and doeth them not, shall be likened unto a foolish man, which built his house upon the sand:",
      27: "And the rain descended, and the floods came, and the winds blew, and beat upon that house; and it fell: and great was the fall of it.",
    },
    22: {
      37: "Jesus said unto him, Thou shalt love the Lord thy God with all thy heart, and with all thy soul, and with all thy mind.",
      38: "This is the first and great commandment.",
      39: "And the second is like unto it, Thou shalt love thy neighbour as thyself.",
      40: "On these two commandments hang all the law and the prophets.",
    },
    28: {
      18: "And Jesus came and spake unto them, saying, All power is given unto me in heaven and in earth.",
      19: "Go ye therefore, and teach all nations, baptizing them in the name of the Father, and of the Son, and of the Holy Ghost:",
      20: "Teaching them to observe all things whatsoever I have commanded you: and, lo, I am with you alway, even unto the end of the world. Amen.",
    },
  },

  // ───────────────────────────────────────────
  //  MARK
  // ───────────────────────────────────────────
  "mar": {
    1: {
      1: "The beginning of the gospel of Jesus Christ, the Son of God;",
      3: "The voice of one crying in the wilderness, Prepare ye the way of the Lord, make his paths straight.",
      14: "Now after that John was put in prison, Jesus came into Galilee, preaching the gospel of the kingdom of God,",
      15: "And saying, The time is fulfilled, and the kingdom of God is at hand: repent ye, and believe the gospel.",
      17: "And Jesus said unto them, Come ye after me, and I will make you to become fishers of men.",
    },
    10: {
      14: "But when Jesus saw it, he was much displeased, and said unto them, Suffer the little children to come unto me, and forbid them not: for of such is the kingdom of God.",
      45: "For even the Son of man came not to be ministered unto, but to minister, and to give his life a ransom for many.",
    },
    16: {
      15: "And he said unto them, Go ye into all the world, and preach the gospel to every creature.",
      16: "He that believeth and is baptized shall be saved; but he that believeth not shall be damned.",
    },
  },

  // ───────────────────────────────────────────
  //  LUKE
  // ───────────────────────────────────────────
  "luk": {
    1: {
      1: "Forasmuch as many have taken in hand to set forth in order a declaration of those things which are most surely believed among us,",
      26: "And in the sixth month the angel Gabriel was sent from God unto a city of Galilee, named Nazareth,",
      28: "And the angel came in unto her, and said, Hail, thou that art highly favoured, the Lord is with thee: blessed art thou among women.",
      30: "And the angel said unto her, Fear not, Mary: for thou hast found favour with God.",
      31: "And, behold, thou shalt conceive in thy womb, and bring forth a son, and shalt call his name JESUS.",
      32: "He shall be great, and shall be called the Son of the Highest: and the Lord God shall give unto him the throne of his father David:",
      37: "For with God nothing shall be impossible.",
      46: "And Mary said, My soul doth magnify the Lord,",
      47: "And my spirit hath rejoiced in God my Saviour.",
    },
    2: {
      1: "And it came to pass in those days, that there went out a decree from Caesar Augustus, that all the world should be taxed.",
      4: "And Joseph also went up from Galilee, out of the city of Nazareth, into Judaea, unto the city of David, which is called Bethlehem; (because he was of the house and lineage of David:)",
      6: "And so it was, that, while they were there, the days were accomplished that she should be delivered.",
      7: "And she brought forth her firstborn son, and wrapped him in swaddling clothes, and laid him in a manger; because there was no room for them in the inn.",
      8: "And there were in the same country shepherds abiding in the field, keeping watch over their flock by night.",
      9: "And, lo, the angel of the Lord came upon them, and the glory of the Lord shone round about them: and they were sore afraid.",
      10: "And the angel said unto them, Fear not: for, behold, I bring you good tidings of great joy, which shall be to all people.",
      11: "For unto you is born this day in the city of David a Saviour, which is Christ the Lord.",
      12: "And this shall be a sign unto you; Ye shall find the babe wrapped in swaddling clothes, lying in a manger.",
      13: "And suddenly there was with the angel a multitude of the heavenly host praising God, and saying,",
      14: "Glory to God in the highest, and on earth peace, good will toward men.",
      15: "And it came to pass, as the angels were gone away from them into heaven, the shepherds said one to another, Let us now go even unto Bethlehem, and see this thing which is come to pass, which the Lord hath made known unto us.",
      17: "And when they had seen it, they made known abroad the saying which was told them concerning this child.",
      19: "But Mary kept all these things, and pondered them in her heart.",
      20: "And the shepherds returned, glorifying and praising God for all the things that they had heard and seen, as it was told unto them.",
      52: "And Jesus increased in wisdom and stature, and in favour with God and man.",
    },
    15: {
      1: "Then drew near unto him all the publicans and sinners for to hear him.",
      2: "And the Pharisees and scribes murmured, saying, This man receiveth sinners, and eateth with them.",
      3: "And he spake this parable unto them, saying,",
      4: "What man of you, having an hundred sheep, if he lose one of them, doth not leave the ninety and nine in the wilderness, and go after that which is lost, until he find it?",
      5: "And when he hath found it, he layeth it on his shoulders, rejoicing.",
      6: "And when he cometh home, he calleth together his friends and neighbours, saying unto them, Rejoice with me; for I have found my sheep which was lost.",
      7: "I say unto you, that likewise joy shall be in heaven over one sinner that repenteth, more than over ninety and nine just persons, which need no repentance.",
      11: "And he said, A certain man had two sons:",
      12: "And the younger of them said to his father, Father, give me the portion of goods that falleth to me. And he divided unto them his living.",
      13: "And not many days after the younger son gathered all together, and took his journey into a far country, and there wasted his substance with riotous living.",
      14: "And when he had spent all, there arose a mighty famine in that land; and he began to be in want.",
      17: "And when he came to himself, he said, How many hired servants of my father's have bread enough and to spare, and I perish with hunger!",
      18: "I will arise and go to my father, and will say unto him, Father, I have sinned against heaven, and before thee,",
      19: "And am no more worthy to be called thy son: make me as one of thy hired servants.",
      20: "And he arose, and came to his father. But when he was yet a great way off, his father saw him, and had compassion, and ran, and fell on his neck, and kissed him.",
      22: "But the father said to his servants, Bring forth the best robe, and put it on him; and put a ring on his hand, and shoes on his feet:",
      23: "And bring hither the fatted calf, and kill it; and let us eat, and be merry:",
      24: "For this my son was dead, and is alive again; he was lost, and is found. And they began to be merry.",
      31: "And he said unto him, Son, thou art ever with me, and all that I have is thine.",
      32: "It was meet that we should make merry, and be glad: for this thy brother was dead, and is alive again; and was lost, and is found.",
    },
    24: {
      6: "He is not here, but is risen: remember how he spake unto you when he was yet in Galilee,",
      34: "Saying, The Lord is risen indeed, and hath appeared to Simon.",
    },
  },

  // ───────────────────────────────────────────
  //  JOHN  (additional chapters — 1 and 3 already in bibleText.ts)
  // ───────────────────────────────────────────
  "joh": {
    11: {
      25: "Jesus said unto her, I am the resurrection, and the life: he that believeth in me, though he were dead, yet shall he live:",
      26: "And whosoever liveth and believeth in me shall never die. Believest thou this?",
      35: "Jesus wept.",
    },
    14: {
      1: "Let not your heart be troubled: ye believe in God, believe also in me.",
      2: "In my Father's house are many mansions: if it were not so, I would have told you. I go to prepare a place for you.",
      3: "And if I go and prepare a place for you, I will come again, and receive you unto myself; that where I am, there ye may be also.",
      6: "Jesus saith unto him, I am the way, the truth, and the life: no man cometh unto the Father, but by me.",
      16: "And I will pray the Father, and he shall give you another Comforter, that he may abide with you for ever;",
      27: "Peace I leave with you, my peace I give unto you: not as the world giveth, give I unto you. Let not your heart be troubled, neither let it be afraid.",
    },
    15: {
      1: "I am the true vine, and my Father is the husbandman.",
      4: "Abide in me, and I in you. As the branch cannot bear fruit of itself, except it abide in the vine; no more can ye, except ye abide in me.",
      5: "I am the vine, ye are the branches: He that abideth in me, and I in him, the same bringeth forth much fruit: for without me ye can do nothing.",
      13: "Greater love hath no man than this, that a man lay down his life for his friends.",
    },
    17: {
      3: "And this is life eternal, that they might know thee the only true God, and Jesus Christ, whom thou hast sent.",
      17: "Sanctify them through thy truth: thy word is truth.",
    },
    20: {
      19: "Then the same day at evening, being the first day of the week, when the doors were shut where the disciples were assembled for fear of the Jews, came Jesus and stood in the midst, and saith unto them, Peace be unto you.",
      27: "Then saith he to Thomas, Reach hither thy finger, and behold my hands; and reach hither thy hand, and thrust it into my side: and be not faithless, but believing.",
      28: "And Thomas answered and said unto him, My Lord and my God.",
      29: "Jesus saith unto him, Thomas, because thou hast seen me, thou hast believed: blessed are they that have not seen, and yet have believed.",
      31: "But these are written, that ye might believe that Jesus is the Christ, the Son of God; and that believing ye might have life through his name.",
    },
    21: {
      25: "And there are also many other things which Jesus did, the which, if they should be written every one, I suppose that even the world itself could not contain the books that should be written. Amen.",
    },
  },

  // ───────────────────────────────────────────
  //  ACTS
  // ───────────────────────────────────────────
  "act": {
    1: {
      1: "The former treatise have I made, O Theophilus, of all that Jesus began both to do and teach,",
      8: "But ye shall receive power, after that the Holy Ghost is come upon you: and ye shall be witnesses unto me both in Jerusalem, and in all Judaea, and in Samaria, and unto the uttermost part of the earth.",
      9: "And when he had spoken these things, while they beheld, he was taken up; and a cloud received him out of their sight.",
      11: "Which also said, Ye men of Galilee, why stand ye gazing up into heaven? this same Jesus, which is taken up from you into heaven, shall so come in like manner as ye have seen him go into heaven.",
    },
    2: {
      1: "And when the day of Pentecost was fully come, they were all with one accord in one place.",
      2: "And suddenly there came a sound from heaven as of a rushing mighty wind, and it filled all the house where they were sitting.",
      3: "And there appeared unto them cloven tongues like as of fire, and it sat upon each of them.",
      4: "And they were all filled with the Holy Ghost, and began to speak with other tongues, as the Spirit gave them utterance.",
      17: "And it shall come to pass in the last days, saith God, I will pour out of my Spirit upon all flesh: and your sons and your daughters shall prophesy, and your young men shall see visions, and your old men shall dream dreams:",
      21: "And it shall come to pass, that whosoever shall call on the name of the Lord shall be saved.",
      38: "Then Peter said unto them, Repent, and be baptized every one of you in the name of Jesus Christ for the remission of sins, and ye shall receive the gift of the Holy Ghost.",
      42: "And they continued stedfastly in the apostles' doctrine and fellowship, and in breaking of bread, and in prayers.",
      44: "And all that believed were together, and had all things common;",
      47: "Praising God, and having favour with all the people. And the Lord added to the church daily such as should be saved.",
    },
    4: {
      12: "Neither is there salvation in any other: for there is none other name under heaven given among men, whereby we must be saved.",
    },
  },

  // ───────────────────────────────────────────
  //  ROMANS  (additional chapters — ch 8 already in bibleText.ts)
  // ───────────────────────────────────────────
  "rom": {
    1: {
      16: "For I am not ashamed of the gospel of Christ: for it is the power of God unto salvation to every one that believeth; to the Jew first, and also to the Greek.",
      17: "For therein is the righteousness of God revealed from faith to faith: as it is written, The just shall live by faith.",
    },
    3: {
      10: "As it is written, There is none righteous, no, not one:",
      23: "For all have sinned, and come short of the glory of God;",
      24: "Being justified freely by his grace through the redemption that is in Christ Jesus:",
      28: "Therefore we conclude that a man is justified by faith without the deeds of the law.",
    },
    5: {
      1: "Therefore being justified by faith, we have peace with God through our Lord Jesus Christ:",
      2: "By whom also we have access by faith into this grace wherein we stand, and rejoice in hope of the glory of God.",
      3: "And not only so, but we glory in tribulations also: knowing that tribulation worketh patience;",
      4: "And patience, experience; and experience, hope:",
      5: "And hope maketh not ashamed; because the love of God is shed abroad in our hearts by the Holy Ghost which is given unto us.",
      8: "But God commendeth his love toward us, in that, while we were yet sinners, Christ died for us.",
    },
    6: {
      23: "For the wages of sin is death; but the gift of God is eternal life through Jesus Christ our Lord.",
    },
    10: {
      9: "That if thou shalt confess with thy mouth the Lord Jesus, and shalt believe in thine heart that God hath raised him from the dead, thou shalt be saved.",
      10: "For with the heart man believeth unto righteousness; and with the mouth confession is made unto salvation.",
      13: "For whosoever shall call upon the name of the Lord shall be saved.",
    },
    12: {
      1: "I beseech you therefore, brethren, by the mercies of God, that ye present your bodies a living sacrifice, holy, acceptable unto God, which is your reasonable service.",
      2: "And be not conformed to this world: but be ye transformed by the renewing of your mind, that ye may prove what is that good, and acceptable, and perfect, will of God.",
      9: "Let love be without dissimulation. Abhor that which is evil; cleave to that which is good.",
      10: "Be kindly affectioned one to another with brotherly love; in honour preferring one another;",
      12: "Rejoicing in hope; patient in tribulation; continuing instant in prayer;",
      21: "Be not overcome of evil, but overcome evil with good.",
    },
  },

  // ───────────────────────────────────────────
  //  1 CORINTHIANS
  // ───────────────────────────────────────────
  "1co": {
    1: {
      1: "Paul, called to be an apostle of Jesus Christ through the will of God, and Sosthenes our brother,",
      18: "For the preaching of the cross is to them that perish foolishness; but unto us which are saved it is the power of God.",
    },
    13: {
      1: "Though I speak with the tongues of men and of angels, and have not charity, I am become as sounding brass, or a tinkling cymbal.",
      2: "And though I have the gift of prophecy, and understand all mysteries, and all knowledge; and though I have all faith, so that I could remove mountains, and have not charity, I am nothing.",
      3: "And though I bestow all my goods to feed the poor, and though I give my body to be burned, and have not charity, it profiteth me nothing.",
      4: "Charity suffereth long, and is kind; charity envieth not; charity vaunteth not itself, is not puffed up,",
      5: "Doth not behave itself unseemly, seeketh not her own, is not easily provoked, thinketh no evil;",
      6: "Rejoiceth not in iniquity, but rejoiceth in the truth;",
      7: "Beareth all things, believeth all things, hopeth all things, endureth all things.",
      8: "Charity never faileth: but whether there be prophecies, they shall fail; whether there be tongues, they shall cease; whether there be knowledge, it shall vanish away.",
      13: "And now abideth faith, hope, charity, these three; but the greatest of these is charity.",
    },
    15: {
      3: "For I delivered unto you first of all that which I also received, how that Christ died for our sins according to the scriptures;",
      4: "And that he was buried, and that he rose again the third day according to the scriptures:",
      20: "But now is Christ risen from the dead, and become the firstfruits of them that slept.",
      55: "O death, where is thy sting? O grave, where is thy victory?",
      56: "The sting of death is sin; and the strength of sin is the law.",
      57: "But thanks be to God, which giveth us the victory through our Lord Jesus Christ.",
      58: "Therefore, my beloved brethren, be ye stedfast, unmoveable, always abounding in the work of the Lord, forasmuch as ye know that your labour is not in vain in the Lord.",
    },
  },

  // ───────────────────────────────────────────
  //  2 CORINTHIANS
  // ───────────────────────────────────────────
  "2co": {
    1: {
      1: "Paul, an apostle of Jesus Christ by the will of God, and Timothy our brother, unto the church of God which is at Corinth, with all the saints which are in all Achaia:",
    },
    5: {
      17: "Therefore if any man be in Christ, he is a new creature: old things are passed away; behold, all things are become new.",
    },
    12: {
      9: "And he said unto me, My grace is sufficient for thee: for my strength is made perfect in weakness. Most gladly therefore will I rather glory in my infirmities, that the power of Christ may rest upon me.",
    },
  },

  // ───────────────────────────────────────────
  //  GALATIANS
  // ───────────────────────────────────────────
  "gal": {
    1: {
      1: "Paul, an apostle, (not of men, neither by man, but by Jesus Christ, and God the Father, who raised him from the dead;)",
    },
    5: {
      22: "But the fruit of the Spirit is love, joy, peace, longsuffering, gentleness, goodness, faith,",
      23: "Meekness, temperance: against such there is no law.",
    },
    6: {
      9: "And let us not be weary in well doing: for in due season we shall reap, if we faint not.",
    },
  },

  // ───────────────────────────────────────────
  //  EPHESIANS
  // ───────────────────────────────────────────
  "eph": {
    1: {
      1: "Paul, an apostle of Jesus Christ by the will of God, to the saints which are at Ephesus, and to the faithful in Christ Jesus:",
    },
    2: {
      8: "For by grace are ye saved through faith; and that not of yourselves: it is the gift of God:",
      9: "Not of works, lest any man should boast.",
      10: "For we are his workmanship, created in Christ Jesus unto good works, which God hath before ordained that we should walk in them.",
    },
    6: {
      10: "Finally, my brethren, be strong in the Lord, and in the power of his might.",
      11: "Put on the whole armour of God, that ye may be able to stand against the wiles of the devil.",
      12: "For we wrestle not against flesh and blood, but against principalities, against powers, against the rulers of the darkness of this world, against spiritual wickedness in high places.",
      13: "Wherefore take unto you the whole armour of God, that ye may be able to withstand in the evil day, and having done all, to stand.",
      14: "Stand therefore, having your loins girt about with truth, and having on the breastplate of righteousness;",
      15: "And your feet shod with the preparation of the gospel of peace;",
      16: "Above all, taking the shield of faith, wherewith ye shall be able to quench all the fiery darts of the wicked.",
      17: "And take the helmet of salvation, and the sword of the Spirit, which is the word of God:",
      18: "Praying always with all prayer and supplication in the Spirit, and watching thereunto with all perseverance and supplication for all saints;",
    },
  },

  // ───────────────────────────────────────────
  //  PHILIPPIANS
  // ───────────────────────────────────────────
  "phi": {
    1: {
      1: "Paul and Timotheus, the servants of Jesus Christ, to all the saints in Christ Jesus which are at Philippi, with the bishops and deacons:",
    },
    4: {
      4: "Rejoice in the Lord alway: and again I say, Rejoice.",
      5: "Let your moderation be known unto all men. The Lord is at hand.",
      6: "Be careful for nothing; but in every thing by prayer and supplication with thanksgiving let your requests be made known unto God.",
      7: "And the peace of God, which passeth all understanding, shall keep your hearts and minds through Christ Jesus.",
      8: "Finally, brethren, whatsoever things are true, whatsoever things are honest, whatsoever things are just, whatsoever things are pure, whatsoever things are lovely, whatsoever things are of good report; if there be any virtue, and if there be any praise, think on these things.",
      11: "Not that I speak in respect of want: for I have learned, in whatsoever state I am, therewith to be content.",
      13: "I can do all things through Christ which strengtheneth me.",
      19: "But my God shall supply all your need according to his riches in glory by Christ Jesus.",
    },
  },

  // ───────────────────────────────────────────
  //  COLOSSIANS
  // ───────────────────────────────────────────
  "col": {
    1: {
      1: "Paul, an apostle of Jesus Christ by the will of God, and Timotheus our brother,",
      16: "For by him were all things created, that are in heaven, and that are in earth, visible and invisible, whether they be thrones, or dominions, or principalities, or powers: all things were created by him, and for him:",
      17: "And he is before all things, and by him all things consist.",
    },
    3: {
      23: "And whatsoever ye do, do it heartily, as to the Lord, and not unto men;",
    },
  },

  // ───────────────────────────────────────────
  //  1 THESSALONIANS
  // ───────────────────────────────────────────
  "1th": {
    1: {
      1: "Paul, and Silvanus, and Timotheus, unto the church of the Thessalonians which is in God the Father and in the Lord Jesus Christ: Grace be unto you, and peace, from God our Father, and the Lord Jesus Christ.",
    },
    5: {
      16: "Rejoice evermore.",
      17: "Pray without ceasing.",
      18: "In every thing give thanks: for this is the will of God in Christ Jesus concerning you.",
    },
  },

  // ───────────────────────────────────────────
  //  2 THESSALONIANS
  // ───────────────────────────────────────────
  "2th": {
    1: {
      1: "Paul, and Silvanus, and Timotheus, unto the church of the Thessalonians in God our Father and the Lord Jesus Christ:",
    },
  },

  // ───────────────────────────────────────────
  //  1 TIMOTHY
  // ───────────────────────────────────────────
  "1ti": {
    1: {
      1: "Paul, an apostle of Jesus Christ by the commandment of God our Saviour, and Lord Jesus Christ, which is our hope;",
    },
    6: {
      6: "But godliness with contentment is great gain.",
      10: "For the love of money is the root of all evil: which while some coveted after, they have erred from the faith, and pierced themselves through with many sorrows.",
    },
  },

  // ───────────────────────────────────────────
  //  2 TIMOTHY
  // ───────────────────────────────────────────
  "2ti": {
    1: {
      1: "Paul, an apostle of Jesus Christ by the will of God, according to the promise of life which is in Christ Jesus,",
    },
    3: {
      16: "All scripture is given by inspiration of God, and is profitable for doctrine, for reproof, for correction, for instruction in righteousness:",
      17: "That the man of God may be perfect, throughly furnished unto all good works.",
    },
    4: {
      7: "I have fought a good fight, I have finished my course, I have kept the faith:",
    },
  },

  // ───────────────────────────────────────────
  //  TITUS
  // ───────────────────────────────────────────
  "tit": {
    1: {
      1: "Paul, a servant of God, and an apostle of Jesus Christ, according to the faith of God's elect, and the acknowledging of the truth which is after godliness;",
    },
    3: {
      5: "Not by works of righteousness which we have done, but according to his mercy he saved us, by the washing of regeneration, and renewing of the Holy Ghost;",
    },
  },

  // ───────────────────────────────────────────
  //  PHILEMON
  // ───────────────────────────────────────────
  "phm": {
    1: {
      1: "Paul, a prisoner of Jesus Christ, and Timothy our brother, unto Philemon our dearly beloved, and fellowlabourer,",
      15: "For perhaps he therefore departed for a season, that thou shouldest receive him for ever;",
      16: "Not now as a servant, but above a servant, a brother beloved, specially to me, but how much more unto thee, both in the flesh, and in the Lord?",
    },
  },

  // ───────────────────────────────────────────
  //  HEBREWS
  // ───────────────────────────────────────────
  "heb": {
    1: {
      1: "God, who at sundry times and in divers manners spake in time past unto the fathers by the prophets,",
      2: "Hath in these last days spoken unto us by his Son, whom he hath appointed heir of all things, by whom also he made the worlds;",
      3: "Who being the brightness of his glory, and the express image of his person, and upholding all things by the word of his power, when he had by himself purged our sins, sat down on the right hand of the Majesty on high;",
    },
    11: {
      1: "Now faith is the substance of things hoped for, the evidence of things not seen.",
      3: "Through faith we understand that the worlds were framed by the word of God, so that things which are seen were not made of things which do appear.",
      4: "By faith Abel offered unto God a more excellent sacrifice than Cain, by which he obtained witness that he was righteous, God testifying of his gifts: and by it he being dead yet speaketh.",
      5: "By faith Enoch was translated that he should not see death; and was not found, because God had translated him: for before his translation he had this testimony, that he pleased God.",
      6: "But without faith it is impossible to please him: for he that cometh to God must believe that he is, and that he is a rewarder of them that diligently seek him.",
      7: "By faith Noah, being warned of God of things not seen as yet, moved with fear, prepared an ark to the saving of his house; by the which he condemned the world, and became heir of the righteousness which is by faith.",
      8: "By faith Abraham, when he was called to go out into a place which he should after receive for an inheritance, obeyed; and he went out, not knowing whither he went.",
      11: "Through faith also Sara herself received strength to conceive seed, and was delivered of a child when she was past age, because she judged him faithful who had promised.",
      17: "By faith Abraham, when he was tried, offered up Isaac: and he that had received the promises offered up his only begotten son,",
      24: "By faith Moses, when he was come to years, refused to be called the son of Pharaoh's daughter;",
      32: "And what shall I more say? for the time would fail me to tell of Gedeon, and of Barak, and of Samson, and of Jephthae; of David also, and Samuel, and of the prophets:",
      33: "Who through faith subdued kingdoms, wrought righteousness, obtained promises, stopped the mouths of lions,",
      34: "Quenched the violence of fire, escaped the edge of the sword, out of weakness were made strong, waxed valiant in fight, turned to flight the armies of the aliens.",
      39: "And these all, having obtained a good report through faith, received not the promise:",
      40: "God having provided some better thing for us, that they without us should not be made perfect.",
    },
    13: {
      8: "Jesus Christ the same yesterday, and to day, and for ever.",
    },
  },

  // ───────────────────────────────────────────
  //  JAMES
  // ───────────────────────────────────────────
  "jam": {
    1: {
      1: "James, a servant of God and of the Lord Jesus Christ, to the twelve tribes which are scattered abroad, greeting.",
      2: "My brethren, count it all joy when ye fall into divers temptations;",
      3: "Knowing this, that the trying of your faith worketh patience.",
      5: "If any of you lack wisdom, let him ask of God, that giveth to all men liberally, and upbraideth not; and it shall be given him.",
      17: "Every good gift and every perfect gift is from above, and cometh down from the Father of lights, with whom is no variableness, neither shadow of turning.",
      22: "But be ye doers of the word, and not hearers only, deceiving your own selves.",
    },
    4: {
      14: "Whereas ye know not what shall be on the morrow. For what is your life? It is even a vapour, that appeareth for a little time, and then vanisheth away.",
    },
  },

  // ───────────────────────────────────────────
  //  1 PETER
  // ───────────────────────────────────────────
  "1pe": {
    1: {
      1: "Peter, an apostle of Jesus Christ, to the strangers scattered throughout Pontus, Galatia, Cappadocia, Asia, and Bithynia,",
      3: "Blessed be the God and Father of our Lord Jesus Christ, which according to his abundant mercy hath begotten us again unto a lively hope by the resurrection of Jesus Christ from the dead,",
    },
    5: {
      7: "Casting all your care upon him; for he careth for you.",
    },
  },

  // ───────────────────────────────────────────
  //  2 PETER
  // ───────────────────────────────────────────
  "2pe": {
    1: {
      1: "Simon Peter, a servant and an apostle of Jesus Christ, to them that have obtained like precious faith with us through the righteousness of God and our Saviour Jesus Christ:",
      21: "For the prophecy came not in old time by the will of man: but holy men of God spake as they were moved by the Holy Ghost.",
    },
    3: {
      9: "The Lord is not slack concerning his promise, as some men count slackness; but is longsuffering to us-ward, not willing that any should perish, but that all should come to repentance.",
    },
  },

  // ───────────────────────────────────────────
  //  1 JOHN  (additional — ch 1 and 3 have some content in bibleText.ts)
  // ───────────────────────────────────────────
  "1jo": {
    1: {
      9: "If we confess our sins, he is faithful and just to forgive us our sins, and to cleanse us from all unrighteousness.",
    },
    4: {
      7: "Beloved, let us love one another: for love is of God; and every one that loveth is born of God, and knoweth God.",
      8: "He that loveth not knoweth not God; for God is love.",
      9: "In this was manifested the love of God toward us, because that God sent his only begotten Son into the world, that we might live through him.",
      10: "Herein is love, not that we loved God, but that he loved us, and sent his Son to be the propitiation for our sins.",
      11: "Beloved, if God so loved us, we ought also to love one another.",
      16: "And we have known and believed the love that God hath to us. God is love; and he that dwelleth in love dwelleth in God, and God in him.",
      18: "There is no fear in love; but perfect love casteth out fear: because fear hath torment. He that feareth is not made perfect in love.",
      19: "We love him, because he first loved us.",
    },
  },

  // ───────────────────────────────────────────
  //  2 JOHN
  // ───────────────────────────────────────────
  "2jo": {
    1: {
      1: "The elder unto the elect lady and her children, whom I love in the truth; and not I only, but also all they that have known the truth;",
      6: "And this is love, that we walk after his commandments. This is the commandment, That, as ye have heard from the beginning, ye should walk in it.",
    },
  },

  // ───────────────────────────────────────────
  //  3 JOHN
  // ───────────────────────────────────────────
  "3jo": {
    1: {
      1: "The elder unto the wellbeloved Gaius, whom I love in the truth.",
      4: "I have no greater joy than to hear that my children walk in truth.",
    },
  },

  // ───────────────────────────────────────────
  //  JUDE
  // ───────────────────────────────────────────
  "jud": {
    1: {
      1: "Jude, the servant of Jesus Christ, and brother of James, to them that are sanctified by God the Father, and preserved in Jesus Christ, and called:",
      3: "Beloved, when I gave all diligence to write unto you of the common salvation, it was needful for me to write unto you, and exhort you that ye should earnestly contend for the faith which was once delivered unto the saints.",
      24: "Now unto him that is able to keep you from falling, and to present you faultless before the presence of his glory with exceeding joy,",
      25: "To the only wise God our Saviour, be glory and majesty, dominion and power, both now and ever. Amen.",
    },
  },

  // ───────────────────────────────────────────
  //  REVELATION
  // ───────────────────────────────────────────
  "rev": {
    1: {
      1: "The Revelation of Jesus Christ, which God gave unto him, to shew unto his servants things which must shortly come to pass; and he sent and signified it by his angel unto his servant John:",
      3: "Blessed is he that readeth, and they that hear the words of this prophecy, and keep those things which are written therein: for the time is at hand.",
      8: "I am Alpha and Omega, the beginning and the ending, saith the Lord, which is, and which was, and which is to come, the Almighty.",
    },
    3: {
      20: "Behold, I stand at the door, and knock: if any man hear my voice, and open the door, I will come in to him, and will sup with him, and he with me.",
    },
    21: {
      1: "And I saw a new heaven and a new earth: for the first heaven and the first earth were passed away; and there was no more sea.",
      2: "And I John saw the holy city, new Jerusalem, coming down from God out of heaven, prepared as a bride adorned for her husband.",
      3: "And I heard a great voice out of heaven saying, Behold, the tabernacle of God is with men, and he will dwell with them, and they shall be his people, and God himself shall be with them, and be their God.",
      4: "And God shall wipe away all tears from their eyes; and there shall be no more death, neither sorrow, nor crying, neither shall there be any more pain: for the former things are passed away.",
      5: "And he that sat upon the throne said, Behold, I make all things new. And he said unto me, Write: for these words are true and faithful.",
      6: "And he said unto me, It is done. I am Alpha and Omega, the beginning and the end. I will give unto him that is athirst of the fountain of the water of life freely.",
    },
    22: {
      1: "And he shewed me a pure river of water of life, clear as crystal, proceeding out of the throne of God and of the Lamb.",
      2: "In the midst of the street of it, and on either side of the river, was there the tree of life, which bare twelve manner of fruits, and yielded her fruit every month: and the leaves of the tree were for the healing of the nations.",
      3: "And there shall be no more curse: but the throne of God and of the Lamb shall be in it; and his servants shall serve him:",
      4: "And they shall see his face; and his name shall be in their foreheads.",
      12: "And, behold, I come quickly; and my reward is with me, to give every man according as his work shall be.",
      13: "I am Alpha and Omega, the beginning and the end, the first and the last.",
      17: "And the Spirit and the bride say, Come. And let him that heareth say, Come. And let him that is athirst come. And whosoever will, let him take the water of life freely.",
      20: "He which testifieth these things saith, Surely I come quickly. Amen. Even so, come, Lord Jesus.",
      21: "The grace of our Lord Jesus Christ be with you all. Amen.",
    },
  },
};

// Deep-merge helper: merges extra chapters into a base text store
export function mergeTextStores(
  base: Record<string, Record<number, Record<number, string>>>,
  extra: Record<string, Record<number, Record<number, string>>>
): Record<string, Record<number, Record<number, string>>> {
  const result: Record<string, Record<number, Record<number, string>>> = {};
  const allKeys = new Set([...Object.keys(base), ...Object.keys(extra)]);
  for (const book of allKeys) {
    result[book] = {};
    const baseBook = base[book] ?? {};
    const extraBook = extra[book] ?? {};
    const allChs = new Set([
      ...Object.keys(baseBook).map(Number),
      ...Object.keys(extraBook).map(Number),
    ]);
    for (const ch of allChs) {
      result[book][ch] = { ...(baseBook[ch] ?? {}), ...(extraBook[ch] ?? {}) };
    }
  }
  return result;
}
