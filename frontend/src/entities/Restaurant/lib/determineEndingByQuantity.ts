export const determineEndingByQuantity = (value: number) => {
  if (value === 0) return "оценок";
  if (value === 1) return "оценка";

  return "оценки";
};
