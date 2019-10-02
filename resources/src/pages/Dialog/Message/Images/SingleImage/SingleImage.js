import React from "react";

import Image from "../Image";

import styles from "./singleImage.module.css";

const SingleImage = ({my, images}) => (
  <div className={my ? styles.mySingleImgContainer : styles.singleImgContainer}>
    {
      images && images.map(image => <Image key={'key'} src={image}/>)
    }
  </div>
);

export default SingleImage;
