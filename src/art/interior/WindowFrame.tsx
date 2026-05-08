interface Props {
  width: number;
  height: number;
}

const TOP_FRAME = 28;
const SIDE_FRAME = 28;
const BOTTOM_FRAME = 92;
const RIVET = 6;

export default function WindowFrame({ width, height }: Props) {
  // Заклёпки по углам
  const rivets: JSX.Element[] = [];
  const cornerPositions: [number, number][] = [
    [SIDE_FRAME / 2 - RIVET / 2, TOP_FRAME / 2 - RIVET / 2],
    [width - SIDE_FRAME / 2 - RIVET / 2, TOP_FRAME / 2 - RIVET / 2],
    [SIDE_FRAME / 2 - RIVET / 2, height - BOTTOM_FRAME / 2 - RIVET / 2],
    [width - SIDE_FRAME / 2 - RIVET / 2, height - BOTTOM_FRAME / 2 - RIVET / 2],
  ];
  cornerPositions.forEach(([x, y], i) => {
    rivets.push(
      <rect
        key={`r${i}`}
        x={x}
        y={y}
        width={RIVET}
        height={RIVET}
        fill="#3a2818"
        shapeRendering="crispEdges"
      />,
    );
  });
  // Боковые заклёпки (на вертикальных гранях)
  for (let y = TOP_FRAME + 60; y < height - BOTTOM_FRAME - 30; y += 80) {
    rivets.push(
      <rect
        key={`lr-${y}`}
        x={SIDE_FRAME / 2 - RIVET / 2}
        y={y}
        width={RIVET}
        height={RIVET}
        fill="#3a2818"
        shapeRendering="crispEdges"
      />,
      <rect
        key={`rr-${y}`}
        x={width - SIDE_FRAME / 2 - RIVET / 2}
        y={y}
        width={RIVET}
        height={RIVET}
        fill="#3a2818"
        shapeRendering="crispEdges"
      />,
    );
  }

  const innerW = width - SIDE_FRAME * 2;
  const innerH = height - TOP_FRAME - BOTTOM_FRAME;

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
    >
      {/* 4 рамочных прямоугольника */}
      <rect x="0" y="0" width={width} height={TOP_FRAME}
            fill="var(--color-interior)" shapeRendering="crispEdges" />
      <rect x="0" y={height - BOTTOM_FRAME} width={width} height={BOTTOM_FRAME}
            fill="var(--color-interior)" shapeRendering="crispEdges" />
      <rect x="0" y="0" width={SIDE_FRAME} height={height}
            fill="var(--color-interior)" shapeRendering="crispEdges" />
      <rect x={width - SIDE_FRAME} y="0" width={SIDE_FRAME} height={height}
            fill="var(--color-interior)" shapeRendering="crispEdges" />

      {/* Тёмная внутренняя кромка (тень от рамки на стекле) */}
      <rect x={SIDE_FRAME} y={TOP_FRAME} width={innerW} height="2"
            fill="rgba(0,0,0,0.45)" shapeRendering="crispEdges" />
      <rect x={SIDE_FRAME} y={height - BOTTOM_FRAME - 2} width={innerW} height="2"
            fill="rgba(0,0,0,0.45)" shapeRendering="crispEdges" />
      <rect x={SIDE_FRAME} y={TOP_FRAME} width="2" height={innerH}
            fill="rgba(0,0,0,0.45)" shapeRendering="crispEdges" />
      <rect x={width - SIDE_FRAME - 2} y={TOP_FRAME} width="2" height={innerH}
            fill="rgba(0,0,0,0.45)" shapeRendering="crispEdges" />

      {/* Светлый блик сверху рамки */}
      <rect x="0" y="0" width={width} height="3"
            fill="rgba(255,220,180,0.35)" shapeRendering="crispEdges" />

      {/* Светлая кромка между нижней рамкой и сценой (как полка) */}
      <rect x={SIDE_FRAME} y={height - BOTTOM_FRAME} width={innerW} height="3"
            fill="rgba(255,220,180,0.25)" shapeRendering="crispEdges" />

      {/* Тёплый отсвет лампы на стекле */}
      <rect x={SIDE_FRAME} y={TOP_FRAME} width={innerW} height={innerH}
            fill="var(--color-reflection)" />

      {rivets}
    </svg>
  );
}
