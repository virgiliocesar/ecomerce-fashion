import { createBrowserRouter } from "react-router";
import App from "../App";
import Home from "../pages/home/Home";
import CategoryPage from "../pages/category/CategoryPage";
import Search from "../pages/search/Search";
import ShopPage from "../pages/shop/ShopPage";
import SingleProduct from "../pages/shop/productDetails/SingleProduct";
import Login from "../components/Login";
import Register from "../components/Register";
import EmDesenvolvimento from "../components/EmDesenvolvimento";
import PaymentSuccess from "../components/PaymentSuccess";
import DashboardLayout from "../pages/dashboard/DashboardLayout";
import PrivateRoute from "./PrivateRoute";
import UserDMain from "../pages/dashboard/users/dashboard/UserDMain";
import UserOrder from "../pages/dashboard/users/UserOrder";



const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
        {
                path: "/",
                element: <Home/>
            },
            {
                path: "/categories/:categoryName",
                element: <CategoryPage/>
            },
            {
                path: "/search",
                element: <Search />
            },
            {
                path: "/shop",
                element: <ShopPage />
            },
            {
                path: "/pages",
                element: <EmDesenvolvimento />
            },
            {
                path: "/shop/:id",
                element: <SingleProduct />
            },
            {
                path: "/success",
                element: <PaymentSuccess />}
        ]
    },
    {
        path: "/login",
        element: <Login/>
    },
    {
        path: "/register",
        element: <Register/>
    },
    //^dashboard routes start here
    {
        path: "/dashboard",
        element: <PrivateRoute ><DashboardLayout /></PrivateRoute>, //TODO: user private routes her
        children: [
            //^ user routes
            {
                path: "",
                element: <UserDMain/>
            }, {
                path: "orders",
                element: <UserOrder/>
            },{
                path: "payments",
                element: <div>User Payments</div>
            }, {
                path: "profile",
                element: <div>User Profile</div>
            }, {
                path: "reviews",
                element: <div>User Reviews</div>
            },
            //^ admin routes (only accessible by admin) //TODO: private routes with includes role
            {
                path: "admin",
                element: <PrivateRoute role="admin"><div>Admin Main</div></PrivateRoute> //TODO: user private routes her <EmDesenvolvimento />
            },  {
                path: "add-new-post",
                element: <PrivateRoute role="admin"><div>New Post</div></PrivateRoute> //TODO: user private routes her <EmDesenvolvimento />
            }, {
                path: "manage-products",
                element: <PrivateRoute role="admin"><div>Manage Post</div></PrivateRoute>
            }, {
                path: "update-product/:id",
                element: <PrivateRoute role="admin"><div></div></PrivateRoute>
            }, {
                path: "users",
                element: <PrivateRoute role="admin"><div>All Users</div></PrivateRoute>
            },{
                path: "manage-orders",
                element: <PrivateRoute role="admin"><div>Manage Order</div></PrivateRoute>}
        ]
    }
]);

    export default router