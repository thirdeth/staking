import { FC } from 'react';
import { Box, Skeleton } from '@mui/material';
import { BG_GRAY, BORDER_RADIUS_DEFAULT } from 'theme/variables';

export const TabsSkeleton: FC = () => {
  return (
    <Box
      sx={{
        px: { xs: 2, sm: 2, md: 3 },
        py: { xs: 1, sm: 1, md: 3 },
        height: '670px',
        background: BG_GRAY,
        borderRadius: BORDER_RADIUS_DEFAULT,
      }}
    >
      {new Array(5).fill('').map((_, index) => (
        <Skeleton
          // eslint-disable-next-line react/no-array-index-key
          key={index}
          animation="wave"
          sx={{ width: { xs: '160px', sm: '160px', md: '260px' }, height: '50px' }}
        />
      ))}
    </Box>
  );
};
