import React from "react";
import PropTypes from 'prop-types';

import Loader from "components/Paginator/Loader";

import styles from './button.module.css';

const Button = React.memo(({children, className, disabled, loading, onClick, title, htmlType, ...props}) => (
  <button
    className={`${styles.button} ${className}`}
    type={htmlType}
    onClick={onClick}
    title={title}
    disabled={disabled || loading}
    {...props}
  >
    <>
      {children}
      {
        loading && <Loader className={styles.loader}/>
      }
    </>
  </button>
));

Button.defaultProps = {
  loading: false,
  disabled: false,
};

Button.propTypes = {
  PropTypes: PropTypes.element.isRequired,
  className: PropTypes.string,
  htmlType: PropTypes.oneOf([
    "button",
    "reset",
    "submit"
  ]),
  onClick: PropTypes.func,
  loading: PropTypes.bool,
  disabled: PropTypes.bool,
  title: PropTypes.string
};

export default Button;
