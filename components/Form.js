import React, { useState, useContext } from 'react';
import appContext from '../context/app/appContext';

const Form = () => {
    
    const [usePassword, setUsePassword] = useState(false);

    const AppContext = useContext(appContext);
    const { handleChangePassword, handleChangeDownloads } = AppContext;

    return ( 
        <div className="w-full mt-20">
            <div>
                <label className="text-lg text-gray-800">Delete after: </label>
                <select 
                    className="appearance-none block mt-2 bg-white border border-gray-400 text-black text-center py-3 px-4 mx-auto rounded leading-none focus:outline-none focus:border-gray-500"
                    onChange={e => handleChangeDownloads(e.target.value)}
                >
                    <option value="" defaultValue disabled>-- Select an option --</option>
                    <option value="1">1 Download</option>
                    <option value="5">5 Downloads</option>
                    <option value="10">10 Downloads</option>
                    <option value="20">20 Downloads</option>
                </select>
            </div>

            <div className="mt-4">
                <div className="flex justify-center items-center">
                    <label className="text-lg text-gray-800 mr-2">Protect with password</label>
                    <input 
                        type="checkbox"
                        className="mt-1"
                        onChange={() => setUsePassword(!usePassword)}
                    />
                </div>
                { usePassword ? (
                    <input 
                        type="password" 
                        className="appearance-none block mt-2 bg-white border border-gray-400 text-black text-center py-3 px-4 mx-auto rounded leading-none focus:outline-none focus:border-gray-500" 
                        onChange={e => handleChangePassword(e.target.value)}
                    />
                ) : null }
            </div>
        </div>
    );
}
 
export default Form;