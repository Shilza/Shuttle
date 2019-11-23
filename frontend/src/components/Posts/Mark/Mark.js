import React, {useLayoutEffect, useRef} from "react";
import {Link} from "react-router-dom";
import PropTypes from 'prop-types';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import transitions from './transitions.module.css';

import styles from "./mark.module.css";

const Mark = ({mark, parentWidth, link = false, text = 'Who is it?', ...props}) => {

  let markRef = useRef(null);

  const style = {
    top: `${mark.top}%`,
    left: `${mark.left}%`
  };

  useLayoutEffect(() => {
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
  });

  return (
    <ReactCSSTransitionGroup
      transitionName={{
        leave: transitions.leave,
        leaveActive: transitions.leaveActive,
        appear: transitions.appear,
        appearActive: transitions.appearActive
      }}
      transitionEnterTimeout={300}
      transitionLeaveTimeout={300}
      transitionAppearTimeout={300}
      transitionAppear
      transitionEnter
      transitionLeave
    >
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
    </ReactCSSTransitionGroup>
  );
};

Mark.propTypes = {
  mark: PropTypes.shape({
    top: PropTypes.number.isRequired,
    left: PropTypes.number.isRequired,
    username: PropTypes.string
  }),
  test: PropTypes.string,
  link: PropTypes.bool,
  parentWidth: PropTypes.number.isRequired
};

export default Mark;
