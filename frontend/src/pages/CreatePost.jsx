import { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const Post = () => {
  
  const {token} = useContext(AppContext);
  const navigate = useNavigate();
  
  const [formPost, setFormPost] = useState({
    content: ""
  });
  
  const [error, setError] = useState("");
  
  async function handlePost(e) {
    e.preventDefault();

    const res = await fetch("/api/posts", {
      method: "post",
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(formPost)
    });

    const data = await res.json();
    
    if (data.errors) {
      setError(data.errors);
      console.log(error);
    } else {
      console.log(data);
      navigate('/');
    }
  };
  
  const handleChange = (e) => {
    setFormPost({
      ...formPost,
      [e.target.name]: e.target.value
    });
  }
  
  return (
    <>
      <form onSubmit={handlePost} className="w-3/4 mx-auto space-y-6">
        <div>
          <input
            type="text"
            name="content"
            placeholder="Post anything..."
            value={formPost.content}
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