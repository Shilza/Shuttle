import React from "react";
import PropTypes from 'prop-types';
import {Button} from "antd";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";

import * as FriendshipsService from "services/friendships";

const FriendshipButton = ({id, friendshipState, follow, unfollow}) => {

    const friendships = () => (friendshipState !== 0) ?
        unfollow({id}) :
        follow({id});

    let buttonText;
    switch (friendshipState) {
        case 0: buttonText = 'Follow'; break;
        case 1: buttonText = 'Subscription request sent'; break;
        case 2: buttonText = 'Unfollow'; break;
        default: buttonText = 'Undefined';
    }

    return (
        <Button size={'small'} onClick={friendships}>
            {buttonText}
        </Button>
    );
};

FriendshipButton.propTypes = {
    id: PropTypes.number.isRequired,
    friendshipState: PropTypes.number.isRequired,
    follow: PropTypes.func.isRequired,
    unfollow: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    id: state.users.user.id,
    friendshipState: state.users.user.friendshipState
});

const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        follow: FriendshipsService.follow,
        unfollow: FriendshipsService.unfollow
    }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(FriendshipButton);
