import ExplainingLabel from "../ExplainingLabel";
import {Icon} from "antd";
import React from "react";

const iconStyle = {fontSize: 21};

const StartMessagingLabel = () =>
    <ExplainingLabel icon={<Icon type={'message'} style={iconStyle}/>} text='Start messaging!'>
       <span>
           Send the first message to start a conversation
        </span>
    </ExplainingLabel>;

export default StartMessagingLabel;
