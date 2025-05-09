import React from "react";
import { useSelector } from "react-redux";
import { getCurrentToken } from "../../redux/features/auth/authSlice";
import { Navigate } from "react-router";

export default function ProtectedRoute({ children }) {
  const token = useSelector(getCurrentToken);

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
