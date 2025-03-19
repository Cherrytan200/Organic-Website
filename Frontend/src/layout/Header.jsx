import PropTypes from 'prop-types';
import { FaList, FaBell, FaRegEnvelope, FaSearch } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';

export default function Header({showSidebar, setShowSidebar}) {
  const {userInfo} = useSelector(state => state.auth);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-[70px] bg-gradient-to-br from-[#f0f9ff] to-[#f8f9fa]">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/95 to-white/90 backdrop-blur-xl"></div>
        <div className="absolute top-0 left-0 w-full h-full">
          <svg className="absolute left-0 top-0 opacity-[0.03] animate-pulse" viewBox="0 0 200 200">
            <path fill="#4CAF50" d="M44.5,-76.3C59.1,-69.9,73.3,-60.1,79.9,-46.3C86.5,-32.5,85.5,-14.7,83.3,2.2C81.1,19.1,77.7,35.1,69.3,48.5C60.9,61.9,47.5,72.7,32.4,77.7C17.3,82.7,0.4,81.9,-15.6,77.4C-31.6,73,-46.7,65,-59.4,53.3C-72.1,41.6,-82.4,26.2,-85.9,9C-89.4,-8.2,-86,-27.2,-76.6,-42.1C-67.2,-57,-51.8,-67.8,-36.3,-73.8C-20.8,-79.8,-5.2,-81,8.7,-77.8C22.7,-74.6,29.9,-82.7,44.5,-76.3Z" transform="translate(100 100)" />
          </svg>
        </div>
      </div>

      {/* Header Content */}
      <div className="relative h-full px-4 lg:px-6">
        <div className="flex items-center justify-between h-full">
          {/* Left Section - Logo and Menu */}
          <div className="flex items-center gap-4 min-w-[200px]">
            {/* Logo */}
            <Link to="/" className="relative group flex items-center p-2">
              <div className="absolute inset-0 bg-gradient-to-r from-[#4CAF50]/20 to-[#81C784]/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <img 
                src={logo} 
                alt="Logo" 
                className="h-10 w-[120px] object-contain relative"
              />
            </Link>

            {/* Menu Button with Animation */}
            <button 
              onClick={() => setShowSidebar(!showSidebar)} 
              className="lg:hidden group flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br from-[#4CAF50] to-[#81C784] hover:from-[#81C784] hover:to-[#4CAF50] text-white shadow-lg hover:shadow-green-500/30 transition-all duration-500"
            >
              <FaList className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
            </button>
          </div>

          {/* Center Section - Search Bar */}
          <div className="flex-1 flex justify-center items-center max-w-2xl px-4">
            <div className="w-full relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-[#4CAF50]/20 to-[#FF9800]/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative flex items-center">
                <input 
                  type="text" 
                  placeholder="Search products, farmers..." 
                  className="w-full px-5 py-3 rounded-xl bg-white/50 border-2 border-gray-100 focus:border-[#4CAF50]/30 focus:ring-4 ring-[#4CAF50]/10 transition-all duration-300 outline-none"
                />
                <button className="absolute right-3 p-2 rounded-lg text-gray-400 hover:text-[#4CAF50] transition-colors duration-300">
                  <FaSearch className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-3 min-w-[200px] justify-end">
            {/* Notification Buttons */}
            <div className="hidden sm:flex items-center gap-2">
              {/* Messages */}
              <button className="group relative p-3 rounded-xl hover:bg-gradient-to-br hover:from-[#4CAF50]/10 hover:to-[#81C784]/10 transition-all duration-300">
                <FaRegEnvelope className="w-5 h-5 text-gray-600 group-hover:text-[#4CAF50] transition-colors duration-300" />
                <span className="absolute top-2 right-2 w-[6px] h-[6px] bg-[#4CAF50] rounded-full animate-pulse"></span>
              </button>

              {/* Notifications */}
              <button className="group relative p-3 rounded-xl hover:bg-gradient-to-br hover:from-[#FF9800]/10 hover:to-[#FFB74D]/10 transition-all duration-300">
                <FaBell className="w-5 h-5 text-gray-600 group-hover:text-[#FF9800] transition-colors duration-300" />
                <span className="absolute top-2 right-2 w-[6px] h-[6px] bg-[#FF9800] rounded-full animate-pulse"></span>
              </button>
            </div>

            {/* Profile Section */}
            <div className="flex items-center gap-4 pl-4 border-l border-gray-200">
              <div className="hidden sm:block text-right">
                <h2 className="text-sm font-semibold bg-gradient-to-r from-[#1B5E20] to-[#2E7D32] bg-clip-text text-transparent">
                  {userInfo.name}
                </h2>
                <p className="text-xs text-gray-500">{userInfo.role}</p>
              </div>

              {/* Animated Profile Picture */}
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-br from-[#4CAF50] via-[#FF9800] to-[#2196F3] rounded-full opacity-75 group-hover:opacity-100 animate-spin-slow blur-sm"></div>
                <div className="relative p-1 bg-white rounded-full">
                  <img 
                    src={userInfo.role === 'admin' ? "/Images/Profiles/admin.jpeg" : userInfo.image}
                    alt={userInfo.role === 'admin' ? "Admin" : "User"}
                    className="w-10 h-10 rounded-full object-cover ring-2 ring-white"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "/Images/Profiles/default.png";
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Bottom Border */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#4CAF50]/20 to-transparent"></div>
    </div>
  );
}

Header.propTypes = {
  showSidebar: PropTypes.bool.isRequired,
  setShowSidebar: PropTypes.func.isRequired,
};