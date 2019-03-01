import React from "react";
import PropTypes from 'prop-types';
import MaterialInput from "../MaterialInput/MaterialInput";
import FormItem from "antd/es/form/FormItem";

export const Site = ({getFieldDecorator, fieldName = 'site', initialValue = ''}) => (
    <FormItem>
        {getFieldDecorator(fieldName, {
            rules: [
                {max: 50, message: 'Site address must be less than 50 characters!'},
            ],
            initialValue
        })(
            <MaterialInput defaultValue={initialValue} label={'Site'}/>
        )}
    </FormItem>
);

Site.propTypes = {
    getFieldDecorator: PropTypes.func.isRequired,
    fieldName: PropTypes.string,
    initialValue: PropTypes.string
};