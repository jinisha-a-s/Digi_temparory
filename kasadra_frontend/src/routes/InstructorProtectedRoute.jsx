import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const InstructorProtectedRoute = () => {
  const { isAuthenticated, token } = useSelector((state) => state.instructorAuth);

  if (!isAuthenticated || !token) {
    return <Navigate to="/instructor-signin" replace />;
  }

  return <Outlet />;
};

export default InstructorProtectedRoute;
