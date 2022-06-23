import { ComponentMeta, ComponentStory } from '@storybook/react';

import { TabsContent } from './TabsContent';
import { tabsContentPropsMocked } from './TabsContent.mock';

export default {
  title: 'components/TabsContent',
  component: TabsContent,
} as ComponentMeta<typeof TabsContent>;

const Template: ComponentStory<typeof TabsContent> = (args) => <TabsContent {...args} />;
export const Default = Template.bind({});

Default.args = tabsContentPropsMocked;
