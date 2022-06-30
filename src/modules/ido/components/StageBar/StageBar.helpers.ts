import { IdoPublic, IdoStatus } from 'types/store/requests';

export const stageVariantItems = [
  {
    id: IdoStatus.pending,
    stageName: 'Upcoming',
  },
  {
    id: IdoStatus.registrationClosed,
    stageName: 'Registration closed',
  },
  {
    id: IdoStatus.completedSuccess,
    stageName: 'Completed',
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
