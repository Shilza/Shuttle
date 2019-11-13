import React from "react";
import PropTypes from 'prop-types';
import { Icon, Input } from "antd";
import FormItem from "antd/es/form/FormItem";

const Confirm = ({getFieldDecorator, validator, onBlur}) => {
    return (
        <FormItem>
            {getFieldDecorator('confirm', {
                rules: [{
                    required: true, message: 'Please confirm your password!'
                },
                    {validator}
                ]
            })(
                <Input prefix={<Icon type="eye" style={{color: 'rgba(0,0,0,.25)'}}/>}
                       type="password" placeholder="Confirm password" onBlur={onBlur}/>
            )}
        </FormItem>
    );
};

Confirm.propTypes = {
    getFieldDecorator: PropTypes.func.isRequired,
    onBlur: PropTypes.func,
    validator: PropTypes.func
};

export default Confirm;