import { ComponentMeta, ComponentStory } from '@storybook/react';

import { RankingInfoCard } from './RankingInfoCard';
import { rankingInfoCardPropsMocked } from './RankingInfoCard.mock';

export default {
  title: 'components/RankingInfoCard',
  component: RankingInfoCard,
} as ComponentMeta<typeof RankingInfoCard>;

const Template: ComponentStory<typeof RankingInfoCard> = (args) => <RankingInfoCard {...args} />;
export const Default = Template.bind({});

Default.args = rankingInfoCardPropsMocked;
