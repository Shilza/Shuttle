import React, {useEffect, useState} from "react";
import PropTypes from 'prop-types';
import {Icon, Tag} from "antd";

import * as ThirdPartyService from 'services/thirdParty';

import styles from './location.module.css';


const Location = React.memo(({defaultLocation = '', onChange}) => {

  const [isLocationOpen, setIsLocationOpen] = useState(!!defaultLocation);
  const [recommended, setRecommended] = useState(null);
  const [location, _setLocation] = useState(defaultLocation);

  useEffect(() => {
    ThirdPartyService.getIp().then(data => {
      data.json().then(data => {
        ThirdPartyService.getDataByIp(data.ip)
          .then(data => {
            data.json().then((data) => {
              setRecommended([data.continent_name, data.country_name, data.region_name, data.city].filter(Boolean));
            })
          })
          .catch(() => {
            setRecommended([]);
          });
      })
    });
  }, []);

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

  const setLocByTarget = (event) => {
    setLocation(event.target.textContent);
  };

  return (
    <>
      {
        (isLocationOpen || defaultLocation) ?
          <div className={styles.container}>
            <Icon type={'close'} className={styles.closeButton} title={'Close'} onClick={closeLocation}/>
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
            <div className={styles.recommendedContainer}>
              Recommended
              <div className={styles.locations}>
                {
                  recommended
                    ? recommended.map(l => <Tag className={styles.location} key={l} onClick={setLocByTarget}>{l}</Tag>)
                    : <Icon type={'loading'} fontSize={12}/>
                }
              </div>
            </div>
          </div>
          : <button className={styles.button} onClick={openLocation}>Add place</button>
      }
    </>
  )
});

Location.propTypes = {
  defaultLocation: PropTypes.string,
  onChange: PropTypes.func.isRequired
};

export default Location;
