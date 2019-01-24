import React from "react";
import { Input, Icon} from 'antd';
import FormItem from "antd/es/form/FormItem";

const Password = ({getFieldDecorator, fieldName, validator}) => {
    return (
        <FormItem>
            {getFieldDecorator(fieldName, {
                rules: [
                    {required: true, message: 'Please input your password!'},
                    {max: 32, message: 'Password must be less than 32 characters!'},
                    {min: 6, message: 'Password must be at least 6 characters!'},
                    {validator}
                ]
            })(
                <Input prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>} type="password"
                       placeholder="Password"/>
            )}
        </FormItem>
    );
};

Password.defaultProps = {
    fieldName: 'password'
};

export default Password;