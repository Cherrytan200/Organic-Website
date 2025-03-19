import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { admin_login, messageClear } from '../../store/Reducers/authReducer.js';
import { PropagateLoader } from 'react-spinners';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import { BiShieldQuarter } from 'react-icons/bi';

export default function AdminLogin() {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const { loader, errorMessage, successMessage } = useSelector(state => state.auth);

    const [state, setState] = useState({
        email: "",
        password: ""
    })

    const inputHandle = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    }

    const submit = (e) => {
        e.preventDefault()
        dispatch(admin_login(state))
    }

    useEffect(() => {
        if (errorMessage) {
            toast.error(errorMessage)
            dispatch(messageClear())
        }
        if (successMessage) {
            toast.success(successMessage)
            dispatch(messageClear())
            navigate("/");
        }
    }, [errorMessage, successMessage]);

    return (
        <div className='min-h-screen bg-gradient-to-br from-[#ffffff] to-[#f3f3f3] flex justify-center items-center px-4'>
            <div className='w-full max-w-md'>
                <div className='bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] p-8'>
                    <div className="mb-8 flex flex-col items-center">
                        <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center mb-4 shadow-lg">
                            <BiShieldQuarter className="w-10 h-10 text-white" />
                        </div>
                        <h2 className='text-3xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-red-500 mb-2'>
                            Admin Portal
                        </h2>
                        <p className='text-gray-500 text-center'>
                            Sign in to your admin account
                        </p>
                    </div>

                    <form onSubmit={submit} className="space-y-6">
                        <div>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <FaEnvelope className="text-gray-400 group-focus-within:text-orange-500 transition-colors duration-300" />
                                </div>
                                <input
                                    type='email'
                                    name='email'
                                    value={state.email}
                                    onChange={inputHandle}
                                    placeholder='Email address'
                                    className='w-full pl-12 pr-4 py-3 rounded-xl border bg-gray-50 focus:bg-white border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all duration-300 outline-none'
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <FaLock className="text-gray-400 group-focus-within:text-orange-500 transition-colors duration-300" />
                                </div>
                                <input
                                    type='password'
                                    name='password'
                                    value={state.password}
                                    onChange={inputHandle}
                                    placeholder='Password'
                                    className='w-full pl-12 pr-4 py-3 rounded-xl border bg-gray-50 focus:bg-white border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all duration-300 outline-none'
                                    required
                                />
                            </div>
                        </div>

                        <button
                            disabled={loader}
                            type="submit"
                            className="w-full relative inline-flex items-center justify-center px-8 py-3 overflow-hidden text-white bg-gradient-to-r from-orange-500 to-red-500 rounded-xl group focus:ring-2 focus:ring-orange-500/20 focus:outline-none transition-all duration-300 hover:shadow-[0_10px_40px_-10px_rgba(249,115,22,0.5)]"
                        >
                            <div className="relative flex items-center gap-2">
                                {loader ? (
                                    <PropagateLoader color='#ffffff' cssOverride={{ height: '20px' }} />
                                ) : (
                                    <>
                                        <span className="relative">Sign In</span>
                                        <svg
                                            className="w-5 h-5 transition-transform group-hover:translate-x-1"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M13 7l5 5m0 0l-5 5m5-5H6"
                                            />
                                        </svg>
                                    </>
                                )}
                            </div>
                        </button>

                        <div className="text-center">
                            <p className="text-sm text-gray-500">
                                This portal is restricted to authorized administrators only.
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}