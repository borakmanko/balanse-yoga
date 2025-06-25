import React from "react";
import { useNavigate } from "react-router-dom";

const Homepage: React.FC = () => {
  const navigate = useNavigate();

  const handleBookNow = () => {
    navigate("/booking"); // Change to your booking route if needed
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-200 via-blue-100 to-blue-300 px-4">
      <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-800 text-center">
        Welcome to Balanse Yoga
      </h1>
      <p className="text-lg md:text-xl max-w-xl text-center mb-6 text-gray-700">
        Discover balance, strength, and peace at Balanse Yoga. Our certified instructors offer a variety of classes including Yoga, Kickboxing, and Calisthenics, tailored for all levels. Experience a supportive community and reliable service that puts your wellness first.
      </p>
      <ul className="text-base md:text-lg text-gray-600 mb-8 max-w-md space-y-2">
        <li>✔️ Trusted by hundreds of happy members</li>
        <li>✔️ Flexible schedules and expert instructors</li>
        <li>✔️ Easy online booking and personalized sessions</li>
      </ul>
      <button
        onClick={handleBookNow}
        className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-full text-lg font-semibold shadow-lg transition"
      >
        Book Now
      </button>
    </div>
  );
};

export default Homepage;