import { IDO } from 'types/api/IDO';

export type IdoRequiredProps = Required<IDO>;

export interface ProjectDataProps {
  projectData: IdoRequiredProps;
}
