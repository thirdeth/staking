import { ComponentMeta, ComponentStory } from '@storybook/react';

import { GrowRate } from './GrowRate';
import { growRatePropsMocked } from './GrowRate.mock';

export default {
  title: 'components/GrowRate',
  component: GrowRate,
} as ComponentMeta<typeof GrowRate>;

const Template: ComponentStory<typeof GrowRate> = (args) => <GrowRate {...args} />;
export const Default = Template.bind({});

Default.args = growRatePropsMocked;
