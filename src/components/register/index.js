import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import './index.css';
import { Link, Redirect, useHistory } from "react-router-dom";
// import connect from 'redux-connect-decorator'
import { connect } from 'react-redux';
import {
  Form,
  Input,
  Tooltip,
  Cascader,
  Select,
  Row,
  Col,
  Checkbox,
  Button,
  Modal,
  AutoComplete,
} from 'antd';
import AppEmailCodeForm from '../emailVerify';
import { QuestionCircleOutlined } from '@ant-design/icons';
import AppLayout from '../../layout';
import { signUp, activeUser, login } from '../../actions/userActions'
const { Option } = Select;
const AutoCompleteOption = AutoComplete.Option;

@connect((store) => {
  return {
    registered: store.user.registered,
    registerError: store.user.error,
    user: store.user.user,
  };
})
class RegistrationForm extends React.Component {


    state = {
      confirmDirty: false,
      autoCompleteResult: [],
      alertVisible: false,
      codeFormVisible: false,
      registerIsLoading: false,
      text: '',
      email: '',
      registered: false,
      password: '',
    };

    constructor(props) {
      super(props);
      this.emailModalRef = React.createRef();
      this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentWillReceiveProps(nextProps){
      if(nextProps.registerError !== null){
        if(nextProps.registerError.request !== undefined){
          if (nextProps.registerError.request.status === 400){
            this.setState({ text: nextProps.registerError.request.responseText },() => {
              this.showAlertModal();
              // this.toggleRegisterLoading()
            })
          }
        }
      }
      if (nextProps.registerError === null && nextProps.registered === true){
        this.setState({ codeFormVisible: true },() => {
          // this.toggleRegisterLoading()
        })
      }
    }

    handleSubmit = e => {
      e.preventDefault();
      this.props.form.validateFields((err, values) => {
        if (!err) {
          // this.toggleRegisterLoading()
          this.props.dispatch(signUp(values))
          this.setState({ email: values.email, password: values.password })
        }
      });
    };

    toggleRegisterLoading = () => {
      this.setState({ registerIsLoading: !this.state.registerIsLoading });
    };

    handleAlertCancel = () => {
      this.setState({ alertVisible: false });
    };

    showAlertModal = () => {
      this.setState({
        alertVisible: true,
      });
    };

    showCodeFormModal = () => {
      return (
        <AppEmailCodeForm
          ref={this.emailModalRef}
          onButtonSubmit={this.goNextPage}
          email={this.state.email}
          password={this.state.password}
          >
        </AppEmailCodeForm>
        )
    };

    goNextPage = () => {
      this.setState({ codeFormVisible: false, registered: true })
    }
    renderRedirect = () => {
      if(this.props.user != null){
        return <Redirect push to='/home'></Redirect>
      }
    }

    handleConfirmBlur = e => {
      const { value } = e.target;
      this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    };

    compareToFirstPassword = (rule, value, callback) => {
      const { form } = this.props;
      if (value && value !== form.getFieldValue('password')) {
        callback('Two passwords that you enter is inconsistent!');
      } else {
        callback();
      }
    };

    validateToNextPassword = (rule, value, callback) => {
      const { form } = this.props;
      if (value && this.state.confirmDirty) {
        form.validateFields(['confirm'], { force: true });
      }
      callback();
    };

    render() {
      const { getFieldDecorator } = this.props.form;

      const formItemLayout = {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 24 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 24 },
        },
      };

      const tailCheckBoxLayout = {
        wrapperCol: {
          xs: {
            span: 24,
            offset: 0,
          },
          sm: {
            span: 24,
            offset: 0,
          },
        },
      };

      const tailButtonLayout = {
        wrapperCol: {
          xs: {
            span: 14,
            offset: 10,
          },
          sm: {
            span: 13,
            offset: 11,
          },
        },
      };

      return (

        <AppLayout style={{overflow: "auto"}} className="layout">
          <div>
            {this.renderRedirect()}
          </div>
          <Form {...formItemLayout} onSubmit={this.handleSubmit} className="signup-form" labelAlign="left">
            <Form.Item
              label='User Name'
            >
              {getFieldDecorator('username', {
                rules: [{ required: true, message: 'Please input your user name!', whitespace: true }],
              })(<Input />)}
            </Form.Item>
            <Form.Item
              label='First Name'
            >
              {getFieldDecorator('firstname', {
                rules: [{ required: true, message: 'Please input your first name!', whitespace: true }],
              })(<Input />)}
            </Form.Item>
            <Form.Item
              label='Last Name'
            >
              {getFieldDecorator('lastname', {
                rules: [{ required: true, message: 'Please input your last name!', whitespace: true }],
              })(<Input />)}
            </Form.Item>
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
              })(<Input />)}
            </Form.Item>
            <Form.Item label="Password" hasFeedback>
              {getFieldDecorator('password', {
                rules: [
                  {
                    required: true,
                    message: 'Please input your password!',
                  },
                  {
                    validator: this.validateToNextPassword,
                  },
                ],
              })(<Input.Password />)}
            </Form.Item>
            <Form.Item label="Confirm Password" hasFeedback>
              {getFieldDecorator('confirm', {
                rules: [
                  {
                    required: true,
                    message: 'Please confirm your password!',
                  },
                  {
                    validator: this.compareToFirstPassword,
                  },
                ],
              })(<Input.Password onBlur={this.handleConfirmBlur} />)}
            </Form.Item>
            <Form.Item {...tailCheckBoxLayout}>
              {getFieldDecorator('agreement', {
                valuePropName: 'checked',
              })(
                <Checkbox>
                  I have read the <a href="/">agreement</a>
                </Checkbox>,
              )}
            </Form.Item>
            <Form.Item {...tailButtonLayout}>
              <Button loading={this.state.registerIsLoading} type="primary" htmlType="submit">
                Register
              </Button>
            </Form.Item>
            <Modal
              visible={this.state.alertVisible}
              title="Error!"
              onCancel={this.handleAlertCancel}
              footer={[
                <Button key="OK" onClick={this.handleAlertCancel}>
                  OK
                </Button>
              ]}
            >
              <p>{this.state.text}</p>
            </Modal>
            <Modal footer={null} destroyOnClose={true} visible={this.state.codeFormVisible}
              onCancel={() => {
                this.setState({ codeFormVisible: false });
                this.emailModalRef.current.resetFields();
              }}>
              {this.showCodeFormModal()}
            </Modal>
          </Form>
        </AppLayout>
      );
    }
};


const Registration = Form.create({ name: 'normal_register' })(RegistrationForm);

export default Registration;
