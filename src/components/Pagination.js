import React, { useRef } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-end;
  position: absolute;
  bottom: 0;
  right: 0;

  div {
    display: inline-block;
    padding: 1rem 1.6rem;
    cursor: Pointer;
    color: ${({ theme }) => theme.colors.seaBlue};
    margin: 0 0.2rem;
    font-size: 1.2rem;
  }

  div[disabled] {
    pointer-events: none;
  }

  span {
    text-align: end;
  }
`;

const Box = styled.div`
  background-color: ${({ isActive, theme }) =>
    isActive ? theme.colors.paleSpring : ''};
`;

const Pagination = ({ activePage, setActivePage, totalPages, isLoading }) => {
  const firstPage = useRef(null);
  const lastPage = useRef(null);
  const minusPage = useRef(null);
  const plusPage = useRef(null);

  const handleRefClick = node => {
    switch (node.current.innerText) {
      case '>>':
        setActivePage(totalPages);
        break;
      case '>':
        setActivePage(activePage + 1);
        break;
      case '<<':
        setActivePage(1);
        break;
      case '<':
        setActivePage(activePage - 1);
        break;
      default:
        break;
    }
  };

  const handleClick = e => {
    setActivePage(+e.currentTarget.textContent);
  };

  const handlePages = pagesArr => {
    return pagesArr.map((page, i) => {
      return (
        <Box
          disabled={isLoading}
          isActive={page === activePage}
          onClick={handleClick}
          key={i}
        >
          {page}
        </Box>
      );
    });
  };

  const renderPages = () => {
    if (totalPages <= 3) {
      return totalPages === 3
        ? handlePages([1, 2, 3])
          ? totalPages === 2
          : handlePages([1, 2])
        : handlePages([1]);
    }
    if (activePage < 4) {
      return handlePages([1, 2, 3, 4]);
    } else if (activePage >= 4 && activePage < totalPages - 4) {
      return handlePages([
        activePage - 2,
        activePage - 1,
        activePage,
        activePage + 1,
        activePage + 2
      ]);
    } else {
      return handlePages([
        totalPages - 4,
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages
      ]);
    }
  };

  return (
    <Wrapper>
      {activePage > 3 && (
        <div
          disabled={isLoading}
          ref={firstPage}
          onClick={() => handleRefClick(firstPage)}
        >
          {'<<'}
        </div>
      )}
      {activePage > 3 && (
        <div
          disabled={isLoading}
          ref={minusPage}
          onClick={() => handleRefClick(minusPage)}
        >
          {'<'}
        </div>
      )}
      {activePage > 3 && <span>...</span>}
      {renderPages()}
      {activePage < totalPages - 4 && <span>...</span>}
      {activePage < totalPages - 4 && (
        <div
          disabled={isLoading}
          ref={plusPage}
          onClick={() => handleRefClick(plusPage)}
        >
          {'>'}
        </div>
      )}
      {activePage < totalPages - 4 && (
        <div
          disabled={isLoading}
          ref={lastPage}
          onClick={() => handleRefClick(lastPage)}
        >
          {'>>'}
        </div>
      )}
    </Wrapper>
  );
};

export default Pagination;
