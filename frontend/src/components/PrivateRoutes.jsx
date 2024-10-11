// PrivateRoute.jsx
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

export const AuthenticatedRoute = ({ children }) => {
  const { user } = useContext(AppContext);

  if (!user) {
    // Jika user sudah login, redirect ke halaman utama
    return <Navigate to="/login" />;
  }

  // Jika belum login, render children (halaman login atau registrasi)
  return children;
};

export const GuestRoute = ({ children }) => {
  const { user } = useContext(AppContext);

  if (user) {
    // Jika user sudah login, redirect ke halaman utama
    return <Navigate to="/" />;
  }

  // Jika belum login, render children (halaman login atau registrasi)
  return children;
};