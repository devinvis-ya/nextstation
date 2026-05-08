import { Volume2, VolumeX } from 'lucide-react';

interface Props {
  muted: boolean;
  onToggle: () => void;
}

export default function MuteButton({ muted, onToggle }: Props) {
  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        onToggle();
      }}
      style={{
        position: 'absolute',
        bottom: 16,
        right: 16,
        zIndex: 30,
        background: 'rgba(0,0,0,0.6)',
        border: '1px solid #ff8c00',
        borderRadius: 6,
        padding: 8,
        color: '#ff8c00',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
      }}
      aria-label={muted ? 'Включить звук' : 'Выключить звук'}
    >
      {muted ? <VolumeX size={18} /> : <Volume2 size={18} />}
    </button>
  );
}
