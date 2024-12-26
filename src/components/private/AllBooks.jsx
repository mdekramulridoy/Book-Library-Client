import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ThreeDots } from 'react-loader-spinner'; // Import the spinner

const AllBooks = () => {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAvailable, setShowAvailable] = useState(false);
  const [viewType, setViewType] = useState("card");

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch("http://localhost:5000/books");
        if (!response.ok) {
          throw new Error("Failed to fetch books");
        }
        const data = await response.json();
        setBooks(data);
        setFilteredBooks(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        toast.error("Failed to load books.");
        setLoading(false);
      }
    };

    fetchBooks();

    const updateMessage = localStorage.getItem("updateMessage");
    if (updateMessage) {
      toast.success(updateMessage);
      localStorage.removeItem("updateMessage");
    }
  }, []);

  const filterAvailableBooks = () => {
    setShowAvailable(!showAvailable);
    if (!showAvailable) {
      const availableBooks = books.filter((book) => book.Quantity > 0);
      setFilteredBooks(availableBooks);
      toast.info("Showing available books only.");
    } else {
      setFilteredBooks(books);
      toast.info("Showing all books.");
    }
  };

  const handleViewChange = (e) => {
    setViewType(e.target.value);
    toast.info(`View changed to ${e.target.value}.`);
  };

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <ThreeDots color="#00BFFF" height={80} width={80} /> {/* Show the spinner */}
      </div>
    );
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">All Books</h1>

      <div className="mb-6">
        <button
          onClick={filterAvailableBooks}
          className="px-4 py-2 bg-green-600 text-white rounded-lg"
        >
          {showAvailable ? "Show All Books" : "Show Available Books"}
        </button>
      </div>

      <div className="mb-6">
        <select
          value={viewType}
          onChange={handleViewChange}
          className="px-4 py-2 border rounded-lg"
        >
          <option value="card">Card View</option>
          <option value="table">Table View</option>
        </select>
      </div>

      {viewType === "card" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredBooks.map((book) => (
            <div key={book._id} className="bg-white p-4 shadow-lg rounded-lg">
              <div className="w-full h-64 bg-gray-100 mb-4">
                <img
                  src={book.Image}
                  alt={book.Name}
                  className="w-full h-full object-cover"
                />
              </div>
              <h2 className="text-xl font-semibold text-gray-800">{book.Name}</h2>
              <p className="text-gray-600">Author: {book.AuthorName}</p>
              <p className="text-gray-600">Category: {book.Category}</p>
              <p className="text-gray-600">Rating: {book.Rating} / 5</p>
              <p className="text-gray-600">Quantity: {book.Quantity}</p>
              <div className="mt-4">
                <Link
                  to={`/update-book/${book._id}`}
                  onClick={() =>
                    localStorage.setItem("updateMessage", "Book updated successfully!")
                  }
                >
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg">
                    Update
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <table className="min-w-full border-collapse border border-gray-200">
          <thead>
            <tr>
              <th className="px-4 py-2 border">Name</th>
              <th className="px-4 py-2 border">Author</th>
              <th className="px-4 py-2 border">Category</th>
              <th className="px-4 py-2 border">Rating</th>
              <th className="px-4 py-2 border">Quantity</th>
              <th className="px-4 py-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredBooks.map((book) => (
              <tr key={book._id}>
                <td className="px-4 py-2 border">{book.Name}</td>
                <td className="px-4 py-2 border">{book.AuthorName}</td>
                <td className="px-4 py-2 border">{book.Category}</td>
                <td className="px-4 py-2 border">{book.Rating} / 5</td>
                <td className="px-4 py-2 border">{book.Quantity}</td>
                <td className="px-4 py-2 border">
                  <Link
                    to={`/update-book/${book._id}`}
                    onClick={() =>
                      localStorage.setItem("updateMessage", "Book updated successfully!")
                    }
                  >
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg">
                      Update
                    </button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <ToastContainer />
    </div>
  );
};

export default AllBooks;
