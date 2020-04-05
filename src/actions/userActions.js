import axios from 'axios';
// import jwt_decode from 'jwt-decode';
import { URL_PREFIX } from './utils';
import setAuthorizationToken from './setAuthorizationToken';

export function setCurrentUser(user) {
  return function(dispatch) {
    dispatch({type: "SET_CURRENT_USER", payload: user})
  }
}


export function setUserAge(age) {
  return {
    type: 'SET_USER_AGE',
    payload: age,
  }
}

export function signUp(data) {
  var info = {
    username: data.username,
    first_name: data.firstname,
    last_name: data.lastname,
    email: data.email,
    password: data.password,
    password2: data.confirm
  }
  return function(dispatch) {
    dispatch({type: "REGISTER"});
    axios(URL_PREFIX + "/api/register/", {
      method: "post",
      data: info,
    })
    .then((response) => {
      dispatch({type: "REGISTER_FULFILLED", payload: response.data});
    })
    .catch((err) => {
      dispatch({type: "REGISTER_REJECTED", payload: err})
    })
  }
}

export function login(data) {
  var info = {
    "identifier": data.identifier,
    "password": data.password
  }

  return function(dispatch) {
    dispatch({type: "LOGIN"});
    axios(URL_PREFIX + "/api/login/", {
      method: "post",
      data: info,
    })
    .then((response) => {
      const token = response.data.token;
      sessionStorage.setItem('jwtToken', token);
      setAuthorizationToken(token);
      // dispatch({type: "STOREUSER_FULFILLED", payload: info});
      dispatch({type: "LOGIN_FULFILLED", payload: response.data});
    })
    .catch((err) => {
      dispatch({type: "LOGIN_REJECTED", payload: err})
    })
  }
}

// this is logout function
// clear the local storage & session storage
export function logout() {
  return function(dispatch) {
    localStorage.removeItem('jwtToken');
    sessionStorage.removeItem('jwtToken');
    sessionStorage.clear();
    localStorage.clear();
    setAuthorizationToken(false);
    dispatch(setCurrentUser(null));
  }
}

export function validateUser(data, email, password) {
  return function(dispatch) {
    dispatch({type: "VALIDATE_USER"});
    axios(URL_PREFIX + "/api/verify/?email=" + email + '&code=' + data['code'], {
      method: "get"
    })
    .then((response) => {
      dispatch({type: "VALIDATE_USER_FULFILLED", payload: response.data})
      dispatch(activeUser(response.data[0]['id'], email, password))
    })
    .catch((err) => {
      dispatch({type: "VALIDATE_USER_REJECTED", payload: err})
    })
  }
}

// it will use later on
// active an user
export function activeUser(id, email, password) {
  var data = {
    'is_active': true
  }
  return function(dispatch) {
    dispatch({type: "ACTIVE_USER"});
    axios(URL_PREFIX + "/api/user/update-partial/" + id + "/", {
      method: "put",
      data: data,
    })
    .then((response) => {
      dispatch({type: "ACTIVE_USER_FULFILLED", payload: response.data})
      dispatch(login({"identifier": email, "password": password}))
    })
    .catch((err) => {
      dispatch({type: "ACTIVE_USER_REJECTED", payload: err})
    })
  }
}

export function resendCode(email) {
  var data = {
    'email': email
  }
  return function(dispatch) {
    dispatch({type: "RESEND_CODE"});
    axios(URL_PREFIX + "/api/verify-update/", {
      method: "POST",
      data: data,
    })
    .then((response) => {
      dispatch({type: "RESEND_CODE_FULFILLED", payload: response.data})
    })
    .catch((err) => {
      dispatch({type: "RESEND_CODE_REJECTED", payload: err})
    })
  }
}

export function resetPassword(data, email) {
  var userInfo = {
    "email": email,
    "password": data['forgetPassword']
  }
  return function(dispatch) {
    dispatch({type: "RESET_PASSWORD"});
    axios(URL_PREFIX + "/api/reset-password/" + email + "/?email=" + email + '&code=' + data['code'], {
      method: "PUT",
      data: userInfo,
    })
    .then((response) => {
      dispatch({type: "RESET_PASSWORD_FULFILLED", payload: response.data})
    })
    .catch((err) => {
      dispatch({type: "RESET_PASSWORD_REJECTED", payload: err})
    })
  }
}
