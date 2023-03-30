import { FC, useEffect, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { LoadingButton } from '@mui/lab';
import { Grid, Paper, Stack, styled, Typography } from '@mui/material';
import BigNumber from 'bignumber.js/bignumber';
import { generateVestingTableData } from 'modules/ido/utils/generateVestingTableData';
import moment from 'moment';
import { onClaim } from 'store/ido/actions';
import { BG_BLUE_LIGHT, BG_GRAY, BORDER_RADIUS_DEFAULT } from 'theme/variables';
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
  tokenSymbol: string;
  web3Provider: Web3;
  claimRequestStatus: RequestStatus;
  decimals: number;
} & INotifyModalProps;

export const VestingModal: FC<VestingModalProps> = ({
  claimAmount,
  idoIncrement,
  endTime,
  vestingInfo,
  tokenSymbol,
  web3Provider,
  claimRequestStatus,
  closeModal,
  decimals,
}) => {
  const dispatch = useDispatch();
  const isClaiming = claimRequestStatus === RequestStatus.REQUEST;

  const currentDateTimestamp = moment(new Date()).format('X');

  const tableData = useMemo(() => {
    return generateVestingTableData(claimAmount, +endTime, vestingInfo, decimals);
  }, [claimAmount, decimals, endTime, vestingInfo]);

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
          <Typography variant="body1">Available to claim</Typography>
          <Typography mt={2} variant="h3" maxWidth={200} noWrap>
            {fromDecimals(claimAmount[1], decimals)} {tokenSymbol}
          </Typography>
        </Grid>

        <Grid item display="flex" flexDirection="column" alignItems="center">
          <Typography variant="body1">Total Claimed</Typography>
          <Typography mt={2} variant="h3" maxWidth={200} noWrap>
            {fromDecimals(claimAmount[2], decimals)} {tokenSymbol}
          </Typography>
        </Grid>
      </Grid>

      <Typography my={3} variant="body1" textAlign="center">
        {tokenSymbol.toUpperCase()} Monthly Schedule
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
        {tableData.map(({ id, anlockTime, anlockAmount }, index) => {
          let bgColor = BG_BLUE_LIGHT;
          if (
            +currentDateTimestamp > +moment(anlockTime).format('X') &&
            new BigNumber(new BigNumber(anlockAmount).multipliedBy(index + 1)).isLessThanOrEqualTo(
              new BigNumber(claimAmount[2]),
            )
          ) {
            bgColor = BG_GRAY;
          }
          return (
            <Item
              key={id}
              sx={{
                px: 2,
                background: bgColor,
              }}
            >
              <Typography variant="body2">{index + 1} stage</Typography>
              <Typography variant="body2">{anlockTime}</Typography>
              <Typography variant="body2">
                {fromDecimals(anlockAmount, decimals)} {tokenSymbol.toUpperCase()}
              </Typography>
            </Item>
          );
        })}
      </Stack>
    </>
  );
};
