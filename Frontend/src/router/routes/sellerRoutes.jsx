
import Home from "../../views/Home.jsx";
import AddProduct from "../../views/seller/AddProduct.jsx";
import Products from "../../views/seller/Products.jsx";
import SellerDashboard from "../../views/seller/SellerDashboard.jsx";
export const sellerRoutes=[
    {
        path:'/',
        element:<Home/>,
        ability:['admin','seller'],
    },
    {
        path:'/seller/dashboard',
        element:<SellerDashboard/>,
        ability:['seller'],
    }, 
    {
        path:'/seller/dashboard/add-product',
        element:<AddProduct/>,
        ability:['seller'],
    },
    {
        path:'/seller/dashboard/products',
        element:<Products/>,
        ability:['seller'],
    },
]