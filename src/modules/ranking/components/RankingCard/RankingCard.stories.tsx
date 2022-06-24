import { ComponentMeta, ComponentStory } from '@storybook/react';

import { RankingCard } from './RankingCard';
import { rankingCardPropsMocked } from './RankingCard.mock';

export default {
  title: 'components/RankingCard',
  component: RankingCard,
} as ComponentMeta<typeof RankingCard>;

const Template: ComponentStory<typeof RankingCard> = (args) => <RankingCard {...args} />;
export const Default = Template.bind({});

Default.args = rankingCardPropsMocked;
