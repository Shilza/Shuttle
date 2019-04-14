import ExplainingLabel from "../ExplainingLabel";
import React from "react";
import user from './user.svg';

const UserDoesNotExists = ({text}) =>
    <ExplainingLabel icon={<img alt="user" src={user} height={40}/>} text={text}/>

export default UserDoesNotExists;