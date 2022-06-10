import { ComponentMeta, ComponentStory } from '@storybook/react';

import { ApplyCard } from './ApplyCard';

export default {
  title: 'components/ApplyCard',
  component: ApplyCard,
} as ComponentMeta<typeof ApplyCard>;

const Template: ComponentStory<typeof ApplyCard> = (args) => <ApplyCard {...args} />;
export const Default = Template.bind({});
