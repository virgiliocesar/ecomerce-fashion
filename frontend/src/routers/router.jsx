import { createBrowserRouter } from "react-router";
import App from "../App";
import Home from "../pages/home/Home";
import CategoryPage from "../pages/category/CategoryPage";



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
            
        ]
    }]);

    export default router