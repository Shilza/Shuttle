import React from 'react';
import IconButton from "./IconButton";
import planeIcon from 'images/plane.svg';

export default {title: 'IconButton'};

export const simple = () =>
  <IconButton
    iconProps={{
      icon: planeIcon,
      width: 24,
      height: 24
    }}
    ariaLabel='Open messages'
    title='Messages'
  />;
