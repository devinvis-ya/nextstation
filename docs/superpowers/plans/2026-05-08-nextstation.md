# «Следующая станция…» Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Реализовать атмосферный Lo-Fi симулятор бесконечного поезда «Следующая станция…» согласно спеке `docs/superpowers/specs/2026-05-08-nextstation-design.md`.

**Architecture:** Vite + React + TypeScript SPA. Один корневой `App.tsx` с тремя кастомными хуками (`useJourney`, `useTimeOfDay`, `useTrainSound`) оркестрирует состояние; UI разбит на компоненты `TrainWindow` (3 параллакс-слоя), `Interior` (рамка + столик + стакан + Лера), `StatusBar`, `ProgressBar`. Все ассеты — inline SVG. Звук стука колёс синтезируется через Web Audio API.

**Tech Stack:** Vite 5, React 18, TypeScript, Tailwind CSS 3, Framer Motion 11, lucide-react. Без тестового рантайма (UI-проект, проверка ручная в браузере — это явно зафиксировано в спеке).

**Подход к проверке:** Так как тестов нет, после каждого блока задач выполняется *visual smoke check*: запустить `npm run dev`, открыть страницу, убедиться что нет ошибок в консоли и компонент отображается корректно. Финальный чек-лист — в задаче 13.

---

### Task 1: Скаффолд Vite + React + TypeScript

**Files:**
- Create: `package.json`
- Create: `tsconfig.json`
- Create: `tsconfig.node.json`
- Create: `vite.config.ts`
- Create: `index.html`
- Create: `src/main.tsx`
- Create: `src/App.tsx` (заглушка)
- Create: `.gitignore`

- [ ] **Step 1: Создать `package.json`**

```json
{
  "name": "nextstation",
  "private": true,
  "version": "0.1.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "framer-motion": "^11.11.0",
    "lucide-react": "^0.460.0",
    "react": "^18.3.1",
    "react-dom": "^18.3.1"
  },
  "devDependencies": {
    "@types/react": "^18.3.12",
    "@types/react-dom": "^18.3.1",
    "@vitejs/plugin-react": "^4.3.3",
    "autoprefixer": "^10.4.20",
    "postcss": "^8.4.49",
    "tailwindcss": "^3.4.14",
    "typescript": "^5.6.3",
    "vite": "^5.4.10"
  }
}
```

- [ ] **Step 2: Создать `tsconfig.json`**

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "useDefineForClassFields": true,
    "lib": ["ES2022", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": false,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

- [ ] **Step 3: Создать `tsconfig.node.json`**

```json
{
  "compilerOptions": {
    "composite": true,
    "skipLibCheck": true,
    "module": "ESNext",
    "moduleResolution": "bundler",
    "allowSyntheticDefaultImports": true,
    "strict": true
  },
  "include": ["vite.config.ts"]
}
```

- [ ] **Step 4: Создать `vite.config.ts`**

```ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
});
```

- [ ] **Step 5: Создать `index.html`**

```html
<!doctype html>
<html lang="ru">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Следующая станция…</title>
  </head>
  <body class="bg-black overflow-hidden">
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

- [ ] **Step 6: Создать `src/main.tsx`**

```tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
```

- [ ] **Step 7: Создать `src/App.tsx` (заглушка)**

```tsx
export default function App() {
  return <div className="text-orange-500">Следующая станция…</div>;
}
```

- [ ] **Step 8: Создать `.gitignore`**

```
node_modules
dist
.DS_Store
*.local
.vite
```

---

### Task 2: Tailwind CSS

**Files:**
- Create: `tailwind.config.ts`
- Create: `postcss.config.js`
- Create: `src/index.css`

- [ ] **Step 1: `tailwind.config.ts`**

```ts
import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Courier New"', 'monospace'],
      },
      colors: {
        tablo: '#ff8c00',
        tabloHi: '#ffd060',
      },
    },
  },
  plugins: [],
} satisfies Config;
```

- [ ] **Step 2: `postcss.config.js`**

```js
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
```

- [ ] **Step 3: `src/index.css`**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --color-sky-top: #a8c4d9;
  --color-sky-bot: #dbe7ee;
  --color-forest: #5e7a5e;
  --color-poles: #4a5a4a;
  --color-interior: #7a5a3a;
  --color-lamp: #f0d090;
  --color-table: #5a3e28;
  --color-reflection: rgba(240, 208, 144, 0.08);
  --transition-phase: 1.2s ease;
}

html, body, #root { height: 100%; width: 100%; margin: 0; padding: 0; }
body { background: #000; color: #fff; overflow: hidden; }
* { box-sizing: border-box; }
```

---

### Task 3: Установить зависимости и проверить запуск

- [ ] **Step 1: Установить пакеты**

Run: `cd /mnt/c/Idea/NextStation && npm install`
Expected: установка без ошибок (предупреждения peer-deps допустимы).

- [ ] **Step 2: Запустить dev-сервер для проверки**

