import React from 'react';
import { ThemeProvider } from 'styled-components';
import { render, cleanup } from '@testing-library/react';
import App from '../App';
import { BookContext } from '../context/bookContext';
import GlobalStyles from '../utils/globals';
import theme from '../utils/theme';

let container = null;
let modal = null;
beforeAll(() => {
  container = document.createElement('div');
  modal = document.createElement('div');
  modal.id = 'root-modal';
  document.body.appendChild(container);
  document.body.appendChild(modal);
});

afterAll(cleanup);

describe('<App />', () => {
  it('renders the application', () => {
    const { getByText, queryByTestId } = render(
      <ThemeProvider theme={theme}>
        <BookContext.Provider
          value={{
            books: [],
            setActiveBook: jest.func,
            setBooks: jest.func
          }}
        >
          <App />
          <GlobalStyles />
        </BookContext.Provider>
      </ThemeProvider>,
      container
    );
    expect(getByText('CASUS Books')).toBeInTheDocument();
    expect(queryByTestId('application')).toBeTruthy();
  });
});
