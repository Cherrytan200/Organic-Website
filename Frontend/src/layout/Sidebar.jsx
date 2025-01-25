import { useEffect, useState } from "react";
import { Link,useLocation } from "react-router-dom";
import { getNav } from "../navigation";
import { BiLogOutCircle } from "react-icons/bi";


export default function Sidebar() {
  const pathName=useLocation();
  const [allNav,setAllNav]=useState([]);
  useEffect(()=>{
    const navs=getNav('admin')
    setAllNav(navs)
  },[])
  console.log(pathName);
  console.log(allNav);
  return (
    <div>
      <div>

      </div>
      <div className={`w-[260px] fixed bg-[#e6e7fb] z-50 top-0 h-screen shadow-[0_0_15px_0_rgb(34_41_47_/_5%)] transition-all`}>
        <div className='h-[70px] flex justify-center items-center'>
          <Link to='/' className="w-[180px] h-[50px]">
            <img className="w-full h-full" src="../../public/Images/Logo2.jpg" alt="Logo"/>
          </Link>
        </div>
        <div className="px-[16px]">
            <ul>
              {
                allNav.map((n,i)=><li key={i}>
                <Link to={n.path} className={`${pathName.pathname===n.path ? 'bg-blue-600 shadow-indigo-500/50 text-white duration-500':'text-[#030811] font-bold duration-200'} px-[12px] py-[9px] rounded-sm flex justify-start items-center gap-[12px] hover:pl-4 transition-all w-full mb-1`}>
                  <span>{n.icon}</span>
                  <span>{n.title}</span>
                </Link>
                  
                </li>
                )
              }
              <li>
                <button className='text-[#030811] font-bold duration-200 px-[12px] py-[9px] rounded-sm flex justify-start items-center gap-[12px] hover:pl-4 transition-all w-full mb-1'>
                    <span><BiLogOutCircle/></span>
                    <span>Logout</span>
                </button>
              </li>
            </ul>
        </div>
      </div>
    </div>
  )
}
