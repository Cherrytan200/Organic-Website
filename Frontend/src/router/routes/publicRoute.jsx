import Login from '../../views/auth/Login.jsx';
import Register from "../../views/auth/Register.jsx";
import AdminLogin from '../../views/auth/AdminLogin.jsx';
const publicRoutes=[
  {
    path:'/login',
    element:<Login/>
  },
  {
    path:'/register',
    element:<Register/>
  },
  {
    path:'/admin/login',
    element:<AdminLogin/>
  }
 
]

export default publicRoutes
