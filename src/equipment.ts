type WeaponResource =
  | { ammo?: number | string; power?: never }
  | { ammo?: never; power: number };

export type Weapon = {
  name: string;
  modifier?: string;
  damage?: number | string;
  range?: string;
  special?: string;
} & WeaponResource;

type GearResource =
  | { air?: number; power?: never }
  | { air?: never; power: number };

export type Gear = {
  name: string;
  range?: string;
  effect?: string;
} & GearResource;

export function sortByName<T extends { name: string }>(items: readonly T[]): T[] {
  return [...items].sort((left, right) => left.name.localeCompare(right.name, 'en'));
}

export const weapons: Weapon[] = sortByName<Weapon>([
  { name: 'M4A3 9mm Service Pistol', modifier: '+2', damage: 2, range: 'A/M', ammo: 2 },
  { name: 'RXF-M55 EVA Pistol', modifier: '+1', damage: 1, range: 'S/M', ammo: 4, special: 'Armor piercing' },
  { name: 'AK-4047 Pulse Rifle', modifier: '+1', damage: 2, range: 'S/L', ammo: 2, special: 'Armor piercing, full auto' },
  { name: '37A2 12 Gauge Pump Action', modifier: '+2', damage: 3, range: 'A/S', ammo: 1 },
  { name: 'M40 HEDP Grenade', damage: '2E', range: 'S/M', ammo: 'Single use' },
  { name: 'Combat Knife', modifier: '+1', damage: 2 },
  { name: 'Cutting Torch', modifier: '-1', damage: 3, range: 'A/A', power: 3, special: 'Armor piercing' },
  { name: 'Maintenance Jack', modifier: '+1', damage: 1 },
  { name: 'Surgical Kit', damage: 2 },
]);

export const gear: Gear[] = sortByName<Gear>([
  { name: 'IRC Mk.50 Compression Suit', air: 5, effect: 'Vacuum protection, comm unit, head lamp, -1 to MOBILITY rolls' },
  { name: 'Seegson P-DAT', effect: 'Coordinate info for field teams (COMMAND +1)' },
  { name: 'Seegson System Diagnostic Device', effect: 'Troubleshoot computer systems (COMTECH +2)' },
  { name: 'Flashlight', range: 'Short', effect: 'Removes the effect of darkness in immediate zone' },
  { name: 'M314 Motion Tracker', range: 'Long', power: 5, effect: 'Detects motion in Stealth mode' },
  { name: 'Maintenance Jack', effect: 'HEAVY MACHINERY +1 in relevant situatons.' },
  { name: 'Cutting Torch', power: 3, effect: 'Construction and repairs (HEAVY MACHINERY +2)' },
  { name: 'Medkit', effect: 'MEDICAL AID +2 for giving first aid (single use)' },
  { name: 'Surgical Kit', effect: 'MEDICAL AID +2 for first aid and surgery on critical injuries' },
  { name: 'Electronic Tools', effect: 'COMTECH +1 in relevant situations, e.g. repairing or rewiring electronics' },
  { name: 'Naproleve', effect: 'Reduces stress level to 0. Each dose beyond the first in the same shift gives -1 dice to all skill rolls until end of that shift' },
  { name: 'X-Stim', effect: 'Reduces stress level by half (round down), -1 to AGILITY rolls for 1 shift.' },
]);
