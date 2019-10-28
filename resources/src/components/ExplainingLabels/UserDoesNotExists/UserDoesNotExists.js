import ExplainingLabel from "../ExplainingLabel";
import React from "react";
import user from './user.svg';
import SvgIcon from "components/SvgIcon";

const UserDoesNotExists = ({text}) => (
  <ExplainingLabel icon={<SvgIcon title="User" icon={user} height={40} width={30}/>} text={text}/>
);

export default UserDoesNotExists;
