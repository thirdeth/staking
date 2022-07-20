import { FC } from 'react';
import { PieChart } from 'react-minimal-pie-chart';
import { Grid } from '@mui/material';
import { TokenomicProps } from 'modules/ido/pages/Details/Details.types';

export interface CircleChartProps {
  chartData: TokenomicProps[];
}

export const CircleChart: FC<CircleChartProps> = ({ chartData }) => {
  return (
    <Grid item xs={12} md={6}>
      <PieChart data={chartData} />
    </Grid>
  );
};
