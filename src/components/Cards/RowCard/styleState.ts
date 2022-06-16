import { BG_BLUE_LIGHT, BG_GRAY_LIGHT } from 'theme/variables';
import { ColorProps } from 'types';

const colorState: Record<ColorProps, string> = {
  gray: BG_GRAY_LIGHT,
  blue: BG_BLUE_LIGHT,
  transparent: 'none',
};

export const rowCardStyleState = {
  color: colorState,
};
