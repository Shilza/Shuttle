import React, {useEffect, useState} from "react";
import {Icon} from "antd";

import * as ThirdPartyServices from 'services/thirdParty';
import {Tag} from 'ui';
import styles from "./recommended.module.css";

const Recommended = React.memo(({setLocation}) => {
  const [recommended, setRecommended] = useState(null);

  useEffect(() => {
    ThirdPartyServices.getIp().then(data => {
      data.json().then(data => {
        ThirdPartyServices.getDataByIp(data.ip)
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

  const setLocByTarget = (event) => {
    setLocation(event.target.textContent);
  };

  return (
    <div className={styles.container}>
      Recommended
      <div className={styles.locations}>
        {
          recommended
            ?
            recommended.map((locationName, index) =>
              <Tag className={styles.tag} key={index} onClick={setLocByTarget}>{locationName}</Tag>
            )
            : <Icon type={'loading'} fontSize={12}/>
        }
      </div>
    </div>
  )
});

export default Recommended;
