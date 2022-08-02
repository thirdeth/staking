import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { isEmpty } from 'lodash';
import { IdoRequiredProps } from 'modules/ido/pages/Details/Details.types';
import { useWalletConnectorContext } from 'services';
import { getIdoById, getInvestmentsInfo } from 'store/ido/actions';
import { IdoStatus } from 'types/store/requests';

export const useUpdateIdoData = (currentIdo: IdoRequiredProps, id: string | undefined) => {
  const { idoIncrement, status, vesting } = currentIdo;
  const dispatch = useDispatch();
  const { walletService } = useWalletConnectorContext();

  const isNotSuccess = status !== IdoStatus.completedSuccess;
  const isNotFail = status !== IdoStatus.completedFail;
  const isUpcoming = status === IdoStatus.pending;

  const [isUpdateIdo, setUpdateIdo] = useState(false);

  useEffect(() => {
    const refreshTimeout = setInterval(() => {
      // if project status === upcoming(pending) => timer time will be equal start time
      const isStageTimeExpire =
        (new Date(+currentIdo[isUpcoming ? 'start' : 'timer'] * 1000).getTime() - Date.now()) / 1000 <= 0;

      if (isStageTimeExpire && isNotSuccess && isNotFail) {
        setUpdateIdo(true);
      }
    }, 1000);

    return () => {
      clearInterval(refreshTimeout);
    };
  }, [currentIdo, isNotFail, isNotSuccess, isUpcoming]);

  useEffect(() => {
    if (id && !isEmpty(currentIdo) && isUpdateIdo) {
      dispatch(getIdoById({ id }));
      dispatch(
        getInvestmentsInfo({
          web3Provider: walletService.Web3(),
          idoId: id,
          idoIncrement: idoIncrement.toString(),
          vesting: !!vesting,
        }),
      );
      setUpdateIdo(false);
    }
  }, [currentIdo, dispatch, id, idoIncrement, isUpdateIdo, vesting, walletService]);
};
