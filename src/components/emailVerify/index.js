/**
 * Email code verification form for registration.
 */
import React from 'react';
import { Form, Icon, Input, Button } from 'antd';
import { validateUser, activeUser, resendCode } from '../../actions/userActions'
import { connect } from 'react-redux';
import {  } from '../../actions/userActions'

@connect((store) => {
  return {
    emailVerifyError: store.user.emailVerifyError,
    validated: store.user.validated
  };
})
class NormalCodeForm extends React.Component {

  state = {
    isLoading: false,
    isSent: false
  }

  /**
   * Handle the resend button click.
   */
  onSendEmailVerification = () => {
    // e.preventDefault();
    this.props.dispatch(resendCode(this.props.email))
  };

  // onSendEmailVerification = async (e) => {
  //   // e.preventDefault();
  //   // this.togglerDisable();
  //   // let response = await resendCode({ email: this.props.email })
  //   // if (response.status === 200) {
  //   //   this.togglerDisable();
  //   // } else {
  //   //   let message = await response.text()
  //   //   this.props.form.setFields({
  //   //     code: {
  //   //       errors: [new Error(message)],
  //   //     },
  //   //   })
  //   //   this.togglerDisable()
  //   // }
  // }

  /**
   * Set the state for the resend button.
   */
  togglerDisable = () => {
    this.setState({ isSent: !this.state.isSent })
  }

  /**
   * Set the state for the confirm button.
   */
  toggleLoading = () => {
    this.setState({ isLoading: !this.state.isLoading })
  }

  /**
   * Handle the form submission.
   */
  componentWillReceiveProps(nextProps){
    if(nextProps.emailVerifyError !== null){
      if(nextProps.emailVerifyError.request !== undefined){
        if (nextProps.emailVerifyError.request.status === 400){

        }
      }
    }
    if (nextProps.emailVerifyError === null && nextProps.validated === true){
      this.toggleLoading()
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields(async (err, values) => {
      if (!err){
        if (values.forgetPassword){
          this.props.onButtonSubmit(values)
        }
        else{
          this.props.dispatch(validateUser(values, this.props.email, this.props.password))
          setTimeout(() => {
            // server validate
            if (this.props.emailVerifyError !== null) {
              this.props.form.setFields({
                code: {
                  errors: [new Error(this.props.emailVerifyError.response.data[0])],
                },
              });
            }
          }, 100);
        }
      }
    });
  };

  /**
   * Draw the resend button.
   */
  drawButton = () => {
    if (!this.state.isSent) {
      return (
        "Resend"
      );
    }
    else {
      return (
        "Sending"
      );
    }
  }

  /**
   * Render the email verification form.
   */
  render() {
    const { getFieldDecorator } = this.props.form;
    // the form has a email verify page, it sends the verify code and need user to
    // input the verification code from the email, then it will check if the code
    // is the same.
    // finally it has a submit button.
    return (
      <Form onSubmit={this.handleSubmit} className="email-form">
        <Form.Item label="Enter Email Code">
          {getFieldDecorator('code', {
            rules: [
              {
                required: true,
                message: 'Please input your Code',
              },
            ],
          })(
              <Input.Search
                prefix={<Icon type="number" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="Code"
                enterButton={
                  <Button
                    className="resendButton"
                    type="primary"
                    onClick={this.onSendEmailVerification}
                    style={{ width: '9ch', display: "inline-block" }}
                    disabled={this.state.isSent}
                  >
                    {this.drawButton()}
                  </Button>
                }
                onSearch={this.onSendEmailVerification}
              />
          )}
        </Form.Item>
        {this.props.forgetPassword ? (<Form.Item label="Password">
          {getFieldDecorator('forgetPassword', {
            rules: [{ required: true, message: 'Please enter your new Password!' }],
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="Password"
            />,
          )}
        </Form.Item>) : (<></>)}
        <Form.Item>
          <Button loading={this.state.isLoading} onClick={this.handleSubmit}
            type="primary" htmlType="submit" className="email-form-button">
            Confirm
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

const AppEmailCodeForm = Form.create({ name: 'normal_code' })(NormalCodeForm);

export default AppEmailCodeForm;
