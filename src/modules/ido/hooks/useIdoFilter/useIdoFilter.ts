import { useCallback, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SelectChangeEvent } from '@mui/material';
import { PARAMS } from 'types';
import { IdoPublic, IdoStatus } from 'types/store/requests';

export const useIdoFilter = (isUrlUpdated = false) => {
  const [publicFilter, setPublicFilterValue] = useState(IdoPublic.all);
  const [idoStatuses, setIdoStatuses] = useState<IdoStatus[]>([IdoStatus.pending]);

  const [currentPage, setCurrentPage] = useState(0);

  const [searchParams, setSearchParams] = useSearchParams();

  const handleChangePublicFilter = useCallback(
    (event: SelectChangeEvent<unknown>) => {
      const { value } = event.target;
      setPublicFilterValue(value as IdoPublic);

      if (isUrlUpdated) {
        const statusParams = new URLSearchParams(searchParams).getAll(PARAMS.status);

        setSearchParams({ [PARAMS.status]: statusParams, [PARAMS.access]: value as string });
      }
    },
    [isUrlUpdated, searchParams, setSearchParams],
  );

  const handleChangeIdoStatus = useCallback(
    (value: IdoStatus[]) => {
      setIdoStatuses(value);

      if (isUrlUpdated) {
        const accessParams = new URLSearchParams(searchParams).getAll(PARAMS.access);

        setSearchParams({ [PARAMS.status]: value, [PARAMS.access]: accessParams });
      }
    },
    [isUrlUpdated, searchParams, setIdoStatuses, setSearchParams],
  );

  const handleChangeCurrentPage = useCallback((value: number) => {
    setCurrentPage(value);
  }, []);

  return {
    publicFilter,
    handleChangePublicFilter,
    idoStatuses,
    setIdoStatuses,
    handleChangeIdoStatus,
    currentPage,
    handleChangeCurrentPage,
    searchParams,
  };
};
