import React, { useEffect, useState } from "react";
import { Port } from "../api/apiTypes";
import { GameCard } from "../components/GameCard";
import { getCardToGuess } from "../utils/getCardToGuess";
import { getPortsData } from "../api/db";
import { PortCard } from "../components/PortCard";
import { getRandomPorts } from "../utils/getRandomPorts";
import { ProgressBar } from "../components/ProgressBar";
import { CountDown } from "../components/CountDown";
import { useNavigate } from "react-router-dom";

export type PortCardType = {
  id: number;
  numbers?: number[];
};

export const Game: React.FC = () => {
  const navigate = useNavigate();

  const [portsData, setPortsData] = useState<Port[]>([]);
  const [card, setCard] = useState<Port | null>(null);

  const [restTime, setRestTime] = useState(0);

  const [progress, setProgress] = useState(0);
  const [errors, setErrors] = useState(0);

  const [endGame, setEndGame] = useState(false);

  useEffect(() => {
    getPortsData().then((response) => {
      if (response) {
        setPortsData(response);
      }
    });
  }, []);

  useEffect(() => {
    if (portsData.length > 0) {
      setCard(getCardToGuess(portsData));
    } else if (portsData.length === 0 && (errors !== 0 || progress !== 0)) {
      setEndGame(true);
    }
    if (errors === 3) setEndGame(true);
  }, [portsData, errors, progress]);

  useEffect(() => {
    const getPoints = (rest: number) => {
      if (errors === 3) {
        return progress;
      } else {
        return Math.ceil(rest / 10) + progress;
      }
    };
    if (endGame) console.log("end game modal", restTime, getPoints(restTime));
  }, [endGame, restTime, errors, progress]);

  const onNextStep = (id: number) => {
    if (id === card?.id) {
      setProgress((prev) => prev + 1);
    } else {
      setErrors((prev) => prev + 1);
    }
    setPortsData((prev) => [...prev.filter((port) => port.id !== card?.id)]);
  };

  const onRestTime = (time: number) => {
    setRestTime(time);
  };

  return (
    <div className="game">
      <div className="progress-bars">
        <ProgressBar progress={progress * (100 / 27)} label="Success" />
        <ProgressBar progress={errors * (100 / 3)} label="Error" />
      </div>
      <CountDown
        onEnd={() => setEndGame(true)}
        endGame={endGame}
        onRestTime={onRestTime}
      />
      {card && (
        <>
          <GameCard name={card.name} />
          <div className="game__ports">
            {getRandomPorts(card.id).map((id) => (
              <PortCard key={id} id={id} onClick={onNextStep} />
            ))}
          </div>
        </>
      )}
      <button className="back__btn gradient back" onClick={() => navigate("/")}>
        Back to learn
      </button>
    </div>
  );
};
