import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const DetailsPage = () => {
  const { id } = useParams(); // Get the book ID from the URL
  const [book, setBook] = useState(null); // State to store the book data
  const [loading, setLoading] = useState(true); // State for loading status
  const [error, setError] = useState(null); // State for handling errors

  useEffect(() => {
    // Fetch book details based on the book ID
    const fetchBookDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5000/books/${id}`); // Make the API call
        if (!response.ok) {
          throw new Error('Failed to fetch book details');
        }
        const data = await response.json();
        setBook(data); // Set the book data in the state
        setLoading(false); // Set loading to false
      } catch (error) {
        console.error('Error fetching book details:', error);
        setError(error.message); // Set the error message in the state
        setLoading(false);
      }
    };

    fetchBookDetails();
  }, [id]); // Run the effect when the ID changes

  if (loading) {
    return <p>Loading book details...</p>; // Show loading message
  }

  if (error) {
    return <p>{error}</p>; // Show error message if there was an issue fetching the data
  }

  if (!book) {
    return <p>Book not found.</p>; // Show message if book data is not available
  }

  return (
    <div className="book-details">
      <h1>{book.Name}</h1>
      <img src={book.Image} alt={book.Name} className="book-image" />
      <p><strong>Author:</strong> {book.AuthorName}</p>
      <p><strong>Category:</strong> {book.Category}</p>
      <p><strong>Quantity:</strong> {book.Quantity}</p>
      <p><strong>Description:</strong> {book.BookContent}</p>
      <p><strong>Rating:</strong> {book.Rating}</p>
      <p><strong>Short Description:</strong> {book.ShortDescription}</p>
    </div>
  );
};

export default DetailsPage;
