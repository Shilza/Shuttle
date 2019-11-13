import React from "react";
import PropTypes from 'prop-types';
import {Input, Icon} from 'antd';
import FormItem from "antd/es/form/FormItem";

export const Username = ({getFieldDecorator, fieldName = 'username', initialValue = '', onChange}) => {
    const regExpr = /^[a-z0-9]+$/;

    return (
        <FormItem>
            {getFieldDecorator(fieldName, {
                rules: [
                    {required: true, message: 'Please input your username!'},
                    {max: 12, message: 'Username must be less than 12 characters!'},
                    {min: 2, message: 'Username must be at least 2 characters!'},
                    {pattern: regExpr, message: 'Invalid username'}
                ],
                initialValue
            })(
                <Input
                    onChange={onChange}
                    prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                    placeholder="Username"
                    autoComplete='off'
                />
            )}
        </FormItem>
    );
};

Username.propTypes = {
    getFieldDecorator: PropTypes.func.isRequired,
    fieldName: PropTypes.string,
    initialValue: PropTypes.string,
    onChange: PropTypes.func
};
