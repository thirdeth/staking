import { FC } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { BG_BLUE_DARK, BORDER_RADIUS_MEDIUM, COLOR_TEXT_WHITE, COLOR_TEXT_WHITE_EXTRALIGHT } from 'theme/variables';

type Size = 'sm' | 'md';

const sizesState: Record<Size, { [k: string]: string }> = {
  sm: {
    height: '181px',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  md: { height: '328px', flexDirection: 'column', justifyContent: 'center', gap: '36px' },
};

export interface ApplyCardProps {
  size?: 'sm' | 'md';
}

export const ApplyCard: FC<ApplyCardProps> = ({ size = 'sm' }) => {
  return (
    <Box
      sx={(theme) => ({
        marginTop: theme.spacing(20),
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        borderRadius: BORDER_RADIUS_MEDIUM,
        background: BG_BLUE_DARK,
        ...sizesState[size],
      })}
    >
      <Box
        sx={{
          maxWidth: size === 'md' ? '474px' : 'none',
        }}
      >
        <Typography variant="h1" color={COLOR_TEXT_WHITE} align={size === 'md' ? 'center' : 'left'}>
          APPLY FOR PROJECT INCUBATION
        </Typography>
        <Typography variant="body2" color={COLOR_TEXT_WHITE_EXTRALIGHT}>
          If you want to lanuch an IGO/IDO, It will be your perfect choice
        </Typography>
      </Box>
      <Button variant="contained" color="secondary" sx={{ textTransform: 'uppercase' }}>
        Apply for Ido
      </Button>
    </Box>
  );
};
