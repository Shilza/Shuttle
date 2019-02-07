import FriendshipActions from "./FriendshipActions";
import {connect} from "react-redux";
import React from "react";
import Settings from "./Settings/Settings";
import Edit from "./Edit/Edit";

const DirectionActions = ({me}) => {
    return (
        <>
            {
                me ?
                    <>
                        <Edit/>
                        <Settings/>
                    </>
                    :
                    <FriendshipActions/>
            }
        </>
    )
};

export default connect(state => ({
    me: state.auth.user.id === state.users.user.id
}))(DirectionActions);