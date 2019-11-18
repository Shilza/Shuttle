import React from 'react';
import planeIcon from 'images/plane.svg';
import SvgIcon from "./SvgIcon";

export default {title: 'SvgIcon'};

export const simple = () =>
  <SvgIcon
    icon={planeIcon}
    ariaLabel='Open messages'
    title='Messages'
  />;
