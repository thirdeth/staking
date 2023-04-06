import { FC } from 'react';
import { LoadingButton } from '@mui/lab';
import { Box, Grid, styled, Typography } from '@mui/material';
import { BG_BLUE_EXTRALIGHT, BORDER_RADIUS_DEFAULT } from 'theme/variables';

const TextContainer = styled(Typography)({
  mb: 1,
  fontSize: '16px',
  lineHeight: '24px',
  fontWeight: 700,
});

export interface VaultWithdrawProps {
  lockedAmount: string;
  unlockedAmount: string;
  isWithdrawing: boolean;
  onWithdraw: () => void;
}

export const VaultWithdraw: FC<VaultWithdrawProps> = ({ lockedAmount, unlockedAmount, onWithdraw, isWithdrawing }) => {
  return (
    <Box
      sx={{
        p: { xs: 1.7, sm: 1.7, md: 4.2 },
        height: '100%',
        background: BG_BLUE_EXTRALIGHT,
        borderRadius: BORDER_RADIUS_DEFAULT,
      }}
    >
      <Grid container direction="column" rowSpacing={{ xs: 3.8, sm: 3.8, md: 7 }}>
        <Grid item xs={12}>
          <Typography variant="h3" fontSize={{ xs: '20px', sm: '20px', md: '24px' }}>
            Withdraw $ARSH
          </Typography>
        </Grid>

        <Grid item container justifyContent="space-between" alignItems="flex-end" spacing={2} xs={12}>
          <Grid item xs={12} sm={12} md={8}>
            <Box display="flex" alignItems="center" sx={{ width: '100%' }}>
              <TextContainer>Locked amount:</TextContainer>
              <TextContainer
                sx={{
                  mx: 1,
                  maxWidth: '100px',
                  display: 'block',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpaces: 'nowrap',
                }}
              >
                {lockedAmount || '...'}
              </TextContainer>
              {/* was CLZ */}
              <TextContainer>xARSH</TextContainer>
            </Box>

            <Box display="flex" alignItems="center" sx={{ width: '100%' }}>
              <TextContainer>Withdrawable amount:</TextContainer>
              <TextContainer
                sx={{
                  mx: 1,
                  maxWidth: '100px',
                  display: 'block',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpaces: 'nowrap',
                }}
              >
                {unlockedAmount || '...'}
              </TextContainer>
              {/* was CLZ */}
              <TextContainer>ARSH</TextContainer>
            </Box>
          </Grid>

          <Grid
            item
            container
            justifyContent={{ xs: 'flex-start', sm: 'flex-start', md: 'flex-end' }}
            xs={12}
            sm={12}
            md={4}
          >
            <LoadingButton
              variant="contained"
              loading={isWithdrawing}
              disabled={+unlockedAmount === 0}
              onClick={onWithdraw}
            >
              Withdraw
            </LoadingButton>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};