Run: `cd /mnt/c/Idea/NextStation && npm run dev`
Expected: Vite стартует, отображает URL `http://localhost:5173/`. После проверки — остановить.

---

### Task 4: Данные и палитра

**Files:**
- Create: `src/data/cities.ts`
- Create: `src/theme/palette.ts`

- [ ] **Step 1: `src/data/cities.ts`**

```ts
export const cities: readonly string[] = [
  'Москва', 'Санкт-Петербург', 'Калининград', 'Псков', 'Великий Новгород',
  'Тверь', 'Смоленск', 'Брянск', 'Курск', 'Орёл',
  'Тула', 'Рязань', 'Воронеж', 'Липецк', 'Тамбов',
  'Белгород', 'Ростов-на-Дону', 'Краснодар', 'Сочи', 'Ставрополь',
  'Махачкала', 'Грозный', 'Владикавказ', 'Нальчик', 'Майкоп',
  'Элиста', 'Астрахань', 'Волгоград', 'Саратов', 'Самара',
  'Тольятти', 'Ульяновск', 'Пенза', 'Саранск', 'Чебоксары',
  'Йошкар-Ола', 'Казань', 'Ижевск', 'Киров', 'Пермь',
  'Уфа', 'Оренбург', 'Магнитогорск', 'Челябинск', 'Курган',
  'Екатеринбург', 'Тюмень', 'Сургут', 'Ханты-Мансийск', 'Салехард',
  'Омск', 'Новосибирск', 'Барнаул', 'Горно-Алтайск', 'Кемерово',
  'Новокузнецк', 'Томск', 'Красноярск', 'Абакан', 'Кызыл',
  'Иркутск', 'Улан-Удэ', 'Чита', 'Якутск', 'Благовещенск',
  'Хабаровск', 'Биробиджан', 'Владивосток', 'Южно-Сахалинск',
  'Петропавловск-Камчатский', 'Магадан', 'Анадырь', 'Норильск',
  'Мурманск', 'Архангельск', 'Северодвинск', 'Сыктывкар', 'Воркута',
  'Ярославль', 'Кострома', 'Иваново', 'Владимир', 'Нижний Новгород',
  'Вологда', 'Череповец',
] as const;

export function pickRandomCity(exclude: string): string {
  const pool = cities.filter((c) => c !== exclude);
  return pool[Math.floor(Math.random() * pool.length)]!;
}
```

- [ ] **Step 2: `src/theme/palette.ts`**

```ts
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
```

---

### Task 5: SVG-арт параллакс слоёв

**Files:**
- Create: `src/art/layers/Sky.tsx`
- Create: `src/art/layers/Forest.tsx`
- Create: `src/art/layers/Poles.tsx`

Каждый слой — функциональный компонент, рендерит SVG фиксированной ширины. Использует CSS-переменные (`var(--color-…)`) для цвета — чтобы цвета менялись плавно при смене фазы.

- [ ] **Step 1: `src/art/layers/Sky.tsx`**

```tsx
export const SKY_WIDTH = 1600;
export const SKY_HEIGHT = 600;

export default function Sky() {
  return (
    <svg
      width={SKY_WIDTH}
      height={SKY_HEIGHT}
      viewBox={`0 0 ${SKY_WIDTH} ${SKY_HEIGHT}`}
      preserveAspectRatio="none"
      style={{ display: 'block' }}
    >
      <defs>
        <linearGradient id="sky-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--color-sky-top)" />
          <stop offset="100%" stopColor="var(--color-sky-bot)" />
        </linearGradient>
      </defs>
      <rect width={SKY_WIDTH} height={SKY_HEIGHT} fill="url(#sky-grad)" />
      {/* Облака — мягкие эллипсы, low opacity */}
      <g opacity="0.55" fill="#ffffff">
        <ellipse cx="200"  cy="120" rx="110" ry="22" />
        <ellipse cx="520"  cy="80"  rx="90"  ry="18" />
        <ellipse cx="900"  cy="150" rx="140" ry="26" />
        <ellipse cx="1300" cy="100" rx="100" ry="20" />
      </g>
    </svg>
  );
}
```

- [ ] **Step 2: `src/art/layers/Forest.tsx`**

```tsx
export const FOREST_WIDTH = 1600;
export const FOREST_HEIGHT = 320;

export default function Forest() {
  // Дальний план: волнистые холмы + силуэты деревьев
  const hillPath =
    'M0,200 ' +
    'C 100,160 200,180 300,150 ' +
    'C 420,110 520,170 640,140 ' +
    'C 760,110 860,180 980,150 ' +
    'C 1100,120 1200,170 1320,140 ' +
    'C 1440,110 1540,160 1600,150 ' +
    `L 1600,${FOREST_HEIGHT} L 0,${FOREST_HEIGHT} Z`;

  const trees = Array.from({ length: 24 }, (_, i) => {
    const x = (i + 1) * (FOREST_WIDTH / 25);
    const h = 20 + ((i * 53) % 18);
    return (
      <polygon
        key={i}
        points={`${x},${180 - h} ${x - 8},${190} ${x + 8},${190}`}
        fill="var(--color-forest)"
        opacity="0.9"
      />
    );
  });

  return (
    <svg
      width={FOREST_WIDTH}
      height={FOREST_HEIGHT}
      viewBox={`0 0 ${FOREST_WIDTH} ${FOREST_HEIGHT}`}
      preserveAspectRatio="none"
      style={{ display: 'block' }}
    >
      <path d={hillPath} fill="var(--color-forest)" />
      {trees}
    </svg>
  );
}
```

