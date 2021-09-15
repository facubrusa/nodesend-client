import React, { useReducer } from 'react'
import authContext from "./authContext";
import authReducer from "./authReducer";
import { SUCCESSFUL_REGISTRATION, 
    ERROR_REGISTRATION, 
    HIDE_ALERT, 
    SUCCESSFUL_LOGIN, 
    ERROR_LOGIN,
    AUTHENTICATED_USER,
    LOG_OUT } from '../../types';
import clientAxios from '../../config/axios';
import tokenAuth from '../../config/tokenAuth';

const AuthState = ({children}) => {

    // Define initial state
    const initialState = {
        token: (typeof window !== 'undefined') ? localStorage.getItem('token') : '',
        authenticated: null,
        user: null,
        message: null
    };

    // Define the reducer
    const [ state, dispatch ] = useReducer(authReducer, initialState);

    // List of funtions
    const registerUser = async data => {
        try {
            const response = await clientAxios.post('/api/users', data);
            dispatch({
                type: SUCCESSFUL_REGISTRATION,
                payload: response.data.msg
            });
        } catch (error) {
            dispatch({
                type: ERROR_REGISTRATION,
                payload: error.response.data.msg
            });
        }

        // Hide alert after 4s
        setTimeout(() => {
            dispatch({
                type: HIDE_ALERT
            });
        }, 4000);
    }

    const signIn = async data => {
        console.log(data);
        try {
            const response = await clientAxios.post('/api/auth', data);
            dispatch({
                type: SUCCESSFUL_LOGIN,
                payload: response.data.token
            });
        } catch (error) {
            dispatch({
                type: ERROR_LOGIN,
                payload: error.response.data.msg
            });
        }

        setTimeout(() => {
            dispatch({
                type: HIDE_ALERT
            });
        }, 4000);
    }

    const authenticatedUser = async () => {
        const token = localStorage.getItem('token');
        tokenAuth(token);
        
        try {
            const response = await clientAxios.get('/api/auth');
            if(response.data.user) {
                dispatch({
                    type: AUTHENTICATED_USER,
                    payload: response.data.user
                });
            }
        } catch (error) {
            console.log(error.response);
            if(token) localStorage.removeItem('token');
        }
    }

    const logOut = () => {
        dispatch({
            type: LOG_OUT
        });
    }

    return ( 
        <authContext.Provider
            value={{
                token: state.token,
                authenticated: state.authenticated,
                user: state.user,
                message: state.message,
                registerUser,
                signIn,
                authenticatedUser,
                logOut
            }}
        >
            {children}
        </authContext.Provider>
    );
}
 
export default AuthState;