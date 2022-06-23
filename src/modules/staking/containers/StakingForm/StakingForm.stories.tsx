import { ComponentMeta, ComponentStory } from '@storybook/react';

import { StakingForm } from './StakingForm';
import { stakingFormPropsMocked } from './StakingForm.mock';

export default {
  title: 'components/StakingForm',
  component: StakingForm,
} as ComponentMeta<typeof StakingForm>;

const Template: ComponentStory<typeof StakingForm> = (args) => <StakingForm {...args} />;
export const Default = Template.bind({});

Default.args = stakingFormPropsMocked;
