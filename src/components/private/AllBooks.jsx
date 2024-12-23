import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // For navigation to update form page

const AllBooks = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  if (loading) {
    return <p>Loading books...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">All Books</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {books.map((book) => (
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
    </div>
  );
};

export default AllBooks;
