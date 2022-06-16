import { Home, Idos, MyInvestments, Ranking, Staking } from 'pages';
import { RoutesProps } from 'types';

// eslint-disable-next-line no-lone-blocks
{
  /**
@Description
key 'dirName' - should be equal to component dir name
@example MyInvestments - name of dir and dirName: MyInvestments
*/
}
export const routes: RoutesProps = {
  home: {
    dirName: 'Home',
    root: {
      id: 1,
      title: 'Home',
      path: '/',
      component: <Home />,
      isNavItem: true,
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
    },
  },
  staking: {
    dirName: 'Staking',
    root: {
      id: 3,
      title: 'Staking',
      path: '/staking',
      component: <Staking />,
      isNavItem: true,
    },
    ranking: {
      dirName: 'Ranking',
      root: {
        id: 4,
        title: 'Ranking',
        path: '/staking/ranking',
        component: <Ranking />,
        isNavItem: false,
      },
    },
  },
  'my-investments': {
    dirName: 'MyInvestments',
    root: {
      id: 5,
      title: 'My Investments',
      path: '/my-investments',
      component: <MyInvestments title="My Investments" />,
      isNavItem: false,
      isProtected: true,
    },
  },
};