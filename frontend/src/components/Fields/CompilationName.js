import React from "react";
import PropTypes from 'prop-types';
import FormItem from "antd/es/form/FormItem";

export const CompilationName = ({getFieldDecorator, className, fieldName = 'compilationName', initialValue = ''}) => {
  const regExpr = /^[A-z0-9]+$/;

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
        <input className={className} placeholder='name' autoComplete='off'/>
      )}
    </FormItem>
  );
};

CompilationName.propTypes = {
  getFieldDecorator: PropTypes.func.isRequired,
  fieldName: PropTypes.string,
  initialValue: PropTypes.string,
  className: PropTypes.string
};
