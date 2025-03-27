import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const ProfileDetails = () => {
  const { id } = useParams();
  console.log(id);
  const [profile, setProfile] = useState({});
  
  
  useEffect(() => {
    let token = localStorage.getItem("token");
    axios
      .get(`https://nt-devconnector.onrender.com/api/profile/user/${id}`, {
        headers: { "x-auth-token": token,
         },
      })
    .then((res) => setProfile(res.data));
  }, []);
  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <Link to="/profile" className="text-teal-500 hover:underline">
        ← Back To Profiles
      </Link>
      <div className="mt-6 p-6 border border-gray-300 bg-white rounded-md shadow-md">
              <img
                src={profile.user?.avatar}
                alt="User"
                className="w-28 h-28 rounded-full border"
              />
              <h3 className="text-2xl font-bold text-gray-900">
                {profile.user?.name || "No Name Provided"}
              </h3>
              <p className="text-gray-600 text-md">
                {profile.status} {profile.company}
              </p>
              <p className="text-gray-600">
                {profile.location || "🌍 Location not provided"}
              </p>

        <p className="text-gray-600 mt-2">{profile.bio}</p>

        <p className="mt-4">
          <strong className="text-gray-800">Status:</strong> {profile.status}
        </p>
        <p>
          <strong className="text-gray-800">Company:</strong> {profile.company}
        </p>
      </div>
    </div>
  );
};

export default ProfileDetails;
