import ExplainingLabel from "../ExplainingLabel";
import {Icon} from "antd";
import React from "react";

const BlacklistedExplainingLabel = () => (
    <ExplainingLabel icon={<Icon type={'stop'} style={{fontSize: 21}}/>} text='Blacklisted'>
       <span>
           You are blacklisted by this user
        </span>
    </ExplainingLabel>
);

export default BlacklistedExplainingLabel;