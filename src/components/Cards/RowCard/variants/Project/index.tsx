import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Box, Grid, styled, Typography } from '@mui/material';
import { routes } from 'appConstants/routes';
import { Status } from 'components/Status';
import { useTimeLeft } from 'hooks/useTimeLeft';
import { ProjectCardDataProps } from 'types';
import { formatNumber } from 'utils';

import { RowCardProps } from '../../RowCard';

const StyledLink = styled(Link)({
  width: '100%',
});

export const Project: FC<Pick<RowCardProps, 'cardData'>> = ({ cardData }) => {
  const { projectName, projectIcon, token, status, id, startTime, hardCap } = cardData as ProjectCardDataProps;

  const timeLeft = useTimeLeft(+startTime * 1000, true);

  return (
    <StyledLink to={routes.idos.details.root.getPath(id)}>
      <Grid container alignItems="center" spacing={{ xs: 3, sm: 3, md: 0 }}>
        <Grid
          item
          container
          justifyContent="flex-start"
          alignItems="center"
          wrap="nowrap"
          spacing={1}
          xs={12}
          sm={12}
          md={4}
        >
          {projectIcon && <Box component="img" sx={{ widht: 72, height: 72 }} src={projectIcon} alt="" />}
          {projectName && (
            <Grid item>
              <Typography variant="h4" textTransform="uppercase" whiteSpace="nowrap">
                {projectName}
              </Typography>
            </Grid>
          )}
        </Grid>

        {token?.icon && (
          <Grid item xs={4} sm={4} md={1}>
            <Box component="img" sx={{ widht: 37, height: 37 }} src={token.icon} alt="" />
          </Grid>
        )}
        {startTime && (
          <Grid item xs={4} sm={4} md={2}>
            <Typography variant="body2" textTransform="none" fontSize={{ xs: '14px', sm: '14px', md: '16px' }}>
              {timeLeft ? `${timeLeft.days}D ${timeLeft.hours}H ${timeLeft.minutes}M ${timeLeft.seconds}S` : null}
            </Typography>
          </Grid>
        )}
        {hardCap && (
          <Grid item xs={4} sm={4} md={2}>
            <Typography variant="body2" textTransform="none" fontSize={{ xs: '14px', sm: '14px', md: '16px' }}>
              {formatNumber(hardCap)}
            </Typography>
          </Grid>
        )}
        {status && (
          <Grid item xs={12} sm={12} md={3} container justifyContent="center" alignItems="center">
            <Status status={status} />
          </Grid>
        )}
      </Grid>
    </StyledLink>
  );
};
