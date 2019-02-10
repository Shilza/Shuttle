import React from "react";
import {Form} from "antd";
import {Site as SiteField} from "../../../../Fields/Edit/Site";
import {setEditedSite} from "../../../../../store/actions/edit";
import {connect} from "react-redux";

class Site extends React.Component {

    checkValidation = () => {
        this.props.form.validateFields((err, {site}) => {
            if (!err) {
                const {dispatch} = this.props;
                dispatch(setEditedSite(site));
            }
        });
    };

    render() {
        const {site, form} = this.props;

        return (
            <>
                <Form onChange={this.checkValidation}>
                    <SiteField
                        getFieldDecorator={form.getFieldDecorator}
                        initialValue={site}
                    />
                </Form>
            </>
        );
    }
}

export default connect()(Form.create()(Site));