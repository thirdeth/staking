import { FC } from 'react';
import { Box, BoxProps, Button, Grid, Typography } from '@mui/material';
import { BG_BLUE_DARK, BORDER_RADIUS_MEDIUM, COLOR_TEXT_WHITE, COLOR_TEXT_WHITE_EXTRALIGHT } from 'theme/variables';
import { SizeProps } from 'types';

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
        ...boxProps,
      })}
    >
      <Grid
        container
        direction={size === 's' ? 'row' : 'column'}
        justifyContent={size === 's' ? 'space-between' : 'center'}
        alignItems="center"
        sx={{ height: '100%' }}
      >
        <Grid item>
          <Box
            sx={{
              maxWidth: size === 'm' ? '474px' : 'none',
            }}
          >
            <Typography variant="h1" color={COLOR_TEXT_WHITE} align={size === 'm' ? 'center' : 'left'}>
              APPLY FOR PROJECT INCUBATION
            </Typography>
            <Typography variant="body2" color={COLOR_TEXT_WHITE_EXTRALIGHT}>
              If you want to lanuch an IGO/IDO, It will be your perfect choice
            </Typography>
          </Box>
        </Grid>

        <Grid item>
          <Button variant="contained" color="secondary" sx={{ mt: size === 's' ? 0 : 2, textTransform: 'uppercase' }}>
            Apply for Ido
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};
