import React, { useState, useEffect } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { FaEdit, FaEye, FaTrash } from 'react-icons/fa'
import { LuImageMinus } from "react-icons/lu"
import Pagination from '../Pagination'
import Search from '../components/Search'
import { useSelector, useDispatch } from 'react-redux'
import { get_products } from '../../store/Reducers/productReducer'

const Products = () => {
  const dispatch = useDispatch()
  const { products, totalProduct } = useSelector(state => state.product)
  const [currentPage, setCurrentPage] = useState(1)
  const [searchValue, setSearchValue] = useState('')
  const [perPage, setPerPage] = useState(5)

  useEffect(() => {
    const obj = {
      perPage: parseInt(perPage),
      page: parseInt(currentPage),
      searchValue
    }
    dispatch(get_products(obj))
  }, [searchValue, currentPage, perPage])

  // Calculate the starting index for the current page
  const indexOfLastProduct = currentPage * perPage
  const indexOfFirstProduct = indexOfLastProduct - perPage

  return (
    <div className='px-2 lg:px-7 pt-5'>
      <div className="flex flex-wrap items-center justify-between mb-5">
        <h1 className="text-[#000000] font-semibold text-2xl">All Products</h1>
        <Link to="/seller/dashboard/add-product" className="bg-[#6a5fdf] hover:shadow-blue-500/50 hover:shadow-lg rounded-md px-7 py-2 text-white">
          Add Product
        </Link>
      </div>

      <div className="w-full p-4 bg-white rounded-lg shadow-lg">
        <Search setPerPage={setPerPage} setSearchValue={setSearchValue} searchValue={searchValue}/>
        <div className="relative overflow-x-auto mt-5">
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
                <th className="py-4 px-11">Action</th>
              </tr>
            </thead>
            <tbody>
              {products.map((d, i) => (
                <tr key={i} className='border-b hover:bg-gray-50'>
                  <td className="py-3 px-4">{indexOfFirstProduct + i + 1}</td>
                  <td className="py-3 px-4">
                    <img src={d.images[0]} alt={d.name} className="w-[45px] h-[45px] rounded-lg object-cover"/>
                  </td>
                  <td className="py-3 px-4 font-medium">
                    {d.name.length > 15 ? d.name.slice(0, 15) + "..." : d.name}
                  </td>
                  <td className="py-3 px-4">{d.category}</td>
                  <td className="py-3 px-4 font-medium">₹{d.price}</td>
                  <td className="py-3 px-4">
                    {d.discount === 0 ? (
                      <span className="text-gray-500">No Discount</span>
                    ) : (
                      <span className="text-green-500 font-medium">{d.discount}%</span>
                    )}
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-3 py-1 rounded-full text-xs ${
                      d.stock > 10 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {d.stock}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex justify-start items-center gap-3">
                      <Link 
                        to={`/seller/dashboard/edit-product/${d._id}`} 
                        className="p-2 bg-yellow-500 rounded-full hover:shadow-lg hover:shadow-yellow-500/50 text-white transition-all"
                      >
                        <FaEdit/>
                      </Link>
                      <Link 
                        to={`/seller/dashboard/add-banner/${d._id}`} 
                        className='p-2 bg-sky-500 rounded-full hover:shadow-lg hover:shadow-sky-500/50 text-white transition-all'
                      >
                        <LuImageMinus />
                      </Link>
                      <button 
                        onClick={() => Navigate(`/product/details/${d._id}`)}
                        className="p-2 bg-green-500 rounded-full hover:shadow-lg hover:shadow-green-500/50 text-white transition-all"
                      >
                        <FaEye/>
                      </button>
                      <button 
                        onClick={() => handleDelete(d._id)}
                        className="p-2 bg-red-500 rounded-full hover:shadow-lg hover:shadow-red-500/50 text-white transition-all"
                      >
                        <FaTrash/>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {products.length === 0 && (
                <tr>
                  <td colSpan="8" className="py-8 text-center text-gray-500">
                    No products found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {totalProduct <= perPage ? "" : (
          <div className="w-full flex justify-end mt-5">
            <Pagination
              pageNumber={currentPage}
              setPageNumber={setCurrentPage}
              totalItem={totalProduct}
              perPage={perPage}
              showItem={3}
              className="pagination-bar"
            />
          </div>
        )}
      </div>
    </div>
  )
}

export default Products