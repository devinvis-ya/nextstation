type Speed = 0.5 | 1 | 2 | 5;

interface Props {
  value: Speed;
  onChange: (s: Speed) => void;
  mobile?: boolean;
}

const OPTIONS: Speed[] = [0.5, 1, 2, 5];

export default function SpeedSelector({ value, onChange, mobile = false }: Props) {
  return (
    <div
      style={{
        position: 'absolute',
        // Mobile: ниже status-bar по центру, не конфликтует с ним по горизонтали
        top: mobile ? 56 : 14,
        left: mobile ? '50%' : undefined,
        right: mobile ? undefined : 14,
        transform: mobile ? 'translateX(-50%)' : undefined,
        zIndex: 30,
        background: 'rgba(0,0,0,0.8)',
        border: '1px solid #ff8c00',
        borderRadius: 5,
        padding: mobile ? '2px 3px' : '6px 8px',
        boxShadow: '0 0 12px rgba(255,140,0,0.2)',
      }}
      onClick={(e) => e.stopPropagation()}
    >
      {!mobile && (
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
      )}
      <div style={{ display: 'flex', gap: mobile ? 2 : 4 }}>
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
                borderRadius: 3,
                padding: mobile ? '1px 3px' : '4px 10px',
                fontSize: mobile ? 9 : 13,
                fontWeight: active ? 'bold' : 'normal',
                cursor: 'pointer',
                minWidth: mobile ? 22 : 42,
                lineHeight: 1.1,
                fontFamily: mobile ? 'system-ui, sans-serif' : undefined,
                boxShadow: active ? '0 0 8px rgba(255,140,0,0.6)' : 'none',
                transition: 'background 0.15s, color 0.15s',
                whiteSpace: 'nowrap',
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
