import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import ReactStars from "react-rating-stars-component"; // Import the library

const CategoryPage = () => {
  const { category } = useParams(); // Get the category from URL
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch books based on the selected category
    const fetchBooks = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/books/category/${category}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch books");
        }
        const data = await response.json();
        setBooks(data); // Store the fetched books
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchBooks();
  }, [category]); // Re-run when category changes

  if (loading) {
    return <p>Loading books...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (books.length === 0) {
    return <p>No books found in this category.</p>;
  }

  return (
    <div className="p-4 bg-white">
      <h1 className="text-2xl font-bold text-center mb-6">
        Books in {category} Category
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {books.map((book) => (
          <div
            key={book._id}
            className="card shadow-lg rounded-lg overflow-hidden bg-white flex flex-col hover:scale-105 transition-transform"
          >
            <div className="w-full">
              {/* Ensure full height of the image is shown */}
              <img
                src={book.Image}
                alt={book.Name}
                className="w-full h-64 object-contain bg-gray-100"
              />
            </div>
            <div className="card-body p-4 flex flex-col justify-between flex-grow">
              <div>
                <h2 className="text-lg font-semibold mb-2">{book.Name}</h2>
                <p className="text-gray-600 mb-4">By {book.AuthorName}</p>
                <p className="text-gray-600 mb-4">Category: {book.Category}</p>
                <p className="text-gray-600 mb-4">Quantity: {book.Quantity}</p>
                <div className="mb-4">
                  <strong className="text-gray-800">Rating:</strong>{" "}
                  <ReactStars
                    count={5}
                    value={book.Rating}
                    size={24}
                    isHalf={true} // Allow half stars
                    edit={false} // Make it read-only
                    activeColor="#ffd700"
                  />
                </div>
              </div>
              <Link
                to={`/details-books/${book._id}`}
                className="inline-block bg-black text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors text-center mt-auto"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;
