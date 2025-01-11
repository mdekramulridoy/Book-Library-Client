import React, { useState } from "react";
import { Link } from "react-router-dom"; 
import Slider from "./Slider";

const Home = () => {
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

      <section className="mt-12 px-4 md:px-8 bg-gray-100 py-8">
        <h2 className="text-3xl font-bold text-center mb-6">
          What Our Readers Say
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="card shadow-lg border p-6">
            <p className="text-gray-600 italic">
              "The Alchemist inspired me to pursue my dreams. A must-read for
              everyone!"
            </p>
            <div className="mt-4 flex items-center">
              <img
                src="https://i.ibb.co/ph6PK0H/profile-user-icon-isolated-on-white-background-eps10-free-vector.jpg"
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
                src="https://i.ibb.co/ph6PK0H/profile-user-icon-isolated-on-white-background-eps10-free-vector.jpg"
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
                src="https://i.ibb.co/ph6PK0H/profile-user-icon-isolated-on-white-background-eps10-free-vector.jpg"
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

      <section id="faqs" className="mt-12 px-4 md:px-8 bg-gray-100 py-8">
        <h2 className="text-3xl font-bold text-center mb-6">FAQs</h2>
        <FAQs />
      </section>

      <section id="contact" className="mt-12 px-4 md:px-8 bg-gray-100 py-8">
        <h2 className="text-3xl font-bold text-center mb-6">Contact Us</h2>
        <div className="flex flex-col md:flex-row justify-around items-center">
          <div className="text-center mb-4 md:mb-0">
            <h3 className="text-lg font-bold">Phone & WhatsApp</h3>
            <p className="text-gray-700">01521323556</p>
          </div>
          <div className="text-center mb-4 md:mb-0">
            <h3 className="text-lg font-bold">Email</h3>
            <p className="text-gray-700">ekramul.hoque.ridoy@gmail.com</p>
          </div>
        </div>
      </section>

      <section id="about" className="mt-12 px-4 md:px-8 bg-white py-8">
        <h2 className="text-3xl font-bold text-center mb-6">About Us</h2>
        <p className="text-gray-700 text-center max-w-3xl mx-auto leading-relaxed">
          Welcome to our online bookstore! We are passionate about connecting readers with the
          books they love. Our mission is to provide a diverse range of genres to cater to
          every reader's taste. Whether you're looking for the latest bestsellers, timeless
          classics, or thought-provoking non-fiction, we have something for everyone. Join us
          on this journey to explore the magical world of books!
        </p>
      </section>
    </div>
  );
};

const FAQs = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: "What genres do you offer?",
      answer: "We offer a wide range of genres including Fantasy, Thriller, Classic, and Sci-Fi, among others."
    },
    {
      question: "How can I purchase a book?",
      answer: "Simply navigate to the desired category and click 'View Books' to explore available options. You can then add them to your cart and proceed to checkout."
    },
    {
      question: "Do you offer international shipping?",
      answer: "Yes, we provide international shipping to most countries."
    }
  ];

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="space-y-4  md:mx-28 lg:mx-32">
      {faqs.map((faq, index) => (
        <div key={index} className="border-b pb-4">
          <h3
            className="font-bold text-lg cursor-pointer flex justify-between items-center"
            onClick={() => toggleFAQ(index)}
          >
            {faq.question}
            <span className="ml-2">{activeIndex === index ? "-" : "+"}</span>
          </h3>
          {activeIndex === index && (
            <p className="text-gray-600 mt-2">{faq.answer}</p>
          )}
        </div>
      ))}
    </div>
  );
};

export default Home;