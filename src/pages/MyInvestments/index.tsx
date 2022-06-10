import { FC } from 'react';
import { Box, Typography } from '@mui/material';

interface MyInvestmentsProps {
  title: string;
}

export const MyInvestments: FC<MyInvestmentsProps> = ({ title }) => {
  return (
    <Box>
      <Typography variant="h1">{title}</Typography>
    </Box>
  );
};
