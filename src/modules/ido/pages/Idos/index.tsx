/* eslint-disable react/no-array-index-key */
import { FC, useCallback, useEffect, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { Box, Button, Grid } from '@mui/material';
import { ApplyCard, RowCard } from 'components';
import { RowCardSkeleton } from 'components/Cards/RowCard/components';
import { useShallowSelector } from 'hooks';
import { CardsHeader, StageBar } from 'modules/ido/components';
import { useIdoFilter, useUpdatedIdoDataFromApi } from 'modules/ido/hooks';
import { getIdoTypeFromIdoStatus } from 'modules/ido/utils';
import { getIdoList } from 'store/ido/actions';
import idoActionTypes from 'store/ido/actionTypes';
import { updateIdoState } from 'store/ido/reducer';
import uiSelector from 'store/ui/selectors';
import { PARAMS, RequestStatus } from 'types';
import { IdoPublic, IdoStatus } from 'types/store/requests';

const DEFAULT_IDOS_PER_PAGE = 5;

interface IdoPageProps {
  isMyIdos?: boolean;
}

export const Idos: FC<IdoPageProps> = ({ isMyIdos }) => {
  const dispatch = useDispatch();

  const { idos, count } = useUpdatedIdoDataFromApi();

  const getIdoListRequestStatus = useShallowSelector(uiSelector.getProp(idoActionTypes.GET_IDO_LIST));

  const isLoading = getIdoListRequestStatus === RequestStatus.REQUEST;

  const { handleChangePublicFilter, handleChangeIdoStatus, currentPage, handleChangeCurrentPage, searchParams } =
    useIdoFilter(true);

  const statusParams = useMemo(
    () =>
      (searchParams.getAll(PARAMS.status) as IdoStatus[]).length
        ? (searchParams.getAll(PARAMS.status) as IdoStatus[])
        : [IdoStatus.pending],
    [searchParams],
  );

  const handleChangePageAndFetch = useCallback(
    (page: number) => {
      handleChangeCurrentPage(page);

      dispatch(
        getIdoList({
          public: (searchParams.get(PARAMS.access) as IdoPublic) || IdoPublic.all,
          status: statusParams,
          count: DEFAULT_IDOS_PER_PAGE,
          start: page * DEFAULT_IDOS_PER_PAGE,
          isMyIdos,
          shouldConcat: true,
        }),
      );
    },
    [dispatch, handleChangeCurrentPage, isMyIdos, searchParams, statusParams],
  );

  useEffect(() => {
    // smoth changes for user
    dispatch(
      updateIdoState({
        ido: {
          count: 0,
          idos: [],
        },
      }),
    );
    handleChangeCurrentPage(0);
    dispatch(
      getIdoList({
        public: (searchParams.get(PARAMS.access) as IdoPublic) || IdoPublic.all,
        status: statusParams,
        count: DEFAULT_IDOS_PER_PAGE,
        start: 0,
        isMyIdos,
      }),
    );
  }, [dispatch, handleChangeCurrentPage, isMyIdos, searchParams, statusParams]);

  const idoType = useMemo(
    () => getIdoTypeFromIdoStatus(searchParams.getAll(PARAMS.status) as IdoStatus[]),
    [searchParams],
  );

  return (
    <Box sx={{ overflowX: 'hidden' }}>
      <StageBar
        publicFilterValue={(searchParams.get(PARAMS.access) as IdoPublic) || IdoPublic.all}
        idoStatus={statusParams}
        onChangeFilter={handleChangePublicFilter}
        onChangeStatus={handleChangeIdoStatus}
      />

      <Grid pt={2} container spacing={2}>
        <Grid item xs={12} display={{ xs: 'none', sm: 'none', md: 'block' }}>
          <CardsHeader idoType={idoType} />
        </Grid>
        {idos.map((idoData) => (
          <Grid key={idoData.id} item xs={12}>
            <RowCard variant="project" cardData={idoData} />
          </Grid>
        ))}
        {isLoading &&
          Array(count > DEFAULT_IDOS_PER_PAGE ? count % DEFAULT_IDOS_PER_PAGE : DEFAULT_IDOS_PER_PAGE)
            .fill('')
            .map((_, index) => (
              <Grid key={index} item xs={12}>
                <RowCardSkeleton />
              </Grid>
            ))}
      </Grid>
      {count >= DEFAULT_IDOS_PER_PAGE * (currentPage + 1) && (
        <Button
          sx={{
            my: 5,
          }}
          onClick={() => handleChangePageAndFetch(currentPage + 1)}
        >
          Show more
        </Button>
      )}
      <ApplyCard size="s" />
    </Box>
  );
};
