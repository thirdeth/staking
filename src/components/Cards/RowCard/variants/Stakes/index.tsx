import { FC, useRef, useState } from 'react';
import { Box, Button, Grid, styled, Typography } from '@mui/material';
import { LogoSmall } from 'components/Icon/components';
import { useModal } from 'hooks';
import { SureWithdrawPopup } from 'modules/staking/components';
import { FontFamilies, FontWeights } from 'theme/Typography';
import { StakesCardDataProps } from 'types';
import { dateFormatter, fromDecimals, getRewardPercent } from 'utils';

import { RowCardProps } from '../../RowCard';

const ButtonStyled = styled(Button)({
  width: '100%',
  fontFamily: FontFamilies.primary,
  textTransform: 'none',
});

type StakesProps = Pick<RowCardProps, 'cardData' | 'isHarvesting' | 'isWithdrawing' | 'onChangeStakeItem'>;

export const Stakes: FC<StakesProps> = ({ cardData, isHarvesting, isWithdrawing, onChangeStakeItem }) => {
  const surePoupRef = useRef(null);
  const [isAllowToWithdraw, setAllowToWithdraw] = useState(false);
  const [isSurePopupVisible, setSurePopupVisible, onCloseSurePopup] = useModal(false);

  const { id, stakesData } = cardData as StakesCardDataProps;
  // if undefined its value does not show at html. verification is in markup
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [staked, earned, poolId, daysLeft]: any = stakesData;

  const handleChangeSure = (flag: boolean) => {
    setAllowToWithdraw(flag);
    onCloseSurePopup();
  };

  const handleWithdrawChange = () => {
    if (isAllowToWithdraw && onChangeStakeItem) {
      onChangeStakeItem('withdraw', id);
    } else {
      setSurePopupVisible();
    }
  };

  return (
    <Grid
      container
      justifyContent="space-between"
      alignItems={{ xs: 'space-between', sm: 'space-between', md: 'center' }}
    >
      {staked && (
        <Grid pl={2} item md={2.5} xs={4}>
          <Box display="flex" justifyContent="flex-start">
            <LogoSmall />
            <Typography variant="body2" ml={1} fontWeight={FontWeights.fontWeightMedium}>
              {fromDecimals(staked)}
            </Typography>
          </Box>
        </Grid>
      )}

      {earned && (
        <Grid item container md={2.5} xs={4} justifyContent={{ xs: 'center', sm: 'center', md: 'flex-start' }}>
          <Typography variant="body2" textTransform="none">
            {fromDecimals(earned)} CLZ
          </Typography>
        </Grid>
      )}
      {poolId && (
        <Grid item container justifyContent={{ xs: 'flex-end', sm: 'flex-end', md: 'flex-start' }} md={2.5} xs={4}>
          <Typography variant="body2" textTransform="none">
            {getRewardPercent(+poolId)} %
          </Typography>
        </Grid>
      )}
      {daysLeft && (
        <Grid item display={{ xs: 'none', sm: 'none', md: 'block' }} md={1.5}>
          <Typography variant="body2" textTransform="none">
            {dateFormatter(+daysLeft, 'lll', true)} D
          </Typography>
        </Grid>
      )}
      <Grid
        item
        container
        mt={{ xs: 2, sm: 2, md: 0 }}
        justifyContent={{ xs: 'center', sm: 'center', md: 'flex-end' }}
        wrap="nowrap"
        md={3}
        xs={12}
      >
        <ButtonStyled disabled={isHarvesting} onClick={() => onChangeStakeItem && onChangeStakeItem('harvest', id)}>
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
        />
      )}
    </Grid>
  );
};
