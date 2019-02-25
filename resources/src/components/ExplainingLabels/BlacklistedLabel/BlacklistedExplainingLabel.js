import ExplainingLabel from "../ExplainingLabel";
import {Icon} from "antd";
import React from "react";

const iconStyle = {fontSize: 21};

const BlacklistedExplainingLabel = () =>
    <ExplainingLabel icon={<Icon type={'stop'} style={iconStyle}/>} text='Blacklisted'>
       <span>
           You are blacklisted by this user
        </span>
    </ExplainingLabel>;

export default BlacklistedExplainingLabel;