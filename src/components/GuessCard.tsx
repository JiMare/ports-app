import React, { useEffect, useState } from "react";
import { Port } from "../api/apiTypes";
import { getPortById } from "../api/db";
import { Games } from "../pages/Overview";

type Props = {
  onClick: (id: number) => void;
  id: number;
  typeOfGame: Games;
};

export const GuessCard: React.FC<Props> = ({ id, onClick, typeOfGame }) => {
  const [port, setPort] = useState<Port | null>(null);
  useEffect(() => {
    getPortById(id).then((response) => response && setPort(response[0]));
  }, [id]);

  return (
    <div className="game__guess-card" onClick={() => onClick(id)}>
      <h2 className="game__guess-title">
        {typeOfGame === Games.PORTS ? port?.numbers?.join(", ") : port?.name}
      </h2>
    </div>
  );
};
