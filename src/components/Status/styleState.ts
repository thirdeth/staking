import { CSSProperties } from 'react';
import { BG_BLUE_LIGHT, COLOR_TEXT_BLUE, COLOR_TEXT_GREEN } from 'theme/variables';
import { IdoStatus } from 'types/store/requests';

const colorState: Record<IdoStatus, CSSProperties> = {
  IN_PROGRESS: {
    background: BG_BLUE_LIGHT,
    borderColor: COLOR_TEXT_BLUE,
    color: COLOR_TEXT_BLUE,
  },
  COMPLETED_SUCCESS: {
    background: 'transparent',
    borderColor: COLOR_TEXT_GREEN,
    color: COLOR_TEXT_GREEN,
  },
  COMPLETED_FAIL: {
    background: 'transparent',
    borderColor: COLOR_TEXT_GREEN,
    color: COLOR_TEXT_GREEN,
  },
  PENDING: {
    background: 'transparent',
    borderColor: 'transparent',
    color: 'transparent',
  },
  REGISTER_FOR_IDO: {
    background: 'transparent',
    borderColor: 'transparent',
    color: 'transparent',
  },
  REGISTRATION_CLOSED: {
    background: BG_BLUE_LIGHT,
    borderColor: COLOR_TEXT_BLUE,
    color: COLOR_TEXT_BLUE,
  },
  all: {
    background: BG_BLUE_LIGHT,
    borderColor: COLOR_TEXT_BLUE,
    color: COLOR_TEXT_BLUE,
  },
};

export const projectStatusStyleState = {
  color: colorState,
};
