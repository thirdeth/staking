/* eslint-disable react/no-array-index-key */
import { FC, useCallback, useEffect, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { Box, Button, Grid } from '@mui/material';
import { ApplyCard, RowCard } from 'components';
import { InfoCard } from 'components/Cards/InfoCard';
import { RowCardSkeleton } from 'components/Cards/RowCard/components';
import { useShallowSelector } from 'hooks';
import { CardsHeader, StageBar, statusVariantItems } from 'modules/ido/components';
import { useIdoFilter, useUpdatedIdoDataFromApi } from 'modules/ido/hooks';
import { getIdoTypeFromIdoStatus } from 'modules/ido/utils';
import { getIdoList } from 'store/ido/actions';
import idoActionTypes from 'store/ido/actionTypes';
import { updateIdoState } from 'store/ido/reducer';
import uiSelector from 'store/ui/selectors';
import { BG_BLUE, COLOR_TEXT_BLACK } from 'theme/variables';
import { PARAMS, RequestStatus } from 'types';
import { IdoPublic, IdoStatus } from 'types/store/requests';

const DEFAULT_IDOS_PER_PAGE = 5;

interface IdoPageProps {
  isMyIdos?: boolean;
  isMyInvesments?: boolean;
}

export const Idos: FC<IdoPageProps> = ({ isMyIdos, isMyInvesments }) => {
  const dispatch = useDispatch();

  const { idos, count } = useUpdatedIdoDataFromApi();

  const getIdoListRequestStatus = useShallowSelector(uiSelector.getProp(idoActionTypes.GET_IDO_LIST));

  const isLoading = getIdoListRequestStatus === RequestStatus.REQUEST;

  const { handleChangePublicFilter, handleChangeIdoStatus, currentPage, handleChangeCurrentPage, searchParams } =
    useIdoFilter(true);

  const statusItemsArray = isMyInvesments ? statusVariantItems.slice(1, statusVariantItems.length) : statusVariantItems;
  const statusParams = useMemo(
    () =>
      (searchParams.getAll(PARAMS.status) as IdoStatus[]).length
        ? (searchParams.getAll(PARAMS.status) as IdoStatus[])
        : [IdoStatus.inProgress],
    [searchParams],
  );

  const handleChangePageAndFetch = useCallback(
    (page: number) => {
      handleChangeCurrentPage(page);

      dispatch(
        getIdoList({
          public: (searchParams.getAll(PARAMS.access) as IdoPublic[]) || IdoPublic.all,
          status: statusParams,
          count: DEFAULT_IDOS_PER_PAGE,
          start: page * DEFAULT_IDOS_PER_PAGE,
          isMyIdos: isMyIdos !== undefined ? [isMyIdos] : [],
          isMyInvesments: isMyInvesments !== undefined ? [isMyInvesments] : [],
          shouldConcat: true,
        }),
      );
    },
    [dispatch, handleChangeCurrentPage, isMyIdos, isMyInvesments, searchParams, statusParams],
  );

  useEffect(() => {
    // smooth changes for user
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
        public: (searchParams.getAll(PARAMS.access) as IdoPublic[]) || IdoPublic.all,
        status: statusParams,
        count: DEFAULT_IDOS_PER_PAGE,
        start: 0,
        isMyIdos: isMyIdos !== undefined ? [isMyIdos] : [],
        isMyInvesments: isMyInvesments !== undefined ? [isMyInvesments] : [],
      }),
    );
  }, [dispatch, handleChangeCurrentPage, isMyIdos, isMyInvesments, searchParams, statusParams]);

  const idoType = useMemo(() => getIdoTypeFromIdoStatus(statusParams), [statusParams]);

  return (
    <Box sx={{ overflowX: 'hidden' }}>
      <StageBar
        publicFilterValue={(searchParams.get(PARAMS.access) as IdoPublic) || IdoPublic.all}
        idoStatus={statusParams}
        statusItems={statusItemsArray}
        onChangeFilter={handleChangePublicFilter}
        onChangeStatus={handleChangeIdoStatus}
      />

      <Grid pt={2} container spacing={2}>
        {count && (
          <Grid item xs={12} display={{ xs: 'none', sm: 'none', md: 'block' }} padding={0}>
            <CardsHeader idoType={idoType} />
          </Grid>
        )}
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
      {count === 0 && !isLoading && (
        <InfoCard
          sx={{
            mt: 10,
          }}
          title={`There are no ${idoType} projects now. Keep tuned!`}
        />
      )}
      {count >= DEFAULT_IDOS_PER_PAGE * (currentPage + 1) && (
        <Button
          sx={{
            my: 5,
            color: COLOR_TEXT_BLACK,
            borderWidth: 2,
            '&:hover': {
              border: `2px solid ${BG_BLUE}`,
            },
          }}
          fullWidth
          variant="outlined"
          onClick={() => handleChangePageAndFetch(currentPage + 1)}
        >
          Show more
        </Button>
      )}
      <ApplyCard size="s" />
    </Box>
  );
};
