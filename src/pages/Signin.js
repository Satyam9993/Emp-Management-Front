import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const Login = () => {
    const navigate = useNavigate();

    const [formdata, setFormdata] = useState({
        email: "",
        password: "",
        picture: "",
        name: ""
    });
    const [isemailfetcjed, setIsemailfetcjed] = useState(false)


    useEffect(() => {
        /* global google*/
        google.accounts.id.initialize({
            client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
            callback: handleCallbackResp
        })

        google.accounts.id.renderButton(
            document.getElementById("SiginDiv"),
            { theme: "outline", size: "large" }
        )

    }, [])



    const handleCallbackResp = (responce) => {
        const userObject = jwt_decode(responce.credential)
        if (!userObject.email_verified) {
            window.confirm("Plz sigin first")
            return;
        }
        setFormdata({
            email: userObject.email,
            password: "",
            picture: userObject.picture,
            name: userObject.name
        });
        setIsemailfetcjed(true)
    }

    const handleonChange = (e) => {
        setFormdata({ ...formdata, [e.target.name]: e.target.value });
    };

    const signin = async () => {
        const body = {
            email: formdata.email,
            password: formdata.password,
            name : formdata.name,
            picture : formdata.picture
        };
        if (!formdata.email || !formdata.password || !formdata.name) return;
        const loggedInResponse = await fetch(
            `${BACKEND_URL}/api/signin`,
            {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            }
        )

        const signin = await loggedInResponse.json();
        if (!signin.error) {
            navigate("/login");
            setFormdata({ email: "", password: "", name : "", picture : "" })
        } else {
            window.confirm(signin.error)
            navigate("/login");
        }
    }

    return (
        <div className='flex justify-center items-center h-full w-full'>
            <div className='bg-[#000226] p-5 mx-2'>
                {isemailfetcjed ?
                    <div className="flex flex-wrap text-gray-400">
                        <h3 className='text-gray-200'>Set Password to Sigin</h3>
                        <div className="p-2 w-full">
                            <div className="flex justify-center items-center">
                                <img src={formdata.picture} className='h-24 w-24 rounded-full' />
                            </div>
                            <div>
                                <p className="block dark:bg-[#000226] font-medium mb-2 text-center">
                                    Profile Image
                                </p>
                            </div>
                        </div>
                        <div className="p-2 w-full">
                            <div className="relative">
                                <label
                                    htmlFor="name"
                                    className="block dark:bg-[#000226] font-medium mb-2"
                                >
                                    Name
                                </label>
                                <input
                                    type="name"
                                    id="name"
                                    name="name"
                                    className="w-full dark:bg-[#000226] bg-opacity-50 border-b border-gray-300 focus:border-gray-300 focus:dark:bg-[#000226] text-base outline-none text-gray-200 py-1 px-1 leading-8 transition-colors duration-200 ease-in-out"
                                    value={formdata.name}
                                    disabled={true}
                                />
                            </div>
                        </div>
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
                                    value={formdata.email}
                                    disabled={true}
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
                                onClick={signin}
                            >
                                <span>Login</span>
                            </button>
                        </div>
                    </div> :
                    <div className="flex flex-wrap text-gray-400 p-10 m-10">
                        <div id="SiginDiv"></div>
                    </div>
                }
            </div>
        </div>
    )
}

export default Login