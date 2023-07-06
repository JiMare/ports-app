import React, { useEffect, useState } from "react";
import { Port } from "../api/apiTypes";
import { getPortById } from "../api/db";

type Props = {
  onClick: (id: number) => void;
  id: number;
};

export const PortCard: React.FC<Props> = ({ id, onClick }) => {
  const [port, setPort] = useState<Port | null>(null);
  useEffect(() => {
    getPortById(id).then((response) => response && setPort(response[0]));
  }, [id]);

  return (
    <div className="game__port" onClick={() => onClick(id)}>
      <h2>{port?.numbers?.join(", ")}</h2>
    </div>
  );
};
