import { Ido } from 'types/api/Ido';
import { Tokenomic } from 'types/api/Tokenomic';

export type IdoRequiredProps = Required<Ido>;

export interface ProjectDataProps {
  projectData: IdoRequiredProps;
}

export type TokenomicProps = {
  value: number;
  color: string;
} & Omit<Required<Tokenomic>, 'id' | 'percent' | 'color'>;

// export type TokenomicProps = {
//   color: string;
// } & Required<Omit<Tokenomic, 'id' | 'color'>>;
