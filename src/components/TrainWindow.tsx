import ParallaxLayer from './ParallaxLayer';
import Sky, { SKY_WIDTH, SKY_HEIGHT } from '../art/layers/Sky';
import Forest, { FOREST_WIDTH, FOREST_HEIGHT } from '../art/layers/Forest';
import Poles, { POLES_WIDTH, POLES_HEIGHT } from '../art/layers/Poles';

interface Props {
  speed: number;
  paused?: boolean;
  mobile?: boolean;
  onWindowClick: () => void;
}

export default function TrainWindow({ speed, paused = false, mobile = false, onWindowClick }: Props) {
  // Должно совпадать с BOTTOM_FRAME в WindowFrame.tsx
  const BOTTOM_FRAME = mobile ? 56 : 92;

  return (
    <div
      onClick={onWindowClick}
      style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(to bottom, var(--color-sky-top), var(--color-sky-bot))',
        transition: 'background 1.2s ease',
        cursor: 'pointer',
        overflow: 'hidden',
      }}
    >
      <ParallaxLayer
        width={SKY_WIDTH}
        speedFactor={0.05}
        speed={speed}
        paused={paused}
        bottom={BOTTOM_FRAME + (mobile ? 80 : 120)}
        height={SKY_HEIGHT}
      >
        <Sky />
      </ParallaxLayer>
      <ParallaxLayer
        width={FOREST_WIDTH}
        speedFactor={0.3}
        speed={speed}
        paused={paused}
        bottom={BOTTOM_FRAME + (mobile ? 40 : 60)}
        height={FOREST_HEIGHT}
      >
        <Forest />
      </ParallaxLayer>
      <ParallaxLayer
        width={POLES_WIDTH}
        speedFactor={1.0}
        speed={speed}
        paused={paused}
        bottom={BOTTOM_FRAME}
        height={POLES_HEIGHT}
      >
        <Poles />
      </ParallaxLayer>
    </div>
  );
}