- [ ] **Step 3: `src/art/layers/Poles.tsx`**

```tsx
export const POLES_WIDTH = 1200;
export const POLES_HEIGHT = 240;

export default function Poles() {
  // Ближний план — телеграфные столбы и редкие деревья у путей
  const elements = [];
  for (let i = 0; i < 8; i++) {
    const x = i * 150 + 30;
    // Столб
    elements.push(
      <rect key={`p${i}`} x={x} y={40} width="4" height="170" fill="var(--color-poles)" />,
    );
    // Перекладина столба
    elements.push(
      <rect key={`pc${i}`} x={x - 14} y={50} width="32" height="4" fill="var(--color-poles)" />,
    );
  }
  // Редкие деревья
  for (let i = 0; i < 4; i++) {
    const x = i * 280 + 110;
    elements.push(
      <polygon
        key={`t${i}`}
        points={`${x},90 ${x - 30},220 ${x + 30},220`}
        fill="var(--color-poles)"
      />,
    );
  }
  // Земля
  elements.push(
    <rect key="ground" x="0" y="220" width={POLES_WIDTH} height="20" fill="var(--color-poles)" />,
  );

  return (
    <svg
      width={POLES_WIDTH}
      height={POLES_HEIGHT}
      viewBox={`0 0 ${POLES_WIDTH} ${POLES_HEIGHT}`}
      preserveAspectRatio="none"
      style={{ display: 'block' }}
    >
      {elements}
    </svg>
  );
}
```

---

### Task 6: SVG-арт интерьера

**Files:**
- Create: `src/art/interior/WindowFrame.tsx`
- Create: `src/art/interior/Table.tsx`
- Create: `src/art/interior/TeaGlass.tsx`
- Create: `src/art/interior/LeraSilhouette.tsx`

- [ ] **Step 1: `src/art/interior/WindowFrame.tsx`**

```tsx
interface Props { width: number; height: number; }

export default function WindowFrame({ width, height }: Props) {
  const FRAME = 24;
  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
    >
      {/* Внешняя рамка */}
      <rect x="0" y="0" width={width} height={height}
            fill="none" stroke="var(--color-interior)" strokeWidth={FRAME * 2} />
      {/* Внутренняя тень рамки */}
      <rect x={FRAME} y={FRAME} width={width - FRAME * 2} height={height - FRAME * 2}
            fill="none" stroke="rgba(0,0,0,0.35)" strokeWidth="2" />
      {/* Скруглённые углы (имитация) */}
      <rect x={FRAME / 2} y={FRAME / 2}
            width={width - FRAME} height={height - FRAME}
            rx="20" ry="20"
            fill="none" stroke="var(--color-interior)" strokeWidth="2" opacity="0.6" />
      {/* Тёплое отражение в стекле */}
      <rect x={FRAME} y={FRAME} width={width - FRAME * 2} height={height - FRAME * 2}
            fill="var(--color-reflection)" />
    </svg>
  );
}
```

- [ ] **Step 2: `src/art/interior/Table.tsx`**

```tsx
interface Props { width: number; }

export default function Table({ width }: Props) {
  return (
    <svg
      width={width}
      height={80}
      viewBox={`0 0 ${width} 80`}
      style={{ display: 'block' }}
    >
      <rect x="0" y="0" width={width} height="14" fill="var(--color-table)" />
      <rect x="0" y="14" width={width} height="6" fill="rgba(0,0,0,0.25)" />
      <rect x="0" y="20" width={width} height="60" fill="var(--color-interior)" opacity="0.8" />
    </svg>
  );
}
```

- [ ] **Step 3: `src/art/interior/TeaGlass.tsx`**

```tsx
interface Props { onClick?: () => void; }

export default function TeaGlass({ onClick }: Props) {
  return (
    <svg
      width="80"
      height="120"
      viewBox="0 0 80 120"
      onClick={onClick}
      style={{ cursor: 'pointer', display: 'block' }}
    >
      {/* Подстаканник — металлические завитки */}
      <g fill="none" stroke="#c8a060" strokeWidth="3">
        <path d="M 12 50 Q 8 70 16 95 L 64 95 Q 72 70 68 50" />
        <path d="M 8 60 Q 4 75 10 90" />
        <path d="M 72 60 Q 76 75 70 90" />
        <ellipse cx="40" cy="50" rx="28" ry="4" />
        <ellipse cx="40" cy="95" rx="24" ry="3" />
      </g>
      {/* Ручка подстаканника */}
      <path d="M 64 60 Q 78 70 72 88" fill="none" stroke="#c8a060" strokeWidth="3" />
      {/* Стакан */}
      <path d="M 16 50 L 18 95 L 62 95 L 64 50 Z" fill="rgba(150,80,40,0.55)" stroke="#a07050" strokeWidth="1.5" />
      {/* Чай */}
      <path d="M 19 56 L 20 92 L 60 92 L 61 56 Z" fill="#7a3818" />
      {/* Блик */}
      <rect x="22" y="58" width="4" height="28" fill="rgba(255,255,255,0.18)" />
    </svg>
  );
}
```

