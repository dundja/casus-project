import React, { useContext, useState, useEffect } from 'react';
import styled from 'styled-components';

import { BookContext } from '../context/bookContext';
import Loader from './Loader';
import Pagination from './Pagination';

const Wrapper = styled.div`
  min-height: 90vh;
  display: flex;
  flex-direction: column;
  position: relative;
`;

const Table = styled.table`
  padding: 4rem 1rem;
`;

const Thead = styled.thead`
  padding: 1rem;
  cursor: pointer;
  font-size: 1.8rem;
`;

const TheadTR = styled.tr`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TheadTD = styled.td`
  flex: 0 0 20%;
  text-align: end;
`;

const TD = styled.td`
  flex: 0 0 20%;
  text-align: end;
`;

const TDImg = styled.td`
  flex: 0 0 20%;
  text-align: center;
`;

const Tbody = styled.tbody`
  /* min-height: 60rem; */
`;

const TbodyTR = styled.tr`
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 0.2s ease-in-out;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors.paleSpring};
  }
`;

const TbodyImg = styled.img`
  max-width: 5rem;
  max-height: 5rem;
`;

const BooksFilter = () => {
  const {
    books,
    isLoading,
    handlePagination,
    hanleSort,
    setActiveBook
  } = useContext(BookContext);
  const [paginatedBooks, setPaginatedBooks] = useState({
    tempData: [],
    totalPages: 1
  });
  const [activePage, setActivePage] = useState(1);
  const [isPaginationLoading, setIsPaginationLoading] = useState(true);

  useEffect(() => {
    setIsPaginationLoading(true);
    // simulating slow API request
    new Promise(resolve =>
      setTimeout(() => {
        const result = handlePagination(
          activePage,
          books.bookData.length,
          books.bookData
        );
        resolve(result);
      }, 1500)
    ).then(response => {
      setPaginatedBooks(response);
      setIsPaginationLoading(false);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [books, activePage]);

  const renderBooks = () => {
    return paginatedBooks.tempData.map((book, i) => (
      <TbodyTR key={i} onClick={() => setActiveBook(book)}>
        <TDImg>
          <TbodyImg src={book.thumbnailUrl} alt={book.title} />
        </TDImg>
        <TD>{book.title}</TD>
        <TD>{book.authors[0]}</TD>
        <TD>{new Date(book.publishedDate?.$date).getFullYear()}</TD>
        <TD>{book.pageCount}</TD>
      </TbodyTR>
    ));
  };

  return (
    <Wrapper>
      <Table>
        <Thead>
          <TheadTR>
            <TheadTD></TheadTD>
            <TheadTD onClick={() => hanleSort('title')}>TITLE</TheadTD>
            <TheadTD onClick={() => hanleSort('auTheadTRors')}>AUTHOR</TheadTD>
            <TheadTD onClick={() => hanleSort('publishedDate')}>YEAR</TheadTD>
            <TheadTD onClick={() => hanleSort('pageCount')}>PAGES</TheadTD>
          </TheadTR>
        </Thead>
        <Tbody>
          {isPaginationLoading || isLoading ? (
            <tr>
              <td>
                <Loader />
              </td>
            </tr>
          ) : (
            renderBooks()
          )}
        </Tbody>
      </Table>
      <Pagination
        isOnBottom={true}
        activePage={activePage}
        setActivePage={setActivePage}
        totalPages={paginatedBooks.totalPages}
        isLoading={isPaginationLoading}
      />
    </Wrapper>
  );
};

export default BooksFilter;
