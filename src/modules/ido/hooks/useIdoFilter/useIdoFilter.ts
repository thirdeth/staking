import { useCallback, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SelectChangeEvent } from '@mui/material';
import { PARAMS } from 'types';
import { IdoPublic, IdoStatus } from 'types/store/requests';

export const useIdoFilter = (isUrlUpdated = false) => {
  const [publicFilter, setPublicFilterValue] = useState(IdoPublic.all);
  const [idoStatuses, setIdoStatuses] = useState<IdoStatus[]>([
    IdoStatus.inProgress,
    IdoStatus.register,
    IdoStatus.registrationClosed,
  ]);
  const [currentPage, setCurrentPage] = useState(0);

  const [searchParams, setSearchParams] = useSearchParams();

  const defaultStakingRequreValue = searchParams.get(PARAMS.access) as string;

  const [isStakingRequire, setStakingRequire] = useState(
    defaultStakingRequreValue ? defaultStakingRequreValue.includes(IdoPublic.publicStaking) : true,
  );

  const handleChangePublicFilter = useCallback(
    (event: SelectChangeEvent<unknown>) => {
      const { value } = event.target;
      setPublicFilterValue(value as IdoPublic);

      if (isUrlUpdated) {
        const statusParams = new URLSearchParams(searchParams).getAll(PARAMS.status).join(',');

        setSearchParams({
          [PARAMS.status]: statusParams,
          [PARAMS.access]: value as string,
        });
      }
    },
    [isUrlUpdated, searchParams, setSearchParams],
  );

  const handleChangeIdoStatus = useCallback(
    (value: IdoStatus[]) => {
      setIdoStatuses(value);

      if (isUrlUpdated) {
        const accessParams = new URLSearchParams(searchParams).getAll(PARAMS.access).join(',');

        setSearchParams({
          [PARAMS.status]: value,
          [PARAMS.access]: accessParams,
        });
      }
    },
    [isUrlUpdated, searchParams, setIdoStatuses, setSearchParams],
  );

  const handleChangeCurrentPage = useCallback((value: number) => {
    setCurrentPage(value);
  }, []);

  const handleChangeStakingRequired = useCallback(() => {
    if (isUrlUpdated) {
      // params in url at now
      const statusParams = new URLSearchParams(searchParams).getAll(PARAMS.status);
      let newStatusParams = [IdoStatus.inProgress] as string[];

      if (statusParams.length) {
        newStatusParams =
          statusParams.includes(IdoStatus.register) || statusParams.includes(IdoStatus.registrationClosed)
            ? [IdoStatus.inProgress]
            : statusParams;
      }

      setSearchParams({
        [PARAMS.status]: newStatusParams,
        [PARAMS.access]: isStakingRequire ? IdoPublic.all : IdoPublic.publicStaking,
      });

      setCurrentPage(0);
      setStakingRequire(!isStakingRequire);
    }
  }, [isStakingRequire, isUrlUpdated, searchParams, setSearchParams]);

  return {
    publicFilter,
    isStakingRequire,
    handleChangePublicFilter,
    idoStatuses,
    setIdoStatuses,
    handleChangeIdoStatus,
    handleChangeStakingRequired,
    currentPage,
    handleChangeCurrentPage,
    searchParams,
  };
};
