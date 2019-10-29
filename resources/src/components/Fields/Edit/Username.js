import React from "react";
import PropTypes from 'prop-types';
import MaterialInput from "../MaterialInput/MaterialInput";
import FormItem from "antd/es/form/FormItem";

export const Username = ({getFieldDecorator, validator, fieldName = 'username', initialValue = ''}) => {
  const regExpr = /^[a-z0-9]+$/;

  return (
    <FormItem>
      {getFieldDecorator(fieldName, {
        rules: [
          {required: true, message: 'Please input your username!'},
          {max: 12, message: 'Username must be less than 12 characters!'},
          {min: 2, message: 'Username must be at least 2 characters!'},
          {pattern: regExpr, message: 'Invalid username'},
          {validator}
        ],
        initialValue,
      })(
        <MaterialInput label={'Username'}/>
      )}
    </FormItem>
  );
};

Username.propTypes = {
  getFieldDecorator: PropTypes.func.isRequired,
  fieldName: PropTypes.string,
  initialValue: PropTypes.string
};
