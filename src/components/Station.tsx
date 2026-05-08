import GlitchText from './GlitchText';

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

interface Props {
  city: string;
  glitching: boolean;
  mobile?: boolean;
}

export default function Station({ city, glitching, mobile = false }: Props) {
  const PX = mobile ? 4 : 6;
  const W_CELLS = 32;
  const H_CELLS = 32;
  const W = W_CELLS * PX;
  const H = H_CELLS * PX;

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

  function buildingPixels(): JSX.Element[] {
    const e: JSX.Element[] = [];
    e.push(px(4, 12, 18, 13, C.wall));
    e.push(px(4, 12, 18, 1, C.wallShadow));
    e.push(px(4, 24, 18, 1, C.wallDark));

    for (let i = 0; i < 8; i++) {
      const w = 18 + i * 2;
      const x = 4 - i;
      const y = 11 - i;
      const colour = i === 7 ? C.roofTop : i >= 5 ? C.roof : C.roofShadow;
      e.push(px(x, y, w, 1, colour, `roof-${i}`));
    }
    e.push(px(3, 11, 20, 1, '#1a1208'));

    e.push(px(17, 4, 2, 7, C.chimney));
    e.push(px(16, 4, 4, 1, C.chimney));
    e.push(px(17, 2, 2, 1, C.smoke));
    e.push(px(16, 1, 3, 1, C.smokeDark));
    e.push(px(17, 0, 2, 1, C.smoke));

    for (const wx of [6, 10, 16]) {
      e.push(px(wx, 16, 3, 4, C.window));
      e.push(px(wx, 16, 3, 1, C.windowFrame));
      e.push(px(wx, 19, 3, 1, C.windowFrame));
    }
    e.push(px(13, 18, 2, 6, C.door));
    e.push(px(13, 18, 2, 1, C.doorFrame));
    e.push(px(14, 21, 1, 1, '#d8c060'));

    e.push(px(-6, 25, 38, 1, C.platformLight));
    e.push(px(-6, 26, 38, 3, C.platform));
    e.push(px(-6, 29, 38, 1, C.platformEdge));

    return e;
  }

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

      {/* Табло с городом */}
      <div
        className="font-display"
        style={{
          position: 'absolute',
          left: '50%',
          top: 14 * PX,
          transform: 'translateX(-50%)',
          background: '#1a1208',
          border: mobile ? '1px solid #5a4a2a' : '2px solid #5a4a2a',
          padding: mobile ? '2px 5px' : '3px 8px',
          color: glitching ? '#ffd060' : '#ff8c00',
          fontSize: mobile ? 8 : 10,
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
