import {createBrowserRouter} from "react-router-dom"
import App from "../App"
import Home from "../Home/Home"
import Login from "../components/Login"
import SignUp from "../components/SignUp"
import Welcome from "../admin/Welcome"
import Entry from "../admin/Entry"
import Dashboard from "../admin/Dashboard"
import Create from "../admin/comp/Create"
import Cart from "../components/Cart"
import MyOrder from "../order/MyOrder"

const router=createBrowserRouter(
    [
        {
            path:"/",
            element:<App/>,
            children:[
                {
                    path:'/',
                    element:<Home/>
                },
                {
                    path:'/login',
                    element:<Login/>
                },
                {
                    path:'/signup',
                    element:<SignUp/>
                },
                {
                    path:'/myorder',
                    element:<MyOrder/>
                }

            ]
        },
        {
            path:'/admin',
            element:<Welcome/>,
            children:[
                {
                    path:'/admin',
                    element:<Entry/>,
                },
                {
                    path:'/admin/dashboard',
                    element:<Dashboard/>
                },
                // {
                //     path:'/admin/create',
                //     element:<Create/>
                // }
            ]
        }
    ]
)

export default router