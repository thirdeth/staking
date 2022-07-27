import { CSSProperties } from 'react';
import { IdoStatus } from 'types/store/requests';

export type StatusItemsProps = {
  status: IdoStatus[];
  stageName: string;
}[];

type CssPropertiesProps = CSSProperties | string | number;

export type MobileSelectStylesProps = Record<string, CssPropertiesProps | Record<string, CssPropertiesProps>>;
