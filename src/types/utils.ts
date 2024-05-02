export const convertTimeStampToDate = (timeStamp: number) => {
  const date = new Date(timeStamp * 1000);
  const formattedTime = `${date.toLocaleDateString()}, ${date.toLocaleTimeString()}`;
  return formattedTime;
};
