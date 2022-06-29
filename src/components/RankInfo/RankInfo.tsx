import { FC } from 'react';
import { Box, BoxProps, SxProps, Theme, Typography } from '@mui/material';
import { RankIcon } from 'components/Icon/components';
import { isFunction } from 'lodash';

import { rankColors, styleHelper } from './Rank.helpers';
import { UserStakingRankIds } from './Rank.types';

export interface RankInfoProps {
  rankId?: UserStakingRankIds;
  subtitle?: string;
  size?: 's' | 'm';
  type?: 'card' | 'account' | 'icon';
  hideText?: boolean;
}

export const RankInfo: FC<RankInfoProps & Pick<BoxProps, 'sx'>> = ({
  rankId = 1,
  size,
  subtitle,
  type = 'icon',
  hideText,
  sx,
}) => {
  const currentRank = rankColors.find(({ id }) => id === rankId);

  return (
    <Box
      sx={(theme) => {
        // TODO: https://manzoni.atlassian.net/jira/software/projects/CRON/boards/160?assignee=60d5a3f3f6505400697aa5fa%2C613f02d449f7bd006889717f&selectedIssue=CRON-52
        const sxProps: any = isFunction(sx) ? sx(theme) : sx;
        return {
          display: 'flex',
          alignItems: 'center',
          ...sxProps,
        };
      }}
    >
      <RankIcon
        sx={{
          width: size === 'm' ? 70 : 35,
          height: size === 'm' ? 80 : 40,
          mr: size === 'm' ? 3 : 2,
        }}
        stopColorOne={currentRank?.stopColorOne}
        stopColorTwo={currentRank?.stopColorTwo}
      />
      {type !== 'icon' && (
        <Box>
          {subtitle && (
            <Typography
              sx={{
                color: hideText ? 'transparent' : styleHelper[type].subtitleColor,
              }}
              variant={size === 'm' ? 'body1' : 'subtitle1'}
            >
              {subtitle}
            </Typography>
          )}
          <Typography
            sx={{
              color: hideText ? 'transparent' : styleHelper[type].rankColor,
            }}
            variant={size === 'm' ? 'h1' : 'h4'}
          >
            {currentRank?.title}
          </Typography>
        </Box>
      )}
    </Box>
  );
};
