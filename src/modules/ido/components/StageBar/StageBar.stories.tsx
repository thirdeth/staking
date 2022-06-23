import { Grid } from '@mui/material';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import { StageBar } from './StageBar';
import { stageBarPropsMocked } from './StageBar.mock';

export default {
  title: 'components/StageBar',
  component: StageBar,
} as ComponentMeta<typeof StageBar>;

const Template: ComponentStory<typeof StageBar> = (args) => (
  <Grid container justifyContent="center" alignItems="center" sx={{ height: '100%' }}>
    <StageBar {...args} />
  </Grid>
);
export const Default = Template.bind({});

Default.args = stageBarPropsMocked;
