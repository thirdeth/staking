export const getRewardPercent = (rewardId: number) => {
  if (rewardId === 0) {
    return 7;
  }
  if (rewardId === 1) {
    return 25;
  }
  return 70;
};
