import { Details, Idos } from 'modules/ido/pages';
import { Home } from 'modules/landing/pages';
import { MyInvestments } from 'modules/myInvestments/pages';
import { Ranking } from 'modules/ranking/pages';
import { Staking } from 'modules/staking/pages';
import { Modules, RoutesProps } from 'types';

/**
@Description
key 'dirName' - should be equal to component dir name
@example MyInvestments - name of dir and dirName: MyInvestments
*/

export const routes: RoutesProps = {
  home: {
    dirName: 'Home',
    root: {
      id: 1,
      title: 'Home',
      path: '/',
      component: <Home />,
      isNavItem: true,
      module: Modules.landing,
    },
  },
  idos: {
    dirName: 'Idos',
    root: {
      id: 2,
      title: 'IDOs',
      path: '/idos',
      component: <Idos />,
      isNavItem: true,
      module: Modules.ido,
    },
    details: {
      dirName: 'Details',
      root: {
        id: 3,
        title: 'Details',
        path: '/idos/details/:id',
        getPath: (id: number) => `/idos/details/${id}`,
        component: <Details />,
        isNavItem: false,
        module: Modules.ido,
        isDynamic: true,
      },
    },
  },
  staking: {
    dirName: 'Staking',
    root: {
      id: 4,
      title: 'Staking',
      path: '/staking',
      component: <Staking title="title" />,
      isNavItem: true,
      module: Modules.staking,
    },
    ranking: {
      dirName: 'Ranking',
      root: {
        id: 5,
        title: 'Ranking',
        path: '/staking/ranking',
        component: <Ranking />,
        isNavItem: false,
        module: Modules.ranking,
      },
    },
  },
  'my-investments': {
    dirName: 'MyInvestments',
    root: {
      id: 6,
      title: 'My Investments',
      path: '/my-investments',
      component: <MyInvestments title="My Investments" />,
      isNavItem: false,
      isProtected: true,
      module: Modules.myInvestments,
    },
  },
};
