import axios from 'axios';
// import jwt_decode from 'jwt-decode';
import { URL_PREFIX } from './utils';
import setAuthorizationToken from './setAuthorizationToken';

export function fetchUser() {
  return {
    type: "FETCH_USER_FULFILLED",
    payload: {
      name: "Will",
      age: 35,
    }
  }
}

export function setUserName(name) {
  return {
    type: 'SET_USER_NAME',
    payload: name,
  }
}

export function setUserAge(age) {
  return {
    type: 'SET_USER_AGE',
    payload: age,
  }
}


export function login(data) {
  console.log(data);
  var info = {
    "identifier": data.identifier,
    "password": data.password
  }

  return function(dispatch) {
    console.log(info);
    dispatch({type: "LOGIN"});
    axios(URL_PREFIX + "/api/login/", {
      method: "post",
      data: info,
    })
    .then((response) => {
      console.log(response);
      const token = response.data.token;
      localStorage.setItem('jwtToken', token);
      setAuthorizationToken(token);
      // dispatch({type: "STOREUSER_FULFILLED", payload: info});
      dispatch({type: "LOGIN_FULFILLED", payload: response.data});
    })
    .catch((err) => {
      dispatch({type: "LOGIN_REJECTED", payload: err})
    })
  }
}
