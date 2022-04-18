import React, { useContext, useEffect, useState } from 'react';
import { Login } from './sections/Login';
import { Register } from './sections/Register';
import { Home } from './sections/Home';
import Header from './sections/Header';
import { AuthContext } from './context/AuthContext';
import { getUser } from './api/Service';
import { authAxios } from './api/config';
import { AuthRoute, ProtectedRoute } from './routes/routes';
import { ToastContainer } from 'react-toastify';


import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import { Alert } from './utilities/Alert';



function App() {
  const [user, setUser] = useState({})
  const isLogged = () => {
    return Object.keys(user).length > 0
  }

  useEffect(() => {
    const init = async () => {
      //Ask for token
      const userStorage = localStorage.getItem("user");
      if (userStorage) {
        try {
          const aux = JSON.parse(userStorage);
          //Check valid token
          console.warn(aux);
          authAxios.defaults.headers.common['Authorization'] = 'Bearer ' + aux.api_token;
          await getUser(aux.id);
          setUser(aux);
          
        } catch (error) {
          localStorage.clear();
          setUser({});
          Alert("La sesión ha caducado",error.response.status);
        }
      }
    }
    init();
  }, [])

  return (

      <AuthContext.Provider value={{ user, setUser, isLogged }}>
        <div className={`main ${isLogged() > 0 ? "light" : ""}`}>
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={
              <AuthRoute>
                <Login />
              </AuthRoute>} />
            <Route path="/register" element={
              <AuthRoute>
                <Register />
              </AuthRoute>}
            />
            <Route path="/home" element={<ProtectedRoute>
              <Home />
            </ProtectedRoute>}
            />
          </Routes>
        </Router>
        <ToastContainer
        theme="dark"
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        />
        </div>
      </AuthContext.Provider>
  

  );
}

export default App;