- [ ] **Step 4: `src/art/interior/LeraSilhouette.tsx`**

```tsx
export default function LeraSilhouette() {
  // Силуэт сидящей девочки в профиль, смотрит налево (в окно)
  return (
    <svg width="220" height="320" viewBox="0 0 220 320" style={{ display: 'block' }}>
      <g fill="rgba(20,12,8,0.78)">
        {/* Спина и плечи */}
        <path d="M 150 320
                 L 150 200
                 Q 152 170 175 155
                 L 175 100
                 Q 175 78 158 70
                 Q 145 64 138 75
                 Q 130 58 115 60
                 Q 95 62 90 90
                 Q 88 110 100 125
                 Q 92 140 96 160
                 L 100 200
                 Q 104 240 108 320
                 Z" />
        {/* Хвостик волос */}
        <path d="M 105 75 Q 90 110 100 140 Q 92 130 95 100 Q 100 80 105 75 Z" />
      </g>
    </svg>
  );
}
```

---

### Task 7: ParallaxLayer

**Files:**
- Create: `src/components/ParallaxLayer.tsx`

- [ ] **Step 1: Создать ParallaxLayer.tsx**

```tsx
import { motion } from 'framer-motion';
import { ReactNode, useMemo } from 'react';

interface Props {
  children: ReactNode;
  width: number;          // ширина одного экземпляра
  speedFactor: number;    // 0.05 / 0.3 / 1.0
  speed: number;          // глобальный множитель (0.5/1/2/5)
  bottom?: number;        // позиционирование от низа окна (px)
  height?: number;
  basePxPerSec?: number;  // как быстро движется factor=1 при speed=1
}

export default function ParallaxLayer({
  children, width, speedFactor, speed,
  bottom = 0, height,
  basePxPerSec = 400,
}: Props) {
  const duration = useMemo(() => {
    const v = basePxPerSec * speedFactor * speed;
    return v > 0 ? width / v : 9999;
  }, [basePxPerSec, speedFactor, speed, width]);

  // Дублируем содержимое 3 раза — хватит для большинства viewports.
  return (
    <div style={{
      position: 'absolute',
      bottom,
      left: 0,
      right: 0,
      height,
      pointerEvents: 'none',
      overflow: 'hidden',
    }}>
      <motion.div
        style={{ display: 'flex', width: width * 3 }}
        animate={{ x: [0, -width] }}
        transition={{ duration, ease: 'linear', repeat: Infinity }}
      >
        {children}
        {children}
        {children}
      </motion.div>
    </div>
  );
}
```

---

### Task 8: TrainWindow

**Files:**
- Create: `src/components/TrainWindow.tsx`

- [ ] **Step 1: Создать TrainWindow.tsx**

```tsx
import ParallaxLayer from './ParallaxLayer';
import Sky, { SKY_WIDTH, SKY_HEIGHT } from '../art/layers/Sky';
import Forest, { FOREST_WIDTH, FOREST_HEIGHT } from '../art/layers/Forest';
import Poles, { POLES_WIDTH, POLES_HEIGHT } from '../art/layers/Poles';

interface Props {
  speed: number;
  onWindowClick: () => void;
}

export default function TrainWindow({ speed, onWindowClick }: Props) {
  return (
    <div
      onClick={onWindowClick}
      style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(to bottom, var(--color-sky-top), var(--color-sky-bot))',
        transition: 'background 1.2s ease',
        cursor: 'pointer',
        overflow: 'hidden',
      }}
    >
      <ParallaxLayer width={SKY_WIDTH} speedFactor={0.05} speed={speed} bottom={120} height={SKY_HEIGHT}>
        <Sky />
      </ParallaxLayer>
      <ParallaxLayer width={FOREST_WIDTH} speedFactor={0.3} speed={speed} bottom={60} height={FOREST_HEIGHT}>
        <Forest />
      </ParallaxLayer>
      <ParallaxLayer width={POLES_WIDTH} speedFactor={1.0} speed={speed} bottom={0} height={POLES_HEIGHT}>
        <Poles />
      </ParallaxLayer>
    </div>
  );
}
```

---

### Task 9: Interior + Steam

**Files:**
- Create: `src/components/Steam.tsx`
- Create: `src/components/Interior.tsx`

