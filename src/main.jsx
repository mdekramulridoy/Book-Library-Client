import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./components/Root";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import AuthProvider from "./providers/AuthProvider";
import { Toaster } from "react-hot-toast";
import NotFound from "./components/NotFound";
import PrivateRoute from "./routes/PrivateRoute";
import AddBook from "./components/private/AddBook";
import AllBooks from "./components/private/AllBooks";
import BorrowedBooks from "./components/private/BorrowedBooks";
import DetailsPage from "./components/private/DetailsPage";
import CategoryPage from "./components/private/CategoryPage";
import UpdateBook from "./components/private/UpdateBook";
import Title from "./components/Title";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: (
          <>
            <Title title="Home" /> 
            <Home />
          </>
        ),
      },
      {
        path: "/category/:category",
        element: (
          <>
            <Title title="Category" /> 
            <PrivateRoute>
              <CategoryPage />
            </PrivateRoute>
          </>
        ),
      },
      {
        path: "login",
        element: (
          <>
            <Title title="Login" /> 
            <Login />
          </>
        ),
      },
      {
        path: "register",
        element: (
          <>
            <Title title="Register" /> 
            <Register />
          </>
        ),
      },
      {
        path: "add-book",
        element: (
          <>
            <Title title="Add Book" /> 
            <PrivateRoute>
              <AddBook />
            </PrivateRoute>
          </>
        ),
      },
      {
        path: "all-books",
        element: (
          <>
            <Title title="All Books" /> 
            <PrivateRoute>
              <AllBooks />
            </PrivateRoute>
          </>
        ),
      },
      {
        path: "borrowed-books",
        element: (
          <>
            <Title title="Borrowed Books" /> 
            <PrivateRoute>
              <BorrowedBooks />
            </PrivateRoute>
          </>
        ),
      },
      {
        path: "details-books/:id",
        element: (
          <>
            <Title title="Book Details" /> 
            <PrivateRoute>
              <DetailsPage />
            </PrivateRoute>
          </>
        ),
      },
      {
        path: "update-book/:id",
        element: (
          <>
            <Title title="Update Book" /> 
            <PrivateRoute>
              <UpdateBook />
            </PrivateRoute>
          </>
        ),
      },
    ],
  },
  {
    path: "*",
    element: (
      <>
        <Title title="Page Not Found" /> 
        <NotFound />
      </>
    ),
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
