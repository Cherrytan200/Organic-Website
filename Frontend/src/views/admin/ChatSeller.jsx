import { useState, useRef, useEffect } from "react"
import { IoMdClose } from "react-icons/io";
import { FaList, FaUserCircle } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { get_admin_message, get_sellers, send_message_seller_admin, messageClear, updateSellerMessage } from '../../store/Reducers/chatReducer';
import { Link, useParams } from 'react-router-dom';
import { FaRegFaceGrinHearts } from "react-icons/fa6";
import { Toaster, toast } from 'react-hot-toast';
import { socket } from '../../utils/utils'
import { BiSend } from "react-icons/bi";

export default function ChatSeller() {
    const scrollRef = useRef()
    const [show, setShow] = useState(false)
    const { sellerId } = useParams()
    const [text, setText] = useState('')
    const [receverMessage, setReceverMessage] = useState('')

    const { sellers, activeSeller, seller_admin_message, currentSeller, successMessage } = useSelector(state => state.chat)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(get_sellers())
    }, [])

    const send = (e) => {
        e.preventDefault()
        dispatch(send_message_seller_admin({
            senderId: '',
            receverId: sellerId,
            message: text,
            senderName: 'Admin Support'
        }))
        setText('')
    }

    useEffect(() => {
        if (sellerId) {
            dispatch(get_admin_message(sellerId))
        }
    }, [sellerId])

    useEffect(() => {
        if (successMessage) {
            socket.emit('send_message_admin_to_seller', seller_admin_message[seller_admin_message.length - 1])
            dispatch(messageClear())
        }
    }, [successMessage])

    useEffect(() => {
        socket.on('receved_seller_message', msg => {
            setReceverMessage(msg)
        })
    }, [])

    useEffect(() => {
        if (receverMessage) {
            if (receverMessage.senderId === sellerId && receverMessage.receverId === '') {
                dispatch(updateSellerMessage(receverMessage))
            } else {
                toast.success(receverMessage.senderName + " " + "Send A message")
                dispatch(messageClear())
            }
        }
    }, [receverMessage])

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [seller_admin_message])

    return (
        <div className='px-2 lg:px-7 py-5'>
            <Toaster />
            <div className="w-full bg-white px-4 py-4 rounded-lg shadow-lg h-[calc(100vh-140px)]">
                <div className="flex w-full h-full relative">
                    {/* Sellers List Sidebar */}
                    <div className={`w-[280px] h-full absolute z-10 ${show ? '-left-[16px]' : '-left-[336px]'} md:left-0 md:relative transition-all duration-300`}>
                        <div className="w-full h-[calc(100vh-177px)] bg-[#f7f7f7] md:bg-transparent overflow-y-auto">
                            <div className="flex justify-between items-center p-4 md:p-0 md:px-3 md:pb-3 text-gray-700">
                                <h2 className="text-xl font-semibold">Sellers</h2>
                                <span onClick={() => setShow(!show)} className="block cursor-pointer md:hidden">
                                    <IoMdClose className="text-2xl" />
                                </span>
                            </div>

                            {/* Sellers List */}
                            <div className="space-y-2 p-2">
                                {sellers.map((s, i) => (
                                    <Link
                                        key={i}
                                        to={`/admin/dashboard/chat-sellers/${s._id}`}
                                        className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all duration-300 ${
                                            sellerId === s._id
                                                ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg'
                                                : 'hover:bg-gray-100'
                                        }`}
                                    >
                                        <div className='relative'>
                                            {s.image ? (
                                                <img
                                                    className='w-[45px] h-[45px] border-2 border-white rounded-full object-cover'
                                                    src={s.image}
                                                    alt={s.name}
                                                />
                                            ) : (
                                                <div className='w-[45px] h-[45px] border-2 border-white rounded-full flex items-center justify-center bg-gray-100'>
                                                    <FaUserCircle className="w-7 h-7 text-gray-400" />
                                                </div>
                                            )}
                                            {activeSeller.some(a => a.sellerId === s._id) && (
                                                <div className='w-[12px] h-[12px] bg-green-500 rounded-full absolute -right-0 -bottom-0 border-2 border-white'></div>
                                            )}
                                        </div>
                                        <div className='flex-grow'>
                                            <h3 className='text-base font-medium'>{s.name}</h3>
                                            <p className='text-xs opacity-80'>
                                                {activeSeller.some(a => a.sellerId === s._id) ? 'Active' : 'Offline'}
                                            </p>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Chat Area */}
                    <div className="w-full md:w-[calc(100%-280px)] md:pl-4">
                        <div className="flex flex-col h-full">
                            {/* Chat Header */}
                            <div className="flex justify-between items-center mb-4">
                                {sellerId && currentSeller && (
                                    <div className="flex items-center gap-3">
                                        <div className="relative">
                                            {currentSeller?.image ? (
                                                <img
                                                    className="w-[45px] h-[45px] border-2 border-white rounded-full object-cover"
                                                    src={currentSeller?.image}
                                                    alt={currentSeller?.name}
                                                />
                                            ) : (
                                                <div className='w-[45px] h-[45px] border-2 border-white rounded-full flex items-center justify-center bg-gray-100'>
                                                    <FaUserCircle className="w-7 h-7 text-gray-400" />
                                                </div>
                                            )}
                                            {activeSeller.some(a => a.sellerId === currentSeller._id) && (
                                                <div className="w-[12px] h-[12px] bg-green-500 rounded-full absolute -right-0 -bottom-0 border-2 border-white"></div>
                                            )}
                                        </div>
                                        <h3 className='text-lg font-medium text-gray-800'>{currentSeller?.name}</h3>
                                    </div>
                                )}
                                <div
                                    onClick={() => setShow(!show)}
                                    className="w-[35px] h-[35px] rounded-md bg-gradient-to-r from-orange-500 to-red-500 shadow-lg hover:shadow-orange-500/50 text-white flex md:hidden justify-center cursor-pointer items-center"
                                >
                                    <FaList />
                                </div>
                            </div>

                            {/* Messages Area */}
                            <div className="flex-grow bg-[#f7f7f7] rounded-lg p-3 overflow-y-auto">
                                {sellerId ? (
                                    <div className="space-y-3">
                                        {seller_admin_message.map((m, i) => (
                                            <div
                                                key={i}
                                                ref={scrollRef}
                                                className={`flex ${m.senderId === sellerId ? 'justify-start' : 'justify-end'}`}
                                            >
                                                <div className={`max-w-[85%] bg-white shadow-md rounded-lg p-3 ${
                                                    m.senderId === sellerId ? 'rounded-tl-none' : 'rounded-tr-none'
                                                }`}>
                                                    <p className={`text-[15px] ${m.senderId === sellerId ? 'text-gray-700' : 'text-gray-800'}`}>
                                                        {m.message}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="h-full flex flex-col justify-center items-center text-gray-400">
                                        <FaRegFaceGrinHearts className="text-4xl mb-2" />
                                        <p>Select a seller to start chatting</p>
                                    </div>
                                )}
                            </div>

                            {/* Message Input */}
                            <form onSubmit={send} className='mt-4 flex gap-3'>
                                <input
                                    readOnly={!sellerId}
                                    value={text}
                                    onChange={(e) => setText(e.target.value)}
                                    className='w-full px-4 py-2.5 bg-[#f7f7f7] border border-gray-200 rounded-lg text-gray-700 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all duration-300 outline-none'
                                    type="text"
                                    placeholder='Type your message...'
                                />
                                <button
                                    disabled={!sellerId}
                                    className="relative group px-6 py-2.5 rounded-lg overflow-hidden"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-red-500 transition-all duration-300 group-hover:scale-110"></div>
                                    <div className="relative flex items-center gap-2 text-white">
                                        <BiSend className={`w-5 h-5 ${!sellerId ? 'opacity-50' : 'group-hover:rotate-12 transition-transform duration-300'}`} />
                                    </div>
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}