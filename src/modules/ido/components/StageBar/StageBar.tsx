import { FC, useMemo } from 'react';
import { Box, SelectChangeEvent, Stack, styled } from '@mui/material';
import { Select } from 'components';
import { BG_BUTTON_GRAY, BORDER_GRAY_LIGHT, BORDER_RADIUS_DEFAULT } from 'theme/variables';
import { MenuItemsProps } from 'types';
import { IdoPublic, IdoStatus } from 'types/store/requests';

import { FormSwitcher, StageSwitcher } from './components';
import { getValuesForSecondarySelect, mobileSelectStyles, selectMenuItems } from './StageBar.helpers';
import { StatusItemsProps } from './StageBar.types';

const STAGE_BAR_HEIGHT = 60;

const BoxDesktopSelectContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  height: '100%',

  '& > *': {
    height: STAGE_BAR_HEIGHT,
    width: 200,
    justifyContent: 'center',
    borderLeft: `${BORDER_GRAY_LIGHT} !important`,
  },

  [theme.breakpoints.down('md')]: {
    display: 'none',
  },
}));

export type StageBarProps = {
  idoStatus: IdoStatus[];
  publicFilterValue: IdoPublic;
  isStakingRequire: boolean;
  statusItems: StatusItemsProps;
  onChangeFilter: (event: SelectChangeEvent<unknown>) => void;
  onChangeStatus: (value: IdoStatus[]) => void;
  onChangeStakingRequired: () => void;
};

export const StageBar: FC<StageBarProps> = ({
  idoStatus,
  publicFilterValue,
  isStakingRequire,
  statusItems,
  onChangeFilter,
  onChangeStakingRequired,
  onChangeStatus,
}) => {
  const valuesForSecondarySelect = getValuesForSecondarySelect(idoStatus);

  const isShowSecondFilter = useMemo(() => {
    if (!isStakingRequire && !idoStatus.includes(IdoStatus.inProgress)) {
      if (valuesForSecondarySelect && !!valuesForSecondarySelect.values.length) {
        return true;
      }
    } else if (isStakingRequire && valuesForSecondarySelect && !!valuesForSecondarySelect.values.length) {
      return true;
    }
    return false;
  }, [idoStatus, isStakingRequire, valuesForSecondarySelect]);

  return (
    <Stack>
      <Box
        sx={{
          overflow: 'auto',
          display: 'flex',
          alignItems: 'center',
          background: BG_BUTTON_GRAY,
          borderRadius: BORDER_RADIUS_DEFAULT,
          '& > *:last-child': {
            marginLeft: 'auto',
          },
        }}
      >
        <StageSwitcher
          idoStatus={idoStatus}
          height={STAGE_BAR_HEIGHT}
          statusItems={statusItems}
          onChangeStatus={onChangeStatus}
        />

        {/* For desktop width */}
        <BoxDesktopSelectContainer>
          {isShowSecondFilter && (
            <Select
              sx={{ px: 2 }}
              value={valuesForSecondarySelect?.value}
              onChange={(event) => onChangeStatus(event.target.value as IdoStatus[])}
              paperWidth="200px"
              menuItems={valuesForSecondarySelect?.values as MenuItemsProps[]}
            />
          )}
          {!isStakingRequire && (
            <Select
              sx={{ px: 2 }}
              value={publicFilterValue}
              defaultValue={publicFilterValue}
              onChange={onChangeFilter}
              paperWidth="200px"
              menuItems={selectMenuItems}
            />
          )}
        </BoxDesktopSelectContainer>
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
            sx={{ ...mobileSelectStyles, mr: { xs: 0, sm: 2, md: 2 } }}
            value={valuesForSecondarySelect?.value}
            onChange={(event) => onChangeStatus(event.target.value as IdoStatus[])}
            paperWidth="200px"
            menuItems={valuesForSecondarySelect?.values as MenuItemsProps[]}
          />
        )}

        {!isStakingRequire && (
          <Select
            sx={{ ...mobileSelectStyles }}
            value={publicFilterValue}
            defaultValue={publicFilterValue}
            onChange={onChangeFilter}
            paperWidth="200px"
            menuItems={selectMenuItems}
          />
        )}
      </Box>

      <FormSwitcher isStakingRequire={isStakingRequire} onChangeStakingRequired={onChangeStakingRequired} />
    </Stack>
  );
};
