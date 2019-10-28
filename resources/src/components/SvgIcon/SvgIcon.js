import React from "react";
import ReactSVG from 'react-svg'
import {Icon} from "antd";
import Loader from "components/Paginator/Loader";
import styles from "./svgIcon.module.css";

const SvgIcon = React.memo(({icon, className, width = 20, height = 20, ...props}) => (
  <div {...props}>
    <ReactSVG
      src={icon}
      loading={() => <Loader/>}
      fallback={() => <Icon type={'settings'}/>}
      className={`${styles.icon} ${className}`}
      beforeInjection={svg => {
        svg.setAttribute('style', `width: ${width}px; height: ${height}px`)
      }}
    />
  </div>
));

export default SvgIcon;
