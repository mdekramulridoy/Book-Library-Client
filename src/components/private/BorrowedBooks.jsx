import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../../providers/AuthProvider'; // Assuming you have an AuthProvider to manage the user context
import { useNavigate } from 'react-router-dom';

const BorrowedBooks = () => {
  const { user } = useContext(AuthContext); // Get the logged-in user
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetch borrowed books
  useEffect(() => {
    const fetchBorrowedBooks = async () => {
      try {
        const response = await fetch(`http://localhost:5000/borrowedBooks?userEmail=${user.email}`);
        if (!response.ok) {
          throw new Error('Failed to fetch borrowed books');
        }
        const data = await response.json();
        setBorrowedBooks(data);
      } catch (error) {
        setError(error.message);
      }
    };

    if (user) {
      fetchBorrowedBooks();
    }
  }, [user]);

  // Handle returning a book
  const handleReturn = async (bookId) => {
    try {
      const response = await fetch(`http://localhost:5000/borrowedBooks/return/${bookId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userEmail: user.email,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to return the book');
      }

      // Remove returned book from the list
      const updatedBooks = borrowedBooks.filter((book) => book._id !== bookId);
      setBorrowedBooks(updatedBooks);

      alert('Book returned successfully!');
    } catch (error) {
      console.error('Error returning the book:', error);
      alert(error.message);
    }
  };

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      {borrowedBooks.length === 0 ? (
        <p>You haven't borrowed any books yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {borrowedBooks.map((book) => (
            <div key={book._id} className="bg-white p-4 rounded-lg shadow-lg">
              {/* Display book image */}
              <img
                src={book.bookId.Image || 'default-image-url'} // Access nested bookId details
                alt={book.bookId.Name}
                className="w-full h-48 object-cover mb-4"
              />
              <h2 className="text-xl font-semibold mb-2">{book.bookId.Name}</h2>
              <p><strong>Category:</strong> {book.bookId.Category || 'No Category'}</p>
              <p><strong>Borrowed Date:</strong> {new Date(book.borrowedDate).toLocaleDateString()}</p>
              <p><strong>Return Date:</strong> {new Date(book.returnDate).toLocaleDateString()}</p>
              <button
                onClick={() => handleReturn(book._id)}
                className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg"
              >
                Return Book
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BorrowedBooks;
