import { ChangeEventHandler, FC, MouseEvent } from 'react';
import { Box, Button, Grid, InputAdornment, styled, TextField, Typography } from '@mui/material';
import { ToggleBtns } from 'components';
import { FontFamilies } from 'theme/Typography';
import {
  BG_BLUE_EXTRALIGHT,
  BG_BLUE_LIGHT,
  BORDER_BUTTON_BLUE,
  BORDER_RADIUS_DEFAULT,
  COLOR_TEXT_BLUE,
} from 'theme/variables';

import { toggleButtonItems } from './StakingForm.helpers';

const TextContainer = styled(Typography)({
  fontSize: '16px',
  lineHeight: '24px',
  fontWeight: 700,
});

export interface StakingFormProps {
  userStakes: number;
  userBalance: number;
  stakePeriod: number;
  stakeValue: string;
  onStake: () => void;
  onSetMaxStakeValue: (maxValue: string) => void;
  onChangeStakeValue: ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>;
  onChangeStakePeriod: (event: MouseEvent<HTMLElement>) => void;
}

export const StakingForm: FC<StakingFormProps> = ({
  userBalance,
  userStakes,
  stakeValue,
  stakePeriod,
  onStake,
  onSetMaxStakeValue,
  onChangeStakePeriod,
  onChangeStakeValue,
}) => {
  return (
    <Box
      sx={{
        p: { xs: 1.7, sm: 1.7, md: 4.2 },
        minHeight: '502px',
        background: BG_BLUE_EXTRALIGHT,
        borderRadius: BORDER_RADIUS_DEFAULT,
      }}
    >
      <Grid container direction="column" spacing={4.5}>
        <Grid item xs={12}>
          <Typography variant="h3" fontSize={{ xs: '20px', sm: '20px', md: '24px' }}>
            Stake for IDO Particioation
          </Typography>
        </Grid>

        <Grid item container direction="column" xs={12}>
          <Grid item container justifyContent="flex-start" alignItems="center">
            <Typography variant="h3">{userStakes}</Typography>
            <Typography variant="body1" ml={2}>
              BUSD
            </Typography>
          </Grid>

          <Grid item>
            <Typography variant="body1">Your Stake</Typography>
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <ToggleBtns buttonsItems={toggleButtonItems} value={stakePeriod} onClick={onChangeStakePeriod} />
        </Grid>

        <Grid item container direction="column" xs={12}>
          <Grid item container justifyContent="space-between" alignItems="center">
            <TextContainer>Early unstake fee: 25%</TextContainer>
            <Typography>APR</Typography>
          </Grid>

          <Grid item container justifyContent="space-between" alignItems="center">
            <TextContainer>Lock period: {toggleButtonItems[stakePeriod - 1].label}</TextContainer>
            <Typography variant="h1" color={COLOR_TEXT_BLUE}>
              12%
            </Typography>
          </Grid>
        </Grid>

        <Grid item container justifyContent="space-between" alignItems="flex-end" spacing={2} xs={12}>
          <Grid item>
            <TextContainer mb={1}>Balance: {userBalance} BUSD</TextContainer>

            <TextField
              value={stakeValue}
              onChange={onChangeStakeValue}
              variant="outlined"
              placeholder="0.00"
              sx={{ width: { xs: '100%', sm: '100%', md: '352px' } }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Button
                      variant="text"
                      onClick={() => onSetMaxStakeValue(userBalance.toString())}
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

          <Grid item>
            <Button onClick={onStake}>Stake</Button>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};
