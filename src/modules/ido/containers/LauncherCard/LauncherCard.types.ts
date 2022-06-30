import { ProjectStageProps } from 'types';

export type ProgressLauncherDataProps = {
  stage: ProjectStageProps;
  progress: number;
  totalRaise: number;
  allocation: number;
  targetRaise: number;
  saleEndTime: number;
};
