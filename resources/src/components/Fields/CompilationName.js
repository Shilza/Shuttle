import React from "react";
import FormItem from "antd/es/form/FormItem";

export const CompilationName = ({getFieldDecorator, fieldName = 'compilationName', initialValue = ''}) => {
    const regExpr = /^[a-z0-9]+$/;

    return (
        <FormItem>
            {getFieldDecorator(fieldName, {
                rules: [
                    {required: true, message: 'Name is required!'},
                    {max: 12, message: 'Name must be less than 12 characters!'},
                    {pattern: regExpr, message: 'Invalid name'}
                ],
                initialValue
            })(
                <input placeholder='name'/>
            )}
        </FormItem>
    );
};