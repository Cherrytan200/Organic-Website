import Login from '../../views/auth/Login.jsx';
import Register from "../../views/auth/Register.jsx";
import AdminLogin from '../../views/auth/AdminLogin.jsx';
import Home from '../../views/Home.jsx'
import Unauthorized from '../../views/Unauthorized.jsx';
import Success from '../../views/Success.jsx';

const publicRoutes=[
  {
          path:'/',
          element:<Home/>,
  },
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
  },
  {
    path:'/unauthorized',
    element:<Unauthorized/>
  },
  {
    path:'/success?',
    element:<Success/>
  }
 
]

export default publicRoutes
