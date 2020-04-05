/**
 * Email form component for sign-in.
 */
import React from 'react';
import { Form, Icon, Input, Button } from 'antd';
import { login, resendCode } from '../../actions/userActions'
import './style.css'
import { connect } from 'react-redux';

@connect((store) => {
  return {
    user: store.user.user,
    userFetched: store.user.fetched,
    resume: store.resume.resume,
    sendCodeError: store.user.sendCodeError,
  };
})
class NormalEmailForm extends React.Component {

  state = {
    isLoading: false
  }
  /**
   * Set the loading state for the button.
   */
  togglerLoading = () => {
    this.setState({ isLoading: !this.state.isLoading })
  }

  /**
   * Handle the form submission.
   */
  handleSubmit = (e) => {
    // forget password
    e.preventDefault();
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        this.props.dispatch(resendCode(values.email))
        this.props.onButtonSubmit(values.email)
        setTimeout(() => {
          // server validate
          if (this.props.sendCodeError !== null) {
            this.props.form.setFields({
              code: {
                errors: [new Error(this.props.sendCodeError.response.data[0])],
              },
            });
          }
        }, 100);
      }
    });
  };

  /**
   * Render the sign-in email form component.
   */
  render() {
    const { getFieldDecorator } = this.props.form;
    // the form has email and password login page, and it has
    // a placeholder saying that what need to be input
    // and a button to submit the login
    return (
      <Form onSubmit={this.handleSubmit} className="email-form">
        <Form.Item label="E-mail">
          {getFieldDecorator('email', {
            rules: [
              {
                type: 'email',
                message: 'The input is not valid E-mail!',
              },
              {
                required: true,
                message: 'Please input your E-mail!',
              },
            ],
          })(
            <Input
              prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Email"
            />,
          )}
        </Form.Item>
        <Form.Item>
          <Button loading={this.state.isLoading}
            onClick={this.handleSubmit}
            type="primary" htmlType="submit" className="email-form-button">
            Confirm
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

const AppEmailForm = Form.create({ name: 'normal_email' })(NormalEmailForm);

export default AppEmailForm;
