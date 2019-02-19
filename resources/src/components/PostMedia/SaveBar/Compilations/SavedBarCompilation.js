import React, {useState} from "react";
import Compilation from "../../../User/NavigationPanel/Saved/Compilation";
import styles from './savedBarCompilations.module.css';
import {Icon, Spin} from "antd";
import {connect} from "react-redux";
import * as PostService from "../../../../services/post";

const SavedBarCompilation = ({compilation, dispatch, post}) => {

    let [loading, setLoading] = useState(false);

    const setCompilationToSave = (event, compilationName) => {
        event.stopPropagation();
        setLoading(true);
        dispatch(PostService.save({post_id: post.id, compilation: compilationName}))
            .then(() => setLoading(false));
    };

    const icon = <Icon type="loading" style={{fontSize: 24}} spin/>;
    return (
        <Spin spinning={loading} indicator={icon}>
            <div className={styles.compilation}
                 onClick={event => setCompilationToSave(event, Object.keys(compilation)[0])}>
                <Compilation compilation={compilation} loadPosts={() => {
                }}/>
            </div>
        </Spin>
    );
};

const mapStateToProps = state => ({
    post: state.saved.postToBeSaved
});

export default connect(mapStateToProps)(SavedBarCompilation);