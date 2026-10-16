import styles from './ChristmasLights.module.css';

// Decorative only; the brief glow settles rather than looping while people read.
export default function ChristmasLights() {
  return <div aria-hidden="true" className="pointer-events-none overflow-hidden bg-[#25382f]">
    <svg viewBox="0 0 1000 48" preserveAspectRatio="xMidYMid slice" className="h-12 w-full min-w-[640px]">
      <path d="M0 8 Q125 36 250 8 Q375 36 500 8 Q625 36 750 8 Q875 36 1000 8" fill="none" stroke="#b9a779" strokeWidth="1" opacity="0.65" />
      {Array.from({ length: 20 }, (_, index) => {
        const x = index * 50 + 25;
        const t = (x % 250) / 250;
        const y = 8 + 56 * t * (1 - t);
        return <g key={x} className={styles.bulb}>
          <path d={`M${x} ${y} v5`} stroke="#b9a779" strokeWidth="1.5" />
          <circle cx={x} cy={y + 9} r="9" fill="#e8bc64" opacity="0.13" />
          <ellipse cx={x} cy={y + 9} rx="2.6" ry="4" fill="#ffe6ab" />
        </g>;
      })}
    </svg>
  </div>;
}
