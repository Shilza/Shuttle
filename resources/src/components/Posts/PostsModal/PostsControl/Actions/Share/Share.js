import React, {useState} from "react";
import PropTypes from 'prop-types';
import {Drawer} from "react-pretty-drawer";

import {isMobile} from "utils/isMobile";
import {SimpleModal} from 'ui';
import {SvgIcon} from 'ui';
import planeIcon from "images/plane.svg";

import Body from "./Body";
import styles from './share.module.css';

const Share = React.memo(({src, className}) => {

  const [isVisible, setIsVisible] = useState(false);

  const open = () => {
    setIsVisible(true);
  };

  const close = () => {
    setIsVisible(false);
  };

  return (
    <>
      <button className={`${styles.button} ${className}`} onClick={open} title={'Share'}>
        <SvgIcon title={'Share post'} icon={planeIcon} className={styles.icon}/>
      </button>
      {
        isMobile()
          ? <Drawer onClose={close} visible={isVisible} placement='bottom' height='90%' className={styles.drawer}>
            <Body src={src} close={close}/>
          </Drawer>
          : <SimpleModal visible={isVisible} onCancel={close}>
            <div className={styles.bodyWrapper}>
              <Body src={src} close={close}/>
            </div>
          </SimpleModal>
      }
    </>
  )
});

Share.propTypes = {
  src: PropTypes.string.isRequired,
  className: PropTypes.string
};

export default Share;
