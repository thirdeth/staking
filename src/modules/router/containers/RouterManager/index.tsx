import { FC, ReactElement, useEffect, useMemo, useState } from 'react';
import { Routes } from 'react-router-dom';
import { routes as appRoutes } from 'appConstants/routes';
import { useShallowSelector } from 'hooks';
import { getLazyRoutes } from 'modules/router/utils';
import userSelector from 'store/user/selectors';

export const RouteManager: FC = () => {
  const address = useShallowSelector(userSelector.getProp('address'));
  const lazyRotes = useMemo(() => getLazyRoutes(appRoutes, !!address.length), [address.length]);
  const [routes, setRoutes] = useState<ReactElement[] | null>();

  useEffect(() => {
    setRoutes(lazyRotes);
  }, [lazyRotes]);

  return routes ? <Routes>{routes}</Routes> : null;
};
