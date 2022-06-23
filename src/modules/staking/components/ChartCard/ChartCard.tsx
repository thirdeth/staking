import { FC, ReactNode } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import { FontFamilies } from 'theme/Typography';
import { BG_BLUE_ACCENT, BORDER_RADIUS_DEFAULT, COLOR_TEXT_WHITE } from 'theme/variables';

export interface ChartCardProps {
  value: string;
  text: string;
  chartImg: ReactNode;
}

export const ChartCard: FC<ChartCardProps> = ({ value, text, chartImg }) => {
  return (
    <Box
      sx={{
        px: { xs: 2, sm: 2, md: 6.2 },
        py: 5.6,
        background: BG_BLUE_ACCENT,
        borderRadius: BORDER_RADIUS_DEFAULT,
      }}
    >
      <Grid container justifyContent={{ xs: 'center', sm: 'center', md: 'space-between' }} alignItems="flex-start">
        <Grid item container direction="column" justifyContent="space-between">
          <Grid item pb={3}>
            <Typography
              sx={{ color: COLOR_TEXT_WHITE, fontSize: '30px', lineHeight: '28px', fontFamily: FontFamilies.secondary }}
            >
              {value}
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="body2" fontFamily={FontFamilies.secondary} color={COLOR_TEXT_WHITE}>
              {text}
            </Typography>
          </Grid>
        </Grid>

        <Grid item>{chartImg}</Grid>
      </Grid>
    </Box>
  );
};
