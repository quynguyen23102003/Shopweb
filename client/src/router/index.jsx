import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import SearchPage from "../pages/searchPage";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children : [
            {
                path : "",
                element : <Home/>
            },
            {
                path : "/search",
                element : <SearchPage/>
            }
        ]
    },
]);

export default router;