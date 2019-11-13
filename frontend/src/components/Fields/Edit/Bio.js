import React from "react";
import PropTypes from 'prop-types';
import MaterialInput from "../MaterialInput/MaterialInput";
import FormItem from "antd/es/form/FormItem";

import styles from './edit.module.css';

export const Bio = ({getFieldDecorator, fieldName = 'bio', initialValue = ''}) => (
    <FormItem className={styles.formItem}>
        {getFieldDecorator(fieldName, {
            rules: [
                {max: 100, message: 'Bio must be less than 100 characters!'},
            ],
            initialValue
        })(
            <MaterialInput label={'Bio'}/>
        )}
    </FormItem>
);

Bio.propTypes = {
    getFieldDecorator: PropTypes.func.isRequired,
    fieldName: PropTypes.string,
    initialValue: PropTypes.string
};
