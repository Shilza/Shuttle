import React from "react";
import PropTypes from 'prop-types';

import styles from "../filters.module.css";

const FilteredImage = ({filter, media, imageRef, rotateAngel}) => {
  const imgStyle = {
    transform: `rotate(${rotateAngel}deg)`,
    filter
  };

  return <img ref={imageRef} className={styles.media} src={media} style={imgStyle} alt='With filters'/>
};

FilteredImage.propTypes = {
  filter: PropTypes.string.isRequired,
  media: PropTypes.string.isRequired,
  imageRef: PropTypes.object.isRequired,
  rotateAngel: PropTypes.number.isRequired
};

export default FilteredImage;
