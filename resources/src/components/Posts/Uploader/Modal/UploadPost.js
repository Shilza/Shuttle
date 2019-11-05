import React, {useState} from "react";
import PropTypes from 'prop-types';
import {connect} from "react-redux";

import UploadMediaPlayer from "components/PostMedia/UploadMediaPlayer";

import {convertImageToBlob} from "utils/convertImageToBlob";

import Container from "../../Container";
import Header from "../../Header";
import Filters from "./Filters";
import Finish from "./Finish";

const FILTERS = 'FILTERS';
const FINISH = 'FINISH';
const CROP = 'CROP';

const UploadPost = ({upload, media}) => {

  let [croppedMedia, setCroppedMedia] = useState();
  let [location, setLocation] = useState(CROP);

  const uploadPost = async (data) => {
    const type = media.type.match('image') ? 'image/jpeg' : 'video/mp4';
    let resultMedia = media.type.match('image') ? await convertImageToBlob(data.image) : media;
    let postData = new FormData();
    postData.append('media', new File([resultMedia], "media", {type}));
    postData.append('caption', data.caption);
    postData.append('location', data.location);
    postData.append('marks', JSON.stringify(data.marks));
    upload(postData);
  };

  const gotoFilters = () => {
    setLocation(FILTERS);
  };

  const goToCrop = () => {
    setLocation(CROP);
  };

  const goFinish = () => {
    setLocation(FINISH);
  };

  if (media) {
    switch (location) {
      case CROP:
        return (
          <Container style={{height: 'fit-content'}}>
            {
              media.type.match('.mp4')
              ? <Header title={'New post'} goNext={goFinish} nextButtonText={'Post'}/>
              : <Header title={'New post'} goNext={gotoFilters} nextButtonText={'Next'}/>
            }
            <UploadMediaPlayer media={media} setCroppedMedia={setCroppedMedia}/>
          </Container>
        );
      case FILTERS:
        return <Filters media={croppedMedia} upload={uploadPost} goBack={goToCrop}/>;
      case FINISH:
        return <Finish upload={uploadPost} goBack={goToCrop} media={media} video/>;
      default:
        break;
    }
  }
};

UploadPost.propTypes = {
  upload: PropTypes.func.isRequired,
  media: PropTypes.object,
  currentAuthUsername: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  currentAuthUsername: state.auth.user.username
});

export default connect(mapStateToProps)(UploadPost);
