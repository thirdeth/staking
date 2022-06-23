import { FC } from 'react';
import { Grid } from '@mui/material';
import { ApplyCard } from 'components';
import { LauncherCard, PoolInfoCard, TabsContent, TokenInfoCard } from 'modules/ido/containers';

const SALET_END_TIME_MOCK = 1234567891011;

const PROGRESS_DATA_MOCK = {
  progress: 70,
  totalRaise: 10,
  allocation: 10,
  targetRaise: 10,
};

const POOL_INFO_DATA_MOCK = {
  tokenDistribution: 123123,
  minAllocation: 0.01,
  maxAllocation: 1531.13,
  tokenPrice: 555.55,
  accessType: 'Public',
};
const TOKEN_INFO_DATA_MOCK = {
  tokenName: 'The Wasted Lands',
  tokenSymbol: 'DDO',
  decimals: 18,
  address: '0x22d40020282f9c8',
  totalSupply: 3.333334,
};

export const Details: FC = () => {
  return (
    <Grid container justifyContent="space-between" alignItems="flex-start" spacing={3} sx={{ overflowX: 'hidden' }}>
      <Grid item xs={12}>
        <LauncherCard saledEndTime={SALET_END_TIME_MOCK} progressData={PROGRESS_DATA_MOCK} />
      </Grid>
      <Grid item xs={12} sm={6} md={6}>
        <PoolInfoCard poolInfoData={POOL_INFO_DATA_MOCK} />
      </Grid>
      <Grid item xs={12} sm={6} md={6}>
        <TokenInfoCard tokenInfoData={TOKEN_INFO_DATA_MOCK} />
      </Grid>
      <Grid item xs={12}>
        <TabsContent />
      </Grid>
      <Grid item xs={12}>
        <ApplyCard size="s" />
      </Grid>
    </Grid>
  );
};
