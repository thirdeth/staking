import { FC } from 'react';
import { LoadingButton } from '@mui/lab';
import { Grid, Typography } from '@mui/material';
import { SocialLinks } from 'components';
import { useValidateLauncherBtn } from 'modules/ido/hooks';
import { FontWeights } from 'theme/Typography';
import { COLOR_TEXT_BLACK } from 'theme/variables';

import { LauncherCardProps } from '../../LauncherCard';

type LauncherControlsProps = Omit<LauncherCardProps, 'userAllocation' | 'totalBought'>;

export const LauncherControls: FC<LauncherControlsProps> = ({
  projectData,
  isGettingInvestmentsInfo,
  isRegistration,
  isAddingLiquidity,
  isClaiming,
  isRefunding,
  isCanAddLiquidity,
  onAddLiauidity,
}) => {
  const { discord, medium, telegram, twitter, status, investors } = projectData;
  const [btnText, btnHandler, isMainBtnVisible, textMessage] = useValidateLauncherBtn(status);

  const isLoading = isRegistration || isClaiming || isRefunding || isGettingInvestmentsInfo;

  const isShowAddLiquidityBtn = !isGettingInvestmentsInfo && isCanAddLiquidity;
  const isShowTextMessage =
    !isMainBtnVisible && !!textMessage.length && !isGettingInvestmentsInfo && !isShowAddLiquidityBtn;

  return (
    <Grid
      item
      container
      direction={{ xs: 'column-reverse', sm: 'column-reverse', md: 'row' }}
      justifyContent="space-between"
      alignItems="center"
      pt={4}
    >
      <Grid
        item
        xs={12}
        md={4}
        container
        justifyContent={{ xs: 'center', sm: 'flex-start', md: 'flex-start' }}
        alignItems="center"
        sx={{ width: '100%' }}
      >
        {isShowTextMessage && <Typography>{textMessage}</Typography>}

        {isMainBtnVisible && (
          <LoadingButton
            variant="contained"
            loading={isLoading}
            sx={{ width: { xs: '100%', sm: '100%', md: 'auto' } }}
            onClick={btnHandler}
          >
            {btnText}
          </LoadingButton>
        )}

        {isShowAddLiquidityBtn && (
          <LoadingButton
            variant="contained"
            loading={isAddingLiquidity}
            sx={{ width: { xs: '100%', sm: '100%', md: 'auto' } }}
            onClick={onAddLiauidity}
          >
            Add Liquidity
          </LoadingButton>
        )}
      </Grid>

      <Grid item container justifyContent="center" xs={12} md={4}>
        {+investors > 0 && (
          <Typography variant="body2" fontWeight={FontWeights.fontWeightRegular} py={{ xs: 2, sm: 2, md: 0 }}>
            Participants {investors}
          </Typography>
        )}
      </Grid>

      <Grid item container justifyContent="flex-end" xs={12} md={4}>
        <SocialLinks
          color={COLOR_TEXT_BLACK}
          links={{ discord, medium, telegram, twitter }}
          sx={{
            mb: { xs: 2, sm: 2, md: 0 },
            justifyContent: 'center',
            width: { xs: '100%', sm: '100%', md: 'auto !important', lg: 'auto !important' },
          }}
        />
      </Grid>
    </Grid>
  );
};
