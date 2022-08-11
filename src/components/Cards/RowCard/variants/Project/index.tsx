import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Box, Grid, styled, Tooltip, Typography } from '@mui/material';
import { routes } from 'appConstants/routes';
import { ProgressBar, ProjectCardDataProps, Status } from 'components';
import { useTimeLeft } from 'hooks/useTimeLeft';
import { IdoType } from 'modules/ido/utils';
import { BORDER_RADIUS_DEFAULT, COLOR_TEXT_GRAY_DARK, FontWeights } from 'theme';
import { formatNumber, fromDecimals } from 'utils';

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
    accessType,
    idoType,
    status,
    timer,
    price,
    boughtAmount,
  } = cardData as ProjectCardDataProps;

  const timeLeft = useTimeLeft(+timer * 1000, true);

  return (
    <StyledLink to={routes.idos.details.root.getPath(id)}>
      <Grid
        container
        alignItems={{ xs: 'stretch', sm: 'stretch', md: 'center' }}
        columnSpacing={{ xs: 2, sm: 3, md: 0 }}
      >
        <Grid item container justifyContent="flex-start" alignItems="center" wrap="nowrap" xs={12} sm={12} md={4}>
          {/* <TypographySybtitle>Project name</TypographySybtitle> */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            {projectIcon && (
              <Box
                component="img"
                sx={{ width: 72, height: 72, borderRadius: BORDER_RADIUS_DEFAULT }}
                src={projectIcon}
                alt=""
              />
            )}
            <Box ml={2}>
              {projectName && (
                <Tooltip title={projectName} arrow placement="bottom-start">
                  <Typography
                    variant="h4"
                    textTransform="uppercase"
                    whiteSpace="nowrap"
                    noWrap
                    maxWidth={{ xs: 210, sm: 210, md: 250 }}
                  >
                    {projectName}
                  </Typography>
                </Tooltip>
              )}
              {token?.symbol && price && (
                <Typography
                  noWrap
                  maxWidth={{ xs: 210, sm: 210, md: 250 }}
                  whiteSpace="nowrap"
                >{`Price (${token?.symbol.toUpperCase()}) = ${price} CRO`}</Typography>
              )}
            </Box>
          </Box>
        </Grid>
        <Grid item xs={6} sm={6} md={idoType === IdoType.completed ? 2 : 1}>
          <TypographySybtitle>Token</TypographySybtitle>
          <Box display="flex" alignItems="center">
            {token?.icon && (
              <Box component="img" sx={{ width: 37, height: 37, borderRadius: '50%' }} src={token.icon} alt="token" />
            )}
            <Box ml={{ xs: 1, sm: 1, md: 2 }} sx={{ display: { xs: 'block', sm: 'block', md: 'none' } }}>
              <Tooltip title={token?.name || ''} arrow placement="bottom-start">
                <Typography noWrap maxWidth={{ xs: 100, sm: 100, md: 'none' }}>
                  {token?.name}
                </Typography>
              </Tooltip>
              <Typography>{`(${token?.symbol.toUpperCase()})`}</Typography>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={6} sm={6} md={idoType === IdoType.completed ? 3 : 2}>
          {startTime && idoType === IdoType.pending && (
            <>
              <TypographySybtitle>Starts in</TypographySybtitle>
              <Typography variant="body2" textTransform="none" fontSize={{ xs: '14px', sm: '14px', md: '16px' }}>
                {timeLeft && `${timeLeft.days}D ${timeLeft.hours}H ${timeLeft.minutes}M ${timeLeft.seconds}S`}
              </Typography>
            </>
          )}
          {status && idoType === IdoType.inProgress && (
            <>
              <TypographySybtitle>Stage</TypographySybtitle>
              <Typography variant="body2" textTransform="none" fontSize={{ xs: '14px', sm: '14px', md: '16px' }}>
                {status.replaceAll('_', ' ').toUpperCase()}
              </Typography>
            </>
          )}
          {status && idoType === IdoType.completed && (
            <>
              <TypographySybtitle>Status</TypographySybtitle>
              <Typography variant="body2" textTransform="none" fontSize={{ xs: '14px', sm: '14px', md: '16px' }}>
                {status.replaceAll('completed_', ' ').toUpperCase()}
              </Typography>
            </>
          )}
        </Grid>
        {idoType !== IdoType.completed && (
          <Grid item xs={6} sm={6} md={3}>
            {hardCap && idoType === IdoType.pending && (
              <>
                <TypographySybtitle>Targeted raise</TypographySybtitle>
                <Typography variant="body2" textTransform="none" fontSize={{ xs: '14px', sm: '14px', md: '16px' }}>
                  {formatNumber(hardCap)}
                </Typography>
              </>
            )}
            {timer && idoType === IdoType.inProgress && (
              <>
                <TypographySybtitle>Next stage will start in</TypographySybtitle>
                <Typography variant="body2" textTransform="none" fontSize={{ xs: '14px', sm: '14px', md: '16px' }}>
                  {timeLeft && `${timeLeft.days}D ${timeLeft.hours}H ${timeLeft.minutes}M ${timeLeft.seconds}S`}
                </Typography>
              </>
            )}
          </Grid>
        )}

        <Grid
          item
          xs={12}
          sm={6}
          md={idoType === IdoType.completed ? 3 : 2}
          justifyContent="center"
          alignItems="center"
        >
          {accessType === 'public' && idoType === IdoType.pending ? (
            <>
              <TypographySybtitle>Access idoType</TypographySybtitle>
              <Status isPublic={accessType === 'public'} />
            </>
          ) : (
            <>
              <TypographySybtitle>Total raised</TypographySybtitle>
              <ProgressBar variant="circle" base={hardCap} progress={+fromDecimals(boughtAmount || 0)} />
            </>
          )}
        </Grid>
      </Grid>
    </StyledLink>
  );
};
