import { FC, useEffect, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { LoadingButton } from '@mui/lab';
import { Box, Grid, Paper, Stack, styled, Typography } from '@mui/material';
import { generateVestingTableData } from 'modules/ido/utils/generateVestingTableData';
import { onClaim } from 'store/ido/actions';
import { BG_BLUE_LIGHT, BORDER_RADIUS_DEFAULT } from 'theme/variables';
import { INotifyModalProps, RequestStatus, VestingInfoProps } from 'types';
import { fromDecimals } from 'utils';
import Web3 from 'web3';

const Item = styled(Paper)({
  minHeight: '70px',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  border: 'none',
  borderRadius: BORDER_RADIUS_DEFAULT,
  boxShadow: 'none',
  background: BG_BLUE_LIGHT,
});

export type VestingModalProps = {
  idoIncrement: string;
  claimAmount: string[];
  endTime: string;
  vestingInfo: VestingInfoProps;
  web3Provider: Web3;
  claimRequestStatus: RequestStatus;
} & INotifyModalProps;

export const VestingModal: FC<VestingModalProps> = ({
  claimAmount,
  idoIncrement,
  endTime,
  vestingInfo,
  web3Provider,
  claimRequestStatus,
  closeModal,
}) => {
  const dispatch = useDispatch();
  const isClaiming = claimRequestStatus === RequestStatus.REQUEST;

  const tableData = useMemo(() => {
    return generateVestingTableData(claimAmount, +endTime, vestingInfo);
  }, [claimAmount, endTime, vestingInfo]);

  const handleClaim = () => {
    dispatch(
      onClaim({
        web3Provider,
        idoIncrement,
      }),
    );
  };

  useEffect(() => {
    if (+claimAmount[0] === 0) {
      closeModal();
    }
  }, [claimAmount, closeModal]);

  return (
    <>
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item display="flex" flexDirection="column" alignItems="center">
          <Typography variant="body1">Total Amount</Typography>
          <Typography mt={2} variant="h2">
            {fromDecimals(claimAmount[1])} CLZ
          </Typography>
        </Grid>

        <Grid item display="flex" flexDirection="column" alignItems="center">
          <Typography variant="body1">Total Claimable</Typography>
          <Typography mt={2} variant="h2">
            {fromDecimals(claimAmount[1])} CLZ
          </Typography>
        </Grid>
      </Grid>

      <Typography my={3} variant="body1" textAlign="center">
        CLZ Mpunthly Schedule
      </Typography>

      <LoadingButton
        disabled={!(+claimAmount[1] > 0)}
        variant="contained"
        loading={isClaiming}
        onClick={handleClaim}
        sx={{ mb: 3, width: '100%' }}
      >
        Claim
      </LoadingButton>

      <Stack spacing={1} sx={{ maxHeight: '310px', overflowY: 'auto' }}>
        {tableData.map(({ id, anlockTime, anlockAmount }) => (
          <Item key={id} sx={{ px: 2 }}>
            <Typography variant="body2">{id} stage</Typography>
            <Typography variant="body2">{anlockTime}</Typography>
            <Typography variant="body2">{fromDecimals(anlockAmount, 18)} CLZ</Typography>
          </Item>
        ))}
      </Stack>
    </>
  );
};
