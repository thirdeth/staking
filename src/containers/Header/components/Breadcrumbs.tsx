import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumbs as BreadcrumbsMui, Grid, styled, Typography } from '@mui/material';
import { HomeIcon } from 'components/Icon/components';
import { BreadcrumbsPaths } from 'hooks';
import { COLOR_TEXT_BLUE, COLOR_TEXT_GRAY_EXTRALIGHT } from 'theme/variables';

interface BreadcrumbsProps {
  routesBreadcrumbs: BreadcrumbsPaths[];
}

const BreadcrumbsBox = styled(BreadcrumbsMui)({
  width: '100%',
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'cetner',
});

export const Breadcrumbs: FC<BreadcrumbsProps> = ({ routesBreadcrumbs }) => {
  return (
    <BreadcrumbsBox>
      <Link to="/">
        <Grid container justifyContent="flex-start" alignItems="center" wrap="nowrap" columnGap={1}>
          <HomeIcon />
          <Typography variant="body1" color={COLOR_TEXT_GRAY_EXTRALIGHT}>
            Home
          </Typography>
        </Grid>
      </Link>
      {routesBreadcrumbs.map(({ path, label }, index) => (
        <Link key={path + label} to={path}>
          <Typography
            variant="body1"
            color={index === routesBreadcrumbs.length - 1 ? COLOR_TEXT_BLUE : COLOR_TEXT_GRAY_EXTRALIGHT}
          >
            {label}
          </Typography>
        </Link>
      ))}
    </BreadcrumbsBox>
  );
};
