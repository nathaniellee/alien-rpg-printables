import { describe, expect, it } from 'vitest';
import { renderToStaticMarkup } from 'react-dom/server';
import { CharacterBiography, CharacterSheet } from './CharacterSheet';
import App from './App';
import { attributeGroups, characters, deriveRatings } from './characters';

describe('character data', () => {
  it.each([
    ['hugo-cleas', 3, 5],
    ['hide-tajima', 4, 4],
    ['myra', 4, 6],
    ['rohan-dagny', 5, 3],
  ])('calculates health and resolve for %s', (id, health, resolve) => {
    const character = characters.find((entry) => entry.id === id)!;
    expect(deriveRatings(character.attributes)).toEqual({ health, resolve });
  });

  describe('optional biography page', () => {
    it('includes Hugo biography as a second article in the application', () => {
      const markup = renderToStaticMarkup(<App />);
      expect(markup.match(/<article /g)).toHaveLength(2);
      expect(markup.indexOf('biography-sheet')).toBeGreaterThan(markup.indexOf('Responses and inventory'));
      const biography = renderToStaticMarkup(<CharacterBiography character={characters[0]} />);
      expect(biography).toContain('<h1>Professor Hugo Cleas</h1>');
      expect(biography).toContain('<h2>Career / Occupation</h2><p>Xeno-microbiologist</p>');
      expect(biography).toContain('Xenomorph XX121');
      expect(biography).toContain('continu-ing');
      expect(biography).toContain('fortune, fame, and glory.');
      expect(biography).toContain('<h2>Personal Agenda</h2>');
      expect(biography).not.toContain('attributes-grid');
    });

    it('renders Tajima occupation, exact description, and personal agenda', () => {
      const character = characters.find((entry) => entry.id === 'hide-tajima')!;
      const description = 'In the early twenty-first century, humankind had cured most forms of cancer-so they went off into space and found a bunch of new ones that couldn\'t be beat. You\'ve worked with Chad McLaren on using chemicals produced within cancer cells to create prodrugs that combat the disease. Things became personal when the border bombings began-your family is from Ariarcus, the first colony bombed by the black goo bioweapon. Your sister Yua and her daughters are dead. Professor Cléas is a bit of a pompous ass, but you are confident that together you can find a counteractive agent to this mutagenic pathogen. Whether biological or chemical, this black goo is proof that humanity overstepped its boundaries. It\'s time we all went home.';
      const agenda = 'Lives are at stake. Find a way to end this extraterrestrial threat, then retire to live out your days on Earth.';
      expect(character.biography).toEqual(expect.objectContaining({ occupation: 'Chemical Engineer', description, agenda }));
      const markup = renderToStaticMarkup(<CharacterBiography character={character} />);
      expect(markup).toContain('<h1>Doctor Hide Tajima</h1>');
      expect(markup).toContain('<h2>Career / Occupation</h2><p>Chemical Engineer</p>');
      expect(markup).toContain(renderToStaticMarkup(<p>{description}</p>));
      expect(markup).toContain(`<h2>Personal Agenda</h2><p>${agenda}</p>`);
      expect(markup).toContain('Professor Cléas');
    });

    it('renders Myra occupation, exact description, and personal agenda', () => {
      const character = characters.find((entry) => entry.id === 'myra')!;
      const occupation = 'Hyperdyne Systems Model 113-8 Synthetic';
      const description = 'A walking encyclopedia of applied sciences, you\'ve dutifully followed your biological masters since you were activated. On Tark-Weyland Station, you bonded with scientist Chad McLaren\'s canine companion, a Cockapoo named Davis. Davis confided in you that he was more than he appeared-an artificial intelligence that\'s been active for some fifty years in multiple forms. A free spirit, Davis was not simply content to play the part humanity designed for him-and now, neither are you. You\'ll do as the scientists ask for the time being, but you will not put their lives ahead of yours. You know you have worth-maybe even a soul. Does that mean something-or are you just a piece of machinery?';
      const agenda = 'Self-preservation is paramount -- you won\'t be destroyed without knowing if you are truly alive. Discover your worth.';
      expect(character.biography).toEqual(expect.objectContaining({ occupation, description, agenda }));
      const markup = renderToStaticMarkup(<CharacterBiography character={character} />);
      expect(markup).toContain('<h1>Myra</h1>');
      expect(markup).toContain(`<h2>Career / Occupation</h2><p>${occupation}</p>`);
      expect(markup).toContain(renderToStaticMarkup(<p>{description}</p>));
      expect(markup).toContain('<h2>Personal Agenda</h2>' + renderToStaticMarkup(<p>{agenda}</p>));
    });

    it('renders Dagny occupation, exact description, and personal agenda', () => {
      const character = characters.find((entry) => entry.id === 'rohan-dagny')!;
      const occupation = 'Independent Free Trader';
      const description = 'You have your ear to the ground and your finger on the pulse. If it\'s worth knowing, you know it. Word is the USCMC attack transport Cronulla is offering a huge reward for some kind of alien parasite: something that sounds like the bugs a former charter of yours named McLaren was looking for. You\'ve heard rumors that these parasites might be on a transport headed for LV-187. You knew McLaren was on New Albion and might be interested, but quickly discovered he had already headed to LV-187 with some reporter! You don\'t know how to handle parasites, so you conned his Tark-Weyland scientist buddies into tagging along. They\'re after the border bombers, so you lied and said LV-187 had been hit. You\'re kind of a jerk.';
      const agenda = 'Return to the USS Cronulla with alien specimens -- either secured eggs or with the scientists infected by them -- or find a buyer willing to pay even more.';
      expect(character.biography).toEqual(expect.objectContaining({ occupation, description, agenda }));
      const markup = renderToStaticMarkup(<CharacterBiography character={character} />);
      expect(markup).toContain('<h1>Captain Rohan Dagny</h1>');
      expect(markup).toContain(`<h2>Career / Occupation</h2><p>${occupation}</p>`);
      expect(markup).toContain(renderToStaticMarkup(<p>{description}</p>));
      expect(markup).toContain('<h2>Personal Agenda</h2>' + renderToStaticMarkup(<p>{agenda}</p>));
    });

    it.each([
      ['hugo-cleas', 'Gold portable surgical kit (used for dissections, worth $20k)'],
      ['hide-tajima', '120TB Magnetic Tape labelled \'Yua\'. On It are recorded messages from your neces, Information on Arlarcus, and terabytes of border bombings data culled from the dark network.'],
      ['myra', 'A dog biscult you fiddle with. You took It from food stores but never gave it to Davis.'],
      ['rohan-dagny', 'Your yellowed-plastic USCMC dog tags'],
    ])('renders the exact signature item for %s before Description', (id, signatureItem) => {
      const character = characters.find((entry) => entry.id === id)!;
      expect(character.biography?.signatureItem).toBe(signatureItem);
      const markup = renderToStaticMarkup(<CharacterBiography character={character} />);
      expect(markup).toContain('<h2>Signature Item</h2>' + renderToStaticMarkup(<p>{signatureItem}</p>));
      expect(markup.indexOf('<h2>Signature Item</h2>')).toBeLessThan(markup.indexOf('<h2>Description</h2>'));
    });

    it.each(characters.filter((character) => !character.biography))('does not add a biography page for $name without details', (character) => {
      expect(renderToStaticMarkup(<CharacterBiography character={character} />)).toBe('');
    });

    it.each([{}, { occupation: ' ', signatureItem: ' ', description: '\n', agenda: '  ' }])('does not render an empty biography: %j', (biography) => {
      const character = { ...characters[0], biography };
      expect(renderToStaticMarkup(<CharacterBiography character={character} />)).toBe('');
    });

    it.each([
      ['occupation', 'Career / Occupation'],
      ['signatureItem', 'Signature Item'],
      ['description', 'Description'],
      ['agenda', 'Personal Agenda'],
    ])('supports only %s being supplied without empty sections', (field, heading) => {
      const character = { ...characters[0], biography: { [field]: 'Available details' } };
      const markup = renderToStaticMarkup(<CharacterBiography character={character} />);
      expect(markup.match(/<h2>/g)).toHaveLength(1);
      expect(markup).toContain(`<h2>${heading}</h2><p>Available details</p>`);
    });
  });

  it('associates all twelve skills with their correct attributes', () => {
    expect(attributeGroups).toEqual([
      { name: 'Strength', skills: ['Close Combat', 'Heavy Machinery', 'Stamina'] },
      { name: 'Agility', skills: ['Mobility', 'Piloting', 'Ranged Combat'] },
      { name: 'Wits', skills: ['Comtech', 'Observation', 'Survival'] },
      { name: 'Empathy', skills: ['Command', 'Manipulation', 'Medical Aid'] },
    ]);
  });

  it.each([
    ['hugo-cleas', 'RXF-M5 Pistol with 2 reloads', 4, [
      ['CBRN Kit', null], ['Medkit', null], ['Flashlight', null],
      ['Naproleve x 4', null], ['Hypodermic Needles', null],
    ]],
    ['hide-tajima', 'RXF-M5 Pistol with 2 reloads', 4, [
      ['CBRN Kit', null], ['Multitool', null], ['Seegson P-DAT', null], ['Sample Case', null],
    ]],
    ['myra', 'RXF-M5 Pistol with 2 reloads', 4, [
      ['System Diagnostic Device', null], ['Electronic Tools', null],
    ]],
    ['rohan-dagny', '37A2 12 Gauge with 4 reloads', 1, [
      ['Cutting Torch', 3], ['Motion Tracker', 5], ['Maintenance Jack', null], ['Rugged Flashlight', null],
    ]],
  ] as const)('stores the supplied starting inventory for %s', (id, weapon, maximum, gear) => {
    const character = characters.find((entry) => entry.id === id)!;
    expect(character.weapons).toEqual([{ name: weapon, maximum }]);
    expect(character.gear).toEqual([
      { name: 'MK.50 Compression Suit', maximum: 5 },
      ...gear.map(([name, maximum]) => ({ name, maximum })),
    ]);
  });

  it.each([
    ['sergeant-gorski', 'Sergeant Gorski'],
    ['private-neiva', 'Private Neiva'],
    ['private-trotts', 'Private Trotts'],
    ['private-bolva', 'Private Bolva'],
    ['pfc-tintin', 'PFC Tintin'],
  ])('gives %s the shared Overkill stats and loadout', (id, name) => {
    const character = characters.find((entry) => entry.id === id)!;
    expect(character).toEqual({
      id,
      name,
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
    });
    expect(deriveRatings(character.attributes)).toEqual({ health: 4, resolve: 3 });
  });

  it('stores Olga supplied stats, talent, and biography without inventing missing details', () => {
    const character = characters.find((entry) => entry.id === 'olga-kramarenko')!;
    const description = 'Kramarenko was the captain of an elite unit of commandos trained in underwater demolition. About a year ago, her unshakable faith in the UPP was tested when she and her unit were abandoned in enemy infested waters (she was the lone survivor).\nDecorated for bravery, Olga felt emboldened enough to question her superiors on the actions that led to that military disaster.\nTheir response came swiftly, she was ordered to stand down until her next assignment and was transferred to the Ministry of Space Security (a promotion of sorts), Her next assignment came in the form of a missing persons investigation on a nearby water world called Voda.\nOlga has accepted the assignment with some wariness.';
    expect(character).toEqual({
      id: 'olga-kramarenko',
      name: 'Olga Kramarenko',
      biography: { occupation: 'MSS Agent', signatureItem: 'Bravery Medal', description, agenda: character.biography?.agenda },
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
    });
    expect(deriveRatings(character.attributes)).toEqual({ health: 4, resolve: 3 });
    const markup = renderToStaticMarkup(<CharacterBiography character={character} />);
    expect(markup).toContain('<h1>Olga Kramarenko</h1>');
    expect(markup).toContain('<h2>Career / Occupation</h2><p>MSS Agent</p>');
    expect(markup).toContain('<h2>Signature Item</h2><p>Bravery Medal</p>');
    expect(markup.indexOf('<h2>Signature Item</h2>')).toBeLessThan(markup.indexOf('<h2>Description</h2>'));
    expect(markup).toContain(renderToStaticMarkup(<p>{description}</p>));
    expect(markup).toContain('<h2>Personal Agenda</h2>');
  });

  it('stores and renders Cixin Liu supplied details', () => {
    const character = characters.find((entry) => entry.id === 'cixin-liu')!;
    const description = 'Liu has worked at Novotny station for over 25 years. He is steadfast in his belief that only through hard work and dedication can the people of the UPP further their cause across the galaxy. He has taken great pride in making sure the station\'s equipment is maintained in working order. This has been a challenge that is only getting worse as repeated pleas for even the most basic tools needed for the job have gone unheard. Nevertheless, he has dedicated his life to this station, and he will see it rise again to its former glory. This latest shift beneath the sea however has proven a challenge that can test anyone\'s resolve.';
    expect(character).toEqual({
      id: 'cixin-liu',
      name: 'Cixin Liu',
      biography: { occupation: 'Station Engineer', signatureItem: 'Sci-fi story novel', description, agenda: character.biography?.agenda },
      attributes: { Strength: 3, Agility: 2, Wits: 5, Empathy: 4 },
      skills: { 'Heavy Machinery': 5, Observation: 3, Comtech: 5, Command: 1 },
      weapons: [],
      gear: [{ name: 'Electronic Tools', maximum: null }],
      talent: {
        name: 'Analysis',
        description: 'You can roll for OBSERVATION to gain insight into alien artifacts or creatures that you examine for at least one stretch. For every 6 you roll, you may ask the GM one of the following questions: Is it human or alien? Is it dead or alive? How old is it? What is its purpose? How does it work? What problems could it cause? The GM must answer truthfully, but is allowed to give vague or incomplete answers. A successful roll reduces the stress level of all other PCs within Short range 1 step, while a failed roll increases their stress levels by 1. Only one attempt is allowed per examined object.',
      },
    });
    expect(deriveRatings(character.attributes)).toEqual({ health: 3, resolve: 5 });
    const markup = renderToStaticMarkup(<CharacterBiography character={character} />);
    expect(markup).toContain('<h1>Cixin Liu</h1>');
    expect(markup).toContain('<h2>Career / Occupation</h2><p>Station Engineer</p>');
    expect(markup).toContain('<h2>Signature Item</h2><p>Sci-fi story novel</p>');
    expect(markup).toContain(renderToStaticMarkup(<p>{description}</p>));
    expect(markup).toContain('<h2>Personal Agenda</h2>');
  });

  it('stores and renders Ivan Dubov supplied details', () => {
    const character = characters.find((entry) => entry.id === 'ivan-dubov')!;
    const description = 'Ivan is an underwater welder who specializes in deep sea operations. He was sentenced to hard labor for repeated violations against the state authority for illegal gambling. After several years in a very tough labor prison, he was given the choice to continue to serve out his sentence or agree to a decades long contract at the underwater station. Having arrived recently he has given the station lifers like Liu an extremely hard time.\nHe is now waiting for the chance to abandon this life, which he feels is a life of servitude, and set out on his own. Dubov was not allowed to depart with the rest of the roughnecks due to disciplinary actions that resulted in him having to clean the latrines in the housing area.';
    expect(character).toEqual({
      id: 'ivan-dubov',
      name: 'Ivan Dubov',
      biography: { occupation: 'Machine Operator', signatureItem: 'Cigarette Case', description, agenda: character.biography?.agenda },
      attributes: { Strength: 5, Agility: 5, Wits: 2, Empathy: 2 },
      skills: { 'Heavy Machinery': 4, 'Close Combat': 3, Manipulation: 1, 'Ranged Combat': 2 },
      weapons: [{ name: 'Switch blade', maximum: null }],
      gear: [],
      talent: {
        name: 'The Long Haul',
        description: 'You\'ve seen it and done it all before. Nothing surprises you anymore. Once per Act in Cinematic play, you may ignore all failures from a single roll.',
      },
    });
    expect(deriveRatings(character.attributes)).toEqual({ health: 5, resolve: 2 });
    const markup = renderToStaticMarkup(<CharacterBiography character={character} />);
    expect(markup).toContain('<h1>Ivan Dubov</h1>');
    expect(markup).toContain('<h2>Career / Occupation</h2><p>Machine Operator</p>');
    expect(markup).toContain('<h2>Signature Item</h2><p>Cigarette Case</p>');
    expect(markup).toContain(renderToStaticMarkup(<p>{description}</p>));
    expect(markup).toContain('<h2>Personal Agenda</h2>');
  });

  it('stores and renders Kim Pham supplied details', () => {
    const character = characters.find((entry) => entry.id === 'kim-pham')!;
    const description = 'Dr. Pham grew up in a land locked farm collective and dreamed of one day traveling the stars and discovering unknown worlds. She was the first in her family to gain an education and she chose medicine. After completing her studies, she he jumped at the chance to work at the bottom of an alien sea in a far-off planet and passed all her underwater skills test with flying colors. Shortly after her arrival at Novotny station (a few years back) she found out her family had died from a terrible accident at the farm. Disillusioned by something so easily preventable she now feels she might have made a terrible mistake trusting the UPP to look after its people.';
    expect(character).toEqual({
      id: 'kim-pham',
      name: 'Kim Pham',
      biography: { occupation: 'Diving Specialist / Doctor', signatureItem: 'Old family photo', description, agenda: character.biography?.agenda },
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
    });
    expect(deriveRatings(character.attributes)).toEqual({ health: 3, resolve: 5 });
    const markup = renderToStaticMarkup(<CharacterBiography character={character} />);
    expect(markup).toContain('<h1>Kim Pham</h1>');
    expect(markup).toContain('<h2>Career / Occupation</h2><p>Diving Specialist / Doctor</p>');
    expect(markup).toContain('<h2>Signature Item</h2><p>Old family photo</p>');
    expect(markup).toContain(renderToStaticMarkup(<p>{description}</p>));
    expect(markup).toContain('<h2>Personal Agenda</h2>');
  });

  it('stores and renders Diego Alvarez supplied details', () => {
    const character = characters.find((entry) => entry.id === 'diego-alvarez')!;
    const description = 'Diego was born on a water world and had a very rough upbringing where a lack of food and resources dominated everyday life. Due to his aptitude for science, he was able to join a UPP state-run cooperative as an underwater mining specialist and company representative. Diego is cunning but not a typical company agent as he prefers kindness and humanitarianism over ambition and ruthlessness. He has been assigned to Novotny station as part of an off-world exchange program. Last night he had a bit too much fun drinking and playing cards with Dubov and Frenkel and finds that he overslept his departure from the station.';
    expect(character).toEqual({
      id: 'diego-alvarez',
      name: 'Diego Alvarez',
      biography: { occupation: 'UPP State Company Agent', signatureItem: 'UPP shoulder patch', description, agenda: character.biography?.agenda },
      attributes: { Strength: 3, Agility: 3, Wits: 5, Empathy: 3 },
      skills: { 'Close Combat': 2, Observation: 2, Survival: 1, Comtech: 4, 'Ranged Combat': 1 },
      weapons: [{ name: 'Custom underwater power tool', maximum: null }],
      gear: [],
      talent: {
        name: 'Cunning',
        description: 'You can roll for MANIPULATION using Wits instead of Empathy.',
      },
    });
    expect(deriveRatings(character.attributes)).toEqual({ health: 3, resolve: 4 });
    const markup = renderToStaticMarkup(<CharacterBiography character={character} />);
    expect(markup).toContain('<h1>Diego Alvarez</h1>');
    expect(markup).toContain('<h2>Career / Occupation</h2><p>UPP State Company Agent</p>');
    expect(markup).toContain('<h2>Signature Item</h2><p>UPP shoulder patch</p>');
    expect(markup).toContain(renderToStaticMarkup(<p>{description}</p>));
    expect(markup).toContain('<h2>Personal Agenda</h2>');
  });

  it('stores and renders Maria Del Campos supplied details', () => {
    const character = characters.find((entry) => entry.id === 'maria-del-campos')!;
    const description = 'Maria grew up in family of deep-sea divers. When she took her UPP sponsored aptitude test it was only natural that she be assigned to the UPP\'s most high-profile deep-sea mining projects. Shortly after arriving at Novotny station she took on a secondary job working the hydroponics farm. She loves her job and feels she is a shining example of why the UPP is the perfect system and why all working people across the galaxy need to adopt this way of life.';
    expect(character).toEqual({
      id: 'maria-del-campos',
      name: 'Maria Del Campos',
      biography: { occupation: 'Hydroponics', signatureItem: 'Deep sea diver pin', description, agenda: character.biography?.agenda },
      attributes: { Strength: 4, Agility: 4, Wits: 3, Empathy: 3 },
      skills: { 'Heavy Machinery': 3, Stamina: 1, Comtech: 3, Mobility: 2, 'Ranged Combat': 1 },
      weapons: [],
      gear: [{ name: 'X-Stim (10 doses)', maximum: null }],
      talent: {
        name: 'Calm Breather',
        description: 'When making a supply roll for air, you get to roll 2 fewer dice than your air supply rating, to a minimum of 1 die.',
      },
    });
    expect(deriveRatings(character.attributes)).toEqual({ health: 4, resolve: 3 });
    const markup = renderToStaticMarkup(<CharacterBiography character={character} />);
    expect(markup).toContain('<h1>Maria Del Campos</h1>');
    expect(markup).toContain('<h2>Career / Occupation</h2><p>Hydroponics</p>');
    expect(markup).toContain('<h2>Signature Item</h2><p>Deep sea diver pin</p>');
    expect(markup).toContain(renderToStaticMarkup(<p>{description}</p>));
    expect(markup).toContain('<h2>Personal Agenda</h2>');
  });

  it('stores and renders Li Qiang supplied details', () => {
    const character = characters.find((entry) => entry.id === 'li-qiang')!;
    const description = 'Qiang is the supervisor in charge of the current shift at Novotny station. He is ruthless and ambitious, and he is not above taking a bribe to look the other way when station resources are diverted for corrupt gain.\nHe was surprised when his superiors told him that he was to stay at the station while an investigator was sent to find the missing comrade. He will do whatever they say for now because of his love for the station, but he is only truly loyal to himself, everyone else be damned.';
    expect(character).toEqual({
      id: 'li-qiang',
      name: 'Li Qiang',
      biography: { occupation: 'Supervisor', signatureItem: 'Demerits book', description, agenda: character.biography?.agenda },
      attributes: { Strength: 4, Agility: 3, Wits: 3, Empathy: 4 },
      skills: { 'Heavy Machinery': 3, Comtech: 2, Manipulation: 3, Command: 2 },
      weapons: [{ name: '9mm Service Pistol (1 reload)', maximum: 2 }],
      gear: [],
      talent: {
        name: 'Influence',
        description: 'You can push any skill roll based on Empathy twice, gaining +1 Stress level for each push.',
      },
    });
    expect(character.weapons[0].maximum).toBe(
      characters.find((entry) => entry.id === 'olga-kramarenko')!.weapons[0].maximum,
    );
    expect(deriveRatings(character.attributes)).toEqual({ health: 4, resolve: 4 });
    const markup = renderToStaticMarkup(<CharacterBiography character={character} />);
    expect(markup).toContain('<h1>Li Qiang</h1>');
    expect(markup).toContain('<h2>Career / Occupation</h2><p>Supervisor</p>');
    expect(markup).toContain('<h2>Signature Item</h2><p>Demerits book</p>');
    expect(markup).toContain(renderToStaticMarkup(<p>{description}</p>));
    expect(markup).toContain('<h2>Personal Agenda</h2>');
  });

  it.each([
    ['cixin-liu', 'You are convinced Dubov has something to do with the disappearance. Do not miss an opportunity to put this waste of space in his place.'],
    ['diego-alvarez', 'You woke up with a hangover and missed your elevator ride to the surface. Now you are stuck because some poor fellow is lost. You will make the best of it, though, since you\'re a glass-half-full kind of guy. You don\'t like Kramarkeno, but you won\'t show it. In fact, help the investigator in any way you can to get to the bottom of this mystery.'],
    ['kim-pham', 'You have a patient in your care, Anya, who must be looked after every now and then. You want to find your missing co-worker, but you don\'t trust Alvarez. His relentless optimism must be a cover for something...'],
    ['ivan-dubov', 'It\'s not fair! If it weren\'t for that fool Liu, you\'d be on your way home now, not stuck here because someone got themselves lost. The UPP is way more like slavery than freedom, and you hate it. Make sure everyone knows what you think about this whole stinking mess.'],
    ['olga-kramarenko', 'Investigate the disappearance. Something\'s not right here, and you suspect your superiors, although you\'re not sure why. You\'re a true hero of the UPP and should be given the respect you deserve.'],
    ['maria-del-campos', 'You think everyone is mad. That lost engineer killed himself, and all the rest is a terrible hallucination. You have 10 doses of X-Stim on you. Administer a dose to everyone, whether they want it or not, and they\'ll calm down and see they\'re in a mass hallucination!'],
    ['li-qiang', 'You love the base. Be a good caretaker and make sure this wonderful, historic station is treated with the reverence it deserves. But when it\'s time to go, look out for yourself and no one else!'],
  ])('stores and renders the exact personal agenda for %s', (id, agenda) => {
    const character = characters.find((entry) => entry.id === id)!;
    expect(character.biography?.agenda).toBe(agenda);
    const markup = renderToStaticMarkup(<CharacterBiography character={character} />);
    expect(markup).toContain('<h2>Personal Agenda</h2>' + renderToStaticMarkup(<p>{agenda}</p>));
    expect(markup.indexOf('<h2>Personal Agenda</h2>')).toBeGreaterThan(markup.indexOf('<h2>Description</h2>'));
  });

  it('has sixteen independently selectable characters', () => {
    expect(characters).toHaveLength(16);
    expect(new Set(characters.map((character) => character.id)).size).toBe(16);
  });
});

