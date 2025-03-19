import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import { get_seller, messageClear, seller_status_update } from "../../store/Reducers/sellerReducer";
import { Toaster, toast } from "react-hot-toast";
import { FaStore, FaUserCircle, FaMapMarkerAlt } from "react-icons/fa";
import { BiRefresh } from "react-icons/bi";

export default function SellerDetails() {
    const dispatch = useDispatch()
    const { seller, successMessage, errorMessage } = useSelector(state => state.seller)
    const { sellerId } = useParams();
    const [status, setStatus] = useState('');
    const [isUpdating, setIsUpdating] = useState(false);

    useEffect(() => {
        dispatch(get_seller(sellerId))
    }, [sellerId])

    const submit = (e) => {
        e.preventDefault();
        setIsUpdating(true);
        dispatch(seller_status_update({
            sellerId,
            status
        }))
    }

    useEffect(() => {
        if (successMessage) {
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
            setIsUpdating(false)
        }
        if (errorMessage) {
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
            setIsUpdating(false)
        }
    }, [successMessage, errorMessage])

    useEffect(() => {
        if (seller) {
            setStatus(seller.status)
        }
    }, [seller])

    return (
        <div className='px-2 lg:px-7 pt-5'>
            <Toaster />
            <div className="w-full p-4 bg-white rounded-xl shadow-lg">
                <div className="flex flex-wrap w-full">
                    {/* Profile Section */}
                    <div className="w-full lg:w-3/12 p-4">
                        <div className="w-full bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                            <div className="w-full flex flex-col items-center">
                                <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-gray-50 shadow-lg mb-4">
                                    {seller?.image ? (
                                        <img src={seller.image} alt={seller.name} className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                                            <FaUserCircle className="w-20 h-20 text-gray-400" />
                                        </div>
                                    )}
                                </div>
                                <h2 className="text-xl font-semibold text-gray-800 mb-1">{seller?.name || 'N/A'}</h2>
                                <p className="text-sm text-gray-600 mb-4">{seller?.email || 'N/A'}</p>
                                <div className={`px-4 py-1 rounded-full text-sm ${
                                    seller?.status === 'active' 
                                        ? 'bg-green-100 text-green-700' 
                                        : 'bg-yellow-100 text-yellow-700'
                                }`}>
                                    {seller?.status || 'N/A'}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Shop Info Section */}
                    <div className="w-full lg:w-4/12 p-4">
                        <div className="w-full bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-2 bg-orange-50 rounded-lg">
                                    <FaStore className="w-6 h-6 text-orange-500" />
                                </div>
                                <h2 className="text-xl font-semibold text-gray-800">Shop Information</h2>
                            </div>
                            <div className="space-y-4">
                                <div className="flex flex-col">
                                    <span className="text-sm text-gray-500">Shop Name</span>
                                    <span className="font-medium text-gray-800">{seller?.shopInfo?.shopName || 'N/A'}</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-sm text-gray-500">Payment Status</span>
                                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm w-fit ${
                                        seller?.payment === 'paid' 
                                            ? 'bg-green-100 text-green-700' 
                                            : 'bg-yellow-100 text-yellow-700'
                                    }`}>
                                        {seller?.payment || 'N/A'}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Address Section */}
                    <div className="w-full lg:w-5/12 p-4">
                        <div className="w-full bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-2 bg-orange-50 rounded-lg">
                                    <FaMapMarkerAlt className="w-6 h-6 text-orange-500" />
                                </div>
                                <h2 className="text-xl font-semibold text-gray-800">Address Details</h2>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="flex flex-col">
                                    <span className="text-sm text-gray-500">Address</span>
                                    <span className="font-medium text-gray-800">{seller?.shopInfo?.address || 'N/A'}</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-sm text-gray-500">District</span>
                                    <span className="font-medium text-gray-800">{seller?.shopInfo?.district || 'N/A'}</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-sm text-gray-500">State</span>
                                    <span className="font-medium text-gray-800">{seller?.shopInfo?.state || 'N/A'}</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-sm text-gray-500">Pincode</span>
                                    <span className="font-medium text-gray-800">{seller?.shopInfo?.pincode || 'N/A'}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Status Update Form */}
                    <div className="w-full p-4">
                        <form onSubmit={submit} className="w-full">
                            <div className="flex flex-wrap items-center gap-4">
                                <div className="relative flex-grow max-w-xs">
                                    <select
                                        value={status}
                                        onChange={(e) => setStatus(e.target.value)}
                                        className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-gray-700 transition-all duration-300 hover:border-orange-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/20 outline-none"
                                        required
                                    >
                                        <option value="">Select Status</option>
                                        <option value="active">Active</option>
                                        <option value="deactive">Deactive</option>
                                    </select>
                                </div>
                                <button
                                    type="submit"
                                    disabled={isUpdating}
                                    className="relative group px-6 py-2.5 rounded-lg overflow-hidden"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-red-500 transition-all duration-300 group-hover:scale-110"></div>
                                    <div className="relative flex items-center gap-2 text-white">
                                        <span>Update Status</span>
                                        <BiRefresh className={`w-5 h-5 ${isUpdating ? 'animate-spin' : 'group-hover:rotate-180 transition-transform duration-500'}`} />
                                    </div>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}