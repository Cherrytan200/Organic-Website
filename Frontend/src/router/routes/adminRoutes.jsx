
import AdminDashboard from "../../views/admin/AdminDashboard.jsx";
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
    }
]