export const shuffleOrder = (array) => {
  return array.sort(() => Math.random() - 0.5);
};
