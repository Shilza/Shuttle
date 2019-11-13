import React from "react";
import PropTypes from 'prop-types';
import { Input, Icon} from 'antd';
import FormItem from "antd/es/form/FormItem";

const Password = ({getFieldDecorator, fieldName='password', validator}) => {
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

Password.propTypes = {
    getFieldDecorator: PropTypes.func.isRequired,
    fieldName: PropTypes.string,
    validator: PropTypes.func
};

export default Password;