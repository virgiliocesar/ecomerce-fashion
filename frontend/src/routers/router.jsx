import { createBrowserRouter } from "react-router";
import App from "../App";
import Home from "../pages/home/Home";
import CategoryPage from "../pages/category/CategoryPage";
import Search from "../pages/search/Search";
import ShopPage from "../pages/shop/ShopPage";



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
            }
            
        ]
    }]);

    export default router