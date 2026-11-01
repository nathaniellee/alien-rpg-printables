import { useState } from 'react';
import { CharacterBiography, CharacterSheet } from './CharacterSheet';
import { characters } from './characters';

export default function App() {
  const [character, setCharacter] = useState(characters[0]);

  return (
    <>
      <header className="app-header">
        <div className="app-brand">ALIEN <span>EVOLVED EDITION</span></div>
        <p>Character sheets</p>
      </header>
      <main>
        <div className="toolbar">
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
          <button type="button" onClick={() => window.print()}>Print character sheet</button>
        </div>
        <p className="print-hint">Ready for pencil and paper. Print on Letter or A4 at 100% scale, or save as PDF. A separate biography page is included when details are available.</p>
        <div className="sheet-viewport">
          <CharacterSheet character={character} />
          <CharacterBiography character={character} />
        </div>
      </main>
    </>
  );
}
