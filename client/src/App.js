import React from "react";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import { AuthContext } from "./context/authContext";
import { useRoutes } from "./routes/routes";
import { useAuth } from "./hooks/auth.hook";
import Preloader from "./components/Preloader";

function App() {
  const { token, login, loginStr, logout, userId, ready } = useAuth();
  const isAuthenticated = !!token;
  const routes = useRoutes(isAuthenticated);

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
