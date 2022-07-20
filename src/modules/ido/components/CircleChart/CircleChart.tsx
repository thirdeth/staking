import { FC } from 'react';
import { PieChart } from 'react-minimal-pie-chart';
import { Grid } from '@mui/material';

import { ChartItemsProps } from './CircleChart.types';

export interface CircleChartProps {
  chartData: ChartItemsProps[];
}

export const CircleChart: FC<CircleChartProps> = ({ chartData }) => {
  return (
    <Grid item xs={12} md={6}>
      <PieChart data={chartData} />
    </Grid>
  );
};
