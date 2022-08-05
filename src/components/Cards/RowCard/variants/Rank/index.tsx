import { FC } from 'react';
import { Box, Grid, styled, Typography } from '@mui/material';
import { CopyText, GrowRate, RankInfo } from 'components';
import { RankCardDataProps } from 'components/Cards/RowCard/RowCard.types';
import { COLOR_TEXT_GRAY_DARK } from 'theme/variables';
import { dateFormatter, shortenPhrase } from 'utils';

import { RowCardProps } from '../../RowCard';

const RowTitleText = styled(Typography)(({ theme }) => ({
  display: 'none',
  fontSize: '14px',
  color: COLOR_TEXT_GRAY_DARK,

  [theme.breakpoints.down('md')]: { display: 'block' },
}));

export const Rank: FC<Pick<RowCardProps, 'cardData'>> = ({ cardData }) => {
  const { rankId, walletAddress, stakedAmount, buyDate, growAmount } = cardData as RankCardDataProps;
  return (
    <Grid
      container
      justifyContent="space-between"
      alignItems={{ xs: 'space-between', sm: 'space-between', md: 'center' }}
    >
      <Grid container justifyContent="flex-start" alignItems="center" wrap="nowrap" columnGap={1}>
        {rankId && (
          <>
            <Grid item sx={{ position: 'relative' }}>
              <RowTitleText>Rank</RowTitleText>
              <RankInfo rankId={rankId} type="rank" size="m" />
            </Grid>
            {growAmount !== undefined && (
              <Grid item>
                <GrowRate growAmount={growAmount} />
              </Grid>
            )}
          </>
        )}
      </Grid>

      {walletAddress && (
        <Grid item md={2} xs={6} container direction="column">
          <RowTitleText>Wallet Address</RowTitleText>

          <Box display="flex" alignItems="center">
            <Typography
              variant="body2"
              textTransform="none"
              mr={1}
              sx={(theme) => ({
                [theme.breakpoints.down('md')]: {
                  maxWidth: '100px',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                },
              })}
            >
              {shortenPhrase(walletAddress, 10, 10)}
            </Typography>

            <CopyText text={walletAddress} variant="icon" />
          </Box>
        </Grid>
      )}
      {stakedAmount && (
        <Grid item md={2} xs={6}>
          <RowTitleText>Amount Staked</RowTitleText>
          <Typography variant="body2" textTransform="none">
            {stakedAmount} CRO
          </Typography>
        </Grid>
      )}
      {buyDate && (
        <Grid item md={2} xs={6}>
          <RowTitleText>Last Staked</RowTitleText>
          <Typography variant="body2" textTransform="none">
            {dateFormatter(buyDate)}
          </Typography>
        </Grid>
      )}
    </Grid>
  );
};
