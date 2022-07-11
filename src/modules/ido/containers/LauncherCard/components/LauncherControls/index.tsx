import { FC } from 'react';
import { LoadingButton } from '@mui/lab';
import { Grid, Typography } from '@mui/material';
import { SocialLinks } from 'components';
import { useValidateLauncherBtn } from 'modules/ido/hooks';
import { FontWeights } from 'theme/Typography';
import { COLOR_TEXT_BLACK } from 'theme/variables';

import { LauncherCardProps } from '../../LauncherCard';

export const LauncherControls: FC<Pick<LauncherCardProps, 'projectData' | 'isRegistration'>> = ({
  projectData,
  isRegistration,
}) => {
  const { discord, medium, telegram, twitter, status } = projectData;
  const [btnText, btnHandler, isBtnVisible] = useValidateLauncherBtn(status);

  return (
    <Grid
      item
      container
      direction={{ xs: 'column-reverse', sm: 'column-reverse', md: 'row' }}
      justifyContent="space-between"
      alignItems="center"
      pt={4}
    >
      {isBtnVisible && (
        <LoadingButton
          variant="contained"
          loading={isRegistration}
          sx={{ width: { xs: '100%', sm: '100%', md: 'auto' } }}
          onClick={btnHandler}
        >
          {btnText}
        </LoadingButton>
      )}

      <Typography variant="body2" fontWeight={FontWeights.fontWeightRegular} py={{ xs: 2, sm: 2, md: 0 }}>
        Participants 4017/5000
      </Typography>
      <SocialLinks
        color={COLOR_TEXT_BLACK}
        links={{ discord, medium, telegram, twitter }}
        sx={{
          justifyContent: { xs: 'space-between', sm: 'space-between', md: 'center', lg: 'center' },
          width: { xs: '100%', sm: '100%', md: 'auto !important', lg: 'auto !important' },
        }}
      />
    </Grid>
  );
};
