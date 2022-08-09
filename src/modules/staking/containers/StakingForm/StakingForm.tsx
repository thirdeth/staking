import { ChangeEventHandler, FC, MouseEvent, useMemo } from 'react';
import { LoadingButton } from '@mui/lab';
import { Box, Button, Grid, InputAdornment, styled, TextField, Typography } from '@mui/material';
import { ToggleBtns } from 'components';
import { getPoolUnstakeValue } from 'modules/staking/utils';
import { FontFamilies } from 'theme/Typography';
import {
  BG_BLUE_EXTRALIGHT,
  BG_BLUE_LIGHT,
  BORDER_BUTTON_BLUE,
  BORDER_RADIUS_DEFAULT,
  COLOR_TEXT_BLUE,
} from 'theme/variables';
import { PoolsInfoProps } from 'types';

import { toggleButtonItems } from './StakingForm.helpers';

const TextContainer = styled(Typography)({
  mb: 1,
  fontSize: '16px',
  lineHeight: '24px',
  fontWeight: 700,
});

export interface StakingFormProps {
  totalStakedAmount: string;
  tokenBalance: string;
  poolsInfo: PoolsInfoProps[];
  poolsAprArr: number[];
  stakePeriod: number;
  stakeValue: string;
  isStaking: boolean;
  onStake: () => void;
  onSetMaxStakeValue: (maxValue: string) => void;
  onChangeStakeValue: ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>;
  onChangeStakePeriod: (event: MouseEvent<HTMLElement>) => void;
}

export const StakingForm: FC<StakingFormProps> = ({
  tokenBalance,
  totalStakedAmount,
  stakeValue,
  poolsInfo,
  poolsAprArr,
  stakePeriod,
  onStake,
  isStaking,
  onSetMaxStakeValue,
  onChangeStakePeriod,
  onChangeStakeValue,
}) => {
  const poolUnstakeValue = useMemo(() => getPoolUnstakeValue(poolsInfo, stakePeriod), [poolsInfo, stakePeriod]);

  return (
    <Box
      sx={{
        p: { xs: 1.7, sm: 1.7, md: 4.2 },
        minHeight: '502px',
        background: BG_BLUE_EXTRALIGHT,
        borderRadius: BORDER_RADIUS_DEFAULT,
      }}
    >
      <Grid container direction="column" rowSpacing={4.2}>
        <Grid item xs={12}>
          <Typography variant="h3" fontSize={{ xs: '20px', sm: '20px', md: '24px' }}>
            Stake for IDO Participation
          </Typography>
        </Grid>

        <Grid item container direction="column" xs={12}>
          <Grid item container justifyContent="flex-start" alignItems="center">
            <Typography variant="h3">{totalStakedAmount || '...'}</Typography>
            <Typography variant="body1" ml={2}>
              CLZ
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
            <TextContainer>Early unstake fee: {`${poolUnstakeValue}%` || '...'}</TextContainer>
            <Typography>APR</Typography>
          </Grid>

          <Grid item container justifyContent="flex-end" alignItems="center">
            <Typography variant="h1" color={COLOR_TEXT_BLUE} noWrap maxWidth="150px">
              {poolsAprArr[stakePeriod]}%
            </Typography>
          </Grid>
        </Grid>

        <Grid item container justifyContent="space-between" alignItems="flex-end" spacing={2} xs={12}>
          <Grid item xs={12} sm={12} md={12} lg={9}>
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
              <TextContainer>CLZ</TextContainer>
            </Box>

            <TextField
              value={stakeValue}
              onChange={onChangeStakeValue}
              variant="outlined"
              placeholder="0.00"
              disabled={isStaking}
              fullWidth
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Button
                      variant="text"
                      disabled={isStaking}
                      onClick={() => onSetMaxStakeValue(tokenBalance.toString())}
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

          <Grid item xs={12} sm={12} md={12} lg={3}>
            <LoadingButton variant="contained" loading={isStaking} disabled={+stakeValue === 0} onClick={onStake}>
              Stake
            </LoadingButton>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};
