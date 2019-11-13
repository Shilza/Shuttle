import React, {useEffect, useMemo, useRef, useState} from "react";
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {Drawer} from 'react-pretty-drawer';

import Mark from "components/Posts/Mark";
import {Modal} from 'ui';
import {isMobile} from "utils";

import MediaPlayer from "./MediaPlayer";
import SaveBar from "./SaveBar";
import MarkedUsers from "../Posts/Marks/MarkedUsers/MarkedUsers";
import styles from './postMedia.module.css';

const PostMedia = ({media, showBar, marks, closeModal, fullWidth, muted, autoPlay}) => {

  const isVideo = useMemo(() => !!media.match('.mp4'), [media]);

  const [isMarksShown, setIsMarksShown] = useState(false);
  const [isMarksButtonShow, setIsMarksButtonShow] = useState(true);
  let timer = useRef(null);
  let containerRef = useRef(null);
  const containerWidth = containerRef && containerRef.current && parseInt(getComputedStyle(containerRef.current).getPropertyValue('width'));

  useEffect(() => {
    if(isVideo)
      timer.current = setTimeout(() => {
        setIsMarksButtonShow(false)
      }, 2000);
  }, [isVideo]);

  const showMarks = () => {
    setIsMarksShown(true);
  };

  const hideMarks = () => {
    setIsMarksShown(false);
  };

  const onMouseMove = () => {
    if(isVideo) {
      setIsMarksButtonShow(true);
      clearInterval(timer.current);
      timer.current = setTimeout(() => {
        setIsMarksButtonShow(false);
      }, 2000);
    }
  };

  return (
    <div className={styles.container} onMouseMove={onMouseMove} onMouseOver={onMouseMove} ref={containerRef}>
      <MediaPlayer
        media={media}
        autoPlay={autoPlay}
        muted={muted}
        fullWidth={fullWidth}
      />
      <SaveBar showBar={showBar} isVideo={isVideo}/>
      {
        !showBar && marks && marks.length > 0 &&
        <>
          {
            isMarksButtonShow &&
            <button onClick={isMarksShown ? hideMarks : showMarks}
                    className={isVideo ? styles.showMarksButtonVideo : styles.showMarksButton}
            >
              {isMarksShown ? 'Hide marks' : 'Show marks'}
            </button>
          }
          {
            isMarksShown && !isVideo &&
            marks.map(mark =>
              <Mark
                key={mark.id}
                mark={mark}
                onClick={closeModal}
                parentWidth={containerWidth}
                link
              />
            )
          }
          {
            isMobile() ?
              <Drawer
                visible={isMarksShown && isVideo}
                placement={'bottom'}
                onClose={hideMarks}
                zIndex={10000}
                height={'min-content'}
                className={styles.drawer}
              >
                <MarkedUsers
                  users={marks}
                  className={styles.mobileMarkedUsersContainer}
                  closeModal={closeModal}
                />
              </Drawer>
              :
              <Modal visible={isMarksShown && isVideo} onClose={hideMarks}>
                <div className={styles.computerMarksContainer}>
                  <MarkedUsers
                    users={marks}
                    className={styles.markedUsersContainer}
                    onClickUser={closeModal}
                  />
                </div>
              </Modal>
          }
        </>
      }
    </div>
  );
};

PostMedia.defaultProps = {
  autoPlay: false,
  fullWidth: false
};

PostMedia.propTypes = {
  media: PropTypes.string.isRequired,
  showBar: PropTypes.bool.isRequired,
  fullWidth: PropTypes.bool,
  muted: PropTypes.bool,
  marks: PropTypes.array,
};

const mapStateToProps = (state, props) => ({
  showBar: (state.saved.postToBeSaved ? state.saved.postToBeSaved.id : undefined) === props.postId
});

export default connect(mapStateToProps)(PostMedia);
