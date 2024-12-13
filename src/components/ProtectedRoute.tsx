import React from "react";
import { Navigate } from "react-router-dom";
import { useUser } from "./UserContext";

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { user } = useUser();

  // Redirect to login if username is empty
  if (!user?.username) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
