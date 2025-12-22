
// src/routes/StudentProtectedRoute.jsx

import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const StudentProtectedRoute = () => {
  const { isAuthenticated, token } = useSelector((state) => state.auth);

  if (!isAuthenticated || !token) {
    return <Navigate to="/student-signin" replace />;
  }

  return <Outlet />;
};

export default StudentProtectedRoute;
