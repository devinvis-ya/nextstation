import { motion } from 'framer-motion';

const COLORS = {
  body: '#4a3a28',
  bodyDark: '#2a1f12',
  bodyLight: '#6a4e30',
  red: '#a82828',
  redDark: '#601818',
  yellow: '#ffc060',
  windowGlass: '#7ec0d8',
  windowDark: '#3a5868',
  wheel: '#1a1208',
  wheelRim: '#5a4a2a',
  smoke: '#d8d8d0',
  smokeDark: '#a8a8a0',
  lera: '#1a0f08',
  rail: '#888',
  ground: '#3a2818',
};

interface Props {
  paused?: boolean;
  mobile?: boolean;
}

export default function TrainCars({ paused = false, mobile = false }: Props) {
  const PX = mobile ? 3 : 4;

  function px(x: number, y: number, w: number, h: number, fill: string): JSX.Element {
    return (
      <rect
        key={`${x}-${y}-${w}-${h}-${fill}`}
        x={x * PX}
        y={y * PX}
        width={w * PX}
        height={h * PX}
        fill={fill}
        shapeRendering="crispEdges"
      />
    );
  }

  // Локомотив — едет ВПРАВО
  function Locomotive({ ox = 0, oy = 0 }: { ox?: number; oy?: number }) {
    const o = ox;
    const v = oy;
    const elements: JSX.Element[] = [];
    elements.push(px(o + 19, v - 4, 2, 2, COLORS.smoke));
    elements.push(px(o + 18, v - 3, 4, 1, COLORS.smokeDark));
    elements.push(px(o + 19, v - 2, 2, 1, COLORS.smoke));
    elements.push(px(o + 19, v - 1, 2, 2, COLORS.bodyDark));
    elements.push(px(o + 0, v + 1, 26, 1, COLORS.bodyDark));
    elements.push(px(o + 0, v + 2, 26, 5, COLORS.red));
    elements.push(px(o + 0, v + 7, 26, 1, COLORS.yellow));
    elements.push(px(o + 0, v + 8, 26, 2, COLORS.redDark));
    elements.push(px(o + 1, v + 3, 5, 3, COLORS.windowGlass));
    elements.push(px(o + 1, v + 3, 5, 1, COLORS.windowDark));
    elements.push(px(o + 25, v + 4, 1, 2, COLORS.yellow));
    elements.push(px(o - 1, v + 7, 1, 2, COLORS.bodyDark));
    for (const wx of [3, 11, 19]) {
      elements.push(px(o + wx, v + 10, 4, 2, COLORS.wheel));
      elements.push(px(o + wx + 1, v + 12, 2, 1, COLORS.wheel));
    }
    elements.push(px(o + 1, v + 13, 24, 1, 'rgba(0,0,0,0.4)'));
    return <>{elements}</>;
  }

  // Пассажирский вагон
  function Car({ ox, oy, hasLera = false }: { ox: number; oy: number; hasLera?: boolean }) {
    const o = ox;
    const v = oy;
    const elements: JSX.Element[] = [];
    elements.push(px(o + 0, v + 1, 22, 1, COLORS.bodyDark));
    elements.push(px(o + 0, v + 2, 22, 5, COLORS.body));
    elements.push(px(o + 0, v + 7, 22, 1, COLORS.yellow));
    elements.push(px(o + 0, v + 8, 22, 2, COLORS.bodyDark));
    for (let i = 0; i < 4; i++) {
      const wx = o + 1 + i * 5;
      elements.push(px(wx, v + 3, 4, 3, COLORS.windowGlass));
      elements.push(px(wx, v + 3, 4, 1, COLORS.windowDark));
    }
    if (hasLera) {
      const wx = o + 1 + 1 * 5;
      elements.push(px(wx + 1, v + 3, 2, 1, COLORS.lera));
      elements.push(px(wx + 1, v + 4, 3, 1, COLORS.lera));
      elements.push(px(wx, v + 5, 4, 1, COLORS.lera));
    }
    elements.push(px(o + 21, v + 2, 1, 8, COLORS.bodyDark));
    for (const wx of [2, 16]) {
      elements.push(px(o + wx, v + 10, 4, 2, COLORS.wheel));
      elements.push(px(o + wx + 1, v + 12, 2, 1, COLORS.wheel));
    }
    elements.push(px(o - 1, v + 7, 1, 2, COLORS.bodyDark));
    elements.push(px(o + 22, v + 7, 1, 2, COLORS.bodyDark));
    elements.push(px(o + 1, v + 13, 20, 1, 'rgba(0,0,0,0.4)'));
    return <>{elements}</>;
  }

  const LOCO_W = 27;
  const CAR_W = 23;
  const CARS = mobile ? 2 : 3; // на мобиле 2 вагона чтобы влезло
  const TOTAL_CELLS_W = LOCO_W + CAR_W * CARS + 4;
  const TOTAL_CELLS_H = 18;
  const W = TOTAL_CELLS_W * PX;
  const H = TOTAL_CELLS_H * PX;

  const carsContent: JSX.Element[] = [];
  for (let i = 0; i < CARS; i++) {
    carsContent.push(<Car key={`car-${i}`} ox={2 + i * CAR_W} oy={3} hasLera={i === Math.min(1, CARS - 1)} />);
  }
  const locoX = 2 + CARS * CAR_W;

  return (
    <motion.svg
      width={W}
      height={H}
      viewBox={`0 0 ${W} ${H}`}
      style={{ display: 'block', imageRendering: 'pixelated' }}
      animate={paused ? { y: 0 } : { y: [0, -1, 0, 1, 0] }}
      transition={paused ? { duration: 0.3 } : { duration: 0.5, repeat: Infinity, ease: 'linear' }}
    >
      {carsContent}
      <Locomotive ox={locoX} oy={3} />
    </motion.svg>
  );
}
