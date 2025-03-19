import  { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header.jsx'; 
import Sidebar from './Sidebar.jsx';
import { socket } from '../utils/utils.js'
import { useDispatch, useSelector } from 'react-redux';
import { updateCustomer, updateSellers } from '../store/Reducers/chatReducer.js';

export default function MainLayout (){

    const dispatch = useDispatch()
    const {userInfo } = useSelector(state => state.auth)

    useEffect(() => {
        if (userInfo && userInfo.role === 'seller') {
            socket.emit('add_seller', userInfo._id,userInfo)
        } else {
            socket.emit('add_admin', userInfo)
        }
    },[userInfo])

    useEffect(() => {
        socket.on('activeCustomer',(customers)=>{
            dispatch(updateCustomer(customers))
        })
        socket.on('activeSeller',(sellers)=>{
            dispatch(updateSellers(sellers))
        })
    })

    const [showSidebar, setShowSidebar] = useState(false)

    return ( 
        <div className='bg-[#dee9e3] w-full min-h-screen'>
            <Header showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
            <Sidebar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />

           <div className='ml-0 lg:ml-[260px] pt-[95px] transition-all'>
           <Outlet/>
           </div>
        </div>
    );
};

