import { AuthContext } from '../context/AuthContext';
import { useContext } from 'react';
import {Navigate} from "react-router-dom";

export const ProtectedRoute = ({ children }) => {
    const { user } = useContext(AuthContext);
    if (Object.keys(user).length === 0) {
        return <Navigate to="/" replace />;
    }
    return children;
};

export const AuthRoute = ({ children }) => {
    const { user } = useContext(AuthContext);
    if ((Object.keys(user).length > 0)) {
        return <Navigate to="/home" replace />;
    }
    return children;
};