- [ ] **Step 1: `src/components/Steam.tsx`**

```tsx
import { motion } from 'framer-motion';

export default function Steam() {
  // Три колечка пара поднимаются и растворяются
  const rings = [0, 0.3, 0.6];
  return (
    <div style={{ position: 'absolute', left: 30, bottom: 110, pointerEvents: 'none' }}>
      {rings.map((delay, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 0, scale: 0.6 }}
          animate={{ opacity: [0, 0.7, 0], y: -50, scale: 1.4 }}
          transition={{ duration: 2, delay, ease: 'easeOut' }}
          style={{
            position: 'absolute',
            width: 18,
            height: 18,
            left: i * 4 - 6,
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.6)',
            filter: 'blur(4px)',
          }}
        />
      ))}
    </div>
  );
}
```

- [ ] **Step 2: `src/components/Interior.tsx`**

```tsx
import { useEffect, useState } from 'react';
import WindowFrame from '../art/interior/WindowFrame';
import Table from '../art/interior/Table';
import TeaGlass from '../art/interior/TeaGlass';
import LeraSilhouette from '../art/interior/LeraSilhouette';
import Steam from './Steam';

interface Props {
  windowWidth: number;
  windowHeight: number;
}

export default function Interior({ windowWidth, windowHeight }: Props) {
  const [steamIds, setSteamIds] = useState<number[]>([]);

  useEffect(() => {
    if (steamIds.length === 0) return;
    const t = window.setTimeout(() => {
      setSteamIds((ids) => ids.slice(1));
    }, 2200);
    return () => window.clearTimeout(t);
  }, [steamIds]);

  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
      <WindowFrame width={windowWidth} height={windowHeight} />
      {/* Столик внизу — поверх рамки */}
      <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0 }}>
        <Table width={windowWidth} />
      </div>
      {/* Стакан — на столе слева */}
      <div
        style={{ position: 'absolute', left: 40, bottom: 14, pointerEvents: 'auto' }}
        onClick={(e) => {
          e.stopPropagation();
          setSteamIds((ids) => [...ids, Date.now()]);
        }}
      >
        <TeaGlass />
      </div>
      {steamIds.map((id) => (
        <Steam key={id} />
      ))}
      {/* Силуэт Леры — справа */}
      <div style={{ position: 'absolute', right: 20, bottom: 60 }}>
        <LeraSilhouette />
      </div>
    </div>
  );
}
```

---

### Task 10: GlitchText, StatusBar, ProgressBar

**Files:**
- Create: `src/components/GlitchText.tsx`
- Create: `src/components/StatusBar.tsx`
- Create: `src/components/ProgressBar.tsx`

- [ ] **Step 1: `src/components/GlitchText.tsx`**

```tsx
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const GLITCH_CHARS = 'АБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ#@*$%&!?';

function randChar(): string {
  return GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)]!;
}

function corrupt(text: string): string {
  return text.split('').map((c) => (c !== ' ' && Math.random() < 0.3 ? randChar() : c)).join('');
}

interface Props { text: string; glitching: boolean; className?: string; }

export default function GlitchText({ text, glitching, className }: Props) {
  const [display, setDisplay] = useState(text);

  useEffect(() => {
    if (!glitching) {
      setDisplay(text);
      return;
    }
    const id = window.setInterval(() => setDisplay(corrupt(text)), 80);
    return () => window.clearInterval(id);
  }, [glitching, text]);

  if (!glitching) {
    return <span className={className}>{text}</span>;
  }

  return (
    <motion.span
      className={className}
      style={{ position: 'relative', display: 'inline-block' }}
      animate={{ x: [-1, 1, -1, 0] }}
      transition={{ duration: 0.12, repeat: Infinity }}
    >
      <span style={{
        position: 'absolute', left: -2, top: 0,
        color: '#ff3030', mixBlendMode: 'screen', pointerEvents: 'none',
      }}>{display}</span>
      <span style={{
        position: 'absolute', left: 2, top: 0,
        color: '#30e0ff', mixBlendMode: 'screen', pointerEvents: 'none',
      }}>{display}</span>
      <span style={{ position: 'relative' }}>{display}</span>
    </motion.span>
  );
}
```

- [ ] **Step 2: `src/components/StatusBar.tsx`**

```tsx
import GlitchText from './GlitchText';

interface Props { city: string; glitching: boolean; tripCount: number; }

export default function StatusBar({ city, glitching, tripCount }: Props) {
  return (
    <div
      style={{
        position: 'absolute',
        top: 12,
        left: '50%',
        transform: 'translateX(-50%)',
        background: 'rgba(0,0,0,0.85)',
        border: '2px solid #2a2a2a',
        borderRadius: 6,
        padding: '8px 24px',
        boxShadow: '0 0 18px rgba(255,140,0,0.18)',
        zIndex: 20,
        textAlign: 'center',
        minWidth: 320,
      }}
    >
      <div className="font-display" style={{ color: '#ff8c00', fontSize: 13, letterSpacing: 2, opacity: 0.7 }}>
        СЛЕДУЮЩАЯ СТАНЦИЯ
      </div>
      <div className="font-display" style={{ color: glitching ? '#ffd060' : '#ff8c00', fontSize: 22, letterSpacing: 3, marginTop: 2 }}>
        <GlitchText text={city.toUpperCase()} glitching={glitching} />
      </div>
      {tripCount > 0 && (
        <div className="font-display" style={{ color: '#ff8c00', fontSize: 10, letterSpacing: 1, opacity: 0.5, marginTop: 2 }}>
          петля #{tripCount}
        </div>
      )}
    </div>
  );
}
```

