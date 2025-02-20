
import AdminDashboard from "../../views/admin/AdminDashboard.jsx";
import Category from "../../views/admin/Category.jsx";
import Orders from "../../views/admin/Orders.jsx";
import Sellers from "../../views/admin/Sellers.jsx";
import PaymentRequest from "../../views/admin/PaymentRequest.jsx";
import DeactiveSellers from "../../views/admin/DeactiveSellers.jsx";
import SellerRequest from "../../views/admin/SellerRequest.jsx";
import SellerDetails from "../../views/admin/SellerDetails.jsx";
import ChatSeller from "../../views/admin/ChatSeller.jsx";
import OrderDetails from "../../views/admin/OrderDetails.jsx";

export const adminRoutes=[
    {
        path:'admin/dashboard',
        element:<AdminDashboard/>,
        role:'admin'
    },
    {
        path:'admin/dashboard/orders',
        element:<Orders/>,
        role:'admin'
    },
    {
        path:'admin/dashboard/category',
        element:<Category/>,
        role:'admin'
    },
    {
        path:'admin/dashboard/sellers',
        element:<Sellers/>,
        role:'admin'
    },
    {
        path:'admin/dashboard/payment-request',
        element:<PaymentRequest/>,
        role:'admin'
    },
    {
        path:'admin/dashboard/deactive-sellers',
        element:<DeactiveSellers/>,
        role:'admin'
    },
    
    {
        path:'admin/dashboard/sellers-request',
        element:<SellerRequest/>,
        role:'admin'
    },
    {
        path:'admin/dashboard/seller/details/:sellerId',
        element:<SellerDetails/>,
        role:'admin'
    },
    {
        path:'admin/dashboard/chat-seller',
        element:<ChatSeller/>,
        role:'admin'
    },
    {
        path: 'admin/dashboard/chat-sellers/:sellerId',
        element : <ChatSeller/> ,
        role : 'admin'
    },
    {
        path:'admin/dashboard/order/details/:orderId',
        element:<OrderDetails/>,
        role:'admin'
    },
    
    
]