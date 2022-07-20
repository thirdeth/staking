import { FC } from 'react';
import { LoadingButton } from '@mui/lab';
import { Grid, Typography } from '@mui/material';
import { SocialLinks } from 'components';
import { useValidateLauncherBtn } from 'modules/ido/hooks';
import { FontWeights } from 'theme/Typography';
import { COLOR_TEXT_BLACK } from 'theme/variables';

import { LauncherCardProps } from '../../LauncherCard';

type LauncherControlsProps = Omit<LauncherCardProps, 'userAllocation'>;

export const LauncherControls: FC<LauncherControlsProps> = ({
  projectData,
  isRegistration,
  isGettingInvestmentsInfo,
  isAddingLiquidity,
  isCanAddLiquidity,
  onAddLiauidity,
}) => {
  const { discord, medium, telegram, twitter, status, investors } = projectData;
  const [btnText, btnHandler, isMainBtnVisible, textMessage] = useValidateLauncherBtn(status);

  const isShowTextMessage = !isMainBtnVisible && !!textMessage.length && !isGettingInvestmentsInfo;
  const isShowAddLiquidityBtn = !isGettingInvestmentsInfo && isCanAddLiquidity;

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
            loading={isRegistration || isGettingInvestmentsInfo}
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
            sx={{ ml: { xs: 0, sm: 0, md: 2 }, width: { xs: '100%', sm: '100%', md: 'auto' } }}
            onClick={onAddLiauidity}
          >
            Add Liquidity
          </LoadingButton>
        )}
      </Grid>

      <Grid item container justifyContent="center" xs={12} md={4}>
        <Typography variant="body2" fontWeight={FontWeights.fontWeightRegular} py={{ xs: 2, sm: 2, md: 0 }}>
          Participants {investors}
        </Typography>
      </Grid>

      <Grid item container justifyContent="flex-end" xs={12} md={4}>
        <SocialLinks
          color={COLOR_TEXT_BLACK}
          links={{ discord, medium, telegram, twitter }}
          sx={{
            justifyContent: { xs: 'space-between', sm: 'space-between', md: 'center', lg: 'center' },
            width: { xs: '100%', sm: '100%', md: 'auto !important', lg: 'auto !important' },
          }}
        />
      </Grid>
    </Grid>
  );
};
