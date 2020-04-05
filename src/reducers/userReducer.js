export default function reducer(state={
    user: null,
    fetching: false,
    activating: false,
    activated: false,
    fetched: false,
    registering: false,
    registered: false,
    validating: false,
    validated: false,
    resetting: false,
    resetted: false,
    sending: null,
    sent: null,
    resetError: null,
    emailVerifyError: null,
    registerError: null,
    sendCodeError: null,
    error: null,
  }, action) {

    switch (action.type) {
      case "FETCH_USER": {
        return {...state, fetching: true}
      }
      case "FETCH_USER_REJECTED": {
        return {...state, fetching: false, error: action.payload}
      }
      case "FETCH_USER_FULFILLED": {
        return {
          ...state,
          fetching: false,
          fetched: true,
          user: action.payload,
        }
      }
      case "SET_CURRENT_USER": {
        return {
          ...state,
          user: action.payload,
        }
      }
      case "LOGIN_FULFILLED": {
        return {
          ...state,
          fetching: false,
          fetched: true,
          user: action.payload.token,
        }
      }
      case "LOGIN_REJECTED": {
        return {...state, fetching: false, error: action.payload}
      }
      case "REGISTER": {
        return {...state, registering: true}
      }
      case "REGISTER_FULFILLED": {
        return {
          ...state,
          registering: false,
          registered: true,
          user: action.payload.token,
          registerError: null
        }
      }
      case "REGISTER_REJECTED": {
        return {...state, registering: false, registerError: action.payload}
      }

      case "VALIDATE_USER": {
        return {...state, validating: true}
      }
      case "VALIDATE_USER_FULFILLED": {
        return {
          ...state,
          validating: false,
          validated: true,
          user: action.payload.token,
          emailVerifyError: null
        }
      }
      case "VALIDATE_USER_REJECTED": {
        return {...state, validating: false, emailVerifyError: action.payload}
      }

      case "ACTIVE_USER": {
        return {...state, activating: true}
      }
      case "ACTIVE_USER_FULFILLED": {
        return {
          ...state,
          activating: false,
          activated: true,
        }
      }
      case "ACTIVE_USER_REJECTED": {
        return {...state, activating: false, error: action.payload}
      }


      case "RESET_PASSWORD": {
        return {...state, resetting: true}
      }
      case "RESET_PASSWORD_FULFILLED": {
        return {
          ...state,
          resetting: false,
          resetted: true,
          resetError: null
        }
      }
      case "RESET_PASSWORD_REJECTED": {
        return {...state, resetting: false, resetError: action.payload}
      }


      case "RESEND_CODE": {
        return {...state, sending: true}
      }
      case "RESEND_CODE_FULFILLED": {
        return {
          ...state,
          sending: false,
          sent: true,
          sendCodeError: null
        }
      }
      case "RESEND_CODE_REJECTED": {
        return {...state, sending: false, sendCodeError: action.payload}
      }

    }
    return state
}
