import React from "react";
import {Bio as BioField} from "components/Fields/Edit/Bio";

const Bio = React.memo(({initialValue, form}) => (
  <BioField
    getFieldDecorator={form.getFieldDecorator}
    initialValue={initialValue}
  />
));

export default Bio;
