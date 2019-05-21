import React from "react";
import PropTypes from 'prop-types';
import {Input} from "antd";
import FormItem from "antd/es/form/FormItem";

const {TextArea} = Input;

const Caption = ({getFieldDecorator, initialValue = ''}) => {
    return (
        <FormItem>
            {getFieldDecorator('caption', {
                rules: [
                    {max: 1000, message: 'Caption must be less than 1000 characters!'},
                ], initialValue
            })(
                <TextArea
                    autosize={{
                        minRows: 4, maxRows: 6
                    }}
                    placeholder="Caption"
                />
            )}
        </FormItem>
    );
};

Caption.propTypes = {
    getFieldDecorator: PropTypes.func.isRequired,
    initialValue: PropTypes.string
};

export default Caption;