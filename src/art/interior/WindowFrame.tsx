interface Props {
  width: number;
  height: number;
  mobile?: boolean;
}

const RIVET = 6;

export default function WindowFrame({ width, height, mobile = false }: Props) {
  const TOP_FRAME = mobile ? 14 : 28;
  const SIDE_FRAME = mobile ? 10 : 28;
  const BOTTOM_FRAME = mobile ? 56 : 92;
  const rivetSize = mobile ? 3 : RIVET;

  const rivets: JSX.Element[] = [];
  const cornerPositions: [number, number][] = [
    [SIDE_FRAME / 2 - rivetSize / 2, TOP_FRAME / 2 - rivetSize / 2],
    [width - SIDE_FRAME / 2 - rivetSize / 2, TOP_FRAME / 2 - rivetSize / 2],
    [SIDE_FRAME / 2 - rivetSize / 2, height - BOTTOM_FRAME / 2 - rivetSize / 2],
    [width - SIDE_FRAME / 2 - rivetSize / 2, height - BOTTOM_FRAME / 2 - rivetSize / 2],
  ];
  cornerPositions.forEach(([x, y], i) => {
    rivets.push(
      <rect
        key={`r${i}`}
        x={x}
        y={y}
        width={rivetSize}
        height={rivetSize}
        fill="#3a2818"
        shapeRendering="crispEdges"
      />,
    );
  });
  const sideStep = mobile ? 80 : 80;
  for (let y = TOP_FRAME + 60; y < height - BOTTOM_FRAME - 30; y += sideStep) {
    rivets.push(
      <rect
        key={`lr-${y}`}
        x={SIDE_FRAME / 2 - rivetSize / 2}
        y={y}
        width={rivetSize}
        height={rivetSize}
        fill="#3a2818"
        shapeRendering="crispEdges"
      />,
      <rect
        key={`rr-${y}`}
        x={width - SIDE_FRAME / 2 - rivetSize / 2}
        y={y}
        width={rivetSize}
        height={rivetSize}
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
      <rect x="0" y="0" width={width} height={TOP_FRAME}
            fill="var(--color-interior)" shapeRendering="crispEdges" />
      <rect x="0" y={height - BOTTOM_FRAME} width={width} height={BOTTOM_FRAME}
            fill="var(--color-interior)" shapeRendering="crispEdges" />
      <rect x="0" y="0" width={SIDE_FRAME} height={height}
            fill="var(--color-interior)" shapeRendering="crispEdges" />
      <rect x={width - SIDE_FRAME} y="0" width={SIDE_FRAME} height={height}
            fill="var(--color-interior)" shapeRendering="crispEdges" />

      <rect x={SIDE_FRAME} y={TOP_FRAME} width={innerW} height="2"
            fill="rgba(0,0,0,0.45)" shapeRendering="crispEdges" />
      <rect x={SIDE_FRAME} y={height - BOTTOM_FRAME - 2} width={innerW} height="2"
            fill="rgba(0,0,0,0.45)" shapeRendering="crispEdges" />
      <rect x={SIDE_FRAME} y={TOP_FRAME} width="2" height={innerH}
            fill="rgba(0,0,0,0.45)" shapeRendering="crispEdges" />
      <rect x={width - SIDE_FRAME - 2} y={TOP_FRAME} width="2" height={innerH}
            fill="rgba(0,0,0,0.45)" shapeRendering="crispEdges" />

      <rect x="0" y="0" width={width} height="3"
            fill="rgba(255,220,180,0.35)" shapeRendering="crispEdges" />

      <rect x={SIDE_FRAME} y={height - BOTTOM_FRAME} width={innerW} height="3"
            fill="rgba(255,220,180,0.25)" shapeRendering="crispEdges" />

      <rect x={SIDE_FRAME} y={TOP_FRAME} width={innerW} height={innerH}
            fill="var(--color-reflection)" />

      {rivets}
    </svg>
  );
}
