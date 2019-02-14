import React from "react";
import {Icon} from "antd";
import ExplainingLabel from "../ExplainingLabel";

const PrivacyExplainingLabel = () => (
    <ExplainingLabel icon={<Icon type='lock' style={{fontSize: 21}}/>} text='Private'>
         <span>
            Only followers can see content
        </span>
    </ExplainingLabel>
);

export default PrivacyExplainingLabel;