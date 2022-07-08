import { FC } from 'react';
import { Grid, styled, Typography } from '@mui/material';
import { IdoType } from 'modules/ido/utils';
import { FontWeights } from 'theme/Typography';

import { cardsHeaders } from './CardsHeader.helper';

const TextContainer = styled(Typography)({
  fontSize: '16px',
  lineHeight: '45px',
  textTransform: 'uppercase',
  fontWeight: FontWeights.fontWeightRegular,
  '&:not(:first-child)': {
    textAlign: 'center',
  },
});

export interface CardsHeaderProps {
  idoType: IdoType;
}

export const CardsHeader: FC<CardsHeaderProps> = ({ idoType }) => {
  return (
    <Grid container justifyContent="space-between" alignItems="center" px={2}>
      {cardsHeaders[idoType].map(({ gridSize, label }, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <Grid item xs={gridSize} key={index}>
          <TextContainer>{label}</TextContainer>
        </Grid>
      ))}
    </Grid>
  );
};
