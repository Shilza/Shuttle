import React from "react";
import {Link} from "react-router-dom";
import PropTypes from 'prop-types';

import styles from "./mark.module.css";

const Mark = ({mark, link = false, text = 'Who is it?', ...props}) => {
  const style = {
    top: `${mark.top}%`,
    left: `${mark.left}%`
  };

  return (
    <>
      {
        link ?
          <Link
            to={`/${mark.username}`}
            className={styles.mark}
            style={style}
            {...props}
          >
            {mark.username || text}
          </Link>
          :
          <div
            className={styles.mark}
            style={style}
            {...props}
          >
            {mark.username || text}
          </div>
      }
    </>
  );
};

Mark.propTypes = {
  mark: PropTypes.shape({
    top: PropTypes.number.isRequired,
    left: PropTypes.number.isRequired,
    username: PropTypes.string
  }),
  test: PropTypes.string,
  link: PropTypes.bool
};

export default Mark;
