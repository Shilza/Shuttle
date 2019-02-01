import MaterialInput from "./MaterialInput";
import React from "react";

const Bio = ({bio}) => {
    return (
        <MaterialInput defaultValue={bio} label={'Bio'}/>
    );
};

export default Bio;