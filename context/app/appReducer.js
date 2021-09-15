import {
    SHOW_ALERT, 
    HIDE_ALERT, 
    LOADING_FILE,
    SUCCESSFUL_FILE_UPLOAD, 
    ERROR_FILE_UPLOAD, 
    SUCCESSFUL_CREATE_LINK, 
    ERROR_CREATE_LINK,
    CLEAN_STATE,
    ADD_PASSWORD,
    ADD_DOWNLOADS
} from '../../types';

const appReducer = (state, action) => {
    switch(action.type) {
        case SHOW_ALERT:
            return {
                ...state,
                file_message: action.payload
            }
        case HIDE_ALERT:
            return {
                ...state,
                file_message: null
            }
        case LOADING_FILE:
            return {
                ...state,
                loading: true
            }
        case SUCCESSFUL_FILE_UPLOAD:
            return {
                ...state,
                name: action.payload.name,
                original_name: action.payload.original_name,
                loading: null
            }
        case ERROR_FILE_UPLOAD:
            return {
                ...state,
                file_message: action.payload,
                loading: null
            }
        case SUCCESSFUL_CREATE_LINK:
            return {
                ...state,
                url: action.payload
            }
        case ERROR_CREATE_LINK:
            return {
                ...state,
                file_message: action.payload
            }
        case CLEAN_STATE:
            return {
                ...state,
                file_message: null,
                name: '',
                original_name: '',
                loading: null,
                downloads: 1,
                password: '',
                author: null,
                url: ''
            }
        case ADD_PASSWORD:
            return {
                ...state,
                password: action.payload
            }
        case ADD_DOWNLOADS:
            return {
                ...state,
                downloads: action.payload
            }
        default:
            return state;
    }
}

export default appReducer;