import { ReactElement } from 'react';

export interface RootRouteProps {
  id: number;
  title: string;
  path: string;
  component: ReactElement;
  isNavItem?: boolean;
  isDynamic?: boolean;
  isProtected?: boolean;
}
export interface RouteProps {
  dirName: string;
  root: RootRouteProps;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [k: string]: any;
}
export interface RoutesProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [k: string]: any;
}
