import React, { useContext } from "react";
import { AppContext } from "./AppContext";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../Components/Loader";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useContext(AppContext);

  if (loading) {
    return <Loader />;
  }

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
