enum StageVariantDisplay {
  upcoming = 'upcoming',
  'in progress' = 'in progress',
  completed = 'completed',
}

export const getDisplayStageName = (stage: string): keyof typeof StageVariantDisplay => {
  switch (stage) {
    case 'PENDING':
      return StageVariantDisplay.upcoming;
    case 'REGISTRATION_FOR_IDO':
      return StageVariantDisplay['in progress'];
    case 'REGISTRATION_CLOSED':
      return StageVariantDisplay['in progress'];

    case 'IN_PROGRESS':
      return StageVariantDisplay['in progress'];

    case 'COMPLETED_SUCCESS':
      return StageVariantDisplay.completed;
    case 'COMPLETED_FAIL':
      return StageVariantDisplay.completed;

    default:
      return StageVariantDisplay['in progress'];
  }
};
