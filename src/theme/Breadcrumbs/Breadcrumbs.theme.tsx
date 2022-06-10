import { ComponentsOverrides, ComponentsProps, Theme } from '@mui/material';
import { ArrowBreadcrumbs } from 'components/Icon/components';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getMuiBreadcrumbsOverrides = (theme?: Theme): ComponentsOverrides['MuiBreadcrumbs'] => ({});

export const getMuiBreadcrumbsDefaultProps = (): ComponentsProps['MuiBreadcrumbs'] => ({
  separator: <ArrowBreadcrumbs />,
});
