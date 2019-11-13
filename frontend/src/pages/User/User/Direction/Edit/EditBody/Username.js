import React from "react";
import {checkIsUsernameUnique} from "services/user";
import {Username as UsernameField} from "components/Fields/Edit/Username";


const Username = React.memo(({initialValue, form}) => {

  const isUnique = (rule, username, callback) => {
    if (username.length > 2 && username.length <= 12 && /^[a-z0-9]+$/.test(username)) {
      checkIsUsernameUnique(username)
        .then(({data: {unique, message}}) => {
          if (unique) {
            callback();
          } else
            callback(message);
        })
        .catch((err) => {
          callback(err);
        })
    } else
      callback();
  };

  return (
    <UsernameField
      getFieldDecorator={form.getFieldDecorator}
      validator={isUnique}
      initialValue={initialValue}
    />
  );
});

export default Username;
