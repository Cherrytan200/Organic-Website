import { useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import Pagination from '../Pagination';
import { useDispatch, useSelector } from 'react-redux';
import { get_deactive_sellers } from '../../store/Reducers/sellerReducer';

export default function DeactiveSellers() {
    const [currentPage, setCurrentPage] = useState(1)
    const [searchValue, setSearchValue] = useState('')
    const [perPage, setPerPage] = useState(5)
    const dispatch = useDispatch()
    const { sellers, totalSellers } = useSelector(state => state.seller)

    useEffect(() => {
        const obj = {
            parPage: parseInt(perPage),
            page: parseInt(currentPage),
            searchValue
        }
        dispatch(get_deactive_sellers(obj))
    }, [searchValue, currentPage, perPage])

    return (
        <div className='px-2 lg:px-7 pt-5'>
            <div className='w-full p-4 bg-white rounded-lg shadow-lg'>
                <div className="flex justify-between items-center mb-6">
                    <h1 className='text-xl font-semibold text-gray-800'>Deactive Sellers</h1>
                    <div className="relative">
                        <div className="absolute -inset-1 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg blur opacity-25"></div>
                        <div className="relative px-4 py-2 bg-white rounded-lg leading-none flex items-center text-orange-500">
                            Total: {totalSellers}
                        </div>
                    </div>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                    <div className="relative group flex-grow max-w-xs">
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
                        <select 
                            onChange={(e) => setPerPage(parseInt(e.target.value))} 
                            className="relative w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-gray-700 transition-all duration-300 hover:border-orange-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/20 outline-none"
                        >
                            <option value='5'>5</option>
                            <option value='10'>10</option>
                            <option value='20'>20</option>
                        </select>
                    </div>
                    <div className="relative group flex-grow">
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
                        <input 
                            onChange={e => setSearchValue(e.target.value)} 
                            value={searchValue} 
                            type="text" 
                            placeholder="Search..." 
                            className="relative w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-gray-700 transition-all duration-300 hover:border-orange-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/20 outline-none"
                        />
                    </div>
                </div>

                <div className="relative overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="text-xs uppercase bg-gray-50">
                            <tr>
                                <th className="px-6 py-3">No</th>
                                <th className="px-6 py-3">Image</th>
                                <th className="px-6 py-3">Name</th>
                                <th className="px-6 py-3">Shop Name</th>
                                <th className="px-6 py-3">Payment Status</th>
                                <th className="px-6 py-3">Email</th>
                                <th className="px-6 py-3">Status</th>
                                <th className="px-6 py-3">District</th>
                                <th className="px-6 py-3">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sellers.map((seller, i) => (
                                <tr key={i} className="bg-white border-b hover:bg-gray-50">
                                    <td className="px-6 py-4">{i + 1}</td>
                                    <td className="px-6 py-4">
                                        <img src={seller.image} alt={seller.name} className="w-[45px] h-[45px] rounded-md object-cover" />
                                    </td>
                                    <td className="px-6 py-4 font-medium">{seller.name}</td>
                                    <td className="px-6 py-4">{seller.shopInfo?.shopName}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-3 py-1 rounded-full text-xs ${
                                            seller.payment === 'active' 
                                                ? 'bg-green-100 text-green-700' 
                                                : 'bg-yellow-100 text-yellow-700'
                                        }`}>
                                            {seller.payment}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">{seller.email}</td>
                                    <td className="px-6 py-4">
                                        <span className="px-3 py-1 rounded-full text-xs bg-red-100 text-red-700">
                                            {seller.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">{seller.shopInfo?.district}</td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <Link 
                                                to={`/admin/dashboard/seller/details/${seller._id}`} 
                                                className="relative group"
                                            >
                                                <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg blur opacity-50 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
                                                <div className="relative p-2 bg-white rounded-lg leading-none">
                                                    <FaEye className="w-6 h-6 text-orange-500 group-hover:scale-110 transition-transform duration-300" />
                                                </div>
                                            </Link>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {sellers.length > 0 && (
                    <div className="w-full flex justify-end mt-4 bottom-4 right-4">
                        <Pagination
                            pageNumber={currentPage}
                            setPageNumber={setCurrentPage}
                            totalItem={50}
                            perPage={perPage}
                            showItem={4}
                        />
                    </div>
                )}
            </div>
        </div>
    )
}