import { IdoStatus } from 'types/store/requests';

enum StageVariantDisplay {
  upcoming = 'upcoming',
  'in progress' = 'in progress',
  completed = 'completed',
}

export const getDisplayStageName = (stage: string): keyof typeof StageVariantDisplay => {
  switch (stage) {
    case IdoStatus.pending:
      return StageVariantDisplay.upcoming;

    case IdoStatus.register:
      return StageVariantDisplay['in progress'];

    case IdoStatus.registrationClosed:
      return StageVariantDisplay['in progress'];

    case IdoStatus.inProgress:
      return StageVariantDisplay['in progress'];

    case IdoStatus.completedSuccess:
      return StageVariantDisplay.completed;

    case IdoStatus.completedFail:
      return StageVariantDisplay.completed;

    default:
      return StageVariantDisplay['in progress'];
  }
};
