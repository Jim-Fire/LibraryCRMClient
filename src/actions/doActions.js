import {
  RESPONSE_MESSAGE_SUCCESS,
  USER_UPDATED,
  USER_DELETED,
  ADD_BOOK,
  DELETE_BOOK,
  UPDATE_BOOK,
  ORDER_CREATE,
  ORDER_CONFIRM_REJECT,
  ORDER_DELETE,
  SET_BOOKS_INTO_ORDER,
  ADD_BOOK_INTO_ORDER,
  SHOW_APP_WARNING,
  SHOW_APP_SUCCESS
} from "./types";
import axios from "axios";
import dispatchError from "./dispatchError";
import { fetchBooks } from "./dataActions";

axios.defaults.headers.common["Authorization"] = localStorage.getItem(
  "jwt_token"
);

export const showAppWarning = message => dispatch => {
  dispatch({
    type: SHOW_APP_WARNING,
    payload: message
  });
};

const dispatchSuccess = (message, dispatch) =>
  dispatch({
    type: RESPONSE_MESSAGE_SUCCESS,
    payload: message
  });

export const updateUser = ({
  userId,
  email,
  password,
  fullname,
  role,
  phone
}) => dispatch => {
  axios
    .put(`/update-user/${userId}`, { email, password, fullname, role, phone })
    .then(res => res.data)
    .then(json => {
      dispatch({
        type: USER_UPDATED,
        payload: json.user
      });
      dispatchSuccess(json.message, dispatch);
    })
    .catch(err => dispatchError(err, dispatch));
};

export const deleteUser = ({ userId }) => dispatch => {
  axios
    .delete(`/delete-user/${userId}`)
    .then(res => res.data)
    .then(json => {
      dispatch({
        type: USER_DELETED,
        payload: json.user
      });

      dispatchSuccess(json.message, dispatch);
    })
    .catch(err => dispatchError(err, dispatch));
};

export const addBook = ({
  name,
  author,
  pagesNumber,
  category,
  description,
  price,
  count
}) => dispatch => {
  axios
    .post(`/add-book`, {
      name,
      author,
      pagesNumber,
      category,
      description,
      price,
      count
    })
    .then(res => res.data)
    .then(json => {
      dispatch({
        type: ADD_BOOK,
        payload: json.book
      });
      fetchBooks()(dispatch);
      dispatchSuccess(json.message, dispatch);
    })
    .catch(err => dispatchError(err, dispatch));
};

export const deleteBook = ({ bookId }) => dispatch => {
  axios
    .delete(`/delete-book/${bookId}`)
    .then(res => res.data)
    .then(json => {
      dispatch({
        type: DELETE_BOOK,
        payload: json.book
      });

      dispatchSuccess(json.message, dispatch);
    })
    .catch(err => dispatchError(err, dispatch));
};

export const updateBook = ({
  bookId,
  name,
  author,
  pagesNumber,
  category,
  description,
  price,
  count
}) => dispatch => {
  axios
    .put(`/update-book/${bookId}`, {
      name,
      author,
      pagesNumber,
      category,
      description,
      price,
      count
    })
    .then(res => res.data)
    .then(json => {
      dispatch({
        type: UPDATE_BOOK,
        payload: json.book
      });

      dispatchSuccess(json.message, dispatch);
    })
    .catch(err => dispatchError(err, dispatch));
};

export const createOrder = ({
  orderNumber,
  description,
  orderedBooks
}) => dispatch => {
  axios
    .post(`/create-order`, { orderNumber, description, orderedBooks })
    .then(res => res.data)
    .then(json => {
      dispatch({
        type: ORDER_CREATE,
        payload: json.order
      });

      dispatchSuccess(json.message, dispatch);
    })
    .catch(err => dispatchError(err, dispatch));
};

export const confirmRejectOrder = ({
  confirm,
  id,
  statusDescription
}) => dispatch => {
  axios
    .post(`/confirm-reject-order`, { confirm, id, statusDescription })
    .then(res => res.data)
    .then(json => {
      dispatch({
        type: ORDER_CONFIRM_REJECT,
        payload: json.order.status
      });

      dispatchSuccess(json.message, dispatch);
    })
    .catch(err => dispatchError(err, dispatch));
};

export const deleteOrder = ({ id }) => dispatch => {
  axios
    .delete(`/delete-order/${id}`, {
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(res => res.data)
    .then(json => {
      dispatch({
        type: ORDER_DELETE,
        payload: json.order
      });
      dispatchSuccess(json.message, dispatch);
    })
    .catch(err => dispatchError(err, dispatch));
};

export const setBooksIntoOrder = ({ orderedBooks, message }) => dispatch => {
  dispatch({
    type: SET_BOOKS_INTO_ORDER,
    payload: orderedBooks
  });
};

export const addBookIntoOrder = ({ book, message }) => dispatch => {
  dispatch({
    type: ADD_BOOK_INTO_ORDER,
    payload: book
  });
  dispatch({
    type: SHOW_APP_SUCCESS,
    payload: message
  });
};
