import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import instance from "../../axiosConfig";
import axios from "axios"

import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [studentData, setStudentData] = useState(null);
  const [tokenInfo, setTokenInfo] = useState({ userId: '', token: '' });
  const [role, setRole] = useState("")
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const refreshToken = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/token', { withCredentials: true, });
      const newToken = response.data.token;
      const decoded = jwtDecode(newToken);
      const role = response.data.user
      setTokenInfo({ userId: decoded.id, token: newToken });
      setRole(role.role)
    } catch (error) {
      if (error.response) navigate('/login');
    }
  };

  const fetchStudentData = async (userId, token) => {
    try {
      const response = await axios.get(`http://localhost:3000/api//student/${userId}`, {
        headers: { Authorization: `Bearer ${token}` }, withCredentials: true,
      });
      setStudentData(response.data.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const initialize = async () => {
      setLoading(true);
      await refreshToken();
    };

    initialize();
  }, []);

  useEffect(() => {
    if (role.role === "Admin") {
      navigate('/dashboardPage');
    }
    else if (tokenInfo.userId && tokenInfo.token) {
      fetchStudentData(tokenInfo.userId, tokenInfo.token);
    }
  }, [tokenInfo]);

  return (
    <AuthContext.Provider value={{ studentData, tokenInfo, loading, error }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;