import React, { useState } from 'react'
import Router from './router/Router.jsx'
import publicRoutes from './router/routes/publicRoute.jsx'

export default function App() {
  const [allRoutes,setAllRoutes]=useState([...publicRoutes])
  console.log(allRoutes);
  return <Router allRoutes={allRoutes}/>
}
