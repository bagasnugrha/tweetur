import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const ShowPost = () => {
  const { id } = useParams();
  const { user, token } = useContext(AppContext);
  const [post, setPost] = useState([]);
  
  const navigate = useNavigate();
  
  async function getPost() {
    const res = await fetch(`/api/posts/${id}`);

    if (res.ok) {
      const data = await res.json();
      setPost(data);
    }
  }

  async function handleDelete() {
    const res = await fetch(`/api/posts/${id}`, {
      method: "delete",
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  
    if (res.ok) {
      console.log("Post deleted successfully");
      navigate("/");
    }
  }

  useEffect(() => {
    getPost()
  }, []);
  
  return (
    <>
      <div className="border-b-2 mb-3">
        <div className="flex flex-row items-center gap-3 justify-between">
          <h2 className="font-bold">{post.name}</h2>
          <p className="text-gray-500 text-xs">
            {new Date(post.created_at).toLocaleString()}
          </p>
        </div>
        <div className="flex flex-row justify-between items-center mb-3">
          <p>{post.content}</p>
          {user.id === post.user_id && (
            <div className="flex gap-1">
              <Link
                to={`/posts/update/${post.id}`}
                className="bg-blue-500 text-white px-2 py-1 text-xs rounded-sm"
              >
                Update
              </Link>
              <button
                onClick={handleDelete}
                className="bg-red-500 text-white px-2 py-1 text-xs rounded-sm"
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ShowPost;
