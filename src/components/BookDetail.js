import React, { useContext, useState } from 'react';
import styled from 'styled-components';

import { BookContext } from '../context/bookContext';

const BookHeading = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.metalicBlue};
  color: ${({ theme }) => theme.colors.white};
  padding: 5rem 2rem;
  height: 6.2rem;
`;

const BookDetailsWrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.black};

  h3 {
    font-size: 2.2rem;
    text-align: center;
    margin-top: 3rem;
  }
`;

const BookDetailsInner = styled.div`
  display: flex;
  flex-direction: column;
`;

const ImgWrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.persianGreen};
  flex: 0 0 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 3rem 0;
`;

const DetailWrapper = styled.div`
  flex: 0 0 50%;
  color: ${({ theme }) => theme.colors.black};
  font-size: 2rem;
  padding: 2rem 1rem;

  p {
    font-weight: bold;

    span {
      font-weight: normal;
    }

    small {
      font-size: 1rem;
      font-weight: normal;
      color: ${({ theme }) => theme.colors.caribicGreen};
    }
  }
`;

const InputWrapper = styled.div`
  transition: all 0.2s ease-in-out;

  input {
    outline: none;
    width: 12rem;
    height: 3rem;
  }

  button {
    background-color: ${({ theme }) => theme.colors.caribicGreen};
    color: ${({ theme }) => theme.colors.white};
    outline: none;
    border-radius: 0.5rem;
    padding: 0.5rem;
    margin-left: 1rem;
  }
`;

const BookDetail = () => {
  const { activeBook, setActiveBook } = useContext(BookContext);
  const [editing, setEditing] = useState(false);

  const handleOnChange = e => {
    const num = parseInt(e.target.value);
    setActiveBook(prevState => ({
      ...prevState,
      quantity: num
    }));
  };

  return (
    <>
      <BookHeading data-testid='book-details'>
        <h2>BOOK DETAILS</h2>
      </BookHeading>
      <BookDetailsWrapper>
        {!activeBook ? (
          <h3>Please select book</h3>
        ) : (
          <BookDetailsInner>
            <ImgWrapper>
              <img src={activeBook.thumbnailUrl} alt={activeBook.title} />
            </ImgWrapper>
            <DetailWrapper>
              <p>Info</p>
              <p>
                Title:{' '}
                <span data-testid='book-details-title'>{activeBook.title}</span>
              </p>
              <p>
                Author: <span>{activeBook.authors[0]}</span>
              </p>
              <p>
                Year:{' '}
                <span>
                  {new Date(activeBook.publishedDate.$date).getFullYear()}
                </span>
              </p>
              <p>
                Pages: <span>{activeBook.pageCount}</span>
              </p>
              <p>
                Quantyty: <span>{activeBook.quantity}</span>{' '}
                <small
                  data-testid='edit-btn'
                  onClick={() => setEditing(!editing)}
                >
                  {editing ? 'close' : 'edit'}
                </small>
              </p>
              {editing && (
                <InputWrapper data-testid='input-for-edit'>
                  <input
                    placeholder='Edit quantity'
                    type='text'
                    onChange={e => handleOnChange(e)}
                  />
                </InputWrapper>
              )}
            </DetailWrapper>
          </BookDetailsInner>
        )}
      </BookDetailsWrapper>
    </>
  );
};

export default BookDetail;
