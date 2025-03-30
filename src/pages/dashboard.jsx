import React, { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import GetDataApi from "../hooks/GetDataApi";
import { FaUser } from "react-icons/fa";

const Dashboard = () => {
  const { user } = useContext(AuthContext);

  const { data: profile, loading: profileLoading, error } = GetDataApi("/profile/auth");

  if (profileLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 text-gray-900">
        <p className="text-lg">Loading user data...</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto py-10 px-6 bg-white shadow-md rounded-lg mt-10">
      <h1 className="text-4xl font-bold text-teal-600">Dashboard</h1>

      <div className="flex items-center mt-4">
        <FaUser className="text-xl text-gray-600 mr-2" />
        <h2 className="text-xl font-semibold">Welcome {user?.name}</h2>
      </div>

      <p className="text-gray-700 mt-2">
        {profile ? "Your profile is set up! Please add some info about yourself" : "You have not yet set up a profile, please add some info"}
      </p>

      {(
        <Link
          to="/createProfile"
          className="mt-4 inline-block bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-md transition"
        >
          Create Profile
        </Link>
      )}
    </div>
  );
};

export default Dashboard;
