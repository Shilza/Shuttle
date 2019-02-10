import React from "react";
import {Form, Icon} from "antd";
import {checkIsUsernameUnique} from "../../../../../services/user";
import {Username as UsernameField} from "../../../../Fields/Edit/Username";
import {connect} from "react-redux";
import {setEditedName} from "../../../../../store/actions/edit";

class Username extends React.Component {

    isUnique = () => {
        this.props.form.validateFields((err, {username}) => {
            if (!err) {
                checkIsUsernameUnique(username)
                    .then(({unique, message}) => {
                        this.sett(unique, message, username)
                    })
                    .catch(({unique, message}) => {
                        this.sett(unique, message, username)
                    })
            }
        });
    };

    sett = (unique, message, username) => {
        if (!unique)
            this.props.form.setFields({
                username: {
                    errors: [new Error(message)],
                },
            });
        else {
            const {dispatch} = this.props;
            dispatch(setEditedName(username));
        }
    };

    render() {
        const {username, form} = this.props;

        return (
            <>
                <Form onChange={this.isUnique}>
                    <UsernameField
                        getFieldDecorator={form.getFieldDecorator}
                        initialValue={username}
                    />
                </Form>
            </>
        );
    }
}

export default connect()(Form.create()(Username));