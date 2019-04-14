import React, {useState} from "react";
import PropTypes from 'prop-types';
import Compilation from "../../../User/NavigationPanel/Saved/Compilation";
import styles from './savedBarCompilations.module.css';
import {Icon, Spin} from "antd";
import {connect} from "react-redux";
import * as PostService from "../../../../services/post";

const SavedBarCompilation = ({compilation, dispatch, postId}) => {

    let [loading, setLoading] = useState(false);

    const setCompilationToSave = (event, compilationName) => {
        event.stopPropagation();
        setLoading(true);
        dispatch(PostService.save({post_id: postId, compilation: compilationName}));
    };

    const icon = <Icon type="loading" style={{fontSize: 24}} spin/>;
    return (
        <Spin spinning={loading} indicator={icon}>
            <div className={styles.compilation}
                 onClick={event => setCompilationToSave(event, Object.keys(compilation)[0])}>
                <Compilation compilation={compilation} loadPosts={() => {}}/>
            </div>
        </Spin>
    );
};

SavedBarCompilation.propTypes = {
    compilation: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
    postId: PropTypes.number.isRequired
};

const mapStateToProps = state => ({
    postId: state.saved.postToBeSaved.id
});

export default connect(mapStateToProps)(SavedBarCompilation);