import { ComponentMeta, ComponentStory } from '@storybook/react';

import RankInfo from './RankInfo';
import { rankInfoPropsMocked } from './RankInfo.mock';

export default {
  title: 'components/RankInfo',
  component: RankInfo,
} as ComponentMeta<typeof RankInfo>;

const Template: ComponentStory<typeof RankInfo> = (args) => <RankInfo {...args} />;
export const Default = Template.bind({});

Default.args = rankInfoPropsMocked;
