import {createPortal} from "react-dom";
import styles from './modal.module.css';
import React from "react";

const Modal = ({children, closeModal}) => {
    const closeByCoverClick = event => {
        if(event.target.id === 'modalCover')
            closeModal();
    };

    return createPortal(
        <aside className={styles.modalCover} id='modalCover' onClick={closeByCoverClick}>
            <button onClick={closeModal}
                    className={styles.closeButton}
                    aria-label="Close Modal">
                <svg className={styles.closeIcon} viewBox="0 0 40 40">
                    <path d="M 10,10 L 30,30 M 30,10 L 10,30"/>
                </svg>
            </button>
            <div className={styles.modalContent}>
                {children}
            </div>
        </aside>,
        document.body
    );
};

export default Modal;