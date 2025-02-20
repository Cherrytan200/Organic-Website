import { useState,useEffect } from "react";
import Search from "../components/Search.jsx";
import Pagination from "../Pagination.jsx";
import { Link } from "react-router-dom";
import {  FaEye } from 'react-icons/fa'; 
import { useDispatch, useSelector } from 'react-redux';
import { get_seller_orders } from '../../store/Reducers/OrderReducer.js';

export default function Orders() {

    const dispatch = useDispatch()

    const {myOrders,totalOrder } = useSelector(state => state.order)
    const {userInfo } = useSelector(state => state.auth)

    const [currentPage,setCurrentPage]=useState(1);
    const [searchValue,setSearchValue]=useState('');
    const [perPage,setPerPage]=useState(5);
    useEffect(() => {
        const obj = {
            perPage: parseInt(perPage),
            page: parseInt(currentPage),
            searchValue,
            sellerId: userInfo._id
        }
        dispatch(get_seller_orders(obj))
    },[searchValue,currentPage,perPage])


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
                                <th className="py-3 px-4" scope="col">Date</th>
                                <th className="py-3 px-4" scope="col">action</th>
                                

                            </tr>
                        </thead>
                        <tbody>
                            {
                            myOrders.map((d,i)=> 
                            <tr key={i} className='border-b border-slate-700'>
                                

                                <td scope="row" className="py-1 px-5 font-medium whitespace-nowrap">
                                    #{d._id}
                                </td>

                                <td scope="row" className="py-1 px-5 font-medium whitespace-nowrap">
                                    &#8377;{d.price}
                                </td>
                                <td scope="row" className="py-1 px-8 font-medium whitespace-nowrap">
                                    {d.payment_status}
                                </td>
                                <td scope="row" className="py-1 px-8 font-medium whitespace-nowrap">
                                    {d.delivery_status}
                                </td>
                                <td scope="row" className="py-1 px-8 font-medium whitespace-nowrap">
                                    {d.date}
                                </td>
                                
                                <td scope="row" className="py-1 px-8 font-medium whitespace-nowrap">
                                    <div className="flex justify-start items-center gap-4">
                                        <Link to={`/seller/dashboard/order/details/${d._id}`} className="p-[6px] bg-green-500 rounded hover:shadow-lg hover:shadow-green-500/50">
                                            <FaEye/>
                                        </Link>
                                    </div>
                                </td>
                            </tr>
                            )}

                        </tbody>
                        </table>
                    </div>
                    
                    {
                        totalOrder <= perPage ? "" : <div className='w-full flex justify-end mt-4 bottom-4 right-4'>
                        <Pagination 
                            pageNumber = {currentPage}
                            setPageNumber = {setCurrentPage}
                            totalItem = {totalOrder}
                            perPage = {perPage}
                            showItem = {3}
                        />
                        </div>
                    }

        </div>
    </div>
  )
}
