import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { FaUser, FaThumbsUp, FaThumbsDown } from "react-icons/fa";
import { Link } from "react-router-dom";
import GetDataApi from "../hooks/GetDataApi";
import { AuthContext } from "../context/AuthContext";

function Posts() {
  const { user } = useContext(AuthContext);
  const [text, setText] = useState("");
  const [posts, setPosts] = useState([]);
  const token = localStorage.getItem("token");

  const { data, loading, error } = GetDataApi("/posts");
  const { data: profile } = GetDataApi("/auth");

  useEffect(() => {
    if (data) setPosts(data);
  }, [data]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    try {
      const res = await axios.post(
        "https://nt-devconnector.onrender.com/api/posts",
        { text },
        { headers: { "x-auth-token": token } }
      );
      setPosts([res.data, ...posts]);
      setText("");
    } catch (err) {
      console.error("Error posting:", err.response?.data || err.message);
    }
  };

  const likePost = async (post_id) => {
    try {
      await axios.put(`https://nt-devconnector.onrender.com/api/posts/like/${post_id}`, {}, {
        headers: { "x-auth-token": token },
      });

      setPosts(posts.map((post) =>
        post._id === post_id
          ? { ...post, likes: [...post.likes, { user: user?._id }] }
          : post
      ));
    } catch (err) {
      console.error("Error liking post:", err.response?.data || err.message);
    }
  };

  const unlikePost = async (post_id) => {
    try {
      await axios.put(`https://nt-devconnector.onrender.com/api/posts/unlike/${post_id}`, {}, {
        headers: { "x-auth-token": token },
      });

      setPosts(posts.map((post) =>
        post._id === post_id
          ? { ...post, likes: post.likes.filter((like) => like.user !== user?._id) }
          : post
      ));
    } catch (err) {
      console.error("Error unliking post:", err.response?.data || err.message);
    }
  };

  const deletePost = async (post_id) => {
    try {
      await axios.delete(
        `https://nt-devconnector.onrender.com/api/posts/${post_id}`,
        { headers: { "x-auth-token": token } }
      );
      setPosts(posts.filter((post) => post._id !== post_id));
    } catch (err) {
      console.error("Error deleting post:", err.response?.data || err.message);
    }
  };

  if (loading) return <h2>Loading...</h2>;
  if (error) return <h2 className="bg-red-600">Error!</h2>;

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <h1 className="text-4xl font-bold text-teal-600">Posts</h1>
      <p className="text-gray-700 flex items-center mt-2 text-lg">
        <FaUser className="mr-2" /> Welcome to the community
      </p>

      <div className="mt-6 bg-teal-500 text-white px-4 py-2 rounded-t-md font-semibold">
        Say Something...
      </div>
      <form onSubmit={handleSubmit} className="bg-white p-4 border border-gray-300 rounded-b-md">
        <textarea
          className="w-full p-2 border border-gray-300 rounded-md"
          placeholder="Create a post"
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
        ></textarea>
        <button type="submit" className="bg-gray-800 text-white px-4 py-2 mt-2 rounded-md">
          Submit
        </button>
      </form>

      {posts.map((post) => {
        const hasLiked = post.likes.some((like) => like.user === user?._id);
        return (
          <div key={post._id} className="mt-6 p-4 border border-gray-300 bg-white rounded-md flex gap-4">
            <img src={post.avatar || "https://via.placeholder.com/100"} alt="User" className="w-28 h-28 rounded-full border" />
            <div className="flex-1">
              <h3 className="text-lg font-bold text-gray-800">{post.name}</h3>
              <p className="text-gray-600 text-sm">Posted on {new Date(post.date).toLocaleDateString()}</p>
              <p className="mt-2 text-gray-900">{post.text}</p>

              <div className="flex items-center gap-4 mt-3">
                 <button 
                   onClick={() => likePost(post._id)} 
                   disabled={hasLiked}
                   className={`flex items-center ${hasLiked ? "text-gray-400" : "text-gray-600 hover:text-gray-800"}`}
                  >
                     <FaThumbsUp className="mr-1" /> Like {post.likes.length}
                  </button>

                  <button 
                    onClick={() => unlikePost(post._id)} 
                    disabled={!hasLiked}
                     className={`flex items-center ${!hasLiked ? "text-gray-400" : "text-blue-600 hover:text-gray-800"}`}
                   >
                     <FaThumbsDown className="mr-1" /> Unlike
                  </button>

                {post.user === profile?._id && (
                  <button onClick={() => deletePost(post._id)} className="flex items-center text-red-400 hover:text-red-600">
                    Delete
                  </button>
                )}

                <Link className="bg-teal-500 text-white px-4 py-1 rounded-md" to={`/posts/${post._id}`}>
                  Discussion
                </Link>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Posts;
