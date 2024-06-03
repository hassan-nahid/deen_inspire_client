import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import AllBlog from "../pages/AllBlog";
import News from "../pages/News";
import About from "../pages/About";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import DashboardLayout from "../layouts/DashboardLayout";
import PrivateRoute from "./PrivateRoute";

export const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout/>,
      children: [
        {
            path: '/',
            element:<Home/>,
        },
        {
            path: '/all_blog',
            element:<AllBlog/>,
        },
        {
            path: '/news',
            element:<News/>,
        },
        {
            path: '/about',
            element:<About/>,
        },
        {
            path: '/login',
            element:<Login/>,
        },
        {
            path: '/register',
            element:<Register/>,
        },
      ]
    },
    {
        path:"/dashboard",
        element:<PrivateRoute><DashboardLayout/></PrivateRoute>,
        children:[
            {
                path:"",
                element:<Dashboard/>
            }
        ]
    }
  ]);