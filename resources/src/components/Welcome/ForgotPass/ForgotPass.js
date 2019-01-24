import React from "react";
import Welcome from "../../../pages/Welcome/Welcome";
import * as AuthService from "../../../services/auth";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {message} from "antd/lib/index";
import Email from "../../Fields/Email";
import {Form, Icon, Spin, Button} from "antd";
import {Link} from "react-router-dom";
import styles from './forgotPass.module.css';

const FormItem = Form.Item;

class ForgotPass extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        const {form, resetPassword} = this.props;
        form.validateFields((err, {email}) => {
            if (!err) {
                this.setState({loading: true});
                resetPassword({email})
                    .then(data => {
                        this.setState({loading: false});
                        message.success(data);
                    })
                    .catch(data => {
                        this.setState({loading: false});
                        message.error(data);
                    });
            }
        });
    }

    render() {
        const {getFieldDecorator} = this.props.form;
        const {loading} = this.state;
        const antIcon = <Icon type="loading" style={{fontSize: 24}} spin/>;

        return (
            <Spin spinning={loading} indicator={antIcon} delay={150}>
                <h1 style={{textAlign: 'center'}}>Reset password</h1>
                <Form onSubmit={this.handleSubmit}>
                    <Email getFieldDecorator={getFieldDecorator}/>
                    <FormItem>
                        <Button
                            type="primary"
                            htmlType="submit"
                            className={styles.submit}
                        >
                            Reset
                        </Button>
                        <div className={styles.loginRegisterContainer}>
                            <Link to={'/'}>Log in</Link>
                            <Link to={'/register'}>Register</Link>
                        </div>
                    </FormItem>
                </Form>
            </Spin>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        resetPassword: AuthService.resetPassword
    }, dispatch);
};

const Page = () => {
    const WrappedForgotPass = Form.create()(connect(null, mapDispatchToProps)(ForgotPass));
    return <Welcome><WrappedForgotPass/></Welcome>
};

export default Page;