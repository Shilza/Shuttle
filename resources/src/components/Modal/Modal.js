import {createPortal} from "react-dom";
import styles from './modal.module.css';
import React from "react";
import CloseButton from "./CloseButton";

const Modal = ({children, closeModal}) => {
    const closeByCoverClick = event => {
        if(event.target.id === 'modalCover')
            closeModal();
    };

    return createPortal(
        <aside className={styles.modalCover} id='modalCover' onClick={closeByCoverClick}>
            <CloseButton closeModal={closeModal}/>
            <div className={styles.modalContent}>
                {children}
            </div>
        </aside>,
        document.body
    );
};

export default Modal;