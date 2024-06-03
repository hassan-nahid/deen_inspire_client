import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import AllBlog from "../pages/AllBlog";
import About from "../pages/About";
import Login from "../pages/Login";
import Register from "../pages/Register";
import DashboardLayout from "../layouts/DashboardLayout";
import PrivateRoute from "./PrivateRoute";
import Contact from "../pages/Contact";
import ErrorPage from "../pages/ErrorPage";
import Dashboard from "../pages/Dashboard/Dashboard";
import CardDetails from "../components/AllBlogs/CardDetails";
import ProfilePage from "../pages/Profile/ProfilePage";
import AddPost from "../pages/Dashboard/AddPost";
import ManagePost from "../layouts/ManagePost";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: '/',
                element: <Home />,
            },
            {
                path: '/all_blog',
                element: <AllBlog />,
            },
            {
                path: '/card_details/:id',
                element: <CardDetails />,
                loader: ({ params }) =>
                    fetch( `http://localhost:3000/posts/${params.id}`),
            },
            {
                path: '/about',
                element: <About />,
            },
            {
                path: '/contact',
                element: <Contact />,
            },
            {
                path: '/profile_page',
                element: <PrivateRoute><ProfilePage /></PrivateRoute>,
            },
            {
                path: '/login',
                element: <Login />,
            },
            {
                path: '/register',
                element: <Register />,
            },
        ]
    },
    {
        path: "/dashboard",
        element: <PrivateRoute><DashboardLayout /></PrivateRoute>,
        children: [
            {
                index:true,
                element: <PrivateRoute><Dashboard /></PrivateRoute>,
            },
            {
                path: "/dashboard/add_post",
                element: <PrivateRoute>< AddPost/></PrivateRoute>,
            },
            {
                path: "/dashboard/manage_post",
                element: <PrivateRoute><ManagePost/></PrivateRoute>,
            },
        ]
    }
]);