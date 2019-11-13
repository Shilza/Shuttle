import React from "react";
import Welcome from "pages/Welcome/Welcome";
import {connect} from "react-redux";
import {message} from "antd/lib/index";
import {Link, withRouter} from 'react-router-dom'
import {Button, Form, Icon, Spin} from "antd";
import FormItem from "antd/es/form/FormItem";
import Confirm from "../../Fields/Confirm";
import Password from "../../Fields/Password";
import Email from "../../Fields/Email";
import {AuthService} from 'services';
import styles from './resetPass.module.css';

class ResetPass extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleConfirmBlur = this.handleConfirmBlur.bind(this);
    this.compareToFirstPassword = this.compareToFirstPassword.bind(this);
    this.validateToNextPassword = this.validateToNextPassword.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const {form, match, history} = this.props;
    form.validateFields((err, {password, confirm}) => {
      if (!err) {
        this.setState({loading: true});
        AuthService.updatePassword({
          email: match.params.email.replace("29gnmLTv686QsnV", "@"),
          token: match.params.token,
          password_confirmation: confirm,
          password,
        })
          .then(({data}) => {
            message.success(data.message);
            history.push('/');
          })
          .catch(err => {
            message.error(err.response.data.message);
          })
          .finally(() => {
            this.setState({loading: false});
          });
      }
    });
  }

  handleConfirmBlur(e) {
    const value = e.target.value;
    this.setState({confirmDirty: this.state.confirmDirty || !!value});
  }

  compareToFirstPassword(rule, value, callback) {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  }

  validateToNextPassword(rule, value, callback) {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], {force: true});
    }
    callback();
  }

  render() {
    const {getFieldDecorator} = this.props.form;
    const antIcon = <Icon type="loading" style={{fontSize: 24}} spin/>;

    return (
      <Spin spinning={this.state.loading} indicator={antIcon} delay={150}>
        <h1 className={styles.title}>Reset password</h1>
        <Form onSubmit={this.handleSubmit}>
          <Email
            getFieldDecorator={getFieldDecorator}
            initialValue={this.props.match.params.email.replace("29gnmLTv686QsnV", "@")}
          />
          <Password
            getFieldDecorator={getFieldDecorator}
            validator={this.validateToNextPassword}
          />
          <Confirm
            getFieldDecorator={getFieldDecorator}
            validator={this.compareToFirstPassword}
            onBlur={this.handleConfirmBlur}
          />
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

const Page = props => {
  const WrappedResetPass = Form.create()(connect()(withRouter(ResetPass)));
  return <Welcome><WrappedResetPass {...props}/></Welcome>
};

export default Page;
