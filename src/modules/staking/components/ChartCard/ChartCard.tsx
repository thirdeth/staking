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
        px: { xs: 2, sm: 2, md: 4 },
        py: 3,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: { xs: 'auto', sm: 'auto', md: 158 },
        background: BG_BLUE_ACCENT,
        borderRadius: BORDER_RADIUS_DEFAULT,
      }}
    >
      <Grid item container justifyContent="space-between" alignItems="center" xs={12} flexWrap="nowrap">
        <Grid item container direction="column" justifyContent="space-between">
          <Grid item pb={{ xs: 1, sm: 1, md: 4 }}>
            <Typography
              sx={{
                color: COLOR_TEXT_WHITE,
                fontSize: { xs: '20px', sm: '20px', md: '28px' },
                lineHeight: '28px',
                fontFamily: FontFamilies.secondary,
              }}
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

        <Grid
          item
          container
          alignSelf={{ xs: 'flex-end', sm: 'flex-end', md: 'center' }}
          sx={{
            img: {
              width: { xs: '104px', sm: '104px', md: 'auto' },
              height: { xs: '51px', sm: '51px', md: 'auto' },
            },
          }}
        >
          {chartImg}
        </Grid>
      </Grid>
    </Box>
  );
};
