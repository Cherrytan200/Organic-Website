import { forwardRef, useEffect, useState } from 'react'
import { FixedSizeList as List } from 'react-window'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { toast } from 'react-hot-toast';
import { confirm_payment_request, get_payment_request, messageClear } from '../../store/Reducers/PaymentReducer.js';
import { BiCheckCircle } from 'react-icons/bi';

function handleOnWheel({deltaY}){
    console.log('handleOnWheel',deltaY)
}

const outerElementType = forwardRef((props, ref) => (
    <div ref={ref} onWheel={handleOnWheel} {...props} />
));

outerElementType.displayName = 'OuterElementType';

export default function PaymentRequest() {
    const dispatch = useDispatch()
    const { successMessage, errorMessage, pendingWithdrows, loader } = useSelector(state => state.payment)
    const [paymentId, setPaymentId] = useState('')

    useEffect(() => { 
        dispatch(get_payment_request())
    }, [])

    const confirm_request = (id) => {
        setPaymentId(id)
        dispatch(confirm_payment_request(id))
    }

    useEffect(() => {
        if (successMessage) {
            toast.success(successMessage)
            dispatch(messageClear())
        }
        if (errorMessage) {
            toast.error(errorMessage)
            dispatch(messageClear())
        }
    }, [successMessage, errorMessage])

    const Row = ({ index, style }) => {
        const item = pendingWithdrows[index];
        return (
            <div style={style} className='flex text-sm border-b border-gray-100 hover:bg-gray-50/50 transition-colors duration-150'>
                <div className='w-[20%] p-3 whitespace-nowrap'>{index + 1}</div>
                <div className='w-[20%] p-3 whitespace-nowrap font-medium'>₹{item?.amount}</div>
                <div className='w-[20%] p-3 whitespace-nowrap'>
                    <span className={`px-3 py-1 rounded-full text-xs ${
                        item?.status === 'success' 
                            ? 'bg-green-100 text-green-700' 
                            : 'bg-yellow-100 text-yellow-700'
                    }`}>
                        {item?.status}
                    </span>
                </div>
                <div className='w-[20%] p-3 whitespace-nowrap text-gray-500'>
                    {moment(item?.createdAt).format('LL')}
                </div>
                <div className='w-[20%] p-3 whitespace-nowrap'>
                    <button
                        onClick={() => confirm_request(item?._id)}
                        disabled={loader && paymentId === item?._id}
                        className="relative group"
                    >
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg blur opacity-50 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
                        <div className="relative px-6 py-2 bg-white rounded-lg leading-none flex items-center divide-x divide-gray-200">
                            <span className="pr-2 text-orange-500">Confirm</span>
                            <BiCheckCircle className={`w-5 h-5 ml-2 text-red-500 ${
                                loader && paymentId === item?._id
                                    ? 'animate-spin'
                                    : 'group-hover:scale-110 transition-transform duration-300'
                            }`} />
                        </div>
                    </button>
                </div>
            </div>
        )
    }

    Row.propTypes = {
        index: PropTypes.number.isRequired,
        style: PropTypes.object.isRequired,
    };

    return (
        <div className='px-2 lg:px-7 pt-5'>
            <div className="w-full p-4 bg-white rounded-lg shadow-lg">
                <div className="flex items-center justify-between mb-6">
                    <h2 className='text-xl font-semibold text-gray-800'>Withdraw Requests</h2>
                    <div className="relative">
                        <div className="absolute -inset-1 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg blur opacity-25"></div>
                        <div className="relative px-4 py-2 bg-white rounded-lg leading-none flex items-center text-orange-500">
                            Total Requests: {pendingWithdrows.length}
                        </div>
                    </div>
                </div>
                
                <div className='w-full'>
                    <div className='w-full rounded-lg overflow-hidden border border-gray-100'>
                        {/* Table Header */}
                        <div className='flex bg-gray-50 uppercase text-xs font-medium text-gray-600'>
                            <div className='w-[20%] p-3'>No</div>
                            <div className='w-[20%] p-3'>Amount</div>
                            <div className='w-[20%] p-3'>Status</div>
                            <div className='w-[20%] p-3'>Date</div>
                            <div className='w-[20%] p-3'>Action</div>
                        </div>

                        {/* Table Body */}
                        {pendingWithdrows.length > 0 ? (
                            <List
                                className='List'
                                height={650}
                                itemCount={pendingWithdrows.length}
                                itemSize={60}
                                outerElementType={outerElementType}
                            >
                                {Row}
                            </List>
                        ) : (
                            <div className="p-8 text-center text-gray-500">
                                <div className="mb-4">
                                    <BiCheckCircle className="w-12 h-12 mx-auto text-gray-400" />
                                </div>
                                No pending withdrawal requests
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}