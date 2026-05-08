type Speed = 0.5 | 1 | 2 | 5;

interface Props {
  value: Speed;
  onChange: (s: Speed) => void;
}

const OPTIONS: Speed[] = [0.5, 1, 2, 5];

export default function SpeedSelector({ value, onChange }: Props) {
  return (
    <div
      style={{
        position: 'absolute',
        top: 14,
        right: 14,
        zIndex: 30,
        background: 'rgba(0,0,0,0.78)',
        border: '1px solid #ff8c00',
        borderRadius: 6,
        padding: '6px 8px',
        boxShadow: '0 0 12px rgba(255,140,0,0.2)',
      }}
      onClick={(e) => e.stopPropagation()}
    >
      <div
        className="font-display"
        style={{
          color: '#ff8c00',
          fontSize: 9,
          letterSpacing: 2,
          opacity: 0.7,
          textAlign: 'center',
          marginBottom: 4,
        }}
      >
        СКОРОСТЬ
      </div>
      <div style={{ display: 'flex', gap: 4 }}>
        {OPTIONS.map((opt) => {
          const active = value === opt;
          return (
            <button
              key={opt}
              onClick={() => onChange(opt)}
              className="font-display"
              style={{
                background: active ? '#ff8c00' : 'transparent',
                color: active ? '#000' : '#ff8c00',
                border: '1px solid #ff8c00',
                borderRadius: 4,
                padding: '4px 10px',
                fontSize: 13,
                fontWeight: active ? 'bold' : 'normal',
                cursor: 'pointer',
                minWidth: 42,
                boxShadow: active ? '0 0 8px rgba(255,140,0,0.6)' : 'none',
                transition: 'background 0.15s, color 0.15s',
              }}
            >
              {opt}×
            </button>
          );
        })}
      </div>
    </div>
  );
}
