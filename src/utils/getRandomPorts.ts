const generateUniqueNumbers = (startNumber: number) => {
  const numbers = [startNumber];

  while (numbers.length < 5) {
    const randomNum = Math.floor(Math.random() * 28);

    if (!numbers.includes(randomNum)) {
      numbers.push(randomNum);
    }
  }

  for (let i = numbers.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
  }

  return numbers;
};

export const getRandomPorts = (id: number) => {
  const portsArr = [id];
  while (portsArr.length < 5) {
    const randomId = Math.floor(Math.random() * 27) + 1;
    if (!portsArr.includes(randomId)) {
      portsArr.push(randomId);
    }
  }
  return portsArr;
};
