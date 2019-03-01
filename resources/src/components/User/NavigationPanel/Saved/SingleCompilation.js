import React from "react";
import PropTypes from 'prop-types';
import styles from './saved.module.css';

const SingleCompilation = src => (
    <div>
        <div className={styles.singlePic}>
            <img src={src} alt={'Compilation'}/>
        </div>
    </div>
);

SingleCompilation.propTypes = {
    src: PropTypes.string.isRequired
};

export default SingleCompilation;