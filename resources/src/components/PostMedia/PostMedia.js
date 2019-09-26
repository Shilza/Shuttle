import React, {useState} from "react";
import PropTypes from 'prop-types';
import {connect} from "react-redux";

import MediaPlayer from "./MediaPlayer";
import SaveBar from "./SaveBar/SaveBar";
import Mark from "../Posts/Mark/Mark";

import styles from './postMedia.module.css';

const PostMedia = ({media, showBar, marks}) => {

  const [isMarksShown, setIsMarksShown] = useState(false);

  const showMarks = () => {
    setIsMarksShown(true);
  };

  const hideMarks = () => {
    setIsMarksShown(false);
  };

  return (
    <div className={styles.container}>
      <MediaPlayer media={media}/>
      <SaveBar showBar={showBar}/>
      {
        !showBar && marks && marks.length > 0 &&
        <>
          <button onClick={isMarksShown ? hideMarks : showMarks} className={styles.showMarksButton}>
            {isMarksShown ? 'Hide marks' : 'Show marks'}
          </button>
          {
            isMarksShown && marks.map(mark => <Mark mark={mark} link/>)
          }
        </>
      }
    </div>
  );
};

PostMedia.propTypes = {
  media: PropTypes.string.isRequired,
  showBar: PropTypes.bool.isRequired,
  marks: PropTypes.array
};

const mapStateToProps = (state, props) => ({
  showBar: (state.saved.postToBeSaved ? state.saved.postToBeSaved.id : undefined) === props.postId
});

export default connect(mapStateToProps)(PostMedia);
