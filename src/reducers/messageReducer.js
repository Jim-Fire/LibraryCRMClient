import {
  RESPONSE_MESSAGE_ERROR,
  RESPONSE_MESSAGE_SUCCESS,
  SET_UNAUTHORIZATED,
  SHOW_APP_WARNING,
  SHOW_APP_SUCCESS
} from "../actions/types";

const initialState = {
  message: {
    titleResolve: "Ok",
    text: null
  },
  unauthorizated: false
};
//message = {
//    titleResolve: 'Ok',
//    titleReject: 'Ok',
//    reolve: ()=>{},
//    reject: ()=>{},
//    type: 'success'
//};

export default function(state = initialState, action) {
  switch (action.type) {
    case RESPONSE_MESSAGE_ERROR:
      return {
        ...state,
        message: { ...state.message, text: action.payload, type: "error" }
      };
    case RESPONSE_MESSAGE_SUCCESS:
      return {
        ...state,
        message: { ...state.message, text: action.payload, type: "success" }
      };
    case SHOW_APP_WARNING:
      return {
        ...state,
        message: { ...state.message, text: action.payload, type: "error" }
      };
    case SHOW_APP_SUCCESS:
      return {
        ...state,
        message: { ...state.message, text: action.payload, type: "success" }
      };
    case SET_UNAUTHORIZATED:
      return {
        ...state,
        unauthorizated: action.payload
      };
    default:
      return state;
  }
}
