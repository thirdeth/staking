import { Grid } from '@mui/material';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import { ToggleBtns } from './ToggleBtns';
import { toggleBtnsPropsMocked } from './ToggleBtns.mock';

export default {
  title: 'components/ToggleBtns',
  component: ToggleBtns,
} as ComponentMeta<typeof ToggleBtns>;

const Template: ComponentStory<typeof ToggleBtns> = (args) => (
  <Grid container justifyContent="center" alignItems="center" height="100vh">
    <ToggleBtns {...args} />
  </Grid>
);
export const Default = Template.bind({});

Default.args = toggleBtnsPropsMocked;
