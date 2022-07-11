import { ComponentMeta, ComponentStory } from '@storybook/react';

import { InfoCard } from './InfoCard';
import { infoCardPropsMocked } from './InfoCard.mock';

export default {
  title: 'components/InfoCard',
  component: InfoCard,
} as ComponentMeta<typeof InfoCard>;

const Template: ComponentStory<typeof InfoCard> = (args) => <InfoCard {...args} />;
export const Default = Template.bind({});

Default.args = infoCardPropsMocked;
