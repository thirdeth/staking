import { ComponentMeta, ComponentStory } from '@storybook/react';

import { RowCard } from './RowCard';
import { rowCardPropsMocked } from './RowCard.mock';

export default {
  title: 'components/RowCard',
  component: RowCard,
} as ComponentMeta<typeof RowCard>;

const Template: ComponentStory<typeof RowCard> = (args) => <RowCard {...args} />;
export const Default = Template.bind({});

Default.args = rowCardPropsMocked;
