import { IdoStatus } from 'types/store/requests';

export const cardsHeaderHelper = {
  [IdoStatus.pending]: [
    {
      gridSize: 4,
      label: 'project name',
    },
    {
      gridSize: 1,
      label: 'token',
    },
    {
      gridSize: 2,
      label: 'starts in',
    },
    {
      gridSize: 2,
      label: 'TOTAL RAISED',
    },
    {
      gridSize: 3,
      label: 'Token sold',
    },
  ],
  [IdoStatus.inProgress]: [
    {
      gridSize: 4,
      label: 'project name',
    },
    {
      gridSize: 1,
      label: 'token',
    },
    {
      gridSize: 2,
      label: 'ends in',
    },
    {
      gridSize: 2,
      label: 'TOTAL RAISED',
    },
    {
      gridSize: 3,
      label: 'Token sold',
    },
  ],
  [IdoStatus.completedSuccess]: [
    {
      gridSize: 4,
      label: 'project name',
    },
    {
      gridSize: 1,
      label: 'token',
    },
    {
      gridSize: 2,
      label: 'ends in',
    },
    {
      gridSize: 2,
      label: 'TOTAL RAISED',
    },
    {
      gridSize: 3,
      label: 'Token sold',
    },
  ],
  [IdoStatus.completedFail]: [
    {
      gridSize: 4,
      label: 'project name',
    },
    {
      gridSize: 1,
      label: 'token',
    },
    {
      gridSize: 2,
      label: 'ends in',
    },
    {
      gridSize: 2,
      label: 'TOTAL RAISED',
    },
    {
      gridSize: 3,
      label: 'Token sold',
    },
  ],
  [IdoStatus.register]: [
    {
      gridSize: 4,
      label: 'project name',
    },
    {
      gridSize: 1,
      label: 'token',
    },
    {
      gridSize: 2,
      label: 'ends in',
    },
    {
      gridSize: 2,
      label: 'TOTAL RAISED',
    },
    {
      gridSize: 3,
      label: 'Token sold',
    },
  ],
  [IdoStatus.registrationClosed]: [
    {
      gridSize: 4,
      label: 'project name',
    },
    {
      gridSize: 1,
      label: 'token',
    },
    {
      gridSize: 2,
      label: 'ends in',
    },
    {
      gridSize: 2,
      label: 'TOTAL RAISED',
    },
    {
      gridSize: 3,
      label: 'Token sold',
    },
  ],
};
