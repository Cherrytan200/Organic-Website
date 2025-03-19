import { useEffect, useState } from 'react';
import { FaRegImage } from "react-icons/fa";
import { PropagateLoader } from 'react-spinners';
import { overrideStyle } from '../../utils/utils.js';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { add_banner, get_banner, messageClear, update_banner } from '../../store/Reducers/bannerReducer.js';
import toast from 'react-hot-toast';
import { FaArrowLeft } from 'react-icons/fa';

const AddBanner = () => {
    const navigate = useNavigate()
    const { productId } = useParams()
    const dispatch = useDispatch()

    const { loader, successMessage, errorMessage, banner } = useSelector(state => state.banner)

    const [imageShow, setImageShow] = useState('')
    const [image, setImage] = useState('')

    useEffect(() => {
        if (successMessage) {
            toast.success(successMessage)
            dispatch(messageClear())
            setImageShow('')
            setImage('')
        }
        if (errorMessage) {
            toast.error(errorMessage)
            dispatch(messageClear())
        }
    }, [successMessage, errorMessage])

    const imageHandle = (e) => {
        const files = e.target.files
        const length = files.length

        if (length > 0) {
            setImage(files[0])
            setImageShow(URL.createObjectURL(files[0]))
        }
    }

    const add = (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('productId', productId)
        formData.append('mainban', image)
        dispatch(add_banner(formData))
    }

    const update = (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('mainban', image)
        dispatch(update_banner({ info: formData, bannerId: banner._id }))
    }

    useEffect(() => {
        dispatch(get_banner(productId))
    }, [productId])

    return (
        <div className='px-2 lg:px-7 pt-5'>
            <div className='w-full p-4 bg-white rounded-lg'>
                <div className='flex justify-between items-center pb-4 border-b border-gray-200'>
                    <div className='flex items-center gap-3'>
                        <button onClick={() => navigate(-1)} className='text-gray-600 hover:text-blue-600'>
                            <FaArrowLeft className='text-xl' />
                        </button>
                        <h1 className='text-xl font-semibold text-gray-700'>
                            {banner ? 'Update Banner' : 'Add Banner'}
                        </h1>
                    </div>
                </div>

                <div className='w-full p-4'>
                    <div className='flex flex-wrap'>
                        <div className='w-full lg:w-8/12 px-4'>
                            {!banner ? (
                                <form onSubmit={add} className='space-y-6'>
                                    <div className='flex flex-col gap-4'>
                                        <label
                                            htmlFor='image'
                                            className='flex justify-center items-center flex-col h-[238px] cursor-pointer border-2 border-dashed border-gray-300 hover:border-blue-500 rounded-lg transition-all relative group'
                                        >
                                            <div className='flex flex-col items-center gap-2'>
                                                <span className='text-5xl text-gray-400 group-hover:text-blue-500 transition-all'>
                                                    <FaRegImage />
                                                </span>
                                                <span className='text-gray-600 group-hover:text-blue-500 transition-all'>
                                                    Choose Banner Image
                                                </span>
                                            </div>
                                            {imageShow && (
                                                <img
                                                    src={imageShow}
                                                    alt='banner preview'
                                                    className='absolute inset-0 w-full h-full object-cover rounded-lg'
                                                />
                                            )}
                                        </label>
                                        <input
                                            type='file'
                                            id='image'
                                            className='hidden'
                                            onChange={imageHandle}
                                            accept='image/*'
                                        />
                                    </div>

                                    <div className='flex justify-end'>
                                        <button
                                            disabled={loader || !image}
                                            type='submit'
                                            className='bg-blue-500 hover:bg-blue-600 text-white px-8 py-2 rounded-md transition-all disabled:bg-blue-300 disabled:cursor-not-allowed flex items-center gap-2'
                                        >
                                            {loader ? (
                                                <PropagateLoader
                                                    color='#fff'
                                                    cssOverride={overrideStyle}
                                                    size={15}
                                                />
                                            ) : (
                                                'Add Banner'
                                            )}
                                        </button>
                                    </div>
                                </form>
                            ) : (
                                <form onSubmit={update} className='space-y-6'>
                                    {banner && (
                                        <div className='mb-4'>
                                            <h2 className='text-gray-600 font-medium mb-2'>Current Banner</h2>
                                            <div className='w-full h-[238px] rounded-lg overflow-hidden'>
                                                <img
                                                    src={banner.banner}
                                                    alt='current banner'
                                                    className='w-full h-full object-cover'
                                                />
                                            </div>
                                        </div>
                                    )}

                                    <div className='flex flex-col gap-4'>
                                        <label
                                            htmlFor='image'
                                            className='flex justify-center items-center flex-col h-[238px] cursor-pointer border-2 border-dashed border-gray-300 hover:border-blue-500 rounded-lg transition-all relative group'
                                        >
                                            <div className='flex flex-col items-center gap-2'>
                                                <span className='text-5xl text-gray-400 group-hover:text-blue-500 transition-all'>
                                                    <FaRegImage />
                                                </span>
                                                <span className='text-gray-600 group-hover:text-blue-500 transition-all'>
                                                    Choose New Banner Image
                                                </span>
                                            </div>
                                            {imageShow && (
                                                <img
                                                    src={imageShow}
                                                    alt='banner preview'
                                                    className='absolute inset-0 w-full h-full object-cover rounded-lg'
                                                />
                                            )}
                                        </label>
                                        <input
                                            type='file'
                                            id='image'
                                            className='hidden'
                                            onChange={imageHandle}
                                            accept='image/*'
                                        />
                                    </div>

                                    <div className='flex justify-end'>
                                        <button
                                            disabled={loader || !image}
                                            type='submit'
                                            className='bg-blue-500 hover:bg-blue-600 text-white px-8 py-2 rounded-md transition-all disabled:bg-blue-300 disabled:cursor-not-allowed flex items-center gap-2'
                                        >
                                            {loader ? (
                                                <PropagateLoader
                                                    color='#fff'
                                                    cssOverride={overrideStyle}
                                                    size={15}
                                                />
                                            ) : (
                                                'Update Banner'
                                            )}
                                        </button>
                                    </div>
                                </form>
                            )}
                        </div>

                        <div className='w-full lg:w-4/12 px-4'>
                            <div className='p-4 bg-gray-50 rounded-lg'>
                                <h2 className='text-lg font-semibold text-gray-700 mb-4'>Banner Guidelines</h2>
                                <ul className='list-disc list-inside space-y-2 text-gray-600'>
                                    <li>Recommended size: 1920x500 pixels</li>
                                    <li>Maximum file size: 2MB</li>
                                    <li>Supported formats: JPG, PNG</li>
                                    <li>Use high-quality images</li>
                                    <li>Ensure text is readable</li>
                                    <li>Avoid overcrowding the banner</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddBanner;