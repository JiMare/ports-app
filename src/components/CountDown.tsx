import React, { useState, useEffect } from "react";

type Props = {
  onEnd: () => void;
};

export const CountDown: React.FC<Props> = ({ onEnd }) => {
  const [seconds, setSeconds] = useState(120);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((seconds) => seconds - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (seconds === 0) onEnd();
  }, [seconds, onEnd]);

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  return (
    <div className="countdown">
      {minutes}:
      {remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds}
    </div>
  );
};
