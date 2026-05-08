import WindowFrame from '../art/interior/WindowFrame';

interface Props {
  windowWidth: number;
  windowHeight: number;
  mobile?: boolean;
}

export default function Interior({ windowWidth, windowHeight, mobile = false }: Props) {
  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
      <WindowFrame width={windowWidth} height={windowHeight} mobile={mobile} />
    </div>
  );
}
