import React from "react";
import styles from './direction.module.css';
import DirectionActions from "./DirectionActions";

const Direction = ({username}) => (
    <div className={styles.directionContainer}>
            <span className={styles.username}>
                {username}
            </span>
        <DirectionActions/>
    </div>
);

export default Direction;