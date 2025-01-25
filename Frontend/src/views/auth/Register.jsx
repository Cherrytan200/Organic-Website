
import { Link } from 'react-router-dom'
import {FaGoogle} from 'react-icons/fa'
import { FaFacebook } from 'react-icons/fa'
export default function Register() {
  return (
    <div className='min-w-screen min-h-screen bg-[#cdcae9] flex justify-center items-center'>
        <div className='w-[350px] text-[#ffffff] p-2'>
            <div className='bg-[#6f68d1] p-4 rounded-md'>
                <h2 className='text-xl mb-3 font-bold'>
                    Welcome to Ecommerce
                </h2>
                <p className='text-sm mb-3 font-medium'>Please Register your account</p>
                <form className='placeholder-white-700' action=''>
                    <div className='flex flex-col w-full gap-1 mb-3'>
                        <label htmlFor='name'>Name</label>
                        <input className='px-3 py-2 outline-none border border-slate-700 bg-transparent rounded-md placeholder-white-700' type='text' name='name' placeholder='Name' id='name' required/>
                    </div>
                    <div className='flex flex-col w-full gap-1 mb-3'>
                        <label htmlFor='email'>Email</label>
                        <input className='px-3 py-2 outline-none border border-slate-700 bg-transparent rounded-md placeholder-white-700' type='text' name='email' placeholder='email' id='email' required/>
                    </div>
                    <div className='flex flex-col w-full gap-1 mb-3'>
                        <label htmlFor='password'>Password</label>
                        <input className='px-3 py-2 outline-none border border-slate-700 bg-transparent rounded-md placeholder-white-700' type='text' name='password' placeholder='Password' id='password' required/>
                    </div>

                    <div className='flex items-center w-full gap-3 mb-3'>
                        <input type='checkbox' name='checkbox' id='checkbox' className='text-blue-600 overflow-hidden bg-gray-200 rounded border-gray-300 focus:ring-blue-500' />
                        <label htmlFor='checkbox'>I agree to privacy policy & terms</label>

                    </div>
                    <button className='bg-slate-800 w-full hover:shadow-blue-300/50 hover:shadow-lg text-white rounded-md px-7 py-2 mb-3'>Sign Up</button>
                    <div className='flex items-center mb-3 gap-3 justify-center'>
                        <p>Already Have an account ? <Link className='font-bold' to='/login'>Signin</Link></p>
                    </div>
                    <div className='w-full flex justify-center items-center mb-3'>
                        <div className='w-[45%] bg-slate-700 h-[1px]'> </div>
                        <div className='w-[10%] flex justify-center items-center'>
                            <span className='pb-1'>Or</span>
                        </div>
                        <div className='w-[45%] bg-slate-700 h-[1px]'></div>

                    </div>
                    <div className='flex justify-center items-center gap-3'>
                        <div className='w-[135px] h-[35px] flex rounded-md bg-orange-500 shadow-lg hover:shadow-orange-700/50 justify-center cursor-pointer items-center overflow-hidden'>
                            <span><FaGoogle/></span>
                        </div>
                        <div className='w-[135px] h-[35px] flex rounded-md bg-blue-600 shadow-lg hover:shadow-blue-700/50 justify-center cursor-pointer items-center overflow-hidden'>
                            <span><FaFacebook/></span>
                        </div>
                    </div>
                </form>
                
            </div>

        </div>
    </div>
  )
}
