import { useEffect, useState } from 'react'
import Router from './router/Router.jsx'
import publicRoutes from './router/routes/publicRoute.jsx'
import { getRoutes } from './router/routes/index.jsx'
import { useDispatch, useSelector } from 'react-redux'
import { get_user_info } from './store/Reducers/authReducer.js'

export default function App() {
  const dispatch=useDispatch()
  const {token}=useSelector(state=>state.auth)


  const [allRoutes,setAllRoutes]=useState([...publicRoutes])
  // console.log(allRoutes);

  useEffect(()=>{
    const routes=getRoutes()
    setAllRoutes([...allRoutes,routes])
  },[])


  useEffect(()=>{
    if(token){
      dispatch(get_user_info())
    }
  },[token])

  
  return <Router allRoutes={allRoutes}/>
}
