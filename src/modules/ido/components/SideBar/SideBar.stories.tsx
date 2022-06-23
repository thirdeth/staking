import { ComponentMeta, ComponentStory } from '@storybook/react';

import { SideBar } from './SideBar';
import { sideBarPropsMocked } from './SideBar.mock';

export default {
  title: 'components/SideBar',
  component: SideBar,
} as ComponentMeta<typeof SideBar>;

const Template: ComponentStory<typeof SideBar> = (args) => <SideBar {...args} />;
export const Default = Template.bind({});

Default.args = sideBarPropsMocked;
