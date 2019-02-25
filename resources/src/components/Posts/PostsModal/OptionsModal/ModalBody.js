import React from "react";
import {connect} from "react-redux";
import Archive from "./Archive";
import ListModal from "../../../Modal/ListModal";
import RemovePostButton from "./RemovePostButton";
import CopyLinkButton from "./CopyLinkButton";

const ModalBody = ({post_id, me, isArchived, link, dispatch, closeModal}) =>
    <ListModal>
        <li>Complain</li>
        <li>Share</li>
        <CopyLinkButton link={link} closeModal={closeModal}/>
        {
            me &&
            <>
                <Archive isArchived={isArchived} post_id={post_id}/>
                <RemovePostButton post_id={post_id}/>
            </>
        }
        <li onClick={closeModal}>Cancel</li>
    </ListModal>;

const mapStateToProps = (state, props) => ({
    me: state.auth.user.id === props.owner_id
});

export default connect(mapStateToProps)(ModalBody);