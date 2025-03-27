import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Profile() {
  const [profiles, setProfiles] = useState([]);
  
  useEffect(() => {
    let token = localStorage.getItem("token");
    axios
      .get("https://nt-devconnector.onrender.com/api/profile", {
        headers: {
          "x-auth-token": token,
        },
      })
      .then((res) => setProfiles(res.data))
  }, []);

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <h1 className="text-4xl font-bold text-teal-600 text-center">Developers</h1>
      <p className="text-gray-700 text-lg mt-2 text-center">
        🏗️ Browse and connect with developers
      </p>

      
        {profiles.map((profile, index) => (
          <div 
            key={index} 
            className="mt-6 p-6 border border-gray-300 bg-white rounded-md flex flex-col md:flex-row gap-6 shadow-md"
          >
            <div className="flex justify-center">
              <img
                src={profile.user?.avatar || "https://via.placeholder.com/100"}
                alt="User"
                className="w-28 h-28 rounded-full border"
              />
            </div>

            <div className="flex-1">
              <h3 className="text-2xl font-bold text-gray-900">
                {profile.user?.name || "No Name Provided"}
              </h3>
              <p className="text-gray-600 text-md">
                {profile.status} {profile.company ? `at ${profile.company}` : ""}
              </p>
              <p className="text-gray-600">
                {profile.location || "🌍 Location not provided"}
              </p>

              {profile.skills?.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {profile.skills.map((skill, i) => (
                    <span 
                      key={i} 
                      className="bg-teal-100 text-teal-700 px-2 py-1 rounded-md text-sm"
                    >
                      ✔ {skill}
                    </span>
                  ))}
                </div>
              )}
              <Link 
                className="bg-teal-500 text-white px-4 py-2 mt-4 inline-block rounded-md hover:bg-teal-600 transition"
                to={`/profile/${profile.user?._id}`}
              >
                View Profile
              </Link>
            </div>
          </div>
        ))
    }
    </div>
  );
}

export default Profile;
