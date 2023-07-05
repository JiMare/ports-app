import React, { useEffect, useState } from "react";
import { Port } from "../api/apiTypes";
import { GameCard } from "../components/GameCard";
import { getCardToGuess } from "../utils/getCardToGuess";
import { getPortsData } from "../api/db";
import { PortCard } from "../components/PortCard";
import { getRandomPorts } from "../utils/getRandomPorts";
import { ProgressBar } from "../components/ProgressBar";
import { CountDown } from "../components/CountDown";

export type PortCardType = {
  id: number;
  numbers?: number[];
};

export const Game: React.FC = () => {
  const [portsData, setPortsData] = useState<Port[]>([]);
  const [card, setCard] = useState<Port | null>(null);

  const [progress, setProgress] = useState(0);
  const [errors, setErrors] = useState(0);

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
    }
  }, [portsData]);

  const onNextStep = (id: number) => {
    if (id === card?.id) {
      setProgress((prev) => prev + 1);
    } else {
      setErrors((prev) => prev + 1);
    }
    setPortsData((prev) => [...prev.filter((port) => port.id !== card?.id)]);
  };

  return (
    <div className="game">
      <div className="progress-bars">
        <ProgressBar progress={progress * (100 / 27)} label="Success" />
        <ProgressBar progress={errors * (100 / 3)} label="Error" />
      </div>
      <CountDown />
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
    </div>
  );
};
