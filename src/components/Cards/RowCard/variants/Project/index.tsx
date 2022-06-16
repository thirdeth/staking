import { FC } from 'react';
import { Grid, Typography } from '@mui/material';
import { Status } from 'components/Status';
import { ProjectCardDataProps } from 'types';
import { dateFormatter } from 'utils';

import { RowCardProps } from '../../RowCard';

export const Project: FC<Pick<RowCardProps, 'cardData'>> = ({ cardData }) => {
  const { projectName, projectIcon, token, status, boughtAmount, buyDate }: ProjectCardDataProps = cardData;

  return (
    <>
      <Grid container justifyContent="flex-start" alignItems="center" wrap="nowrap" columnGap={1}>
        {projectIcon && (
          <Grid item>
            <img src={projectIcon} alt="project-icon" />
          </Grid>
        )}
        {projectName && (
          <Grid item md={4} xs={12}>
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
          justifyContent="center"
          alignItems="flex-start"
          columnGap={1}
          sx={{
            img: {
              maxWidth: '36px',
              maxHeight: '37px',
            },
          }}
          md={4}
          xs={6}
        >
          {token.icon && (
            <Grid item>
              <img src={token.icon} alt="project-icon" />
            </Grid>
          )}
          <Grid item container direction="column" alignItems="flex-start">
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
        <Grid item md={2} xs={6}>
          <Typography variant="body2" textTransform="none">
            {boughtAmount} {token && token.symbol}
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
      {status && (
        <Grid item md={2} xs={12} container justifyContent="center" alignItems="center">
          <Status status={status} />
        </Grid>
      )}
    </>
  );
};
