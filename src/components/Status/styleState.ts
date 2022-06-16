import { CSSProperties } from 'react';
import { BG_BLUE_LIGHT, COLOR_TEXT_BLUE, COLOR_TEXT_GREEN } from 'theme/variables';
import { ProjectStatusProps } from 'types';

const colorState: Record<ProjectStatusProps, CSSProperties> = {
  progress: {
    background: BG_BLUE_LIGHT,
    borderColor: COLOR_TEXT_BLUE,
    color: COLOR_TEXT_BLUE,
  },
  completed: {
    background: 'transparent',
    borderColor: COLOR_TEXT_GREEN,
    color: COLOR_TEXT_GREEN,
  },
  loading: {
    background: 'transparent',
    borderColor: 'transparent',
    color: 'transparent',
  },
};

export const projectStatusStyleState = {
  color: colorState,
};
