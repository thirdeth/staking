import { FC } from 'react';
import { Box, Button, SelectChangeEvent, Stack } from '@mui/material';
import { Select } from 'components';
import { intersection } from 'lodash';
import {
  BG_BLUE,
  BG_BLUE_EXTRALIGHT,
  BG_BUTTON_GRAY,
  BORDER_GRAY_LIGHT,
  BORDER_RADIUS_DEFAULT,
  COLOR_TEXT_BLACK,
  COLOR_TEXT_WHITE,
} from 'theme/variables';
import { MenuItemsProps } from 'types';
import { IdoPublic, IdoStatus } from 'types/store/requests';

import { getValuesForSecondarySelect, selectMenuItems, statusVariantItems } from './StageBar.helpers';

export type StageBarProps = {
  idoStatus: IdoStatus[];
  publicFilterValue: IdoPublic;
  onChangeFilter: (event: SelectChangeEvent<unknown>) => void;
  onChangeStatus: (value: IdoStatus[]) => void;
};

export const StageBar: FC<StageBarProps> = ({ idoStatus, publicFilterValue, onChangeFilter, onChangeStatus }) => {
  console.log(idoStatus);

  const valuesForSecondarySelect = getValuesForSecondarySelect(idoStatus);
  return (
    <Stack>
      <Box
        sx={{
          overflow: 'auto',
          display: 'flex',
          alignItems: 'center',
          background: BG_BUTTON_GRAY,
          borderRadius: '8px',
          '& > *:last-child': {
            marginLeft: 'auto',
          },
        }}
      >
        {statusVariantItems.map(({ status, stageName }) => (
          <Button
            key={stageName}
            onClick={() => onChangeStatus(status)}
            variant="text"
            sx={(theme) => {
              const selectedProperties = intersection(idoStatus, status).length
                ? {
                    color: COLOR_TEXT_WHITE,
                    background: BG_BLUE,
                  }
                : {
                    color: COLOR_TEXT_BLACK,
                    background: 'transparent',
                  };
              return {
                p: 0,
                height: 60,
                borderRight: BORDER_GRAY_LIGHT,
                px: 2,
                fontSize: { xs: '14px', sm: '14px', md: '16px' },
                ...selectedProperties,

                [theme.breakpoints.down('md')]: {
                  flexBasis: '33.34%',
                  '&:last-of-type': {
                    border: 'none',
                  },
                },
              };
            }}
          >
            {stageName}
          </Button>
        ))}

        {/* For desktop width */}
        <Box
          sx={{
            display: { xs: 'none', sm: 'none', md: 'flex' },
            alignItems: 'center',
            height: '100%',

            '& > *': {
              height: 60,
              width: 200,
              justifyContent: 'center',
              '&:first-child': {
                borderRight: BORDER_GRAY_LIGHT,
                borderLeft: BORDER_GRAY_LIGHT,
                borderStyle: 'solid',
                borderWidth: '0 1px',
              },
            },
          }}
        >
          {valuesForSecondarySelect && !!valuesForSecondarySelect.values.length && (
            <Select
              sx={{
                px: 2,
              }}
              value={valuesForSecondarySelect?.value}
              onChange={(event) => onChangeStatus(event.target.value as IdoStatus[])}
              paperWidth="250px"
              menuItems={valuesForSecondarySelect?.values as MenuItemsProps[]}
            />
          )}

          <Select
            sx={{
              px: 2,
            }}
            value={publicFilterValue}
            defaultValue={publicFilterValue}
            onChange={onChangeFilter}
            paperWidth="250px"
            menuItems={selectMenuItems}
          />
        </Box>
      </Box>

      {/* For mobile width */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          flexDirection: { xs: 'column', sm: 'row', md: 'row' },
        }}
      >
        {valuesForSecondarySelect && !!valuesForSecondarySelect.values.length && (
          <Select
            sx={{
              mt: 2,
              mr: { xs: 0, sm: 2, md: 2 },
              px: 1.5,
              width: 'fit-content',
              display: { xs: 'flex', sm: 'flex', md: 'none' },
              background: BG_BLUE_EXTRALIGHT,
              borderRadius: BORDER_RADIUS_DEFAULT,
              alignSelf: 'flex-end',
            }}
            value={valuesForSecondarySelect?.value}
            onChange={(event) => onChangeStatus(event.target.value as IdoStatus[])}
            paperWidth="200px"
            menuItems={valuesForSecondarySelect?.values as MenuItemsProps[]}
          />
        )}
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
      </Box>
    </Stack>
  );
};
