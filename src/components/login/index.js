
import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import './index.css';
import { Link, Redirect } from "react-router-dom";
import connect from 'redux-connect-decorator'
import { Form, Icon, Input, Button, Checkbox, Modal } from 'antd';
import { login, resendCode, resetPassword } from '../../actions/userActions'
import AppEmailCodeForm from '../emailVerify';
import AppEmailForm from '../emailForm';
import AppLayout from '../../layout';

@connect((store) => {
  return {
    user: store.user.user,
    userFetched: store.user.fetched,
    resume: store.resume.resume,
    resetted: store.user.resetted,
  };
})
class NormalLoginForm extends React.Component {
  state = {
    visible: false,
    currentPage: 0,
    email: ''
  }
  constructor(props) {
    super(props);
    this.emailModalRef = React.createRef();
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.dispatch(login(values))
      }
    });
  };

  handleResetPassword = () => {
    this.setState({ visible: true })
  }

  updateGoLastPage = (userData) => {
    return new Promise((resolve, reject) => {
      this.setState({ visible: false })
      this.props.dispatch(resetPassword(userData, this.state.email))
      setTimeout(() => resolve(this.state.currentPage));
    })
  }
  updateGoFirstPage = (email) => {
    return new Promise((resolve, reject) => {
      this.setState({ currentPage: this.state.currentPage + 1, email: email })
      setTimeout(() => resolve(this.state.currentPage));
    })
  }

  displayModal = () => {
    if (this.state.currentPage === 0) {
      return (
        <AppEmailForm ref={this.emailModalRef} onButtonSubmit={this.updateGoFirstPage} ></AppEmailForm>
      )
    } else if (this.state.currentPage === 1) {
      return (
        <AppEmailCodeForm
          ref={this.emailModalRef}
          onButtonSubmit={this.updateGoLastPage}
          email={this.state.email}
          forgetPassword={true}>
        </AppEmailCodeForm>
      )
    } else {
      return <Redirect push to='/'></Redirect>
    }
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    if(this.props.user != null){
      return <Redirect push to='/home'></Redirect>
    }
    return (
      <AppLayout style={{overflow: "auto"}} className="layout">
        <Form onSubmit={this.handleSubmit} className="login-form">
          <Form.Item>
            {getFieldDecorator('identifier', {
              rules: [{ required: true, message: 'Please input your username!' }],
            })(
              <Input
                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="Username"
              />,
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: 'Please input your Password!' }],
            })(
              <Input
                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                type="password"
                placeholder="Password"
              />,
            )}
          </Form.Item>
          <Form.Item>
            {
              getFieldDecorator('remember', {
                valuePropName: 'checked',
                initialValue: true,
              })(<Checkbox>Remember me</Checkbox>)
            }
            <Link className="login-form-forgot" to='/' onClick={this.handleResetPassword}>
              Forgot password
            </Link>
            <Button type="primary" htmlType="submit" className="login-form-button">
              Log in
            </Button>
            Or <a href="/register">register now!</a>
          </Form.Item>
        </Form>
        <Modal
          footer={null}
          visible={this.state.visible}
          onCancel={this.handleCancel} >
          {this.displayModal()}
        </Modal>
      </AppLayout>
    );
  }
}

const Login = Form.create({ name: 'normal_login' })(NormalLoginForm);

export default Login;
