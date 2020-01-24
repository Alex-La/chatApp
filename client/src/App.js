import React, { useContext, useEffect } from "react";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import { AuthContext } from "./context/authContext";
import { useRoutes } from "./routes/routes";
import { useAuth } from "./hooks/auth.hook";
import Preloader from "./components/Preloader";
import io from "socket.io-client";

let socket;

function App() {
  const { token, login, loginStr, logout, userId, ready } = useAuth();
  const isAuthenticated = !!token;
  const routes = useRoutes(isAuthenticated);

  const ENDPOINT = useContext(AuthContext);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    socket = io(ENDPOINT.endpoint);
  }, [ENDPOINT]);

  if (!ready) {
    return <Preloader />;
  }

  return (
    <AuthContext.Provider
      value={{
        token,
        login,
        logout,
        userId,
        loginStr,
        isAuthenticated
      }}
    >
      <BrowserRouter>
        <div className="container">{routes}</div>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
