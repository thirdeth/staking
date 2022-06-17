import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { routes as appRoutes } from 'appConstants/routes';
import { RoutesProps } from 'types';

export type BreadcrumbsPaths = {
  path: string;
  label: string;
};

export const useBreadcrumbs = () => {
  const { pathname } = useLocation();

  const baseUrl = useMemo(() => appRoutes?.home?.root?.path?.replace(/\//g, '') ?? {}, []);

  return useMemo<[BreadcrumbsPaths[], string]>(() => {
    // getting array of routes for breadcrumbs single links
    const pathParts = pathname
      .split('/')
      .slice(1)
      .filter((path) => path);
    let title = '';
    let crumbsPaths: BreadcrumbsPaths[] = [];

    // mapping of routes in the path and return
    // crumbsPaths Array of objects {path, label}
    pathParts.reduce(
      (acc, part, index) => {
        const { routes }: RoutesProps = acc;
        if (baseUrl === part) {
          title = appRoutes.home.root.title;
          crumbsPaths = [];
          crumbsPaths.push({
            path: appRoutes.home.root.path,
            label: appRoutes.home.root.title,
          });
          return {
            path: appRoutes.home.root.path,
            routes: appRoutes,
          };
        }
        const newRoutes = routes[part];

        // if the next route in the path is dynamic
        // crumbs path will exclude next dynamic route
        if (routes[part]?.root.isDynamic && !routes[part]?.[pathParts[index + 1]]?.root.isDynamic) {
          pathParts.splice(index + 1, 1);
        }

        if (newRoutes === undefined && !routes[part]?.isDynamic) {
          title = '';
          crumbsPaths = [];
          return {
            path: '/',
            routes: {},
          };
        }

        // if the next route in the path is not dynamic
        // it pushes into crumbs array
        crumbsPaths.push({
          path:
            newRoutes?.isDynamic && newRoutes.defaultDynamicRoot ? newRoutes.defaultDynamicRoot : newRoutes.root.path,
          label: newRoutes.root.title,
        });

        title = newRoutes.root.title;
        return {
          path:
            newRoutes?.isDynamic && newRoutes.defaultDynamicRoot ? newRoutes.defaultDynamicRoot : newRoutes.root.path,
          routes: newRoutes,
        };
      },
      {
        path: '/',
        routes: appRoutes,
      },
    );

    return [crumbsPaths, title];
  }, [pathname, baseUrl]);
};
