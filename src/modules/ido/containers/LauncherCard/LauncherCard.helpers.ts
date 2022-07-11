import { IdoStatus } from 'types/store/requests';

export const statusTextVariants: { [key in IdoStatus]: string } = {
  [IdoStatus.pending]: 'Registration will start in',
  [IdoStatus.register]: 'Register for ido',
  [IdoStatus.registrationClosed]: 'Registration closed. Sale Opens In',
  [IdoStatus.inProgress]: 'Sale end in',
  [IdoStatus.completedSuccess]: 'Completed success',
  [IdoStatus.completedFail]: 'Completed fail',
  [IdoStatus.all]: 'Completed success',
};
