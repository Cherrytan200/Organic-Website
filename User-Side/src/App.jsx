import { useEffect } from 'react';
import './App.css';
import { Route, Routes, useLocation } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Shops from './pages/Shops.jsx';
import Card from './pages/Card.jsx';
import Shipping from './pages/Shipping.jsx';
import Details from './pages/Details.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import { get_category } from './store/reducers/homeReducer.js';
import { useDispatch } from 'react-redux';
import CategoryShop from './pages/CategoryShop.jsx';
import SearchProducts from './pages/SearchProducts.jsx';
import Payment from './pages/Payment.jsx';
import Dashboard from './pages/Dashboard.jsx';
import ProtectUser from './utils/ProtectUser.jsx';
import Index from './components/dashboard/Index.jsx';
import Orders from './components/dashboard/Orders.jsx';
import ChangePassword from './components/dashboard/ChangePassword.jsx';
import Wishlist from './components/dashboard/Wishlist.jsx';
import OrderDetails from './components/dashboard/OrderDetails.jsx';
import Chat from './components/dashboard/Chat.jsx';
import ConfirmOrder from './pages/ConfirmOrder.jsx';

function App() {
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    dispatch(get_category());
  }, [dispatch]);

  return (
    <Routes>
      <Route path='/' element={<Home key={location.pathname} />} />
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/shops' element={<Shops />} />
      <Route path='/card' element={<Card />} />
      <Route path='/shipping' element={<Shipping />} />
      <Route path='/payment' element={<Payment />} />
      <Route path='/products?' element={<CategoryShop />} />
      <Route path='/products/search?' element={<SearchProducts />} />
      <Route path='/product/details/:slug' element={<Details />} />
      <Route path='/order/confirm?' element={<ConfirmOrder />} />

      <Route path='/dashboard' element={<ProtectUser />}>
        <Route path='' element={<Dashboard />}>
          <Route path='' element={<Index />} />
          <Route path='my-orders' element={<Orders />} />
          <Route path='change-password' element={<ChangePassword />} />
          <Route path='my-wishlist' element={<Wishlist />} />
          <Route path='order/details/:orderId' element={<OrderDetails />} />
          <Route path='chat' element={<Chat />} />
          <Route path='chat/:sellerId' element={<Chat />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;