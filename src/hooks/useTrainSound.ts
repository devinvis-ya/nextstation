import { useCallback, useEffect, useRef, useState } from 'react';

interface Args {
  speed: number;
}

export function useTrainSound({ speed }: Args) {
  const [muted, setMuted] = useState(false);
  const ctxRef = useRef<AudioContext | null>(null);
  const masterRef = useRef<GainNode | null>(null);
  const noiseBufferRef = useRef<AudioBuffer | null>(null);
  const timerRef = useRef<number | null>(null);
  const speedRef = useRef(speed);
  const mutedRef = useRef(muted);

  useEffect(() => {
    speedRef.current = speed;
  }, [speed]);

  useEffect(() => {
    mutedRef.current = muted;
    if (masterRef.current) {
      masterRef.current.gain.value = muted ? 0 : 0.7;
    }
  }, [muted]);

  const ensureContext = useCallback(() => {
    if (ctxRef.current) return ctxRef.current;
    const Ctx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!Ctx) return null;
    const ctx = new Ctx();
    const master = ctx.createGain();
    master.gain.value = mutedRef.current ? 0 : 0.7;
    master.connect(ctx.destination);

    const seconds = 0.06;
    const buf = ctx.createBuffer(1, ctx.sampleRate * seconds, ctx.sampleRate);
    const data = buf.getChannelData(0);
    for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;

    ctxRef.current = ctx;
    masterRef.current = master;
    noiseBufferRef.current = buf;
    return ctx;
  }, []);

  const playKnock = useCallback(() => {
    const ctx = ctxRef.current;
    const master = masterRef.current;
    const buf = noiseBufferRef.current;
    if (!ctx || !master || !buf) return;

    const src = ctx.createBufferSource();
    src.buffer = buf;
    const lp = ctx.createBiquadFilter();
    lp.type = 'lowpass';
    lp.frequency.value = 220;
    const g = ctx.createGain();
    const t = ctx.currentTime;
    g.gain.setValueAtTime(0, t);
    g.gain.linearRampToValueAtTime(0.9, t + 0.005);
    g.gain.exponentialRampToValueAtTime(0.001, t + 0.06);
    src.connect(lp).connect(g).connect(master);
    src.start();
    src.stop(t + 0.07);
  }, []);

  const startLoop = useCallback(() => {
    const tick = () => {
      playKnock();
      window.setTimeout(playKnock, 80);
      const interval = 800 / speedRef.current;
      timerRef.current = window.setTimeout(tick, interval);
    };
    tick();
  }, [playKnock]);

  const kick = useCallback(() => {
    const ctx = ensureContext();
    if (!ctx) return;
    if (ctx.state === 'suspended') ctx.resume();
    if (timerRef.current === null) startLoop();
  }, [ensureContext, startLoop]);

  useEffect(() => {
    return () => {
      if (timerRef.current !== null) window.clearTimeout(timerRef.current);
      ctxRef.current?.close();
    };
  }, []);

  const toggleMute = useCallback(() => setMuted((m) => !m), []);

  return { muted, toggleMute, kick };
}
