import React, { useState, useContext } from "react";
import { useTheme } from "../context/ThemeContext";
import { useLanguage } from "../context/LanguageContext";
import { AuthContext } from "../context/AuthContext";
import { FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage, translations } = useLanguage();
  const { login } = useContext(AuthContext);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match!");
      return;
    }

    try {
      const res = await axios.post("https://nt-devconnector.onrender.com/api/users", {
        name,
        email,
        password,
      });

      login(res.data.token); 
      navigate("/dashboard");
    } catch (error) {
      console.error("Registration failed", error);
      setErrorMessage(error.response?.data?.message || "Registration failed!");
    }
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center transition-all duration-300 
        ${theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"}`}
    >
      <form
        onSubmit={handleSubmit}
        className={`w-full max-w-md p-8 rounded-lg shadow-lg transition-all duration-300 
        ${theme === "dark" ? "bg-gray-800" : "bg-white border border-gray-300"}`}
      >
        <h1 className="text-4xl font-bold text-center text-teal-600 mb-4">
          {translations[language].signUp}
        </h1>
        <p className="text-center text-lg flex items-center justify-center gap-2">
          <FaUser /> {translations[language].createYourAccount}
        </p>

        {errorMessage && <p className="text-red-500 text-center">{errorMessage}</p>}

        <div className="mt-6 space-y-4">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={translations[language].name || "Name"}
            className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-teal-500 focus:outline-none 
              ${theme === "dark" ? "bg-gray-800 text-white border-gray-600 placeholder-gray-400" : "bg-white text-gray-900 border-gray-300"}`}
            required
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={translations[language].email || "Email address"}
            className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-teal-500 focus:outline-none 
              ${theme === "dark" ? "bg-gray-800 text-white border-gray-600 placeholder-gray-400" : "bg-white text-gray-900 border-gray-300"}`}
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder={translations[language].password || "Password"}
            className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-teal-500 focus:outline-none 
              ${theme === "dark" ? "bg-gray-800 text-white border-gray-600 placeholder-gray-400" : "bg-white text-gray-900 border-gray-300"}`}
            required
          />
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder={translations[language].confirmPassword || "Confirm Password"}
            className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-teal-500 focus:outline-none 
              ${theme === "dark" ? "bg-gray-800 text-white border-gray-600 placeholder-gray-400" : "bg-white text-gray-900 border-gray-300"}`}
            required
          />
          <button
            type="submit"
            className="w-full bg-teal-500 hover:bg-teal-600 text-white font-bold p-3 rounded-md"
          >
            {translations[language].signUp || "Register"}
          </button>
        </div>

        <p className="mt-4 text-center">
          {translations[language].alreadyHaveAnAccount}{" "}
          <Link to="/login">
            <span className="text-teal-500 hover:underline cursor-pointer">
              {translations[language].signIn}
            </span>
          </Link>
        </p>

        <div className="mt-4 flex justify-between items-center">
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className={`p-2 border rounded-md cursor-pointer 
              ${theme === "dark" ? "bg-gray-800 text-white border-gray-600" : "bg-white text-gray-900 border-gray-300"}`}
          >
            <option value="en">English</option>
            <option value="ru">Русский</option>
            <option value="uz">O'zbek</option>
          </select>
          <button
            type="button"
            onClick={toggleTheme}
            className={`p-2 rounded-md text-white transition-all duration-300 
              ${theme === "dark" ? "bg-gray-700 hover:bg-gray-600" : "bg-gray-300 hover:bg-gray-400"}`}
          >
            {theme === "dark" ? "☀️ Light Mode" : "🌙 Dark Mode"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
