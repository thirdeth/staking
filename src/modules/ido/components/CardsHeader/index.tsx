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
      <Grid item xs={4}>
        <TextContainer>Project name</TextContainer>
      </Grid>
      <Grid item xs={2.5}>
        <TextContainer>Token</TextContainer>
      </Grid>
      <Grid item xs={2.2}>
        <TextContainer>Hae bought</TextContainer>
      </Grid>
      <Grid item xs={2}>
        <TextContainer>When Bought</TextContainer>
      </Grid>
    </Grid>
  );
};
