import React from "react";
import PropTypes from 'prop-types';
import {message} from "antd/lib/index";
import {addToArchive, deleteFromArchive} from "../../../../services/post";
import {connect} from "react-redux";

const Archive = ({dispatch, post_id, isArchived}) => {

    const archive = () => {
        dispatch(addToArchive({post_id}))
            .then(data => {
                message.success(data);
            })
            .catch(data => {
                message.error(data);
            });
    };

    const unArchive = () => {
        dispatch(deleteFromArchive(post_id))
            .then(data => {
                message.success(data);
            })
            .catch(data => {
                message.error(data);
            });
    };

    return (
        <>
            {
                isArchived ? <li onClick={unArchive}>Unarchive</li>
                    : <li onClick={archive}>Archive</li>
            }
        </>
    )
};

Archive.propTypes = {
    dispatch: PropTypes.func.isRequired,
    post_id: PropTypes.number.isRequired,
    isArchived: PropTypes.number.isRequired
};

export default connect()(Archive);