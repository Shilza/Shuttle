import {message} from "antd/lib/index";
import {addToArchive, deleteFromArchive} from "../../../../services/post";
import {connect} from "react-redux";
import React from "react";

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

export default connect()(Archive);