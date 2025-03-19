import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getNav } from "../navigation/index.js";
import { BiLogOutCircle } from "react-icons/bi";
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from "react-redux";
import { logout } from '../store/Reducers/authReducer.js';

export default function Sidebar({showSidebar, setShowSidebar}) {
  const dispatch = useDispatch();
  const {role} = useSelector(state => state.auth);
  const navigate = useNavigate();
  const {pathname} = useLocation();
  const [allNav, setAllNav] = useState([]);

  useEffect(() => {
    const navs = getNav(role);
    setAllNav(navs);
  }, [role]);

  return (
    <div>
      {/* Overlay */}
      <div 
        onClick={() => setShowSidebar(false)} 
        className={`fixed duration-300 ${!showSidebar ? 'invisible opacity-0' : 'opacity-100 visible'} 
        w-screen h-screen bg-[#1E1E1E]/20 backdrop-blur-sm top-0 left-0 z-40`}
      />

      {/* Sidebar */}
      <div className={`w-[260px] fixed bg-white z-40 top-[70px] h-[calc(100vh-70px)] shadow-lg
        transition-all duration-300 ease-in-out
        ${showSidebar ? 'left-0' : '-left-[260px] lg:left-0'}`}>
        
        {/* Decorative Top Pattern */}
        <div className="absolute top-0 left-0 right-0 h-24 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-[#4CAF50]/10 to-[#81C784]/10">
            <svg className="absolute left-0 top-0 opacity-[0.03]" viewBox="0 0 200 200">
              <path fill="#4CAF50" d="M44.5,-76.3C59.1,-69.9,73.3,-60.1,79.9,-46.3C86.5,-32.5,85.5,-14.7,83.3,2.2C81.1,19.1,77.7,35.1,69.3,48.5C60.9,61.9,47.5,72.7,32.4,77.7C17.3,82.7,0.4,81.9,-15.6,77.4C-31.6,73,-46.7,65,-59.4,53.3C-72.1,41.6,-82.4,26.2,-85.9,9C-89.4,-8.2,-86,-27.2,-76.6,-42.1C-67.2,-57,-51.8,-67.8,-36.3,-73.8C-20.8,-79.8,-5.2,-81,8.7,-77.8C22.7,-74.6,29.9,-82.7,44.5,-76.3Z" transform="translate(100 100)" />
            </svg>
          </div>
        </div>

        {/* Navigation Menu */}
        <div className="px-4 py-6">
          <ul className="space-y-1.5">
            {allNav.map((n, i) => (
              <li key={i}>
                <Link 
                  to={n.path} 
                  className={`
                    relative group flex items-center gap-3 px-4 py-3 rounded-xl
                    font-medium transition-all duration-300
                    ${pathname === n.path 
                      ? 'text-white bg-gradient-to-r from-[#4CAF50] to-[#81C784] shadow-lg shadow-green-500/30'
                      : 'text-gray-600 hover:text-[#4CAF50] hover:bg-[#4CAF50]/5'
                    }
                  `}
                >
                  {/* Icon Background Glow */}
                  {pathname === n.path && (
                    <div className="absolute left-3 w-8 h-8 bg-white/20 rounded-lg blur-sm"></div>
                  )}
                  
                  {/* Icon */}
                  <span className={`relative text-xl ${pathname === n.path ? 'animate-pulse' : 'group-hover:scale-110 transition-transform duration-300'}`}>
                    {n.icon}
                  </span>
                  
                  {/* Text */}
                  <span className="relative text-sm font-medium">
                    {n.title}
                  </span>

                  {/* Active Indicator */}
                  {pathname === n.path && (
                    <div className="absolute right-4 w-2 h-2 rounded-full bg-white animate-pulse"></div>
                  )}
                </Link>
              </li>
            ))}

            {/* Logout Button */}
            <li>
              <button 
                onClick={() => dispatch(logout({navigate, role}))} 
                className="w-full group flex items-center gap-3 px-4 py-3 rounded-xl
                  text-gray-600 hover:text-red-500 hover:bg-red-50
                  font-medium transition-all duration-300"
              >
                <span className="text-xl group-hover:rotate-12 transition-transform duration-300">
                  <BiLogOutCircle/>
                </span>
                <span className="text-sm">Logout</span>
              </button>
            </li>
          </ul>
        </div>

        {/* Decorative Bottom Pattern */}
        <div className="absolute bottom-0 left-0 right-0 h-32 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-[#4CAF50]/5 to-[#81C784]/5">
            <svg className="absolute right-0 bottom-0 opacity-[0.03] rotate-180" viewBox="0 0 200 200">
              <path fill="#4CAF50" d="M39.5,-65.3C50.9,-59.8,59.7,-48.3,65.9,-35.4C72.1,-22.4,75.7,-8,74.7,6.1C73.7,20.2,68,34,59.3,45.7C50.6,57.4,38.8,67,25.3,72.3C11.9,77.6,-3.2,78.6,-17.4,74.8C-31.6,71,-44.9,62.4,-54.4,51.1C-63.9,39.8,-69.5,25.8,-72.5,10.8C-75.4,-4.2,-75.6,-20.2,-69.7,-33.5C-63.8,-46.8,-51.7,-57.4,-38.5,-62C-25.3,-66.6,-11.1,-65.2,2,-68.4C15.2,-71.5,28.1,-70.8,39.5,-65.3Z" transform="translate(100 100)" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

Sidebar.propTypes = {
  showSidebar: PropTypes.bool.isRequired,
  setShowSidebar: PropTypes.func.isRequired,
};