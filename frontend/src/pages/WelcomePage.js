import React from "react";
import { Link } from "react-router-dom";
import backgroundImage from "../assests/images/background.jpg";
import logo from "../assests/images/logo.jpg";
import featureImage from "../assests/images/slide1.jpg"; // replace with your icon

const features = [
  {
    title: "AI-Powered Guidance",
    description: "Personalized career paths using AI-based skill and interest analysis.",
  },
  {
    title: "Knowledge Assessment",
    description: "Test what you know and explore areas you can grow in.",
  },
  {
    title: "Interactive Dashboard",
    description: "Real-time insights to help you stay motivated and track progress.",
  },
];

const WelcomePage = () => {
  return (
    <div
      className="min-h-screen bg-cover bg-center relative text-white font-sans"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-30 backdrop-blur-sm"></div>

      {/* Top Nav */}
      <div className="relative z-10 flex justify-between items-center px-8 py-6">
        <div className="flex items-center gap-3">
          <img src={logo} alt="Logo" className="w-10 h-10 rounded-full" />
          <h1 className="text-2xl font-bold">TECH BRIDGE</h1>
        </div>
        <div className="space-x-4 flex items-center">
          <Link
            to="/register"
            className="px-6 py-3 bg-gray-100 text-gray-900 rounded-xl font-semibold text-lg shadow-md hover:bg-purple-700 hover:text-white transition-all duration-300"
          >
            Sign Up
          </Link>
          <Link
            to="/login"
            className="px-6 py-3 bg-gray-100 text-gray-900 rounded-xl font-semibold text-lg shadow-md hover:bg-purple-700 hover:text-white transition-all duration-300"
          >
            Sign In
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col sm:flex-row px-8 sm:px-16 pt-12 pb-20">
        {/* Left */}
        <div className="w-full sm:w-1/2 mt-20">
          <h2 className="text-5xl font-extrabold leading-tight mb-6">
            Empower Your Career Journey
          </h2>
          <p className="text-lg max-w-md">
            Discover your strengths, bridge your knowledge gaps, and unlock your potential with Tech Bridge.
          </p>
        </div>

        {/* Right: Feature Cards */}
        <div className="w-full sm:w-1/2 flex flex-col gap-6 mt-10 sm:mt-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex items-center p-6 sm:p-8 bg-white bg-opacity-20 rounded-2xl backdrop-blur-md shadow-xl"
            >
              <img
                src={featureImage}
                alt={feature.title}
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-md mr-4 sm:mr-6"
              />
              <div>
                <h3 className="font-semibold text-xl mb-2">{feature.title}</h3>
                <p className="text-base">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
