import React from "react";
import {Image} from "ui/Image";
import styles from "./images.module.css";

const Images = ({images}) => (
  <div className={styles.container} data-count={images ? images.length : 0}>
    {
      images && images.map((image, index) => <Image key={index} src={image}/>)
    }
  </div>
);

export default Images;
