import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import CreateDataApi from "../hooks/CreateDataApi";

const CreateProfile = () => {
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    status: "",
    company: "",
    website: "",
    location: "",
    skills: "",
  });

  const { postData, loading, error } = CreateDataApi("/profile");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formattedData = {
      ...formData,
      skills: formData.skills.split(",").map((skill) => skill.trim()),
    };

    const response = await postData(formattedData); 

    if (response) {
      navigate(`/profile`

      );
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-10 px-6 bg-white shadow-md rounded-lg mt-10">
      <h1 className="text-4xl font-bold text-teal-600">Create Your Profile</h1>
      <p className="text-gray-700 mt-2">
        👤 Let's get some information to make your profile stand out.
      </p>

      {error && <p className="text-red-500">{error}</p>}

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <div>
          <label className="block text-gray-700 font-medium">* Select Professional Status</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            required
            className="w-full mt-1 p-2 border border-gray-300 rounded"
          >
            <option value="">Select Professional Status</option>
            <option value="Developer">Developer</option>
            <option value="Junior Developer">Junior Developer</option>
            <option value="Senior Developer">Senior Developer</option>
            <option value="Manager">Manager</option>
            <option value="Student">Student</option>
          </select>
        </div>

        <div>
          <label className="block text-gray-700 font-medium">Company</label>
          <input
            type="text"
            name="company"
            value={formData.company}
            onChange={handleChange}
            className="w-full mt-1 p-2 border border-gray-300 rounded"
            placeholder="Could be your own company or one you work for"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium">Website</label>
          <input
            type="text"
            name="website"
            value={formData.website}
            onChange={handleChange}
            className="w-full mt-1 p-2 border border-gray-300 rounded"
            placeholder="Could be your own or a company website"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium">Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="w-full mt-1 p-2 border border-gray-300 rounded"
            placeholder="City & state suggested (e.g. Boston, MA)"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium">* Skills</label>
          <input
            type="text"
            name="skills"
            value={formData.skills}
            onChange={handleChange}
            required
            className="w-full mt-1 p-2 border border-gray-300 rounded"
            placeholder="Please use comma separated values (e.g. HTML, CSS, JavaScript)"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-teal-500 text-white py-2 rounded-md hover:bg-teal-600 transition"
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default CreateProfile;
