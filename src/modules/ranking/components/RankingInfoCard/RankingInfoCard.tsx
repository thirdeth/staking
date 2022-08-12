import { FC } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Box, BoxProps, Button, Typography } from '@mui/material';
import { routes } from 'appConstants';
import { RankInfo, UserStakingRankIds } from 'components';
import { COLOR_TEXT_GRAY_EXTRALIGHT } from 'theme/variables';

export type RankingInfoCardProps = {
  rankId: UserStakingRankIds;
  description: string;
} & BoxProps;

export const RankingInfoCard: FC<RankingInfoCardProps> = ({ rankId, description, ...boxProps }) => {
  const { pathname } = useLocation();
  const isRankingPage = pathname === routes.staking.ranking.root.path;
  return (
    <Box
      {...boxProps}
      sx={(theme) => ({
        display: 'flex',
        alignItems: 'center',
        border: `1px solid ${COLOR_TEXT_GRAY_EXTRALIGHT}`,
        borderRadius: '8px',
        p: 2,
        [theme.breakpoints.down('md')]: {
          flexDirection: 'column',
        },
      })}
    >
      <RankInfo
        sx={(theme) => ({
          pr: 4.5,
          [theme.breakpoints.down('md')]: {
            pr: 0,
            pb: 1,
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
          [theme.breakpoints.down('md')]: {
            pl: 0,
            pt: 2,
            borderLeft: 'none',
            borderTop: `1px solid ${COLOR_TEXT_GRAY_EXTRALIGHT}`,
          },
        })}
        className="s"
      >
        {description}
      </Typography>
      {!isRankingPage && (
        <Link to={routes.staking.ranking.root.path}>
          <Button
            variant="outlined"
            sx={{
              ml: { xs: 0, sm: 0, md: 2 },
              mt: { xs: 2, sm: 2, md: 0 },
              width: 218,
            }}
          >
            To Learn More
          </Button>
        </Link>
      )}
    </Box>
  );
};
