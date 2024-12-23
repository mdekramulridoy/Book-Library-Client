import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider"; // Assuming you have this context to manage authentication

const UpdateBook = () => {
  const { id } = useParams(); // Get the book ID from the URL
  const navigate = useNavigate();
  const { user } = useContext(AuthContext); // Get the logged-in user from the Auth context
  const [book, setBook] = useState(null); // State to store book data
  const [image, setImage] = useState(''); // For storing new image URL
  const [name, setName] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [category, setCategory] = useState('');
  const [rating, setRating] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      // If user is not authenticated, redirect to login page
      navigate("/login");
      return;
    }

    const fetchBook = async () => {
      try {
        const response = await fetch(`http://localhost:5000/books/${id}`);
        if (!response.ok) {
          throw new Error('Book not found');
        }
        const bookData = await response.json();
        setBook(bookData);
        setName(bookData.Name);
        setAuthorName(bookData.AuthorName);
        setCategory(bookData.Category);
        setRating(bookData.Rating);
        setImage(bookData.Image); // Set the existing image URL
        setLoading(false);
      } catch (error) {
        console.error('Error fetching book:', error);
        setLoading(false);
      }
    };

    fetchBook();
  }, [id, user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedBook = { Name: name, AuthorName: authorName, Category: category, Rating: rating, Image: image };
    const formData = new FormData();

    // Append data
    formData.append('Name', name);
    formData.append('AuthorName', authorName);
    formData.append('Category', category);
    formData.append('Rating', rating);
    formData.append('Image', image); // Append the image URL

    try {
      const response = await fetch(`http://localhost:5000/books/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(updatedBook),
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) {
        throw new Error('Failed to update the book');
      }

      alert('Book updated successfully!');
      navigate(`/book/${id}`); // Redirect to the updated book's details page
    } catch (error) {
      console.error('Error updating book:', error);
      alert('Failed to update book');
    }
  };

  if (loading) {
    return <p>Loading book details...</p>;
  }

  if (!book) {
    return <p>Book not found.</p>;
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">Update Book</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Image URL</label>
          <input
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg"
            placeholder="Image URL"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Book Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg"
            placeholder="Book Name"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Author Name</label>
          <input
            type="text"
            value={authorName}
            onChange={(e) => setAuthorName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg"
            placeholder="Author Name"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg"
            required
          >
            <option value="fiction">Fiction</option>
            <option value="non-fiction">Non-fiction</option>
            <option value="science">Science</option>
            <option value="history">History</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Rating</label>
          <input
            type="number"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            min="1"
            max="5"
            className="w-full p-2 border border-gray-300 rounded-lg"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default UpdateBook;
