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
      <Grid item pl={{ xs: 0, sm: 0, md: 4 }} xs={4} md={2.5}>
        <TextContainer>CLZ Staked</TextContainer>
      </Grid>
      <Grid
        item
        container
        pl={{ xs: 0, sm: 0, md: 1 }}
        xs={4}
        md={2.5}
        justifyContent={{ xs: 'center', sm: 'center', md: 'flex-start' }}
      >
        <TextContainer>CLZ Earned</TextContainer>
      </Grid>
      <Grid item container xs={4} md={2.4} justifyContent={{ xs: 'flex-end', sm: 'flex-end', md: 'flex-start' }}>
        <TextContainer>Reward</TextContainer>
      </Grid>
      <Grid item display={{ xs: 'none', sm: 'none', md: 'block' }} md={1.6}>
        <TextContainer>Days left</TextContainer>
      </Grid>
      <Grid item xs={12} md={3} />
    </Grid>
  );
};
