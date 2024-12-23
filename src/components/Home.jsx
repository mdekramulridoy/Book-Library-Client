import React from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation
import Slider from './Slider';

const Home = () => {
  // Book categories
  const categories = ['Fantasy', 'Thriller', 'Classic', 'Sci-Fi'];

  return (
    <div>
      <Slider />
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {categories.map((category, index) => (
          <div key={index} className="card">
            <div className="card-body text-center font-bold">
              <h2>{category}</h2>
              <Link to={`/category/${category}`} className="btn btn-primary bg-black">
                View Books
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
