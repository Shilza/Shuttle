import React from "react";
import {Tag} from "antd";

import styles from './tags.module.css';

const Tags = ({tags = ['tag1', 'tag2', 'tag3', 'tag4', 'tag5', 'tag5', 'tag6', 'tag7']}) => {
  return (
    <div className={styles.container}>
      {
        tags.map(tag => <Tag key={tag}>{tag}</Tag>)
      }
    </div>
  )
};

export default Tags;
