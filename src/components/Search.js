import React, { useState, useRef } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  position: relative;
	display: inline-block;
	width: 35rem;
`

const Input = styled.input`
  width: 100%;
	padding: 7px 0;
	opacity: 0;
	font-size: 17px;
	font-weight: 400;
	letter-spacing: -0.28px;
	color: ${({ theme })=> theme.colors.paleSpring};
	border: 0;
	border-bottom: 1px solid #ffffff;
	background-color: transparent;
	transition: all .1s ease-in-out;
  visibility: ${({openSearchBar}) => openSearchBar ? 'visible' : 'hidden'};
	opacity: ${({openSearchBar}) => openSearchBar ? 1 : 0};

	&:hover {
		border-bottom-color: ${({theme}) => theme.colors.caribicGreen};
		outline: 0;
	}

  &::placeholder {
    color: ${({ theme })=> theme.colors.white};
  }
`;

const BtnSearch = styled.button`
  position: absolute;
	top: 50%;
	right: 0;
	z-index: 1;
  background: transparent;
	opacity: 1;
	display: block;
	cursor: pointer;
	transform: translateY(-50%);
	transition: all .1s ease-in-out;
  visibility: ${({openSearchBar}) => openSearchBar ? "hidden" : "visible"};
	opacity: ${({openSearchBar}) => openSearchBar ? 0 : 1};
  border: none;
  outline: none;
`;

const BtnClose = styled.button`
  position: absolute;
	top: 50%;
	right: 0;
	z-index: 1;
	opacity: 1;
	display: block;
  background: transparent;
	cursor: pointer;
	transform: translateY(-50%);
	transition: all .1s ease-in-out;
  visibility: ${({openSearchBar}) => openSearchBar ? "visible" : "hidden"};
	opacity: ${({openSearchBar}) => openSearchBar ? 1 : 0};
  border: none;
  outline: none;
`;

const Search = ({ change, value, setTempBooks }) => {
  const [openSearchBar, setOpenSearchBar] = useState(false);

  const inputRef = useRef();

  const handleOpenSearchBar = () => {
    setOpenSearchBar(true);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const changeSearchText = e => {
    change(e.target.value);
  };

  const removeSearchText = () => {
    setOpenSearchBar(false);
    if (inputRef.current) {
      inputRef.current.value = '';
      inputRef.current.focus();
    }
    change('');
    setTempBooks([]);
  };

  return (
    <Wrapper openSearchBar={openSearchBar}>
      <>
        <Input
          ref={inputRef}
          type='text'
          value={value}
          placeholder='Search book by author'
          onChange={changeSearchText}
          openSearchBar={openSearchBar}
        />
        <BtnClose
          type='button'
          onClick={removeSearchText}
          openSearchBar={openSearchBar}
        >
          <svg
            width='14'
            height='14'
            viewBox='0 0 14 14'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M13 1L1 13M1 1l12 12'
              stroke='#FFFFFF'
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='1.5'
            />
          </svg>
        </BtnClose>
        <BtnSearch
          type='button'
          onClick={handleOpenSearchBar}
          openSearchBar={openSearchBar}
        >
          <svg
            width='20'
            height='20'
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 20 20'
          >
            <g
              transform='translate(1 1)'
              stroke='#FFFFFF'
              strokeWidth='1.5'
              fill='none'
              fillRule='evenodd'
              strokeLinecap='round'
              strokeLinejoin='round'
            >
              <circle cx='7.5' cy='7.5' r='7.5' />
              <path d='M18 18l-5.2-5.2' />
            </g>
          </svg>
        </BtnSearch>
      </>
    </Wrapper>
  );
};

export default Search;
