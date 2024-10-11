import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [post, setPost] = useState([]);

  async function getPost() {
    const res = await fetch("/api/posts");
    
    if (res.ok) {
      const data = await res.json();
      setPost(data);
    }
  }

  useEffect(() => {
    getPost();
  }, []);

  return (
    <>
      {post.length > 0 ? (
        post.map((post) => (
          <div key={post.id} className="border-b-2 mb-3">
            <div className="flex flex-row items-center gap-3 justify-between">
              <h2 className="font-bold">{post.user.name}</h2>
              <p className="text-gray-500 text-xs">
                {new Date(post.created_at).toLocaleString()}
              </p>
            </div>
            <div className="flex flex-row justify-between items-center mb-3">
              <p>{post.content}</p>
              <Link
                to={`/posts/${post.id}`}
                className="bg-blue-500 text-white px-2 py-1 text-xs rounded-sm"
              >
                More
              </Link>
            </div>
          </div>
        ))
      ) : (
        <p>Post is empty</p>
      )}
    </>
  );
};

export default Home;
