import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { FaSignOutAlt, FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const { user, logout } = useContext(AuthContext);
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const navigate = useNavigate();

  return (
    <nav className="bg-gray-800 text-white p-4 shadow-md">
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-teal-400 hover:text-teal-300 transition">
          {"</>"} DevConnector
        </Link>
        <div className="flex items-center gap-6">
          <Link to="/profile" className="hover:text-teal-300 transition">
            Developers
          </Link>

          {!user && (
            <>
              <Link 
                to="/register" 
                className="hover:text-teal-300 transition"
              >
                Register
              </Link>
              <Link 
                to="/login" 
                className="hover:text-teal-300 transition"
              >
                Login
              </Link>
            </>
          )}

          {user && (
            <>
              <Link to="/dashboard" className="flex items-center gap-2 hover:text-teal-300 transition">
                <FaUser /> Dashboard
              </Link>
              <Link to="/posts" className="hover:text-teal-300 transition">
                Posts
              </Link>
              <button 
                onClick={() => {
                  logout();
                  navigate("/login");
                }}
                className="flex items-center gap-2  hover:text-teal-300 transition"
              >
                <FaSignOutAlt /> Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;
