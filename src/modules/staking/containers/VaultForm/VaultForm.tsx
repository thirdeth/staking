import { ChangeEventHandler, FC } from 'react';
import { LoadingButton } from '@mui/lab';
import { Box, Button, Grid, InputAdornment, styled, TextField, Typography } from '@mui/material';
import { FontFamilies } from 'theme/Typography';
import {
  BG_BLUE_EXTRALIGHT,
  BG_BLUE_LIGHT,
  BORDER_BUTTON_BLUE,
  BORDER_RADIUS_DEFAULT,
  COLOR_TEXT_BLUE,
} from 'theme/variables';

const TextContainer = styled(Typography)({
  mb: 1,
  fontSize: '16px',
  lineHeight: '24px',
  fontWeight: 700,
});

export interface VaultFormProps {
  tokenBalance: string;
  depositValue: string;
  isDepositing: boolean;
  onDeposit: () => void;
  onSetMaxDepositValue: (maxValue: string) => void;
  onChangeDepositValue: ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>;
}

export const VaultForm: FC<VaultFormProps> = ({
  tokenBalance,
  depositValue,
  onDeposit,
  isDepositing,
  onSetMaxDepositValue,
  onChangeDepositValue,
}) => {
  return (
    <Box
      sx={{
        p: { xs: 1.7, sm: 1.7, md: 4.2 },
        height: '100%',
        background: BG_BLUE_EXTRALIGHT,
        borderRadius: BORDER_RADIUS_DEFAULT,
      }}
    >
      <Grid container direction="column" rowSpacing={{ xs: 3.8, sm: 3.8, md: 4.2 }}>
        <Grid item xs={12}>
          <Typography variant="h3" fontSize={{ xs: '20px', sm: '20px', md: '24px' }}>
            Deposit $xARSH
          </Typography>
        </Grid>

        <Grid item container justifyContent="space-between" alignItems="flex-end" spacing={2} xs={12}>
          <Grid item xs={12} sm={12} md={8}>
            <Box display="flex" alignItems="center" sx={{ width: '100%' }}>
              <TextContainer>Balance:</TextContainer>
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
                {tokenBalance || '...'}
              </TextContainer>
              {/* was CLZ */}
              <TextContainer>xARSH</TextContainer>
            </Box>

            <TextField
              value={depositValue}
              onChange={onChangeDepositValue}
              variant="outlined"
              placeholder="0.00"
              disabled={isDepositing}
              fullWidth
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Button
                      variant="text"
                      disabled={isDepositing}
                      onClick={() => onSetMaxDepositValue(tokenBalance.toString())}
                      sx={{
                        px: 1,
                        height: '24px',
                        fontSize: '16px',
                        lineHeight: '24px',
                        textTransform: 'uppercase',
                        fontFamily: FontFamilies.primary,
                        color: COLOR_TEXT_BLUE,
                        background: BG_BLUE_LIGHT,
                        border: BORDER_BUTTON_BLUE,
                        borderRadius: '4px',
                      }}
                    >
                      Max
                    </Button>
                  </InputAdornment>
                ),
              }}
            />
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
              loading={isDepositing}
              disabled={+depositValue === 0}
              onClick={onDeposit}
            >
              Deposit
            </LoadingButton>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};
