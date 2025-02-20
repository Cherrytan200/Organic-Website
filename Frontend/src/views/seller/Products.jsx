import { useEffect, useState } from "react";
import Search from "../components/Search.jsx";
import Pagination from "../Pagination.jsx";
import { Link } from "react-router-dom";
import { FaEdit, FaEye, FaTrash } from "react-icons/fa";
import { useDispatch,useSelector } from 'react-redux';
import { get_products } from "../../store/Reducers/productReducer.js";
import { LuImageMinus } from "react-icons/lu";

export default function Products() {

    const dispatch=useDispatch();
    const {products,totalProduct}=useSelector(state=>state.product)


    const [currentPage,setCurrentPage]=useState(1);
    const [searchValue,setSearchValue]=useState('');
    const [perPage,setPerPage]=useState(5);


    useEffect(()=>{
            const obj={
                perPage:parseInt(perPage),
                page:parseInt(currentPage),
                searchValue
            }
            dispatch(get_products(obj))
        },[searchValue,currentPage,perPage])


  return (
    <div className='px-2 lg:px-7 pt-5'>
        <h1 className="text-[#000000] font-semibold text-lg mt-3">All Products</h1>
        <div className="w-full p-4 bg-[#6a5fdf] rounded-md">
            <Search setPerPage={setPerPage} setSearchValue={setSearchValue} searchValue={searchValue}/>
            <div className="relative overflow-x-auto mt-5">
                        <table className="w-full text-sm text-left text-[#d0d2d6] uppercase border-b border-slate-700">
                        <thead className="etxt-sm text-[#d0d2d6] uppercase border-b border-slate-700">
                            <tr>
                                <th className="py-3 px-4" scope="col">No</th>
                                <th className="py-3 px-4" scope="col">Image</th>
                                <th className="py-3 px-4" scope="col">Name</th>
                                <th className="py-3 px-4" scope="col">Category</th>
                                {/* <th className="py-3 px-4" scope="col">NDVI Value</th> */}
                                <th className="py-3 px-4" scope="col">Price</th>
                                <th className="py-3 px-4" scope="col">Discount</th>
                                <th className="py-3 px-4" scope="col">Stock</th>
                                <th className="py-3 px-11" scope="col">Action</th>

                            </tr>
                        </thead>
                        <tbody>
                            {
                            products.map((d,i)=> 
                            <tr key={i} className='border-b border-slate-700'>
                                <td scope="row" className="py-1 px-4 font-medium whitespace-nowrap">
                                    {i+1}
                                </td>
                                <td scope="row" className="py-1 px-4 font-medium whitespace-nowrap">
                                    <img src={d.images[0]} className="w-[45px] h-[45px]"/>
                                </td>

                                <td scope="row" className="py-1 px-4 font-medium whitespace-nowrap">
                                    {/* {d?.name?.slice(0,15)}... */}
                                    {/* {d?.name.length>15?.slice(0,15)} */}
                                    {
                                        d.name.length>15?d.name.slice(0,15)+"...":d.name
                                    }
                                </td>

                                <td scope="row" className="py-1 px-4 font-medium whitespace-nowrap">
                                    {d.category}
                                </td>
                                {/* <td scope="row" className="py-1 px-4 font-medium whitespace-nowrap">
                                    0.7
                                </td> */}
                                <td scope="row" className="py-1 px-4 font-medium whitespace-nowrap">
                                    &#8377;{d.price}
                                </td>
                                <td scope="row" className="py-1 px-4 font-medium whitespace-nowrap">
                                    {d.discount===0?<span>No Discount</span>:<span>{d.discount}%</span>}
                                </td>
                                <td scope="row" className="py-1 px-4 font-medium whitespace-nowrap">
                                    {d.stock}
                                </td>
                                
                                <td scope="row" className="py-1 px-4 font-medium whitespace-nowrap">
                                    <div className="flex justify-start items-center gap-4">
                                        <Link to={`/seller/dashboard/edit-product/${d._id}`} className="p-[6px] bg-yellow-500 rounded hover:shadow-lg hover:shadow-yellow-500/50"><FaEdit/></Link>
                                        <Link to={`/seller/dashboard/add-banner/${d._id}`} className='p-[6px] bg-sky-500 rounded hover:shadow-lg hover:shadow-yellow-500/50'> <LuImageMinus /> </Link> 
                                        <Link className="p-[6px] bg-green-500 rounded hover:shadow-lg hover:shadow-green-500/50"><FaEye/></Link>
                                        <Link className="p-[6px] bg-red-500 rounded hover:shadow-lg hover:shadow-red-500/50"><FaTrash/></Link>
                                    </div>
                                </td>
                            </tr>
                            )
                            }
                        </tbody>
                        </table>
                    </div>
                    
                    {
                        totalProduct<=perPage ? "":<div className="w-full flex justify-end items-center mt-4 bottom-4 right-4">
                            <Pagination
                                pageNumber={currentPage}
                                setPageNumber={setCurrentPage}
                                totalItem={50}
                                perPage={perPage}
                                showItem={3}
                            />
                        </div>
                    }

        </div>
    </div>
  )
}
