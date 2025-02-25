import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify"; 
import "react-toastify/dist/ReactToastify.css"; 

const BorrowedBooks = () => {
  const { user } = useContext(AuthContext);
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchBorrowedBooks = async () => {
    try {
      const response = await fetch(
        `https://book-library-server-mauve.vercel.app/borrowedBooks?userEmail=${user.email}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch borrowed books.");
      }

      const data = await response.json();
      setBorrowedBooks(data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
      toast.error("Failed to load borrowed books."); 
    }
  };

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    fetchBorrowedBooks();
  }, [user, navigate]);

  const handleReturn = async (bookId) => {
    try {
      // Optimistic UI Update: Remove book immediately from UI
      setBorrowedBooks((prevBooks) =>
        prevBooks.filter((book) => book.bookId !== bookId)
      );
  
      const response = await fetch(
        `https://book-library-server-mauve.vercel.app/borrowedBooks/return/${bookId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userEmail: user.email,
          }),
        }
      );
  
      const responseData = await response.json();
  
      if (!response.ok) {
        throw new Error(responseData.error || "Failed to return the book.");
      }
  
      // Show success toast
      toast.success("Book returned successfully!");
    } catch (error) {
      console.error("Error returning the book:", error);
  
      // Rollback UI update if API call fails
      fetchBorrowedBooks(); // Re-fetch books to ensure correct state
      toast.error(error.message || "An error occurred while returning the book.");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        
        <div className="spinner-border animate-spin inline-block w-16 h-16 border-4 border-t-transparent rounded-full" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (borrowedBooks.length === 0) {
    return <p className="text-lg text-black font-bold">You have not borrowed any books.</p>;
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">Borrowed Books</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {borrowedBooks.map((book) => (
          <div
            key={book._id}
            className="card shadow-lg rounded-lg overflow-hidden bg-white flex flex-col border-2"
          >
            <img
              src={book.image}
              alt={book.name}
              className="w-full h-64 object-cover"
            />
            <div className="p-4 flex-grow">
              <h3 className="text-lg font-bold mb-2">{book.name}</h3>
              <p className="text-gray-600">Category: {book.category}</p>
              <p className="text-gray-600">
                Borrowed Date: {new Date(book.borrowDate).toLocaleDateString()}{" "}
              </p>
              <p className="text-gray-600">
                Return Date: {new Date(book.returnDate).toLocaleDateString()}
              </p>
            </div>

            <button
              onClick={() => handleReturn(book.bookId)}
              className="bg-red-600 text-white py-2 px-4 m-4 rounded-lg hover:bg-red-700"
            >
              Return Book
            </button>
          </div>
        ))}
      </div>
      <ToastContainer />
    </div>
  );
};

export default BorrowedBooks;
