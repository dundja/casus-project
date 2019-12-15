import React, { createContext, useState, useEffect } from 'react';

import BOOKS_DB from '../mock/BOOKS_DB';

const BookContext = createContext(null);

const BookProvider = ({ children }) => {
  const [books, setBooks] = useState({
    bookData: []
  });
  const [activeBook, setActiveBook] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [lastSortType, setLastSortType] = useState(null);
  const [toggler, setToggler] = useState(false);

  useEffect(() => {
    getBooks();
  }, []);

  const getBooks = async () => {
    setIsLoading(true);
    // simulating slow API call
    try {
      const response = await new Promise(resolve =>
        setTimeout(() => {
          resolve(BOOKS_DB);
        }, 2000)
      );
      response.forEach(book => {
        if (!Object.keys(book).includes('publishedDate')) {
          book.publishedDate = {
            $date: new Date().toISOString()
          };
        }
        // adding random book quantity
        book.quantity = Math.floor(Math.random() * 1000);
      });
      setBooks({ bookData: response });
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePagination = (current, totalLength, data) => {
    let dataPerPage = 10;
    let tempData;
    const totalPages = Math.round(totalLength / dataPerPage);

    if (current === 1) {
      tempData = data.slice(0, dataPerPage);
    } else if (current > 1 && current <= totalPages) {
      const start = (current - 1) * dataPerPage;
      const end = start + dataPerPage;
      tempData = data.slice(start, end);
    } else if (current > totalPages) {
      current = totalPages;
      const start = (current - 1) * dataPerPage;
      const end = start + dataPerPage;
      tempData = data.slice(start, end);
    }

    return {
      tempData,
      totalPages
    };
  };

  const hanleSort = type => {
    const isLastSort = type === lastSortType;
    let tempBooks = [];
    if (type === 'authors') {
      tempBooks = books.bookData.sort((a, b) => {
        if (a[type][0].toUpperCase() < b[type][0].toUpperCase()) {
          return toggler && isLastSort ? -1 : 1;
        }
        if (a[type][0].toUpperCase() > b[type][0].toUpperCase()) {
          return toggler && isLastSort ? 1 : -1;
        }
        return 0;
      });
    } else if (type === 'publishedDate') {
      tempBooks = books.bookData.sort((a, b) => {
        if (new Date(a[type]?.$date) > new Date(b[type]?.$date)) {
          return toggler && isLastSort ? -1 : 1;
        }
        if (new Date(a[type]?.$date) < new Date(b[type]?.$date)) {
          return toggler && isLastSort ? 1 : -1;
        }
        return 0;
      });
    } else {
      tempBooks = books.bookData.sort((a, b) => {
        const aItem =
          typeof a[type] === 'number' ? a[type] : a[type].toUpperCase();
        const bItem =
          typeof a[type] === 'number' ? b[type] : b[type].toUpperCase();
        if (aItem > bItem) {
          return toggler && isLastSort ? -1 : 1;
        }
        if (aItem < bItem) {
          return toggler && isLastSort ? 1 : -1;
        }
        return 0;
      });
    }

    setBooks({ bookData: tempBooks });
    setLastSortType(type);
    setToggler(!toggler);
  };

  return (
    <BookContext.Provider
      value={{
        books,
        setBooks,
        handlePagination,
        isLoading,
        setIsLoading,
        setActiveBook,
        activeBook,
        hanleSort
      }}
    >
      {children}
    </BookContext.Provider>
  );
};

export { BookContext, BookProvider };
