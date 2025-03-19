import { Link } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import Pagination from '../Pagination';
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react"
import Search from "../components/Search";
import { get_seller_request } from "../../store/Reducers/sellerReducer";

export default function SellerRequest() {
    const dispatch = useDispatch()
    const { sellers, totalSeller } = useSelector(state => state.seller)
    const [currentPage, setCurrentPage] = useState(1);
    const [searchValue, setSearchValue] = useState('');
    const [perPage, setPerPage] = useState(5);

    useEffect(() => {
        dispatch(get_seller_request({
            perPage,
            searchValue,
            page: currentPage
        }))
    }, [perPage, searchValue, currentPage])

    return (
        <div className='px-2 lg:px-7 pt-5'>
            <div className='w-full p-4 bg-white rounded-lg shadow-lg'>
                <div className="flex justify-between items-center mb-6">
                    <h1 className='text-xl font-semibold text-gray-800'>Seller Requests</h1>
                    <div className="relative">
                        <div className="absolute -inset-1 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg blur opacity-25"></div>
                        <div className="relative px-4 py-2 bg-white rounded-lg leading-none flex items-center text-orange-500">
                            Total: {totalSeller}
                        </div>
                    </div>
                </div>

                <div className="mb-6">
                    <Search 
                        setPerPage={setPerPage} 
                        setSearchValue={setSearchValue} 
                        searchValue={searchValue}
                    />
                </div>

                <div className="relative overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="text-xs uppercase bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-gray-600">No</th>
                                <th className="px-6 py-3 text-gray-600">Name</th>
                                <th className="px-6 py-3 text-gray-600">Email</th>
                                <th className="px-6 py-3 text-gray-600">Payment Status</th>
                                <th className="px-6 py-3 text-gray-600">Status</th>
                                <th className="px-6 py-3 text-gray-600">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sellers.map((seller, i) => (
                                <tr key={i} className="bg-white border-b hover:bg-gray-50 transition-colors duration-200">
                                    <td className="px-6 py-4">{i + 1}</td>
                                    <td className="px-6 py-4 font-medium">{seller.name}</td>
                                    <td className="px-6 py-4">{seller.email}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-3 py-1 rounded-full text-xs ${
                                            seller.payment === 'active' 
                                                ? 'bg-green-100 text-green-700' 
                                                : 'bg-yellow-100 text-yellow-700'
                                        }`}>
                                            {seller.payment}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-3 py-1 rounded-full text-xs ${
                                            seller.status === 'active' 
                                                ? 'bg-green-100 text-green-700' 
                                                : 'bg-yellow-100 text-yellow-700'
                                        }`}>
                                            {seller.status}
                                        </span>
                                    </td>
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
                            totalItem={totalSeller}
                            perPage={perPage}
                            showItem={3}
                        />
                    </div>
                )}

                {sellers.length === 0 && (
                    <div className="text-center py-8">
                        <div className="mb-3">
                            <FaEye className="w-12 h-12 mx-auto text-gray-300" />
                        </div>
                        <p className="text-gray-500">No seller requests found</p>
                    </div>
                )}
            </div>
        </div>
    )
}