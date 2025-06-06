import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { PropagateLoader } from 'react-spinners';
import { messageClear, seller_register } from '../../store/Reducers/authReducer';
import toast from 'react-hot-toast';
import { FaEnvelope, FaLock, FaUser, FaGoogle, FaFacebookF } from 'react-icons/fa'

export default function Register() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { loader, successMessage, errorMessage } = useSelector(state => state.auth)
    const [state, setState] = useState({
        name: "",
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
        dispatch(seller_register(state))
    }

    useEffect(() => {
        if (errorMessage) {
            toast.error(errorMessage)
            dispatch(messageClear())
        }
        if (successMessage) {
            toast.success(successMessage)
            dispatch(messageClear())
            navigate('/');
        }
    }, [successMessage, errorMessage])

    return (
        <div className='min-h-screen bg-gradient-to-br from-[#ffffff] to-[#f3f3f3] flex justify-center items-center px-4'>
            <div className='w-full max-w-md'>
                <div className='bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] p-8'>
                    <div className="mb-8">
                        <h2 className='text-3xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-red-500 mb-3'>
                            Create Account
                        </h2>
                        <p className='text-gray-500 text-center'>
                            Join our community today
                        </p>
                    </div>

                    <form onSubmit={submit} className="space-y-6">
                        <div>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <FaUser className="text-gray-400" />
                                </div>
                                <input
                                    type='text'
                                    name='name'
                                    value={state.name}
                                    onChange={inputHandle}
                                    placeholder='Full Name'
                                    className='w-full pl-12 pr-4 py-3 rounded-xl border bg-gray-50 focus:bg-white border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all duration-300 outline-none'
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <FaEnvelope className="text-gray-400" />
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
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <FaLock className="text-gray-400" />
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

                        <div className='flex items-center'>
                            <input
                                type='checkbox'
                                id='terms'
                                className='w-4 h-4 text-orange-500 rounded border-gray-300 focus:ring-orange-500/20'
                                required
                            />
                            <label htmlFor='terms' className='ml-2 text-sm text-gray-500'>
                                I agree to the Terms of Service and Privacy Policy
                            </label>
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
                                        <span className="relative">Sign Up</span>
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

                        <div className='flex items-center justify-center gap-2 text-sm text-gray-500'>
                            <span>Already have an account?</span>
                            <Link
                                to='/login'
                                className="font-semibold text-orange-500 hover:text-red-500 transition-colors duration-300"
                            >
                                Sign In
                            </Link>
                        </div>

                        <div className='relative flex items-center justify-center'>
                            <div className='flex-grow border-t border-gray-200'></div>
                            <span className='flex-shrink mx-4 text-gray-400'>or continue with</span>
                            <div className='flex-grow border-t border-gray-200'></div>
                        </div>

                        <div className='flex justify-center gap-4'>
                            <button
                                type="button"
                                className="p-3 rounded-lg bg-white border border-gray-200 hover:bg-gray-50 hover:shadow-lg hover:border-gray-300 transition-all duration-300 group"
                            >
                                <FaGoogle className="w-6 h-6 text-[#EA4335] group-hover:scale-110 transition-transform duration-300" />
                            </button>
                            <button
                                type="button"
                                className="p-3 rounded-lg bg-white border border-gray-200 hover:bg-gray-50 hover:shadow-lg hover:border-gray-300 transition-all duration-300 group"
                            >
                                <FaFacebookF className="w-6 h-6 text-[#1877F2] group-hover:scale-110 transition-transform duration-300" />
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}