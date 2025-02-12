import { Link } from "react-router-dom";
import {FaEye} from "react-icons/fa";
import Pagination from './../Pagination.jsx';
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react"
import Search from "../components/Search.jsx";
import { get_seller_request } from "../../store/Reducers/sellerReducer.js";

export default function SellerRequest() {

    const dispatch=useDispatch()
    const {sellers,totalSeller}=useSelector(state=>state.seller)

    const [currentPage,setCurrentPage]=useState(1);
    const [searchValue,setSearchValue]=useState('');
    const [show,setShow]=useState(false);
    const [perPage,setPerPage]=useState(5);
    

    useEffect(()=>{
        dispatch(get_seller_request({
            perPage,
            searchValue,
            page:currentPage
        }))
    },[perPage,searchValue,currentPage])

  return (
    <div className='px-2 lg:px-7 pt-5'>
            <h1 className='text-[20px] font-bold m-3'>Seller Request</h1>
            <div className='w-full p-4 bg-[#6a5fdf] rounded-md'>
                <Search setPerPage={setPerPage} setSearchValue={setSearchValue} searchValue={searchValue}/>


                <div className="relative overflow-x-auto">
                    <table className="w-full text-sm text-left text-[#d0d2d6] border-b border-slate-700">
                        <thead className="etxt-sm text-[#d0d2d6] uppercase border-b border-slate-700">
                            <tr>
                        
                                <th className="py-3 px-4" scope="col">No</th>   
                                <th className="py-3 px-4" scope="col">Name</th>
                                <th className="py-3 px-4" scope="col">Email</th>
                                <th className="py-3 px-4" scope="col">Payment status</th>
                                <th className="py-3 px-4" scope="col">Status</th>
                                <th className="py-3 px-4" scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                            sellers.map((d,i)=> 
                            <tr key={i} className='border-b border-slate-700'>
                                <td scope="row" className="py-2 px-4 font-medium whitespace-nowrap">
                                    {i+1}
                                </td>

                                {/* name */}
                                <td scope="row" className="py-2 px-4 font-medium whitespace-nowrap">
                                    {d.name}
                                </td>

                                {/* Email */}
                                <td scope="row" className="py-2 px-4 font-medium whitespace-nowrap">
                                    {d.email}
                                </td>

                                {/* payment Status */}
                                <td scope="row" className="py-2 px-4 font-medium whitespace-nowrap">
                                    <span>{d.payment}</span>
                                </td>

                                {/* Status */}
                                <td scope="row" className="py-2 px-4 font-medium whitespace-nowrap">
                                    <span>{d.status}</span>
                                </td>

                            
                                {/* Action */}
                                <td scope="row" className="py-2 px-4 font-medium whitespace-nowrap">
                                    <div className="flex justify-start items-center gap-4">
                                        <Link to={`/admin/dashboard/seller/details/${d._id}`} className="p-[6px] bg-green-500 rounded hover:shadow-lg hover:shadow-green-500/50"><FaEye/></Link>
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
