import { combineReducers } from "redux"

import resume from "./resumeReducer"
import user from "./userReducer"

export default combineReducers({
  resume,
  user,
})
