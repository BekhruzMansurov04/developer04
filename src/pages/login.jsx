import React, { useState, useContext, useEffect } from "react";
import { useTheme } from "../context/ThemeContext";
import { useLanguage } from "../context/LanguageContext";
import { AuthContext } from "../context/AuthContext";
import { FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const LoginPage = () => {
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage, translations } = useLanguage();
  const { user, login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      navigate("/dashboard"); 
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await axios.post("https://nt-devconnector.onrender.com/api/auth", { email, password });

      if (res.data.token) {
        login(res.data.token, res.data.user); 
      } else {
        setError("Unexpected server response. Please try again.");
      }
    } catch (err) {
      console.error("Login failed:", err);
      setError(err.response?.data?.msg || "Invalid email or password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center transition-all duration-300 
      ${theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"}`}
    >
      <div className={`w-full max-w-md p-8 rounded-lg shadow-lg transition-all duration-300 
        ${theme === "dark" ? "bg-gray-800" : "bg-white border border-gray-300"}`}
      >
        <h1 className="text-4xl font-bold text-center text-teal-600 mb-4">
          {translations[language]?.signIn ?? "Sign In"}
        </h1>
        <p className="text-center text-lg flex items-center justify-center gap-2">
          <FaUser /> {translations[language]?.signIntoAccount ?? "Sign into your account"}
        </p>

        {error && <p className="text-red-500 text-center mt-2">{error}</p>}

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={translations[language]?.email ?? "Email"}
            className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-teal-500 focus:outline-none 
            ${theme === "dark" ? "bg-gray-800 text-white border-gray-600 placeholder-gray-400" : "bg-white text-gray-900 border-gray-300"}`}
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder={translations[language]?.password ?? "Password"}
            className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-teal-500 focus:outline-none 
            ${theme === "dark" ? "bg-gray-800 text-white border-gray-600 placeholder-gray-400" : "bg-white text-gray-900 border-gray-300"}`}
            required
          />
          <button
            type="submit"
            className="w-full bg-teal-500 hover:bg-teal-600 text-white font-bold p-3 rounded-md disabled:opacity-50"
            disabled={loading}
          >
            {loading ? "Signing In..." : translations[language]?.signIn ?? "Login"}
          </button>
        </form>

        <p className="mt-4 text-center">
          {translations[language]?.noAccount ?? "Don't have an account?"}{" "}
          <Link to="/register">
            <span className="text-teal-500 hover:underline cursor-pointer">
              {translations[language]?.signUp ?? "Sign Up"}
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
      </div>
    </div>
  );
};

export default LoginPage;
