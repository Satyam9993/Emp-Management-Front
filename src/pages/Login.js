import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { setLogin } from '../state';
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [formdata, setFormdata] = useState({
        email: "",
        password: ""
    });


    const handleonChange = (e) => {
        setFormdata({ ...formdata, [e.target.name]: e.target.value });
    };

    const login = async () => {
        const body = {
            email: formdata.email,
            password: formdata.password
        };
        console.log(body);
        if (!formdata.email || !formdata.password) return;
        const loggedInResponse = await fetch(
            `${BACKEND_URL}/api/login`,
            {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            }
        )

        const loggedIn = await loggedInResponse.json();
        if (loggedIn) {
            dispatch(setLogin({
                user: loggedIn.user,
                token: loggedIn.token
            }))
            navigate("/");
            setFormdata({ email: "", password: "" })
        } else {
            alert("error")
        }
    }

    return (
        <div className='flex justify-center items-center h-full w-full'>
            <div className='bg-[#000226] p-5 mx-2'>
                <div className="flex flex-wrap text-gray-400">
                    <h3 className='text-gray-200'>Login</h3>
                    <div className="p-2 w-full">
                        <div className="relative">
                            <label
                                htmlFor="email"
                                className="block dark:bg-[#000226] font-medium mb-2"
                            >
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                className="w-full dark:bg-[#000226] bg-opacity-50 border-b border-gray-300 focus:border-gray-300 focus:dark:bg-[#000226] text-base outline-none text-gray-200 py-1 px-1 leading-8 transition-colors duration-200 ease-in-out"
                                onChange={handleonChange}
                                value={formdata.email}
                            />
                        </div>
                    </div>
                    <div className="p-2 w-full">
                        <div className="relative">
                            <label
                                htmlFor="password"
                                className="block font-medium mb-2"
                            >
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                className="w-full dark:bg-[#000226] bg-opacity-50 border-b border-gray-300 focus:border-gray-300 focus:dark:bg-[#000226] text-base outline-none text-gray-200 py-1 px-1 leading-8 transition-colors duration-200 ease-in-out"
                                onChange={handleonChange}
                                value={formdata.password}
                            />
                        </div>
                    </div>
                    <div className="p-2 w-full">
                        <button
                            className="text-slate-800 hover:text-blue-600 text-sm bg-white hover:bg-slate-100 border border-slate-200 rounded-lg font-medium px-4 py-2 inline-flex space-x-1 items-center"
                            onClick={login}
                        >
                            <span>Login</span>
                        </button>
                    </div>
                    <div className="p-2 w-full">
                        <Link to={'/signin'} className='text-blue-500 hover:text-blue-800'>SignIn with google</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login