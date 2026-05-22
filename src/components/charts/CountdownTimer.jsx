import { useEffect, useState } from "react";

function getTimeLeft(target) {
  const diff = Math.max(0, target.getTime() - Date.now());
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);
  return { days, hours, minutes, seconds };
}

function TimeBlock({ value, label }) {
  return (
    <div className="flex flex-col items-center min-w-[64px] md:min-w-[80px]">
      <span
        className="text-2xl md:text-4xl font-bold tabular-nums"
        style={{ color: "var(--text-color)" }}
      >
        {String(value).padStart(2, "0")}
      </span>
      <span className="text-xs mt-1 uppercase tracking-wide" style={{ color: "var(--text-light-color)" }}>
        {label}
      </span>
    </div>
  );
}

export default function CountdownTimer({ target }) {
  const [timeLeft, setTimeLeft] = useState(() => getTimeLeft(target));

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getTimeLeft(target));
    }, 1000);
    return () => clearInterval(timer);
  }, [target]);

  return (
    <div className="flex items-center justify-center gap-3 md:gap-6">
      <TimeBlock value={timeLeft.days} label="Days" />
      <span className="text-2xl font-bold" style={{ color: "var(--text-light-color)" }}>:</span>
      <TimeBlock value={timeLeft.hours} label="Hours" />
      <span className="text-2xl font-bold" style={{ color: "var(--text-light-color)" }}>:</span>
      <TimeBlock value={timeLeft.minutes} label="Min" />
      <span className="text-2xl font-bold" style={{ color: "var(--text-light-color)" }}>:</span>
      <TimeBlock value={timeLeft.seconds} label="Sec" />
    </div>
  );
}
