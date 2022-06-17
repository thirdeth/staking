import { FC } from 'react';
import { Box, Typography } from '@mui/material';

interface StakingProps {
  title: string;
}

export const Staking: FC<StakingProps> = ({ title }) => {
  return (
    <Box>
      <Typography variant="h1">{title}</Typography>
    </Box>
  );
};
