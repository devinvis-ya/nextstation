export const POLES_WIDTH = 960;
export const POLES_HEIGHT = 220;

// Телеграфные столбы и редкие деревья на ближнем плане.
function Pole({ x }: { x: number }) {
  const PIXEL = 4;
  const TOP = 30;
  const HEIGHT = 160;
  const r = (x: number, y: number, w: number, h: number, fill = 'var(--color-poles)') => (
    <rect
      key={`${x}-${y}-${w}-${h}`}
      x={x}
      y={y}
      width={w}
      height={h}
      fill={fill}
      shapeRendering="crispEdges"
    />
  );
  return (
    <g>
      {/* Сам столб */}
      {r(x, TOP, PIXEL * 2, HEIGHT)}
      {/* Верхняя короткая перекладина */}
      {r(x - PIXEL * 2, TOP + 8, PIXEL * 6, PIXEL)}
      {/* Изоляторы */}
      {r(x - PIXEL * 2, TOP + 4, PIXEL, PIXEL, '#d8c098')}
      {r(x + PIXEL * 3, TOP + 4, PIXEL, PIXEL, '#d8c098')}
      {/* Нижняя перекладина */}
      {r(x - PIXEL * 3, TOP + 24, PIXEL * 8, PIXEL)}
      {r(x - PIXEL * 3, TOP + 20, PIXEL, PIXEL, '#d8c098')}
      {r(x + PIXEL * 4, TOP + 20, PIXEL, PIXEL, '#d8c098')}
    </g>
  );
}

function NearTree({ x }: { x: number }) {
  const STEP = 8;
  const layers = 5;
  const baseY = 170;
  const rects: JSX.Element[] = [];
  for (let i = 0; i < layers; i++) {
    const w = (i + 1) * STEP * 2;
    rects.push(
      <rect
        key={`l${i}`}
        x={x - w / 2}
        y={baseY - (layers - i) * STEP}
        width={w}
        height={STEP}
        fill="var(--color-poles)"
        shapeRendering="crispEdges"
      />,
    );
  }
  rects.push(
    <rect
      key="trunk"
      x={x - STEP / 2}
      y={baseY}
      width={STEP}
      height={STEP * 2}
      fill="#1a1208"
      shapeRendering="crispEdges"
    />,
  );
  return <>{rects}</>;
}

function Sleeper({ x }: { x: number }) {
  // Шпала — короткий тёмный прямоугольник на земле
  return (
    <rect
      x={x}
      y={200}
      width={28}
      height={6}
      fill="#1a1208"
      shapeRendering="crispEdges"
    />
  );
}

export default function Poles() {
  const poles: JSX.Element[] = [];
  for (let i = 0; i < 5; i++) {
    poles.push(<Pole key={`p${i}`} x={120 + i * 200} />);
  }
  const trees: JSX.Element[] = [];
  for (let i = 0; i < 3; i++) {
    trees.push(<NearTree key={`t${i}`} x={60 + i * 320} />);
  }
  const sleepers: JSX.Element[] = [];
  for (let i = 0; i < 16; i++) {
    sleepers.push(<Sleeper key={`s${i}`} x={i * 60} />);
  }

  return (
    <svg
      width={POLES_WIDTH}
      height={POLES_HEIGHT}
      viewBox={`0 0 ${POLES_WIDTH} ${POLES_HEIGHT}`}
      preserveAspectRatio="none"
      style={{ display: 'block', imageRendering: 'pixelated' }}
    >
      {/* Земля у путей */}
      <rect x="0" y="190" width={POLES_WIDTH} height="30" fill="#3a2818" shapeRendering="crispEdges" />
      <rect x="0" y="186" width={POLES_WIDTH} height="4" fill="#5a3a24" shapeRendering="crispEdges" />
      {sleepers}
      {/* Рельсы */}
      <rect x="0" y="196" width={POLES_WIDTH} height="2" fill="#888" shapeRendering="crispEdges" />
      <rect x="0" y="208" width={POLES_WIDTH} height="2" fill="#888" shapeRendering="crispEdges" />
      {poles}
      {trees}
    </svg>
  );
}
