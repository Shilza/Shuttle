import React from "react";
import {Checkbox} from 'antd';

const Remember = ({getFieldDecorator, remember, onChange}) => {
    return (
        <>
            {getFieldDecorator('remember', {
                valuePropName: 'checked',
                initialValue: remember,
            })(
                <Checkbox onChange={onChange}>Remember me</Checkbox>
            )}
        </>
    );
};

export default Remember;