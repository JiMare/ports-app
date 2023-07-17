import React from "react";
import { Modal } from "../Modal";
import { useNavigate } from "react-router-dom";
import { Port } from "../../api/apiTypes";
import { Games } from "../../pages/Overview";

type Props = {
  onConfirm: () => void;
  points: number;
  card: Port | null;
  error: boolean;
  typeOfGame: Games;
};

export const EndGameModal: React.FC<Props> = ({
  onConfirm,
  points,
  card,
  error,
  typeOfGame,
}) => {
  const navigate = useNavigate();
  return (
    <Modal onConfirm={onConfirm}>
      {error && (
        <div className="error__content">
          <h3 className="error__text">No!</h3>
          <h2>Right answer was:</h2>
          <h2>
            {typeOfGame === Games.PORTS ? card?.numbers.join(", ") : card?.name}
          </h2>
        </div>
      )}
      <h2>End Game</h2>
      <h3>
        Congratulation, you reached{" "}
        <span className="gradient__text points">{points}</span> points.
      </h3>
      <div className="btns">
        <button
          className="back__btn gradient"
          onClick={() => {
            navigate("/");
          }}
        >
          Back to learn
        </button>
        <button className="back__btn gradient" onClick={onConfirm}>
          Play again
        </button>
      </div>
    </Modal>
  );
};
