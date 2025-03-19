import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { get_category } from '../../store/Reducers/categoryReducer'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { get_product, messageClear, update_product, product_image_update } from '../../store/Reducers/productReducer'
import { PropagateLoader } from 'react-spinners'
import { overrideStyle } from '../../utils/utils'
import toast from 'react-hot-toast'
import { FaArrowLeft } from 'react-icons/fa'

export default function EditProduct() {
  const navigate = useNavigate()
  const { productId } = useParams()
  const dispatch = useDispatch()
  const { categories } = useSelector(state => state.category)
  const { loader, product, successMessage, errorMessage } = useSelector(state => state.product)

  const [state, setState] = useState({
    name: "",
    description: "",
    discount: "",
    price: "",
    stock: "",
  })

  const [cateShow, setCateShow] = useState(false)
  const [allCategory, setAllCategory] = useState([])
  const [category, setCategory] = useState('')
  const [searchValue, setSearchValue] = useState('')
  const [imageShow, setImageShow] = useState([])

  useEffect(() => {
    dispatch(get_category({
      searchValue: "",
      perPage: "",
      page: ""
    }))
  }, [])

  useEffect(() => {
    dispatch(get_product(productId))
  }, [productId])

  useEffect(() => {
    if (errorMessage) {
      toast.error(errorMessage)
      dispatch(messageClear())
    }
    if (successMessage) {
      toast.success(successMessage)
      dispatch(messageClear())
    }
  }, [successMessage, errorMessage])

  const inputHandle = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value
    })
  }

  const categorySearch = (e) => {
    const value = e.target.value
    setSearchValue(value)
    if (value) {
      let searchValue = allCategory.filter(c => c.name.toLowerCase().indexOf(value.toLowerCase()) > -1)
      setAllCategory(searchValue)
    } else {
      setAllCategory(categories)
    }
  }

  const changeImage = (img, files) => {
    if (files.length > 0) {
      dispatch(product_image_update({
        oldImage: img,
        newImage: files[0],
        productId
      }))
    }
  }

  const update = (e) => {
    e.preventDefault()
    const obj = {
      name: state.name,
      description: state.description,
      discount: state.discount,
      price: state.price,
      stock: state.stock,
      productId: productId
    }
    dispatch(update_product(obj))
  }

  useEffect(() => {
    setState({
      name: product.name,
      description: product.description,
      discount: product.discount,
      price: product.price,
      stock: product.stock,
    })
    setCategory(product.category)
    setImageShow(product.images)
  }, [product])

  useEffect(() => {
    if (categories.length > 0) {
      setAllCategory(categories)
    }
  }, [categories])

  return (
    <div className='px-2 lg:px-7 pt-5'>
      <div className='w-full bg-white p-4 rounded-lg'>
        <div className='flex justify-between items-center pb-4 border-b border-gray-200'>
          <div className='flex items-center gap-3'>
            <button onClick={() => navigate(-1)} className='text-gray-600 hover:text-blue-600'>
              <FaArrowLeft className='text-xl'/>
            </button>
            <h1 className='text-xl font-semibold text-gray-700'>Edit Product</h1>
          </div>
          <Link to='/seller/dashboard/products' className='bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-all'>
            All Products
          </Link>
        </div>

        <div className='w-full p-4'>
          <form onSubmit={update}>
            <div className='flex flex-col md:flex-row gap-4 w-full mb-4'>
              <div className='flex flex-col w-full'>
                <label htmlFor='name' className='text-gray-600 font-medium mb-2'>Product Name</label>
                <input
                  type='text'
                  name='name'
                  id='name'
                  className='px-4 py-2 border border-gray-200 rounded focus:border-blue-500 outline-none'
                  placeholder='Product Name'
                  value={state.name}
                  onChange={inputHandle}
                />
              </div>

              <div className='flex flex-col w-full relative'>
                <label htmlFor='category' className='text-gray-600 font-medium mb-2'>Category</label>
                <input
                  readOnly
                  onClick={() => setCateShow(!cateShow)}
                  type='text'
                  id='category'
                  className='px-4 py-2 border border-gray-200 rounded focus:border-blue-500 outline-none cursor-pointer'
                  placeholder='Select Category'
                  value={category}
                />
                {cateShow && (
                  <div className='absolute top-[100%] left-0 right-0 bg-white border border-gray-200 rounded-md mt-1 z-50'>
                    <div className='p-3 border-b'>
                      <input
                        type='text'
                        placeholder='Search'
                        className='w-full px-3 py-2 border border-gray-200 rounded focus:border-blue-500 outline-none'
                        value={searchValue}
                        onChange={categorySearch}
                      />
                    </div>
                    <div className='max-h-[200px] overflow-y-auto'>
                      {allCategory.map((c, i) => (
                        <div
                          key={i}
                          onClick={() => {
                            setCateShow(false)
                            setCategory(c.name)
                            setSearchValue('')
                            setAllCategory(categories)
                          }}
                          className={`px-4 py-2 cursor-pointer hover:bg-gray-50 ${category === c.name ? 'bg-blue-50' : ''}`}
                        >
                          {c.name}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className='flex flex-col md:flex-row gap-4 w-full mb-4'>
              <div className='flex flex-col w-full'>
                <label htmlFor='stock' className='text-gray-600 font-medium mb-2'>Stock</label>
                <input
                  type='number'
                  name='stock'
                  id='stock'
                  className='px-4 py-2 border border-gray-200 rounded focus:border-blue-500 outline-none'
                  placeholder='Stock Quantity'
                  value={state.stock}
                  onChange={inputHandle}
                />
              </div>

              <div className='flex flex-col w-full'>
                <label htmlFor='price' className='text-gray-600 font-medium mb-2'>Price</label>
                <input
                  type='number'
                  name='price'
                  id='price'
                  className='px-4 py-2 border border-gray-200 rounded focus:border-blue-500 outline-none'
                  placeholder='Price'
                  value={state.price}
                  onChange={inputHandle}
                />
              </div>

              <div className='flex flex-col w-full'>
                <label htmlFor='discount' className='text-gray-600 font-medium mb-2'>Discount (%)</label>
                <input
                  type='number'
                  name='discount'
                  id='discount'
                  className='px-4 py-2 border border-gray-200 rounded focus:border-blue-500 outline-none'
                  placeholder='Discount Percentage'
                  value={state.discount}
                  onChange={inputHandle}
                />
              </div>
            </div>

            <div className='flex flex-col w-full mb-4'>
              <label htmlFor='description' className='text-gray-600 font-medium mb-2'>Description</label>
              <textarea
                name='description'
                id='description'
                rows='5'
                className='px-4 py-2 border border-gray-200 rounded focus:border-blue-500 outline-none resize-none'
                placeholder='Product Description'
                value={state.description}
                onChange={inputHandle}
              ></textarea>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-4'>
              {imageShow && imageShow.map((img, i) => (
                <div key={i} className='relative group'>
                  <label htmlFor={`image-${i}`} className='block cursor-pointer'>
                    <img src={img} alt='product' className='w-full h-[150px] object-cover rounded-lg'/>
                    <div className='absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center'>
                      <span className='text-white text-sm'>Click to change</span>
                    </div>
                  </label>
                  <input
                    type='file'
                    id={`image-${i}`}
                    className='hidden'
                    onChange={(e) => changeImage(img, e.target.files)}
                  />
                </div>
              ))}
            </div>

            <div>
              <button
                disabled={loader}
                type='submit'
                className='bg-blue-500 hover:bg-blue-600 text-white px-8 py-2 rounded-md transition-all disabled:bg-blue-400 disabled:cursor-not-allowed'
              >
                {loader ? (
                  <PropagateLoader cssOverride={overrideStyle} color='#fff' size={15}/>
                ) : (
                  'Update Product'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}