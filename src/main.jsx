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
import DetailsPage from "./components/private/DetailsPage";
import CategoryPage from "./components/private/CategoryPage";
import UpdateBook from "./components/private/UpdateBook";

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
        path: "/category/:category",
        element: <PrivateRoute><CategoryPage /></PrivateRoute>,
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
        path: "add-book",
        element: <PrivateRoute><AddBook /></PrivateRoute>,
      },
      {
        path: "all-books",
        element: <PrivateRoute><AllBooks /></PrivateRoute>,
      },
      {
        path: "borrowed-books",
        element: <PrivateRoute><BorrowedBooks /></PrivateRoute>,
      },
      {
        path: "details-books/:id",
        element: <PrivateRoute><DetailsPage /></PrivateRoute>,
      },
      {
        path: "update-book/:id",
        element: <PrivateRoute><UpdateBook /></PrivateRoute>,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
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
