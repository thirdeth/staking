import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumbs as BreadcrumbsMui, Grid, Link as ExternalLink, Typography } from '@mui/material';
import { EXTERNAL_APP_LINK } from 'appConstants/URL';
import { HomeIcon } from 'components/Icon/components';
import { BreadcrumbsPaths } from 'modules/layout/hooks';
import { COLOR_TEXT_BLUE, COLOR_TEXT_GRAY_EXTRALIGHT } from 'theme/variables';

interface BreadcrumbsProps {
  routesBreadcrumbs: BreadcrumbsPaths[];
}

export const Breadcrumbs: FC<BreadcrumbsProps> = ({ routesBreadcrumbs }) => {
  return (
    <BreadcrumbsMui
      sx={(theme) => ({
        paddingBottom: theme.spacing(6),
        width: '100%',
      })}
    >
      <ExternalLink href={EXTERNAL_APP_LINK}>
        <Grid container justifyContent="flex-start" alignItems="center" wrap="nowrap" columnGap={1}>
          <HomeIcon />
          <Typography variant="body1" color={COLOR_TEXT_GRAY_EXTRALIGHT}>
            Home
          </Typography>
        </Grid>
      </ExternalLink>

      {routesBreadcrumbs.map(({ path, label }, index) => {
        if (index === routesBreadcrumbs.length - 1) {
          return (
            <Typography
              key={path + label}
              variant="body1"
              color={index === routesBreadcrumbs.length - 1 ? COLOR_TEXT_BLUE : COLOR_TEXT_GRAY_EXTRALIGHT}
            >
              {label}
            </Typography>
          );
        }
        return (
          <Link key={path + label} to={path}>
            <Typography
              variant="body1"
              color={index === routesBreadcrumbs.length - 1 ? COLOR_TEXT_BLUE : COLOR_TEXT_GRAY_EXTRALIGHT}
            >
              {label}
            </Typography>
          </Link>
        );
      })}
    </BreadcrumbsMui>
  );
};
