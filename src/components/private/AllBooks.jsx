import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // For navigation to update form page

const AllBooks = () => {
  const [books, setBooks] = useState([]); // All books
  const [filteredBooks, setFilteredBooks] = useState([]); // Filtered books
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAvailable, setShowAvailable] = useState(false); // Track filter state
  const [viewType, setViewType] = useState("card"); // Track view type (card or table)

  // Fetch all books data from the server
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch("http://localhost:5000/books");
        if (!response.ok) {
          throw new Error("Failed to fetch books");
        }
        const data = await response.json();
        setBooks(data);
        setFilteredBooks(data); // Initially, show all books
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  // Filter books to only show available ones
  const filterAvailableBooks = () => {
    setShowAvailable(!showAvailable);
    if (!showAvailable) {
      // Show books with quantity > 0
      const availableBooks = books.filter((book) => book.Quantity > 0);
      setFilteredBooks(availableBooks);
    } else {
      // Show all books
      setFilteredBooks(books);
    }
  };

  // Handle changing view type
  const handleViewChange = (e) => {
    setViewType(e.target.value);
  };

  if (loading) {
    return <p>Loading books...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">All Books</h1>

      {/* Filter Button */}
      <div className="mb-6">
        <button
          onClick={filterAvailableBooks}
          className="px-4 py-2 bg-green-600 text-white rounded-lg"
        >
          {showAvailable ? "Show All Books" : "Show Available Books"}
        </button>
      </div>

      {/* Dropdown for View Type */}
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

      {/* Render Books Based on View Type */}
      {viewType === "card" ? (
        // Card View
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredBooks.map((book) => (
            <div key={book._id} className="bg-white p-4 shadow-lg rounded-lg">
              {/* Book Cover */}
              <div className="w-full h-64 bg-gray-100 mb-4">
                <img
                  src={book.Image}
                  alt={book.Name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Book Details */}
              <h2 className="text-xl font-semibold text-gray-800">{book.Name}</h2>
              <p className="text-gray-600">Author: {book.AuthorName}</p>
              <p className="text-gray-600">Category: {book.Category}</p>
              <p className="text-gray-600">Rating: {book.Rating} / 5</p>
              <p className="text-gray-600">Quantity: {book.Quantity}</p>

              {/* Update Button */}
              <div className="mt-4">
                <Link to={`/update-book/${book._id}`}>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg">
                    Update
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        // Table View
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
                  <Link to={`/update-book/${book._id}`}>
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
    </div>
  );
};

export default AllBooks;
