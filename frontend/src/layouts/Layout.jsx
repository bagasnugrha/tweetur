import { useContext } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const Layout = () => {

  const {user, setUser, token, setToken } = useContext(AppContext);
  const navigate = useNavigate();
  
  async function handleLogout (e) {
    e.preventDefault();

    const res = await fetch("/api/logout", {
      method: "post",
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    
    if (res.ok) {
      setUser(null);
      setToken(null);
      localStorage.removeItem("token");
      navigate("/login");
    } else {
      console.log("login failed");
    }
  }

  return (
    <>
      <header className="border-b pb-4">
        <nav className="flex items-center justify-between">
          <Link to="/" className="font-bold text-blue-500">
            Tweetur
          </Link>
          {user ? (
            <div className="flex gap-3 items-center">
              <p className="text-sm">Welcome, <span className="font-semibold">{user.name}</span></p>
              <Link
                to="/create"
              className="px-3 py-1 text-sm rounded-md bg-blue-500 text-white"
              >
                New Post
              </Link>
              <button
                onClick={handleLogout}
                className="px-3 py-1 text-sm rounded-md bg-blue-500 text-white"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex gap-3">
              <Link
                to="/register"
                className="px-3 py-1 text-sm rounded-md bg-blue-500 text-white"
              >
                Register
              </Link>

              <Link
                to="/login"
                className="px-3 py-1 text-sm rounded-md bg-blue-500 text-white"
              >
                Login
              </Link>
            </div>
          )}
        </nav>
      </header>

      <main className="py-5">
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
