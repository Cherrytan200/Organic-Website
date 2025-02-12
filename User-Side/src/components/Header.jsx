import {MdEmail} from 'react-icons/md'
import {IoMdArrowDropdown, IoMdPhonePortrait} from 'react-icons/io'
import { FaFacebook, FaGithub, FaInstagram, FaLinkedin, FaList, FaLock, FaTwitter, FaUser } from 'react-icons/fa';
import {Link, useLocation} from 'react-router-dom'
import { useState } from 'react';

export default function Header() {
    const {pathname}=useLocation();
    const [showShidebar, setShowShidebar] = useState(true);
    const user=true;
  return (
    <div className="w-full bg-white ">
        <div className="header-top bg-[#caddff] md-lg:hidden">
            <div className="w-[85%] lg:w-[90%] mx-auto">
                <div className="flex w-full justify-between items-center h-[50px] text-slate-500">
                    <ul className="flex justify-start items-center gap-8 font-semibold text-black">
                        <li className="flex relative justify-center items-center gap-2 text-sm after:absolute after:h-[18px] after:w-[1px] after:bg-[#afafaf] after:-right-[16px]">
                            <span>
                                <MdEmail/>
                                
                            </span>
                            <span>
                                support@gmail.com
                            </span>
                        </li>
                        <li className="flex relative justify-center items-center gap-2 text-sm ">
                            <span>
                                <IoMdPhonePortrait/>
                                
                            </span>
                            <span>
                               123456789
                            </span>
                        </li>
                    </ul>
                    <div>
                        <div className='flex justify-center items-center gap-10'>
                            <div className='flex justify-center items-center gap-4 text-black'>
                                <a href='#'><FaFacebook/></a>
                                <a href='#'><FaTwitter/></a>
                                <a href='#'><FaInstagram/></a>
                                <a href='#'><FaLinkedin/></a>
                                <a href='#'><FaGithub/></a>
                            </div>
                            <div className='flex group cursor-pointer text-slate-800 text-sm justify-center items-center gap-1 relative after:h-[18px] after:w-[1px] after:bg-[#afafaf] after:-right-[16px] after:absolute before:absolute before:h-[18px] before:bg-[#afafaf] before:w-[1px] before:-left-[20px]'>
                                <img src='' alt='Lan' cn/>
                                <span><IoMdArrowDropdown/></span>
                                <ul className='absolute invisible transition-all top-12 rounded-sm duration-200 text-white p-2 w-[100px] flex flex-col gap-3 group-hover:visible group-hover:top-6 group-hover:bg-black z-10 '>
                                    <li>English</li>
                                    <li>Telugu</li>
                                    <li>Hindi</li>
                                </ul>
                            </div>
                            {
                                user?<Link className="flex cursor-pointer justify-center items-center gap-2 text-sm text-black" to='/dashboard'>
                                    <span><FaUser/></span>
                                    <span>Charan Thammisetti</span>
                                </Link>:
                                <Link className="flex cursor-pointer justify-center items-center gap-2 text-sm text-black" to='/login'>
                                    <span><FaLock/></span>
                                    <span>Login</span>
                                </Link>  
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div className='w-white'>
            <div className='w-[85%] lg:w-[90%] mx-auto'>
                <div className='h-[80px] md-lg:h-[100px] flex justify-between items-center flex-wrap'>
                
                    <div className='md-lg:w-full w-3/12 md-lg:pt-4'>
                        <div className='flex justify-between items-center'>
    
                            <Link to='/'>
                                <img src="/Images/logo.png" alt="Logo"/>
                            </Link>
                            <div className='justify-center items-center w-[30px] h-[30px] bg-white text-slate-600 border border-slate-600 rounded-sm cursor-pointer lg:hidden md-lg:flex xl:hidden hidden' onClick={() => setShowShidebar(false)}>
                                <span> <FaList/> </span>
                            </div>
                        </div> 
                    </div>

                    <div className='md:lg:w-full w-9/12 '>
                        <div className='flex justify-between md-lg:justify-center items-center flex-wrap pl-8'>
                            <ul className='flex justify-start items-start gap-8 text-sm font-bold uppercase md-lg:hidden'>
                                <li>
                                    <Link className={`p-2 block ${pathname==='/' ?'text-[#059473]' : 'text-slate-600'} `}>
                                        Home
                                    </Link>
                                </li>
                                <li>
                                    <Link className={`p-2 block ${pathname==='/shop' ?'text-[#059473]' : 'text-slate-600'} `}>
                                        Shop
                                    </Link>
                                </li>
                                <li>
                                    <Link className={`p-2 block ${pathname==='/blog' ?'text-[#059473]' : 'text-slate-600'} `}>
                                        Blog
                                    </Link>
                                </li>
                                <li>
                                    <Link className={`p-2 block ${pathname==='/about' ?'text-[#059473]' : 'text-slate-600'} `}>
                                        About us
                                    </Link>
                                </li>
                                <li>
                                    <Link className={`p-2 block ${pathname==='/contact' ?'text-[#059473]' : 'text-slate-600'} `}>
                                        Contact
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>


    </div>
    
  )
}
