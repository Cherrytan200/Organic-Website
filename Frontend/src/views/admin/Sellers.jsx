import { useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import Pagination from './../Pagination.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { get_active_sellers } from '../../store/Reducers/sellerReducer.js';

export default function Sellers() {
    const dispatch = useDispatch()
    const [currentPage, setCurrentPage] = useState(1);
    const [searchValue, setSearchValue] = useState('');
    const [perPage, setPerPage] = useState(5);
    const { sellers, totalSeller } = useSelector(state => state.seller)

    useEffect(() => {
        const obj = {
            perPage: parseInt(perPage),
            page: parseInt(currentPage),
            searchValue
        }
        dispatch(get_active_sellers(obj))
    }, [searchValue, currentPage, perPage])

    return (
        <div className='px-2 lg:px-7 pt-5'>
            {/* Background SVG Animation */}
            <div className="fixed inset-0 -z-10">
                <div className="absolute inset-0 bg-gradient-to-br from-[#4CAF50]/5 to-[#2196F3]/5">
                    <svg className="absolute right-0 top-0 opacity-20 animate-pulse" viewBox="0 0 200 200">
                        <path fill="#4CAF50" d="M39.5,-65.3C50.9,-59.8,59.7,-48.3,65.9,-35.4C72.1,-22.4,75.7,-8,74.7,6.1C73.7,20.2,68,34,59.3,45.7C50.6,57.4,38.8,67,25.3,72.3C11.9,77.6,-3.2,78.6,-17.4,74.8C-31.6,71,-44.9,62.4,-54.4,51.1C-63.9,39.8,-69.5,25.8,-72.5,10.8C-75.4,-4.2,-75.6,-20.2,-69.7,-33.5C-63.8,-46.8,-51.7,-57.4,-38.5,-62C-25.3,-66.6,-11.1,-65.2,2,-68.4C15.2,-71.5,28.1,-70.8,39.5,-65.3Z" transform="translate(100 100)" />
                    </svg>
                </div>
            </div>

            <div className="w-full p-4 bg-white/90 rounded-lg backdrop-blur-sm shadow-lg">
                <div className="flex justify-between items-center pb-4">
                    {/* Select with Animation */}
                    <div className="relative group">
                        <div className="absolute -inset-1 bg-gradient-to-r from-[#4CAF50] to-[#2196F3] rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
                        <select 
                            onChange={(e) => setPerPage(parseInt(e.target.value))} 
                            className="relative px-4 py-2 bg-white border border-gray-200 rounded-lg text-gray-600 transition-all duration-300 hover:border-[#4CAF50] focus:border-[#2196F3] outline-none"
                        >
                            <option value='5'>5</option>
                            <option value='10'>10</option>
                            <option value='20'>20</option>
                        </select>
                    </div>

                    {/* Search with Animation */}
                    <div className="relative group">
                        <div className="absolute -inset-1 bg-gradient-to-r from-[#4CAF50] to-[#2196F3] rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
                        <input 
                            onChange={e => setSearchValue(e.target.value)} 
                            value={searchValue} 
                            type="text" 
                            placeholder="Search sellers..." 
                            className="relative px-4 py-2 bg-white border border-gray-200 rounded-lg text-gray-600 w-[250px] transition-all duration-300 hover:border-[#4CAF50] focus:border-[#2196F3] outline-none"
                        />
                    </div>
                </div>

                <div className="relative overflow-x-auto">
                    <table className="w-full text-sm text-left text-gray-600">
                        <thead className="text-xs uppercase bg-gradient-to-r from-[#4CAF50]/10 to-[#2196F3]/10 backdrop-blur-sm">
                            <tr>
                                <th className="px-6 py-3 whitespace-nowrap font-semibold">No</th>
                                <th className="px-6 py-3 whitespace-nowrap font-semibold">Image</th>
                                <th className="px-6 py-3 whitespace-nowrap font-semibold">Name</th>
                                <th className="px-6 py-3 whitespace-nowrap font-semibold">Shop Name</th>
                                <th className="px-6 py-3 whitespace-nowrap font-semibold">Payment Status</th>
                                <th className="px-6 py-3 whitespace-nowrap font-semibold">Email</th>
                                <th className="px-6 py-3 whitespace-nowrap font-semibold">Status</th>
                                <th className="px-6 py-3 whitespace-nowrap font-semibold">Address</th>
                                <th className="px-6 py-3 whitespace-nowrap font-semibold">District</th>
                                <th className="px-6 py-3 whitespace-nowrap font-semibold">State</th>
                                <th className="px-6 py-3 whitespace-nowrap font-semibold">Pincode</th>
                                <th className="px-6 py-3 whitespace-nowrap font-semibold">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {sellers.map((d, i) => (
                                <tr key={i} className="bg-white/50 backdrop-blur-sm hover:bg-gradient-to-r from-[#4CAF50]/5 to-[#2196F3]/5 transition-colors duration-300">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {((currentPage - 1) * perPage) + i + 1}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="w-10 h-10 rounded-lg overflow-hidden ring-1 ring-gray-200">
                                            <img src={d.image} alt={d.name} className="w-full h-full object-cover"/>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap font-medium">{d.name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{d.shopInfo?.shopName}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-3 py-1 rounded-full text-xs ${
                                            d.payment === 'paid' 
                                                ? 'bg-green-500/10 text-green-500 ring-1 ring-green-500/50' 
                                                : 'bg-yellow-500/10 text-yellow-500 ring-1 ring-yellow-500/50'
                                        }`}>
                                            {d.payment}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">{d.email}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-3 py-1 rounded-full text-xs ${
                                            d.status === 'active' 
                                                ? 'bg-green-500/10 text-green-500 ring-1 ring-green-500/50' 
                                                : 'bg-yellow-500/10 text-yellow-500 ring-1 ring-yellow-500/50'
                                        }`}>
                                            {d.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">{d.shopInfo?.address}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{d.shopInfo?.district}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{d.shopInfo?.state}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{d.shopInfo?.pincode}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <Link 
                                            to={`/admin/dashboard/seller/details/${d._id}`}
                                            className="relative group"
                                        >
                                            <div className="absolute -inset-1 bg-gradient-to-r from-[#4CAF50] to-[#2196F3] rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
                                            <button className="relative p-2 bg-white text-[#2196F3] rounded-lg group-hover:text-[#4CAF50] transition-all duration-300">
                                                <FaEye size={16} />
                                            </button>
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination with Animation */}
                {totalSeller > perPage && (
                    <div className="w-full flex justify-end mt-4 bottom-4 right-4">
                        <div className="relative group">
                            <div className="absolute -inset-1 bg-gradient-to-r from-[#4CAF50] to-[#2196F3] rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
                            <div className="relative">
                                <Pagination
                                    pageNumber={currentPage}
                                    setPageNumber={setCurrentPage}
                                    totalItem={totalSeller}
                                    perPage={perPage}
                                    showItem={4}
                                />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}