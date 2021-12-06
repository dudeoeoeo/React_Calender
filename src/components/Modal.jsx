import React from 'react';
import styled from 'styled-components';

const Modal = ({modalClose}) => {
    console.log("modalClose", modalClose);
    const onCloseModal = (e) => {
        if(e.target === e.currentTarget) {
            modalClose();
        }
    }

    return (
        <ModalContainer onClick={onCloseModal}>
            <ModalBox>
                <ModalButton onClick={modalClose}>Modal Close</ModalButton>
            </ModalBox>
        </ModalContainer>
    );
};

const ModalContainer = styled.div`
    width: 100%;
    height: 100vh;
    background-color: rgba(0,0,0,0.4);
    z-index: 999;
    position: fixed;
    top: 0;
    left: 0;
`;

const ModalBox = styled.div`
    width: 300px;
    height: 150px;
    background-color: #fff;
    // Modal 창 브라우저 가운데로 조정
    position: absolute;
    left: 50%;
    top:50%;
    transform: translate(-50%, -50%);
    z-index: 999;
`;

const ModalButton = styled.div`
    position: relative;
    left: 50%;
    top:50%;
    transform: translate(-50%, -50%);
`;

export default Modal;