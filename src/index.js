import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from 'styled-components';
import App from './App';

import { BookProvider } from './context/bookContext';

import GlobalStyles from './utils/globals';
import theme from './utils/theme';

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <BookProvider>
      <App />
      <GlobalStyles />
    </BookProvider>
  </ThemeProvider>,
  document.getElementById('root')
);
