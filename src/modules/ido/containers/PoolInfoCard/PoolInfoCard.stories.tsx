import { ComponentMeta, ComponentStory } from '@storybook/react';

import { PoolInfoCard } from './PoolInfoCard';
import { poolInfoCardPropsMocked } from './PoolInfoCard.mock';

export default {
  title: 'components/PoolInfoCard',
  component: PoolInfoCard,
} as ComponentMeta<typeof PoolInfoCard>;

const Template: ComponentStory<typeof PoolInfoCard> = (args) => <PoolInfoCard {...args} />;
export const Default = Template.bind({});

Default.args = poolInfoCardPropsMocked;
