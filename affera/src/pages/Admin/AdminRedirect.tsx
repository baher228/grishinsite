import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AdminRedirect: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/admin/dashboard");
    } else {
      navigate("/admin/login");
    }
  }, [navigate]);

  return null;
};

export default AdminRedirect;
