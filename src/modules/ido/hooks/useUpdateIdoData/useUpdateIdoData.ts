import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { isEmpty } from 'lodash';
import { IdoRequiredProps } from 'modules/ido/pages/Details/Details.types';
import { getIdoById } from 'store/ido/actions';
import { IdoStatus } from 'types/store/requests';

export const useUpdateIdoData = (currentIdo: IdoRequiredProps, id: string | undefined) => {
  const dispatch = useDispatch();

  const isNotSuccess = currentIdo.status !== IdoStatus.completedSuccess;
  const isNotFail = currentIdo.status !== IdoStatus.completedFail;
  const isUpcoming = currentIdo.status === IdoStatus.pending;

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
      setUpdateIdo(false);
    }
  }, [currentIdo, dispatch, id, isUpdateIdo]);
};
