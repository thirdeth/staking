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

  const [isUpdateIdo, setUpdateIdo] = useState(false);

  useEffect(() => {
    const timeOut = setInterval(() => {
      const isStageTimeExpire = (new Date(+currentIdo.timer * 1000).getTime() - Date.now()) / 1000 <= 0;
      if (isStageTimeExpire && isNotSuccess && isNotFail) {
        setUpdateIdo(true);
      }
    }, 1000);

    return () => {
      clearInterval(timeOut);
    };
  }, [currentIdo.timer, isNotFail, isNotSuccess]);

  useEffect(() => {
    if (id && !isEmpty(currentIdo) && isUpdateIdo) {
      dispatch(getIdoById({ id }));
      setUpdateIdo(false);
    }
  }, [currentIdo, dispatch, id, isUpdateIdo]);
};
