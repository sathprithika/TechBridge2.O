import React, { useState } from "react";
import backgroundImage from "../assests/images/background.jpg";
import loginImage from "../assests/images/reg.png";
import TextBox from "../components/TextBox";
import Button from "../components/Button";
import { UserIcon, EnvelopeIcon, LockClosedIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import axios from "axios";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    try {
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/user/register`, {
        name,
        email,
        password,
      });

      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");

      alert(response?.data?.message);
    } catch (error) {
      if (error?.response?.data?.code === 13001) {
        alert(error?.response?.data?.message);
      } else {
        alert(error?.response?.data?.message);
      }
    }
  };

  return (
    <div
      className="flex justify-center items-center bg-cover h-screen"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="flex justify-center items-center w-4/5 sm:w-3/4 md:w-2/3 h-auto sm:h-4/5 p-8 bg-white rounded-xl shadow-lg border-2 border-gray-200">
        {/* Left Section - Image */}
        <div className="hidden sm:block w-1/2 mr-10 border-r-2 border-gray-300">
          <img src={loginImage} alt="Register" className="rounded-lg shadow-md transform hover:scale-105 transition duration-300" />
        </div>

        {/* Right Section - Form */}
        <div className="w-full sm:w-1/2">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <p className="font-sans text-gray-600 text-4xl text-center font-semibold tracking-widest mb-8">
              Join Us and Grow Your Career
            </p>

            <TextBox
              placeholder="Enter your name"
              label="Full Name"
              type="text"
              Icon={UserIcon}
              value={name}
              setValue={setName}
              required={true}
            />

            <TextBox
              placeholder="Enter your email"
              label="Email Address"
              type="email"
              Icon={EnvelopeIcon}
              value={email}
              setValue={setEmail}
              required={true}
            />

            <TextBox
              placeholder="Enter your password"
              label="Password"
              type="password"
              Icon={LockClosedIcon}
              value={password}
              setValue={setPassword}
              required={true}
            />

            <TextBox
              placeholder="Re-enter your password"
              label="Confirm Password"
              type="password"
              Icon={LockClosedIcon}
              value={confirmPassword}
              setValue={setConfirmPassword}
              required={true}
            />

            <Button name="Sign Up" />

            <p className="text-gray-600 text-center">
              Already have an account?{" "}
              <Link to="/login" className="text-indigo-600 font-semibold hover:text-indigo-800">
                Log In
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
