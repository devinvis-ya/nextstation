import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const GLITCH_CHARS = 'АБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ#@*$%&!?';

function randChar(): string {
  return GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)]!;
}

function corrupt(text: string): string {
  return text
    .split('')
    .map((c) => (c !== ' ' && Math.random() < 0.3 ? randChar() : c))
    .join('');
}

interface Props {
  text: string;
  glitching: boolean;
  className?: string;
}

export default function GlitchText({ text, glitching, className }: Props) {
  const [display, setDisplay] = useState(text);

  useEffect(() => {
    if (!glitching) {
      setDisplay(text);
      return;
    }
    const id = window.setInterval(() => setDisplay(corrupt(text)), 80);
    return () => window.clearInterval(id);
  }, [glitching, text]);

  if (!glitching) {
    return <span className={className}>{text}</span>;
  }

  return (
    <motion.span
      className={className}
      style={{ position: 'relative', display: 'inline-block', whiteSpace: 'nowrap' }}
      animate={{ x: [-1, 1, -1, 0] }}
      transition={{ duration: 0.12, repeat: Infinity }}
    >
      <span
        style={{
          position: 'absolute',
          left: -2,
          top: 0,
          right: 'auto',
          width: '100%',
          color: '#ff3030',
          mixBlendMode: 'screen',
          pointerEvents: 'none',
          whiteSpace: 'nowrap',
        }}
      >
        {display}
      </span>
      <span
        style={{
          position: 'absolute',
          left: 2,
          top: 0,
          right: 'auto',
          width: '100%',
          color: '#30e0ff',
          mixBlendMode: 'screen',
          pointerEvents: 'none',
          whiteSpace: 'nowrap',
        }}
      >
        {display}
      </span>
      <span style={{ position: 'relative', whiteSpace: 'nowrap' }}>{display}</span>
    </motion.span>
  );
}
