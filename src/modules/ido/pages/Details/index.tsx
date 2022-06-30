import { FC, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { Grid, Typography } from '@mui/material';
import { ApplyCard } from 'components';
import {
  LauncherCard,
  PoolInfoCard,
  ProgressLauncherDataProps,
  TabsContent,
  TokenInfoCard,
} from 'modules/ido/containers';
import { setActiveModal } from 'store/modals/reducer';
import { FontFamilies, FontWeights } from 'theme/Typography';
import { COLOR_TEXT_BLUE } from 'theme/variables';
import { Modals } from 'types';

const SALED_END_TIME_MOCK = 1234567891011;

const PROGRESS_DATA_MOCK: ProgressLauncherDataProps = {
  stage: 'open',
  progress: 70,
  totalRaise: 10,
  allocation: 10,
  targetRaise: 10,
  saleEndTime: SALED_END_TIME_MOCK,
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
  const dispatch = useDispatch();

  const handleOpenModal = useCallback(
    (modalType: Modals) => {
      dispatch(
        setActiveModal({
          activeModal: modalType,
          txHash: '',
          open: true,
        }),
      );
    },
    [dispatch],
  );

  return (
    <Grid container justifyContent="space-between" alignItems="flex-start" spacing={3} sx={{ overflowX: 'hidden' }}>
      <Grid item xs={12}>
        <Typography
          variant="body2"
          sx={{
            strong: {
              fontSize: '30px',
              fontFamily: FontFamilies.secondary,
              fontWeight: FontWeights.fontWeightRegular,
              textTransform: 'uppercase',
              color: COLOR_TEXT_BLUE,
            },
          }}
        >
          Status: <strong>{PROGRESS_DATA_MOCK.stage}</strong>
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <LauncherCard progressData={PROGRESS_DATA_MOCK} onOpenModal={handleOpenModal} />
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
