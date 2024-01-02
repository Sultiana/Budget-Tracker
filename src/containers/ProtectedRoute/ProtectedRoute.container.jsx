import React, { useContext } from "react";
import UserContext from "../../contexts/UserContext";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const {
    user: { isLoggedIn },
  } = useContext(UserContext);

  if (!isLoggedIn) {
    return <Navigate to="/" replace />;
  }
  return <Outlet />;
};

export default ProtectedRoute;
