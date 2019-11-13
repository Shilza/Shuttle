import React from "react";
import PropTypes from 'prop-types';
import {SvgIcon} from "ui";

import styles from './iconButton.module.css';

const IconButton = React.memo(({className, ariaLabel, iconProps, ...props}) => (
  <button className={`${styles.button} ${className}`} aria-label={ariaLabel} {...props}>
    <SvgIcon {...iconProps}/>
  </button>
));

IconButton.propTypes = {
  className: PropTypes.string,
  ariaLabel: PropTypes.string,
  iconProps: PropTypes.shape({
    icon: PropTypes.string.isRequired,
    className: PropTypes.string,
    width: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]),
    height: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ])
  })
};

export default IconButton;
