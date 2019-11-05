import React, {useState} from "react";
import PropTypes from 'prop-types';
import {Icon} from "antd";
import {Button} from 'ui';

import Recommended from "./Recommended";
import styles from './location.module.css';


const closeIconStyle = {color: 'var(--icon)'};

const Location = React.memo(({defaultLocation = '', onChange}) => {

  const [isLocationOpen, setIsLocationOpen] = useState(!!defaultLocation);

  const [location, _setLocation] = useState(defaultLocation);

  const setLocation = (value) => {
    onChange(value);
    _setLocation(value);
  };

  const openLocation = () => {
    setIsLocationOpen(true);
  };

  const closeLocation = () => {
    setIsLocationOpen(false);
    setLocation(defaultLocation);
  };

  return (
    <>
      {
        isLocationOpen ?
          <div className={styles.container}>
            <Icon type={'close'} className={styles.closeButton} style={closeIconStyle} title={'Close'}
                  onClick={closeLocation}/>
            <label className={styles.label}>
              Place
              <input
                placeholder={'Enter your location'}
                className={styles.inputLocation}
                onChange={(e) => setLocation(e.target.value)}
                value={location}
                maxLength={100}
              />
            </label>
            <Recommended setLocation={setLocation}/>
          </div>
          : <Button className={styles.button} onClick={openLocation}>Add place</Button>
      }
    </>
  )
});

Location.propTypes = {
  defaultLocation: PropTypes.string,
  onChange: PropTypes.func.isRequired
};

export default Location;
