import MaterialInput from "../MaterialInput/MaterialInput";
import React from "react";
import FormItem from "antd/es/form/FormItem";

export const Bio = ({getFieldDecorator, fieldName = 'bio', initialValue = ''}) => (
    <FormItem>
        {getFieldDecorator(fieldName, {
            rules: [
                {max: 100, message: 'Bio must be less than 100 characters!'},
            ],
            initialValue
        })(
            <MaterialInput defaultValue={initialValue} label={'Bio'}/>
        )}
    </FormItem>
);
