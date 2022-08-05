import { FC } from 'react';
import { Box, BoxProps, Button, Grid, Typography } from '@mui/material';
import { BG_BLUE_DARK, BORDER_RADIUS_MEDIUM, COLOR_TEXT_WHITE, COLOR_TEXT_WHITE_EXTRALIGHT } from 'theme/variables';

import { SizeProps } from './ApplyCard.types';
import { applyCardStyleState } from './index';

export interface ApplyCardProps {
  size?: SizeProps;
}

export const ApplyCard: FC<ApplyCardProps & BoxProps> = ({ size = 's', ...boxProps }) => {
  return (
    <Box
      sx={(theme) => ({
        padding: size === 's' ? theme.spacing(0, 7.2) : 0,
        marginTop: theme.spacing(20),
        borderRadius: BORDER_RADIUS_MEDIUM,
        background: BG_BLUE_DARK,
        ...applyCardStyleState.size[size],
        height: { xs: '342px', sm: '342px', md: applyCardStyleState.size[size].height },
        ...boxProps,
      })}
    >
      <Grid
        container
        direction={size === 's' ? { xs: 'column', sm: 'column', md: 'row' } : 'column'}
        justifyContent={size === 's' ? { xs: 'center', sm: 'center', md: 'space-between' } : 'center'}
        alignItems="center"
        spacing={{ xs: 2, sm: 2, md: 0 }}
        sx={{ height: '100%' }}
      >
        <Grid item>
          <Box sx={{ maxWidth: size === 'm' ? '474px' : 'none' }}>
            <Typography
              variant="h1"
              color={COLOR_TEXT_WHITE}
              sx={{ textAlign: size === 'm' ? 'center' : { xs: 'center', sm: 'center', md: 'left' } }}
              fontSize={{ xs: '24px', sm: '24px', md: '30px' }}
              maxWidth={{ xs: '288px', sm: '288px', md: 'none' }}
            >
              APPLY FOR PROJECT INCUBATION
            </Typography>
            <Typography
              variant="body2"
              color={COLOR_TEXT_WHITE_EXTRALIGHT}
              fontSize={{ xs: '14px', sm: '14px', md: '16px' }}
              maxWidth={{ xs: '288px', sm: '288px', md: 'none' }}
              textAlign="center"
            >
              If you want to lanuch an IGO/IDO, It will be your perfect choice
            </Typography>
          </Box>
        </Grid>

        <Grid item container justifyContent="center" alignItems="center">
          <Button
            variant="contained"
            color="secondary"
            sx={{
              mt: size === 's' ? 0 : 2,
              textTransform: 'uppercase',
              minWidth: { xs: '100%', sm: '100%', md: '130px' },
            }}
          >
            Apply for Ido
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};
