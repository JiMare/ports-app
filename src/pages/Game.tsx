import React, { useEffect, useState } from "react";
import { Port } from "../api/apiTypes";
import { GameCard } from "../components/GameCard";
import { getCardToGuess } from "../utils/getCardToGuess";
import { getPortsData } from "../api/db";
import { PortCard } from "../components/PortCard";
import { getRandomPorts } from "../utils/getRandomPorts";

export type PortCardType = {
  id: number;
  numbers?: number[];
};

export const Game: React.FC = () => {
  const [portsData, setPortsData] = useState<Port[]>([]);
  const [card, setCard] = useState<Port | null>(null);

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

  return (
    <div className="game">
      {card && (
        <>
          <GameCard name={card.name} />
          <div className="game__ports">
            {getRandomPorts(card.id).map((id) => (
              <PortCard key={id} id={id} />
            ))}
          </div>
          <button
            onClick={() =>
              setPortsData((prev) => [
                ...prev.filter((port) => port.id !== card.id),
              ])
            }
          >
            next
          </button>
        </>
      )}
    </div>
  );
};
