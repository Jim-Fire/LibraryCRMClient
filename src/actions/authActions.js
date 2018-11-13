import { SIGN_IN, SIGN_UP, RESPONSE_MESSAGE_ERROR, RESPONSE_MESSAGE_SUCCESS, USER_GET, SET_UNAUTHORIZATED } from './types';
import axios from 'axios';
import dispatchError from './dispatchError';

axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwt_token')

const dispatchSuccess = (message, dispatch)=> dispatch({
    type: RESPONSE_MESSAGE_SUCCESS,
    payload: message
});

export const setUnauthorizated = ({ param }) => dispatch => {   
    dispatch({
        type: SET_UNAUTHORIZATED,
        payload: !!param
    });
};

export const registerFailed = ({ message }) => dispatch => {   
    dispatch({
        type: RESPONSE_MESSAGE_ERROR,
        payload: message
    });
;}

export const authorizate = ({login,password}) => dispatch => {   
    axios.post('/auth',{
        email: login,
        password: password
    })
    .then(res => res.data)
    .then(json => {
        const token = 'jwt ' + json.token
        axios.defaults.headers.common['Authorization'] = token;
        localStorage.setItem('jwt_token', token)
        localStorage.setItem('user', JSON.stringify(json.user))

        dispatch({
            type: SIGN_IN,
            payload: token
        });
        dispatch({
            type: USER_GET,
            payload: json.user
        });
        setTimeout(()=>{
            dispatchSuccess(json.message,dispatch);
        },0)
    })
    .catch(err=>dispatchError(err,dispatch));
};

export const register = ({login,password, fullname, phone}) => dispatch => {   
    axios.post('/register',{
        email: login,
        password,
        fullname,
        phone
    })
    .then(res => res.data)
    .then(json => {
        
        dispatch({
            type: SIGN_UP,
            payload: json.user
        });

        dispatchSuccess(json.message,dispatch);
    })
    .catch(err=>dispatchError(err,dispatch));
};

export const getUser = () => dispatch => {   
    axios.get('/get-user')
    .then(res => res.data)
    .then(json => {
        
        dispatch({
            type: USER_GET,
            payload: json.user
        });
        
    })
    .catch(err=>dispatchError(err,dispatch));
};
