import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Box, Grid, styled, Typography } from '@mui/material';
import { routes } from 'appConstants/routes';
import { ProgressBar } from 'components';
import { Status } from 'components/Status';
import { useTimeLeft } from 'hooks/useTimeLeft';
import { IdoType } from 'modules/ido/utils';
import { FontWeights } from 'theme/Typography';
import { COLOR_TEXT_GRAY_DARK } from 'theme/variables';
import { ProjectCardDataProps } from 'types';
import { formatNumber } from 'utils';

import { RowCardProps } from '../../RowCard';

const StyledLink = styled(Link)({
  width: '100%',
});

const TypographySybtitle = styled(Typography)(({ theme }) => ({
  variant: 'subtitle1',
  color: COLOR_TEXT_GRAY_DARK,
  fontWeight: FontWeights.fontWeightRegular,
  fontSize: '14px',
  [theme.breakpoints.up('md')]: { display: 'none' },
}));

export const Project: FC<Pick<RowCardProps, 'cardData'>> = ({ cardData }) => {
  const {
    projectName,
    projectIcon,
    token,
    id,
    startTime,
    hardCap,
    isPublic,
    type,
    status,
    timer,
    price,
    boughtAmount,
  } = cardData as ProjectCardDataProps;

  const timeLeft = useTimeLeft(+(type === IdoType.pending ? startTime : timer) * 1000, true);

  return (
    <StyledLink to={routes.idos.details.root.getPath(id)}>
      <Grid container alignItems={{ xs: 'stretch', sm: 'stretch', md: 'center' }} spacing={2}>
        <Grid item justifyContent="flex-start" alignItems="center" wrap="nowrap" xs={12} sm={12} md={4}>
          <TypographySybtitle>Project name</TypographySybtitle>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            {projectIcon && <Box component="img" sx={{ width: 72, height: 72 }} src={projectIcon} alt="" />}
            <Box ml={2}>
              {projectName && (
                <Typography variant="h4" textTransform="uppercase" whiteSpace="nowrap">
                  {projectName}
                </Typography>
              )}
              {token?.symbol && price && (
                <Typography whiteSpace="nowrap">{`Price (${token?.symbol}) = ${price} CRO`}</Typography>
              )}
            </Box>
          </Box>
        </Grid>
        <Grid item xs={6} sm={6} md={type === IdoType.completed ? 2 : 1}>
          <TypographySybtitle>Token</TypographySybtitle>
          <Box display="flex" alignItems="center">
            {token?.icon && <Box component="img" sx={{ width: 37, height: 37 }} src={token.icon} alt="token" />}
            <Box ml={2} sx={{ display: { xs: 'block', sm: 'block', md: 'none' } }}>
              <Typography>{token?.name}</Typography>
              <Typography>{`(${token?.symbol})`}</Typography>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={6} sm={6} md={type === IdoType.completed ? 3 : 2}>
          {startTime && type === IdoType.pending && (
            <>
              <TypographySybtitle>Starts in</TypographySybtitle>
              <Typography variant="body2" textTransform="none" fontSize={{ xs: '14px', sm: '14px', md: '16px' }}>
                {timeLeft && `${timeLeft.days}D ${timeLeft.hours}H ${timeLeft.minutes}M ${timeLeft.seconds}S`}
              </Typography>
            </>
          )}
          {status && type === IdoType.inProgress && (
            <>
              <TypographySybtitle>Stage</TypographySybtitle>
              <Typography variant="body2" textTransform="none" fontSize={{ xs: '14px', sm: '14px', md: '16px' }}>
                {status.replaceAll('_', ' ')}
              </Typography>
            </>
          )}
          {status && type === IdoType.completed && (
            <>
              <TypographySybtitle>Status</TypographySybtitle>
              <Typography variant="body2" textTransform="none" fontSize={{ xs: '14px', sm: '14px', md: '16px' }}>
                {status.replaceAll('COMPLETED_', ' ')}
              </Typography>
            </>
          )}
        </Grid>
        {type !== IdoType.completed && (
          <Grid item xs={6} sm={6} md={2.5}>
            {hardCap && type === IdoType.pending && (
              <>
                <TypographySybtitle>Targeted raise</TypographySybtitle>
                <Typography variant="body2" textTransform="none" fontSize={{ xs: '14px', sm: '14px', md: '16px' }}>
                  {formatNumber(hardCap)}
                </Typography>
              </>
            )}
            {timer && type === IdoType.inProgress && (
              <>
                <TypographySybtitle>Next stage will start in</TypographySybtitle>
                <Typography variant="body2" textTransform="none" fontSize={{ xs: '14px', sm: '14px', md: '16px' }}>
                  {timeLeft && `${timeLeft.days}D ${timeLeft.hours}H ${timeLeft.minutes}M ${timeLeft.seconds}S`}
                </Typography>
              </>
            )}
          </Grid>
        )}

        <Grid item xs={6} sm={6} md={type === IdoType.completed ? 3 : 2.5} justifyContent="center" alignItems="center">
          {isPublic && type === IdoType.pending ? (
            <>
              <TypographySybtitle>Access Type</TypographySybtitle>
              <Status isPublic={isPublic} />
            </>
          ) : (
            <>
              <TypographySybtitle>Total raised</TypographySybtitle>
              <ProgressBar base={hardCap} progress={Number(boughtAmount)} variant="parallelogram" />
            </>
          )}
        </Grid>
      </Grid>
    </StyledLink>
  );
};
