import { useEffect, useState } from 'react'
import { IoMdCloseCircle, IoMdImages } from 'react-icons/io';
import {Link} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { get_category } from '../../store/Reducers/categoryReducer.js';
import { add_product, messageClear } from '../../store/Reducers/productReducer.js';
import { overrideStyle } from "../../utils/utils.js";
import { PropagateLoader } from "react-spinners";
import toast from 'react-hot-toast';

export default function AddProduct() {
  const dispatch=useDispatch();
  const {categories}=useSelector(state=>state.category)
  const {loader,successMessage,errorMessage}=useSelector(state=>state.product)

  useEffect(()=>{
    dispatch(get_category({
      page:"",
      searchValue:"",
      perPage:""
    }))
  },[])

  const [state,setState]=useState({
    name:"",
    description:"",
    discount:"",
    price:"",
    stock:"",

  })
  

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
        setState({
            name:"",
            description:"",
            discount:"",
            price:"",
            stock:""
        })
        setImageShow([])
        setCategory([])
        setImages([]);
       
    }
},[successMessage,errorMessage])

  const [images,setImages]=useState([]);
  const [imageShow,setImageShow]=useState([]);

  const imageHandle=(e)=>{
    const files=e.target.files
    const length=files.length;
    if(length>0){
      setImages([...images,...files])
      let imageUrl=[]
      for(let i=0;i<length;i++){
        imageUrl.push({url:URL.createObjectURL(files[i])});

      }
      setImageShow([...imageShow,...imageUrl])
    }
  }
  // console.log(images);
  // console.log(imageShow);

  const changeImage=(img,index)=>{
    if(img){
      let tempUrl=imageShow;
      let tempImages=images;
      tempImages[index]=img
      tempUrl[index]={url:URL.createObjectURL(img)}
      setImageShow([...tempUrl])
      setImages([...tempImages])
    }
  }

  const removeImage=(i)=>{
    const filterImage=images.filter((img,index)=>index!==i);
    const filterImageUrl=imageShow.filter((img,index)=>index!==i)
    setImages(filterImage);
    setImageShow(filterImageUrl);
  }

  const add=(e)=>{
    e.preventDefault();
    const formData=new FormData()
    formData.append('name',state.name)
    formData.append('description',state.description)
    formData.append('price',state.price)
    formData.append('stock',state.stock)
    formData.append('discount',state.discount)
    formData.append('shopName','Organic Store')
    formData.append('category',category)
    for(let i=0;i<images.length;i++){
      formData.append('images',images[i])
    }
    dispatch(add_product(formData));
    // console.log(state);
  }

  useEffect(()=>{
    setAllCategory(categories)
  },[categories])


    return (
    <div className='px-2 lg:px-7 pt-5'>
      <div className='w-full p-4 bg-[#6a5fdf] rounded-md'>
        <div className='flex justify-between items-center pb-4'>
          <h1 className='text-[#d0d2d6] text-xl font-semibold'>
            Add Product
          </h1>
          <Link  to='/seller/dashboard/products' className='bg-blue-500 hover:shadow-blue-500/50 hover:shadow-lg text-white rounded-md px-7 py-2 my-2'>
              All Products
          </Link>
        </div>

        <div>
          <form onSubmit={add}>
            <div className='flex flex-col mb-3 md:flex-row gap-4 w-full text-[#d0d2d6]'>
              {/* name */}
              <div className='flex flex-col w-full gap-1'>
                <label htmlFor='name'>Product Name</label>
                <input onChange={inputHandle} value={state.name} className='px-4 py-2 focus:border-indigo-500 outline-none bg-[#6a5fdf] border-slate-700 rounded-md text-[#ecedef]' type='text' name='name' id='name' placeholder='Product Name'/>
              </div>

              
              
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
                      allCategory.map((c,i)=><span className={`px-4 py-2 hover:bg-indigo-500 hover:text-white hover:shadow-lg w-full cursor-pointer ${category===c.name && 'bg-indigo-500'}`} key={i} onClick={()=>{
                        setCateShow(false)
                        setCategory(c.name);
                        setSearchValue('')
                        setAllCategory(categories)
                      }}>{c.name}</span>)
                    }
                  </div>
                </div>
              </div>


              {/* ndvi */}
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


            
            <div className='grid lg:grid-cols-4 grid-cols-1 md:grid-cols-3 sm:grid-cols-2 sm:gap-4 md:gap-4 gap-3 w-full text-[#d0d2d6] mb-4'>
                  {
                    imageShow.map((img,i)=><div key={i} className='h-[180px] relative'>
                      <label htmlFor={i}>
                        <img src={img.url} className='w-full h-full rounded-sm'/>
                      </label>
                      <input onChange={(e)=>changeImage(e.target.files[0],i)} type='file' id={i} className='hidden'/>
                      <span onClick={()=>removeImage(i)} className='p-2 z-10 cursor-pointer bg-slate-700 hover:shadow-md hover:shadow-slate-400/40 text-white absolute top-1 right-1 rounded-full'><IoMdCloseCircle/></span>
                    </div>)
                  }
                  <label className='flex justify-center items-center flex-col h-[180px] cursor-pointer border border-dashed hover:border-red-500 w-full text-[#d0d2d6]' htmlFor='image'>
                    <span>
                      <IoMdImages/>
                    </span>
                    <span>
                      Select Image
                    </span>
                    <span>
                      (more than 1)
                    </span>
                  </label>
                  <input multiple  onChange={imageHandle} className='hidden' type='file' id='image'/>
                  
            </div>

            <div className='flex'>
              <button disabled={loader?true:false} className='bg-red-500 w-[250px] hover:shadow-red-300/50 hover:shadow-lg text-white rounded-md px-7 py-2 mb-3'>
                  {
                      loader?<PropagateLoader cssOverride={overrideStyle} color='#fff'/>:'Add Product'
                  }
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  )
}
