import React from "react";
import { QuestionMark } from "./QuestionMark";

type Props = {
  guess: string;
};

export const GameCard: React.FC<Props> = ({ guess }) => {
  return (
    <div className="card game__card">
      <h2 className="card__title">{guess}</h2>
      <hr />
      <QuestionMark />
    </div>
  );
};
