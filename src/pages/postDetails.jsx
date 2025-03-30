import React, { useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";
import axios from "axios";
import GetDataApi from "../hooks/GetDataApi";
import CreateDataApi from "../hooks/CreateDataApi";
import { AuthContext } from "../context/AuthContext";

const PostDetails = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [comment, setComment] = useState("");
  const [post, setPost] = useState(null);
  const token = localStorage.getItem("token");

  const { data, loading, error } = GetDataApi(`/posts/${id}`);
  const { postData: postComment, loading: commentLoading, error: commentError } =
    CreateDataApi(`/posts/comment/${id}`);

  React.useEffect(() => {
    if (data) setPost(data);
  }, [data]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    const newComment = await postComment({ text: comment });

    if (newComment) {
      setComment("");
      setPost({ ...post, comments: [...post.comments, newComment] });
    }
  };

  const likePost = async (post_id) => {
    try {
      await axios.put(
        `https://nt-devconnector.onrender.com/api/posts/like/${post_id}`,
        {},
        {
          headers: { "x-auth-token": token },
        }
      );
      setPost({
        ...post,
        likes: [...post.likes, { user: user?._id }],
      });
    } catch (err) {
      console.error("Error liking post:", err.response?.data || err.message);
    }
  };

  const unlikePost = async (post_id) => {
    try {
      await axios.put(
        `https://nt-devconnector.onrender.com/api/posts/unlike/${post_id}`,
        {},
        {
          headers: { "x-auth-token": token },
        }
      );
      setPost({
        ...post,
        likes: post.likes.filter((like) => like.user !== user?._id),
      });
    } catch (err) {
      console.error("Error unliking post:", err.response?.data || err.message);
    }
  };

  if (loading || !post) return <h2>Loading...</h2>;
  if (error) return <h2 className="bg-red-600 text-white p-2 rounded">Error!</h2>;

  const hasLiked = post?.likes?.some((like) => like.user === user?._id);

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
          src={post?.avatar || "https://via.placeholder.com/100"}
          alt="User"
          className="w-28 h-28 rounded-full border"
        />
        <div className="flex-1">
          <h3 className="text-lg font-bold text-gray-800">{post?.name}</h3>
          <p className="text-gray-600 text-sm">
            Posted on {post?.date ? new Date(post?.date).toLocaleDateString() : ""}
          </p>
          <p className="mt-2 text-gray-900">{post?.text}</p>

          <div className="flex items-center gap-4 mt-3">
            <button
              onClick={() => likePost(post._id)}
              disabled={hasLiked}
              className={`flex items-center ${
                hasLiked ? "text-gray-400" : "text-gray-600 hover:text-gray-800"
              }`}
            >
              <FaThumbsUp className="mr-1" /> Like {post?.likes?.length || 0}
            </button>

            <button
              onClick={() => unlikePost(post._id)}
              disabled={!hasLiked}
              className={`flex items-center ${
                !hasLiked ? "text-gray-400" : "text-blue-600 hover:text-gray-800"
              }`}
            >
              <FaThumbsDown className="mr-1" /> Unlike
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
            disabled={commentLoading}
          >
            {commentLoading ? "Submitting..." : "Submit"}
          </button>
          {commentError && <p className="text-red-600 mt-2">{commentError}</p>}
        </form>
      </div>

      <div className="mt-6">
        <h3 className="bg-teal-500 text-white px-4 py-2 rounded-t-md font-semibold">
          Comments
        </h3>
        <div className="bg-white p-4 border border-gray-300 rounded-b-md">
          {post?.comments?.length > 0 ? (
            post.comments.map((c, index) => (
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
