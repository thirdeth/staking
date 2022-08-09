import { isEqual } from 'lodash';
import { BG_BLUE_EXTRALIGHT, BORDER_RADIUS_DEFAULT } from 'theme/variables';
import { IdoPublic, IdoStatus } from 'types/store/requests';

import { MobileSelectStylesProps } from './StageBar.types';

export const statusVariantItems = [
  {
    status: [IdoStatus.pending],
    stageName: 'Upcoming',
  },
  {
    status: [IdoStatus.inProgress, IdoStatus.register, IdoStatus.registrationClosed],
    stageName: 'In progress',
  },
  {
    status: [IdoStatus.completedSuccess, IdoStatus.completedFail],
    stageName: 'Completed',
  },
];

export const inProgressSecondaryStatusMenuItems = [
  {
    value: [IdoStatus.inProgress, IdoStatus.register, IdoStatus.registrationClosed],
    label: 'All Stages',
  },
  {
    value: [IdoStatus.register],
    label: 'Registration',
  },
  {
    value: [IdoStatus.registrationClosed],
    label: 'Registration closed',
  },
  {
    value: [IdoStatus.inProgress],
    label: 'Sale in progress',
  },
];

export const completedSecondaryStatusMenuItems = [
  {
    value: [IdoStatus.completedSuccess, IdoStatus.completedFail],
    label: 'All Statuses',
  },
  {
    value: [IdoStatus.completedSuccess],
    label: 'Completed success',
  },
  {
    value: [IdoStatus.completedFail],
    label: 'Completed fail',
  },
];

export const selectMenuItems = [
  {
    value: IdoPublic.all,
    label: 'All Access',
  },
  {
    value: IdoPublic.public,
    label: 'Public',
  },
  {
    value: IdoPublic.private,
    label: 'Private',
  },
];

// eslint-disable-next-line consistent-return
export const getValuesForSecondarySelect = (idoStatusesArray: IdoStatus[]) => {
  if (idoStatusesArray.includes(IdoStatus.pending)) {
    return {
      values: [],
      value: '',
    };
  }

  for (let i = 0; i < inProgressSecondaryStatusMenuItems.length; i += 1) {
    if (isEqual(idoStatusesArray, inProgressSecondaryStatusMenuItems[i].value)) {
      return {
        values: inProgressSecondaryStatusMenuItems,
        value: inProgressSecondaryStatusMenuItems[i].value,
      };
    }
  }

  for (let i = 0; i < completedSecondaryStatusMenuItems.length; i += 1) {
    if (isEqual(idoStatusesArray, completedSecondaryStatusMenuItems[i].value)) {
      return {
        values: completedSecondaryStatusMenuItems,
        value: completedSecondaryStatusMenuItems[i].value,
      };
    }
  }
};

export const mobileSelectStyles: MobileSelectStylesProps = {
  mt: 2,
  px: 1.5,
  width: '100%',
  display: { xs: 'flex', sm: 'flex', md: 'none' },
  alignSelf: 'flex-end',
  background: BG_BLUE_EXTRALIGHT,
  borderRadius: BORDER_RADIUS_DEFAULT,
};
