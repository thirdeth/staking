import { ComponentsOverrides, ComponentsProps } from '@mui/material';
import { ArrowBreadcrumbs } from 'components/Icon/components';

export const getMuiBreadcrumbsOverrides = (): ComponentsOverrides['MuiBreadcrumbs'] => ({});

export const getMuiBreadcrumbsDefaultProps = (): ComponentsProps['MuiBreadcrumbs'] => ({
  separator: <ArrowBreadcrumbs />,
});
