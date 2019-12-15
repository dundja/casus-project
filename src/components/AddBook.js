import React, { useState } from 'react';
import styled from 'styled-components';

const ButtonsWrapper = styled.div`
  display: flex;
  width: 100%;
  margin-bottom: 2rem;
  justify-content: space-around;
  justify-self: flex-end;
`;

const FormDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Input = styled.input`
  border: ${({ theme }) => `1px solid ${theme.colors.seaBlue}`};
  outline: none;
  padding: 1rem;
  font-size: 1.6rem;
  color: ${({ theme }) => theme.colors.seaBlue};
  width: 100%;
  margin: 1rem 0;
`;

const Label = styled.label`
  font-size: 1.4rem;
  color: ${({ theme }) => theme.colors.seaBlue};
`;

const Button = styled.button`
  font-size: 1.8rem;
  background-color: ${({ theme }) => theme.colors.seaBlue};
  color: ${({ theme }) => theme.colors.white};
  padding: 0.5rem 1rem;
  font-weight: bold;
  border-radius: 0.5rem;
  margin-top: 3rem;
  cursor: pointer;
`;

const Heading = styled.h2`
  font-size: 2.2rem;
  color: ${({ theme }) => theme.colors.seaBlue};
`;

const AddBook = ({ setBooks, setShowModal }) => {
  const [newBook, setNewBook] = useState({
    title: '',
    isbn: '',
    pageCount: 0,
    quantity: 0,
    publishedDate: {
      $date: ''
    },
    dateOfBirth: '',
    thumbnailUrl: '',
    authors: ['']
  });

  const handleOnChange = e => {
    const val = e.target.value;
    const name = e.target.name;
    if (name === 'publishedDate') {
      setNewBook(prevState => ({
        ...prevState,
        publishedDate: {
          $date: val
        }
      }));
    } else if (name === 'authors') {
      setNewBook(prevState => ({
        ...prevState,
        authors: [`${val}`]
      }));
    } else {
      setNewBook(prevState => ({
        ...prevState,
        [name]: val
      }));
    }
  };

  const hanldeSave = () => {
    const tempNewBook = {
      ...newBook,
      publishedDate: {
        $date: new Date(newBook.publishedDate.$date).toISOString()
      },
      pageCount: parseInt(newBook.pageCount),
      quantity: parseInt(newBook.quantity)
    };
    setBooks(prevState => ({
      ...prevState,
      bookData: [tempNewBook, ...prevState.bookData]
    }));
    setShowModal(false);
    setNewBook({
      title: '',
      isbn: '',
      pageCount: 0,
      quantity: 0,
      publishedDate: {
        $date: ''
      },
      dateOfBirth: '',
      thumbnailUrl: '',
      authors: ['']
    });
  };

  return (
    <div>
      <Heading>Add your new book</Heading>
      <FormDiv>
        <Label htmlFor='title'>Book Title</Label>
        <Input
          type='text'
          name='title'
          id='title'
          placeholder='Book title'
          value={newBook.title}
          onChange={e => handleOnChange(e)}
        />
        <Label htmlFor='isbn'>ISBN</Label>
        <Input
          type='text'
          name='isbn'
          id='isbn'
          placeholder='Book isbn'
          value={newBook.isbn}
          onChange={e => handleOnChange(e)}
        />
        <Label htmlFor='pageCount'>Page count</Label>
        <Input
          type='number'
          name='pageCount'
          id='pageCount'
          placeholder='Page count'
          value={newBook.pageCount}
          onChange={e => handleOnChange(e)}
        />
        <Label htmlFor='quantity'>Quantity</Label>
        <Input
          type='number'
          name='quantity'
          id='quantity'
          placeholder='Book quantity'
          value={newBook.quantity}
          onChange={e => handleOnChange(e)}
        />
        <Label htmlFor='publishedDate'>Published Date</Label>
        <Input
          type='date'
          name='publishedDate'
          id='publishedDate'
          placeholder='Book published date'
          value={newBook.publishedDate.$date}
          onChange={e => handleOnChange(e)}
        />
        <Label htmlFor='thumbnailUrl'>Image Url</Label>
        <Input
          type='text'
          name='thumbnailUrl'
          id='thumbnailUrl'
          placeholder='Book image url'
          value={newBook.thumbnailUrl}
          onChange={e => handleOnChange(e)}
        />
        <Label htmlFor='authors'>Authors</Label>
        <Input
          type='text'
          name='authors'
          id='authors'
          placeholder='Book author'
          value={newBook.authors[0]}
          onChange={e => handleOnChange(e)}
        />
        <Label htmlFor='dateOfBirth'>Author date of birth</Label>
        <Input
          type='date'
          name='dateOfBirth'
          id='dateOfBirth'
          placeholder='Author date of birth'
          value={newBook.dateOfBirth}
          onChange={e => handleOnChange(e)}
        />
        <ButtonsWrapper>
          <Button onClick={hanldeSave}>Add book</Button>
          <Button onClick={() => setShowModal(false)}>Cancel</Button>
        </ButtonsWrapper>
      </FormDiv>
    </div>
  );
};

export default AddBook;
