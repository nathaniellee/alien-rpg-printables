import { attributeGroups, Character, deriveRatings, InventoryItem } from './characters';

function FractionBlank({ maximum }: { maximum?: number }) {
  return (
    <span className="fraction-blank">
      <span className="writing-space" />
      <span className="slash">/</span>
      <span className="writing-space">{maximum}</span>
    </span>
  );
}

function InventoryTable({ item, resource, entries }: { item: string; resource: string; entries: InventoryItem[] }) {
  if (entries.length > 6) throw new Error(`${item} exceeds the six available inventory rows.`);

  return (
    <table className="inventory-table" aria-label={`${item} and ${resource}`}>
      <colgroup><col /><col className="resource-column" /></colgroup>
      <thead>
        <tr><th scope="col">{item}</th><th scope="col">{resource}</th></tr>
      </thead>
      <tbody>
        {Array.from({ length: 6 }, (_, index) => {
          const entry = entries[index];
          return (
            <tr key={index}>
              <td className="inventory-item">{entry?.name}</td>
              <td>
                {entry && entry.maximum !== null
                  ? <FractionBlank maximum={entry.maximum} />
                  : null}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export function CharacterSheet({ character }: { character: Character }) {
  const { health, resolve } = deriveRatings(character.attributes);

  return (
    <article className="character-sheet" aria-label={`${character.name} character sheet`}>
      <header className="sheet-header">
        <div className="sheet-kicker"><span>Alien RPG / Evolved Edition</span><span>Character sheet</span></div>
        <h1>{character.name}</h1>
        <div className="talent">
          <h2>Talent <span>{character.talent.name}</span></h2>
          <p>{character.talent.description}</p>
        </div>
      </header>

      <section className="attributes-grid" aria-label="Attributes and skills">
        {attributeGroups.map((group) => (
          <table className="attribute-table" key={group.name} aria-label={group.name}>
            <thead>
              <tr><th scope="col">{group.name}</th><td className="attribute-value">{character.attributes[group.name]}</td></tr>
            </thead>
            <tbody>
              {group.skills.map((skill) => (
                <tr key={skill}><th scope="row">{skill}</th><td>{character.skills[skill] ?? ''}</td></tr>
              ))}
            </tbody>
          </table>
        ))}
      </section>

      <section className="ratings-grid" aria-label="Character ratings">
        <div className="rating-panel"><h2>Stress Level</h2><FractionBlank maximum={10} /></div>
        <div className="rating-panel"><h2>Health</h2><FractionBlank maximum={health} /></div>
        <div className="rating-panel"><h2>Resolve</h2><div className="static-rating">{resolve}</div></div>
        <div className="rating-panel">
          <h2>Armor</h2>
          {character.armor !== undefined
            ? <div className="static-rating">{character.armor}</div>
            : <div className="armor-blank" />}
        </div>
      </section>

      <section className="notes-grid" aria-label="Responses and inventory">
        <table className="response-table" aria-label="Stress & Panic Responses">
          <thead><tr><th scope="col">Stress &amp; Panic Responses</th></tr></thead>
          <tbody>
            {Array.from({ length: 6 }, (_, index) => <tr key={index}><td /></tr>)}
          </tbody>
        </table>
        <InventoryTable item="Weapons" resource="Ammo" entries={character.weapons} />
        <InventoryTable item="Gear" resource="Supply" entries={character.gear} />
      </section>
      <footer className="sheet-footer">Alien RPG / Evolved Edition <span>Personnel record</span></footer>
    </article>
  );
}

export function CharacterBiography({ character }: { character: Character }) {
  const occupation = character.biography?.occupation?.trim();
  const signatureItem = character.biography?.signatureItem?.trim();
  const description = character.biography?.description?.trim();
  const agenda = character.biography?.agenda?.trim();
  if (!occupation && !signatureItem && !description && !agenda) return null;

  return (
    <article className="character-sheet biography-sheet" aria-label={`${character.name} biography`}>
      <header className="sheet-header">
        <div className="sheet-kicker"><span>Alien RPG / Evolved Edition</span><span>Character biography</span></div>
        <h1>{character.name}</h1>
      </header>
      {occupation && (
        <section className="biography-section" aria-label="Career / Occupation">
          <h2>Career / Occupation</h2>
          <p>{occupation}</p>
        </section>
      )}
      {signatureItem && (
        <section className="biography-section" aria-label="Signature Item">
          <h2>Signature Item</h2>
          <p>{signatureItem}</p>
        </section>
      )}
      {description && (
        <section className="biography-section" aria-label="Description">
          <h2>Description</h2>
          <p>{description}</p>
        </section>
      )}
      {agenda && (
        <section className="biography-section" aria-label="Personal Agenda">
          <h2>Personal Agenda</h2>
          <p>{agenda}</p>
        </section>
      )}
      <footer className="sheet-footer">Alien RPG / Evolved Edition <span>Character biography</span></footer>
    </article>
  );
}
