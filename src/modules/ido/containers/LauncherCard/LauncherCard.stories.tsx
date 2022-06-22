import { ComponentMeta, ComponentStory } from '@storybook/react';

import { LauncherCard } from './LauncherCard';
import { launcherCardPropsMocked } from './LauncherCard.mock';

export default {
  title: 'components/LauncherCard',
  component: LauncherCard,
} as ComponentMeta<typeof LauncherCard>;

const Template: ComponentStory<typeof LauncherCard> = (args) => <LauncherCard {...args} />;
export const Default = Template.bind({});

Default.args = launcherCardPropsMocked;
