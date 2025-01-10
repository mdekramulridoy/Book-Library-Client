import React from "react";
import { Link } from "react-router-dom"; // Import Link for navigation
import Slider from "./Slider";

const Home = () => {
  // Book categories
  const categories = ["Fantasy", "Thriller", "Classic", "Sci-Fi"];

  return (
    <div>
      <Slider />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {categories.map((category, index) => (
          <div key={index} className="card">
            <div className="card-body text-center font-bold">
              <h2>{category}</h2>
              <Link
                to={`/category/${category}`}
                className="btn btn-primary bg-black hover:text-white hover:bg-slate-700"
              >
                View Books
              </Link>
            </div>
          </div>
        ))}
      </div>
      {/* Featured Books Section */}
      <section className="mt-12 px-4 md:px-8">
        <h2 className="text-3xl font-bold text-center mb-6">Featured Books</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Featured Books */}
          <div className="card shadow-lg border">
            <img
              src="https://images-na.ssl-images-amazon.com/images/I/91SZSW8qSsL.jpg"
              alt="The Alchemist"
              className="w-full h-full object-cover"
            />
            <div className="card-body text-center">
              <h3 className="font-bold text-lg mb-2">The Great Gatsby</h3>
              <p className="text-sm text-gray-600">
                A masterpiece of Paulo Coelho, inspiring readers to follow their
                dreams.
              </p>
              <Link
                to={`/details-books/67695bd390609ce7ba768613`}
                className="btn btn-primary hover:bg-slate-500 bg-black mt-4 hover:text-white"
              >
                View Details
              </Link>
            </div>
          </div>

          <div className="card shadow-lg border">
            <img
              src="https://images-na.ssl-images-amazon.com/images/I/71kxa1-0mfL.jpg"
              alt="To Kill a Mockingbird"
              className="w-full h-full object-cover"
            />
            <div className="card-body text-center">
              <h3 className="font-bold text-lg mb-2">1984</h3>
              <p className="text-sm text-gray-600">
                Harper Lee's timeless novel on justice and moral growth.
              </p>
              <Link
                to={`/details-books/67695ff820c56540e21e802a`}
                className="btn btn-primary hover:bg-slate-700 bg-black mt-4 hover:text-white"
              >
                View Details
              </Link>
            </div>
          </div>

          <div className="card shadow-lg border">
            <img
              src="https://images-na.ssl-images-amazon.com/images/I/91HHqVTAJQL.jpg"
              alt="1984 by George Orwell"
              className="w-full h-full object-cover"
            />
            <div className="card-body text-center">
              <h3 className="font-bold text-lg mb-2">Harry Potter</h3>
              <p className="text-sm text-gray-600">
                George Orwell's dystopian classic on surveillance and freedom.
              </p>
              <Link to={`/details-books/67695bd390609ce7ba768624`} className="btn btn-primary hover:text-white hover:bg-slate-700 bg-black mt-4">
                View Details
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="mt-12 px-4 md:px-8 bg-gray-100 py-8">
        <h2 className="text-3xl font-bold text-center mb-6">
          What Our Readers Say
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Testimonials */}
          <div className="card shadow-lg border p-6">
            <p className="text-gray-600 italic">
              "The Alchemist inspired me to pursue my dreams. A must-read for
              everyone!"
            </p>
            <div className="mt-4 flex items-center">
              <img
                src="https://i.ibb.co.com/ph6PK0H/profile-user-icon-isolated-on-white-background-eps10-free-vector.jpg"
                alt="Md. Ekramul Hoque"
                className="w-12 h-12 rounded-full mr-4"
              />
              <div>
                <h4 className="font-bold">Md. Ekramul Hoque</h4>
                <p className="text-sm text-gray-700">Sci-Fi Lover</p>
              </div>
            </div>
          </div>

          <div className="card shadow-lg border p-6">
            <p className="text-gray-600 italic">
              "To Kill a Mockingbird taught me the true value of justice and
              empathy."
            </p>
            <div className="mt-4 flex items-center">
              <img
                src="https://i.ibb.co.com/ph6PK0H/profile-user-icon-isolated-on-white-background-eps10-free-vector.jpg"
                alt="Md. Mehedi Rayan"
                className="w-12 h-12 rounded-full mr-4"
              />
              <div>
                <h4 className="font-bold">Md. Mehedi Rayan</h4>
                <p className="text-sm text-gray-500">Book Enthusiast</p>
              </div>
            </div>
          </div>

          <div className="card shadow-lg border p-6">
            <p className="text-gray-600 italic">
              "1984 is a thought-provoking book that everyone should read at
              least once."
            </p>
            <div className="mt-4 flex items-center">
              <img
                src="https://i.ibb.co.com/ph6PK0H/profile-user-icon-isolated-on-white-background-eps10-free-vector.jpg"
                alt="Md. Rayhan Ahmed"
                className="w-12 h-12 rounded-full mr-4"
              />
              <div>
                <h4 className="font-bold">Md. Rayhan Ahmed</h4>
                <p className="text-sm text-gray-500">Literature Lover</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
