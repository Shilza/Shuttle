import React from "react";
import ExplainingLabel from "../ExplainingLabel";
import {Icon} from "antd"

const MessagesExplainingLabel = () =>
  <ExplainingLabel icon={<Icon type='message' style={{fontSize: '24px'}}/>} text='No messages yet'>
    <span>
      Write a message to one of your friends, it's easy!
    </span>
  </ExplainingLabel>

export default MessagesExplainingLabel;
