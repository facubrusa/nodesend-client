import { useReducer } from "react";
import clientAxios from "../../config/axios";
import appContext from "./appContext";
import appReducer from "./appReducer";
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

const AppState = ({children}) => {

    const initialState = {
        file_message: null,
        name: '',
        original_name: '',
        loading: null,
        downloads: 1,
        password: '',
        author: null,
        url: ''
    };

    const [state, dispatch] = useReducer(appReducer, initialState);
    
    const showAlert = msg => {
        dispatch({
            type: SHOW_ALERT,
            payload: msg
        });

        setTimeout(() => {
            dispatch({
                type: HIDE_ALERT
            });
        }, 4000);
    }

    // Upload file to the server
    const uploadFile = async (formData, originalName) => {
        // Show loading message
        dispatch({
            type: LOADING_FILE
        });
        
        try {
            const response = await clientAxios.post('/api/files', formData);
            dispatch({
                type: SUCCESSFUL_FILE_UPLOAD,
                payload: {
                    name: response.data.file,
                    original_name: originalName
                }
            })
        } catch (error) {
            dispatch({
                type: ERROR_FILE_UPLOAD,
                payload: error.response.data.msg
            });
        }
    }

    // Create link and return url
    const createLink = async () => {
        const data = {
            name: state.name,
            original_name: state.original_name,
            downloads: state.downloads,
            password: state.password,
            author: state.author,
        }

        try {
            const response = await clientAxios.post('/api/links', data);
            dispatch({
                type: SUCCESSFUL_CREATE_LINK,
                payload: response.data.msg
            });
        } catch (error) {
            dispatch({
                type: ERROR_CREATE_LINK,
                payload: error.response.data.msg
            });
        }
    }

    // Clear all the state when redirect to home
    const clearState = () => {
        dispatch({
            type: CLEAN_STATE
        });
    }

    const handleChangePassword = password => {
        dispatch({
            type: ADD_PASSWORD,
            payload: password
        });
    }

    const handleChangeDownloads = downloads => {
        if(downloads) {

            dispatch({
                type: ADD_DOWNLOADS,
                payload: parseInt(downloads)
            });
        }
    }

    return (
        <appContext.Provider
            value={{
                file_message: state.file_message,
                name: state.name,
                original_name: state.original_name,
                loading: state.loading,
                downloads: state.downloads,
                password: state.password,
                author: state.author,
                url: state.url,
                showAlert,
                uploadFile,
                createLink,
                clearState,
                handleChangePassword,
                handleChangeDownloads
            }}
        >
            {children}
        </appContext.Provider>
    )
}

export default AppState;