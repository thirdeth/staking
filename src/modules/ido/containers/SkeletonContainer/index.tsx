import { FC } from 'react';
import { Grid } from '@mui/material';

import { LauncherSkeletonCard } from '../LauncherCard/components';
import { TabsSkeleton } from '../TabsContent/components';

export const SkeletonContainer: FC = () => {
  return (
    <Grid container justifyContent="space-between" alignItems="flex-start" spacing={3} sx={{ overflowX: 'hidden' }}>
      <Grid item xs={12}>
        <LauncherSkeletonCard />
      </Grid>
      <Grid item xs={12} sm={12} md={4}>
        <TabsSkeleton />
      </Grid>
      <Grid item xs={12} sm={12} md={8}>
        <TabsSkeleton />
      </Grid>
    </Grid>
  );
};
