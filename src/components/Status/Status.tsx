import { FC } from 'react';
import { Box, Typography } from '@mui/material';
import { BG_BLUE_DARK, BORDER_RADIUS_DEFAULT } from 'theme/variables';

export type StatusProps = {
  isPublic: boolean;
};

export const Status: FC<StatusProps> = ({ isPublic }) => {
  return (
    <Box
      py={1.5}
      sx={{
        width: '154px',
        maxHeight: '48px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        border: `1px solid ${BG_BLUE_DARK}`,
        borderRadius: BORDER_RADIUS_DEFAULT,
      }}
    >
      <Typography variant="h4" textTransform="uppercase" color={BG_BLUE_DARK}>
        {isPublic ? 'public' : 'private'}
      </Typography>
    </Box>
  );
};
