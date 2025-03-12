import { redirect, useNavigate } from "react-router-dom";
import React, { useContext, useEffect } from "react";
import { DataContent } from "../DataProvider/DataProvider";

const ProtectedRoute = ({ children, msg, redirect }) => {
  const navigate = useNavigate();
  const [{ user }, dispatch] = useContext(DataContent);

  useEffect(() => {
    if (!user) {
      navigate("/auth", { state: { msg, redirect } });
    }
  }, [user]);
  return children;
};
export default ProtectedRoute;
