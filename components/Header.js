import React, { useContext, useEffect } from 'react';
import Link from 'next/link';
import authContext from '../context/auth/authContext';
import appContext from '../context/app/appContext';
import { useRouter } from 'next/router';
import Image from 'next/image'

const Header = () => {
    const AuthContext = useContext(authContext);
    const { user, logOut } = AuthContext;

    const AppContext = useContext(appContext);
    const { clearState } = AppContext;

    const router = useRouter();

    useEffect(() => {
        // Reload component and show user information c:
    }, [user]);

    const redirect = () => {
        clearState();
        router.push('/');
    }

    return ( 
        <header className="py-8 flex flex-col md:flex-row items-center justify-between">
            <Image 
                className="w-64 mb-8 md:mb-0" 
                src="/logo.svg"
                alt="Logo"
                width={240}
                height={80}
                onClick={() => redirect()}
            />

            <div>
                {
                    user ? (
                        <div className="flex items-center">
                            <p className="mr-4 font-bold">Hi {user.name} !</p>
                            <button
                                type="button"
                                className="bg-black px-5 py-3 rounded-lg text-white font-bold uppercase"
                                onClick={() => logOut()}
                                >Log Out</button>
                        </div>
                    ) : (
                        <>
                            <Link href="/sign-in">
                                <a className="bg-red-500 px-5 py-3 rounded-lg text-white font-bold uppercase mr-2">Sign In</a>
                            </Link>
                            <Link href="/sign-up">
                                <a className="bg-black px-5 py-3 rounded-lg text-white font-bold uppercase">Sign Up</a>
                            </Link>
                        </>
                    )
                }
            </div>
        </header>
    );
}
 
export default Header;