- [ ] **Step 3: `src/components/ProgressBar.tsx`**

```tsx
interface Props { progress: number; }

export default function ProgressBar({ progress }: Props) {
  return (
    <div
      style={{
        position: 'absolute',
        bottom: 90,
        left: '50%',
        transform: 'translateX(-50%)',
        width: '60%',
        maxWidth: 560,
        height: 6,
        background: 'rgba(0,0,0,0.6)',
        border: '1px solid #2a2a2a',
        borderRadius: 3,
        overflow: 'hidden',
        zIndex: 20,
      }}
    >
      <div
        style={{
          width: `${progress}%`,
          height: '100%',
          background: 'linear-gradient(to right, #ff8c00, #ffd060)',
          boxShadow: '0 0 6px rgba(255,140,0,0.6)',
          transition: 'width 0.08s linear',
        }}
      />
    </div>
  );
}
```

---

### Task 11: SpeedSelector + MuteButton

**Files:**
- Create: `src/components/SpeedSelector.tsx`
- Create: `src/components/MuteButton.tsx`

- [ ] **Step 1: `src/components/SpeedSelector.tsx`**

```tsx
type Speed = 0.5 | 1 | 2 | 5;

interface Props { value: Speed; onChange: (s: Speed) => void; }

const OPTIONS: Speed[] = [0.5, 1, 2, 5];

export default function SpeedSelector({ value, onChange }: Props) {
  return (
    <div
      style={{
        position: 'absolute',
        top: 16,
        right: 16,
        zIndex: 30,
        display: 'flex',
        gap: 6,
        background: 'rgba(0,0,0,0.6)',
        padding: '4px 6px',
        borderRadius: 6,
      }}
      onClick={(e) => e.stopPropagation()}
    >
      {OPTIONS.map((opt) => (
        <button
          key={opt}
          onClick={() => onChange(opt)}
          className="font-display"
          style={{
            background: value === opt ? '#ff8c00' : 'transparent',
            color: value === opt ? '#000' : '#ff8c00',
            border: '1px solid #ff8c00',
            borderRadius: 4,
            padding: '2px 8px',
            fontSize: 12,
            cursor: 'pointer',
            minWidth: 36,
          }}
        >
          {opt}×
        </button>
      ))}
    </div>
  );
}
```

- [ ] **Step 2: `src/components/MuteButton.tsx`**

```tsx
import { Volume2, VolumeX } from 'lucide-react';

interface Props { muted: boolean; onToggle: () => void; }

export default function MuteButton({ muted, onToggle }: Props) {
  return (
    <button
      onClick={(e) => { e.stopPropagation(); onToggle(); }}
      style={{
        position: 'absolute',
        bottom: 16,
        right: 16,
        zIndex: 30,
        background: 'rgba(0,0,0,0.6)',
        border: '1px solid #ff8c00',
        borderRadius: 6,
        padding: 8,
        color: '#ff8c00',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
      }}
      aria-label={muted ? 'Включить звук' : 'Выключить звук'}
    >
      {muted ? <VolumeX size={18} /> : <Volume2 size={18} />}
    </button>
  );
}
```

---

### Task 12: Хуки

**Files:**
- Create: `src/hooks/useJourney.ts`
- Create: `src/hooks/useTimeOfDay.ts`
- Create: `src/hooks/useTrainSound.ts`

- [ ] **Step 1: `src/hooks/useJourney.ts`**

