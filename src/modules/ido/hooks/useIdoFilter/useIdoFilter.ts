import { useCallback, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SelectChangeEvent } from '@mui/material';
import { PARAMS } from 'types';
import { IdoPublic, IdoStatus, IdoWeights } from 'types/store/requests';

export const useIdoFilter = (isUrlUpdated = false) => {
  const [publicFilter, setPublicFilterValue] = useState(IdoPublic.all);
  const [idoStatuses, setIdoStatuses] = useState<IdoStatus[]>([IdoStatus.pending]);
  const [currentPage, setCurrentPage] = useState(0);

  const [searchParams, setSearchParams] = useSearchParams();

  const defaultStakingRequreValue = searchParams.get(PARAMS.with_weights) as IdoWeights;

  const [isStakingRequire, setStakingRequire] = useState(
    defaultStakingRequreValue ? defaultStakingRequreValue === 'true' : true,
  );

  const handleChangePublicFilter = useCallback(
    (event: SelectChangeEvent<unknown>) => {
      const { value } = event.target;
      setPublicFilterValue(value as IdoPublic);

      if (isUrlUpdated) {
        const statusParams = new URLSearchParams(searchParams).getAll(PARAMS.status);
        const weightsParams = new URLSearchParams(searchParams).getAll(PARAMS.with_weights);

        if (value === IdoPublic.all) {
          setSearchParams({ [PARAMS.status]: statusParams, [PARAMS.with_weights]: weightsParams });
        } else {
          setSearchParams({
            [PARAMS.status]: statusParams,
            [PARAMS.access]: [value as string],
            [PARAMS.with_weights]: weightsParams,
          });
        }
      }
    },
    [isUrlUpdated, searchParams, setSearchParams],
  );

  const handleChangeIdoStatus = useCallback(
    (value: IdoStatus[]) => {
      setIdoStatuses(value);

      if (isUrlUpdated) {
        const accessParams = new URLSearchParams(searchParams).getAll(PARAMS.access);
        const weightsParams = new URLSearchParams(searchParams).getAll(PARAMS.with_weights);

        setSearchParams({
          [PARAMS.status]: value,
          [PARAMS.access]: accessParams,
          [PARAMS.with_weights]: weightsParams,
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

      // if user switch with wrong status params it will be default inProgress status
      const newStatusParams =
        statusParams.includes(IdoStatus.register) || statusParams.includes(IdoStatus.registrationClosed)
          ? [IdoStatus.inProgress]
          : statusParams;

      if (isStakingRequire) {
        // if switch on not required (checked)
        setSearchParams({
          [PARAMS.status]: newStatusParams,
          [PARAMS.access]: [],
          [PARAMS.with_weights]: IdoWeights.withoutWeights,
        });
      } else {
        // if switch on required (unChecked)
        setSearchParams({
          [PARAMS.status]: statusParams,
          [PARAMS.access]: [IdoPublic.public],
          [PARAMS.with_weights]: IdoWeights.withWeights,
        });
      }

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
