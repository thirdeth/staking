import { FC } from 'react';
import { Box, Paper, Skeleton, Stack, styled } from '@mui/material';
import { BG_GRAY, BORDER_RADIUS_CARD_MEDIUM } from 'theme/variables';

const Item = styled(Paper)({
  background: 'transparent',
  boxShadow: 'none',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  flexWrap: 'wrap',
});

export const LauncherSkeletonCard: FC = () => {
  return (
    <Box
      sx={{
        py: 4.3,
        px: { xs: 2, sm: 2, md: 3 },
        background: BG_GRAY,
        borderRadius: BORDER_RADIUS_CARD_MEDIUM,
      }}
    >
      <Stack>
        <Item>
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="flex-start"
            alignItems="flex-start"
            sx={{ width: '100%', maxWidth: '350px' }}
          >
            <Skeleton
              animation="wave"
              width={102}
              height={102}
              sx={{ mr: 2, borderRadius: BORDER_RADIUS_CARD_MEDIUM }}
            />
            <Skeleton animation="wave" width="100%" height={52} sx={{ maxWidth: '300px' }} />
          </Box>
          <Skeleton animation="wave" width={52} height={52} sx={{ borderRadius: '20px' }} />
          <Skeleton animation="wave" width="100%" height={52} sx={{ maxWidth: '300px' }} />
        </Item>
        <Item>
          <Skeleton width="100%" height={52} />
        </Item>
        <Item>
          <Skeleton animation="wave" width="100%" height={52} sx={{ maxWidth: '300px' }} />
          <Skeleton animation="wave" width="100%" height={52} sx={{ maxWidth: '300px' }} />
        </Item>
      </Stack>
    </Box>
  );
};
