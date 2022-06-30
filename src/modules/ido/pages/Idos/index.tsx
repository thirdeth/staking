import { FC, useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Box, Grid, SelectChangeEvent } from '@mui/material';
import { ApplyCard, RowCard } from 'components';
import { CardsHeader, StageBar } from 'modules/ido/components';
import { getIdoList } from 'store/ido/actions';
import { IdoPublic, IdoStatus } from 'types/store/requests';

import { IDOS_DATA_MOCK } from './Idos.helpers';

export const Idos: FC = () => {
  const dispatch = useDispatch();
  const [publicFilterValue, setPublicFilterValue] = useState(IdoPublic.all);
  const [idoStatus, setIdoStatus] = useState(IdoStatus.pending);

  const handleChangeFilterValue = useCallback((event: SelectChangeEvent<unknown>) => {
    const { value } = event.target;
    setPublicFilterValue(value as IdoPublic);
  }, []);

  const handleChangeActiveStage = useCallback((value: IdoStatus) => {
    setIdoStatus(value);
  }, []);

  console.log(publicFilterValue, idoStatus);

  useEffect(() => {
    dispatch(
      getIdoList({
        publicVar: publicFilterValue,
        statusVar: IdoStatus.all,
      }),
    );
  }, [dispatch, publicFilterValue]);

  return (
    <Box sx={{ overflowX: 'hidden' }}>
      <StageBar
        publicFilterValue={publicFilterValue}
        idoStatus={idoStatus}
        onChangeFilter={handleChangeFilterValue}
        onChangeStage={handleChangeActiveStage}
      />

      <Grid pt={2} container spacing={2}>
        <Grid item xs={12} display={{ xs: 'none', sm: 'none', md: 'block' }}>
          <CardsHeader />
        </Grid>
        {!!IDOS_DATA_MOCK.length &&
          IDOS_DATA_MOCK.map((ido) => (
            <Grid key={ido.id} item xs={12}>
              <RowCard variant="project" cardData={ido} />
            </Grid>
          ))}
      </Grid>
      <ApplyCard size="s" />
    </Box>
  );
};
