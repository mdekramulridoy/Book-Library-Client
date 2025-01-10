import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast"; // Import toast for success message

const AddBook = () => {
  const [bookDetails, setBookDetails] = useState({
    Image: "", // Updated to match MongoDB key capitalization
    Name: "", // Updated to match MongoDB key capitalization
    Quantity: 0,
    AuthorName: "", // Updated to match MongoDB key capitalization
    Category: "Novel",
    ShortDescription: "", // Updated to match MongoDB key capitalization
    Rating: 1,
    BookContent: "", // Updated to match MongoDB key capitalization
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookDetails({ ...bookDetails, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Save book details to the database
      const response = await fetch("https://book-library-server-mauve.vercel.app/books", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookDetails),
      });

      if (!response.ok) {
        throw new Error("Failed to add book");
      }

      toast.success("Book added successfully!");
      setBookDetails({
        Image: "",
        Name: "",
        Quantity: 0,
        AuthorName: "",
        Category: "Novel",
        ShortDescription: "",
        Rating: 1,
        BookContent: "", // Reset bookContent
      });
    } catch (error) {
      console.error("Error adding book:", error);
      toast.error("Failed to add book. Please try again.");
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Add Book</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Book Cover Image URL */}
        <div>
          <label className="block mb-2 font-medium">Book Cover Image URL</label>
          <input
            type="text"
            name="Image"
            value={bookDetails.Image}
            onChange={handleInputChange}
            required
            placeholder="Enter image URL"
            className="border rounded-lg p-2 w-full"
          />
        </div>

        {/* Book Name */}
        <div>
          <label className="block mb-2 font-medium">Name</label>
          <input
            type="text"
            name="Name"
            value={bookDetails.Name}
            onChange={handleInputChange}
            required
            className="border rounded-lg p-2 w-full"
          />
        </div>

        {/* Quantity */}
        <div>
          <label className="block mb-2 font-medium">Quantity</label>
          <input
            type="number"
            name="Quantity"
            value={bookDetails.Quantity}
            onChange={handleInputChange}
            required
            min="0"
            className="border rounded-lg p-2 w-full"
          />
        </div>

        {/* Author Name */}
        <div>
          <label className="block mb-2 font-medium">Author Name</label>
          <input
            type="text"
            name="AuthorName"
            value={bookDetails.AuthorName}
            onChange={handleInputChange}
            required
            className="border rounded-lg p-2 w-full"
          />
        </div>

        {/* Category */}
        <div>
          <label className="block mb-2 font-medium">Category</label>
          <select
            name="Category"
            value={bookDetails.Category}
            onChange={handleInputChange}
            required
            className="border rounded-lg p-2 w-full"
          >
            <option value="Novel">Novel</option>
            <option value="Thriller">Thriller</option>
            <option value="History">History</option>
            <option value="Drama">Drama</option>
            <option value="Sci-Fi">Sci-Fi</option>
          </select>
        </div>

        {/* Short Description */}
        <div>
          <label className="block mb-2 font-medium">Short Description</label>
          <textarea
            name="ShortDescription"
            value={bookDetails.ShortDescription}
            onChange={handleInputChange}
            required
            className="border rounded-lg p-2 w-full"
          />
        </div>

        {/* Rating */}
        <div>
          <label className="block mb-2 font-medium">Rating</label>
          <input
            type="number"
            name="Rating"
            value={bookDetails.Rating}
            onChange={handleInputChange}
            required
            min="1"
            max="5"
            className="border rounded-lg p-2 w-full"
          />
        </div>

        {/* Book Content */}
        <div>
          <label className="block mb-2 font-medium">Content</label>
          <textarea
            name="BookContent"
            value={bookDetails.BookContent}
            onChange={handleInputChange}
            required
            placeholder="Enter detailed content about the book"
            className="border rounded-lg p-2 w-full"
          />
        </div>

        {/* Add Button */}
        <button
          type="submit"
          className="px-4 py-2 bg-black text-white rounded-lg"
        >
          Add Book
        </button>
      </form>

      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
};

export default AddBook;
