import { useState, useEffect } from "react";
import { BsArrowDownSquare } from "react-icons/bs";
import { FaRupeeSign } from "react-icons/fa";
import { Link } from "react-router-dom";
import Pagination from "../Pagination.jsx";
import { useDispatch, useSelector } from 'react-redux';
import { get_admin_orders } from '../../store/Reducers/OrderReducer.js';

export default function Orders() {
    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(1);
    const [searchValue, setSearchValue] = useState('');
    const [perPage, setPerPage] = useState(5);
    const [show, setShow] = useState(false);
    const { myOrders, totalOrder } = useSelector(state => state.order);

    useEffect(() => {
        const obj = {
            perPage: parseInt(perPage),
            page: parseInt(currentPage),
            searchValue
        }
        dispatch(get_admin_orders(obj))
    }, [searchValue, currentPage, perPage, dispatch])

    const formatPrice = (price) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(price);
    }

    return (
        <div className="px-2 lg:px-7 pt-5">
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
                            placeholder="Search orders..." 
                            className="relative px-4 py-2 bg-white border border-gray-200 rounded-lg text-gray-600 w-[250px] transition-all duration-300 hover:border-[#4CAF50] focus:border-[#2196F3] outline-none"
                        />
                    </div>
                </div>

                <div className="relative overflow-x-auto">
                    <table className="w-full text-sm text-left text-gray-600">
                        <thead className="text-xs uppercase bg-gradient-to-r from-[#4CAF50]/10 to-[#2196F3]/10 backdrop-blur-sm">
                            <tr>
                                <th scope="col" className="px-6 py-3 whitespace-nowrap">Order Id</th>
                                <th scope="col" className="px-6 py-3">Price</th>
                                <th scope="col" className="px-6 py-3">Payment Status</th>
                                <th scope="col" className="px-6 py-3">Order Status</th>
                                <th scope="col" className="px-6 py-3">Action</th>
                                <th scope="col" className="px-6 py-3">
                                    <BsArrowDownSquare className="animate-bounce text-[#2196F3]" />
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {myOrders.map((order, i) => (
                                <div key={i}>
                                    <tr className="bg-white/50 backdrop-blur-sm hover:bg-gradient-to-r from-[#4CAF50]/5 to-[#2196F3]/5 transition-colors duration-300">
                                        <td className="px-6 py-4 whitespace-nowrap font-medium">
                                            #{order._id}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center gap-1 group">
                                                <FaRupeeSign className="text-green-500 group-hover:scale-110 transition-transform duration-300" />
                                                <span className="group-hover:text-green-500 transition-colors duration-300">
                                                    {formatPrice(order.price).replace('₹', '')}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`px-3 py-1 rounded-full text-xs ${
                                                order.payment_status === 'paid' 
                                                    ? 'bg-green-500/10 text-green-500 ring-1 ring-green-500/50' 
                                                    : 'bg-yellow-500/10 text-yellow-500 ring-1 ring-yellow-500/50'
                                            }`}>
                                                {order.payment_status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`px-3 py-1 rounded-full text-xs ${
                                                order.delivery_status === 'delivered' 
                                                    ? 'bg-green-500/10 text-green-500 ring-1 ring-green-500/50'
                                                    : order.delivery_status === 'processing' 
                                                    ? 'bg-yellow-500/10 text-yellow-500 ring-1 ring-yellow-500/50'
                                                    : 'bg-blue-500/10 text-blue-500 ring-1 ring-blue-500/50'
                                            }`}>
                                                {order.delivery_status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <Link 
                                                to={`/admin/dashboard/order/details/${order._id}`}
                                                className="relative group"
                                            >
                                                <div className="absolute -inset-1 bg-gradient-to-r from-[#4CAF50] to-[#2196F3] rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
                                                <button className="relative px-4 py-2 bg-white text-gray-600 rounded-lg group-hover:text-[#4CAF50] transition-all duration-300">
                                                    View
                                                </button>
                                            </Link>
                                        </td>
                                        <td className="px-6 py-4">
                                            <button 
                                                onClick={() => setShow(order._id)}
                                                className="text-[#2196F3] hover:scale-110 transition-transform duration-300"
                                            >
                                                <BsArrowDownSquare className="animate-bounce" />
                                            </button>
                                        </td>
                                    </tr>
                                    
                                    {/* Suborders Section with Animation */}
                                    <tr>
                                        <td colSpan="6" className="p-0">
                                            <div className={`transition-all duration-300 ${
                                                show === order._id ? 'h-auto opacity-100' : 'h-0 opacity-0 overflow-hidden'
                                            }`}>
                                                <div className="bg-gradient-to-r from-[#4CAF50]/5 to-[#2196F3]/5 backdrop-blur-sm p-4 space-y-2">
                                                    {order.suborder.map((suborder, index) => (
                                                        <div 
                                                            key={index} 
                                                            className="grid grid-cols-4 gap-4 p-3 bg-white/50 rounded-lg hover:bg-gradient-to-r from-[#4CAF50]/10 to-[#2196F3]/10 transition-colors duration-300"
                                                        >
                                                            <div className="text-xs font-medium text-gray-600">
                                                                #{suborder._id}
                                                            </div>
                                                            <div className="text-xs flex items-center gap-1 group">
                                                                <FaRupeeSign className="text-green-500 group-hover:scale-110 transition-transform duration-300" />
                                                                <span className="group-hover:text-green-500 transition-colors duration-300">
                                                                    {formatPrice(suborder.price).replace('₹', '')}
                                                                </span>
                                                            </div>
                                                            <div>
                                                                <span className={`px-3 py-1 rounded-full text-xs ${
                                                                    suborder.payment_status === 'paid' 
                                                                        ? 'bg-green-500/10 text-green-500 ring-1 ring-green-500/50' 
                                                                        : 'bg-yellow-500/10 text-yellow-500 ring-1 ring-yellow-500/50'
                                                                }`}>
                                                                    {suborder.payment_status}
                                                                </span>
                                                            </div>
                                                            <div>
                                                                <span className={`px-3 py-1 rounded-full text-xs ${
                                                                    suborder.delivery_status === 'delivered' 
                                                                        ? 'bg-green-500/10 text-green-500 ring-1 ring-green-500/50'
                                                                        : suborder.delivery_status === 'processing' 
                                                                        ? 'bg-yellow-500/10 text-yellow-500 ring-1 ring-yellow-500/50'
                                                                        : 'bg-blue-500/10 text-blue-500 ring-1 ring-blue-500/50'
                                                                }`}>
                                                                    {suborder.delivery_status}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                </div>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination with Animation */}
                {totalOrder > perPage && (
                    <div className="w-full flex justify-end mt-4 bottom-4 right-4">
                        <div className="relative group">
                            <div className="absolute -inset-1 bg-gradient-to-r from-[#4CAF50] to-[#2196F3] rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
                            <div className="relative">
                                <Pagination
                                    pageNumber={currentPage}
                                    setPageNumber={setCurrentPage}
                                    totalItem={totalOrder}
                                    perPage={perPage}
                                    showItem={4}
                                />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}