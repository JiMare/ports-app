import React from "react";
import { Modal } from "../Modal";
import { Games } from "../../pages/Overview";

type Props = {
  onClose: () => void;
  onStartGame: (game: Games) => void;
};

export const StartGameModal: React.FC<Props> = ({ onClose, onStartGame }) => {
  return (
    <Modal onConfirm={onClose}>
      <h2 className="choose__title">What do you want to guess?</h2>
      <div className="choose__btn">
        <button
          className="primary__btn gradient"
          onClick={() => onStartGame(Games.PORTS)}
        >
          Ports
        </button>
        <button
          className="primary__btn gradient"
          onClick={() => onStartGame(Games.PROTOCOLS)}
        >
          Protocols
        </button>
      </div>
    </Modal>
  );
};
