import {Form} from "antd";
import React from "react";
import {Bio as BioField} from "components/Fields/Edit/Bio";
import {connect} from "react-redux";

class Bio extends React.Component {

  checkValidation = () => {
    this.props.form.validateFields((err, {bio}) => {
      if (!err) {
        const {dispatch} = this.props;
        dispatch.edit.setBio(bio);
      }
    });
  };

  render() {
    const {bio, form} = this.props;

    return (
      <Form onChange={this.checkValidation}>
        <BioField
          getFieldDecorator={form.getFieldDecorator}
          initialValue={bio}
        />
      </Form>
    );
  }
}

export default connect()(Form.create()(Bio));
