import { useState } from 'react'

import { Link } from "react-router-dom";
import {FaEye} from "react-icons/fa";
import Pagination from './../Pagination.jsx';


export default function DeactiveSellers() {
    const [currentPage,setCurrentPage]=useState(1);
    const [searchValue,setSearchValue]=useState('');
    const [show,setShow]=useState(false);
    const [perPage,setPerPage]=useState(5);
  return (
    <div className='px-2 lg:px-7 pt-5'>
            <h1 className='text-[20px] font-bold m-3'>Deactive Seller</h1>
            <div className='w-full p-4 bg-[#6a5fdf] rounded-md'>
                <div className="flex justify-between items-center">
                    <select onChange={(e)=>setPerPage(parseInt(e.target.value))} className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#6a5fdf] border-slate-700 rounded-md text-[#d0d2d6]">
                        <option value='5'>5</option>
                        <option value='10'>10</option>
                        <option value='20'>20</option>
                    </select>
                    <input type="text" placeholder="search" className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#6a5fdf] border-slate-700 rounded-md text-[#ecedef]"/>
                </div>


                <div className="relative overflow-x-auto">
                    <table className="w-full text-sm text-left text-[#d0d2d6] border-b border-slate-700">
                        <thead className="etxt-sm text-[#d0d2d6] uppercase border-b border-slate-700">
                            <tr>
                        
                                <th className="py-3 px-4" scope="col">No</th>
                                <th className="py-3 px-4" scope="col">Image</th>
                                <th className="py-3 px-4" scope="col">Name</th>
                                <th className="py-3 px-4" scope="col">Email</th>
                                <th className="py-3 px-4" scope="col">Payment status</th>
                                <th className="py-3 px-4" scope="col">Status</th>
                                <th className="py-3 px-4" scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                            [1,2,3,4,5].map((d,i)=> 
                            <tr key={i} className='border-b border-slate-700'>
                                <td scope="row" className="py-1 px-4 font-medium whitespace-nowrap">
                                    {d}
                                </td>
                                <td scope="row" className="py-1 px-4 font-medium whitespace-nowrap">
                                    <img src={`../../../public/Images/Category/${d}.jpeg`} className="w-[45px] h-[45px]"/>
                                </td>

                                {/* name */}
                                <td scope="row" className="py-1 px-4 font-medium whitespace-nowrap">
                                    Intiyaz
                                </td>

                                {/* Email */}
                                <td scope="row" className="py-1 px-4 font-medium whitespace-nowrap">
                                    Intiyaz@gmail.com
                                </td>

                                {/* payment Status */}
                                <td scope="row" className="py-1 px-4 font-medium whitespace-nowrap">
                                    <span>Pending</span>
                                </td>

                                {/* Status */}
                                <td scope="row" className="py-1 px-4 font-medium whitespace-nowrap">
                                    <span>Deactive</span>
                                </td>

                            
                                {/* Action */}
                                <td scope="row" className="py-1 px-4 font-medium whitespace-nowrap">
                                    <div className="flex justify-start items-center gap-4">
                                        <Link className="p-[6px] bg-green-500 rounded hover:shadow-lg hover:shadow-green-500/50"><FaEye/></Link>
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
