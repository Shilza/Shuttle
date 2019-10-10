import React, {useEffect, useRef} from "react";
import {Link} from "react-router-dom";
import PropTypes from 'prop-types';

import styles from "./mark.module.css";

const Mark = ({mark, link = false, text = 'Who is it?', ...props}) => {

  let markRef = useRef(null);

  const style = {
    top: `${mark.top}%`,
    left: `${mark.left}%`
  };

  useEffect(() => {
    const parentWidth = parseInt(getComputedStyle(markRef.current.parentNode).getPropertyValue('width'));
    const onePercentOfScreenWidth = parentWidth / 100;
    const markerWidth = parseInt(getComputedStyle(markRef.current).getPropertyValue('width'));
    const markerLeftPositionInPixels = onePercentOfScreenWidth * mark.left;
    const extraMargin = 1;

    const markerRightPosition = markerLeftPositionInPixels + markerWidth;

    if (markerRightPosition > parentWidth) {
      const extraPixels = Math.abs(parentWidth - markerRightPosition);
      const extraPercents = extraPixels / onePercentOfScreenWidth;

      markRef.current.style.left = `${mark.left - extraPercents - extraMargin}%`;
    }

    if (mark.top < 1)
      markRef.current.style.top = '1%';
  }, []);

  return (
    <>
      {
        link ?
          <Link
            to={`/${mark.username}`}
            className={styles.mark}
            style={style}
            innerRef={markRef}
            {...props}
          >
            {mark.username || text}
          </Link>
          :
          <div
            className={styles.mark}
            style={style}
            ref={markRef}
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
