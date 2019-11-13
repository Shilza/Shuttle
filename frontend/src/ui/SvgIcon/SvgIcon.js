import React from "react";
import PropTypes from 'prop-types';
import ReactSVG from 'react-svg'
import {Icon} from "antd";
import Loader from "components/Paginator/Loader";
import styles from "./svgIcon.module.css";

const SvgIcon = React.memo(({icon, className, width, height, ...props}) => (
  <div {...props}>
    <ReactSVG
      src={icon}
      loading={() => <Loader/>}
      fallback={() => <Icon type={'settings'}/>}
      className={`${styles.icon} ${className}`}
      beforeInjection={svg => {
        svg.setAttribute('style',
          `width: ${typeof width === 'string' ? width : `${width}px`};
          height: ${typeof height === 'string' ? height : `${height}px`}`
        )
      }}
    />
  </div>
));

SvgIcon.defaultProps = {
  width: 20,
  height: 20
};

SvgIcon.propTypes = {
  icon: PropTypes.string.isRequired,
  className: PropTypes.string,
  width: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  height: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ])
};

export default SvgIcon;
