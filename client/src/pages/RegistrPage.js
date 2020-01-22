import React, { useState, useEffect } from "react";

import "./authPage.css";

import { useValidation } from "../hooks/validation.hook";
import { useHttp } from "../hooks/http.hook";
import { Link } from "react-router-dom";

import {
  Button,
  Form,
  Grid,
  Header,
  Segment,
  Label,
  Message
} from "semantic-ui-react";

export default function AuthPage() {
  const [form, setForm] = useState({
    login: "",
    email: "",
    password: "",
    conPassword: ""
  });
  const [err, setErr] = useState("");
  const [toast, setToast] = useState("");

  const [vLogin, setVLogin] = useState("");
  const [vPassword, setVPassword] = useState("");
  const [vEmail, setVEmail] = useState("");

  const { checkEmail, checkPassword, checkLogin } = useValidation();
  const { loading, request, error, clearError } = useHttp();

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
    const login = checkLogin(form.login);
    const password = checkPassword(form.password, form.conPassword);
    const email = checkEmail(form.email);

    setVEmail(email);
    setVLogin(login);
    setVPassword(password);

    registrHandler(login, password, email);
  };

  const registrHandler = async (l, e, p) => {
    if (l.length === 0 && e.length === 0 && p.length === 0) {
      try {
        const data = await request("/api/registr", "POST", {
          login: form.login,
          email: form.email,
          password: form.password
        });
        setToast(data.message);
        setErr("");
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
          {toast && (
            <Message positive>
              <Message.Content>
                <Message.Header>{toast}</Message.Header>
              </Message.Content>
              <Button
                name="sign-in"
                as={Link}
                to="/"
                basic
                color="teal"
                content="Войти"
              />
            </Message>
          )}
          <Header as="h2" color="teal" textAlign="center">
            Registration
          </Header>
          <Form size="large">
            <Segment stacked>
              <Form.Field>
                <Form.Input
                  fluid
                  icon="address card outline"
                  iconPosition="left"
                  placeholder="Login"
                  name="login"
                  onChange={changeHandler}
                />
                {vLogin && (
                  <Label basic color="red" pointing="above">
                    {vLogin}
                  </Label>
                )}
              </Form.Field>
              <Form.Field>
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
              </Form.Field>
              <Form.Field>
                <Form.Input
                  fluid
                  icon="lock"
                  iconPosition="left"
                  placeholder="Password"
                  type="password"
                  name="password"
                  onChange={changeHandler}
                />
              </Form.Field>
              <Form.Field>
                <Form.Input
                  fluid
                  icon="lock"
                  iconPosition="left"
                  placeholder="Confirm password"
                  type="password"
                  name="conPassword"
                  onChange={changeHandler}
                />
                {vPassword && (
                  <Label basic color="red" pointing="above">
                    {vPassword}
                  </Label>
                )}
              </Form.Field>
              <Button
                color="teal"
                fluid
                size="large"
                disabled={loading}
                onClick={validHandler}
              >
                Register Now
              </Button>
            </Segment>
          </Form>
          <Message>
            Есть аккаунт? <Link to="/">Войти</Link>
          </Message>
          {err && <Message error header={err} />}
        </Grid.Column>
      </Grid>
    </div>
  );
}
