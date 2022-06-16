import React from 'react';
import { addDecorator } from '@storybook/react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { theme } from '../src/theme';
import { BrowserRouter } from 'react-router-dom';

const MUIDecorator = (story) => (
  <ThemeProvider theme={theme}>
    <BrowserRouter>
      <CssBaseline />
      {story()}
    </BrowserRouter>
  </ThemeProvider>
);

addDecorator(MUIDecorator);

export const parameters = { layout: 'fullscreen' };
