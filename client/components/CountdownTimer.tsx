'use client';

import { useState, useEffect } from 'react';

interface CountdownTimerProps {
  targetDate: string;
}

export default function CountdownTimer({ targetDate }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = +new Date(targetDate) - +new Date();
      
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const TimeBox = ({ value, label }: { value: number; label: string }) => (
    <div className="flex flex-col items-center mx-2">
      <div className="bg-zinc-900 border border-zinc-700 w-16 h-16 md:w-20 md:h-20 flex items-center justify-center rounded-lg mb-2">
        <span className="text-2xl md:text-3xl font-bold font-mono text-primary">
          {value.toString().padStart(2, '0')}
        </span>
      </div>
      <span className="text-xs uppercase tracking-widest text-zinc-500">{label}</span>
    </div>
  );

  return (
    <div className="flex justify-center items-center py-6">
      <TimeBox value={timeLeft.days} label="Days" />
      <span className="text-2xl font-bold text-zinc-700 mb-6">:</span>
      <TimeBox value={timeLeft.hours} label="Hours" />
      <span className="text-2xl font-bold text-zinc-700 mb-6">:</span>
      <TimeBox value={timeLeft.minutes} label="Mins" />
      <span className="text-2xl font-bold text-zinc-700 mb-6">:</span>
      <TimeBox value={timeLeft.seconds} label="Secs" />
    </div>
  );
}
