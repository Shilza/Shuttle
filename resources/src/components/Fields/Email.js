import React from "react";
import { Input, Icon } from 'antd';
import FormItem from "antd/es/form/FormItem";

const Email = ({getFieldDecorator, initialValue}) => {
    return (
        <FormItem>
            {getFieldDecorator('email', {
                rules: [
                    {type: 'email', message: 'The input is not valid Email!'},
                    {required: true, message: 'Please input your Email!'}
                ],
                initialValue
            })(
                <Input prefix={<Icon type="mail" style={{color: 'rgba(0,0,0,.25)'}}/>} placeholder="Email"/>
            )}
        </FormItem>
    );
};

Email.defaultProps = {
    initialValue: null
};

export default Email;