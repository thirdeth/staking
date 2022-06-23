import { FC } from 'react';
import { Button, Grid, SelectChangeEvent } from '@mui/material';
import { Select } from 'components';
import {
  BG_BLUE,
  BG_BLUE_EXTRALIGHT,
  BG_GRAY_LIGHT,
  BORDER_GRAY_LIGHT,
  BORDER_RADIUS_DEFAULT,
  COLOR_TEXT_BLACK,
  COLOR_TEXT_WHITE,
} from 'theme/variables';

import { selectMenuItems, stageVariantItems } from './StageBar.helpers';

export type StageBarProps = {
  currentStage?: number;
  filterValue: number;
  onChangeFilter: (event: SelectChangeEvent<unknown>) => void;
  onChangeStage: (value: number) => void;
};

export const StageBar: FC<StageBarProps> = ({ currentStage = 1, filterValue, onChangeFilter, onChangeStage }) => {
  return (
    <Grid container justifyContent="flex-end">
      <Grid
        item
        container
        justifyContent="space-between"
        alignItems="center"
        sx={{
          pr: 2,
          height: '60px',
          background: BG_GRAY_LIGHT,
          borderRadius: '16px',
          overflow: 'auto',
          '&::-webkit-scrollbar': { display: 'none' },
        }}
        xs={12}
      >
        <Grid item container alignItems="center">
          {stageVariantItems.map(({ id, stageName }) => (
            <Button
              key={id}
              onClick={() => onChangeStage(id)}
              variant="text"
              sx={{
                p: 0,
                height: '100%',
                borderRight: BORDER_GRAY_LIGHT,

                '&:not(nth-child(1))': {
                  borderLeft: BORDER_GRAY_LIGHT,
                },
              }}
            >
              <Grid
                item
                container
                justifyContent="center"
                alignItems="center"
                sx={{
                  px: 2,
                  height: '60px',
                  color: currentStage === id ? COLOR_TEXT_WHITE : COLOR_TEXT_BLACK,
                  background: currentStage === id ? BG_BLUE : 'transparent',
                  borderTopLeftRadius: currentStage === 1 ? '16px' : 'none',
                  borderBottomLeftRadius: currentStage === 1 ? '16px' : 'none',
                }}
              >
                {stageName}
              </Grid>
            </Button>
          ))}
        </Grid>

        {/* For desktop width */}
        <Grid
          item
          container
          alignItems="center"
          pl={2.5}
          borderLeft={BORDER_GRAY_LIGHT}
          height="100%"
          display={{ xs: 'none', sm: 'none', md: 'flex' }}
        >
          <Select
            value={filterValue}
            defaultValue={filterValue}
            onChange={onChangeFilter}
            paperWidth="200px"
            menuItems={selectMenuItems}
          />
        </Grid>
      </Grid>

      {/* For mobile width */}
      <Grid item>
        <Select
          sx={{
            mt: 2,
            px: 1.5,
            display: { xs: 'flex', sm: 'flex', md: 'none' },
            background: BG_BLUE_EXTRALIGHT,
            borderRadius: BORDER_RADIUS_DEFAULT,
          }}
          value={filterValue}
          defaultValue={filterValue}
          onChange={onChangeFilter}
          paperWidth="200px"
          menuItems={selectMenuItems}
        />
      </Grid>
    </Grid>
  );
};
