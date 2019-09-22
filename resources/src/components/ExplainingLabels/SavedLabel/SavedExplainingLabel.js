import React from "react";
import PropTypes from 'prop-types';

import ExplainingLabel from "../ExplainingLabel";

import styles from '../../User/NavigationPanel/Saved/saved.module.css';

const SavedExplainingLabel = ({text}) => (
  <ExplainingLabel icon={<div className={styles.bookmark}/>} text='Save'>
    <span>{text}</span>
  </ExplainingLabel>
);

SavedExplainingLabel.defaultProps = {
  text: 'Save photos and videos you want to watch again.' +
    'No one gets notified of this, and the saved items are visible only to you.'
};

SavedExplainingLabel.propTypes = {
  text: PropTypes.string.isRequired
};

export default SavedExplainingLabel;
