import FriendshipActions from "./FriendshipActions";
import {connect} from "react-redux";
import React from "react";
import Settings from "./Settings/Settings";
import Edit from "./Edit/Edit";
import UserActions from "./UserActions/UserActions";

const DirectionActions = ({me}) => {
    return (
        <>
            {
                me ? <PrivateButtons/>
                    :
                    <>
                        <FriendshipActions/>
                        <UserActions/>
                    </>
            }
        </>
    )
};

const PrivateButtons = () => (
    <>
        <Edit/>
        <Settings/>
    </>
);

export default connect(state => ({
    me: state.auth.user.id === state.users.user.id
}))(DirectionActions);