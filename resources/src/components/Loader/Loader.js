import {Icon} from "antd";
import React from "react";

const Loader = () => (
    <Icon type="loading"/>
);

function WithLoading(Component) {
    return function WihLoadingComponent({ isLoading, ...props }) {
        if (!isLoading) return (<Component {...props} />);
        return <Loader/>
    }
}

export default WithLoading;