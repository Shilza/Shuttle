import React from "react";
import {Icon} from "antd";
import ExplainingLabel from "../ExplainingLabel";

const iconStyle = {fontSize: 21};

const PrivacyExplainingLabel = () =>
    <ExplainingLabel icon={<Icon type='lock' style={iconStyle}/>} text='Private'>
         <span>
            Only followers can see content
        </span>
    </ExplainingLabel>;

export default PrivacyExplainingLabel;