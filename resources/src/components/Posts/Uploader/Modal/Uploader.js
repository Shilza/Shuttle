import React, {createRef} from "react";
import PropTypes from 'prop-types';
import {Button} from "antd";

import styles from './uploader.module.css';

const Uploader = ({loadMedia, trigger}) => {
  const fileRef = createRef();

  const initLoad = () => {
    fileRef.current.value = '';
    fileRef.current.click();
  };

  return (
    <>
      <UploadTrigger trigger={trigger} onClick={initLoad}/>
      <input
        type='file'
        style={{display: 'none'}}
        onChange={loadMedia}
        ref={fileRef}
      />
    </>
  );
};

const DefaultTrigger = ({onClick}) =>
  <Button
    className={styles.uploadButton}
    onClick={onClick} size='small'>
    New
  </Button>;

const UploadTrigger = ({onClick, trigger = <DefaultTrigger/>}) =>
  React.cloneElement(trigger, {onClick: onClick});

Uploader.propTypes = {
  loadMedia: PropTypes.func.isRequired,
  trigger: PropTypes.element
};

export default Uploader;
