import { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate, useParams } from "react-router-dom";

const Post = () => {
  const { id } = useParams();
  
  const { token } = useContext(AppContext);
  const navigate = useNavigate();
  
  const [formUpdatePost, setFormUpdatePost] = useState({
    content: ""
  });
  
  const [error, setError] = useState("");
  
  async function handleUpdate(e) {
    e.preventDefault();
  
    const res = await fetch(`/api/posts/${id}`, {
      method: "put",
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(formUpdatePost)
    });

    const data = await res.json();
    
    if (data.errors) {
      setError(data.errors);
    } else {
      navigate("/");
    }

  };
  
  const handleChange = (e) => {
    setFormUpdatePost({
      ...formUpdatePost,
      [e.target.name]: e.target.value
    });
  }
  
  return (
    <>
      <h1 className="title text-2xl">
        Update your post
      </h1>
      <form onSubmit={handleUpdate} className="w-3/4 mx-auto space-y-6">
        <div>
          <input
            type="text"
            name="content"
            placeholder="Post anything..."
            value={formUpdatePost.content}
            onChange={handleChange}
          />
        </div>

        <div className="text-center">
          {error.content && <p className="error">{error.content}</p>}
        </div>

        <button className="primary-btn">Post</button>
      </form>
    </>
  );
}

export default Post;