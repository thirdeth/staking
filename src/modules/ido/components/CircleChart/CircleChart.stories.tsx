import { ComponentMeta, ComponentStory } from '@storybook/react';

import { CircleChart } from './CircleChart';
import { circleChartPropsMocked } from './CircleChart.mock';

export default {
  title: 'components/CircleChart',
  component: CircleChart,
} as ComponentMeta<typeof CircleChart>;

const Template: ComponentStory<typeof CircleChart> = (args) => <CircleChart {...args} />;
export const Default = Template.bind({});

Default.args = circleChartPropsMocked;
