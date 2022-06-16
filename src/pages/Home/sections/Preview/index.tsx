import { FC } from 'react';
import { Box, Button, Grid, Typography } from '@mui/material';
import { SocialLinks } from 'components';
import { LogoBlackLittle } from 'components/Icon/components';
import { FontFamilies } from 'theme/Typography';
import { COLOR_TEXT_BLUE } from 'theme/variables';

export const Preview: FC = () => {
  return (
    <Box
      sx={{
        height: '100vh',
      }}
    >
      <Grid item container direction="column" justifyContent="flex-start" alignItems="flex-start" rowGap={3} xs={12}>
        <Grid item>
          <Grid item>
            <Typography variant="h1">Limitless, Borderless, All-in-One</Typography>
          </Grid>
          <Grid item>
            <Typography variant="h1" color={COLOR_TEXT_BLUE}>
              Launch Zone
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="h1">of the Metaverse</Typography>
          </Grid>
        </Grid>

        <Typography
          variant="h4"
          sx={{
            fontFamily: FontFamilies.primary,
          }}
        >
          #1 Launch Zone on the First EVM and IBC interoperable Blockhain
        </Typography>
        <SocialLinks />
        <LogoBlackLittle />

        <Button>Pitch Deck</Button>
      </Grid>
    </Box>
  );
};
