import { FC } from 'react';
import { Box, Typography } from '@mui/material';
import { RankInfo, UserStakingRankIds } from 'components/RankInfo';
import { COLOR_TEXT_GRAY_EXTRALIGHT } from 'theme/variables';

export interface RankingInfoCardProps {
  rankId: UserStakingRankIds;
  description: string;
}

export const RankingInfoCard: FC<RankingInfoCardProps> = ({ rankId, description }) => {
  return (
    <Box
      sx={(theme) => ({
        display: 'flex',
        alignItems: 'center',
        border: `1px solid ${COLOR_TEXT_GRAY_EXTRALIGHT}`,
        borderRadius: '8px',
        p: 2,
        [theme.breakpoints.down('sm')]: {
          flexDirection: 'column',
        },
      })}
    >
      <RankInfo
        sx={(theme) => ({
          pr: 4.5,
          [theme.breakpoints.down('sm')]: {
            pr: 0,
            pb: 4.5,
          },
        })}
        rankId={rankId}
        size="m"
        type="card"
        subtitle="Your rank"
      />
      <Typography
        sx={(theme) => ({
          pl: 4.5,
          borderLeft: `1px solid ${COLOR_TEXT_GRAY_EXTRALIGHT}`,
          [theme.breakpoints.down('sm')]: {
            pl: 0,
            pt: 4.5,
            borderLeft: 'none',
            borderTop: `1px solid ${COLOR_TEXT_GRAY_EXTRALIGHT}`,
          },
        })}
        className="s"
      >
        {description}
      </Typography>
    </Box>
  );
};
