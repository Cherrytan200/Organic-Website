import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import { FaEdit, FaImage, FaTrash } from "react-icons/fa";
import { IoMdCloseCircle } from 'react-icons/io'
import { HiOutlineExclamationTriangle } from 'react-icons/hi2';
import { overrideStyle } from "../../utils/utils.js";
import { PropagateLoader } from "react-spinners";
import { categoryAdd, messageClear, get_category, updateCategory, deleteCategory } from "../../store/Reducers/categoryReducer.js";
import { useDispatch, useSelector } from "react-redux";
import { Toaster, toast } from 'react-hot-toast';
import Search from "../components/Search.jsx";
import Pagination from './../Pagination.jsx';

export default function Category() {
    const dispatch = useDispatch();
    const { loader, successMessage, errorMessage, categories, totalCategory } = useSelector(state => state.category)

    const [currentPage, setCurrentPage] = useState(1);
    const [searchValue, setSearchValue] = useState('');
    const [show, setShow] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleteItemId, setDeleteItemId] = useState(null);
    const [perPage, setPerPage] = useState(5);
    const [imageShow, setImage] = useState('');
    const [isEdit, setIsEdit] = useState(false)
    const [editId, setEditId] = useState(null)
    const [state, setState] = useState({
        name: '',
        image: ''
    })

    const imageHandle = (e) => {
        let files = e.target.files
        if(files.length > 0){
            setImage(URL.createObjectURL(files[0]))
            setState({
                ...state,
                image:files[0]
            })
        }
    }

    const addOrUpdateCategory = (e) => {
        e.preventDefault()
        if (isEdit) {
            dispatch(updateCategory({ id:editId, ...state }))
        } else {
            dispatch(categoryAdd(state))
        }
    }

    const handleDeleteClick = (id) => {
        setDeleteItemId(id);
        setShowDeleteModal(true);
    }

    const confirmDelete = () => {
        dispatch(deleteCategory(deleteItemId));
        setShowDeleteModal(false);
        setDeleteItemId(null);
    }

    useEffect(() => {
        if(errorMessage){
            toast.error(errorMessage, {
                duration: 3000,
                position: "top-right",
                style: {
                    background: '#fff',
                    color: '#e74c3c',
                    padding: '16px',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                },
            });
            dispatch(messageClear())
        }
    }, [errorMessage])

    useEffect(() => {
        if(successMessage){
            toast.success(successMessage, {
                duration: 3000,
                position: "top-right",
                style: {
                    background: '#fff',
                    color: '#2ecc71',
                    padding: '16px',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                },
            });
            dispatch(messageClear())
            setState({ name:'', image:'' })
            setImage('')
            setIsEdit(false)
            setEditId(null)
            setShow(false)
        }
    }, [successMessage])

    useEffect(() => {
        const obj = {
            perPage: parseInt(perPage),
            page: parseInt(currentPage),
            searchValue
        }
        dispatch(get_category(obj))
    }, [searchValue, currentPage, perPage])

    const handleEdit = (category) => {
        setState({
            name: category.name,
            image: category.image
        })
        setImage(category.image)
        setEditId(category._id)
        setIsEdit(true)
        setShow(true)
    }

    return (
        <div className='px-2 lg:px-7 pt-5'>
            <Toaster />

            {/* Delete Confirmation Modal */}
            {showDeleteModal && (
                <>
                    <div className="fixed inset-0 z-[60] bg-black bg-opacity-50 backdrop-blur-sm"></div>
                    <div className="fixed inset-0 z-[70] overflow-y-auto">
                        <div className="flex min-h-screen items-end justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0">
                        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
                        <span className="hidden sm:inline-block sm:h-screen sm:align-middle">&#8203;</span>
                        <div className="relative inline-block transform overflow-hidden rounded-lg bg-white text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:align-middle">
                            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <div className="sm:flex sm:items-start">
                                    <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                                        <HiOutlineExclamationTriangle className="h-6 w-6 text-red-600" />
                                    </div>
                                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                        <h3 className="text-lg font-medium leading-6 text-gray-900">
                                            Delete Category
                                        </h3>
                                        <div className="mt-2">
                                            <p className="text-sm text-gray-500">
                                                Are you sure you want to delete this category?
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                <button
                                    type="button"
                                    onClick={confirmDelete}
                                    className="inline-flex w-full justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                                >
                                    Yes, I&apos;m sure
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setShowDeleteModal(false)}
                                    className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                                >
                                    No, cancel
                                </button>
                            </div>
                            </div>
                        </div>
                    </div>
                </>
            )}

            {/* Main Content */}
            <div className={`min-h-screen bg-[#dee9e3] ${showDeleteModal ? 'opacity-20' : ''} transition-opacity duration-300`}>
                <div className="flex flex-wrap w-full">
                    {/* Categories Table Section */}
                    <div className='w-full lg:w-7/12'>
                        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                            <div className="p-6">
                                <div className="flex justify-between items-center mb-6">
                                    <h1 className="text-xl font-semibold text-gray-800">Categories</h1>
                                    <button 
                                        onClick={() => setShow(true)}
                                        className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-all duration-300"
                                    >
                                        Add New Category
                                    </button>
                                </div>

                                <Search setPerPage={setPerPage} setSearchValue={setSearchValue} searchValue={searchValue}/>

                                <div className="mt-6">
                                    <div className="overflow-x-auto">
                                        <table className="w-full">
                                            <thead>
                                                <tr className="bg-gray-50">
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">No</th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody className="bg-white divide-y divide-gray-200">
                                                {categories.map((d, i) => (
                                                    <tr key={i} className="hover:bg-gray-50 transition-colors duration-200">
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                            {((currentPage - 1) * perPage) + i + 1}
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            <div className="h-10 w-10 rounded-lg overflow-hidden bg-gray-100">
                                                                <img 
                                                                    src={d.image} 
                                                                    alt={d.name}
                                                                    className="h-full w-full object-cover"
                                                                />
                                                            </div>
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                            {d.name}
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                            <div className="flex space-x-3">
                                                                <button
                                                                    onClick={() => handleEdit(d)}
                                                                    className="text-indigo-600 hover:text-indigo-900 transition-colors duration-200"
                                                                >
                                                                    <FaEdit size={18} />
                                                                </button>
                                                                <button
                                                                    onClick={() => handleDeleteClick(d._id)}
                                                                    className="text-red-600 hover:text-red-900 transition-colors duration-200"
                                                                >
                                                                    <FaTrash size={18} />
                                                                </button>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>

                                {totalCategory > perPage && (
                                    <div className="mt-6">
                                        <Pagination
                                            pageNumber={currentPage}
                                            setPageNumber={setCurrentPage}
                                            totalItem={totalCategory}
                                            perPage={perPage}
                                            showItem={3}
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Add/Edit Category Form */}
                    <div className={`w-[320px] lg:w-5/12 translate-x-100 lg:relative lg:right-0 fixed ${show ? 'right-0':'-right-[340px]'}  top-0 transition-all duration-500`}>
                        <div className="w-full pl-5">
                            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                                <div className="p-6">
                                    <div className="flex justify-between items-center mb-6">
                                        <h2 className="text-xl font-semibold text-gray-800">
                                            {isEdit ? 'Edit Category' : 'Add New Category'}
                                        </h2>
                                        <button 
                                            onClick={() => setShow(false)}
                                            className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
                                        >
                                            <IoMdCloseCircle size={24} />
                                        </button>
                                    </div>

                                    <form onSubmit={addOrUpdateCategory} className="space-y-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Category Name
                                            </label>
                                            <input
                                                type="text"
                                                value={state.name}
                                                onChange={(e) => setState({...state, name: e.target.value})}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                                placeholder="Enter category name"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Category Image
                                            </label>
                                            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-indigo-500 transition-colors duration-200">
                                                <div className="space-y-1 text-center">
                                                    {imageShow ? (
                                                        <div className="relative group">
                                                            <img
                                                                src={imageShow}
                                                                alt="Preview"
                                                                className="max-h-40 mx-auto rounded-lg"
                                                            />
                                                            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-lg">
                                                                <p className="text-white text-sm">Change Image</p>
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        <>
                                                            <FaImage className="mx-auto h-12 w-12 text-gray-400" />
                                                            <div className="flex text-sm text-gray-600">
                                                                <label
                                                                    htmlFor="image"
                                                                    className="relative cursor-pointer rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none"
                                                                >
                                                                    <span>Upload a file</span>
                                                                </label>
                                                                <p className="pl-1">or drag and drop</p>
                                                            </div>
                                                            <p className="text-xs text-gray-500">
                                                                PNG, JPG, GIF up to 10MB
                                                            </p>
                                                        </>
                                                    )}
                                                    <input
                                                        id="image"
                                                        type="file"
                                                        className="sr-only"
                                                        onChange={imageHandle}
                                                        accept="image/*"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <button
                                            type="submit"
                                            disabled={loader}
                                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                        >
                                            {loader ? (
                                                <PropagateLoader color='#ffffff' cssOverride={overrideStyle} size={12} />
                                            ) : (
                                                isEdit ? 'Update Category' : 'Add Category'
                                            )}
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}