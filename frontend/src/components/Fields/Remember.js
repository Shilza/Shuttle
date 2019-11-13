import React from "react";
import PropTypes from 'prop-types';
import {Checkbox} from 'antd';

const Remember = ({getFieldDecorator, remember, onChange}) => (
    <>
        {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: remember,
        })(
            <Checkbox onChange={onChange} style={{color: 'var(--text)'}}>Remember me</Checkbox>
        )}
    </>
);

Remember.propTypes = {
    getFieldDecorator: PropTypes.func.isRequired,
    remember: PropTypes.bool,
    onChange: PropTypes.func
};

export default Remember;
