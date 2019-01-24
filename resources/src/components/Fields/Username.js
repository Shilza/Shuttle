import React from "react";
import { Input, Icon } from 'antd';
import FormItem from "antd/es/form/FormItem";

const Username = ({getFieldDecorator, fieldName}) => {
    return (
        <FormItem>
            {getFieldDecorator(fieldName, {
                rules: [
                    {required: true, message: 'Please input your username!'},
                    {max: 16, message: 'Username must be less than 16 characters!'},
                    {min: 1, message: 'Username must be at least 2 characters!'}
                    ],
            })(
                <Input prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                       placeholder="Username"/>
            )}
        </FormItem>
    );
};

Username.defaultProps = {
    fieldName: 'username'
};

export default Username;