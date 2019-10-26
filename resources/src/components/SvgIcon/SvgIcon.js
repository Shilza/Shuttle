import React from "react";
import styles from "./svgIcon.module.css";

const SvgIcon = React.memo(({icon, className, ...props}) => (
  <div className={`${styles.icon} ${className}`}
       style={{
         mask: `url(${icon}) no-repeat 50% 50%`,
         WebkitMask: `url(${icon}) no-repeat 50% 50%`
       }}
       {...props}
  />
));

export default SvgIcon;
