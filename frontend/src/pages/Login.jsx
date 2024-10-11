import { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  
  const {setToken} = useContext(AppContext);
  const navigate = useNavigate();
  
  const [formLogin, setFormLogin] = useState({
    email: "",
    password: "",
  });
  
  const [error, setError] = useState("");
  
  async function handleLogin(e) {
    e.preventDefault();

    const res = await fetch("/api/login", {
      method: "post",
      body: JSON.stringify(formLogin)
    });

    const data = await res.json();
    
    // errors itu objek yg dibalikin api
    // error itu state yg kita buat di front-end
    if (data.errors) {
      setError(data.errors);
      console.log(error);
    } else {
      localStorage.setItem("token", data.token);
      setToken(data.token);
      navigate("/");
    }
  };
  
  const handleChange = (e) => {
    setFormLogin({
      ...formLogin,
      // target input field
      [e.target.name]: e.target.value
    });
  }
  
  return (
    <>
      <h1 className="title">Login</h1>

      <form onSubmit={handleLogin} className="w-3/4 mx-auto space-y-6">
        <div>
          <input
            type="text"
            name="email"
            placeholder="Email"
            value={formLogin.email}
            onChange={handleChange}
          />
        </div>

        <div>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formLogin.password}
            onChange={handleChange}
          />
        </div>

        <div className="text-center">
          {error.email && <p className="error">{error.email}</p>}
          {error.password && <p className="error">{error.password}</p>}
        </div>

        <button className="primary-btn">Login</button>
      </form>
    </>
  );
}

export default Login;