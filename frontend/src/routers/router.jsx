import { createBrowserRouter } from "react-router";
import App from "../App";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/",
                element: <div>home page</div>
            },
            {
                path: "/about",
                element: <div>about page</div>
            }
        ]
    }]);

    export default router