import { FC } from 'react';
import { Button, Grid, Typography } from '@mui/material';
import { SocialLinks } from 'components';
import { useWindowState } from 'hooks';
import { FontWeights } from 'theme/Typography';
import { COLOR_TEXT_BLACK } from 'theme/variables';

export const LauncherControls: FC = () => {
  const { width } = useWindowState();
  return (
    <Grid
      item
      container
      direction={{ xs: 'column-reverse', sm: 'column-reverse', md: 'row' }}
      justifyContent="space-between"
      alignItems="center"
      pt={4}
    >
      <Button
        sx={{
          width: { xs: '100%', sm: '100%', md: 'auto' },
          maxWidth: { xs: '100%', sm: '100%', md: 'auto' },
        }}
      >
        Claim Token
      </Button>
      <Typography variant="body2" fontWeight={FontWeights.fontWeightRegular} py={{ xs: 2, sm: 2, md: 0 }}>
        Participants 4017/5000
      </Typography>
      <SocialLinks color={COLOR_TEXT_BLACK} fullWidth={+width < 900} />
    </Grid>
  );
};