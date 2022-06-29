import { FC } from 'react';
import { Grid, styled, Typography } from '@mui/material';
import { FontWeights } from 'theme/Typography';

const TextContainer = styled(Typography)({
  fontSize: '16px',
  lineHeight: '45px',
  textTransform: 'uppercase',
  fontWeight: FontWeights.fontWeightRegular,
});

export const CardsHeader: FC = () => {
  return (
    <Grid container justifyContent="space-between" alignItems="center" px={3}>
      <Grid item xs={1}>
        <TextContainer>Rank</TextContainer>
      </Grid>
      <Grid item xs={2}>
        <TextContainer>Wallet address</TextContainer>
      </Grid>
      <Grid item xs={2}>
        <TextContainer>Amount Staked</TextContainer>
      </Grid>
      <Grid item xs={2}>
        <TextContainer>Last Staked</TextContainer>
      </Grid>
    </Grid>
  );
};
