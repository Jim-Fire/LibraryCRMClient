import { 
    USER_UPDATED,
    USER_DELETED, 
    ADD_BOOK, 
    DELETE_BOOK, 
    UPDATE_BOOK, 
    ORDER_CREATE,
    ORDER_DELETE,
    ORDER_CONFIRM_REJECT
 } from "../actions/types";

const initialState = {
    user: null,
    book: null,
    order: null,
    orderStatus: null
};

export default function(state = initialState, action) {
    switch (action.type) {
        case USER_UPDATED:
            return {
                ...state,
                user: action.payload
            }; 
        case USER_DELETED:
            return {
                ...state,
                user: action.payload
            };
        case ADD_BOOK:
            return {
                ...state,
                book: action.payload
            }; 
        case DELETE_BOOK:
            return {
                ...state,
                book: action.payload
            };
        case UPDATE_BOOK:
            return {
                ...state,
                book: action.payload
            };
        case ORDER_CREATE:
            return {
                ...state,
                order: action.payload
            };
        case ORDER_DELETE:
            return {
                ...state,
                order: action.payload
            };
        case ORDER_CONFIRM_REJECT:
            return {
                ...state,
                orderStatus: action.payload
            };          
        default:
            return state;
    }
}
