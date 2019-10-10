import React from "react";
import {Picker} from "emoji-mart";

import 'emoji-mart/css/emoji-mart.css';
import styles from "./emojiPicker.module.css";

const EmojiPicker = ({addEmoji}) => (
  <div className={styles.container}>
    <Picker
      set='apple'
      color='#1890ff'
      title='Pick emoji'
      emoji='point_up'
      onSelect={addEmoji}
    />
  </div>
);

export default EmojiPicker;
