import { CSSProperties, ReactNode, useId, useMemo } from 'react';

interface Props {
  children: ReactNode;
  width: number;
  speedFactor: number;
  speed: number;
  bottom?: number;
  height?: number;
  basePxPerSec?: number;
  paused?: boolean;
}

export default function ParallaxLayer({
  children,
  width,
  speedFactor,
  speed,
  bottom = 0,
  height,
  basePxPerSec = 400,
  paused = false,
}: Props) {
  const duration = useMemo(() => {
    const v = basePxPerSec * speedFactor * speed;
    return v > 0 ? width / v : 9999;
  }, [basePxPerSec, speedFactor, speed, width]);

  // Уникальный @keyframes на инстанс
  const rawId = useId();
  const id = useMemo(() => `pl${rawId.replace(/[^a-zA-Z0-9]/g, '')}`, [rawId]);

  const innerStyle = useMemo<CSSProperties>(
    () => ({
      display: 'flex',
      width: width * 3,
      animation: `${id} ${duration}s linear infinite`,
      animationPlayState: paused ? 'paused' : 'running',
      willChange: 'transform',
    }),
    [duration, id, paused, width],
  );

  return (
    <>
      <style>{`@keyframes ${id} { from { transform: translate3d(0,0,0); } to { transform: translate3d(${-width}px,0,0); } }`}</style>
      <div
        style={{
          position: 'absolute',
          bottom,
          left: 0,
          right: 0,
          height,
          pointerEvents: 'none',
          overflow: 'hidden',
        }}
      >
        <div style={innerStyle}>
          {children}
          {children}
          {children}
        </div>
      </div>
    </>
  );
}
