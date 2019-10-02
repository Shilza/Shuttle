import React from "react";

import Image from "./Image";

import styles from "./images.module.css";

const Images = ({images}) => (
  <div className={styles.container}>
    {
      images && images.map((image, index) => <Image key={index} src={image}/>)
    }
  </div>
);

export default Images;
