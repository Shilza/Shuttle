import React from "react";
import PropTypes from 'prop-types';
import {Link} from "react-router-dom";
import Linkify from 'linkifyjs/react';


const nicknameToLink = text => {
  const regex = /^@[A-Za-z0-9]+$/;
  const createLink = (word, index) => regex.test(word) ? <Link key={index} to={`/${word.slice(1)}`}>{word}</Link> : word;
  const addSpaces = (acc, e) => [...acc, ' ', e];
  return text.split(' ').map(createLink).reduce(addSpaces, []).slice(1);
};

const CLinkify = ({children, ...props}) => <Linkify {...props}>{nicknameToLink(children)}</Linkify>;

CLinkify.propTypes = {
  children: PropTypes.string
};

export default CLinkify;

