export const FOREST_WIDTH = 1280;
export const FOREST_HEIGHT = 240;

// Ступенчатые "пиксельные" холмы и силуэты деревьев.
function Hill({ baseY, height, color, opacity = 1 }: {
  baseY: number; height: number; color: string; opacity?: number;
}) {
  const STEP = 16;
  const segments = Math.ceil(FOREST_WIDTH / STEP);
  const rects: JSX.Element[] = [];
  for (let i = 0; i < segments; i++) {
    const x = i * STEP;
    // Простая псевдо-волна высотой
    const wave = Math.round(Math.sin(i * 0.55) * height * 0.45 + Math.sin(i * 0.21) * height * 0.25);
    const top = baseY - height + wave;
    rects.push(
      <rect
        key={i}
        x={x}
        y={top}
        width={STEP}
        height={FOREST_HEIGHT - top}
        fill={color}
        opacity={opacity}
        shapeRendering="crispEdges"
      />,
    );
  }
  return <>{rects}</>;
}

function Tree({ x, y, h }: { x: number; y: number; h: number }) {
  // Маленькая ёлка — ступенчатый треугольник
  const STEP = 8;
  const layers = Math.max(2, Math.floor(h / STEP));
  const rects: JSX.Element[] = [];
  for (let i = 0; i < layers; i++) {
    const w = (i + 1) * STEP * 2;
    rects.push(
      <rect
        key={`l${i}`}
        x={x - w / 2}
        y={y - (layers - i) * STEP}
        width={w}
        height={STEP}
        fill="var(--color-forest)"
        shapeRendering="crispEdges"
      />,
    );
  }
  // Ствол
  rects.push(
    <rect
      key="trunk"
      x={x - STEP / 2}
      y={y}
      width={STEP}
      height={STEP * 2}
      fill="#3a2418"
      shapeRendering="crispEdges"
    />,
  );
  return <>{rects}</>;
}

export default function Forest() {
  const trees: JSX.Element[] = [];
  for (let i = 0; i < 18; i++) {
    const x = 30 + i * 70 + ((i * 31) % 30);
    const h = 24 + ((i * 17) % 20);
    trees.push(<Tree key={i} x={x} y={170} h={h} />);
  }

  return (
    <svg
      width={FOREST_WIDTH}
      height={FOREST_HEIGHT}
      viewBox={`0 0 ${FOREST_WIDTH} ${FOREST_HEIGHT}`}
      preserveAspectRatio="none"
      style={{ display: 'block', imageRendering: 'pixelated' }}
    >
      {/* Дальний холм — слегка приглушённый */}
      <Hill baseY={170} height={80} color="var(--color-forest)" opacity={0.55} />
      {/* Передний холм */}
      <Hill baseY={195} height={50} color="var(--color-forest)" />
      {trees}
    </svg>
  );
}
