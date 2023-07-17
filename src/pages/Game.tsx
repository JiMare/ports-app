import React, { useEffect, useMemo, useState } from "react";
import { Port } from "../api/apiTypes";
import { GameCard } from "../components/GameCard";
import { getCardToGuess } from "../utils/getCardToGuess";
import { getPortsData } from "../api/db";
import { GuessCard } from "../components/GuessCard";
import { getRandomCards } from "../utils/getRandomCards";
import { ProgressBar } from "../components/ProgressBar";
import { CountDown } from "../components/CountDown";
import { useNavigate } from "react-router-dom";
import { ErrorModal } from "../components/modals/ErrorModal";
import { EndGameModal } from "../components/modals/EndGameModal";
import { Games } from "./Overview";

export type PortCardType = {
  id: number;
  numbers?: number[];
};

export const Game: React.FC = () => {
  const navigate = useNavigate();

  const typeOfGame = (localStorage.getItem("gameType") as Games) ?? Games.PORTS;

  const [portsData, setPortsData] = useState<Port[]>([]);
  const [card, setCard] = useState<Port | null>(null);
  const [randomCards, setRandomCards] = useState<number[]>([]);

  const [restTime, setRestTime] = useState(120);

  const [progress, setProgress] = useState(0);
  const [errors, setErrors] = useState(0);

  const [showErrorModal, setShowErrorModal] = useState(false);
  const [showEndGameModal, setShowEndGameModal] = useState(false);

  const [endGame, setEndGame] = useState(false);

  useEffect(() => {
    getPortsData().then((response) => {
      if (response) {
        setPortsData(response);
      }
    });
  }, []);

  useEffect(() => {
    if (portsData.length > 0 && !showErrorModal && errors !== 3) {
      setCard(getCardToGuess(portsData));
    } else if (portsData.length === 0 && (errors !== 0 || progress !== 0)) {
      setEndGame(true);
    }
    if (errors === 3) setEndGame(true);
  }, [portsData, errors, progress, showErrorModal]);

  const points = useMemo(() => {
    const getPoints = (rest: number) => {
      if (errors === 3) {
        return progress;
      } else {
        return Math.ceil(rest / 10) + progress;
      }
    };
    return getPoints(restTime);
  }, [restTime, errors, progress]);

  useEffect(() => {
    if (endGame) {
      setShowEndGameModal(true);
    }
  }, [endGame]);

  useEffect(() => {
    if (card) {
      setRandomCards(getRandomCards(card.id));
    }
  }, [card]);

  const onNextStep = (id: number) => {
    if (id === card?.id) {
      setProgress((prev) => prev + 1);
      setPortsData((prev) => [...prev.filter((port) => port.id !== card?.id)]);
    } else {
      setErrors((prev) => prev + 1);
      if (errors !== 2) {
        setShowErrorModal(true);
      }
    }
  };

  const onBackToGame = () => {
    setPortsData((prev) => [...prev.filter((port) => port.id !== card?.id)]);
    setShowErrorModal(false);
  };

  const onRestTime = (time: number) => {
    setRestTime(time);
  };

  const onRestartGame = () => {
    window.location.reload();
  };

  return (
    <>
      <div className="game">
        <div className="progress-bars">
          <ProgressBar progress={progress * (100 / 27)} label="Success" />
          <ProgressBar progress={errors * (100 / 3)} label="Error" />
        </div>
        <CountDown
          onEnd={() => setEndGame(true)}
          endGame={endGame}
          onRestTime={onRestTime}
        />
        {card && (
          <>
            <GameCard
              guess={
                typeOfGame === Games.PORTS ? card.name : card.numbers.join(", ")
              }
            />
            <div className="game__cards">
              {randomCards.map((id) => (
                <GuessCard
                  key={id}
                  id={id}
                  onClick={onNextStep}
                  typeOfGame={typeOfGame}
                />
              ))}
            </div>
          </>
        )}
        <button
          className="back__btn gradient back"
          onClick={() => navigate("/")}
        >
          Back to learn
        </button>
      </div>
      {showErrorModal && (
        <ErrorModal
          onConfirm={onBackToGame}
          card={card}
          typeOfGame={typeOfGame}
        />
      )}
      {showEndGameModal && (
        <EndGameModal
          onConfirm={onRestartGame}
          points={points}
          card={card}
          error={errors === 3}
          typeOfGame={typeOfGame}
        />
      )}
    </>
  );
};
