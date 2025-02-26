import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { get_category } from '../../store/Reducers/categoryReducer.js';
import {Link,useParams} from 'react-router-dom'
import { get_product, messageClear, update_product,product_image_update } from '../../store/Reducers/productReducer.js';
import { PropagateLoader } from 'react-spinners';
import { overrideStyle } from '../../utils/utils.js';
import toast from 'react-hot-toast';



export default function EditProduct() {

  const {productId}=useParams()

  const dispatch=useDispatch();
  const {categories}=useSelector(state=>state.category)
  const {loader,product,successMessage,errorMessage}=useSelector(state=>state.product)




  const [state,setState]=useState({
    name:"",
    description:"",
    discount:"",
    price:"",
    stock:"",

  })

  useEffect(()=>{
    dispatch(get_category({
      page:"",
      searchValue:"",
      perPage:""
    }))
  },[])


  useEffect(()=>{
    dispatch(get_product(productId))
  },[productId])
  

  useEffect(()=>{
    if(errorMessage){
        toast.error(errorMessage,{
            position:'top-right',
            style:{
                backgroundColor:'#ff0000',
                color:'#fff'
            }
        })
        dispatch(messageClear())
    }
    if(successMessage){
        toast.success(successMessage,{
            position:'top-right',
            style:{
                backgroundColor:'#00ff00',
                color:'#000'
            }
        })
        dispatch(messageClear())
        
       
    }
},[successMessage,errorMessage])


  const [cateShow, setCateShow] = useState(false);
  const [allCategory, setAllCategory] = useState([])
  const [category,setCategory]=useState('');
  const [searchValue,setSearchValue]=useState('');
  const inputHandle=(e)=>{
    setState({
      ...state,
      [e.target.name]:e.target.value
    })
  }
  const categorySearch=(e)=>{
    const value=e.target.value;
    setSearchValue(value)
    if(value){
      let searchValue=allCategory.filter(c=>c.name.toLowerCase().indexOf(value.toLowerCase())>-1)
      setAllCategory(searchValue);
    }else{
      setAllCategory(categories)
    }
  }
  
  const [imageShow,setImageShow]=useState([]);

  
  
  const changeImage=(img,files)=>{
    if(files.length>0){
       dispatch(product_image_update({
        oldImage:img,
        newImage:files[0],
        productId
       }))
    }
  }

  const update=(e)=>{
    e.preventDefault();
    const obj={
      name:state.name,
      description:state.description,
      discount:state.discount,
      price:state.price,
      stock:state.stock,
      productId:productId
    }
    dispatch(update_product(obj))
  }

  useEffect(()=>{
    setState({
        name:product.name,
        description:product.description,
        discount:product.discount,
        price:product.price,
        stock:product.stock,
    })
    setCategory(product.category)
    setImageShow(product.images)
  },[product])

  useEffect(()=>{
    if(categories.length){
      setAllCategory(categories)
    }
  },[categories])

    return (
    <div className='px-2 lg:px-7 pt-5'>
      <div className='w-full p-4 bg-[#6a5fdf] rounded-md'>
        <div className='flex justify-between items-center pb-4'>
          <h1 className='text-[#d0d2d6] text-xl font-semibold'>
            Edit Product
          </h1>
          <Link  to='/seller/dashboard/products' className='bg-blue-500 hover:shadow-blue-500/50 hover:shadow-lg text-white rounded-md px-7 py-2 my-2'>
              All Products
          </Link>
        </div>

        <div>
          <form onSubmit={update}>
            <div className='flex flex-col mb-3 md:flex-row gap-4 w-full text-[#d0d2d6]'>
              {/* name */}
              <div className='flex flex-col w-full gap-1'>
                <label htmlFor='name'>Product Name</label>
                <input onChange={inputHandle} value={state.name} className='px-4 py-2 focus:border-indigo-500 outline-none bg-[#6a5fdf] border-slate-700 rounded-md text-[#ecedef]' type='text' name='name' id='name' placeholder='Product Name'/>
              </div>

              {/* ndvi
              <div className='flex flex-col w-full gap-1'>
                <label htmlFor='ndvi'>NDVI Value</label>
                <input onChange={inputHandle} value={state.ndvi} className='px-4 py-2 focus:border-indigo-500 outline-none bg-[#6a5fdf] border-slate-700 rounded-md text-[#ecedef]' type='text' name='ndvi' id='ndvi' placeholder='Enter NDVI Value'/>
              </div> */}
              
            </div>

            <div className='flex flex-col mb-3 md:flex-row gap-4 w-full text-[#d0d2d6]'>
            {/* Category */}
              <div className='flex flex-col w-full gap-1 relative'>
                <label htmlFor='category'>Category</label>
                <input readOnly onClick={()=>setCateShow(!cateShow)} onChange={inputHandle} value={category} className='px-4 py-2 focus:border-indigo-500 outline-none bg-[#6a5fdf] border-slate-700 rounded-md text-[#ecedef]' type='text' id='category' placeholder='---select category---'/>
                <div className={`absolute top-[101%] bg-[#475569] w-full transition-all ${cateShow? 'scale-100' : 'scale-0'}`}>
                  <div className='w-full px-4 py-2 fixed'>
                      <input onChange={categorySearch} value={searchValue} type='text' className='px-3 w-full py-1 focus:border-indigo-500 outline-none bg-transparent border border-slate-700 rounded-md text-[#d0d2d6] overflow-hidden' placeholder='search'/>
                  </div>
                  <div className='pt-14'>

                  </div>
                  <div className='flex justify-start items-start flex-col h-[200px] overflow-x-scrool'>
                    {
                      allCategory.length>0 &&  allCategory.map((c,i)=><span className={`px-4 py-2 hover:bg-indigo-500 hover:text-white hover:shadow-lg w-full cursor-pointer ${category===c.name && 'bg-indigo-500'}`} key={i} onClick={()=>{
                        setCateShow(false)
                        setCategory(c.name);
                        setSearchValue('')
                        setAllCategory(categories)
                      }}>{c.name}</span>)
                    }
                  </div>
                </div>
              </div>


              {/* Stock */}
              <div className='flex flex-col w-full gap-1'>
                <label htmlFor='stock'>Product Stock</label>
                <input onChange={inputHandle} value={state.stock} className='px-4 py-2 focus:border-indigo-500 outline-none bg-[#6a5fdf] border-slate-700 rounded-md text-[#ecedef]' type='text' name='stock' id='stock' placeholder='Enter Stock'/>
              </div>
              
            </div>

            <div className='flex flex-col mb-3 md:flex-row gap-4 w-full text-[#d0d2d6]'>
              {/* price */}
              <div className='flex flex-col w-full gap-1'>
                <label htmlFor='price'>Price</label>
                <input onChange={inputHandle} value={state.price} className='px-4 py-2 focus:border-indigo-500 outline-none bg-[#6a5fdf] border-slate-700 rounded-md text-[#ecedef]' type='number' name='price' id='price' placeholder='Enter Price'/>
              </div>

              {/* discount */}
              <div className='flex flex-col w-full gap-1'>
                <label htmlFor='discount'>Discount</label>
                <input onChange={inputHandle} value={state.discount} className='px-4 py-2 focus:border-indigo-500 outline-none bg-[#6a5fdf] border-slate-700 rounded-md text-[#ecedef]' type='number' name='discount' id='discount' placeholder='Enter Discount%'/>
              </div>
              
            </div>
            <div className='flex flex-col w-full gap-1 mb-5'>
              <label htmlFor='description' className='text-[#d0d2d6]'>Description</label>
              <textarea onChange={inputHandle} value={state.description} className='px-4 py-2 focus:border-indigo-500 outline-none bg-[#6a5fdf] border-slate-700 rounded-md text-[#ecedef]'  name='description' id='description' placeholder='Enter Description' cols='7' rows='4'>Enter Description</textarea>
              {/* <input onChange={inputHandle} value={state.description} className='px-4 py-2 focus:border-indigo-500 outline-none bg-[#6a5fdf] border-slate-700 rounded-md text-[#ecedef]' type='text' name='description' id='description' placeholder='Enter '/> */}
            </div>


            {/* image */}
            <div className='grid lg:grid-cols-4 grid-cols-1 md:grid-cols-3 sm:grid-cols-2 sm:gap-4 md:gap-4 gap-3 w-full text-[#d0d2d6] mb-4'>
                  
                  {
                    (imageShow && imageShow.length>0) && imageShow.map((img,i)=><div key={i}>
                        <label htmlFor={i}>
                            <img src={img} alt='image'/>
                        </label>
                        <input onChange={(e)=>changeImage(img,e.target.files)} className='hidden' type='file' id={i}/>
                    </div>)
                  }
            </div>

            <div>
              <button disabled={loader?true:false} className='bg-red-500 w-[250px] hover:shadow-red-300/50 hover:shadow-lg text-white rounded-md px-7 py-2 mb-3'>
                  {
                      loader?<PropagateLoader cssOverride={overrideStyle} color='#fff'/>:'Save Changes'
                  }
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  )
}
