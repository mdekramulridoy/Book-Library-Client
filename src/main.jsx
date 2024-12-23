import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./components/Root";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import AuthProvider from "./providers/AuthProvider";
import Footer from "./components/Footer";
import { Toaster } from "react-hot-toast";
import NotFound from "./components/NotFound";
import PrivateRoute from "./routes/PrivateRoute";
import AddBook from "./components/private/AddBook";
import AllBooks from "./components/private/AllBooks";
import BorrowedBooks from "./components/private/BorrowedBooks";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      
      {
        path: "footer",
        element: <Footer />,
      },
      {
        path: "*",
        element: <NotFound></NotFound>, 
      },
      {
        path: "add-book" ,
        element: <PrivateRoute><AddBook></AddBook></PrivateRoute>,
      },
      
      {
        path: "all-books" ,
        element: <PrivateRoute><AllBooks></AllBooks></PrivateRoute>,
      },
      
      {
        path: "borrowed-books" ,
        element: <PrivateRoute><BorrowedBooks></BorrowedBooks></PrivateRoute>,
      },
     
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <Toaster />
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);
