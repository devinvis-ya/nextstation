import { useEffect, useRef, useState } from 'react';
import { pickRandomCity } from '../data/cities';

const HOME = 'Сергиев Посад';
const DURATION_BASE_SEC = 30;
const GLITCH_START = 98;
const SWAP_AT = 99;
const STATION_GLITCH_DELAY_MS = 1000;  // через 1с после остановки на станционном табло включается глитч
const ARRIVAL_GLITCH_END_MS = 2000;    // через 2с глитчи отключаются — оба табло чисто показывают новый город
const ARRIVAL_HOLD_MS = 4000;          // через 4с поезд трогается
const DEPARTURE_GLITCH_MS = 700;       // глитч при отправлении (возврат к "Сергиев Посад")

interface Result {
  progress: number;
  topCity: string;
  stationCity: string;
  arrivedCity: string | null;
  tripCount: number;
  topGlitching: boolean;
  stationGlitching: boolean;
  isStopped: boolean;
  onSwap: (cb: () => void) => void;
}

export function useJourney(speed: number): Result {
  const [progress, setProgress] = useState(0);
  const [topCity, setTopCity] = useState(HOME);
  const [stationCity, setStationCity] = useState(HOME);
  const [arrivedCity, setArrivedCity] = useState<string | null>(null);
  const [tripCount, setTripCount] = useState(0);
  const [topGlitching, setTopGlitching] = useState(false);
  const [stationGlitching, setStationGlitching] = useState(false);
  const [isStopped, setIsStopped] = useState(false);

  const speedRef = useRef(speed);
  const progressRef = useRef(0);
  const inArrivalRef = useRef(false);
  const topGlitchingApproachRef = useRef(false); // защита от повторного запуска top-глитча на подъезде
  const tripCountRef = useRef(0);
  const swapCallbackRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    speedRef.current = speed;
  }, [speed]);

  useEffect(() => {
    let raf = 0;
    let last = performance.now();
    const timeouts: number[] = [];

    const tick = (now: number) => {
      let dt = (now - last) / 1000;
      last = now;
      if (dt > 0.5) dt = 1 / 60;

      if (!inArrivalRef.current) {
        const delta = (dt * speedRef.current * 100) / DURATION_BASE_SEC;
        const next = Math.min(100, progressRef.current + delta);
        progressRef.current = next;
        setProgress(next);

        // Подъезд: глитч на верхнем табло начинается на 98%
        if (next >= GLITCH_START && !topGlitchingApproachRef.current) {
          topGlitchingApproachRef.current = true;
          setTopGlitching(true);
        }

        if (next >= SWAP_AT) {
          inArrivalRef.current = true;
          tripCountRef.current += 1;
          const arrived = pickRandomCity(HOME);

          // Прибыли: верхнее табло сразу меняет город (продолжая глитчить)
          setTopCity(arrived);
          setArrivedCity(arrived);
          setTripCount(tripCountRef.current);
          setIsStopped(true);

          // Сброс прогресса
          const reset = 5 + Math.random() * 5;
          progressRef.current = reset;
          setProgress(reset);

          // +1с — на станционном табло включается глитч и подменяется город
          timeouts.push(
            window.setTimeout(() => {
              setStationGlitching(true);
              setStationCity(arrived);
            }, STATION_GLITCH_DELAY_MS),
          );

          // +2с — оба глитча отключаются, чисто показывают прибывший город
          timeouts.push(
            window.setTimeout(() => {
              setTopGlitching(false);
              setStationGlitching(false);
            }, ARRIVAL_GLITCH_END_MS),
          );

          // +4с — поезд отправляется, оба табло переключаются обратно на HOME с глитчем
          timeouts.push(
            window.setTimeout(() => {
              setIsStopped(false);
              setTopCity(HOME);
              setStationCity(HOME);
              setTopGlitching(true);
              setStationGlitching(true);
              inArrivalRef.current = false;
              swapCallbackRef.current?.();

              // +DEPARTURE_GLITCH_MS — глитч заканчивается
              timeouts.push(
                window.setTimeout(() => {
                  setTopGlitching(false);
                  setStationGlitching(false);
                  setArrivedCity(null);
                  topGlitchingApproachRef.current = false; // готовы к следующему циклу
                }, DEPARTURE_GLITCH_MS),
              );
            }, ARRIVAL_HOLD_MS),
          );
        }
      }

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      timeouts.forEach((t) => window.clearTimeout(t));
    };
  }, []);

  const onSwap = (cb: () => void) => {
    swapCallbackRef.current = cb;
  };

  return {
    progress,
    topCity,
    stationCity,
    arrivedCity,
    tripCount,
    topGlitching,
    stationGlitching,
    isStopped,
    onSwap,
  };
}
