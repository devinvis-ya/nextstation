export type Phase = 'day' | 'sunset' | 'night';

export interface Palette {
  skyTop: string;
  skyBot: string;
  forest: string;
  poles: string;
  interior: string;
  lamp: string;
  table: string;
  reflection: string;
}

export const PALETTES: Record<Phase, Palette> = {
  day: {
    skyTop: '#a8c4d9',
    skyBot: '#dbe7ee',
    forest: '#5e7a5e',
    poles: '#4a5a4a',
    interior: '#7a5a3a',
    lamp: '#f0d090',
    table: '#5a3e28',
    reflection: 'rgba(240,208,144,0.04)',
  },
  sunset: {
    skyTop: '#e8a070',
    skyBot: '#7a5080',
    forest: '#3a4a55',
    poles: '#2a323a',
    interior: '#5a3a28',
    lamp: '#ff9a50',
    table: '#3e2a1c',
    reflection: 'rgba(255,154,80,0.12)',
  },
  night: {
    skyTop: '#0f1a35',
    skyBot: '#1d2848',
    forest: '#0a1820',
    poles: '#050a10',
    interior: '#3a2a1c',
    lamp: '#ffc06a',
    table: '#241810',
    reflection: 'rgba(255,192,106,0.18)',
  },
};

export function applyPaletteToRoot(p: Palette) {
  const root = document.documentElement;
  root.style.setProperty('--color-sky-top', p.skyTop);
  root.style.setProperty('--color-sky-bot', p.skyBot);
  root.style.setProperty('--color-forest', p.forest);
  root.style.setProperty('--color-poles', p.poles);
  root.style.setProperty('--color-interior', p.interior);
  root.style.setProperty('--color-lamp', p.lamp);
  root.style.setProperty('--color-table', p.table);
  root.style.setProperty('--color-reflection', p.reflection);
}
