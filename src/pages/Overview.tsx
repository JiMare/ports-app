import React, { useState, useEffect, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "../components/Card";
import { Port } from "../api/apiTypes";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import useMediaQuery from "../hook/useMediaQuery";
import { getPortsData } from "../api/db";
import { StartGameModal } from "../components/modals/StartGameModal";

export enum Games {
  PORTS = "ports",
  PROTOCOLS = "protocols",
}

export type VisibilityState = {
  ports: boolean;
  names: boolean;
};

type VisibilityAction = {
  type: "togglePorts" | "toggleNames";
};

const reducer = (visibility: VisibilityState, action: VisibilityAction) => {
  switch (action.type) {
    case "toggleNames":
      return { ...visibility, names: !visibility.names };
    case "togglePorts":
      return { ...visibility, ports: !visibility.ports };
  }
};

export const Overview: React.FC = () => {
  const navigate = useNavigate();
  const isMobile = useMediaQuery("only screen and (max-width : 650px)");
  const isMediumDevice = useMediaQuery(
    "only screen and (min-width : 651px) and (max-width : 1050px)"
  );

  const [portsData, setPortsData] = useState<Port[]>([]);

  const [isStartGameModalOpen, setIsStartGameModalOpen] = useState(false);

  useEffect(() => {
    getPortsData().then((response) => response && setPortsData(response));
  }, []);

  const [lastCardVisible, setLastCardVisible] = useState(
    isMobile ? 0 : isMediumDevice ? 1 : 3
  );
  const [numOfCardsToShow, setNumOfCardsToShow] = useState(
    isMobile ? 1 : isMediumDevice ? 2 : 4
  );

  const [visibility, dispatch] = useReducer(reducer, {
    ports: true,
    names: true,
  });

  const getCarouselCards = (data: Port[], index: number) => {
    return data.slice(index - numOfCardsToShow + 1, index + 1);
  };

  const onStartGame = (game: Games) => {
    localStorage.setItem("gameType", game);
    navigate("/game");
  };

  useEffect(() => {
    const onResize = () => {
      if (isMobile) {
        setNumOfCardsToShow(1);
      } else if (isMediumDevice) {
        setNumOfCardsToShow(2);
        setLastCardVisible(1);
      } else {
        setNumOfCardsToShow(4);
        setLastCardVisible(3);
      }
    };
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, [isMobile, isMediumDevice]);

  return (
    <>
      <div>
        <h1>Learn 27 ports with our Ports App</h1>
        <div className="starter">
          <img src="ports.png" alt="ports" className="starter__image" />
          <button
            className="primary__btn gradient"
            //onClick={() => navigate("/game")}
            onClick={() => setIsStartGameModalOpen(true)}
          >
            Get started
          </button>
        </div>
        {portsData && portsData.length > 0 && (
          <div className="cards">
            <button
              className="arrow gradient"
              onClick={() => setLastCardVisible((prev) => prev - 1)}
              disabled={lastCardVisible - numOfCardsToShow < 0}
            >
              <FaAngleLeft />
            </button>
            {getCarouselCards(portsData, lastCardVisible).map((port) => (
              <Card key={port.id} port={port} visibility={visibility} />
            ))}
            <button
              className="arrow gradient"
              onClick={() => setLastCardVisible((prev) => prev + 1)}
              disabled={lastCardVisible + 1 === portsData.length}
            >
              <FaAngleRight />
            </button>
          </div>
        )}
        <div className="toggle">
          <button
            className="toggle__btn"
            onClick={() => dispatch({ type: "toggleNames" })}
          >
            Toggle all names
          </button>

          <button
            className="toggle__btn"
            onClick={() => dispatch({ type: "togglePorts" })}
          >
            Toggle all ports
          </button>
        </div>
      </div>
      {isStartGameModalOpen && (
        <StartGameModal
          onClose={() => setIsStartGameModalOpen(false)}
          onStartGame={onStartGame}
        />
      )}
    </>
  );
};
