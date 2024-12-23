import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Added useNavigate
import ReactStars from "react-rating-stars-component"; // Import the rating library
import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";

const DetailsPage = () => {
  const { id } = useParams(); // Get the book ID from the URL
  const { user } = useContext(AuthContext); // Get the currently logged-in user
  const [book, setBook] = useState(null); // State to store the book data
  const [loading, setLoading] = useState(true); // State for loading status
  const [error, setError] = useState(null); // State for handling errors
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility
  const [returnDate, setReturnDate] = useState(""); // State to store the return date

  const navigate = useNavigate(); // Navigate hook for routing to the Update Page

  // Fetch book details based on the book ID
  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5000/books/${id}`); // Make the API call
        if (!response.ok) {
          throw new Error("Failed to fetch book details");
        }
        const data = await response.json();
        setBook(data); // Set the book data in the state
        setLoading(false); // Set loading to false
      } catch (error) {
        console.error("Error fetching book details:", error);
        setError(error.message); // Set the error message in the state
        setLoading(false);
      }
    };

    fetchBookDetails();
  }, [id]); // Run the effect when the ID changes

  // Handle borrow logic
  const handleBorrow = async (e) => {
    e.preventDefault();

    if (book.Quantity <= 0) {
      alert("This book is out of stock.");
      return;
    }

    // Decrease the book's quantity in the database
    try {
      const response = await fetch(`http://localhost:5000/books/${id}/borrow`, {
        method: "PATCH", // Use PATCH to update the book
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          returnDate,
          userId: user.uid,
          userName: user.displayName,
          userEmail: user.email,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to borrow the book");
      }

      const updatedBook = await response.json();

      // After borrowing, refetch the book details to get updated quantity
      const refetchedBook = await fetch(`http://localhost:5000/books/${id}`);
      const refetchedData = await refetchedBook.json();
      setBook(refetchedData); // Update the book data with the new quantity

      alert("Book borrowed successfully!");

      // Close the modal after successful borrow
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error borrowing book:", error);
      alert(error.message);
    }
  };



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
    <div className="p-6 max-w-3xl mx-auto">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Display full height of the book image */}
        <div className="w-full bg-gray-100">
          <img
            src={book.Image}
            alt={book.Name}
            className="w-full h-auto object-contain"
          />
        </div>
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-4 text-center">{book.Name}</h1>
          <div className="mb-4 text-gray-700">
            <p className="mb-2">
              <strong className="text-gray-800">Author:</strong> {book.AuthorName}
            </p>
            <p className="mb-2">
              <strong className="text-gray-800">Category:</strong> {book.Category}
            </p>
            <p className="mb-2">
              <strong className="text-gray-800">Quantity:</strong> {book.Quantity}
            </p>
            <div className="mb-4">
              <strong className="text-gray-800">Rating:</strong>{" "}
              <ReactStars
                count={5}
                value={book.Rating}
                size={30}
                isHalf={true} // Allow half stars
                edit={false} // Read-only
                activeColor="#ffd700" // Gold color for stars
              />
            </div>
          </div>
          <div className="text-gray-700">
            <p className="mb-4">
              <strong className="text-gray-800">Short Description:</strong>{" "}
              {book.ShortDescription}
            </p>
            <p>
              <strong className="text-gray-800">Description:</strong>{" "}
              {book.BookContent}
            </p>
          </div>
          <div className="mt-4">
            {/* Borrow button */}
            <button
              onClick={() => setIsModalOpen(true)}
              disabled={book.Quantity <= 0}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg"
            >
              {book.Quantity <= 0 ? "Out of Stock" : "Borrow"}
            </button>
            
          </div>
        </div>
      </div>

      {/* Modal for Borrowing */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h2 className="text-2xl mb-4">Borrow Book</h2>
            <form onSubmit={handleBorrow}>
              <div className="mb-4">
                <label className="block text-gray-700">Name</label>
                <input
                  type="text"
                  value={user.displayName}
                  readOnly
                  className="w-full p-2 border border-gray-300 rounded-lg"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Email</label>
                <input
                  type="email"
                  value={user.email}
                  readOnly
                  className="w-full p-2 border border-gray-300 rounded-lg"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Return Date</label>
                <input
                  type="date"
                  value={returnDate}
                  onChange={(e) => setReturnDate(e.target.value)}
                  required
                  className="w-full p-2 border border-gray-300 rounded-lg"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-lg"
              >
                Submit
              </button>
            </form>
            <button
              onClick={() => setIsModalOpen(false)}
              className="mt-4 text-gray-500 hover:text-gray-700"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DetailsPage;
