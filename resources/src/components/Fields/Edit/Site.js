import MaterialInput from "../MaterialInput/MaterialInput";
import React from "react";
import FormItem from "antd/es/form/FormItem";

export const Site = ({getFieldDecorator, fieldName = 'bio', initialValue = ''}) => (
    <FormItem>
        {getFieldDecorator(fieldName, {
            rules: [
                {max: 50, message: 'Site address must be less than 50 characters!'},
            ],
            initialValue
        })(
            <MaterialInput label={'Site'}/>
        )}
    </FormItem>
);
