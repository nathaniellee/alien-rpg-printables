import { useState } from 'react';
import { CharacterBiography, CharacterSheet } from './CharacterSheet';
import { characters } from './characters';
import { EquipmentReference, ReferenceKind } from './EquipmentReference';

type Page = 'characters' | ReferenceKind;
const pages: { id: Page; label: string }[] = [
  { id: 'characters', label: 'Character sheets' },
  { id: 'weapons', label: 'Weapons reference' },
  { id: 'gear', label: 'Gear reference' },
];

export default function App() {
  const [character, setCharacter] = useState(characters[0]);
  const [page, setPage] = useState<Page>('characters');

  return (
    <>
      <header className="app-header">
        <div className="app-brand">ALIEN <span>EVOLVED EDITION</span></div>
        <p>Printable resources</p>
      </header>
      <main>
        <nav className="page-navigation" aria-label="Printable resources">
          {pages.map((entry) => (
            <button key={entry.id} type="button" aria-current={page === entry.id ? 'page' : undefined} onClick={() => setPage(entry.id)}>
              {entry.label}
            </button>
          ))}
        </nav>
        <div className="toolbar">
          {page === 'characters' ? (
            <div className="character-picker">
              <label htmlFor="character">Select character</label>
              <select
                id="character"
                value={character.id}
                onChange={(event) => {
                  const selected = characters.find((entry) => entry.id === event.target.value);
                  if (!selected) throw new Error(`Unknown character: ${event.target.value}`);
                  setCharacter(selected);
                }}
              >
                {characters.map((entry) => <option key={entry.id} value={entry.id}>{entry.name}</option>)}
              </select>
            </div>
          ) : <h2 className="reference-toolbar-title">{page === 'weapons' ? 'Weapons' : 'Gear'} quick reference</h2>}
          <button type="button" onClick={() => window.print()}>
            {page === 'characters' ? 'Print character sheet' : `Print ${page} reference`}
          </button>
        </div>
        <p className="print-hint">
          Print on Letter or A4 at 100% scale, or save as PDF.
          {page === 'characters' ? ' A separate biography page is included when details are available.' : ' Items are listed alphabetically. Only this reference page will print.'}
        </p>
        <div className="sheet-viewport">
          {page === 'characters' ? (
            <>
              <CharacterSheet character={character} />
              <CharacterBiography character={character} />
            </>
          ) : <EquipmentReference kind={page} />}
        </div>
      </main>
    </>
  );
}
