import React, {useRef, useState} from "react";
import PropTypes from 'prop-types';
import TextareaAutosize from 'react-autosize-textarea';

import Header from "components/Posts/Header";
import Container from "components/Posts/Container";
import Marks from "components/Posts/Marks";

import styles from './finish.module.css';

const Finish = ({upload, media, goBack, video = false}) => {
  let inputRef = useRef(null);
  const [isMarks, setIsMarks] = useState(false);
  const [marks, setMarks] = useState([]);

  const uploadWithCaption = () => {
    upload({caption: inputRef.current.value, marks});
  };

  const goToMarks = () => {
    setIsMarks(true);
  };

  const goToFinish = (marks) => {
    setMarks(marks);
    setIsMarks(false);
  };

  return (
    <>
      {
        isMarks ? <Marks goBack={goToFinish} media={media} marks={marks} video={video}/>
          :
          <Container>
            <Header goNext={uploadWithCaption} goBack={goBack} title={'New post'} nextButtonText={'Post'}/>
            <div className={styles.container}>
              <div className={styles.imageContainer}>
                <Media media={media} video={video}/>
                <TextareaAutosize
                  maxRows={8}
                  className={styles.caption}
                  ref={inputRef}
                  placeholder={'Caption'}
                  maxLength={1000}
                />
              </div>
              <button className={styles.button} onClick={goToMarks}>Mark friends</button>
              <button className={styles.button}>Add place</button>
            </div>
          </Container>
      }
    </>
  )
};

const Media = ({media, video}) => {
  return <>
    {
      video
        ? <video src={URL.createObjectURL(media)} className={styles.media}/>
        : <img className={styles.media} src={media} alt='Mini filtered'/>
    }
  </>
};

Finish.propTypes = {
  upload: PropTypes.func.isRequired,
  media: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]),
  goBack: PropTypes.func.isRequired,
  video: PropTypes.bool
};

export default Finish;
