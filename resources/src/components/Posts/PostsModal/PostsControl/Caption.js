import React from "react";
import PropTypes from 'prop-types';
import styles from './postControl.module.css';

const Caption = ({caption, owner}) => (
    <>
        {
            caption &&
            <div className={styles.caption}>
                <h4 className={styles.captionUsername}>{owner}</h4>
                <span>{caption}</span>
            </div>
        }
    </>
);

Caption.propTypes = {
    caption: PropTypes.string,
    owner: PropTypes.string.isRequired
};

export default React.memo(Caption);