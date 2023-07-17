import React from "react";
import { Modal } from "../Modal";
import { Port } from "../../api/apiTypes";
import { Games } from "../../pages/Overview";

type Props = {
  onConfirm: () => void;
  card: Port | null;
  typeOfGame: Games;
};

export const ErrorModal: React.FC<Props> = ({
  onConfirm,
  card,
  typeOfGame,
}) => {
  return (
    <Modal onConfirm={onConfirm}>
      <h3 className="error__text">No!</h3>
      <h2>Right answer was:</h2>
      <h2>
        {typeOfGame === Games.PORTS ? card?.numbers.join(", ") : card?.name}
      </h2>
      <button className="back__btn gradient" onClick={onConfirm}>
        Back to game
      </button>
    </Modal>
  );
};
