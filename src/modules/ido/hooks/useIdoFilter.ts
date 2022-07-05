import { useCallback, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SelectChangeEvent } from '@mui/material';
import { PARAMS } from 'types';
import { IdoPublic, IdoStatus } from 'types/store/requests';

export const useIdoFilter = (isUrlUpdated = false) => {
  const [publicFilter, setPublicFilterValue] = useState(IdoPublic.all);
  const [idoStatus, setIdoStatus] = useState(IdoStatus.pending);

  const [currentPage, setCurrentPage] = useState(0);

  const [searchParams, setSearchParams] = useSearchParams();

  const handleChangePublicFilter = useCallback(
    (event: SelectChangeEvent<unknown>) => {
      const { value } = event.target;
      setPublicFilterValue(value as IdoPublic);

      if (isUrlUpdated) {
        const oldParams = Object.fromEntries(new URLSearchParams(searchParams.toString()));
        setSearchParams({ ...oldParams, [PARAMS.access]: value as string });
      }
    },
    [isUrlUpdated, searchParams, setSearchParams],
  );

  const handleChangeIdoStatus = useCallback(
    (value: IdoStatus) => {
      setIdoStatus(value);

      if (isUrlUpdated) {
        const oldParams = Object.fromEntries(new URLSearchParams(searchParams.toString()));
        setSearchParams({ ...oldParams, [PARAMS.status]: value as string });
      }
    },
    [isUrlUpdated, searchParams, setSearchParams],
  );

  const handleChangeCurrentPage = useCallback((value: number) => {
    setCurrentPage(value);
  }, []);

  return {
    publicFilter,
    handleChangePublicFilter,
    idoStatus,
    handleChangeIdoStatus,
    currentPage,
    handleChangeCurrentPage,
    searchParams,
  };
};
