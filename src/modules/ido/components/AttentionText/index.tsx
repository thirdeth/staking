import { FC } from 'react';
import { Box, Typography } from '@mui/material';
import { BG_GRAY_LIGHT, BORDER_RADIUS_DEFAULT, COLOR_TEXT_ACCENT_BLUE } from 'theme/variables';

export const AttentionText: FC = () => {
  return (
    <Box
      sx={{
        mb: 2,
        p: 2,
        background: BG_GRAY_LIGHT,
        borderRadius: BORDER_RADIUS_DEFAULT,
      }}
    >
      <Typography variant="body1" color={COLOR_TEXT_ACCENT_BLUE} textAlign="center">
        Status of the finished projects can be not up to date for some time after IDO ending. Try to reload the page in
        5 minutes
      </Typography>
    </Box>
  );
};
