import { Fragment, lazy } from 'react';
import { Navigate, Route } from 'react-router-dom';
import { RoutesProps } from 'types';

import { formatRoutesToArr } from './formatRoutesToArr';

export default function getLazyRoutes(routes: RoutesProps, loggedIn: boolean) {
  const routesArr = formatRoutesToArr(routes).map(
    ({ dirName, root: { path, id, title, isProtected, module: configModule }, ...nested }) => {
      const Component = lazy(() =>
        import(`modules/${configModule}/pages/${dirName}`).then((module) => ({ default: module[dirName] })),
      );
      const hasNestedRoutes = Object.keys(nested).length;

      if (hasNestedRoutes) {
        return (
          <Fragment key={id}>
            {getLazyRoutes(nested, loggedIn)}
            <Route
              path={path}
              element={isProtected && !loggedIn ? <Navigate to="/" /> : <Component title={title} />}
              key={id}
            />
          </Fragment>
        );
      }
      return (
        <Route
          path={path}
          element={isProtected && !loggedIn ? <Navigate to="/" /> : <Component title={title} />}
          key={id}
        />
      );
    },
  );
  return routesArr.flat();
}
