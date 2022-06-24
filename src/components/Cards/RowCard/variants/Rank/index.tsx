import { FC } from 'react';
import { Grid, Typography } from '@mui/material';
import { GrowRate } from 'components';
import { RankCardDataProps } from 'types';
import { dateFormatter, shortenPhrase } from 'utils';

import { RowCardProps } from '../../RowCard';

export const Rank: FC<Pick<RowCardProps, 'cardData'>> = ({ cardData }) => {
  const { rankIcon, isGrow, walletAddress, stakedAmount, buyDate }: RankCardDataProps = cardData;

  return (
    <>
      <Grid container justifyContent="flex-start" alignItems="center" wrap="nowrap" columnGap={1}>
        {rankIcon && (
          <>
            <Grid item>
              <img src={rankIcon} alt="project-icon" />
            </Grid>
            {isGrow !== undefined && (
              <Grid item>
                <GrowRate isGrow={isGrow} growAmount={10} />
              </Grid>
            )}
          </>
        )}
      </Grid>

      {walletAddress && (
        <Grid item md={2} xs={6}>
          <Typography variant="body2" textTransform="none">
            {shortenPhrase(walletAddress, 14, 14)}
          </Typography>
        </Grid>
      )}
      {stakedAmount && (
        <Grid item md={2} xs={6}>
          <Typography variant="body2" textTransform="none">
            {stakedAmount} CRO
          </Typography>
        </Grid>
      )}
      {buyDate && (
        <Grid item md={2} xs={6}>
          <Typography variant="body2" textTransform="none">
            {dateFormatter(buyDate)}
          </Typography>
        </Grid>
      )}
    </>
  );
};
