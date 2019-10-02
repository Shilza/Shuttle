import React, {useState} from "react";
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {Drawer} from 'react-pretty-drawer';

import Mark from "components/Posts/Mark";
import Modal from "components/Modal";
import {isMobile} from "utils/isMobile";

import MediaPlayer from "./MediaPlayer";
import SaveBar from "./SaveBar";
import MarkedUsers from "../Posts/Marks/MarkedUsers/MarkedUsers";
import styles from './postMedia.module.css';

const PostMedia = ({media, showBar, marks, closeModal, fullWidth, autoPlay, withPlayButton, playByClick}) => {

  const [isMarksShown, setIsMarksShown] = useState(false);

  const showMarks = () => {
    setIsMarksShown(true);
  };

  const hideMarks = () => {
    setIsMarksShown(false);
  };

  return (
    <div className={styles.container}>
      <MediaPlayer
        media={media}
        playByClick={playByClick}
        withPlayButton={withPlayButton}
        autoPlay={autoPlay}
        fullWidth={fullWidth}
      />
      <SaveBar showBar={showBar}/>
      {
        !showBar && marks && marks.length > 0 &&
        <>
          <button onClick={isMarksShown ? hideMarks : showMarks} className={styles.showMarksButton}>
            {isMarksShown ? 'Hide marks' : 'Show marks'}
          </button>
          {
            isMarksShown && !media.match('.mp4') &&
            marks.map(mark =>
              <Mark
                key={mark.id}
                mark={mark}
                onClick={closeModal}
                link
              />
            )
          }
          {
            isMobile() ?
              <Drawer
                visible={isMarksShown && media.match('.mp4')}
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
              : isMarksShown && media.match('.mp4') &&
              <Modal closeModal={hideMarks}>
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
  withPlayButton: false,
  fullWidth: false,
  playByClick: true
};

PostMedia.propTypes = {
  media: PropTypes.string.isRequired,
  showBar: PropTypes.bool.isRequired,
  playByClick: PropTypes.bool,
  withPlayButton: PropTypes.bool,
  fullWidth: PropTypes.bool,
  marks: PropTypes.array,
};

const mapStateToProps = (state, props) => ({
  showBar: (state.saved.postToBeSaved ? state.saved.postToBeSaved.id : undefined) === props.postId
});

export default connect(mapStateToProps)(PostMedia);
