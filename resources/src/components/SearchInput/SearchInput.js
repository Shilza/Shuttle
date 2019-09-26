import React from "react";
import PropTypes from 'prop-types';
import {Icon} from "antd";

import styles from "./searchInput.module.css";

const SearchInput = React.memo(({search, className, ...props}) => (
  <div className={`${styles.searchContainer} ${className}`}>
    <Icon type='search'/>
    <input placeholder='Search' maxLength='32' onChange={search} {...props}/>
  </div>
));

SearchInput.propTypes = {
  search: PropTypes.func.isRequired,
  className: PropTypes.string
};

export default SearchInput;
