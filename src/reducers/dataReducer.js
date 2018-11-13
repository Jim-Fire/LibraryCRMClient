import { FETCH_BOOKS, FETCH_ORDERS, USERS_GET } from "../actions/types";

const initialState = {
    books: null,
    orders: null,
    users: null
};

export default function(state = initialState, action) {
    switch (action.type) {
        case FETCH_BOOKS:
            return {
                ...state,
                books: action.payload
            };
        case FETCH_ORDERS:
            return {
                ...state,
                orders: action.payload
            }; 
        case USERS_GET:
            return {
                ...state,
                users: action.payload
            };    
        default:
            return state;
    }
}
