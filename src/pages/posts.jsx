import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaUser, FaThumbsUp, FaThumbsDown } from "react-icons/fa";
import { Link } from "react-router-dom";

function Posts() {
  const [posts, setPosts] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    let token = localStorage.getItem("token");
    axios
      .get("https://nt-devconnector.onrender.com/api/posts", {
        headers: {
          "x-auth-token": token,
        },
      })
      .then((res) => setPosts(res.data))
      .catch((err) => console.error(err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    let token = localStorage.getItem("token");
    axios
      .post(
        "https://nt-devconnector.onrender.com/api/posts",
        { text },
        {
          headers: {
            "x-auth-token": token,
          },
        }
      )
      .then((res) => {
        setPosts([res.data, ...posts]);
        setText("");
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <h1 className="text-4xl font-bold text-teal-600">Posts</h1>
      <p className="text-gray-700 flex items-center mt-2 text-lg">
        <FaUser className="mr-2" /> Welcome to the community
      </p>

      <div className="mt-6 bg-teal-500 text-white px-4 py-2 rounded-t-md font-semibold">
        Say Something...
      </div>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-4 border border-gray-300 rounded-b-md"
      >
        <textarea
          className="w-full p-2 border border-gray-300 rounded-md"
          placeholder="Create a post"
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
        ></textarea>
        <button
          type="submit"
          className="bg-gray-800 text-white px-4 py-2 mt-2 rounded-md"
        >
          Submit
        </button>
      </form>

      {posts.map((post, index) => (
        <div
          key={index}
          className="mt-6 p-4 border border-gray-300 bg-white rounded-md flex gap-4"
        >
          <img
              src={post.avatar || "https://via.placeholder.com/100"}
              alt="User"
              className="w-28 h-28 rounded-full border"
            />
          <div className="flex-1">
            <h3 className="text-lg font-bold text-gray-800">{post.name}</h3>
            <p className="text-gray-600 text-sm">
              Posted on {new Date(post.date).toLocaleDateString()}
            </p>
            <p className="mt-2 text-gray-900">{post.text}</p>

            <div className="flex items-center gap-4 mt-3">
              <button className="flex items-center text-gray-600 hover:text-gray-800">
                <FaThumbsUp className="mr-1" /> Like
              </button>
              <button className="flex items-center text-gray-600 hover:text-gray-800">
                <FaThumbsDown className="mr-1" /> Dislike
              </button>
              <Link className="bg-teal-500 text-white px-4 py-1 rounded-md" to={`/posts/${post._id}`}>
                Discussion
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>);
}

export default Posts;
