export const calculateTime = (current) => {
  const currentTime = 90 - current.toString().substr(0, 2);
  const currentMin = Math.floor(currentTime / 60);
  const currentSecond = currentTime % 60 < 10 ? `0${currentTime % 60}` : currentTime % 60;

  return `${currentMin}:${currentSecond}`;
};
