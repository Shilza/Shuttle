import {Form} from "antd";
import React from "react";
import {Bio as BioField} from "../../../../Fields/Edit/Bio";
import {setEditedBio} from "../../../../../store/actions/edit";
import {connect} from "react-redux";

class Bio extends React.Component {

    checkValidation = () => {
        console.log('changed bio');
        this.props.form.validateFields((err, {bio}) => {
            if (!err) {
                const {dispatch} = this.props;
                dispatch(setEditedBio(bio));
            }
        });
    };

    render() {
        const {bio, form} = this.props;

        return (
            <>
                <Form onChange={this.checkValidation}>
                    <BioField
                        getFieldDecorator={form.getFieldDecorator}
                        initialValue={bio}
                    />
                </Form>
            </>
        );
    }
}

export default connect()(Form.create()(Bio));