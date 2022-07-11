import { FC } from 'react';
import { Grid, Typography } from '@mui/material';
import { ChartImg, ChartText } from 'modules/ido/assets';
import { ProjectDataProps } from 'modules/ido/pages/Details/Details.types';
import { BG_GRAY_LIGHT, BORDER_RADIUS_CARD_MEDIUM } from 'theme/variables';

export const Tokenomics: FC<ProjectDataProps> = ({ projectData }) => {
  return (
    <Grid container direction="column">
      <Typography variant="h2" fontSize="22px" mb={3}>
        Tokenomics
      </Typography>
      <Grid
        item
        container
        justifyContent={{ xs: 'center', sm: 'center', md: 'space-between' }}
        alignItems="flex-start"
        sx={{ p: { xs: 2, sm: 2, md: 8 }, background: BG_GRAY_LIGHT, borderRadius: BORDER_RADIUS_CARD_MEDIUM }}
      >
        <Grid item>
          <ChartImg />
        </Grid>
        <Grid item>
          <ChartText />
        </Grid>
      </Grid>
    </Grid>
  );
};
