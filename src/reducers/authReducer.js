import { SIGN_UP , SIGN_IN , USER_GET} from "../actions/types";

const initialState = {
    token: null,
    user: JSON.parse(localStorage.getItem("user"))
};

export default function(state = initialState, action) {
    switch (action.type) {
        case SIGN_IN:
            return {
                ...state,
                token: action.payload
            };
        case SIGN_UP:
            return {
                ...state,
                user: action.payload
            };
        case USER_GET:
            return {
                ...state,
                user: action.payload
            };    
        default:
            return state;
    }
}
