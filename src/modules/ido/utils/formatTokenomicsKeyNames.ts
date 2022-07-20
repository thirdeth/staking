import { Tokenomic } from 'types/api/Tokenomic';

import { TokenomicProps } from '../pages/Details/Details.types';

export const formatTokenomicsKeyNames = (tokenomicsData: Tokenomic[]): TokenomicProps[] => {
  return tokenomicsData.map((chartItem) => ({
    title: chartItem.title as string,
    color: chartItem.color.toString(),
    value: chartItem.percent,
  }));
};
