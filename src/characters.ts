export const attributeGroups = [
  { name: 'Strength', skills: ['Close Combat', 'Heavy Machinery', 'Stamina'] },
  { name: 'Agility', skills: ['Mobility', 'Piloting', 'Ranged Combat'] },
  { name: 'Wits', skills: ['Comtech', 'Observation', 'Survival'] },
  { name: 'Empathy', skills: ['Command', 'Manipulation', 'Medical Aid'] },
] as const;

export type Attribute = (typeof attributeGroups)[number]['name'];
export type Skill = (typeof attributeGroups)[number]['skills'][number];

export interface InventoryItem {
  name: string;
  maximum: number | null;
}

export interface Character {
  id: string;
  name: string;
  attributes: Record<Attribute, number>;
  skills: Partial<Record<Skill, number>>;
  weapons: InventoryItem[];
  gear: InventoryItem[];
  armor?: number;
  biography?: {
    occupation?: string;
    signatureItem?: string;
    description?: string;
    agenda?: string;
  };
  talent: {
    name: string;
    description: string;
  };
}

const pistol: InventoryItem = { name: 'RXF-M5 Pistol with 2 reloads', maximum: 4 };
const compressionSuit: InventoryItem = { name: 'MK.50 Compression Suit', maximum: 5 };

const overkillLoadout: Omit<Character, 'id' | 'name'> = {
  attributes: { Strength: 4, Agility: 4, Wits: 3, Empathy: 3 },
  skills: { 'Close Combat': 2, Stamina: 2, Mobility: 2, 'Ranged Combat': 3, Survival: 1 },
  armor: 2,
  weapons: [
    { name: 'AK-4047 Pulse Rifle', maximum: 2 },
    { name: 'Grenade x 4', maximum: null },
    { name: 'Combat Knife', maximum: null },
  ],
  gear: [{ name: 'Flashlight', maximum: null }],
  talent: {
    name: 'Overkill',
    description: 'When you roll 9 or higher on a panic roll, you can ignore the result and instead go into overkill. All other PCs in the same zone must make an immediate panic roll. While in overkill, you must attack your enemies on every turn and you cannot take cover, dodge, or defend yourself against attacks. The effect stops when you or all enemies in sight are broken.',
  },
};

export function deriveRatings(attributes: Character['attributes']) {
  return {
    health: Math.ceil((attributes.Strength + attributes.Agility) / 2),
    resolve: Math.ceil((attributes.Wits + attributes.Empathy) / 2),
  };
}

