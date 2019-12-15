import React from 'react';
import { ThemeProvider } from 'styled-components';
import { render, cleanup, fireEvent } from '@testing-library/react';
import BookDetail from '../components/BookDetail';
import { BookContext } from '../context/bookContext';
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

describe('<BookDetail />', () => {
  it('renders the <BookDetail />', () => {
    const activeBook = {
      title: 'Book title',
      isbn: '',
      pageCount: 0,
      quantity: 0,
      publishedDate: {
        $date: ''
      },
      dateOfBirth: '',
      thumbnailUrl: '',
      authors: ['']
    };
    // const setBooks = jest.fn();
    const { queryByTestId, getByText } = render(
      <ThemeProvider theme={theme}>
        <BookContext.Provider
          value={{
            setActiveBook: jest.func,
            activeBook
          }}
        >
          <BookDetail />
        </BookContext.Provider>
      </ThemeProvider>
    );

    expect(queryByTestId('book-details')).toBeTruthy();
    expect(getByText('BOOK DETAILS')).toBeInTheDocument();
    expect(activeBook.title).toEqual('Book title');
    const titleInput = queryByTestId('book-details-title');
    expect(titleInput.innerHTML).toEqual(activeBook.title);
    const editBtn = queryByTestId('edit-btn');
    fireEvent.click(editBtn);
    expect(queryByTestId('input-for-edit')).toBeInTheDocument();
  });
});
