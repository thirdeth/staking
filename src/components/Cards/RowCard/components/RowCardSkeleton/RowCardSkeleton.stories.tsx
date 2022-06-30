import { ComponentMeta, ComponentStory } from '@storybook/react';

import { rowCardSkeletonPropsMocked } from './RowCardSkeleton.mock';
import { RowCardSkeleton } from './RowCardSkeletonProps';

export default {
  title: 'components/RowCardSkeleton',
  component: RowCardSkeleton,
} as ComponentMeta<typeof RowCardSkeleton>;

const Template: ComponentStory<typeof RowCardSkeleton> = (args) => <RowCardSkeleton {...args} />;
export const Default = Template.bind({});

Default.args = rowCardSkeletonPropsMocked;
