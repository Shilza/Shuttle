import React from "react";
import PropTypes from 'prop-types';

import Range from "./Range";

import styles from "./settings.module.css";

const Settings = React.memo(({onChange, settings}) => {
  const setVal = (setting, onChange) => {
    switch (setting.name) {
      case 'contrast':
        return (<Range step="1" min="0" max="200" id={setting.name} onChange={onChange}
                       defaultValue={setting.value}/>);
      case 'hue':
        return (<Range step="1" min="0" max="360" id={setting.name} onChange={onChange}
                       defaultValue={setting.value}/>);
      case 'brightness':
        return (<Range step="1" min="0" max="200" id={setting.name} onChange={onChange}
                       defaultValue={setting.value}/>);
      case 'saturate':
        return (<Range step="1" min="0" max="100" id={setting.name} onChange={onChange}
                       defaultValue={setting.value}/>);
      case 'sepia':
        return (<Range step="1" min="0" max="100" id={setting.name} onChange={onChange}
                       defaultValue={setting.value}/>);
      case 'invert':
        return (<Range step="1" min="0" max="100" id={setting.name} onChange={onChange}
                       defaultValue={setting.value}/>);
      case 'grayscale':
        return (<Range step="1" min="0" max="100" id={setting.name} onChange={onChange}
                       defaultValue={setting.value}/>);
      case 'blur':
        return (<Range step="1" min="0" max="100" id={setting.name} onChange={onChange}
                       defaultValue={setting.value}/>);
      case 'opacity':
        return (<Range step="1" min="0" max="100" id={setting.name} onChange={onChange}
                       defaultValue={setting.value}/>);
      default:
        return <Range/>;
    }
  };

  return (
    <div className={styles.container}>
      {
        settings.map((setting, index) => (
            <label key={index}>
              <span className={styles.filterName}>{setting.name}</span>
              <span>{setting.value}</span>
              {setVal(setting, onChange)}
            </label>
          )
        )
      }
    </div>
  )
});

Settings.propTypes = {
  onChange: PropTypes.func.isRequired,
  settings: PropTypes.array
};

export default Settings;