```ts
import { useEffect, useRef, useState } from 'react';
import { pickRandomCity } from '../data/cities';

const DURATION_BASE_SEC = 60;
const GLITCH_START = 95;
const SWAP_AT = 99;
const SWAP_HOLD_MS = 600;

interface Result {
  progress: number;
  currentCity: string;
  previousCity: string | null;
  tripCount: number;
  isGlitching: boolean;
  onSwap: (cb: () => void) => void;
}

export function useJourney(speed: number): Result {
  const [progress, setProgress] = useState(0);
  const [currentCity, setCurrentCity] = useState('Сергиев Посад');
  const [previousCity, setPreviousCity] = useState<string | null>(null);
  const [tripCount, setTripCount] = useState(0);
  const [isGlitching, setIsGlitching] = useState(false);

  const speedRef = useRef(speed);
  const inSwapRef = useRef(false);
  const swapCallbackRef = useRef<(() => void) | null>(null);

  useEffect(() => { speedRef.current = speed; }, [speed]);

  useEffect(() => {
    let raf = 0;
    let last = performance.now();

    const tick = (now: number) => {
      let dt = (now - last) / 1000;
      last = now;
      if (dt > 0.5) dt = 1 / 60; // защита от tab-resume прыжка

      if (!inSwapRef.current) {
        const delta = (dt * speedRef.current * 100) / DURATION_BASE_SEC;
        setProgress((p) => {
          const next = Math.min(100, p + delta);

          if (next >= GLITCH_START) {
            setIsGlitching((g) => g || true);
          }

          if (next >= SWAP_AT && !inSwapRef.current) {
            inSwapRef.current = true;
            setCurrentCity((curr) => {
              setPreviousCity(curr);
              const newCity = pickRandomCity(curr);
              return newCity;
            });
            setTripCount((n) => n + 1);
            const reset = 5 + Math.random() * 5;
            window.setTimeout(() => {
              setIsGlitching(false);
              inSwapRef.current = false;
              swapCallbackRef.current?.();
            }, SWAP_HOLD_MS);
            return reset;
          }

          return next;
        });
      }

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const onSwap = (cb: () => void) => { swapCallbackRef.current = cb; };

  return { progress, currentCity, previousCity, tripCount, isGlitching, onSwap };
}
```

- [ ] **Step 2: `src/hooks/useTimeOfDay.ts`**

```ts
import { useCallback, useEffect, useRef, useState } from 'react';
import type { Phase } from '../theme/palette';

function autoPhase(progress: number): Phase {
  if (progress < 33) return 'day';
  if (progress < 66) return 'sunset';
  return 'night';
}

const ORDER: Phase[] = ['day', 'sunset', 'night'];

interface Args {
  progress: number;
  registerSwapCallback: (cb: () => void) => void;
}

export function useTimeOfDay({ progress, registerSwapCallback }: Args) {
  const [manualPhase, setManualPhase] = useState<Phase | null>(null);
  const manualRef = useRef<Phase | null>(null);
  manualRef.current = manualPhase;

  useEffect(() => {
    registerSwapCallback(() => setManualPhase(null));
  }, [registerSwapCallback]);

  const cycle = useCallback(() => {
    setManualPhase((curr) => {
      const startFrom = curr ?? autoPhase(progress);
      const idx = ORDER.indexOf(startFrom);
      return ORDER[(idx + 1) % ORDER.length]!;
    });
  }, [progress]);

  const phase: Phase = manualPhase ?? autoPhase(progress);
  return { phase, cycle };
}
```

- [ ] **Step 3: `src/hooks/useTrainSound.ts`**

```ts
import { useCallback, useEffect, useRef, useState } from 'react';

interface Args { speed: number; }

export function useTrainSound({ speed }: Args) {
  const [muted, setMuted] = useState(false);
  const ctxRef = useRef<AudioContext | null>(null);
  const masterRef = useRef<GainNode | null>(null);
  const noiseBufferRef = useRef<AudioBuffer | null>(null);
  const timerRef = useRef<number | null>(null);
  const speedRef = useRef(speed);
  const mutedRef = useRef(muted);

  useEffect(() => { speedRef.current = speed; }, [speed]);
  useEffect(() => {
    mutedRef.current = muted;
    if (masterRef.current) {
      masterRef.current.gain.value = muted ? 0 : 0.7;
    }
  }, [muted]);

  const ensureContext = useCallback(() => {
    if (ctxRef.current) return ctxRef.current;
    const Ctx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!Ctx) return null;
    const ctx = new Ctx();
    const master = ctx.createGain();
    master.gain.value = mutedRef.current ? 0 : 0.7;
    master.connect(ctx.destination);

    // Pre-build noise buffer
    const seconds = 0.06;
    const buf = ctx.createBuffer(1, ctx.sampleRate * seconds, ctx.sampleRate);
    const data = buf.getChannelData(0);
    for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;

    ctxRef.current = ctx;
    masterRef.current = master;
    noiseBufferRef.current = buf;
    return ctx;
  }, []);

  const playKnock = useCallback(() => {
    const ctx = ctxRef.current;
    const master = masterRef.current;
    const buf = noiseBufferRef.current;
    if (!ctx || !master || !buf) return;

    const src = ctx.createBufferSource();
    src.buffer = buf;
    const lp = ctx.createBiquadFilter();
    lp.type = 'lowpass';
    lp.frequency.value = 220;
    const g = ctx.createGain();
    const t = ctx.currentTime;
    g.gain.setValueAtTime(0, t);
    g.gain.linearRampToValueAtTime(0.9, t + 0.005);
    g.gain.exponentialRampToValueAtTime(0.001, t + 0.06);
    src.connect(lp).connect(g).connect(master);
    src.start();
    src.stop(t + 0.07);
  }, []);

  const startLoop = useCallback(() => {
    const tick = () => {
      playKnock();
      window.setTimeout(playKnock, 80);
      const interval = 800 / speedRef.current;
      timerRef.current = window.setTimeout(tick, interval);
    };
    tick();
  }, [playKnock]);

  // Стартует звук при первом пользовательском жесте
  const kick = useCallback(() => {
    const ctx = ensureContext();
    if (!ctx) return;
    if (ctx.state === 'suspended') ctx.resume();
    if (timerRef.current === null) startLoop();
  }, [ensureContext, startLoop]);

  useEffect(() => {
    return () => {
      if (timerRef.current !== null) window.clearTimeout(timerRef.current);
      ctxRef.current?.close();
    };
  }, []);

  const toggleMute = useCallback(() => setMuted((m) => !m), []);

  return { muted, toggleMute, kick };
}
```

