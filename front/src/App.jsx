import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Home from "./Home";
import AddCode from "./AddCode";
import EachPage from "./EachPage";
import SideBar from "./components/SideBar";
import NavBar from "./components/NavBar";
import DetailPage from "./DetailPage";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <div>
          <NavBar />
          <SideBar />
          {/* <ToastContainer /> */}
        </div>
      ),
      children: [
        { path: "/", element: <Home /> },
        { path: "/prolan", element: <EachPage /> },
        { path: "/add", element: <AddCode /> },
        { path: "/snippet/:id", element: <DetailPage /> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
