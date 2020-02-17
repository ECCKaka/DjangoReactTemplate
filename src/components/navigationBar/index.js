/**
 * Navigation bar component.
 */
import React, { useState } from 'react';
import { Icon, Menu, } from 'antd';
import { useHistory } from "react-router-dom";
import './style.css'

const { SubMenu } = Menu


function AppNavigationBar() {
  let [keys, updateKeys] = useState([])
  let history = useHistory()

  let handleOpenChange = (e) => {
    updateKeys(e)
  }
  // handle the menu onclick
  let handleMenuOnClick = (e) => {
    switch (e.key) {
      case "login":
        // Auth.updateIsFirstVist(false)
        updateKeys([])
        if (window.location.pathname !== '/') {
          // re-render home page
          history.push('/')
        }
        break;
      case "logout":
        updateKeys([])
        history.push('/unauthorized')
        break;
      case "home":
        updateKeys([])
        history.push('/')
        break;
      case "setting":
        updateKeys([])
        // Auth.updateUserId(null)
        history.push('/userprofile')
        break;
      case "admin":
        updateKeys([])
        history.push('/admin')
        break;
      case "transaction":
        updateKeys([])
        history.push('/transactionhistory')
        break;
      default:
        updateKeys([])
        break;
    }
  }
  // handle submenu onclick
  let handleSubMenuOnClick = (e) => {
    if (e.key === 'submenu') {
      if (keys.length > 0) {
        updateKeys([])
      } else {
        updateKeys(['submenu'])
      }
    }
  }

  // if (Auth.isAuth()) {
  //   return (
  //     <Menu theme='dark' mode="horizontal" openKeys={keys} onClick={handleMenuOnClick}>
  //       <Menu.Item style={{ marginLeft: '5vw' }} key="home">
  //         <Icon type="home" />
  //         <span>Home</span>
  //       </Menu.Item>
  //       <Menu.Item key="setting">
  //         <Icon type="setting" />
  //         <span>Setting</span>
  //       </Menu.Item>
  //       {
  //         Auth.getAdminUser() ?
  //         ( <Menu.Item key="admin">
  //           <Icon type="user" />
  //           <span>Admin</span>
  //         </Menu.Item> ) : (
  //         <Menu.Item key="transaction">
  //           <Icon type="transaction" />
  //           <span>History</span>
  //         </Menu.Item>
  //         )
  //       }
  //       <Menu.Item key="logout">
  //         <Icon type="logout" />
  //         <span>Log Out</span>
  //       </Menu.Item>
  //     </Menu>
  //   )
  // } else {
  //   // the other choices with login and setting
  //   return (
  //     <Menu theme='dark' mode="horizontal" openKeys={keys} onClick={handleMenuOnClick}>
  //       <Menu.Item style={{ marginLeft: '5vw' }} key="setting">
  //         <Icon type="setting" />
  //         <span>Setting</span>
  //       </Menu.Item>
  //       <Menu.Item key="login">
  //         <Icon type="login" />
  //         <span>Log In</span>
  //       </Menu.Item>
  //     </Menu>
  //   )
  // }
  // modify page with mobile size.
  return (
    <Menu mode="horizontal" openKeys={keys} onClick={handleMenuOnClick}>
      <Menu.Item style={{ marginLeft: '5vw' }} key="home">
        <Icon type="home" />
        <span>Home</span>
      </Menu.Item>
      <Menu.Item key="setting">
        <Icon type="setting" />
        <span>Setting</span>
      </Menu.Item>
      <Menu.Item key="admin">
        <Icon type="user" />
        <span>Admin</span>
      </Menu.Item>
      <Menu.Item key="transaction">
        <Icon type="transaction" />
        <span>History</span>
      </Menu.Item>
      <Menu.Item key="login">
        <Icon type="login" />
        <span>Log In</span>
      </Menu.Item>
    </Menu>
  )

}

export default AppNavigationBar;
