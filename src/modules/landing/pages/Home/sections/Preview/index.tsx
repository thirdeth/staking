import { FC } from 'react';
import { Box, Button, Grid, Typography } from '@mui/material';
import { SocialLinks } from 'components';
import { LogoBlackLittle } from 'components/Icon/components';
import { PREVIEW_SECTION_SIZE } from 'modules/landing/components';
import { FontFamilies } from 'theme/Typography';
import { COLOR_TEXT_BLUE } from 'theme/variables';

export const Preview: FC = () => {
  return (
    <Box sx={{ pt: { xs: 20, sm: 20, md: 0 }, height: PREVIEW_SECTION_SIZE }}>
      <Grid container direction="column" justifyContent="flex-start" alignItems="flex-start" spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h1">Limitless, Borderless, All-in-One</Typography>
          <Typography variant="h1" color={COLOR_TEXT_BLUE}>
            Launch Zone
          </Typography>
          <Typography variant="h1">of the Metaverse</Typography>
        </Grid>

        <Grid item xs={12}>
          <Typography
            variant="h4"
            sx={{
              fontFamily: FontFamilies.primary,
            }}
          >
            #1 Launch Zone on the First EVM and IBC interoperable Blockhain
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <SocialLinks />
        </Grid>
        <Grid item xs={12}>
          <LogoBlackLittle />
        </Grid>

        <Grid item xs={12}>
          <Button>Pitch Deck</Button>
        </Grid>
      </Grid>
    </Box>
  );
};
