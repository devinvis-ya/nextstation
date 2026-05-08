import GlitchText from './GlitchText';

const PX = 6;

const C = {
  roof: '#a83030',
  roofShadow: '#6c1f1f',
  roofTop: '#c84848',
  wall: '#d9c89a',
  wallShadow: '#a89070',
  wallDark: '#6a5a3a',
  foundation: '#3a2820',
  window: '#7ec0d8',
  windowFrame: '#3a2820',
  door: '#4a2818',
  doorFrame: '#1a1208',
  chimney: '#3a2418',
  smoke: '#d8d8d0',
  smokeDark: '#a8a8a0',
  platform: '#6a6a6a',
  platformEdge: '#3a3a3a',
  platformLight: '#909090',
  signPost: '#3a2820',
  signFace: '#1a1208',
  signFrame: '#5a4a2a',
};

function px(x: number, y: number, w: number, h: number, fill: string, key?: string): JSX.Element {
  return (
    <rect
      key={key ?? `${x}-${y}-${w}-${h}-${fill}`}
      x={x * PX}
      y={y * PX}
      width={w * PX}
      height={h * PX}
      fill={fill}
      shapeRendering="crispEdges"
    />
  );
}

// Здание провинциального вокзалика. Возвращает массив <rect>.
function buildingPixels(): JSX.Element[] {
  const e: JSX.Element[] = [];
  // Стены: 18 cells wide × 13 cells tall, anchored at (4, 12)
  e.push(px(4, 12, 18, 13, C.wall));
  // Тёмная горизонтальная полоса под крышей
  e.push(px(4, 12, 18, 1, C.wallShadow));
  // Низ стены (фундамент)
  e.push(px(4, 24, 18, 1, C.wallDark));

  // Двускатная крыша — пиксельная пирамида
  for (let i = 0; i < 8; i++) {
    const w = 18 + i * 2;
    const x = 4 - i;
    const y = 11 - i;
    // Цвет: верхний рядок ярче (солнце), нижние темнее
    const colour = i === 7 ? C.roofTop : i >= 5 ? C.roof : C.roofShadow;
    e.push(px(x, y, w, 1, colour, `roof-${i}`));
  }
  // Тёмная нижняя кромка крыши над стеной
  e.push(px(3, 11, 20, 1, '#1a1208'));

  // Труба
  e.push(px(17, 4, 2, 7, C.chimney));
  e.push(px(16, 4, 4, 1, C.chimney)); // верх трубы шире
  // Дым из трубы
  e.push(px(17, 2, 2, 1, C.smoke));
  e.push(px(16, 1, 3, 1, C.smokeDark));
  e.push(px(17, 0, 2, 1, C.smoke));

  // Окна: 2 окна слева и 2 справа от двери
  for (const wx of [6, 10, 16]) {
    e.push(px(wx, 16, 3, 4, C.window));
    e.push(px(wx, 16, 3, 1, C.windowFrame));
    e.push(px(wx, 19, 3, 1, C.windowFrame));
  }
  // Дверь (по центру, ближе к низу)
  e.push(px(13, 18, 2, 6, C.door));
  e.push(px(13, 18, 2, 1, C.doorFrame));
  // Дверная ручка
  e.push(px(14, 21, 1, 1, '#d8c060'));

  // Платформа — выходит за пределы здания влево и вправо
  e.push(px(-6, 25, 38, 1, C.platformLight));
  e.push(px(-6, 26, 38, 3, C.platform));
  e.push(px(-6, 29, 38, 1, C.platformEdge));

  return e;
}

interface Props {
  city: string;
  glitching: boolean;
}

export default function Station({ city, glitching }: Props) {
  const W_CELLS = 32; // 26 здание + запас
  const H_CELLS = 32; // высоты здания + дым сверху + платформа снизу
  const W = W_CELLS * PX;
  const H = H_CELLS * PX;

  return (
    <div style={{ position: 'relative', width: W, height: H, pointerEvents: 'none' }}>
      <svg
        width={W}
        height={H}
        viewBox={`-12 0 ${W} ${H}`}
        style={{ display: 'block', imageRendering: 'pixelated', position: 'absolute', left: 0, top: 0 }}
      >
        {buildingPixels()}
      </svg>

      {/* Табло с городом — отдельный HTML-overlay поверх здания */}
      <div
        className="font-display"
        style={{
          position: 'absolute',
          left: '50%',
          top: 14 * PX,
          transform: 'translateX(-50%)',
          background: '#1a1208',
          border: '2px solid #5a4a2a',
          padding: '3px 8px',
          color: glitching ? '#ffd060' : '#ff8c00',
          fontSize: 10,
          letterSpacing: 1,
          whiteSpace: 'nowrap',
          boxShadow: '0 0 8px rgba(255,140,0,0.5)',
          zIndex: 2,
          fontWeight: 'bold',
        }}
      >
        <GlitchText text={city.toUpperCase()} glitching={glitching} />
      </div>
    </div>
  );
}
