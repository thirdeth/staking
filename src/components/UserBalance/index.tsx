import { FC } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import { FontWeights } from 'theme/Typography';
import { COLOR_TEXT_BLUE } from 'theme/variables';

interface UserBalancProps {
  balance: string;
}

export const UserBalance: FC<UserBalancProps> = ({ balance }) => {
  return (
    <Box
      sx={{
        width: '120px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-end',
      }}
    >
      <Typography variant="body2" fontWeight={FontWeights.fontWeightRegular} textTransform="uppercase">
        Balance:
      </Typography>
      <Grid container justifyContent="center" alignItems="center" wrap="nowrap">
        <Grid item>
          <Typography
            variant="h3"
            fontWeight={FontWeights.fontWeightRegular}
            color={COLOR_TEXT_BLUE}
            textTransform="uppercase"
            sx={{
              maxWidth: '70px',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {balance}
          </Typography>
        </Grid>
        <Grid item>
          <Typography
            variant="h3"
            fontWeight={FontWeights.fontWeightRegular}
            color={COLOR_TEXT_BLUE}
            textTransform="uppercase"
          >
            CRO
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};
