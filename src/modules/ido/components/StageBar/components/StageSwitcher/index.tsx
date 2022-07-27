import { FC } from 'react';
import { Button } from '@mui/material';
import { intersection } from 'lodash';
import { BG_BLUE, BORDER_GRAY_LIGHT, COLOR_TEXT_BLACK, COLOR_TEXT_WHITE } from 'theme/variables';

import { StageBarProps } from '../../StageBar';

type StageSwitcherProps = {
  height: number;
} & Pick<StageBarProps, 'statusItems' | 'idoStatus' | 'onChangeStatus'>;

export const StageSwitcher: FC<StageSwitcherProps> = ({ statusItems, idoStatus, height, onChangeStatus }) => {
  return (
    <>
      {statusItems.map(({ status, stageName }) => (
        <Button
          key={stageName}
          onClick={() => onChangeStatus(status)}
          variant="text"
          sx={(theme) => {
            const selectedProperties = intersection(idoStatus, status).length
              ? {
                  color: COLOR_TEXT_WHITE,
                  background: BG_BLUE,
                  '&:hover': {
                    background: BG_BLUE,
                  },
                }
              : {
                  color: COLOR_TEXT_BLACK,
                  background: 'transparent',
                  '&:hover': {
                    color: COLOR_TEXT_WHITE,
                    background: BG_BLUE,
                  },
                };
            return {
              p: 0,
              height,
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
    </>
  );
};
