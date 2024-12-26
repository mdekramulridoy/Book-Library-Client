import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ThreeDots } from 'react-loader-spinner'; // Import spinner

const DetailsPage = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [returnDate, setReturnDate] = useState("");

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await fetch(`https://book-library-server-mauve.vercel.app/books/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch book details");
        }
        const data = await response.json();
        setBook(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching book details:", error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchBookDetails();
  }, [id]);

  const handleBorrow = async (e) => {
    e.preventDefault();

    if (book.Quantity <= 0) {
      toast.error("This book is out of stock.");
      return;
    }

    try {
      const response = await fetch(`https://book-library-server-mauve.vercel.app/books/${id}/borrow`, {
        method: "PATCH",
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
        const errorMessage = await response.text();
        throw new Error(errorMessage);
      }

      const updatedBook = await response.json();

      // Re-fetch updated book details
      const refetchedBook = await fetch(`https://book-library-server-mauve.vercel.app/books/${id}`);
      const refetchedData = await refetchedBook.json();
      setBook(refetchedData);

      toast.success("Book borrowed successfully!");
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error borrowing book:", error);
      toast.error(error.message);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ThreeDots color="#000" height={80} width={80} /> {/* Loading spinner */}
      </div>
    );
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!book) {
    return <p>Book not found.</p>;
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
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
                isHalf={true}
                edit={false}
                activeColor="#ffd700"
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

      <ToastContainer />
    </div>
  );
};

export default DetailsPage;
