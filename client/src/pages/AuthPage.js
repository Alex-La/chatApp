import React, { useState, useEffect, useContext } from "react";

import "./authPage.css";

import {
  Button,
  Form,
  Grid,
  Header,
  Message,
  Segment,
  Label
} from "semantic-ui-react";
import { Link } from "react-router-dom";

import { useHttp } from "../hooks/http.hook";
import { useValidation } from "../hooks/validation.hook";
import { AuthContext } from "../context/authContext";

export default function AuthPage() {
  const auth = useContext(AuthContext);
  const [form, setForm] = useState({
    email: "",
    password: ""
  });
  const [err, setErr] = useState("");

  const [vPassword, setVPassword] = useState("");
  const [vEmail, setVEmail] = useState("");

  const { error, loading, request, clearError } = useHttp();
  const { checkEmail, checkPassword } = useValidation();

  useEffect(() => {
    if (error != null) {
      setErr(error);
      clearError();
    }
  }, [error, clearError]);

  const changeHandler = event => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const validHandler = () => {
    const password = checkPassword(form.password, form.password);
    const email = checkEmail(form.email);

    setVEmail(email);
    setVPassword(password);

    loginHandler(password, email);
  };

  const loginHandler = async (p, e) => {
    if (e.length === 0 && p.length === 0) {
      try {
        const data = await request("/api/login", "POST", {
          email: form.email,
          password: form.password
        });
        auth.login(data.token, data.userId);
      } catch (e) {}
    }
  };

  return (
    <div className="authWrap">
      <Grid
        textAlign="center"
        verticalAlign="middle"
        style={{ height: "100vh" }}
      >
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h2" color="teal" textAlign="center">
            Log-in to your account
          </Header>
          <Form size="large">
            <Segment stacked>
              <Form.Input
                fluid
                icon="user"
                iconPosition="left"
                placeholder="E-mail address"
                name="email"
                onChange={changeHandler}
              />
              {vEmail && (
                <Label basic color="red" pointing="above">
                  {vEmail}
                </Label>
              )}
              <Form.Input
                fluid
                icon="lock"
                iconPosition="left"
                placeholder="Password"
                type="password"
                name="password"
                onChange={changeHandler}
              />
              {vPassword && (
                <Label basic color="red" pointing="above">
                  {vPassword}
                </Label>
              )}
              <Button
                color="teal"
                fluid
                size="large"
                disabled={loading}
                onClick={validHandler}
              >
                Login
              </Button>
            </Segment>
          </Form>
          <Message>
            Нет аккаунта? <Link to="/registr">Зарегистрироваться</Link>
          </Message>
          {err && <Message error header={err} />}
        </Grid.Column>
      </Grid>
    </div>
  );
}
