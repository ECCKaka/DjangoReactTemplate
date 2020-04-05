/**
 * Header component.
 */
import React from 'react';
import { useHistory } from "react-router-dom";

import './style.css'

// hearder url
const iconImgUrl = process.env.PUBLIC_URL + '/django.jpg'

var iconStyle = {
  pc: {
    height: "8rem",
    width: "8rem",
    cursor: 'pointer'
  },
  mobile: {
    height: "8rem",
    width: "8rem",
  }
}

var headerStyle = {
  pc: {
    height: "8rem",
  },
  mobile: {
    height: "8rem",
  }
}


function AppHeader() {
  // const Window = WindowStore.useContainer()
  // const Auth = AuthStore.useContainer()
  let history = useHistory();

  // if header clicked, return to home page
  let handleIconOnClick = () => {
    if (window.location.pathname !== '/home') {
      history.push('/home')
    }
  }
  // the following is the header logo
  return (
    <div className='layout-header'>
      <img
        onClick={handleIconOnClick}
        className='layout-header-logo'
        alt="icon"
        style={{
          width: "150px",
          height: "100px"
        }}
        src={iconImgUrl}>
      </img>
    </div>
  )

}

export default AppHeader;
