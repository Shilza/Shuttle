import * as FriendshipsService from "../../../services/friendships";
import {Button} from "antd";
import React from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";

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