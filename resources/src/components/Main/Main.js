import React from "react";
import CommentsModal from "../Comments/Modal/CommentsModal";

import {isMobile} from "utils/isMobile";
import styles from './main.module.css';

const Main = ({children}) => (
    <main className={styles.container}>
        <div className={isMobile() ? styles.children : ''}>
            {children}
        </div>
        <CommentsModal/>
    </main>
);

export default Main;
