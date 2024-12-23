import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

const CategoryPage = () => {
  const { category } = useParams();  // Get the category from URL
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch books based on the selected category
    const fetchBooks = async () => {
      try {
        const response = await fetch(`http://localhost:5000/books/category/${category}`);

        if (!response.ok) {
          throw new Error('Failed to fetch books');
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
    <div>
      <h1>Books in {category} category</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {books.map((book) => (
          <div key={book._id} className="card">
            <img src={book.Image} alt={book.Name} />
            <div className="card-body text-center font-bold">
              <h2>{book.Name}</h2>
              <p>{book.AuthorName}</p>
              <Link to={`/details-books/${book._id}`} className="btn btn-primary">
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
