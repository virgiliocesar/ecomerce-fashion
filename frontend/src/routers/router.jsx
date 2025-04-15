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
import OrderDetails from "../pages/dashboard/users/OrderDetails";
import UserPayments from "../pages/dashboard/users/UserPayments";
import UserReviews from "../pages/dashboard/users/UserReviews";
import UserProfile from "../pages/dashboard/users/UserProfile";
import AdminDMain from "../pages/dashboard/admin/dashboard/AdminDMain";



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
                element: <PaymentSuccess />
            },
            {
                path: "/orders/:orderId",
                element: <OrderDetails />
            },
            {
                path: "/contact",
                element: <EmDesenvolvimento />
            }
        ]
    },
    {
        path: "/entrar",
        element: <Login/>
    },
    {
        path: "/cadastrar",
        element: <Register/>
    },
    //^dashboard routes start here
    {
        path: "/painel",
        element: <PrivateRoute ><DashboardLayout /></PrivateRoute>, //TODO: user private routes her
        children: [
            //^ user routes
            {
                path: "",
                element: <UserDMain/>
            }, {
                path: "pedidos",
                element: <UserOrder/>
            },{
                path: "pagamentos",
                element: <UserPayments/>
            }, {
                path: "perfil",
                element: <UserProfile/>
            }, {
                path: "avaliacoes",
                element: <UserReviews/>
            },
            //^ admin routes (only accessible by admin) //TODO: private routes with includes role
            {
                path: "admin",
                element: <PrivateRoute role="admin"><AdminDMain/></PrivateRoute> //TODO: user private routes her <EmDesenvolvimento />
            },  {
                path: "adicionar-produto",
                element: <PrivateRoute role="admin"><div>New Post</div></PrivateRoute> //TODO: user private routes her <EmDesenvolvimento />
            }, {
                path: "gerenciar-produtos",
                element: <PrivateRoute role="admin"><div>Manage Post</div></PrivateRoute>
            }, {
                path: "update-product/:id",
                element: <PrivateRoute role="admin"><div></div></PrivateRoute>
            }, {
                path: "usuarios",
                element: <PrivateRoute role="admin"><div>All Users</div></PrivateRoute>
            },{
                path: "gerenciar-pedidos",
                element: <PrivateRoute role="admin"><div>Manage Order</div></PrivateRoute>}
        ]
    }
]);

    export default router