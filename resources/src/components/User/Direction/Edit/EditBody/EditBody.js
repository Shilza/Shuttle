import React from "react";
import Username from "./Username";
import {connect} from "react-redux";
import Bio from "./Bio";
import Site from "./Site";

const EditBody = ({user}) => {
    return (
        <>
            <Username username={user.username}/>
            <Bio bio={user.bio}/>
            <Site bio={user.site}/>
            <p>Some content</p>
        </>
    );
};

export default connect(state => ({user: state.auth.user}))(EditBody);