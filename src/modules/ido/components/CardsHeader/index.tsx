import { FC } from 'react';
import { Grid, styled, Typography } from '@mui/material';
import { FontWeights } from 'theme/Typography';
import { IdoStatus } from 'types/store/requests';

import { cardsHeaderHelper } from './CardsHeader.helper';

const TextContainer = styled(Typography)({
  fontSize: '16px',
  lineHeight: '45px',
  textTransform: 'uppercase',
  fontWeight: FontWeights.fontWeightRegular,
});

export interface CardsHeaderProps {
  status: string;
}

export const CardsHeader: FC<CardsHeaderProps> = ({ status }) => {
  return (
    <Grid container justifyContent="space-between" alignItems="center" px={3}>
      {cardsHeaderHelper[status as Exclude<IdoStatus, IdoStatus.all>].map(({ gridSize, label }, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <Grid item xs={gridSize} key={index}>
          <TextContainer>{label}</TextContainer>
        </Grid>
      ))}
    </Grid>
  );
};