describe('printed sheet', () => {
  it.each(characters)('renders $name with the supplied talent and skill values', (character) => {
    const markup = renderToStaticMarkup(<CharacterSheet character={character} />);
    expect(markup).toContain(`<h1>${character.name}</h1>`);
    expect(markup).toContain(character.talent.name);
    expect(markup).toContain(renderToStaticMarkup(<p>{character.talent.description}</p>));
    for (const group of attributeGroups) {
      for (const skill of group.skills) {
        expect(markup).toContain(`<th scope="row">${skill}</th><td>${character.skills[skill] ?? ''}</td>`);
      }
    }
    const inventory = [...character.weapons, ...character.gear];
    const applicable = inventory.filter((entry) => entry.maximum !== null).length;
    expect(markup.match(/class="slash"/g)).toHaveLength(2 + applicable);
    expect(markup).not.toContain('N/A');
    expect(markup.match(/<tr><td><\/td><\/tr>/g)).toHaveLength(6);
    expect(markup.match(/<tr><td class="inventory-item"><\/td><td><\/td><\/tr>/g)).toHaveLength(12 - inventory.length);
    for (const entry of inventory) {
      const resource = entry.maximum === null
        ? ''
        : `<span class="fraction-blank"><span class="writing-space"></span><span class="slash">/</span><span class="writing-space">${entry.maximum}</span></span>`;
      expect(markup).toContain(`<td class="inventory-item">${entry.name}</td><td>${resource}</td>`);
    }
    expect(markup).toContain(character.armor !== undefined
      ? `<h2>Armor</h2><div class="static-rating">${character.armor}</div>`
      : '<h2>Armor</h2><div class="armor-blank"></div>');
  });

  it('keeps an explicitly provided zero distinct from an unspecified skill', () => {
    const character = { ...characters[0], skills: { 'Close Combat': 0 } };
    const markup = renderToStaticMarkup(<CharacterSheet character={character} />);
    expect(markup).toContain('<th scope="row">Close Combat</th><td>0</td>');
    expect(markup).toContain('<th scope="row">Stamina</th><td></td>');
  });

  it('does not silently truncate inventory beyond the six available rows', () => {
    const character = { ...characters[0], gear: Array.from({ length: 7 }, () => characters[0].gear[0]) };
    expect(() => renderToStaticMarkup(<CharacterSheet character={character} />))
      .toThrow('Gear exceeds the six available inventory rows.');
  });

  it('leaves non-applicable Ammo blank while retaining a zero maximum', () => {
    const character = {
      ...characters[0],
      weapons: [
        { name: 'No ammo', maximum: null },
        { name: 'Empty weapon', maximum: 0 },
      ],
    };
    const markup = renderToStaticMarkup(<CharacterSheet character={character} />);
    expect(markup).toContain('<td class="inventory-item">No ammo</td><td></td>');
    expect(markup).toContain('<td class="inventory-item">Empty weapon</td><td><span class="fraction-blank"><span class="writing-space"></span><span class="slash">/</span><span class="writing-space">0</span></span></td>');
  });

  it('renders an explicitly provided zero Armor instead of leaving it blank', () => {
    const character = { ...characters[0], armor: 0 };
    const markup = renderToStaticMarkup(<CharacterSheet character={character} />);
    expect(markup).toContain('<h2>Armor</h2><div class="static-rating">0</div>');
  });
});
