import { useCallback, useEffect, useState } from 'react';
import { RefreshCw } from 'lucide-react';

const ALPHABET = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';

function makeCode() {
  let out = '';
  for (let i = 0; i < 5; i += 1) {
    out += ALPHABET[Math.floor(Math.random() * ALPHABET.length)];
  }
  return out;
}

/** Deterministic per-index jitter so the mock captcha keeps a hand-drawn feel. */
const JITTER = [
  { dy: 4, rot: -11, dy2: -3 },
  { dy: -2, rot: 8, dy2: 3 },
  { dy: 6, rot: -6, dy2: -5 },
  { dy: -4, rot: 12, dy2: 2 },
  { dy: 3, rot: -9, dy2: 5 },
];

export default function Captcha({
  code,
  onRefresh,
}: {
  code: string;
  onRefresh: () => void;
}) {
  return (
    <div className="captcha-box">
      <svg width="132" height="52" viewBox="0 0 132 52" role="img" aria-label={`Captcha code ${code}`}>
        <rect width="132" height="52" fill="#f4f4f0" />
        <path d="M-4 14 C 30 4, 60 26, 136 10" stroke="#7665ff" strokeWidth="1" fill="none" opacity="0.35" />
        <path d="M-4 40 C 40 50, 80 28, 136 44" stroke="#a8e62e" strokeWidth="1" fill="none" opacity="0.5" />
        <circle cx="20" cy="44" r="1.4" fill="#111111" opacity="0.25" />
        <circle cx="112" cy="12" r="1.2" fill="#111111" opacity="0.2" />
        <circle cx="96" cy="44" r="1" fill="#7665ff" opacity="0.4" />
        {code.split('').map((char, i) => {
          const j = JITTER[i % JITTER.length];
          const x = 13 + i * 20;
          return (
            <text
              key={`${char}-${i}`}
              x={x}
              y={36 + j.dy}
              transform={`rotate(${j.rot} ${x} ${36 + j.dy})`}
              fontFamily="DM Mono, monospace"
              fontSize="23"
              fontWeight="500"
              fill={i === 1 ? '#7665ff' : i === 3 ? '#82b91a' : '#111111'}
              letterSpacing="1"
            >
              {char}
            </text>
          );
        })}
      </svg>
      <button type="button" className="captcha-refresh" onClick={onRefresh} aria-label="Refresh captcha">
        <RefreshCw size={11} strokeWidth={2} />
      </button>
    </div>
  );
}

/** Hook that owns the mock captcha code and its refresh handler. */
export function useCaptcha() {
  const [code, setCode] = useState(makeCode);

  const refresh = useCallback(() => setCode(makeCode()), []);

  useEffect(() => {
    setCode(makeCode());
  }, []);

  return { code, refresh };
}
