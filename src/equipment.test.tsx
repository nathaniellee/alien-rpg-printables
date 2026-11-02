import { describe, expect, it } from 'vitest';
import { renderToStaticMarkup } from 'react-dom/server';
import { EquipmentReference } from './EquipmentReference';
import { gear, sortByName, weapons } from './equipment';

describe('equipment catalog', () => {
  it('sorts names ascending without changing the input', () => {
    const input = [{ name: 'Zebra' }, { name: 'Alpha' }, { name: 'Beta' }];
    expect(sortByName(input).map((item) => item.name)).toEqual(['Alpha', 'Beta', 'Zebra']);
    expect(input.map((item) => item.name)).toEqual(['Zebra', 'Alpha', 'Beta']);
  });

  it('contains all supplied weapons in alphabetical order with exact ratings', () => {
    expect(weapons).toEqual([
      { name: '37A2 12 Gauge Pump Action', modifier: '+2', damage: 3, range: 'A/S', ammo: 1 },
      { name: 'AK-4047 Pulse Rifle', modifier: '+1', damage: 2, range: 'S/L', ammo: 2, special: 'Armor piercing, full auto' },
      { name: 'Combat Knife', modifier: '+1', damage: 2 },
      { name: 'Cutting Torch', modifier: '-1', damage: 3, range: 'A/A', power: 3, special: 'Armor piercing' },
      { name: 'M40 HEDP Grenade', damage: '2E', range: 'S/M', ammo: 'Single use' },
      { name: 'M4A3 9mm Service Pistol', modifier: '+2', damage: 2, range: 'A/M', ammo: 2 },
      { name: 'Maintenance Jack', modifier: '+1', damage: 1 },
      { name: 'RXF-M55 EVA Pistol', modifier: '+1', damage: 1, range: 'S/M', ammo: 4, special: 'Armor piercing' },
      { name: 'Surgical Kit', damage: 2 },
    ]);
  });

  it('contains all supplied gear in alphabetical order with exact effects', () => {
    expect(gear).toEqual([
      { name: 'Cutting Torch', power: 3, effect: 'Construction and repairs (HEAVY MACHINERY +2)' },
      { name: 'Electronic Tools', effect: 'COMTECH +1 in relevant situations, e.g. repairing or rewiring electronics' },
      { name: 'Flashlight', range: 'Short', effect: 'Removes the effect of darkness in immediate zone' },
      { name: 'IRC Mk.50 Compression Suit', air: 5, effect: 'Vacuum protection, comm unit, head lamp, -1 to MOBILITY rolls' },
      { name: 'M314 Motion Tracker', range: 'Long', power: 5, effect: 'Detects motion in Stealth mode' },
      { name: 'Maintenance Jack', effect: 'HEAVY MACHINERY +1 in relevant situatons.' },
      { name: 'Medkit', effect: 'MEDICAL AID +2 for giving first aid (single use)' },
      { name: 'Naproleve', effect: 'Reduces stress level to 0. Each dose beyond the first in the same shift gives -1 dice to all skill rolls until end of that shift' },
      { name: 'Seegson P-DAT', effect: 'Coordinate info for field teams (COMMAND +1)' },
      { name: 'Seegson System Diagnostic Device', effect: 'Troubleshoot computer systems (COMTECH +2)' },
      { name: 'Surgical Kit', effect: 'MEDICAL AID +2 for first aid and surgery on critical injuries' },
      { name: 'X-Stim', effect: 'Reduces stress level by half (round down), -1 to AGILITY rolls for 1 shift.' },
    ]);
  });
});

describe('equipment reference pages', () => {
  it('renders missing weapon fields as dashes except Special', () => {
    const markup = renderToStaticMarkup(<EquipmentReference kind="weapons" />);
    expect(markup).toContain('<th scope="col">Ammo/Power</th>');
    expect(markup.match(/<th scope="row">/g)).toHaveLength(9);
    for (const weapon of weapons) {
      const cells = [weapon.modifier ?? '--', weapon.damage ?? '--', weapon.range ?? '--', weapon.ammo ?? weapon.power ?? '--', weapon.special ?? ''];
      expect(markup).toContain(`<th scope="row">${weapon.name}</th>` + cells.map((cell) => `<td>${cell}</td>`).join(''));
    }
    expect(markup).not.toContain('Gear reference');
    expect(markup).not.toContain('character biography');
  });

  it('supports all optional weapon fields and retains zero ratings', () => {
    const originalLength = weapons.length;
    weapons.push(
      { name: 'Missing fields' },
      { name: 'Zero ratings', modifier: '0', damage: 0, range: 'Short', ammo: 0 },
      { name: 'Zero power', power: 0 },
    );
    try {
      const markup = renderToStaticMarkup(<EquipmentReference kind="weapons" />);
      expect(markup).toContain('<th scope="row">Missing fields</th><td>--</td><td>--</td><td>--</td><td>--</td><td></td>');
      expect(markup).toContain('<th scope="row">Zero ratings</th><td>0</td><td>0</td><td>Short</td><td>0</td><td></td>');
      expect(markup).toContain('<th scope="row">Zero power</th><td>--</td><td>--</td><td>--</td><td>0</td><td></td>');
    } finally {
      weapons.splice(originalLength);
    }
  });

  it('renders gear with Air/Power and blank missing fields', () => {
    const markup = renderToStaticMarkup(<EquipmentReference kind="gear" />);
    expect(markup).toContain('<th scope="col">Air/Power</th>');
    expect(markup).not.toContain('<th scope="col">Special</th>');
    expect(markup.match(/<th scope="row">/g)).toHaveLength(12);
    for (const item of gear) {
      const cells = [item.range ?? '', item.air ?? item.power ?? '', item.effect ?? ''];
      expect(markup).toContain(`<th scope="row">${item.name}</th>` + cells.map((cell) => `<td>${cell}</td>`).join(''));
    }
    expect(markup).not.toContain('Weapons reference');
  });
});
