import { FC } from 'react';
import { FormControl, InputLabel, MenuItem, Select as MuiSelect, SelectProps as MuiSelectProps } from '@mui/material';
import { SelectCheckIcon } from 'assets/img';
import { BG_MAIN, BORDER_COLOR_SELECT_GRAY, BORDER_RADIUS_DEFAULT, SELECT_SHADOW_DEFAULT } from 'theme/variables';
import { MenuItemsProps } from 'types';

import { SelectInput } from './theme';

const SELECT_CHECK_ICON = `url(${SelectCheckIcon}) 190px center no-repeat, transparent`;

export interface SelectProps {
  menuItems: MenuItemsProps[];
  paperWidth?: string;
  label?: string;
}

export const Select: FC<SelectProps & MuiSelectProps> = ({
  menuItems,
  label,
  id,
  paperWidth = '100%',
  ...selectProps
}) => {
  return (
    <FormControl variant="standard">
      {label && <InputLabel id={id}>{label}</InputLabel>}
      <MuiSelect
        {...selectProps}
        variant="filled"
        input={<SelectInput />}
        MenuProps={{
          PaperProps: {
            sx: {
              minHeight: '128px',
              width: paperWidth,
              background: BG_MAIN,
              border: '1px solid',
              borderColor: BORDER_COLOR_SELECT_GRAY,
              borderRadius: BORDER_RADIUS_DEFAULT,
              boxShadow: SELECT_SHADOW_DEFAULT,
              '.MuiMenuItem-root': {
                '&:hover': {
                  background: '',
                },
                '&.Mui-selected': {
                  background: SELECT_CHECK_ICON,
                  '&.Mui-focusVisible': {
                    background: SELECT_CHECK_ICON,
                  },
                  '&:hover': {
                    background: SELECT_CHECK_ICON,
                  },
                },
              },
            },
          },
        }}
      >
        {menuItems.map((item) => (
          <MenuItem key={item.value} value={item.value}>
            {item.label}
          </MenuItem>
        ))}
      </MuiSelect>
    </FormControl>
  );
};
