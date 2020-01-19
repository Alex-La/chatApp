import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import MainPage from "../pages/MainPage";
import AuthPage from "../pages/AuthPage";
import RegistPage from "../pages/RegistrPage";

export const useRoutes = isAuthenticated => {
  if (isAuthenticated) {
    return (
      <Switch>
        <Route path="/main" exact>
          <MainPage />
        </Route>
        <Route>
          <Redirect to="/main" />
        </Route>
      </Switch>
    );
  }

  return (
    <Switch>
      <Route path="/" exact>
        <AuthPage />
      </Route>
      <Route path="/registr" exact>
        <RegistPage />
      </Route>
      <Redirect to="/" />
    </Switch>
  );
};
