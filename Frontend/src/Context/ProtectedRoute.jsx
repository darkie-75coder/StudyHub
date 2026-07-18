import React, { useContext } from "react";
import { AppContext } from "./AppContext";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../Components/Loader";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useContext(AppContext);

  const navigate = useNavigate();

  if (loading) {
    return <Loader />;
  }

  if (!user) {
    navigate("/");
  }

  return children;
};

export default ProtectedRoute;
