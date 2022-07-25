import { noop } from 'lodash';
import { IdoPublic, IdoStatus } from 'types/store/requests';

import { StageBarProps } from './StageBar';
import { statusVariantItems } from './StageBar.helpers';

export const stageBarPropsMocked: StageBarProps = {
  idoStatus: [IdoStatus.pending],
  publicFilterValue: IdoPublic.all,
  onChangeFilter: noop,
  onChangeStatus: noop,
  statusItems: statusVariantItems,
};
