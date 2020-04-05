
import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import './index.css';
import { Link, Redirect } from "react-router-dom";
import connect from 'redux-connect-decorator'
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import { login } from '../../actions/userActions'
import AppLayout from '../../layout';

@connect((store) => {
  return {
    user: store.user.user,
  };
})
class Home extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.dispatch(login(values))
      }
    });
  };

  render() {
    if (!this.props.user){
      return <Redirect push to='/'></Redirect>
    }
    return (
      <AppLayout style={{overflow: "auto"}} className="layout">
        home
      </AppLayout>
    );
  }
}


export default Home;
