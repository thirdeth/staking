import { noop } from 'lodash';
import { IdoPublic, IdoStatus } from 'types/store/requests';

import { StageBarProps } from './StageBar';

export const stageBarPropsMocked: StageBarProps = {
  idoStatus: IdoStatus.pending,
  publicFilterValue: IdoPublic.all,
  onChangeFilter: noop,
  onChangeStage: noop,
};
