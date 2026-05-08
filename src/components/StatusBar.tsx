import GlitchText from './GlitchText';

interface Props {
  city: string;
  glitching: boolean;
  tripCount: number;
  mobile?: boolean;
}

export default function StatusBar({ city, glitching, tripCount, mobile = false }: Props) {
  return (
    <div
      style={{
        position: 'absolute',
        top: mobile ? 6 : 56,
        left: '50%',
        transform: 'translateX(-50%)',
        background: 'rgba(0,0,0,0.88)',
        border: mobile ? '1px solid #2a2a2a' : '2px solid #2a2a2a',
        borderRadius: mobile ? 5 : 8,
        padding: mobile ? '4px 10px' : '14px 40px',
        boxShadow: '0 0 18px rgba(255,140,0,0.22)',
        zIndex: 20,
        textAlign: 'center',
        minWidth: mobile ? undefined : 480,
        maxWidth: mobile ? 'calc(100vw - 90px)' : undefined,
        whiteSpace: 'nowrap',
      }}
    >
      <div
        className="font-display"
        style={{
          color: '#ff8c00',
          fontSize: mobile ? 7 : 17,
          letterSpacing: mobile ? 1 : 3,
          opacity: 0.75,
        }}
      >
        СЛЕДУЮЩАЯ СТАНЦИЯ
      </div>
      <div
        className="font-display"
        style={{
          color: glitching ? '#ffd060' : '#ff8c00',
          fontSize: mobile ? 12 : 34,
          letterSpacing: mobile ? 0.5 : 4,
          marginTop: mobile ? 2 : 6,
          fontWeight: 'bold',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}
      >
        <GlitchText text={city.toUpperCase()} glitching={glitching} />
      </div>
      {tripCount > 0 && (
        <div
          className="font-display"
          style={{
            color: '#ff8c00',
            fontSize: mobile ? 7 : 11,
            letterSpacing: mobile ? 1 : 2,
            opacity: 0.5,
            marginTop: mobile ? 1 : 6,
          }}
        >
          петля #{tripCount}
        </div>
      )}
    </div>
  );
}
