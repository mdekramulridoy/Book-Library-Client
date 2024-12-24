import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { useNavigate } from "react-router-dom";

const BorrowedBooks = () => {
  const { user } = useContext(AuthContext);
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Function to fetch the list of borrowed books
  const fetchBorrowedBooks = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/borrowedBooks?userEmail=${user.email}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch borrowed books.");
      }

      const data = await response.json();
      setBorrowedBooks(data); // Update the state with the latest borrowed books
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!user) {
      navigate("/login"); // Redirect to login if user is not authenticated
      return;
    }

    fetchBorrowedBooks(); // Fetch borrowed books when the component mounts
  }, [user, navigate]);

  const handleReturn = async (bookId) => {
    try {
      // Make the request to return the book
      const response = await fetch(
        `http://localhost:5000/borrowedBooks/return/${bookId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userEmail: user.email, // Include the user's email to identify the borrowed record
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to return the book.");
      }

      // Remove the returned book from the borrowedBooks list in the UI
      setBorrowedBooks((prevBooks) => prevBooks.filter((book) => book._id !== bookId));

      alert("Book returned successfully!");
    } catch (error) {
      console.error("Error returning the book:", error);
      alert(error.message);
    }
  };

  if (loading) {
    return <p>Loading borrowed books...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (borrowedBooks.length === 0) {
    return <p>You have not borrowed any books.</p>;
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">Borrowed Books</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {borrowedBooks.map((book) => (
          <div
            key={book._id}
            className="card shadow-lg rounded-lg overflow-hidden bg-white flex flex-col"
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
                Borrowed Date: {new Date(book.borrowedDate).toLocaleDateString()}
              </p>
              <p className="text-gray-600">
                Return Date: {new Date(book.returnDate).toLocaleDateString()}
              </p>
            </div>
            <button
              onClick={() => handleReturn(book._id)}
              className="bg-red-600 text-white py-2 px-4 m-4 rounded-lg hover:bg-red-700"
            >
              Return Book
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BorrowedBooks;