---

### Task 13: App + main + финальная проверка

**Files:**
- Modify: `src/App.tsx`

- [ ] **Step 1: Полностью переписать `src/App.tsx`**

```tsx
import { useCallback, useEffect, useState } from 'react';
import TrainWindow from './components/TrainWindow';
import Interior from './components/Interior';
import StatusBar from './components/StatusBar';
import ProgressBar from './components/ProgressBar';
import SpeedSelector from './components/SpeedSelector';
import MuteButton from './components/MuteButton';
import { useJourney } from './hooks/useJourney';
import { useTimeOfDay } from './hooks/useTimeOfDay';
import { useTrainSound } from './hooks/useTrainSound';
import { PALETTES, applyPaletteToRoot } from './theme/palette';

type Speed = 0.5 | 1 | 2 | 5;

export default function App() {
  const [speed, setSpeed] = useState<Speed>(1);
  const [size, setSize] = useState({ w: window.innerWidth, h: window.innerHeight });

  const { progress, currentCity, tripCount, isGlitching, onSwap } = useJourney(speed);
  const { phase, cycle } = useTimeOfDay({ progress, registerSwapCallback: onSwap });
  const { muted, toggleMute, kick } = useTrainSound({ speed });

  // Применяем палитру
  useEffect(() => { applyPaletteToRoot(PALETTES[phase]); }, [phase]);

  // Resize
  useEffect(() => {
    const onResize = () => setSize({ w: window.innerWidth, h: window.innerHeight });
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const onWindowClick = useCallback(() => {
    kick();
    cycle();
  }, [kick, cycle]);

  return (
    <div style={{
      position: 'relative',
      width: '100vw',
      height: '100vh',
      overflow: 'hidden',
      background: '#000',
    }}>
      <TrainWindow speed={speed} onWindowClick={onWindowClick} />
      <Interior windowWidth={size.w} windowHeight={size.h} />
      <StatusBar city={currentCity} glitching={isGlitching} tripCount={tripCount} />
      <ProgressBar progress={progress} />
      <SpeedSelector value={speed} onChange={(s) => { kick(); setSpeed(s); }} />
      <MuteButton muted={muted} onToggle={() => { kick(); toggleMute(); }} />
    </div>
  );
}
```

- [ ] **Step 2: Запустить dev и проверить вручную**

Run: `cd /mnt/c/Idea/NextStation && npm run dev`

Чек-лист:
1. Стартует без ошибок в консоли.
2. Видны 3 параллакс-слоя, движутся с разной скоростью.
3. Видны рамка окна, столик, стакан, силуэт Леры.
4. Табло «СЛЕДУЮЩАЯ СТАНЦИЯ: СЕРГИЕВ ПОСАД».
5. Прогресс-бар заполняется, петля происходит, город сменяется.
6. На 95–100% табло глитчит.
7. Клик по стакану → пар. Клик по окну (не на стакане) → смена фазы дня.
8. Speed selector работает.
9. После первого клика по чему-то — слышен стук колёс. Mute глушит.
10. Resize окна не ломает раскладку.

---

## Self-review

**Coverage:**
- ✅ TrainWindow + параллакс — Tasks 5, 7, 8
- ✅ Interior (рамка, столик, стакан, Лера) — Tasks 6, 9
- ✅ StatusBar (табло) — Task 10
- ✅ ProgressBar — Task 10
- ✅ Глитч на 95% + подмена на 99% + откат 5–10% — Task 12 (`useJourney`)
- ✅ ~80 городов — Task 4
- ✅ Время суток (авто + клик) — Task 12 (`useTimeOfDay`)
- ✅ Web Audio синтез + mute — Task 12 (`useTrainSound`)
- ✅ SpeedSelector — Task 11
- ✅ Steam от стакана — Task 9

**Type consistency:** `Phase`, `Palette`, `Speed`, `Result` имена согласованы. `pickRandomCity(exclude: string)`, `applyPaletteToRoot(p: Palette)` — сигнатуры совпадают между декларацией и использованием. Хуки возвращают объекты с теми же полями, которые читает App.

**Placeholder scan:** В каждой задаче — полный код. Никаких «TODO», «реализовать позже», «similar to».
