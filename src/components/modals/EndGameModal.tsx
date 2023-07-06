import React from "react";
import { Modal } from "../Modal";
import { useNavigate } from "react-router-dom";
import { Port } from "../../api/apiTypes";

type Props = {
  onConfirm: () => void;
  points: number;
  card: Port | null;
  error: boolean;
};

export const EndGameModal: React.FC<Props> = ({
  onConfirm,
  points,
  card,
  error,
}) => {
  const navigate = useNavigate();
  return (
    <Modal onConfirm={onConfirm}>
      {error && (
        <div className="error__content">
          <h3 className="error__text">No!</h3>
          <h2>Right answer was:</h2>
          <h2>{card?.numbers.join(", ")}</h2>
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
