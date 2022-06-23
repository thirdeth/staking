import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Grid, styled, Typography } from '@mui/material';
import { routes } from 'appConstants/routes';
import { Status } from 'components/Status';
import { ProjectCardDataProps } from 'types';
import { dateFormatter } from 'utils';

import { RowCardProps } from '../../RowCard';

const StyledLink = styled(Link)({
  width: '100%',
});

export const Project: FC<Pick<RowCardProps, 'cardData'>> = ({ cardData }) => {
  const { projectName, projectIcon, token, status, boughtAmount, buyDate }: ProjectCardDataProps = cardData;

  return (
    <StyledLink to={routes.idos.details.root.getPath(cardData.id)}>
      <Grid container alignItems="center">
        <Grid
          item
          container
          justifyContent="flex-start"
          alignItems="center"
          wrap="nowrap"
          spacing={1}
          xs={12}
          sm={12}
          md={4.5}
        >
          {projectIcon && (
            <Grid item>
              <img src={projectIcon} alt="project-icon" />
            </Grid>
          )}
          {projectName && (
            <Grid item>
              <Typography variant="h4" textTransform="uppercase" whiteSpace="nowrap">
                {projectName}
              </Typography>
            </Grid>
          )}
        </Grid>

        {token && (
          <Grid
            item
            container
            justifyContent="flex-start"
            alignItems="flex-start"
            spacing={1}
            sx={{ img: { maxWidth: '36px', maxHeight: '37px' } }}
            xs={6}
            sm={6}
            md={3}
          >
            {token.icon && (
              <Grid item>
                <img src={token.icon} alt="project-icon" />
              </Grid>
            )}
            <Grid item container direction="column" alignItems="flex-start" justifyContent="flex-start">
              <Grid item>
                <Typography variant="body2" textTransform="none">
                  {token.name}
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="body2" textTransform="none">
                  ({token.symbol})
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        )}
        {boughtAmount && (
          <Grid item xs={6} sm={6} md={2.5}>
            <Typography variant="body2" textTransform="none">
              {boughtAmount} {token && token.symbol}
            </Typography>
          </Grid>
        )}
        {buyDate && (
          <Grid item xs={2}>
            <Typography variant="body2" textTransform="none">
              {dateFormatter(buyDate)}
            </Typography>
          </Grid>
        )}
        {status && (
          <Grid item xs={12} sm={12} md={2} container justifyContent="center" alignItems="center">
            <Status status={status} />
          </Grid>
        )}
      </Grid>
    </StyledLink>
  );
};
