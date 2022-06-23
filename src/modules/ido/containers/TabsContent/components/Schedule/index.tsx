import { FC } from 'react';
import { Box, Grid, styled, Typography } from '@mui/material';
import { FontFamilies, FontWeights } from 'theme/Typography';
import {
  BG_BLUE_EXTRALIGHT,
  BG_GRAY_LIGHT,
  BORDER_GRAY_LIGHT,
  BORDER_RADIUS_CARD_MEDIUM,
  BORDER_RADIUS_DEFAULT,
  COLOR_TEXT_BLUE,
} from 'theme/variables';
import { dateFormatter } from 'utils';

import { ScheduleDataProps } from '../../TabsContent.types';

const TextTitleContainer = styled(Typography)({
  fontSize: '16px',
  lineHeight: '19px',
  color: COLOR_TEXT_BLUE,
  fontFamily: FontFamilies.secondary,
  textTransform: 'uppercase',
});

type ScheduleProps = {
  scheduleInfoData: ScheduleDataProps[];
};

export const Schedule: FC<ScheduleProps> = ({ scheduleInfoData }) => {
  return (
    <Box>
      <Typography variant="h2" fontSize="22px" mb={3}>
        Schedule
      </Typography>

      <Grid container direction="column">
        <Grid
          item
          container
          justifyContent="space-between"
          alignItems="center"
          display={{ xs: 'none', sm: 'flex', md: 'flex' }}
          sx={{ px: 3.6, height: '60px', background: BG_GRAY_LIGHT, borderRadius: BORDER_RADIUS_CARD_MEDIUM }}
        >
          <Grid item xs={3}>
            <TextTitleContainer>Round</TextTitleContainer>
          </Grid>
          <Grid item xs={4.5}>
            <TextTitleContainer>Opens</TextTitleContainer>
          </Grid>
          <Grid item xs={4.5}>
            <TextTitleContainer>Closes</TextTitleContainer>
          </Grid>
        </Grid>

        <Grid item container direction="column" justifyContent="flex-start" alignItems="center">
          {scheduleInfoData.map(({ title, date }, index) => (
            <Grid
              // not rerendering date items
              // eslint-disable-next-line react/no-array-index-key
              key={index + title}
              item
              container
              justifyContent="space-between"
              alignItems="center"
              xs={12}
              sx={(theme) => ({
                p: 2,
                borderBottom: BORDER_GRAY_LIGHT,
                [theme.breakpoints.down('sm')]: {
                  my: 1,
                  minHeight: '179px',
                  background: BG_BLUE_EXTRALIGHT,
                  borderRadius: BORDER_RADIUS_DEFAULT,
                  borderBottom: 'none',
                },
              })}
            >
              <Grid item container justifyContent="space-between" alignItems="center" xs={12} sm={3} md={3}>
                <Grid item display={{ xs: 'flex', sm: 'none', md: 'none' }}>
                  <TextTitleContainer>Round</TextTitleContainer>
                </Grid>

                <Grid item>
                  <Typography variant="body2" fontWeight={FontWeights.fontWeightMedium}>
                    {title}
                  </Typography>
                </Grid>
              </Grid>

              <Grid item container justifyContent="space-between" alignItems="center" xs={12} sm={4.5} md={4.5}>
                <Grid item display={{ xs: 'flex', sm: 'none', md: 'none' }}>
                  <TextTitleContainer>Opens</TextTitleContainer>
                </Grid>

                <Grid item>
                  <Typography variant="body2" fontWeight={FontWeights.fontWeightMedium}>
                    {dateFormatter(date.open)} UTC
                  </Typography>
                </Grid>
              </Grid>

              <Grid item container justifyContent="space-between" alignItems="center" xs={12} sm={4.5} md={4.5}>
                <Grid item display={{ xs: 'flex', sm: 'none', md: 'none' }}>
                  <TextTitleContainer>Closes</TextTitleContainer>
                </Grid>

                <Grid item>
                  <Typography variant="body2" fontWeight={FontWeights.fontWeightMedium}>
                    {dateFormatter(date.close)} UTC
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Box>
  );
};
