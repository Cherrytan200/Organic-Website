import { useEffect, useState } from 'react'
import { IoMdCloseCircle, IoMdImages } from 'react-icons/io';
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { get_category } from '../../store/Reducers/categoryReducer.js';
import { add_product, messageClear } from '../../store/Reducers/productReducer.js';
import { overrideStyle } from "../../utils/utils.js";
import { PropagateLoader } from "react-spinners";
import toast from 'react-hot-toast';

export default function AddProduct() {
  const dispatch = useDispatch();
  const { categories } = useSelector(state => state.category)
  const { loader, successMessage, errorMessage } = useSelector(state => state.product)

  useEffect(() => {
    dispatch(get_category({
      page: "",
      searchValue: "",
      perPage: ""
    }))
  }, [])

  const [state, setState] = useState({
    name: "",
    description: "",
    discount: "",
    price: "",
    stock: "",
  })

  const [cateShow, setCateShow] = useState(false);
  const [allCategory, setAllCategory] = useState([])
  const [category, setCategory] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [images, setImages] = useState([]);
  const [imageShow, setImageShow] = useState([]);

  const inputHandle = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value
    })
  }

  const categorySearch = (e) => {
    const value = e.target.value;
    setSearchValue(value)
    if (value) {
      let searchValue = allCategory.filter(c => c.name.toLowerCase().indexOf(value.toLowerCase()) > -1)
      setAllCategory(searchValue);
    } else {
      setAllCategory(categories)
    }
  }

  const imageHandle = (e) => {
    const files = e.target.files
    const length = files.length;
    if (length > 0) {
      setImages([...images, ...files])
      let imageUrl = []
      for (let i = 0; i < length; i++) {
        imageUrl.push({ url: URL.createObjectURL(files[i]) });
      }
      setImageShow([...imageShow, ...imageUrl])
    }
  }

  const changeImage = (img, index) => {
    if (img) {
      let tempUrl = imageShow;
      let tempImages = images;
      tempImages[index] = img
      tempUrl[index] = { url: URL.createObjectURL(img) }
      setImageShow([...tempUrl])
      setImages([...tempImages])
    }
  }

  const removeImage = (i) => {
    const filterImage = images.filter((img, index) => index !== i);
    const filterImageUrl = imageShow.filter((img, index) => index !== i)
    setImages(filterImage);
    setImageShow(filterImageUrl);
  }

  const add = (e) => {
    e.preventDefault();
    const formData = new FormData()
    formData.append('name', state.name)
    formData.append('description', state.description)
    formData.append('price', state.price)
    formData.append('stock', state.stock)
    formData.append('discount', state.discount)
    formData.append('shopName', 'Organic Store')
    formData.append('category', category)
    for (let i = 0; i < images.length; i++) {
      formData.append('images', images[i])
    }
    dispatch(add_product(formData));
  }

  useEffect(() => {
    setAllCategory(categories)
  }, [categories])

  useEffect(() => {
    if (errorMessage) {
      toast.error(errorMessage)
      dispatch(messageClear())
    }
    if (successMessage) {
      toast.success(successMessage)
      dispatch(messageClear())
      setState({
        name: "",
        description: "",
        discount: "",
        price: "",
        stock: ""
      })
      setImageShow([])
      setCategory('')
      setImages([]);
    }
  }, [successMessage, errorMessage])

  return (
    <div className="px-2 lg:px-7 pt-5">
      {/* Decorative SVG Background */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <svg className="absolute left-0 top-0 opacity-10" viewBox="0 0 200 200">
          <path fill="#4CAF50" d="M44.5,-76.3C59.1,-69.9,73.3,-60.1,79.9,-46.3C86.5,-32.5,85.5,-14.7,83.3,2.2C81.1,19.1,77.7,35.1,69.3,48.5C60.9,61.9,47.5,72.7,32.4,77.7C17.3,82.7,0.4,81.9,-15.6,77.4C-31.6,73,-46.7,65,-59.4,53.3C-72.1,41.6,-82.4,26.2,-85.9,9C-89.4,-8.2,-86,-27.2,-76.6,-42.1C-67.2,-57,-51.8,-67.8,-36.3,-73.8C-20.8,-79.8,-5.2,-81,8.7,-77.8C22.7,-74.6,29.9,-82.7,44.5,-76.3Z" transform="translate(100 100)" />
        </svg>
        <svg className="absolute right-0 bottom-0 opacity-10" viewBox="0 0 200 200">
          <path fill="#FF9800" d="M39.5,-65.3C50.9,-59.8,59.7,-48.3,65.9,-35.4C72.1,-22.4,75.7,-8,74.7,6.1C73.7,20.2,68,34,59.3,45.7C50.6,57.4,38.8,67,25.3,72.3C11.9,77.6,-3.2,78.6,-17.4,74.8C-31.6,71,-44.9,62.4,-54.4,51.1C-63.9,39.8,-69.5,25.8,-72.5,10.8C-75.4,-4.2,-75.6,-20.2,-69.7,-33.5C-63.8,-46.8,-51.7,-57.4,-38.5,-62C-25.3,-66.6,-11.1,-65.2,2,-68.4C15.2,-71.5,28.1,-70.8,39.5,-65.3Z" transform="translate(100 100)" />
        </svg>
      </div>

      <div className="w-full p-4 bg-white rounded-lg shadow-lg">
        <div className="flex justify-between items-center pb-4">
          <h1 className="text-2xl font-semibold text-gray-800">
            Add Product
          </h1>
          <Link to='/seller/dashboard/products' className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300">
            All Products
          </Link>
        </div>

        <form onSubmit={add} className="w-full">
          <div className="flex flex-col md:flex-row gap-4 w-full mb-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="name">
                Product Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                value={state.name}
                onChange={inputHandle}
                placeholder="Product Name"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-4 w-full mb-4">
            <div className="flex-1 relative">
              <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="category">
                Category
              </label>
              <input
                readOnly
                onClick={() => setCateShow(!cateShow)}
                value={category}
                type="text"
                id="category"
                placeholder="Select Category"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
              />
              <div className={`absolute top-[101%] left-0 right-0 bg-white border border-gray-300 rounded-lg transition-all ${cateShow ? 'scale-100' : 'scale-0'}`}>
                <div className="p-2 border-b">
                  <input
                    type="text"
                    placeholder="Search"
                    value={searchValue}
                    onChange={categorySearch}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="max-h-[200px] overflow-y-auto">
                  {allCategory.map((c, i) => (
                    <div
                      key={i}
                      onClick={() => {
                        setCateShow(false)
                        setCategory(c.name)
                        setSearchValue('')
                        setAllCategory(categories)
                      }}
                      className={`px-3 py-2 cursor-pointer hover:bg-gray-100 ${category === c.name ? 'bg-blue-50' : ''}`}
                    >
                      {c.name}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="stock">
                Stock
              </label>
              <input
                type="number"
                name="stock"
                id="stock"
                value={state.stock}
                onChange={inputHandle}
                placeholder="Stock Quantity"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-4 w-full mb-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="price">
                Price
              </label>
              <input
                type="number"
                name="price"
                id="price"
                value={state.price}
                onChange={inputHandle}
                placeholder="Price"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="discount">
                Discount %
              </label>
              <input
                type="number"
                name="discount"
                id="discount"
                value={state.discount}
                onChange={inputHandle}
                placeholder="Discount Percentage"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="description">
              Description
            </label>
            <textarea
              name="description"
              id="description"
              value={state.description}
              onChange={inputHandle}
              placeholder="Product Description"
              rows="4"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
            {imageShow.map((img, i) => (
              <div key={i} className="relative group">
                <label htmlFor={i}>
                  <img
                    src={img.url}
                    alt=""
                    className="w-full h-[180px] object-cover rounded-lg cursor-pointer"
                  />
                </label>
                <input
                  type="file"
                  id={i}
                  className="hidden"
                  onChange={(e) => changeImage(e.target.files[0], i)}
                />
                <button
                  onClick={() => removeImage(i)}
                  className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                >
                  <IoMdCloseCircle />
                </button>
              </div>
            ))}
            <label className="h-[180px] border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-blue-500 transition-colors duration-300">
              <input
                type="file"
                multiple
                onChange={imageHandle}
                className="hidden"
                id="image"
              />
              <span className="text-3xl text-gray-400 mb-2">
                <IoMdImages />
              </span>
              <span className="text-gray-600">Select Images</span>
            </label>
          </div>

          <div className="flex justify-end">
            <button
              disabled={loader}
              type="submit"
              className="relative px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg overflow-hidden transition-all duration-300 hover:scale-105 disabled:opacity-70"
            >
              <span className="relative z-10">
                {loader ? <PropagateLoader cssOverride={overrideStyle} color='#fff' /> : 'Add Product'}
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-blue-800 transform scale-x-0 transition-transform duration-300 origin-left hover:scale-x-100"></div>
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}