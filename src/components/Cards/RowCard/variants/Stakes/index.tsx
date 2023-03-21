import { FC, useEffect, useRef, useState } from 'react';
import { Button, Grid, styled, Typography } from '@mui/material';
import { StakesCardDataProps } from 'components/Cards/RowCard/RowCard.types';
import { LogoSmall } from 'components/Icon/components';
import { useModal } from 'hooks';
import { StakesHeaderTitle, SureWithdrawPopup } from 'modules/staking/components';
import { getTimeLeftDate } from 'modules/staking/utils';
import { FontWeights } from 'theme/Typography';
import { fromDecimals } from 'utils';

import { RowCardProps } from '../../RowCard';

const MobileTitle = styled(StakesHeaderTitle)(({ theme }) => ({
  display: 'none',
  [theme.breakpoints.down('lg')]: { display: 'flex' },
}));

const ButtonStyled = styled(Button)({
  width: '100%',
});

type StakesProps = Pick<
  RowCardProps,
  'cardData' | 'isHarvesting' | 'isWithdrawing' | 'onChangeStakeItem' | 'poolsAprArr'
>;

export const Stakes: FC<StakesProps> = ({ cardData, poolsAprArr, isHarvesting, isWithdrawing, onChangeStakeItem }) => {
  const surePoupRef = useRef(null);
  const [isAllowToWithdraw, setAllowToWithdraw] = useState(false);
  const [isSurePopupVisible, setSurePopupVisible, onCloseSurePopup] = useModal(false);

  const { id, stakesData } = cardData as StakesCardDataProps;
  // if undefined its value does not show at html. verification is in markup
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [staked, earned, poolId, comissionPercent, daysLeft, rewardAmount]: any = stakesData;

  const handleWithdrawChange = () => {
    if (isAllowToWithdraw && onChangeStakeItem) {
      onChangeStakeItem('withdraw', id);
    } else {
      setSurePopupVisible();
    }
  };

  const handleChangeSure = (isSure: boolean) => {
    if (isSure && onChangeStakeItem) {
      setAllowToWithdraw(isSure);
      onCloseSurePopup();
      onChangeStakeItem('withdraw', id);
    } else {
      setAllowToWithdraw(isSure);
      onCloseSurePopup();
    }
  };

  useEffect(() => {
    const isUserStakesClosed = +new Date(+daysLeft * 1000) - Date.now() <= 0;
    if (isUserStakesClosed) {
      setAllowToWithdraw(true);
    }
  }, [daysLeft]);

  return (
    <Grid
      container
      justifyContent="space-between"
      direction={{ xs: 'column', sm: 'column', md: 'column', lg: 'row' }}
      alignItems={{ xs: 'space-between', sm: 'space-between', md: 'space-between', lg: 'center' }}
    >
      {staked && (
        <Grid item container pl={{ xs: 0, sm: 0, md: 0, lg: 2 }} md={2.5} xs={12}>
          <Grid item xs={6}>
            <MobileTitle>ARSH Staked</MobileTitle>
          </Grid>
          <Grid item container xs={6} lg={12}>
            <LogoSmall />
            <Typography variant="body2" ml={1} fontWeight={FontWeights.fontWeightMedium}>
              {fromDecimals(staked)}
            </Typography>
          </Grid>
        </Grid>
      )}
      {earned && (
        <Grid item container md={2.5} xs={12}>
          <Grid item xs={6}>
            <MobileTitle>ARSH Earned</MobileTitle>
          </Grid>
          <Grid item xs={6} lg={12}>
            <Typography variant="body2" textTransform="none">
              {/* was CLZ */}
              {fromDecimals(earned)} ARSH
            </Typography>
          </Grid>
        </Grid>
      )}
      {poolId && (
        <Grid item container md={2} xs={12}>
          <Grid item xs={6}>
            <MobileTitle>Reward</MobileTitle>
          </Grid>
          <Grid item xs={6} lg={12}>
            <Typography variant="body2" textTransform="none">
              {(poolsAprArr as number[])[poolId]} %
            </Typography>
          </Grid>
        </Grid>
      )}
      {daysLeft && (
        <Grid item container md={2} xs={12}>
          <Grid item xs={6} lg={12}>
            <MobileTitle>Days left</MobileTitle>
          </Grid>
          <Grid item xs={6} lg={12}>
            <Typography variant="body2" textTransform="none">
              {getTimeLeftDate(+daysLeft)}
            </Typography>
          </Grid>
        </Grid>
      )}
      <Grid item container mt={{ xs: 2, sm: 2, md: 0 }} wrap="nowrap" md={3} xs={12}>
        <ButtonStyled
          disabled={isHarvesting || +rewardAmount[0] === 0}
          onClick={() => onChangeStakeItem && onChangeStakeItem('harvest', id)}
        >
          Harvest
        </ButtonStyled>
        <ButtonStyled
          ref={surePoupRef}
          variant="outlined"
          color="secondary"
          sx={{ ml: 1, mr: { xs: 0, sm: 0, md: 1 } }}
          disabled={isWithdrawing}
          onClick={handleWithdrawChange}
        >
          Withdraw
        </ButtonStyled>
      </Grid>
      {isSurePopupVisible && (
        <SureWithdrawPopup
          anchorEl={surePoupRef}
          visible={isSurePopupVisible}
          onClose={onCloseSurePopup}
          onChangeSure={handleChangeSure}
          comissionPercent={comissionPercent}
        />
      )}
    </Grid>
  );
};
