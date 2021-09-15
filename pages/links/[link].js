import Layout from '../../components/Layout';
import clientAxios from '../../config/axios';
import React, { useState, useContext } from 'react';
import appContext from '../../context/app/appContext';
import Alert from '../../components/Alert';

export async function getServerSideProps({params}) {
    const { link } = params;

    const response = await clientAxios.get(`/api/links/${link}`);

    return {
        props: {
            link: response.data
        }
    }
}

export async function getServerSidePaths() {
    const links = await clientAxios.get('/api/links');
    // console.log(links);
    return {
        paths: links.data.links.map( link => ({
            params: { link: link.url }
        })),
        fallback: false
    }
}

const Link = ({link}) => {

    const AppContext = useContext(appContext);
    const { file_message, showAlert } = AppContext;

    const [usePassword, setUsePassword] = useState(link.password);
    const [password, setPassword] = useState('');

    const verifyPassword = async (e) => {
        e.preventDefault();

        const data = {
            password
        }

        try {
            const response = await clientAxios.post(`/api/links/${link.url}`, data);
            if(!response.data.error) {
                setUsePassword(false);
            }
        } catch (error) {
            showAlert(error.response.data.msg);
        }
    }

    // I need to hit the backendURL because the files are there and it is running on another port :c
    return ( 
        <Layout>
        { 
            usePassword ? (
            <>
                <p className="text-center">This link is password protected, put it in the form</p>
    
                { file_message && <Alert /> }

                <div className="flex justify-center mt-5">
                    <div className="w-full max-w-lg">
                        <form 
                            className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4"
                            onSubmit={e => verifyPassword(e)}
                        >
                            <div className="mb-4">
                                <label
                                    className="block text-black text-sm font-bold mb-2"
                                    htmlFor="password"
                                >Password</label>
                                <input 
                                    type="password"
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="password"
                                    name="password"
                                    placeholder="Link password"
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                />
                            </div>

                            <input 
                                type="submit"
                                className="bg-red-500 hover:bg-gray-900 w-full p-2 text-white uppercase font-bold"
                                value="Verify Password"
                            />
                        </form>
                    </div>
                </div>
            </>    
        ) : (
            <>
                <h1 className="text-4xl text-center text-gray-700">Download your file:</h1>
                <div className="flex items-center justify-center mt-10">
                    <a href={`${process.env.backendURL}/api/files/${link.file}`} className="bg-red-500 text-center px-10 py-3 rounded uppercase font-bold text-white cursor-pointer">Click Here</a>
                </div>
            </>
        )}
        </Layout>
    );
}

export default Link;