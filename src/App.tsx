import { useCallback, useEffect, useMemo, useState } from 'react';
import TrainWindow from './components/TrainWindow';
import Interior from './components/Interior';
import StatusBar from './components/StatusBar';
import ProgressBar from './components/ProgressBar';
import SpeedSelector from './components/SpeedSelector';
import MuteButton from './components/MuteButton';
import TrainCars from './components/TrainCars';
import Station from './components/Station';
import { useJourney } from './hooks/useJourney';
import { useTimeOfDay } from './hooks/useTimeOfDay';
import { useTrainSound } from './hooks/useTrainSound';
import { PALETTES, applyPaletteToRoot } from './theme/palette';

type Speed = 0.5 | 1 | 2 | 5;

// Точка, в которой здание стоит относительно центра экрана (правее поезда)
const STATION_REST_OFFSET = 280;
// Кулиса справа/слева
const STATION_OFF_RIGHT = 800;
const STATION_OFF_LEFT = -1200;

type StationPhase = 'far' | 'approaching' | 'stopped' | 'departing';

export default function App() {
  const [speed, setSpeed] = useState<Speed>(1);
  const [size, setSize] = useState({ w: window.innerWidth, h: window.innerHeight });

  const {
    progress,
    topCity,
    stationCity,
    arrivedCity,
    tripCount,
    topGlitching,
    stationGlitching,
    isStopped,
    onSwap,
  } = useJourney(speed);
  const { phase, cycle } = useTimeOfDay({ progress, registerSwapCallback: onSwap });
  const { muted, toggleMute, kick } = useTrainSound({ speed });

  useEffect(() => {
    applyPaletteToRoot(PALETTES[phase]);
  }, [phase]);

  useEffect(() => {
    const onResize = () => setSize({ w: window.innerWidth, h: window.innerHeight });
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const onWindowClick = useCallback(() => {
    kick();
    cycle();
  }, [kick, cycle]);

  const stationPhase: StationPhase = useMemo(() => {
    if (isStopped) return 'stopped';
    if (arrivedCity !== null) return 'departing';
    if (progress >= 95) return 'approaching';
    return 'far';
  }, [isStopped, arrivedCity, progress]);

  const stationX = useMemo(() => {
    switch (stationPhase) {
      case 'far':
        return STATION_OFF_RIGHT;
      case 'approaching': {
        // 95% → STATION_OFF_RIGHT, 99% → 0
        const t = Math.min(1, Math.max(0, (progress - 95) / 4));
        return STATION_OFF_RIGHT * (1 - t);
      }
      case 'stopped':
        return 0;
      case 'departing':
        return STATION_OFF_LEFT;
    }
  }, [stationPhase, progress]);

  const stationTransition = useMemo(() => {
    switch (stationPhase) {
      case 'far':
        return 'transform 0s linear'; // мгновенный сброс
      case 'approaching':
        return 'transform 0.15s linear';
      case 'stopped':
        return 'transform 0.6s ease-out';
      case 'departing':
        return 'transform 1.4s ease-in';
    }
  }, [stationPhase]);

  return (
    <div
      style={{
        position: 'relative',
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        background: '#000',
      }}
    >
      <TrainWindow speed={speed} paused={isStopped} onWindowClick={onWindowClick} />
      <Interior windowWidth={size.w} windowHeight={size.h} />
      <StatusBar city={topCity} glitching={topGlitching} tripCount={tripCount} />

      {/* Станция: въезжает справа на 95-99%, стоит в "stopped", выезжает влево при отправлении */}
      <div
        style={{
          position: 'absolute',
          left: '50%',
          bottom: 96,
          transform: `translateX(${STATION_REST_OFFSET}px)`,
          zIndex: 14,
          pointerEvents: 'none',
        }}
      >
        <div
          style={{
            transform: `translateX(${stationX}px)`,
            transition: stationTransition,
          }}
        >
          <Station city={stationCity} glitching={stationGlitching} />
        </div>
      </div>

      {/* Поезд на рельсах — колёса на уровне рельсов параллакса */}
      <div
        style={{
          position: 'absolute',
          left: '50%',
          bottom: 96,
          transform: 'translateX(-50%)',
          zIndex: 15,
          pointerEvents: 'none',
        }}
      >
        <TrainCars paused={isStopped} />
      </div>

      <ProgressBar progress={progress} />
      <SpeedSelector
        value={speed}
        onChange={(s) => {
          kick();
          setSpeed(s);
        }}
      />
      <MuteButton
        muted={muted}
        onToggle={() => {
          kick();
          toggleMute();
        }}
      />
    </div>
  );
}
