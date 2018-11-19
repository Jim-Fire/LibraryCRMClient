import { combineReducers } from "redux";
import dataReducer from "./dataReducer";
import authReducer from "./authReducer";
import doReducer from "./doReducer";
import messageReducer from "./messageReducer";
import currentOrderReducer from "./currentOrderReducer";

export default combineReducers({
  auth: authReducer,
  data: dataReducer,
  do: doReducer,
  message: messageReducer,
  currentOrder: currentOrderReducer
});
