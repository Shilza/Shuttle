import React, {useRef, useState} from "react";
import PropTypes from 'prop-types';
import {Icon} from "antd";

import styles from "./searchInput.module.css";

const SearchInput = React.memo(({search, className, ...props}) => {
  let inputRef = useRef(null);
  const [showClose, setShowClose] = useState(false);

  const clearInput = () => {
    inputRef.current.value = '';
    search('');
  };

  const onInputChange = (event) => {
    setShowClose(event.target.value.length > 0);
    search(event.target.value);
  };

  return (
    <div className={`${styles.searchContainer} ${className}`}>
      <Icon type='search'/>
      <input ref={inputRef} placeholder='Search' maxLength='32' onChange={onInputChange} {...props}/>
      {
        showClose && <Icon type={'close'} onClick={clearInput}/>
      }
    </div>
  )
});

SearchInput.propTypes = {
  search: PropTypes.func.isRequired,
  className: PropTypes.string
};

export default SearchInput;
