import { IdoType } from 'modules/ido/utils';

export const cardsHeaders = {
  [IdoType.pending]: [
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
      gridSize: 3,
      label: 'targeted raise',
    },
    {
      gridSize: 2,
      label: 'access type',
    },
  ],
  [IdoType.inProgress]: [
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
      label: 'stage',
    },
    {
      gridSize: 3,
      label: 'next stage will start in',
    },
    {
      gridSize: 2,
      label: 'total raised',
    },
  ],
  [IdoType.completed]: [
    {
      gridSize: 4,
      label: 'project name',
    },
    {
      gridSize: 2,
      label: 'token',
    },
    {
      gridSize: 3,
      label: 'status',
    },
    {
      gridSize: 3,
      label: 'total raised',
    },
  ],
};
