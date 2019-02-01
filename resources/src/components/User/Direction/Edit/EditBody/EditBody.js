import React from "react";
import Username from "./Username";
import {connect} from "react-redux";
import Bio from "./Bio";

const EditBody = ({user}) => {
    return (
        <>
            <Username username={user.username}/>
            <Bio bio={user.bio}/>
            <p>Some content</p>
        </>
    );
};

export default connect(state => ({user: state.auth.user}))(EditBody);