import { FaEdit, FaImages } from "react-icons/fa";
import {FadeLoader} from 'react-spinners'
export default function Profile() {
    const loader=true;
    const image=true;
    const status='active'
    const userInfo=false;

  return (
    <div className="px-2 lg:px-7 py-5">
        <div className="w-full flex flex-wrap">
            <div className="w-full md:w-6/12">
                <div className="w-full p-4 bg-[#6a5fdf] rounded-md text-[#d0d2d6]">
                    <div className="flex justify-center items-center py-3">
                        {
                            !image ?<label className="flex justify-center items-center flex-col h-[150px] w-[200px] cursor-pointer border border-dashed hover:border-red-500 border-[#d0d2d6] relative " htmlFor="img">
                                <span><FaImages/></span>
                                <span>Select Image</span>
                                {
                                    loader && <div className="bg-slate-600 absolute left-0 top-0 w-full h-full opacity-70 flex justify-center items-center z-20">
                                        <span>
                                            <FadeLoader/>
                                        </span>
                                    </div>
                                }
                                
                            </label>:<label htmlFor="img" className="h-[150px] w-[200px] relative p-3 cursor-pointer overflow-hidden">
                                <img src="/Images/Profiles/user.png" alt="Seller Image"/>
                                {
                                    !loader && <div className="bg-slate-600 absolute left-0 top-0 w-full h-full opacity-70 flex justify-center items-center z-20">
                                        <span>
                                            <FadeLoader/>
                                        </span>
                                    </div>
                                }
                                
                            </label>
                        }
                        <input type="file" className="hidden" id="img"/>
                    </div>

                    <div className="px-0 md:px-5 py-2 ">
                        <div className="flex justify-between text-sm flex-col gap-2 p-4 bg-slate-800 rounded-md relative">
                            <span className="p-[6px] bg-yellow-400 rounded hover:shadow-lg hover:shadow-yellow-500/50 absolute right-2 top-2 cursor-pointer"><FaEdit/></span>
                            <div className="flex gap-2">
                                <span>Name : </span>
                                <span>Intiyaz Shaik</span>
                            </div>
                            <div className="flex gap-2">
                                <span>Email : </span>
                                <span>shaikintiyaz@gmail.com</span>
                            </div>
                            <div className="flex gap-2">
                                <span>Role : </span>
                                <span>Seller</span>
                            </div>
                            <div className="flex gap-2">
                                <span>Status : </span>
                                <span>Active</span>
                            </div>
                            <div className="flex gap-2">
                                <span>Payment Account : </span>
                                <p>
                                    {
                                        status ==='active'?<span className="bg-green-500 text-white text-xs cursor-pointer font-normal ml-2 px-2 py-0.5 rounded">Pending</span>
                                        : <span className="bg-blue-500 text-white text-xs cursor-pointer font-normal ml-2 px-2 py-0.5 rounded">Click Active</span>
                                    }
                                </p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="px-0 md:px-5 py-2">
                        {
                            !userInfo ? <form>

                                <div className='flex flex-col w-full gap-1 mb-2'>
                                    <label htmlFor='Shop'>Shop Name</label>
                                    <input  className='px-4 py-2 focus:border-indigo-200 outline-none bg-[#6a5fdf] border-slate-700 rounded-md text-[#ecedef]' type='text' name='shopName' id='Shop' placeholder='Enter Shop Name'/>
                                </div>

                                <div className='flex flex-col w-full gap-1 mb-2'>
                                    <label htmlFor='division'>Address</label>
                                    <input  className='px-4 py-2 focus:border-indigo-200 outline-none bg-[#6a5fdf] border-slate-700 rounded-md text-[#ecedef]' type='text' name='division' id='division' placeholder='Enter your Adress'/>
                                </div>

                                <div className='flex flex-col w-full gap-1 mb-2'>
                                    <label htmlFor='district'>District Name</label>
                                    <input  className='px-4 py-2 focus:border-indigo-200 outline-none bg-[#6a5fdf] border-slate-700 rounded-md text-[#ecedef]' type='text' name='district' id='district' placeholder='Enter your District'/>
                                </div>

                                <div className='flex flex-col w-full gap-1 mb-2'>
                                    <label htmlFor='state'>State</label>
                                    <input  className='px-4 py-2 focus:border-indigo-200 outline-none bg-[#6a5fdf] border-slate-700 rounded-md text-[#ecedef]' type='text' name='state' id='state' placeholder='Enter Your State'/>
                                </div>

                                <div className='flex flex-col w-full gap-1 mb-2'>
                                    <label htmlFor='pin'>Pincode</label>
                                    <input  className='px-4 py-2 focus:border-indigo-200 outline-none bg-[#6a5fdf] border-slate-700 rounded-md text-[#ecedef]' type='number' name='pincode' id='pin' placeholder='Enter Your Pincode'/>
                                </div>

                                <button className="bg-red-500  hover:shadow-red-500/40 hover:shadow-md text-white rounded-md px-7 py-2 my-2">
                                    Save Changes
                                </button>

                            </form> :   <div className="flex justify-between text-sm flex-col gap-2 p-4 bg-slate-800 rounded-md relative">
                                <span className="p-[6px] bg-yellow-400 rounded hover:shadow-lg hover:shadow-yellow-500/50 absolute right-2 top-2 cursor-pointer"><FaEdit/></span>
                                <div className="flex gap-2">
                                    <span>Shop Name : </span>
                                    <span>Organic Store</span>
                                </div>
                                <div className="flex gap-2">
                                    <span>Address : </span>
                                    <span>Venkayapalli</span>
                                </div>
                                <div className="flex gap-2">
                                    <span>District : </span>
                                    <span>Kurnool</span>
                                </div>
                                <div className="flex gap-2">
                                    <span>State : </span>
                                    <span>Andhra Pradesh</span>
                                </div>
                                
                            </div>
                        }
                    </div>

                </div>
            </div>
            <div className="w-full md:w-6/12">
                <div className="w-full pl-0 md-pl-7 mt-6 md:mt-0">
                <div className=" bg-[#6a5fdf] rounded-md text-[#d0d2d6] p-4 ">
                <h2 className="text-[#d0d2d6] text-lg mb-3 font-semibold">Change Password</h2>
                    <form>

                        <div className='flex flex-col w-full gap-1 mb-2'>
                            <label htmlFor='email'>Email</label>
                            <input  className='px-4 py-2 focus:border-indigo-200 outline-none bg-[#6a5fdf] border-slate-700 rounded-md text-[#ecedef]' type='text' name='email' id='email' placeholder='Enter  your email'/>
                        </div>

                        <div className='flex flex-col w-full gap-1 mb-2'>
                            <label htmlFor='o_password'>Old Password</label>
                            <input  className='px-4 py-2 focus:border-indigo-200 outline-none bg-[#6a5fdf] border-slate-700 rounded-md text-[#ecedef]' type='password' name='old_password' id='o_password' placeholder='Enter Old Password'/>
                        </div>

                        <div className='flex flex-col w-full gap-1 mb-2'>
                            <label htmlFor='n_password'>New Password</label>
                            <input  className='px-4 py-2 focus:border-indigo-200 outline-none bg-[#6a5fdf] border-slate-700 rounded-md text-[#ecedef]' type='password' name='new_password' id='n_password' placeholder='Enter New Password'/>
                        </div>

                        

                        <button className="bg-red-500  hover:shadow-red-500/40 hover:shadow-md text-white rounded-md px-7 py-2 my-2">
                            Save Changes
                        </button>

                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
