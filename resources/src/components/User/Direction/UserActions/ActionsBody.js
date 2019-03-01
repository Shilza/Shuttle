import React from "react";
import PropTypes from 'prop-types';
import ListModal from "../../../Modal/ListModal";
import {message} from "antd/lib/index";
import * as UsersService from "../../../../services/user";
import {connect} from "react-redux";

const ActionsBody = ({closeModal, dispatch, userId, username, blacklisted}) => {

    const addToBlackList = () => {
        dispatch(UsersService.addToBlacklist({id: userId}))
            .then(data => message.success(data));
    };

    const removeFromBlacklist = () => {
        dispatch(UsersService.removeFromBlacklist(userId))
            .then(data => message.success(data));
    };

    const copyUserLinkToClipboard = () => {
        let el = document.createElement('textarea');
        el.value = `${window.location.origin}/${username}`;
        el.setAttribute('readonly', '');
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
        message.success('Link copied to clipboard');

        closeModal();
    };

    return (
        <ListModal>
            <li>Complain</li>
            {
                blacklisted
                    ? <li onClick={removeFromBlacklist}>Remove from blacklist</li>
                    : <li onClick={addToBlackList}>Add to blacklist</li>
            }
            <li onClick={copyUserLinkToClipboard}>Copy link</li>
            <li onClick={closeModal}>Cancel</li>
        </ListModal>
    );
};

ActionsBody.propTypes = {
    closeModal: PropTypes.func.isRequired,
    dispatch: PropTypes.func.isRequired,
    userId: PropTypes.number.isRequired,
    username: PropTypes.string.isRequired,
    blacklisted: PropTypes.bool
};

const mapStateToProps = state => ({
    userId: state.users.user.id,
    username: state.users.user.username,
    blacklisted: state.users.user.blacklisted
});

export default connect(mapStateToProps)(ActionsBody);