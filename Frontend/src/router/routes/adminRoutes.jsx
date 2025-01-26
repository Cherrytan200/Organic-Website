
import AdminDashboard from "../../views/admin/AdminDashboard.jsx";
import Category from "../../views/admin/Category.jsx";
import Orders from "../../views/admin/Orders.jsx";
import Sellers from "../../views/admin/Sellers.jsx";
import PaymentRequest from "../../views/admin/PaymentRequest.jsx";

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
    }
    
]