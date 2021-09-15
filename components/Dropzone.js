import React, { useCallback, useContext } from 'react';
import { useDropzone } from 'react-dropzone';
import appContext from '../context/app/appContext';
import authContext from '../context/auth/authContext';
import Form from './Form';

const Dropzone = () => {

    const AppContext = useContext(appContext);
    const { loading, showAlert, uploadFile, createLink } = AppContext;

    const AuthContext = useContext(authContext);
    const { authenticated } = AuthContext;

    const onDropAccepted = useCallback( async (dropedFile) => {
        // Create a form data
        const formData = new FormData();
        formData.append('file', dropedFile[0]);
        const originalName = dropedFile[0].path;
        uploadFile(formData, originalName);
    }, []);

    const onDropRejected = () => {
        showAlert('Oops! The file exceeds 1MB');
    }

    // Extract react-dropzone functions from the hook
    const { getRootProps, getInputProps, isDragActive, acceptedFiles } = useDropzone({onDropAccepted, onDropRejected, maxSize: 1000000});
    
    const files = acceptedFiles.map(file => (
        <li key={file.lastModified} className="bg-white flex-1 p-3 mb-4 shadow-lg rounded">
            <p className="font-bold text-xl">{file.path}</p>
            <p className="text-sm -text-gray-500">{ (file.size / Math.pow(1024, 2)).toFixed(2) } MB</p>
        </li>
    ));

    return ( 
        <div className="md:flex-1 sm:py-12 mb-3 mx-2 mt-8 lg:mt-0 flex flex-col items-center justify-center border-dashed border-gray-400 border-2 bg-gray-100">
            {
                acceptedFiles.length > 0 ? (
                    <div className="mt-10 w-full">
                        <h4 className="text-2xl font-bold text-center mb-4">Files</h4>
                        <ul>
                            {files}
                        </ul>

                        {
                            authenticated ? <Form /> : ''
                        }


                        { loading ? (
                            <p className="my-10 text-center text-gray-700">Uploading file...</p>
                        ) : (
                            <button
                                type="button"
                                className="bg-blue-700 px-7 py-3 rounded-lg text-white my-10 hover:bg-blue-800"
                                onClick={() => createLink() }
                            >Create Link</button>
                        )}

                    </div>
                ) : (
                    <div { ...getRootProps({ className: 'dropzone w-full py-32' })} >
                        <input className="h-100" { ...getInputProps() } />
                        {
                            isDragActive ? (
                                <p className="text-2xl text-center text-gray-600">
                                    Come on! Drop the file
                                </p>
                            ) : (
                                <div className="text-center">
                                    <p className="text-2xl text-center text-gray-600">Select the file or drop here</p>
                                    <button className="bg-blue-700 px-5 py-3 rounded-lg text-white my-10 hover:bg-blue-800" type="button">
                                        Select files to upload
                                    </button>
                                </div>
                            )
                        }
                    </div>
                )
            }
            

        </div>
    );
}
 
export default Dropzone;