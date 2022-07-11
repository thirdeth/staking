import { noop } from 'lodash';

import { InfoCardProps } from './InfoCard';

export const infoCardPropsMocked: InfoCardProps = {
  title: 'Title',
  buttonText: 'Button Text',
  onClick: () => noop,
};
