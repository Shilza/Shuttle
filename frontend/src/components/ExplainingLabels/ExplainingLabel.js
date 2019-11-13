import React from "react";
import PropTypes from 'prop-types';
import styles  from './explainingLabels.module.css';

const ExplainingLabel = ({children, icon, text}) => (
    <div className={styles.sectionContainer}>
        <div className={styles.iconContainer}>
            {icon}
        </div>
        <span className={styles.sectionLabel}>{text}</span>
        {children}
    </div>
);

ExplainingLabel.propTypes = {
    children: PropTypes.element,
    icon: PropTypes.element.isRequired,
    text: PropTypes.string.isRequired
};

export default ExplainingLabel;