import Deactive from "./../../views/Deactive.jsx";
import Pending from "./../../views/Pending.jsx";
import AddProduct from "../../views/seller/AddProduct.jsx";
import Discount from "../../views/seller/Discount.jsx";
import EditProduct from "../../views/seller/EditProduct.jsx";
import OrderDetails from "../../views/seller/OrderDetails.jsx";
import Orders from "../../views/seller/Orders.jsx";
import Payments from "../../views/seller/Payments.jsx";
import Products from "../../views/seller/Products.jsx";
import Profile from "../../views/seller/Profile.jsx";
import SellerDashboard from "../../views/seller/SellerDashboard.jsx";
import SellerToCustomer from "../../views/seller/SellerToCustomer.jsx";
import SellerToAdmin from "../../views/seller/SellerToAdmin.jsx";
import AddBanner from '../../views/seller/AddBanner.jsx';


export const sellerRoutes=[
    
    {
        path:'/seller/account-pending',
        element:<Pending/>,
        ability:'seller',
        
    }, 
    {
        path:'/seller/account-deactive',
        element:<Deactive/>,
        ability:'seller',
        
    }, 
    {
        path:'/seller/dashboard',
        element:<SellerDashboard/>,
        role:'seller',
        status:'active'
    }, 
    {
        path:'/seller/dashboard/add-product',
        element:<AddProduct/>,
        role:'seller',
        status:'active'
    },
    {
        path:'/seller/dashboard/edit-product/:productId',
        element:<EditProduct/>,
        role:'seller',
        status:'active'
    },
    {
        path:'/seller/dashboard/products',
        element:<Products/>,
        role:'seller',
        status:'active'
    },
    {
        path:'/seller/dashboard/discount-product',
        element:<Discount/>,
        role:'seller',
        status:'active'
    },
    {
        path:'/seller/dashboard/orders',
        element:<Orders/>,
        role:'seller',
        visibility:['active','deactive'],
    },
    {
        path:'/seller/dashboard/order/details/:orderId',
        element:<OrderDetails/>,
        role:'seller',
        visibility:['active','deactive'],
    },
    {
        path:'/seller/dashboard/payments',
        element:<Payments/>,
        role:'seller',
        visibility:['active','deactive'],
    },
    {
        path:'/seller/dashboard/chat-seller',
        element:<SellerToAdmin/>,
        role:"seller",
        visibility:['active','deactive','pending']
    },
    {
        path:'/seller/dashboard/chat-customer/:customerId',
        element:<SellerToCustomer/>,
        role:'seller',
        status:'active'
    },
    {
        path:'/seller/dashboard/chat-customer',
        element:<SellerToCustomer/>,
        role:'seller',
        status:'active'
    },
    {
        path:'/seller/dashboard/profile',
        element:<Profile/>,
        role:'seller',
        visibility:['active','deactive','pending']
    },
    {
        path:'/seller/dashboard/add-banner/:productId',
        element:<AddBanner/>,
        role:'seller',
        status:'active'
    }
    
]