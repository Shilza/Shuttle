import React from "react";
import PropTypes from 'prop-types';
import styles from './materialInput.module.css';

const MaterialInput = React.forwardRef(({label, onChange, ...props}, ref) => (
  <div className={styles.group}>
    <input ref={ref} type="text" onChange={onChange} {...props}/>
    <span className={styles.highlight}/>
    <span className={styles.bar}/>
    <label className={styles.label}>{label}</label>
  </div>
));

MaterialInput.propTypes = {
  label: PropTypes.node,
  onChange: PropTypes.func,
  defaultValue: PropTypes.string
};

export default MaterialInput;
