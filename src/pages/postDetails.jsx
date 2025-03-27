import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";
import axios from "axios";

const PostDetails = () => {
  const { id } = useParams();
  const [post, setPost] = useState({});
  const [comments, setComments] = useState({});
  const [comment, setComment] = useState("");

  useEffect(() => {
    let token = localStorage.getItem("token");
    axios
      .get(`https://nt-devconnector.onrender.com/api/posts/${id}`,{
        headers: {
            "x-auth-token": token,
        }
      })
       .then((res) => setPost(res.data));
  }, []);

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    let token = localStorage.getItem("token");
    axios
      .post(
        `https://nt-devconnector.onrender.com/api/posts/${id}/comment`,
        { text: comment },
        {
          headers: {
            "x-auth-token": token,
          },
        }
      )
      .then((res) => {
        setComments([...comments, res.data]);
        setComment("");
      })
      .catch((err) => console.error("Error posting comment:", err));
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <Link
        to="/posts"
        className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md inline-block mb-4"
      >
        Back To Posts
      </Link>

      <div className="p-4 border border-gray-300 bg-white rounded-md flex gap-4">
        <img
          src={post.avatar || "https://via.placeholder.com/100"}
          alt="User"
          className="w-28 h-28 rounded-full border"
        />
        <div className="flex-1">
          <h3 className="text-lg font-bold text-gray-800">{post.name}</h3>
          <p className="text-gray-600 text-sm">
            Posted on {post.date ? new Date(post.date).toLocaleDateString() : ""}
          </p>
          <p className="mt-2 text-gray-900">{post.text}</p>

          <div className="flex items-center gap-4 mt-3">
            <button className="flex items-center text-gray-600 hover:text-gray-800">
              <FaThumbsUp className="mr-1" /> Like
            </button>
            <button className="flex items-center text-gray-600 hover:text-gray-800">
              <FaThumbsDown className="mr-1" /> Dislike
            </button>
          </div>
        </div>
      </div>


      <div className="mt-6">
        <h3 className="bg-teal-500 text-white px-4 py-2 rounded-t-md font-semibold">
          Leave a Comment
        </h3>
        <form
          onSubmit={handleCommentSubmit}
          className="bg-white p-4 border border-gray-300 rounded-b-md"
        >
          <textarea
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Comment the post"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
          ></textarea>
          <button
            type="submit"
            className="bg-gray-800 text-white px-4 py-2 mt-2 rounded-md"
          >
            Submit
          </button>
        </form>
      </div>

      
      <div className="mt-6">
        <h3 className="bg-teal-500 text-white px-4 py-2 rounded-t-md font-semibold">
          Comments
        </h3>
        <div className="bg-white p-4 border border-gray-300 rounded-b-md">
          {comments.length > 0 ? (
            comments.map((c, index) => (
              <div key={index} className="border-b py-2">
                <p className="text-gray-900">{c.text}</p>
                <p className="text-gray-500 text-sm">
                  {c.name} • {new Date(c.date).toLocaleDateString()}
                </p>
              </div>
            ))
          ) : (
            <p className="text-gray-600">No comments yet</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostDetails;
