import { IdoStatus } from 'types/store/requests';

export enum IdoType {
  pending = 'upcoming',
  inProgress = 'open',
  completed = 'finished',
}

export const getIdoTypeFromIdoStatus = (idoStatuses: IdoStatus[]) => {
  if (idoStatuses.includes(IdoStatus.pending)) {
    return IdoType.pending;
  }

  if (
    idoStatuses.includes(IdoStatus.inProgress) ||
    idoStatuses.includes(IdoStatus.register) ||
    idoStatuses.includes(IdoStatus.registrationClosed)
  ) {
    return IdoType.inProgress;
  }

  return IdoType.completed;
};
