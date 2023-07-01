import React, { useReducer, useEffect } from "react";
import { Port } from "../api/apiTypes";
import { QuestionMark } from "./QuestionMark";
import { VisibilityState } from "../App";

type State = {
  port: boolean;
  name: boolean;
};

type Action = {
  type: "port" | "name" | "hideName" | "showName" | "hidePort" | "showPort";
};

type Props = {
  port: Port;
  visibility: VisibilityState;
};

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case "port":
      return { ...state, port: !state.port };
    case "name":
      return { ...state, name: !state.name };
    case "hideName":
      return { ...state, name: false };
    case "showName":
      return { ...state, name: true };
    case "hidePort":
      return { ...state, port: false };
    case "showPort":
      return { ...state, port: true };
  }
};

export const Card: React.FC<Props> = ({ port, visibility }) => {
  const [state, dispatch] = useReducer(reducer, {
    port: visibility.ports,
    name: visibility.names,
  });

  useEffect(() => {
    if (!visibility.names) {
      dispatch({ type: "hideName" });
    }
    if (visibility.names) {
      dispatch({ type: "showName" });
    }
  }, [visibility.names]);

  useEffect(() => {
    if (!visibility.ports) {
      dispatch({ type: "hidePort" });
    }
    if (visibility.ports) {
      dispatch({ type: "showPort" });
    }
  }, [visibility.ports]);

  return (
    <div className="card">
      <div
        className="card__headlines"
        onClick={() => dispatch({ type: "name" })}
      >
        {state.name ? (
          <>
            <h2 className="card__title">{port.name}</h2>
            <h3 className="card__subtitle">{port.fullname}</h3>
          </>
        ) : (
          <QuestionMark />
        )}
      </div>
      <p className="card__text">{port.description}</p>
      <div className="card__port" onClick={() => dispatch({ type: "port" })}>
        {state.port ? <h2>{port.numbers.join(", ")}</h2> : <QuestionMark />}
      </div>
    </div>
  );
};
