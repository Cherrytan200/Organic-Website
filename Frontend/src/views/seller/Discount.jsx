import { useState } from "react";
import Search from "../components/Search.jsx";
import Pagination from "../Pagination.jsx";
import { Link } from "react-router-dom";
import { FaEdit, FaEye, FaTrash } from "react-icons/fa";

export default function Discount() {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchValue, setSearchValue] = useState('');
    const [perPage, setPerPage] = useState(5);

    return (
        <div className='px-2 lg:px-7 pt-5'>
            <div className='w-full p-4 bg-white rounded-lg shadow-lg'>
                <div className="flex flex-wrap items-center justify-between mb-6">
                    <h1 className="text-2xl font-semibold text-gray-700">Discount Products</h1>
                    <Link 
                        to="/seller/dashboard/add-product" 
                        className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-md transition-all flex items-center gap-2"
                    >
                        Add Product
                    </Link>
                </div>

                <div className="w-full bg-white rounded-lg">
                    <div className="mb-6">
                        <Search 
                            setPerPage={setPerPage} 
                            setSearchValue={setSearchValue} 
                            searchValue={searchValue}
                        />
                    </div>

                    <div className="relative overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="text-sm text-gray-600 uppercase bg-gray-100">
                                <tr>
                                    <th className="py-4 px-4">No</th>
                                    <th className="py-4 px-4">Image</th>
                                    <th className="py-4 px-4">Name</th>
                                    <th className="py-4 px-4">Category</th>
                                    <th className="py-4 px-4">Price</th>
                                    <th className="py-4 px-4">Discount</th>
                                    <th className="py-4 px-4">Stock</th>
                                    <th className="py-4 px-4">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {[1, 2, 3, 4, 5].map((d, i) => (
                                    <tr key={i} className='border-b hover:bg-gray-50 transition-all'>
                                        <td className="py-4 px-4 font-medium">
                                            {d}
                                        </td>
                                        <td className="py-4 px-4">
                                            <img 
                                                src={`/Images/Category/${d}.jpeg`} 
                                                alt="product"
                                                className="w-[45px] h-[45px] rounded-lg object-cover"
                                            />
                                        </td>
                                        <td className="py-4 px-4 font-medium">
                                            Tomato
                                        </td>
                                        <td className="py-4 px-4">
                                            Vegetables
                                        </td>
                                        <td className="py-4 px-4 font-medium">
                                            <span className="text-green-500">₹40</span>
                                        </td>
                                        <td className="py-4 px-4">
                                            <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                                                5%
                                            </span>
                                        </td>
                                        <td className="py-4 px-4">
                                            <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                                                20kg
                                            </span>
                                        </td>
                                        <td className="py-4 px-4">
                                            <div className="flex items-center gap-3">
                                                <Link 
                                                    className="p-2 bg-yellow-500 rounded-full hover:shadow-lg hover:shadow-yellow-500/50 text-white transition-all"
                                                >
                                                    <FaEdit size={16}/>
                                                </Link>
                                                <button 
                                                    className="p-2 bg-green-500 rounded-full hover:shadow-lg hover:shadow-green-500/50 text-white transition-all"
                                                >
                                                    <FaEye size={16}/>
                                                </button>
                                                <button 
                                                    className="p-2 bg-red-500 rounded-full hover:shadow-lg hover:shadow-red-500/50 text-white transition-all"
                                                >
                                                    <FaTrash size={16}/>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}

                                {/* Empty State */}
                                {[1, 2, 3, 4, 5].length === 0 && (
                                    <tr>
                                        <td colSpan="8" className="py-8 text-center text-gray-500">
                                            No discount products found
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    <div className="w-full flex justify-end mt-5">
                        <Pagination
                            pageNumber={currentPage}
                            setPageNumber={setCurrentPage}
                            totalItem={50}
                            perPage={perPage}
                            showItem={3}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}