import { FC } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import { RoadLine } from 'components';
import { FontFamilies, FontWeights } from 'theme/Typography';
import { BG_MAIN, BORDER_RADIUS_ROAD_CARD, SHADOW_ROAD_CARD } from 'theme/variables';

import { roadCards } from './Road.helpers';

export const Road: FC = () => {
  return (
    <Box pt={8} sx={{ position: 'relative' }}>
      <Grid item container direction="column" justifyContent="flex-start" alignItems="center" pb={14} xs={12}>
        <RoadLine />
        <Grid item pb={2}>
          <Typography variant="h1">Why Cronos Chain?</Typography>
        </Grid>
        <Grid item>
          <Typography
            variant="h4"
            sx={{ maxWidth: '578px' }}
            align="center"
            fontFamily={FontFamilies.primary}
            fontWeight={FontWeights.fontWeightRegular}
          >
            Cronos Chain is a decentralized permissionl ss blockchain with high speed and low fees, designed to drive
            mass adoption of blockchain technology.
          </Typography>
        </Grid>
      </Grid>

      <Box
        sx={(theme) => ({
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 360px)',
          gridRowGap: theme.spacing(4.5),
          justifyContent: 'space-between',
        })}
      >
        {roadCards.map(({ id, title, Image, text }) => (
          <Box
            key={id}
            sx={(theme) => ({
              padding: theme.spacing(4.5),
              width: '360px',
              height: '452px',
              background: BG_MAIN,
              boxShadow: SHADOW_ROAD_CARD,
              borderRadius: BORDER_RADIUS_ROAD_CARD,
            })}
          >
            <Image />
            <Typography
              variant="h4"
              sx={(theme) => ({ padding: theme.spacing(4.5, 0, 3), textTransform: 'uppercase' })}
            >
              {title}
            </Typography>
            <Typography variant="body1" fontWeight={FontWeights.fontWeightRegular}>
              {text}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};
