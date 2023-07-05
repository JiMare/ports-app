import React from "react";
import { QuestionMark } from "./QuestionMark";

type Props = {
  name: string;
};

export const GameCard: React.FC<Props> = ({ name }) => {
  return (
    <div className="card game__card">
      <h2 className="card__title">{name}</h2>
      <hr />
      <QuestionMark />
    </div>
  );
};
