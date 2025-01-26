
import AdminDashboard from "../../views/admin/AdminDashboard.jsx";
import Category from "../../views/admin/Category.jsx";
import Orders from "../../views/admin/Orders.jsx";
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
    }
]