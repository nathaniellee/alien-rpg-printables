# Alien RPG character sheets

A React application for choosing and printing the sixteen supplied characters.
Sheets include talents, grouped attributes and skills, derived ratings, and
pencil-entry tables for panic responses, weapons, ammo, gear, and supply.
The panic responses table aligns with the Strength and Stress Level panels;
Weapons and Gear split the remaining width equally, with 16px gaps.

## Run

Use Node.js 20 or a newer supported LTS release, with npm 10.9.4 or newer.
If using nvm, run `nvm use 20` before the commands below. Older npm versions
can fail while resolving the development tools' peer dependencies.

```sh
npm install
npm run dev
```

Open the local URL shown by Vite. Select a character and click **Print character
sheet**. Choose Letter or A4, portrait orientation, 100% scale, and disable the
browser's headers and footers. The application hides its controls when printing.
Use the print dialog's **Save as PDF** option to export a sheet.

Characters with biography details show an additional page below their gameplay
sheet, starting on a new page when printed. It repeats the character's name and
shows any supplied career/occupation, signature item, description, and personal agenda. Missing
sections are omitted; characters without any biography details remain single-page.
Hugo (Xeno-microbiologist), Tajima (Chemical Engineer), Myra (Hyperdyne Systems
Model 113-8 Synthetic), and Dagny (Independent Free Trader) currently have supplied
biographies, signature items, and personal agendas.
Olga Kramarenko (MSS Agent) has a biography and personal agenda, a 9mm Service
Pistol (2 reloads) with maximum Ammo 2, and a Combat Knife with blank Ammo.
Her gear and Armor remain blank because none were supplied.
Cixin Liu (Station Engineer) has a biography, Sci-fi story novel signature item,
and Electronic Tools with blank Supply. No weapons or Armor were supplied.
Ivan Dubov (Machine Operator) has a biography, Cigarette Case signature item, and
Switch blade with blank Ammo. No gear or Armor were supplied.
Kim Pham (Diving Specialist / Doctor) has a biography, Old family photo signature
item, Med Kit, and Naproleve (2 doses), both with blank Supply. No weapons or Armor
were supplied.
Diego Alvarez (UPP State Company Agent) has a biography, UPP shoulder patch
signature item, and Custom underwater power tool with blank Ammo. No gear or
Armor were supplied.
Maria Del Campos (Hydroponics) has a biography, Deep sea diver pin signature item,
and X-Stim (10 doses) with blank Supply. No weapons or Armor were supplied.
Li Qiang (Supervisor) has a biography, Demerits book signature item, and 9mm Service
Pistol (1 reload) with maximum Ammo 2 and blank current Ammo, like Olga's pistol.
No gear or Armor were supplied.
Liu, Alvarez, Pham, Dubov, Kramarenko, Del Campos, and Qiang all have personal
agendas displayed after Description on their biography pages.
Her signature item is Bravery Medal, shown before Description. Signature Item is
omitted for characters without one.
Add these details through the optional `biography` object (`occupation`,
`signatureItem`, `description`, `agenda`) in [src/characters.ts](src/characters.ts).

## Validate

```sh
npm test
npm run build
```

Character data and skill groupings live in [src/characters.ts](src/characters.ts).
Missing skill values stay blank. Health is `ceil((Strength + Agility) / 2)`;
Resolve is `ceil((Wits + Empathy) / 2)`. Starting weapons and gear are prefilled,
including maximum Ammo and Supply. Current Ammo and Supply remain blank for
pencil entry. Non-applicable Ammo or Supply cells and unused inventory rows
remain completely blank, without text or slash dividers.
Each inventory table has six rows.

Sergeant Gorski, Private Neiva, Private Trotts, Private Bolva, and PFC Tintin
share the Overkill talent, stats, and loadout, with Health 4, Resolve 3, and Armor 2.

Stress and current Health are intentionally blank for pencil entry, not
interactive form inputs. Armor is prefilled when supplied; otherwise it stays
blank, including for the original four characters.
