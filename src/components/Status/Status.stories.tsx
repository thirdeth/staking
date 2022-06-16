import { ComponentMeta, ComponentStory } from '@storybook/react';

import { Status } from './index';
import { statusPropsMocked } from './Status.mock';

export default {
  title: 'components/Status',
  component: Status,
} as ComponentMeta<typeof Status>;

const Template: ComponentStory<typeof Status> = (args) => <Status {...args} />;
export const Default = Template.bind({});

Default.args = statusPropsMocked;
