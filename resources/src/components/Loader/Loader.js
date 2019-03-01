import React from "react";
import PropTypes from 'prop-types';
import {Icon} from "antd";

const Loader = () => <Icon type="loading"/>;

function WithLoading(Component) {
    return function WihLoadingComponent({ isLoading, ...props }) {
        if (!isLoading) return (<Component {...props} />);
        return <Loader/>
    }
}

WithLoading.propTypes = {
    Component: PropTypes.element.isRequired
};

export default WithLoading;