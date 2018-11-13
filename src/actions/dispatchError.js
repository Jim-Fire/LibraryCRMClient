import { 
    RESPONSE_MESSAGE_ERROR,
    SET_UNAUTHORIZATED
} from './types';



export default (err, dispatch)=> {
    console.log('error data: ',err.response)
    let message = '';
    if(err.response && err.response.data && err.response.data.message){
        message = err.response.data.message;
    }else{
        message = err;
    }
    dispatch({
        type: RESPONSE_MESSAGE_ERROR,
        payload: message.toString()
    });
    if(err && err.response && err.response.status===401){
        dispatch({
            type: SET_UNAUTHORIZATED,
            payload: true
        });
    }
}