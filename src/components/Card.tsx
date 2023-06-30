import React from "react";
import { Port } from "../api/apiTypes";

type Props = {
  port: Port;
};

export const Card: React.FC<Props> = ({ port }) => {
  return (
    <div className="card">
      <h2>{port.name}</h2>
    </div>
  );
};
