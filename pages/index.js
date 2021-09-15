import React, { useContext, useEffect } from 'react';
import Layout from '../components/Layout';
import Alert from '../components/Alert';
import authContext from '../context/auth/authContext';
import appContext from '../context/app/appContext';
import Link from 'next/link';
import Dropzone from '../components/Dropzone';
import { useRouter } from 'next/router';

const Index = () => {
  const AuthContext = useContext(authContext);
  const { authenticatedUser } = AuthContext;

  const AppContext = useContext(appContext);
  const { file_message, url, clearState } = AppContext;

  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if(token) authenticatedUser();
    // eslint-disable-next-line
  }, []);

  const redirect = () => {
    clearState();
    router.push('/');
  }

  return ( 
    <Layout>
      <div className="md:w-4/5 xl:w-3/5 mx-auto mb-32 text-center">

          { url ? (
              <>
                <p className="text-center text-2xl mt-10">
                  <span className="font-bold text-red-700 text-3xl uppercase">Your URL is:</span> {`${process.env.frontendURL}/links/${url}`}
                </p>
                <button
                  type="button"
                  className="bg-red-500 hover:bg-gray-900 px-12 py-2 text-white uppercase font-bold mt-5 block mx-auto"
                  onClick={() => navigator.clipboard.writeText(`${process.env.frontendURL}/links/${url}`)}
                >Copy Link</button>
                <button
                  type="button"
                  className="bg-blue-500 hover:bg-gray-900 px-12 py-2 text-white uppercase font-bold mt-5 block mx-auto"
                  onClick={() => redirect() }
                >Upload another file</button>
              </>
          ) : (
            <>
              { file_message && <Alert /> }

              <div className="lg:flex md:shadow-lg p-5 bg-white rounded-lg py-10">
                <Dropzone />
    
                <div className="md:flex-1 mb-3 mx-2 mt-16 lg:mt-0">
                  <h2 className="text-4xl font-sans font-bold text-gray-800 my-4">Share files easily and privately</h2>
                  <p className="text-lg leading-loose">
                    <span className="text-red-500 font-bold">ReactNodeSend </span> 
                    allows you to share files with end-to-end encryption and a file that is deleted after it is downloaded. 
                    So you can keep what you share private and make sure your stuff doesn&apos;t stay online forever.
                  </p>
                  <Link href="/sign-up">
                    <a className="text-red-500 font-bold text-lg hover:text-red-700">Create an account to get more benefits c:</a>
                  </Link>
                </div>
              </div>
            </>
          )}


      </div>
    </Layout>
  );
}

export default Index;