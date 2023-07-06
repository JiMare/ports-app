import React, { useState, useEffect } from "react";

type Props = {
  onEnd: () => void;
  endGame: boolean;
  onRestTime: (time: number) => void;
};

export const CountDown: React.FC<Props> = ({ onEnd, endGame, onRestTime }) => {
  const [seconds, setSeconds] = useState(120);

  useEffect(() => {
    if (seconds === 0) {
      onEnd();
    }
    if (endGame) {
      onRestTime(seconds);
    }
    const interval = setInterval(() => {
      if (endGame) {
        clearInterval(interval);
      } else {
        setSeconds((seconds) => (seconds > 0 ? seconds - 1 : 0));
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [seconds, onEnd, endGame, onRestTime]);

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  return (
    <div className="countdown">
      {minutes}:
      {remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds}
    </div>
  );
};
