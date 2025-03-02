import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function CheckAuth({ isAuthenticated, user, children }) {
  const navigate = useNavigate();
  const location = useLocation();

  console.log(location.pathname, isAuthenticated);
  useEffect(() => {
    // if (isLoading) return;

    if (location.pathname === "/") {
      if (!isAuthenticated) {
        return <Navigate to="/auth/login" />;
      } else {
        if (user?.role === "admin") {
          return <Navigate to="/admin/dashboard" />;
        } else {
          return <Navigate to="/shop/home" />;
        }
      }
    }
    if (
      !isAuthenticated &&
      !location.pathname.includes("/login") &&
      !location.pathname.includes("/register")
    ) {
      navigate("/auth/login");
    }

    if (
      isAuthenticated &&
      (location.pathname.includes("/login") ||
        location.pathname.includes("/register"))
    ) {
      if (user?.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/home");
      }
    }

    if (
      isAuthenticated &&
      user?.role !== "admin" &&
      location.pathname.includes("admin")
    ) {
      navigate("/unauth-page");
    }

    if (
      isAuthenticated &&
      user?.role === "admin" &&
      location.pathname === "/shop"
    ) {
      navigate("/admin/dashboard");
    }
  }, [isAuthenticated, user, location, navigate]);

  return <>{children}</>;
}

export default CheckAuth;
