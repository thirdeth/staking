import { FC } from 'react';
import { Grid, styled, Typography } from '@mui/material';
import { FontWeights } from 'theme/Typography';

const TextContainer = styled(Typography)({
  fontSize: '16px',
  lineHeight: '24px',
  fontWeight: FontWeights.fontWeightRegular,
});

export const StakesCardsHeader: FC = () => {
  return (
    <Grid container justifyContent="space-between" alignItems="center">
      <Grid item xs={4} md={2.5}>
        <TextContainer>CLZ Staked</TextContainer>
      </Grid>
      <Grid item container xs={4} md={2.5} justifyContent={{ xs: 'center', sm: 'center', md: 'flex-start' }}>
        <TextContainer>CLZ Earned</TextContainer>
      </Grid>
      <Grid item container xs={4} md={2.5} justifyContent={{ xs: 'flex-end', sm: 'flex-end', md: 'flex-start' }}>
        <TextContainer>Reward</TextContainer>
      </Grid>
      <Grid item display={{ xs: 'none', sm: 'none', md: 'block' }} md={1.5}>
        <TextContainer>Days left</TextContainer>
      </Grid>
      <Grid item xs={12} md={3} />
    </Grid>
  );
};
