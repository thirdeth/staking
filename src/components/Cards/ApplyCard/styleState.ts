import { CSSProperties } from 'react';

import { SizeProps } from './ApplyCard.types';

const sizeState: Record<SizeProps, CSSProperties> = {
  s: {
    height: '181px',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  m: { height: '328px', flexDirection: 'column', justifyContent: 'center', gap: '36px' },
};

export const applyCardStyleState = {
  size: sizeState,
};
