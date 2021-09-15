import { SUCCESSFUL_REGISTRATION, 
    ERROR_REGISTRATION, 
    HIDE_ALERT, 
    SUCCESSFUL_LOGIN, 
    ERROR_LOGIN,
    AUTHENTICATED_USER,
    LOG_OUT } from "../../types";

const authReducer = (state, action) => {
    switch(action.type) {
        case SUCCESSFUL_REGISTRATION:
        case ERROR_REGISTRATION:
            return {
                ...state,
                message: action.payload
            }
        case SUCCESSFUL_LOGIN:
            localStorage.setItem('token', action.payload);
            return {
                ...state,
                token: action.payload,
                authenticated: true
            }
        case ERROR_LOGIN:
            return {
                ...state,
                message: action.payload
            }
        case AUTHENTICATED_USER:
            return {
                ...state,
                user: action.payload,
                authenticated: true
            }
        case LOG_OUT:
            localStorage.removeItem('token');
            return {
                ...state,
                user: null,
                authenticated: null,
                token: ''
            }
        case HIDE_ALERT:
            return {
                ...state,
                message: null
            }
        default:
            return state;
    }
}

export default authReducer;