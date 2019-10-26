import React from "react";
import {connect} from "react-redux";
import {message} from "antd/lib/index";
import {Link} from "react-router-dom";
import {Button, Form, Icon, Spin} from "antd";
import Welcome from "pages/Welcome/Welcome";
import Email from "../../Fields/Email";
import * as AuthService from 'services/auth';
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
    const {form} = this.props;
    form.validateFields((err, {email}) => {
      if (!err) {
        this.setState({loading: true});
        AuthService.resetPassword({email})
          .then(({data}) => {
            message.success(data.message);
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

  render() {
    const {getFieldDecorator} = this.props.form;
    const {loading} = this.state;
    const antIcon = <Icon type="loading" style={{fontSize: 24}} spin/>;

    return (
      <Spin spinning={loading} indicator={antIcon} delay={150}>
        <h1 className={styles.title}>Reset password</h1>
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

const Page = () => {
  const WrappedForgotPass = Form.create()(connect()(ForgotPass));
  return <Welcome><WrappedForgotPass/></Welcome>
};

export default Page;
