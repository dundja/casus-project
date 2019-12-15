import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

import Backdrop from './Backdrop';

const WrappedModal = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  position: fixed;
  top: 50%;
  left: 50%;
  transform: ${({ opened }) =>
    opened ? 'translate(-50%, -50%)' : 'translate(-50%, -150%)'};
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 150;
  justify-content: center;
  opacity: ${({ opened }) => (opened ? '1' : '0')};
  visibility: ${({ opened }) => (opened ? 'visible' : 'hidden')};
  width: 100%;
  max-width: 50rem;
  box-shadow: 0 0.5rem 3.5em rgba(0, 0, 0, 0.6);
  border-radius: 1rem;
  transition: all 0.1s;
`;

const InsideWrapper = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  padding: 1rem 3rem;
`;

const Modal = ({ opened, close, children }) => {
  return ReactDOM.createPortal(
    <>
      <Backdrop close={close} opened={opened} />
      <WrappedModal opened={opened}>
        <InsideWrapper>{children}</InsideWrapper>
      </WrappedModal>
    </>,
    document.getElementById('root-modal')
  );
};

export default Modal;
