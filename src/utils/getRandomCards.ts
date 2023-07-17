const insertRandomly = (arr: number[], element: number): number[] => {
  const randomIndex = Math.floor(Math.random() * (arr.length + 1));
  arr.splice(randomIndex, 0, element);
  return arr;
};

export const getRandomCards = (id: number): number[] => {
  const cardsArr: number[] = [];
  while (cardsArr.length < 4) {
    const randomId = Math.floor(Math.random() * 27) + 1;
    if (!cardsArr.includes(randomId) && randomId !== id) {
      cardsArr.push(randomId);
    }
  }
  return insertRandomly(cardsArr, id);
};
