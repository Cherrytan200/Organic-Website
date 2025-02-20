import { forwardRef,useEffect,useState } from 'react'
import {FixedSizeList as List} from 'react-window'
import PropTypes from 'prop-types'
import { useDispatch,useSelector } from 'react-redux';
import moment from 'moment';
import { toast } from 'react-hot-toast';
import { confirm_payment_request, get_payment_request,messageClear } from '../../store/Reducers/PaymentReducer.js';

function handleOnWheel({deltaY}){
    console.log('handleOnWheel',deltaY)
}

const outerElementType = forwardRef((props, ref) => (
        <div ref={ref} onWheel={handleOnWheel} {...props} />
));
outerElementType.displayName = 'OuterElementType';


export default function PaymentRequest() {

    // const array=[1,2,3,4,5,6,7,8,9]
    const dispatch = useDispatch()
    const {successMessage, errorMessage, pendingWithdrows,loader } = useSelector(state => state.payment)
    const [paymentId, setPaymentId] = useState('')

    useEffect(() => { 
        dispatch(get_payment_request())
    },[])

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
    },[successMessage,errorMessage])


    const Row=({index,style})=>{
        Row.propTypes = {
            index: PropTypes.number.isRequired,
            style: PropTypes.object.isRequired,
        };

        return (
            <div style={style} className='flex text-sm text-white font-medium border-b border-slate-700'>
                <div className='w-[25%] p-2 whitespace-nowrap'>
                    {index+1}
                </div>
                <div className='w-[25%] p-2 whitespace-nowrap'>
                    &#8377;{pendingWithdrows[index]?.amount}
                </div>
                <div className='w-[25%] p-2 whitespace-nowrap'>
                    <span className='py-[1px] px-[5px] bg-slate-300 text-blue-500 rounded-md text-sm'>{pendingWithdrows[index]?.status}</span>
                </div>
                <div className='w-[25%] p-2 whitespace-nowrap'>
                    {moment(pendingWithdrows[index]?.createdAt).format('LL')}
                </div>
                <div className='w-[25%] p-2 whitespace-nowrap'>
                    <button disabled={loader} onClick={() => confirm_request(pendingWithdrows[index]?._id)} className='bg-indigo-500 shadow-lg hover:shadow-indigo-500/50 px-3 py-[2px cursor-pointer text-white rounded-sm text-sm]'>{(loader && paymentId === pendingWithdrows[index]?._id) ? 'loading..' : 'Confirm'}</button>
                </div>
            </div>
        )
    }
  return (
    <div className='px-2 lg:px-7 pt-5'>
        <div className="w-full p-4 bg-[#6a5fdf] rounded-md">
            <h2 className='text-xl font-medium pb-5 text-[#d0d2d6]'>Withdraw Request</h2>
            <div className='w-full'>

                <div className='w-full overflow-x-auto'>
                    <div className='flex bg-[#a7a3de] uppercase text-xs font-bold min-w-[340px] rounded-md'>
                        <div className='w-[25%] p-2'>
                            No
                        </div>
                        <div className='w-[25%] p-2'>
                            Amount
                        </div>
                        <div className='w-[25%] p-2'>
                            Status
                        </div>
                        <div className='w-[25%] p-2'>
                            date
                        </div>
                        <div className='w-[25%] p-2'>
                            Action
                        </div>
                    </div>


                    {
                        <List
                            style={{minWidth:'340px'}}
                            className='List'
                            height={490}
                            itemCount={pendingWithdrows.length}
                            itemSize={49}
                            outerElementType={outerElementType}
                        >
                            {Row}
                        </List>
                    }
                </div>


            </div>
        </div>
    </div>
  )
}
