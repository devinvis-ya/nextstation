import { Volume2, VolumeX } from 'lucide-react';

interface Props {
  muted: boolean;
  onToggle: () => void;
  mobile?: boolean;
}

export default function MuteButton({ muted, onToggle, mobile = false }: Props) {
  const size = mobile ? 13 : 18;
  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        onToggle();
      }}
      style={{
        position: 'absolute',
        // На мобиле — в верхнем левом углу, чтобы не перекрывать прогресс-бар
        top: mobile ? 6 : undefined,
        left: mobile ? 6 : undefined,
        bottom: mobile ? undefined : 16,
        right: mobile ? undefined : 16,
        zIndex: 30,
        background: 'rgba(0,0,0,0.78)',
        border: '1px solid #ff8c00',
        borderRadius: 6,
        padding: mobile ? 4 : 8,
        color: '#ff8c00',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
      }}
      aria-label={muted ? 'Включить звук' : 'Выключить звук'}
    >
      {muted ? <VolumeX size={size} /> : <Volume2 size={size} />}
    </button>
  );
}
