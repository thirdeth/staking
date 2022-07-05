import { useShallowSelector } from 'hooks';
import idoSelector from 'store/ido/selectors';
import { ProjectCardDataProps } from 'types';
import { IdoStatus } from 'types/store/requests';

type ReturnType = {
  idos: ProjectCardDataProps[];
  count: number;
};

export const useUpdatedIdoDataFromApi = (): ReturnType => {
  const {
    ido: { idos, count },
  } = useShallowSelector(idoSelector.getIdo);

  return {
    idos: idos.map(
      ({ id, projectName, tokenName, tokenSymbol, status, logoUrl, totalBought, tokenLogoUrl, start, hardCap }) => {
        return {
          id,
          projectName,
          token: {
            name: tokenName,
            icon: tokenLogoUrl || 'https://www.svgrepo.com/show/36559/question-mark.svg',
            symbol: tokenSymbol,
          },
          status: status as IdoStatus,
          projectIcon: logoUrl || 'https://www.svgrepo.com/show/36559/question-mark.svg',
          boughtAmount: totalBought,
          startTime: start,
          hardCap,
        };
      },
    ),
    count,
  };
};
