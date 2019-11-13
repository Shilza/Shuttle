import React, {useCallback, useState} from "react";
import PropTypes from 'prop-types';
import {message} from 'antd';
import TextareaAutosize from 'react-autosize-textarea';

import {Button} from 'ui';
import Header from "components/Posts/Header";
import Container from "components/Posts/Container";
import Marks from "components/Posts/Marks";
import Location from "components/Posts/Location";

import styles from './finish.module.css';

const Finish = ({upload, media, goBack, video = false}) => {
  const [isMarks, setIsMarks] = useState(false);
  const [marks, setMarks] = useState([]);
  const [caption, setCaption] = useState('');
  const [location, setLocation] = useState('');

  const onChangeCaption = useCallback((event) => {
    const value = event.target.value;
    if (value.length <= 1000)
      setCaption(value);
    if (value.length === 1000)
      message.warning('Caption must must not exceed 1000 characters');
  }, []);


  const uploadWithOtherData = () => {
    upload({caption, marks, location});
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
        isMarks
          ? <Marks
            goBack={goToFinish}
            media={video ? URL.createObjectURL(media) : media}
            marks={marks}
            video={video}
          />
          :
          <Container>
            <Header goNext={uploadWithOtherData} goBack={goBack} title={'New post'} nextButtonText={'Post'}/>
            <div className={styles.container}>
              <div className={styles.imageContainer}>
                <Media media={media} video={video}/>
                <TextareaAutosize
                  maxRows={8}
                  className={styles.caption}
                  onChange={onChangeCaption}
                  value={caption}
                  placeholder={'Caption'}
                  maxLength={1000}
                />
              </div>
              <Location onChange={setLocation}/>
              <Button className={styles.button} onClick={goToMarks}>Mark friends</Button>
            </div>
          </Container>
      }
    </>
  )
};

const Media = React.memo(({media, video}) => (
  <>
    {
      video
        ? <video src={URL.createObjectURL(media)} className={styles.media}/>
        : <img className={styles.media} src={media} alt='Mini filtered'/>
    }
  </>
));

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
