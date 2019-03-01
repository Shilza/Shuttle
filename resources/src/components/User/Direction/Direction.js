import React from "react";
import PropTypes from 'prop-types';
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

Direction.propTypes = {
    username: PropTypes.string.isRequired
};

export default Direction;