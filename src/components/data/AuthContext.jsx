import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import instance from "../../axiosConfig";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [studentData, setStudentData] = useState(null);
  const [tokenInfo, setTokenInfo] = useState({ userId: '', token: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const refreshToken = async () => {
    try {
      const response = await instance.get('/token');
      const newToken = response.data.token;
      const decoded = jwtDecode(newToken);
      setTokenInfo({ userId: decoded.id, token: newToken });
    } catch (error) {
      if (error.response) navigate('/');
    }
  };

  const fetchStudentData = async (userId, token) => {
    try {
      const response = await instance.get(`/student/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
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
    if (tokenInfo.userId && tokenInfo.token) {
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