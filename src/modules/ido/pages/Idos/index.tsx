import { FC, useState } from 'react';
import { Box, Grid, SelectChangeEvent } from '@mui/material';
import { ApplyCard, RowCard } from 'components';
import { CardsHeader, StageBar } from 'modules/ido/components';

import { IDOS_DATA_MOCK } from './Idos.helpers';

export const Idos: FC = () => {
  const [filterValue, setFilterValue] = useState(1);
  const [activeStage, setActiveState] = useState(1);

  const handleChangeFilterValue = (event: SelectChangeEvent<unknown>) => {
    const { value } = event.target;
    setFilterValue(Number(value));
  };

  const handleChangeActiveStage = (value: number) => {
    setActiveState(Number(value));
  };

  return (
    <Box sx={{ overflowX: 'hidden' }}>
      <StageBar
        filterValue={filterValue}
        currentStage={activeStage}
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
