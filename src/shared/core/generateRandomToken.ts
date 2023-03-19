export const generateRandomToken = (min: number, max: number) => {
  return Math.floor(max + Math.random() * (max - min));
};
