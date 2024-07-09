import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import instance from "../../axiosConfig"
import { jwtDecode } from 'jwt-decode';

const TokenContext = createContext();

export const TokenProvider = ({ children }) => {
    const [tokenInfo, setTokenInfo] = useState({ userId: '', token: '' });
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

    useEffect(() => {
        const initialize = async () => {
            await refreshToken();
        };

        initialize();
    }, []); // [] digunakan agar efek ini hanya berjalan sekali saat komponen dipasang

    return (
        <TokenContext.Provider value={{ tokenInfo, refreshToken }}>
            {children}
        </TokenContext.Provider>
    );
};

export default TokenContext;
