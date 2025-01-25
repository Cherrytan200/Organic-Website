
import MainLayout from "../../layout/MainLayout.jsx";
import { privateRoutes } from "./privateRoutes.jsx";

export const getRoutes=()=>{
    return {
        path:'/',
        element:<MainLayout/>,
        children: privateRoutes
    }
}