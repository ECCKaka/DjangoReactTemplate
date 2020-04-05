/**
 * Navigation bar component.
 */

import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import './index.css';
import { Menu, Icon } from 'antd';
import { logout } from '../../actions/userActions';
import { Link, Redirect, useHistory, withRouter } from "react-router-dom";
import {
  MailOutlined,
  AppstoreOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import { connect } from 'react-redux';

const { SubMenu } = Menu;

@connect((store) => {
  return {
    user: store.user.user,
  };
})
class AppNavigationBar extends React.Component {
  state = {
    current: 'mail',
  };

  handleClick = e => {
    console.log('click ', e.key);
    switch (e.key) {
      case "login":
        if (window.location.pathname !== '/') {
          // re-render home page
          this.props.history.push('/')
        }
        break;
      case "logout":
        this.props.dispatch(logout())
        break;
      case "home":
        if (this.props.user){
          this.props.history.push('/home')
        }
        else{
          this.props.history.push('/')
        }
        break;
      default:
        this.props.history.push('/')
        break;
    }
    this.setState({
      current: e.key,
    });
  };

  render() {
    return (
      <Menu onClick={this.handleClick} mode="horizontal">
        <Menu.Item key="home">
          <Icon type="home" />
          Home
        </Menu.Item>
        {
          this.props.user ? (
            <Menu.Item key="logout">
              <Icon type="logout" />
              Logout
            </Menu.Item>
          ) : (
            <Menu.Item key="login">
              <Icon type="login" />
              Login
            </Menu.Item>
          )
        }
        <Menu.Item key="setting">
          <Icon type="setting" />
          Setting
        </Menu.Item>
        {
          this.props.user &&
          <Menu.Item key="admin">
            <Icon type="user" />
            Admin
          </Menu.Item>
        }

        <SubMenu
          title={
            <span className="submenu-title-wrapper">
              <SettingOutlined />
              Navigation Three - Submenu
            </span>
          }
        >
          <Menu.ItemGroup title="Item 1">
            <Menu.Item key="setting:1">Option 1</Menu.Item>
            <Menu.Item key="setting:2">Option 2</Menu.Item>
          </Menu.ItemGroup>
          <Menu.ItemGroup title="Item 2">
            <Menu.Item key="setting:3">Option 3</Menu.Item>
            <Menu.Item key="setting:4">Option 4</Menu.Item>
          </Menu.ItemGroup>
        </SubMenu>
        <Menu.Item key="alipay">
          <a href="https://ant.design" target="_blank" rel="noopener noreferrer">
            Navigation Four - Link
          </a>
        </Menu.Item>
      </Menu>
    );
  }
}


export default withRouter(AppNavigationBar);
