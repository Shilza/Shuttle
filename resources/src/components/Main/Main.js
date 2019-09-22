import React from "react";
import CommentsModal from "../Comments/Modal/CommentsModal";

import styles from './main.module.css';

const Main = ({children}) => (
    <main className={styles.container}>
        <div className={styles.children}>
            {children}
        </div>
        <CommentsModal/>
    </main>
);

export default Main;
