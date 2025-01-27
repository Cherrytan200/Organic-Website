import { useState } from "react";
import Search from "../components/Search.jsx";
import Pagination from "../Pagination.jsx";
import { Link } from "react-router-dom";
import { FaEdit, FaEye, FaTrash } from "react-icons/fa";

export default function Orders() {

    const [currentPage,setCurrentPage]=useState(1);
    const [searchValue,setSearchValue]=useState('');
    const [perPage,setPerPage]=useState(5);

  return (
    <div className='px-2 lg:px-7 pt-5'>
        <h1 className="text-[#000000] font-semibold text-lg mt-3">Orders</h1>
        <div className="w-full p-4 bg-[#6a5fdf] rounded-md">
            <Search setPerPage={setPerPage} setSearchValue={setSearchValue} searchValue={searchValue}/>
            <div className="relative overflow-x-auto mt-5">
                        <table className="w-full text-sm text-left text-[#d0d2d6] uppercase border-b border-slate-700">
                        <thead className="etxt-sm text-[#d0d2d6] uppercase border-b border-slate-700">
                            <tr>
                        
                                <th className="py-3 px-4" scope="col">Order Id</th>
                                <th className="py-3 px-4" scope="col">Price</th>
                                <th className="py-3 px-4" scope="col">Payment Status</th>
                                <th className="py-3 px-4" scope="col">order status</th>
                                <th className="py-3 px-4" scope="col">action</th>
                                

                            </tr>
                        </thead>
                        <tbody>
                            {
                            [1,2,3,4,5].map((d,i)=> 
                            <tr key={i} className='border-b border-slate-700'>
                                

                                <td scope="row" className="py-1 px-5 font-medium whitespace-nowrap">
                                    #5455
                                </td>

                                <td scope="row" className="py-1 px-5 font-medium whitespace-nowrap">
                                    &#8377;540
                                </td>
                                <td scope="row" className="py-1 px-8 font-medium whitespace-nowrap">
                                    Pending
                                </td>
                                <td scope="row" className="py-1 px-8 font-medium whitespace-nowrap">
                                    Pending
                                </td>
                                
                                <td scope="row" className="py-1 px-8 font-medium whitespace-nowrap">
                                    <div className="flex justify-start items-center gap-4">
                                        <Link className="p-[6px] bg-green-500 rounded hover:shadow-lg hover:shadow-green-500/50">
                                            <FaEye/>
                                        </Link>
                                    </div>
                                </td>
                            </tr>
                            )
                            }
                        </tbody>
                        </table>
                    </div>
                    
                    <div className="w-full flex justify-end items-center mt-4 bottom-4 right-4">
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
  )
}
