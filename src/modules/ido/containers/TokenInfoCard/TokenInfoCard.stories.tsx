import { ComponentMeta, ComponentStory } from '@storybook/react';

import { TokenInfoCard } from './TokenInfoCard';
import { tokenInfoCardPropsMocked } from './TokenInfoCard.mock';

export default {
  title: 'components/TokenInfoCard',
  component: TokenInfoCard,
} as ComponentMeta<typeof TokenInfoCard>;

const Template: ComponentStory<typeof TokenInfoCard> = (args) => <TokenInfoCard {...args} />;
export const Default = Template.bind({});

Default.args = tokenInfoCardPropsMocked;
