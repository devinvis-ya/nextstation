import WindowFrame from '../art/interior/WindowFrame';

interface Props {
  windowWidth: number;
  windowHeight: number;
}

export default function Interior({ windowWidth, windowHeight }: Props) {
  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
      <WindowFrame width={windowWidth} height={windowHeight} />
    </div>
  );
}
