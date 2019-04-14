import React from "react";
import PropTypes from 'prop-types';
import {message} from "antd/lib/index";
import {addToArchive, deleteFromArchive} from "../../../../services/post";
import {connect} from "react-redux";

const Archive = ({dispatch, post_id, isArchived, closeModal}) => {

    const dispatchAction = action => {
        dispatch(action(post_id))
            .then(data => {
                message.success(data);
                closeModal();
            })
            .catch(data => {
                message.error(data);
                closeModal();
            });
    };

    const archive = () => {
        dispatchAction(addToArchive);
    };

    const unArchive = () => {
        dispatchAction(deleteFromArchive);
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
    isArchived: PropTypes.number
};

export default connect()(Archive);