import { FC } from 'react';
import { Box, Button, SelectChangeEvent, Stack } from '@mui/material';
import { Select } from 'components';
import {
  BG_BLUE,
  BG_BLUE_EXTRALIGHT,
  BG_BUTTON_GRAY,
  BORDER_GRAY_LIGHT,
  BORDER_RADIUS_DEFAULT,
  COLOR_TEXT_BLACK,
  COLOR_TEXT_WHITE,
} from 'theme/variables';
import { IdoPublic, IdoStatus } from 'types/store/requests';

import { selectMenuItems, stageVariantItems } from './StageBar.helpers';

export type StageBarProps = {
  idoStatus: IdoStatus;
  publicFilterValue: IdoPublic;
  onChangeFilter: (event: SelectChangeEvent<unknown>) => void;
  onChangeStage: (value: IdoStatus) => void;
};

export const StageBar: FC<StageBarProps> = ({ idoStatus, publicFilterValue, onChangeFilter, onChangeStage }) => {
  return (
    <Stack>
      <Box
        sx={(theme) => ({
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start',
          background: BG_BUTTON_GRAY,
          borderRadius: '8px',

          [theme.breakpoints.down('md')]: {
            justifyContent: 'space-between',
          },
        })}
      >
        {stageVariantItems.map(({ id, stageName }) => (
          <Button
            key={id}
            onClick={() => onChangeStage(id)}
            variant="text"
            sx={(theme) => ({
              p: 0,
              height: 60,
              borderRight: BORDER_GRAY_LIGHT,
              px: 2,
              color: idoStatus === id ? COLOR_TEXT_WHITE : COLOR_TEXT_BLACK,
              background: idoStatus === id ? BG_BLUE : 'transparent',

              [theme.breakpoints.down('md')]: {
                flexBasis: '33.34%',
                '&:last-of-type': {
                  border: 'none',
                },
              },
              [theme.breakpoints.down('sm')]: {
                fontSize: '14px',
              },
            })}
          >
            {stageName}
          </Button>
        ))}

        {/* For desktop width */}
        <Box
          sx={{
            alignItems: 'center',
            marginLeft: 'auto',
            mr: 2.5,
            height: 60,
          }}
          display={{ xs: 'none', sm: 'none', md: 'flex' }}
        >
          <Select
            value={publicFilterValue}
            defaultValue={publicFilterValue}
            onChange={onChangeFilter}
            paperWidth="200px"
            menuItems={selectMenuItems}
          />
        </Box>
      </Box>

      {/* For mobile width */}
      <Select
        sx={{
          mt: 2,
          px: 1.5,
          width: 'fit-content',
          display: { xs: 'flex', sm: 'flex', md: 'none' },
          background: BG_BLUE_EXTRALIGHT,
          borderRadius: BORDER_RADIUS_DEFAULT,
          alignSelf: 'flex-end',
        }}
        value={publicFilterValue}
        defaultValue={publicFilterValue}
        onChange={onChangeFilter}
        paperWidth="200px"
        menuItems={selectMenuItems}
      />
    </Stack>
  );
};
