import React from "react";
import PropTypes from 'prop-types';

import VideoMarks from "./VideoMarks";
import ImageMarks from "./ImageMarks";

const Marks = ({video, ...props}) => (
  <>
    {
      video
        ? <VideoMarks {...props}/>
        : <ImageMarks {...props}/>
    }
  </>
);

Marks.propTypes = {
  marks: PropTypes.array,
  goBack: PropTypes.func,
  media: PropTypes.string,
  video: PropTypes.bool
};

export default Marks;
