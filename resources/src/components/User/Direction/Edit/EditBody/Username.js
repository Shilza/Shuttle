import React from "react";
import MaterialInput from "./MaterialInput";

const Username = ({username}) => {
    return (
        <MaterialInput defaultValue={username} label={'Username'}/>
    );
};

export default Username;