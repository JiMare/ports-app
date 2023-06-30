import React, { useState, useEffect } from "react";
import { Card } from "./components/Card";
import { getPortsData } from "./api/db";
import { Port } from "./api/apiTypes";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

export const App: React.FC = () => {
  const [portsData, setPortsData] = useState<Port[]>([]);
  const [lastCardVisible, setLastCardVisible] = useState(3);

  useEffect(() => {
    getPortsData().then((response) => response && setPortsData(response));
  }, []);

  const getCarouselCards = (data: Port[], index: number) => {
    return data.slice(index - 3, index + 1);
  };

  return (
    <div>
      <h1>Learn 27 ports with our Ports App</h1>
      <div className="starter">
        <img src="ports.png" alt="ports" className="starter__image" />
        {/* <button className="starter__btn gradient">Get started</button> */}
      </div>
      {portsData && portsData.length > 0 && (
        <div className="cards">
          <button
            className="arrow gradient"
            onClick={() => setLastCardVisible((prev) => prev - 1)}
            disabled={lastCardVisible - 3 <= 0}
          >
            <FaAngleLeft />
          </button>
          {getCarouselCards(portsData, lastCardVisible).map((port) => (
            <Card key={port.id} port={port} />
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
    </div>
  );
};
