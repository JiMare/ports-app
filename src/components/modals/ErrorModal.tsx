import React from "react";
import { Modal } from "../Modal";
import { Port } from "../../api/apiTypes";

type Props = {
  onConfirm: () => void;
  card: Port | null;
};

export const ErrorModal: React.FC<Props> = ({ onConfirm, card }) => {
  return (
    <Modal onConfirm={onConfirm}>
      <h3 className="error__text">No!</h3>
      <h2>Right answer was:</h2>
      <h2>{card?.numbers.join(", ")}</h2>
      <button className="back__btn gradient" onClick={onConfirm}>
        Back to game
      </button>
    </Modal>
  );
};