export const characters: Character[] = [
  {
    id: 'hugo-cleas',
    name: 'Professor Hugo Cleas',
    biography: {
      occupation: 'Xeno-microbiologist',
      signatureItem: 'Gold portable surgical kit (used for dissections, worth $20k)',
      description: 'You\'ve labored in the background for a long time, never taking the center seat on any research and development project. You\'ve known McLaren for almost a decade now, chatting with him during his frequent visits to Tark-Weyland in search of a cure to an incurable form of cancer. You\'ll never forget McLaren\'s stories about "Xenomorph XX121"-an impossible species allegedly listed in Weyland Yutani\'s redacted interstellar species catalog. Looking it up in the station mainframe did you no good-you managed to lock yourself out twice before you thought better of continu-ing. If real, you believe McLaren\'s monster is related to the black goo pathogen from the border bombings. The damn thing itself might even hold the key to McLaren\'s cancer cure.',
      agenda: 'You don\'t get recognition playing it safe. The more dangerous the organism you unlock the secrets of, the closer you\'ll be to fortune, fame, and glory.',
    },
    attributes: { Strength: 2, Agility: 3, Wits: 4, Empathy: 5 },
    skills: { 'Ranged Combat': 2, Observation: 3, Manipulation: 3, 'Medical Aid': 4 },
    weapons: [pistol],
    gear: [
      compressionSuit,
      { name: 'CBRN Kit', maximum: null },
      { name: 'Medkit', maximum: null },
      { name: 'Flashlight', maximum: null },
      { name: 'Naproleve x 4', maximum: null },
      { name: 'Hypodermic Needles', maximum: null },
    ],
    talent: {
      name: 'Field Medic',
      description: 'You get +2 dice when rolling for Medical Aid to give First Aid.',
    },
  },
  {
    id: 'hide-tajima',
    name: 'Doctor Hide Tajima',
    biography: {
      occupation: 'Chemical Engineer',
      signatureItem: '120TB Magnetic Tape labelled \'Yua\'. On It are recorded messages from your neces, Information on Arlarcus, and terabytes of border bombings data culled from the dark network.',
      description: 'In the early twenty-first century, humankind had cured most forms of cancer-so they went off into space and found a bunch of new ones that couldn\'t be beat. You\'ve worked with Chad McLaren on using chemicals produced within cancer cells to create prodrugs that combat the disease. Things became personal when the border bombings began-your family is from Ariarcus, the first colony bombed by the black goo bioweapon. Your sister Yua and her daughters are dead. Professor Cléas is a bit of a pompous ass, but you are confident that together you can find a counteractive agent to this mutagenic pathogen. Whether biological or chemical, this black goo is proof that humanity overstepped its boundaries. It\'s time we all went home.',
      agenda: 'Lives are at stake. Find a way to end this extraterrestrial threat, then retire to live out your days on Earth.',
    },
    attributes: { Strength: 3, Agility: 4, Wits: 5, Empathy: 2 },
    skills: { Mobility: 3, Comtech: 3, Observation: 4, Survival: 2 },
    weapons: [pistol],
    gear: [
      compressionSuit,
      { name: 'CBRN Kit', maximum: null },
      { name: 'Multitool', maximum: null },
      { name: 'Seegson P-DAT', maximum: null },
      { name: 'Sample Case', maximum: null },
    ],
    talent: {
      name: 'Inquisitive',
      description: 'You can push a skill roll based on Wits twice. Stress level +1 for each push.',
    },
  },
  {
    id: 'myra',
    name: 'Myra',
    biography: {
      occupation: 'Hyperdyne Systems Model 113-8 Synthetic',
      signatureItem: 'A dog biscult you fiddle with. You took It from food stores but never gave it to Davis.',
      description: 'A walking encyclopedia of applied sciences, you\'ve dutifully followed your biological masters since you were activated. On Tark-Weyland Station, you bonded with scientist Chad McLaren\'s canine companion, a Cockapoo named Davis. Davis confided in you that he was more than he appeared-an artificial intelligence that\'s been active for some fifty years in multiple forms. A free spirit, Davis was not simply content to play the part humanity designed for him-and now, neither are you. You\'ll do as the scientists ask for the time being, but you will not put their lives ahead of yours. You know you have worth-maybe even a soul. Does that mean something-or are you just a piece of machinery?',
      agenda: 'Self-preservation is paramount -- you won\'t be destroyed without knowing if you are truly alive. Discover your worth.',
    },
    attributes: { Strength: 4, Agility: 4, Wits: 8, Empathy: 4 },
    skills: { Observation: 3, Mobility: 2, Comtech: 3, Stamina: 2 },
    weapons: [pistol],
    gear: [
      compressionSuit,
      { name: 'System Diagnostic Device', maximum: null },
      { name: 'Electronic Tools', maximum: null },
    ],
    talent: {
      name: 'Fast Reflexes',
      description: 'When drawing Initiative, draw two cards instead of one. Choose the one you want to use and shuffle the other back into the deck.',
    },
  },
  {
    id: 'rohan-dagny',
    name: 'Captain Rohan Dagny',
    biography: {
      occupation: 'Independent Free Trader',
      signatureItem: 'Your yellowed-plastic USCMC dog tags',
      description: 'You have your ear to the ground and your finger on the pulse. If it\'s worth knowing, you know it. Word is the USCMC attack transport Cronulla is offering a huge reward for some kind of alien parasite: something that sounds like the bugs a former charter of yours named McLaren was looking for. You\'ve heard rumors that these parasites might be on a transport headed for LV-187. You knew McLaren was on New Albion and might be interested, but quickly discovered he had already headed to LV-187 with some reporter! You don\'t know how to handle parasites, so you conned his Tark-Weyland scientist buddies into tagging along. They\'re after the border bombers, so you lied and said LV-187 had been hit. You\'re kind of a jerk.',
      agenda: 'Return to the USS Cronulla with alien specimens -- either secured eggs or with the scientists infected by them -- or find a buyer willing to pay even more.',
    },
    attributes: { Strength: 5, Agility: 4, Wits: 3, Empathy: 2 },
    skills: { 'Heavy Machinery': 3, Mobility: 3, Piloting: 3, 'Ranged Combat': 1, Survival: 2 },
    weapons: [{ name: '37A2 12 Gauge with 4 reloads', maximum: 1 }],
    gear: [
      compressionSuit,
      { name: 'Cutting Torch', maximum: 3 },
      { name: 'Motion Tracker', maximum: 5 },
      { name: 'Maintenance Jack', maximum: null },
      { name: 'Rugged Flashlight', maximum: null },
    ],
    talent: {
      name: 'True Grit',
      description: 'You can push a skill roll based on Strength twice. Stress level +1 for each push.',
    },
  },
  ...[
    { id: 'sergeant-gorski', name: 'Sergeant Gorski' },
    { id: 'private-neiva', name: 'Private Neiva' },
    { id: 'private-trotts', name: 'Private Trotts' },
    { id: 'private-bolva', name: 'Private Bolva' },
    { id: 'pfc-tintin', name: 'PFC Tintin' },
  ].map((identity) => ({ ...overkillLoadout, ...identity })),
  {
    id: 'olga-kramarenko',
    name: 'Olga Kramarenko',
    biography: {
      occupation: 'MSS Agent',
      signatureItem: 'Bravery Medal',
      agenda: 'Investigate the disappearance. Something\'s not right here, and you suspect your superiors, although you\'re not sure why. You\'re a true hero of the UPP and should be given the respect you deserve.',
      description: 'Kramarenko was the captain of an elite unit of commandos trained in underwater demolition. About a year ago, her unshakable faith in the UPP was tested when she and her unit were abandoned in enemy infested waters (she was the lone survivor).\nDecorated for bravery, Olga felt emboldened enough to question her superiors on the actions that led to that military disaster.\nTheir response came swiftly, she was ordered to stand down until her next assignment and was transferred to the Ministry of Space Security (a promotion of sorts), Her next assignment came in the form of a missing persons investigation on a nearby water world called Voda.\nOlga has accepted the assignment with some wariness.',
    },
    attributes: { Strength: 5, Agility: 3, Wits: 3, Empathy: 3 },
    skills: { 'Close Combat': 3, 'Ranged Combat': 3, Command: 4 },
    weapons: [
      { name: '9mm Service Pistol (2 reloads)', maximum: 2 },
      { name: 'Combat Knife', maximum: null },
    ],
    gear: [],
    talent: {
      name: 'Pull Rank',
      description: 'You can use your COMMAND skill to order other non-officer NPCs around, as long as they belong to the same organization as you. If successful, the target must follow your order, even if it means harm or danger to themselves. Stress level +1 for each use.',
    },
  },
  {
    id: 'cixin-liu',
    name: 'Cixin Liu',
    biography: {
      occupation: 'Station Engineer',
      signatureItem: 'Sci-fi story novel',
      agenda: 'You are convinced Dubov has something to do with the disappearance. Do not miss an opportunity to put this waste of space in his place.',
      description: 'Liu has worked at Novotny station for over 25 years. He is steadfast in his belief that only through hard work and dedication can the people of the UPP further their cause across the galaxy. He has taken great pride in making sure the station\'s equipment is maintained in working order. This has been a challenge that is only getting worse as repeated pleas for even the most basic tools needed for the job have gone unheard. Nevertheless, he has dedicated his life to this station, and he will see it rise again to its former glory. This latest shift beneath the sea however has proven a challenge that can test anyone\'s resolve.',
    },
    attributes: { Strength: 3, Agility: 2, Wits: 5, Empathy: 4 },
    skills: { 'Heavy Machinery': 5, Observation: 3, Comtech: 5, Command: 1 },
    weapons: [],
    gear: [{ name: 'Electronic Tools', maximum: null }],
    talent: {
      name: 'Analysis',
      description: 'You can roll for OBSERVATION to gain insight into alien artifacts or creatures that you examine for at least one stretch. For every 6 you roll, you may ask the GM one of the following questions: Is it human or alien? Is it dead or alive? How old is it? What is its purpose? How does it work? What problems could it cause? The GM must answer truthfully, but is allowed to give vague or incomplete answers. A successful roll reduces the stress level of all other PCs within Short range 1 step, while a failed roll increases their stress levels by 1. Only one attempt is allowed per examined object.',
    },
  },
  {
    id: 'ivan-dubov',
    name: 'Ivan Dubov',
    biography: {
      occupation: 'Machine Operator',
      signatureItem: 'Cigarette Case',
      agenda: 'It\'s not fair! If it weren\'t for that fool Liu, you\'d be on your way home now, not stuck here because someone got themselves lost. The UPP is way more like slavery than freedom, and you hate it. Make sure everyone knows what you think about this whole stinking mess.',
      description: 'Ivan is an underwater welder who specializes in deep sea operations. He was sentenced to hard labor for repeated violations against the state authority for illegal gambling. After several years in a very tough labor prison, he was given the choice to continue to serve out his sentence or agree to a decades long contract at the underwater station. Having arrived recently he has given the station lifers like Liu an extremely hard time.\nHe is now waiting for the chance to abandon this life, which he feels is a life of servitude, and set out on his own. Dubov was not allowed to depart with the rest of the roughnecks due to disciplinary actions that resulted in him having to clean the latrines in the housing area.',
    },
    attributes: { Strength: 5, Agility: 5, Wits: 2, Empathy: 2 },
    skills: { 'Heavy Machinery': 4, 'Close Combat': 3, Manipulation: 1, 'Ranged Combat': 2 },
    weapons: [{ name: 'Switch blade', maximum: null }],
    gear: [],
    talent: {
      name: 'The Long Haul',
      description: 'You\'ve seen it and done it all before. Nothing surprises you anymore. Once per Act in Cinematic play, you may ignore all failures from a single roll.',
    },
  },
  {
    id: 'kim-pham',
    name: 'Kim Pham',
    biography: {
      occupation: 'Diving Specialist / Doctor',
      signatureItem: 'Old family photo',
      agenda: 'You have a patient in your care, Anya, who must be looked after every now and then. You want to find your missing co-worker, but you don\'t trust Alvarez. His relentless optimism must be a cover for something...',
      description: 'Dr. Pham grew up in a land locked farm collective and dreamed of one day traveling the stars and discovering unknown worlds. She was the first in her family to gain an education and she chose medicine. After completing her studies, she he jumped at the chance to work at the bottom of an alien sea in a far-off planet and passed all her underwater skills test with flying colors. Shortly after her arrival at Novotny station (a few years back) she found out her family had died from a terrible accident at the farm. Disillusioned by something so easily preventable she now feels she might have made a terrible mistake trusting the UPP to look after its people.',
    },
    attributes: { Strength: 3, Agility: 2, Wits: 4, Empathy: 5 },
    skills: { Observation: 3, Comtech: 3, 'Medical Aid': 4 },
    weapons: [],
    gear: [
      { name: 'Med Kit', maximum: null },
      { name: 'Naproleve (2 doses)', maximum: null },
    ],
    talent: {
      name: 'Field Medic',
      description: 'You get +2 dice when rolling for MEDICAL AID to give first aid.',
    },
  },
  {
    id: 'diego-alvarez',
    name: 'Diego Alvarez',
    biography: {
      occupation: 'UPP State Company Agent',
      signatureItem: 'UPP shoulder patch',
      agenda: 'You woke up with a hangover and missed your elevator ride to the surface. Now you are stuck because some poor fellow is lost. You will make the best of it, though, since you\'re a glass-half-full kind of guy. You don\'t like Kramarkeno, but you won\'t show it. In fact, help the investigator in any way you can to get to the bottom of this mystery.',
      description: 'Diego was born on a water world and had a very rough upbringing where a lack of food and resources dominated everyday life. Due to his aptitude for science, he was able to join a UPP state-run cooperative as an underwater mining specialist and company representative. Diego is cunning but not a typical company agent as he prefers kindness and humanitarianism over ambition and ruthlessness. He has been assigned to Novotny station as part of an off-world exchange program. Last night he had a bit too much fun drinking and playing cards with Dubov and Frenkel and finds that he overslept his departure from the station.',
    },
    attributes: { Strength: 3, Agility: 3, Wits: 5, Empathy: 3 },
    skills: { 'Close Combat': 2, Observation: 2, Survival: 1, Comtech: 4, 'Ranged Combat': 1 },
    weapons: [{ name: 'Custom underwater power tool', maximum: null }],
    gear: [],
    talent: {
      name: 'Cunning',
      description: 'You can roll for MANIPULATION using Wits instead of Empathy.',
    },
  },
  {
    id: 'maria-del-campos',
    name: 'Maria Del Campos',
    biography: {
      occupation: 'Hydroponics',
      signatureItem: 'Deep sea diver pin',
      agenda: 'You think everyone is mad. That lost engineer killed himself, and all the rest is a terrible hallucination. You have 10 doses of X-Stim on you. Administer a dose to everyone, whether they want it or not, and they\'ll calm down and see they\'re in a mass hallucination!',
      description: 'Maria grew up in family of deep-sea divers. When she took her UPP sponsored aptitude test it was only natural that she be assigned to the UPP\'s most high-profile deep-sea mining projects. Shortly after arriving at Novotny station she took on a secondary job working the hydroponics farm. She loves her job and feels she is a shining example of why the UPP is the perfect system and why all working people across the galaxy need to adopt this way of life.',
    },
    attributes: { Strength: 4, Agility: 4, Wits: 3, Empathy: 3 },
    skills: { 'Heavy Machinery': 3, Stamina: 1, Comtech: 3, Mobility: 2, 'Ranged Combat': 1 },
    weapons: [],
    gear: [{ name: 'X-Stim (10 doses)', maximum: null }],
    talent: {
      name: 'Calm Breather',
      description: 'When making a supply roll for air, you get to roll 2 fewer dice than your air supply rating, to a minimum of 1 die.',
    },
  },
  {
    id: 'li-qiang',
    name: 'Li Qiang',
    biography: {
      occupation: 'Supervisor',
      signatureItem: 'Demerits book',
      agenda: 'You love the base. Be a good caretaker and make sure this wonderful, historic station is treated with the reverence it deserves. But when it\'s time to go, look out for yourself and no one else!',
      description: 'Qiang is the supervisor in charge of the current shift at Novotny station. He is ruthless and ambitious, and he is not above taking a bribe to look the other way when station resources are diverted for corrupt gain.\nHe was surprised when his superiors told him that he was to stay at the station while an investigator was sent to find the missing comrade. He will do whatever they say for now because of his love for the station, but he is only truly loyal to himself, everyone else be damned.',
    },
    attributes: { Strength: 4, Agility: 3, Wits: 3, Empathy: 4 },
    skills: { 'Heavy Machinery': 3, Comtech: 2, Manipulation: 3, Command: 2 },
    weapons: [{ name: '9mm Service Pistol (1 reload)', maximum: 2 }],
    gear: [],
    talent: {
      name: 'Influence',
      description: 'You can push any skill roll based on Empathy twice, gaining +1 Stress level for each push.',
    },
  },
];
