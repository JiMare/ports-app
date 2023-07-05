import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Overview } from "./pages/Overview";
import { Game } from "./pages/Game";

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Overview />} />
        <Route path="/game" element={<Game />} />
        <Route path="*" element={<Overview />} />
      </Routes>
    </BrowserRouter>
  );
};
