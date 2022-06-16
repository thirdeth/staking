import { FC } from 'react';
import { Box, Typography } from '@mui/material';
import { RowCard } from 'components';

import { investmentsMockData, investmentsRankMockData } from './MyInvestmets.helpers';

interface MyInvestmentsProps {
  title: string;
}

export const MyInvestments: FC<MyInvestmentsProps> = ({ title }) => {
  return (
    <>
      <Box>
        <Typography variant="h1">{title}</Typography>
        {investmentsMockData.map((item, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <RowCard key={index} cardData={item} rowColor="gray" my={2} />
        ))}
      </Box>
      <Box>
        <Typography variant="h1">{title}</Typography>
        {investmentsRankMockData.map((item, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <RowCard key={index} variant="rank" cardData={item} rowColor="gray" my={2} />
        ))}
      </Box>
    </>
  );
};
