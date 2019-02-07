import React from "react";
import MaterialInput from "./MaterialInput";

class Site extends React.Component {

    render() {
        const {site} = this.props;

        return (
            <MaterialInput defaultValue={site} label={'Site'}/>
        );
    }
}

export default Site;