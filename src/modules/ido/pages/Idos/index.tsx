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
import { COLOR_TEXT_BLACK } from 'theme/variables';
import { PARAMS, RequestStatus } from 'types';
import { IdoPublic, IdoStatus, IdoWeights } from 'types/store/requests';

const DEFAULT_IDOS_PER_PAGE = 5;

interface IdoPageProps {
  isMyIdos?: boolean;
  isMyInvesments?: boolean;
}

export const Idos: FC<IdoPageProps> = ({ isMyIdos, isMyInvesments }) => {
  const dispatch = useDispatch();

  const { idos, count } = useUpdatedIdoDataFromApi();

  const {
    handleChangePublicFilter,
    handleChangeIdoStatus,
    handleChangeStakingRequired,
    currentPage,
    handleChangeCurrentPage,
    searchParams,
    isStakingRequire,
  } = useIdoFilter(true);

  const getIdoListRequestStatus = useShallowSelector(uiSelector.getProp(idoActionTypes.GET_IDO_LIST));
  const isLoading = getIdoListRequestStatus === RequestStatus.REQUEST;

  const loadingSkeletonCounter = count > DEFAULT_IDOS_PER_PAGE ? count % DEFAULT_IDOS_PER_PAGE : DEFAULT_IDOS_PER_PAGE;

  const statusParams = useMemo(() => {
    const statusesArr = searchParams.getAll(PARAMS.status) as IdoStatus[];
    if (statusesArr.length) {
      return statusesArr;
    }
    return [IdoStatus.inProgress, IdoStatus.register, IdoStatus.registrationClosed];
  }, [searchParams]);

  const weightsParams = useMemo(
    () => (searchParams.get(PARAMS.with_weights) as IdoWeights) || IdoWeights.withWeights,
    [searchParams],
  );

  // for investments - without upcoming status
  const stageBarStatusItemsArr = isMyInvesments
    ? statusVariantItems.slice(1, statusVariantItems.length)
    : statusVariantItems;

  const handleChangePageAndFetch = useCallback(
    (page: number, shouldConcat = true) => {
      handleChangeCurrentPage(page);

      dispatch(
        getIdoList({
          public: (searchParams.getAll(PARAMS.access) as IdoPublic[]) || [],
          status: statusParams,
          count: DEFAULT_IDOS_PER_PAGE,
          start: page * DEFAULT_IDOS_PER_PAGE,
          isMyIdos: isMyIdos !== undefined,
          isMyInvesments: isMyInvesments !== undefined,
          withWeights: weightsParams,
          shouldConcat,
        }),
      );
    },
    [dispatch, handleChangeCurrentPage, isMyIdos, isMyInvesments, searchParams, statusParams, weightsParams],
  );

  useEffect(() => {
    // smooth changes for user
    dispatch(updateIdoState({ ido: { count: 0, idos: [] } }));
    handleChangeCurrentPage(0);

    dispatch(
      getIdoList({
        public: (searchParams.getAll(PARAMS.access) as IdoPublic[]) || IdoPublic.public,
        status: statusParams,
        count: DEFAULT_IDOS_PER_PAGE,
        start: 0,
        isMyIdos: isMyIdos !== undefined,
        isMyInvesments: isMyInvesments !== undefined,
        withWeights: weightsParams,
      }),
    );
  }, [dispatch, handleChangeCurrentPage, isMyIdos, isMyInvesments, searchParams, statusParams, weightsParams]);

  const idoType = useMemo(() => getIdoTypeFromIdoStatus(statusParams), [statusParams]);

  return (
    <Box sx={{ overflowX: 'hidden' }}>
      <StageBar
        publicFilterValue={(searchParams.get(PARAMS.access) as IdoPublic) || IdoPublic.all}
        idoStatus={statusParams}
        isStakingRequire={isStakingRequire}
        statusItems={stageBarStatusItemsArr}
        onChangeFilter={handleChangePublicFilter}
        onChangeStatus={handleChangeIdoStatus}
        onChangeStakingRequired={handleChangeStakingRequired}
      />

      <Grid pt={2} container spacing={2}>
        {count && (
          <Grid item xs={12} display={{ xs: 'none', sm: 'none', md: 'block' }} p={0}>
            <CardsHeader idoType={idoType} />
          </Grid>
        )}
        {idos.map((idoData) => (
          <Grid key={idoData.id} item xs={12}>
            <RowCard variant="project" cardData={idoData} />
          </Grid>
        ))}
        {isLoading &&
          new Array(loadingSkeletonCounter).fill('').map((_, index) => (
            <Grid key={index} item xs={12}>
              <RowCardSkeleton />
            </Grid>
          ))}
      </Grid>

      {count === 0 && !isLoading && (
        <InfoCard sx={{ mt: 10 }} title={`There are no ${idoType} projects now. Keep tuned!`} />
      )}
      {count >= DEFAULT_IDOS_PER_PAGE * (currentPage + 1) && (
        <Button
          sx={{
            my: 5,
            color: COLOR_TEXT_BLACK,
            borderWidth: 2,
            '&:hover': { borderWidth: 2 },
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
