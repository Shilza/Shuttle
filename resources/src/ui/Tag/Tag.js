import React from "react";
import PropTypes from 'prop-types';
import styles from './tag.module.css';

const Tag = React.memo(({children, className, ...props}) => (
  <span className={`${styles.container} ${className}`} {...props}>
    {children}
  </span>
));

Tag.propTypes = {
  children: PropTypes.element.isRequired,
  className: PropTypes.string
};

export default Tag;
