import { SET_BOOKS_INTO_ORDER, ADD_BOOK_INTO_ORDER } from "../actions/types";

const initialState = {
  orderedBooks: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_BOOKS_INTO_ORDER:
      return {
        ...state,
        orderedBooks: action.payload
      };
    case ADD_BOOK_INTO_ORDER:
      return {
        ...state,
        orderedBooks: [...state.orderedBooks, action.payload]
      };
    default:
      return state;
  }
}
