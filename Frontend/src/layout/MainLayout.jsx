import { Outlet } from 'react-router-dom'
import Header from './Header.jsx';
import Sidebar from './Sidebar.jsx';

export default function MainLayout() {
  return (
    <div className='bg-[#cdcae9] w-full min-h-screen'>
      <Header/>
      <Sidebar/>
      <div className='ml-0 lg:ml-[260px] pt-[95px] transition-all'>
        <Outlet/>
      </div>
     </div>
  )
}
