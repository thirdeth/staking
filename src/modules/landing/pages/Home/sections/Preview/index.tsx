import { FC } from 'react';
import { Button, Grid, Typography } from '@mui/material';
import { SocialLinks } from 'components';
import { LogoBlackLittle } from 'components/Icon/components';
import { FontFamilies } from 'theme/Typography';
import { COLOR_TEXT_BLUE } from 'theme/variables';

export const Preview: FC = () => {
  return (
    <Grid
      container
      direction="column"
      justifyContent="flex-start"
      alignItems="flex-start"
      spacing={3}
      height={{ xs: '100vh', sm: '100vh', md: '70vh' }}
      pt={{ xs: 20, sm: 20, md: 0 }}
    >
      <Grid item>
        <Typography variant="h1">Limitless, Borderless, All-in-One</Typography>
        <Typography variant="h1" color={COLOR_TEXT_BLUE}>
          Launch Zone
        </Typography>
        <Typography variant="h1">of the Metaverse</Typography>
      </Grid>

      <Grid item>
        <Typography
          variant="h4"
          sx={{
            fontFamily: FontFamilies.primary,
          }}
        >
          #1 Launch Zone on the First EVM and IBC interoperable Blockhain
        </Typography>
      </Grid>
      <Grid item>
        <SocialLinks />
      </Grid>
      <Grid item>
        <LogoBlackLittle />
      </Grid>

      <Grid item>
        <Button>Pitch Deck</Button>
      </Grid>
    </Grid>
  );
};
