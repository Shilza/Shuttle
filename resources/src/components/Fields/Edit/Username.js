import MaterialInput from "../MaterialInput/MaterialInput";
import React from "react";
import FormItem from "antd/es/form/FormItem";

export const Username = ({getFieldDecorator, fieldName = 'username', initialValue = ''}) => {
    const regExpr = /^[a-z0-9]+$/;

    return (
        <FormItem>
            {getFieldDecorator(fieldName, {
                rules: [
                    {required: true, message: 'Please input your username!'},
                    {max: 12, message: 'Username must be less than 12 characters!'},
                    {min: 1, message: 'Username must be at least 2 characters!'},
                    {pattern: regExpr, message: 'Invalid username'}
                ],
                initialValue,
            })(
                <MaterialInput defaultValue={initialValue} label={'Username'}/>
            )}
        </FormItem>
    );
};