import { FC } from 'react';
import { Grid, styled, Typography } from '@mui/material';
import { FontWeights } from 'theme/Typography';

export const StakesHeaderTitle = styled(Typography)({
  fontSize: '16px',
  lineHeight: '24px',
  fontWeight: FontWeights.fontWeightRegular,
});

export const StakesCardsHeader: FC = () => {
  return (
    <Grid
      container
      justifyContent="space-between"
      alignItems="center"
      display={{ xs: 'none', sm: 'none', md: 'none', lg: 'flex' }}
    >
      <Grid item pl={{ xs: 0, sm: 0, md: 4 }} xs={4} md={2.5}>
        <StakesHeaderTitle>CLZ Staked</StakesHeaderTitle>
      </Grid>
      <Grid item container pl={{ xs: 0, sm: 0, md: 1 }} xs={4} md={2.5}>
        <StakesHeaderTitle>CLZ Earned</StakesHeaderTitle>
      </Grid>
      <Grid item container xs={4} md={2}>
        <StakesHeaderTitle>Reward</StakesHeaderTitle>
      </Grid>
      <Grid item md={2}>
        <StakesHeaderTitle>Time left</StakesHeaderTitle>
      </Grid>
      <Grid item xs={12} md={3} />
    </Grid>
  );
};
