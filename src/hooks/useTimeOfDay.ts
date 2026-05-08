import { useCallback, useEffect, useRef, useState } from 'react';
import type { Phase } from '../theme/palette';

function autoPhase(progress: number): Phase {
  if (progress < 33) return 'day';
  if (progress < 66) return 'sunset';
  return 'night';
}

const ORDER: Phase[] = ['day', 'sunset', 'night'];

interface Args {
  progress: number;
  registerSwapCallback: (cb: () => void) => void;
}

export function useTimeOfDay({ progress, registerSwapCallback }: Args) {
  const [manualPhase, setManualPhase] = useState<Phase | null>(null);
  const manualRef = useRef<Phase | null>(null);
  manualRef.current = manualPhase;

  useEffect(() => {
    registerSwapCallback(() => setManualPhase(null));
  }, [registerSwapCallback]);

  const cycle = useCallback(() => {
    setManualPhase((curr) => {
      const startFrom = curr ?? autoPhase(progress);
      const idx = ORDER.indexOf(startFrom);
      return ORDER[(idx + 1) % ORDER.length]!;
    });
  }, [progress]);

  const phase: Phase = manualPhase ?? autoPhase(progress);
  return { phase, cycle };
}
