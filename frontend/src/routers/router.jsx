import { createBrowserRouter } from "react-router";
import App from "../App";
import Home from "../pages/home/home";


const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
        {
                path: "/",
                element: <Home/>
            },
            // {
            //     path: "/",
            //     element: <div>home page</div>
            // },
            
        ]
    }]);

    export default router