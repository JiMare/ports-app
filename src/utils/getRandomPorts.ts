const insertRandomly = (arr: number[], element: number): number[] => {
  const randomIndex = Math.floor(Math.random() * (arr.length + 1));
  arr.splice(randomIndex, 0, element);
  return arr;
};

export const getRandomPorts = (id: number): number[] => {
  const portsArr: number[] = [];
  while (portsArr.length < 4) {
    const randomId = Math.floor(Math.random() * 27) + 1;
    if (!portsArr.includes(randomId) && randomId !== id) {
      portsArr.push(randomId);
    }
  }
  return insertRandomly(portsArr, id);
};
