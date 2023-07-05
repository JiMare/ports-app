import { Port } from "../api/apiTypes";

export const getCardToGuess = (cards: Port[]): Port => {
  const randomIndex = Math.floor(Math.random() * cards.length);
  return cards[randomIndex];
};
