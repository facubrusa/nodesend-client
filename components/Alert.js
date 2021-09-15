import React, { useContext} from 'react';
import authContext from '../context/auth/authContext';
import appContext from '../context/app/appContext';

const Alert = () => {
    const AuthContext = useContext(authContext);
    const { message } = AuthContext;

    const AppContext = useContext(appContext);
    const { file_message } = AppContext;

    return ( 
        <div className="bg-red-500 py-2 px3 w-full my-3 max-w-lg text-center text-white mx-auto">
            { message || file_message }
        </div>
    );
}
 
export default Alert;