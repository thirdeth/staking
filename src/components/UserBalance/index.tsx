import { FC } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import { FontFamilies, FontWeights } from 'theme/Typography';
import { COLOR_TEXT_BLUE } from 'theme/variables';

interface UserBalancProps {
  balance: string;
}

export const UserBalance: FC<UserBalancProps> = ({ balance }) => {
  return (
    <Box
      sx={{
        width: '120px',
      }}
    >
      <Grid container direction="column" justifyContent="center" alignItems="flex-end">
        <Grid item>
          <Typography variant="body2" fontWeight={FontWeights.fontWeightRegular}>
            Balance:
          </Typography>
        </Grid>
        <Grid item container justifyContent="center" alignItems="center" wrap="nowrap">
          <Grid item>
            <Typography
              variant="h4"
              fontWeight={FontWeights.fontWeightMedium}
              fontFamily={FontFamilies.primary}
              color={COLOR_TEXT_BLUE}
              maxWidth="85px"
              noWrap
            >
              {balance}
            </Typography>
          </Grid>
          <Grid item>
            <Typography
              variant="h4"
              fontWeight={FontWeights.fontWeightRegular}
              color={COLOR_TEXT_BLUE}
              textTransform="uppercase"
              ml={1}
            >
              CRO
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};
