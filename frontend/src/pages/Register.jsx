import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const Register = () => {

  const navigate = useNavigate();

  // get global state token
  const {setToken} = useContext(AppContext);
  
  const [formRegister, setFormRegister] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });
  
  const [error, setError] = useState("");
  
  async function handleRegister(e) {
    e.preventDefault();

    const res = await fetch("/api/register", {
      method: "post",
      body: JSON.stringify(formRegister)
    });

    const data = await res.json();
    
    // errors itu objek yg dibalikin api
    // error itu state yg kita buat di front-end
    if (data.errors) {
      setError(data.errors);
    } else {
      // save token to local storage
      localStorage.setItem("token", data.token);
      // set token state
      setToken(data.token);
      navigate("/");
    }

  };
  
  const handleChange = (e) => {
    setFormRegister({
      ...formRegister,
      // target input field
      [e.target.name]: e.target.value
    });
  }
  
  return (
    <>
      <h1 className="title">Register</h1>

      <form onSubmit={handleRegister} className="w-3/4 mx-auto space-y-6">
        <div>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formRegister.name}
            onChange={handleChange}
          />
          {error.name && <p className="error">{error.name}</p>}
        </div>

        <div>
          <input
            type="text"
            name="email"
            placeholder="Email"
            value={formRegister.email}
            onChange={handleChange}
          />
          {error.email && <p className="error">{error.email}</p>}
        </div>

        <div>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formRegister.password}
            onChange={handleChange}
          />
          {error.password && <p className="error">{error.password}</p>}
        </div>

        <div>
          <input
            type="password"
            name="password_confirmation"
            placeholder="Confirm Password"
            value={formRegister.password_confirmation}
            onChange={handleChange}
          />
        </div>

        <button className="primary-btn">Register</button>
      </form>
    </>
  );
}

export default Register;