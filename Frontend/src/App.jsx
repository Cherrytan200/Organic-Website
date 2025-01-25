import { useEffect, useState } from 'react'
import Router from './router/Router.jsx'
import publicRoutes from './router/routes/publicRoute.jsx'
import { getRoutes } from './router/routes/index.jsx'

export default function App() {
  const [allRoutes,setAllRoutes]=useState([...publicRoutes])
  console.log(allRoutes);

  useEffect(()=>{
    const routes=getRoutes()
    setAllRoutes([...allRoutes,routes])
  },[])
  return <Router allRoutes={allRoutes}/>
}
