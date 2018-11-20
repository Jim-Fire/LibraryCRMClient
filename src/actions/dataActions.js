import { FETCH_BOOKS, FETCH_ORDERS, USERS_GET } from "./types";
import axios from "axios";
import dispatchError from "./dispatchError";

axios.defaults.headers.common["Authorization"] = localStorage.getItem(
  "jwt_token"
);

export const fetchBooks = () => dispatch => {
  axios
    .get("/get-books")
    .then(res => res.data)
    .then(json => {
      dispatch({
        type: FETCH_BOOKS,
        payload: json.books
      });
    })
    .catch(err => {
      dispatchError(err, dispatch);
    });
};

export const fetchOrders = () => dispatch => {
  axios
    .get("/get-orders")
    .then(res => res.data)
    .then(json => {
      dispatch({
        type: FETCH_ORDERS,
        payload: json.orders
      });
    })
    .catch(err => dispatchError(err, dispatch));
};

export const fetchUsers = () => dispatch => {
  axios
    .get("/get-users")
    .then(res => res.data)
    .then(json => {
      dispatch({
        type: USERS_GET,
        payload: json.users
      });
    })
    .catch(err => dispatchError(err, dispatch));
};
