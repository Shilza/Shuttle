import React from "react";
import PropTypes from 'prop-types';
import {Checkbox} from 'antd';

const Remember = ({getFieldDecorator, remember, onChange}) => (
    <>
        {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: remember,
        })(
            <Checkbox onChange={onChange}>Remember me</Checkbox>
        )}
    </>
);

Remember.propTypes = {
    getFieldDecorator: PropTypes.func.isRequired,
    remember: PropTypes.string,
    onChange: PropTypes.func
};

export default Remember;