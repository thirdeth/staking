export enum PointValues {
  blue,
  white,
}
enum ProgressVariantValues {
  parallelogram,
  circle,
}

export type ProgressVariantProps = keyof typeof ProgressVariantValues;
export type PointProps = keyof typeof PointValues;
