import { FC, memo } from 'react';
import { Box, BoxProps, Grid } from '@mui/material';
import { BG_BLUE_LIGHT, BORDER_RADIUS_DEFAULT, TRANSITION_DEFAULT_TIME } from 'theme/variables';
import { ColorProps, ProjectCardDataProps, RankCardDataProps, VariantProps } from 'types';

import { Project, Rank, rowCardStyleState } from './index';

export interface RowCardProps {
  variant?: VariantProps;
  rowColor?: ColorProps;
  cardData: ProjectCardDataProps | RankCardDataProps;
}

const Test: FC<RowCardProps & BoxProps> = ({ variant = 'project', rowColor = 'gray', cardData, ...boxProps }) => {
  return (
    <Box
      p={variant === 'project' ? 3.25 : 2}
      sx={{
        borderRadius: BORDER_RADIUS_DEFAULT,
        backgroundColor: rowCardStyleState.color[rowColor],
        transition: TRANSITION_DEFAULT_TIME,
        ...boxProps,

        '&:hover': {
          backgroundColor: BG_BLUE_LIGHT,
        },
      }}
    >
      <Grid
        container
        justifyContent="space-between"
        alignItems={{ xs: 'space-between', sm: 'space-between', md: 'center' }}
      >
        {variant === 'project' && cardData && <Project cardData={cardData} />}
        {variant === 'rank' && cardData && <Rank cardData={cardData} />}
      </Grid>
    </Box>
  );
};

export const RowCard = memo(Test);
