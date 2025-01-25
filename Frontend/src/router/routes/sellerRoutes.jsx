
import Home from "../../views/Home.jsx";
export const sellerRoutes=[
    {
        path:'/',
        element:<Home/>,
        ability:['admin','seller'],
    }
]