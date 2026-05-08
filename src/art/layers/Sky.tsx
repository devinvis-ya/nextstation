export const SKY_WIDTH = 1280;
export const SKY_HEIGHT = 480;

// Чанковые "пиксельные" облака — простые ступенчатые формы из rect'ов.
function Cloud({ x, y, scale = 1 }: { x: number; y: number; scale?: number }) {
  // Каждый пиксель = 8 * scale
  const p = 8 * scale;
  // Облако 8x3 пикселей с зубчатой формой
  const shape = [
    '..XXXX..',
    '.XXXXXX.',
    '..XXXX..',
  ];
  const rects: JSX.Element[] = [];
  shape.forEach((row, ry) => {
    for (let rx = 0; rx < row.length; rx++) {
      if (row[rx] === 'X') {
        rects.push(
          <rect
            key={`${ry}-${rx}`}
            x={x + rx * p}
            y={y + ry * p}
            width={p}
            height={p}
            fill="#ffffff"
            opacity="0.85"
            shapeRendering="crispEdges"
          />,
        );
      }
    }
  });
  return <>{rects}</>;
}

export default function Sky() {
  return (
    <svg
      width={SKY_WIDTH}
      height={SKY_HEIGHT}
      viewBox={`0 0 ${SKY_WIDTH} ${SKY_HEIGHT}`}
      preserveAspectRatio="none"
      style={{ display: 'block', imageRendering: 'pixelated' }}
    >
      <defs>
        <linearGradient id="sky-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--color-sky-top)" />
          <stop offset="100%" stopColor="var(--color-sky-bot)" />
        </linearGradient>
      </defs>
      <rect width={SKY_WIDTH} height={SKY_HEIGHT} fill="url(#sky-grad)" />
      <Cloud x={120} y={80} scale={2} />
      <Cloud x={400} y={140} scale={1.5} />
      <Cloud x={680} y={60} scale={2.5} />
      <Cloud x={960} y={120} scale={1.8} />
    </svg>
  );
}
