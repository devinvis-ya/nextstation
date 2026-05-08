import GlitchText from './GlitchText';

interface Props {
  city: string;
  glitching: boolean;
  tripCount: number;
}

export default function StatusBar({ city, glitching, tripCount }: Props) {
  return (
    <div
      style={{
        position: 'absolute',
        top: 56,
        left: '50%',
        transform: 'translateX(-50%)',
        background: 'rgba(0,0,0,0.88)',
        border: '2px solid #2a2a2a',
        borderRadius: 8,
        padding: '14px 40px',
        boxShadow: '0 0 26px rgba(255,140,0,0.22)',
        zIndex: 20,
        textAlign: 'center',
        minWidth: 480,
        whiteSpace: 'nowrap',
      }}
    >
      <div
        className="font-display"
        style={{ color: '#ff8c00', fontSize: 17, letterSpacing: 3, opacity: 0.75 }}
      >
        СЛЕДУЮЩАЯ СТАНЦИЯ
      </div>
      <div
        className="font-display"
        style={{
          color: glitching ? '#ffd060' : '#ff8c00',
          fontSize: 34,
          letterSpacing: 4,
          marginTop: 6,
          fontWeight: 'bold',
          whiteSpace: 'nowrap',
        }}
      >
        <GlitchText text={city.toUpperCase()} glitching={glitching} />
      </div>
      {tripCount > 0 && (
        <div
          className="font-display"
          style={{ color: '#ff8c00', fontSize: 11, letterSpacing: 2, opacity: 0.5, marginTop: 6 }}
        >
          петля #{tripCount}
        </div>
      )}
    </div>
  );
}
