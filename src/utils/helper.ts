export const getTime = (time: number) => {
  const second = Math.round(time % 60);
  const remain = Math.round(time / 60);
  const minute = Math.round(remain % 60);
  const hour = Math.round(remain / 60);

  return `${changeOneDigitToTwoDigit(hour)}:${changeOneDigitToTwoDigit(
    minute
  )}:${changeOneDigitToTwoDigit(second)}`;
};

export const changeOneDigitToTwoDigit = (n: number) =>
  `${n}`.length === 1 ? `0${n}` : `${n}`;
