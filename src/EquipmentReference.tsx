import { gear, weapons } from './equipment';

export type ReferenceKind = 'weapons' | 'gear';

export function EquipmentReference({ kind }: { kind: ReferenceKind }) {
  const title = kind === 'weapons' ? 'Weapons' : 'Gear';

  return (
    <article className={`character-sheet reference-sheet ${kind}-reference`} aria-label={`${title} reference sheet`}>
      <header className="sheet-header">
        <div className="sheet-kicker"><span>Alien RPG / Evolved Edition</span><span>Equipment reference</span></div>
        <h1>{title} Reference</h1>
      </header>
      {kind === 'weapons' ? (
        <table className="reference-table" aria-label="Weapons reference">
          <colgroup>
            <col className="weapon-name-column" />
            <col className="weapon-stat-column" />
            <col className="weapon-stat-column" />
            <col className="weapon-stat-column" />
            <col className="weapon-resource-column" />
            <col />
          </colgroup>
          <thead>
            <tr>
              <th scope="col">Weapon</th><th scope="col">Modifier</th><th scope="col">Damage</th>
              <th scope="col">Range</th><th scope="col">Ammo/Power</th><th scope="col">Special</th>
            </tr>
          </thead>
          <tbody>
            {weapons.map((weapon) => (
              <tr key={weapon.name}>
                <th scope="row">{weapon.name}</th><td>{weapon.modifier ?? '--'}</td><td>{weapon.damage ?? '--'}</td>
                <td>{weapon.range ?? '--'}</td><td>{weapon.ammo ?? weapon.power ?? '--'}</td><td>{weapon.special ?? ''}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <table className="reference-table" aria-label="Gear reference">
          <colgroup>
            <col className="gear-name-column" />
            <col className="gear-range-column" />
            <col className="gear-resource-column" />
            <col className="gear-effect-column" />
          </colgroup>
          <thead>
            <tr>
              <th scope="col">Gear</th><th scope="col">Range</th><th scope="col">Air/Power</th>
              <th scope="col">Effect</th>
            </tr>
          </thead>
          <tbody>
            {gear.map((item) => (
              <tr key={item.name}>
                <th scope="row">{item.name}</th><td>{item.range ?? ''}</td><td>{item.air ?? item.power ?? ''}</td>
                <td>{item.effect ?? ''}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <footer className="sheet-footer">Alien RPG / Evolved Edition <span>{title} quick reference</span></footer>
    </article>
  );
}
