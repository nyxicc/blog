import { useEffect, useState } from 'react';

const HEX = '0123456789abcdef';
const randomHex = (len: number) =>
  Array.from({ length: len }, () => HEX[Math.floor(Math.random() * HEX.length)]).join('');

interface Props {
  text: string;
  className?: string;
}

export default function HashTitle({ text, className }: Props) {
  const [decoded, setDecoded] = useState('');
  const [scramble, setScramble] = useState('');
  const [done, setDone] = useState(false);

  useEffect(() => {
    const hashLen = text.length;
    let decodedCount = 0;
    let typing = 0;

    // Phase 1: type out the initial hash character by character
    const typeInterval = setInterval(() => {
      typing++;
      setScramble(randomHex(hashLen).slice(0, typing));
      if (typing >= hashLen) {
        clearInterval(typeInterval);

        // Phase 2: scramble the full hash rapidly
        const scrambleInterval = setInterval(() => {
          setScramble(randomHex(hashLen - decodedCount));
        }, 15);

        // Phase 3: decode one char at a time while scramble continues
        setTimeout(() => {
          const decodeInterval = setInterval(() => {
            decodedCount++;
            setDecoded(text.slice(0, decodedCount));
            if (decodedCount >= text.length) {
              clearInterval(decodeInterval);
              clearInterval(scrambleInterval);
              setScramble('');
              setDone(true);
            }
          }, 15);
        }, 50);
      }
    }, 8);

    return () => clearInterval(typeInterval);
  }, [text]);

  return (
    <span className={className}>
      {decoded}
      {!done && (
        <span style={{ color: '#4ade80' }}>{scramble}</span>
      )}
    </span>
  );
}
