import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../components/UserContext";

const Root: React.FC = () => {
  const { user } = useUser();
  console.log(user);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/Info"); // Navigate to info if logged in
    } else {
      navigate("/Login"); // Navigate to login if not logged in
    }
  });

  return <div>Loading...</div>;
};

export default Root;
