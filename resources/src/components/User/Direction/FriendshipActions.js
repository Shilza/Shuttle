import * as FriendshipsService from "../../../services/friendships";
import {Button} from "antd";
import React from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";

const FriendshipButton = ({id, isFollows, follow, unfollow}) => {

    const friendships = () => isFollows ?
        unfollow({id}) :
        follow({id});

    return (
        <Button size={'small'} onClick={friendships}>
            {isFollows ? 'Unollow' : 'Follow'}
        </Button>
    );
};

const mapStateToProps = state => ({
    id: state.users.user.id,
    isFollows: state.users.user.isFollows
});

const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        follow: FriendshipsService.follow,
        unfollow: FriendshipsService.unfollow
    }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(FriendshipButton);