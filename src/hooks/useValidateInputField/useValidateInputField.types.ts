export enum ValidationTypes {
  number = 'number',
  int = 'int',
  string = 'string',
}

export interface InputProps {
  value: string;
  type: ValidationTypes;
}

export interface IValidateParams {
  value: string;
  isInteger?: boolean;
  decimals?: number;
}
