import React from "react";
import {Site as SiteField} from "components/Fields/Edit/Site";

const Site = React.memo(({initialValue, form}) => (
  <SiteField
    getFieldDecorator={form.getFieldDecorator}
    initialValue={initialValue}
  />
));

export default Site;
