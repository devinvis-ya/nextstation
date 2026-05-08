interface Props {
  progress: number;
}

const chipStyle: React.CSSProperties = {
  background: 'rgba(0,0,0,0.85)',
  border: '1px solid #ff8c00',
  borderRadius: 3,
  padding: '2px 8px',
  color: '#ff8c00',
  fontSize: 11,
  letterSpacing: 2,
  whiteSpace: 'nowrap',
  boxShadow: '0 0 6px rgba(255,140,0,0.25)',
};

export default function ProgressBar({ progress }: Props) {
  return (
    <div
      style={{
        position: 'absolute',
        bottom: 28,
        left: '50%',
        transform: 'translateX(-50%)',
        width: '80%',
        maxWidth: 880,
        zIndex: 25,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 6,
        pointerEvents: 'none',
      }}
    >
      <div
        className="font-display"
        style={{
          display: 'flex',
          width: '100%',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <span style={chipStyle}>МОСКВА</span>
        <span style={chipStyle}>{Math.floor(progress)}%</span>
        <span style={chipStyle}>СЕРГИЕВ ПОСАД</span>
      </div>
      <div
        style={{
          width: '100%',
          height: 8,
          background: 'rgba(0,0,0,0.78)',
          border: '1px solid #ff8c00',
          boxShadow: '0 0 10px rgba(255,140,0,0.3)',
          position: 'relative',
        }}
      >
        <div
          style={{
            width: `${progress}%`,
            height: '100%',
            background: 'linear-gradient(to right, #ff8c00, #ffd060)',
            boxShadow: '0 0 8px rgba(255,140,0,0.7)',
          }}
        />
        {/* Маркер позиции поезда */}
        <div
          style={{
            position: 'absolute',
            left: `calc(${progress}% - 6px)`,
            top: -4,
            width: 12,
            height: 16,
            background: '#ffd060',
            border: '1px solid #ff8c00',
            boxShadow: '0 0 6px rgba(255,208,96,0.85)',
          }}
        />
      </div>
    </div>
  );
}
