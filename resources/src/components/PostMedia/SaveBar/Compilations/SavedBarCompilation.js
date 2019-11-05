import React, {useState} from "react";
import PropTypes from 'prop-types';
import {Icon, Spin} from "antd";
import {connect} from "react-redux";
import Compilation from "pages/User/User/NavigationPanel/Saved/Compilation";
import styles from './savedBarCompilations.module.css';


const SavedBarCompilation = ({compilation, dispatch, postId}) => {

  let [loading, setLoading] = useState(false);

  const setCompilationToSave = (event, compilationName) => {
    event.stopPropagation();
    setLoading(true);
    dispatch.posts.saveAsync({post_id: postId, compilation: compilationName})
      .then(() => setLoading(false));
  };

  const onClickCompilation = (event) => {
    setCompilationToSave(event, Object.keys(compilation)[0]);
  };

  const icon = <Icon type="loading" style={{fontSize: 24}} spin/>;
  return (
    <Spin spinning={loading} indicator={icon}>
      <div className={styles.compilation} onClick={onClickCompilation}>
        <Compilation compilation={compilation}/>
      </div>
    </Spin>
  );
};

SavedBarCompilation.propTypes = {
  compilation: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  postId: PropTypes.number
};

const mapStateToProps = state => ({
  postId: state.saved.postToBeSaved && state.saved.postToBeSaved.id
});

export default connect(mapStateToProps)(SavedBarCompilation);
