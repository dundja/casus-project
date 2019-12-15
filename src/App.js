import React, { useState, useContext, useEffect } from 'react';
import styled from 'styled-components';

import { BookContext } from './context/bookContext';
import BooksFilter from './components/BooksFilter';
import BookDetail from './components/BookDetail';
import Search from './components/Search';
import Modal from './components/Modal';
import AddBook from './components/AddBook';

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

const TableWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  flex: 0 0 70%;
`;

const BookDetailsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  flex: 0 0 30%;
`;

const TableHeading = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.seaBlue};
  color: ${({ theme }) => theme.colors.white};
  padding: 5rem 2rem;
  height: 6.2rem;
  position: relative;
`;

const SearchBox = styled.div`
  overflow: scroll;
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 70%;
  right: 0;
  width: 60rem;
  max-height: 30rem;
  z-index: 999;
  background-color: ${({ theme }) => theme.colors.seaBlue};
  box-shadow: 7px 11px 12px -2px rgba(0, 0, 0, 0.7);
`;

const SearchBoxItem = styled.p`
  padding: 1.2rem;
  font-size: 1.6rem;
  color: ${({ theme }) => theme.colors.black};
  transition: all 0.2s ease-in-out;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors.caribicGreen};
    color: ${({ theme }) => theme.colors.white};
  }
`;

const AddButton = styled.button`
  font-size: 1.8rem;
  background-color: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.seaBlue};
  padding: 0.5rem 1rem;
  font-weight: bold;
  border-radius: 0.5rem;
  margin-top: 3rem;
  cursor: pointer;
`;

function App() {
  const [value, setValue] = useState('');
  const [tempBooks, setTempBooks] = useState([]);
  const { books, setActiveBook, setBooks } = useContext(BookContext);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (value === '') {
      setTempBooks([]);
    } else {
      hanldeFilter(value);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  const hanldeFilter = val => {
    const v = val.toLowerCase();
    const tempFilter = books.bookData.filter(book =>
      book.authors[0].toLowerCase().includes(v)
    );
    setTempBooks(tempFilter);
  };

  return (
    <Wrapper data-testid='application'>
      <TableWrapper>
        <TableHeading>
          <div>
            <h1>CASUS Books</h1>
            <AddButton onClick={() => setShowModal(true)}>Add book</AddButton>
          </div>
          <Search value={value} change={setValue} setTempBooks={setTempBooks} />
          {tempBooks.length > 0 && (
            <SearchBox>
              {tempBooks.map((book, i) => (
                <SearchBoxItem key={i} onClick={() => setActiveBook(book)}>
                  {book.title}
                </SearchBoxItem>
              ))}
            </SearchBox>
          )}
        </TableHeading>
        <BooksFilter />
      </TableWrapper>

      <BookDetailsWrapper>
        <BookDetail />
      </BookDetailsWrapper>

      <Modal opened={showModal} close={() => setShowModal(false)}>
        <AddBook setBooks={setBooks} setShowModal={setShowModal} />
      </Modal>
    </Wrapper>
  );
}

export default App;
