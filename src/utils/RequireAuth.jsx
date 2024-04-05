import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

export default function RequireAuth({ user, allowedRole }) {
  const location = useLocation();
  return user?.roles.find((role) => allowedRole?.includes(role)) ? (
    <Outlet />
  ) : user ? (
    <Navigate to="/unauthorized" state={{ from: location }} replace />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
}
